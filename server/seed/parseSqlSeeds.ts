import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dedupeQuizQuestions, normalizeQuizQuestion } from "./normalizeQuiz";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const outDir = path.join(__dirname, "data");

function splitStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = "";
  let inString = false;

  for (let i = 0; i < sql.length; i++) {
    const char = sql[i];
    if (char === "'" && sql[i - 1] !== "\\") {
      inString = !inString;
    }
    if (!inString && char === ";") {
      const trimmed = current.trim();
      if (trimmed) statements.push(trimmed);
      current = "";
      continue;
    }
    current += char;
  }

  const trimmed = current.trim();
  if (trimmed) statements.push(trimmed);
  return statements;
}

function stripSqlComments(sql: string): string {
  return sql
    .split("\n")
    .map((line) => line.replace(/--.*$/, ""))
    .join("\n");
}

function splitValueFields(tupleBody: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inString = false;
  let bracketDepth = 0;

  for (let i = 0; i < tupleBody.length; i++) {
    const char = tupleBody[i];

    if (char === "'" && tupleBody[i - 1] !== "\\") {
      inString = !inString;
      current += char;
      continue;
    }

    if (!inString) {
      if (char === "[") bracketDepth++;
      if (char === "]") bracketDepth = Math.max(0, bracketDepth - 1);

      if (char === "," && bracketDepth === 0) {
        fields.push(current.trim());
        current = "";
        continue;
      }
    }

    current += char;
  }

  if (current.trim()) fields.push(current.trim());
  return fields;
}

function parseValuesTuples(valuesSection: string): string[][] {
  const tuples: string[][] = [];
  let i = 0;

  while (i < valuesSection.length) {
    while (i < valuesSection.length && valuesSection[i] !== "(") i++;
    if (i >= valuesSection.length) break;
    i++;

    let depth = 1;
    let body = "";

    while (i < valuesSection.length && depth > 0) {
      const char = valuesSection[i];
      if (char === "(") depth++;
      if (char === ")") depth--;
      if (depth > 0) body += char;
      i++;
    }

    if (body.trim()) {
      tuples.push(splitValueFields(body));
    }
  }

  return tuples;
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function parseArrayField(value: string): string[] {
  const unquoted = unquote(value);
  if (unquoted.startsWith("[") || unquoted.startsWith("{")) {
    try {
      return JSON.parse(unquoted.replace(/^\{/, "[").replace(/\}$/, "]"));
    } catch {
      return unquoted
        .replace(/^\{/, "")
        .replace(/\}$/, "")
        .split(",")
        .map((item) => item.trim().replace(/^"/, "").replace(/"$/, ""));
    }
  }

  const arrayMatch = unquoted.match(/^ARRAY\[(.*)\]$/is);
  if (arrayMatch) {
    return arrayMatch[1]
      .split(",")
      .map((item) => item.trim().replace(/^'/, "").replace(/'$/, "").replace(/''/g, "'"))
      .filter(Boolean);
  }

  return [unquoted];
}

function parseInsert(statement: string): { table: string; columns: string[]; rows: string[][] } | null {
  const match = statement.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*([\s\S]+)/i);
  if (!match) return null;

  return {
    table: match[1],
    columns: match[2].split(",").map((col) => col.trim()),
    rows: parseValuesTuples(match[3]),
  };
}

function loadSqlFiles(files: string[]): string {
  return files
    .map((file) => path.join(root, file))
    .filter((file) => fs.existsSync(file))
    .map((file) => stripSqlComments(fs.readFileSync(file, "utf8")))
    .join("\n");
}

const quizSql = loadSqlFiles([
  "quiz_sample_data.sql",
  "authentic_quiz_questions.sql",
  "batch_authentic_questions.sql",
  "more_authentic_questions.sql",
  "add_quiz_questions.sql",
  "add_more_quiz.sql",
  "massive_quiz_batch.sql",
  "massive_authentic_batch.sql",
  "final_large_batch.sql",
  "final_300_questions.sql",
]);

const pmSql = loadSqlFiles([
  "pm_scenarios_data.sql",
  "add_pm_scenarios.sql",
]);

