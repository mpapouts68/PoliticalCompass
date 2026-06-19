import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REQUIRED_PARTIES, type SurveyQuestionSeed } from "./surveyProfiles";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");

function loadJson(file: string): SurveyQuestionSeed[] {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function mergeSurveyQuestionBank(): SurveyQuestionSeed[] {
  const base = loadJson("surveyQuestions.json");
  const program = loadJson("programQuestions.json");
  const extra = loadJson("extraSurveyQuestions.json");

  const merged: SurveyQuestionSeed[] = [];
  const seen = new Set<string>();

  for (const question of [...base, ...program, ...extra]) {
    if (seen.has(question.text)) continue;

    const missingParties = REQUIRED_PARTIES.filter((p) => question.partyPositions[p] === undefined);
    if (missingParties.length > 0) {
      throw new Error(`Question missing parties ${missingParties.join(", ")}: ${question.text.slice(0, 60)}...`);
    }

    seen.add(question.text);
    merged.push(question);
  }

  return merged;
}

export function writeMergedSurveyBank(): number {
  const merged = mergeSurveyQuestionBank();
  fs.writeFileSync(path.join(dataDir, "surveyQuestions.json"), JSON.stringify(merged, null, 2));
  return merged.length;
}

if (process.argv[1]?.includes("mergeSurveyBank")) {
  const total = writeMergedSurveyBank();
  console.log(`Merged survey bank: ${total} questions total`);
}