const pmOptionsSql = loadSqlFiles([
  "pm_scenarios_data.sql",
  "complete_pm_options.sql",
  "additional_pm_options.sql",
  "add_scenarios_11_35.sql",
  "complete_remaining_scenarios.sql",
  "complete_final_scenarios.sql",
  "continue_scenario_fixes.sql",
  "fix_remaining_scenarios.sql",
  "fix_all_pm_options.sql",
  "fix_all_scenarios_systematically.sql",
  "fix_specific_scenarios.sql",
  "final_pm_options.sql",
  "rebuild_all_pm_options.sql",
]);

const rawQuizQuestions: Array<Record<string, unknown>> = [];
const pmScenarios: Array<Record<string, unknown>> = [];
const pmOptions: Array<Record<string, unknown>> = [];
const seenOptions = new Set<string>();
let pgScenarioCounter = 0;

for (const statement of splitStatements(quizSql)) {
  const parsed = parseInsert(statement);
  if (!parsed || parsed.table !== "quiz_questions") continue;

  for (const row of parsed.rows) {
    const record = Object.fromEntries(parsed.columns.map((col, index) => [col, row[index]]));
    rawQuizQuestions.push({
      question: unquote(String(record.question)),
      questionEn: unquote(String(record.question_en || "")) || null,
      correctAnswer: unquote(String(record.correct_answer)),
      wrongAnswers: parseArrayField(String(record.wrong_answers)),
      explanation: unquote(String(record.explanation)),
      explanationEn: unquote(String(record.explanation_en || "")) || null,
      category: unquote(String(record.category)) || "general",
      difficulty: Number(unquote(String(record.difficulty))) || 1,
      era: record.era ? unquote(String(record.era)) : null,
    });
  }
}

const quizQuestions = dedupeQuizQuestions(
  rawQuizQuestions.map((record) => normalizeQuizQuestion(record)).filter((record): record is NonNullable<typeof record> => record !== null),
);

for (const statement of splitStatements(pmSql)) {
  const parsed = parseInsert(statement);
  if (!parsed || parsed.table !== "pm_scenarios") continue;

  for (const row of parsed.rows) {
    const record = Object.fromEntries(parsed.columns.map((col, index) => [col, row[index]]));
    pgScenarioCounter++;

    pmScenarios.push({
      sourceId: pgScenarioCounter,
      title: unquote(String(record.title)),
      titleEn: unquote(String(record.title_en || "")) || null,
      description: unquote(String(record.description)),
      descriptionEn: unquote(String(record.description_en || "")) || null,
      context: unquote(String(record.context)),
      contextEn: unquote(String(record.context_en || "")) || null,
      category: unquote(String(record.category)),
      difficulty: Number(unquote(String(record.difficulty))),
      timePressure: Number(unquote(String(record.time_pressure || "0"))),
    });
  }
}

for (const statement of splitStatements(pmOptionsSql)) {
  const parsed = parseInsert(statement);
  if (!parsed || parsed.table !== "pm_policy_options") continue;

  for (const row of parsed.rows) {
    const record = Object.fromEntries(parsed.columns.map((col, index) => [col, row[index]]));
    const key = `${record.scenario_id}:${unquote(String(record.option_text))}`;
    if (seenOptions.has(key)) continue;
    seenOptions.add(key);

    pmOptions.push({
      scenarioId: Number(unquote(String(record.scenario_id))),
      optionText: unquote(String(record.option_text)),
      optionTextEn: unquote(String(record.option_text_en || "")) || null,
      politicalCost: Number(unquote(String(record.political_cost))),
      economicImpact: Number(unquote(String(record.economic_impact))),
      socialImpact: Number(unquote(String(record.social_impact))),
      partyAlignment: unquote(String(record.party_alignment)),
      consequences: unquote(String(record.consequences)),
      consequencesEn: unquote(String(record.consequences_en || "")) || null,
    });
  }
}

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "quizQuestions.json"), JSON.stringify(quizQuestions, null, 2));
fs.writeFileSync(path.join(outDir, "pmScenarios.json"), JSON.stringify(pmScenarios, null, 2));
fs.writeFileSync(path.join(outDir, "pmOptions.json"), JSON.stringify(pmOptions, null, 2));

console.log(`Parsed ${quizQuestions.length} valid quiz questions (${rawQuizQuestions.length} raw)`);
console.log(`Parsed ${pmScenarios.length} PM scenarios`);
console.log(`Parsed ${pmOptions.length} PM policy options`);
