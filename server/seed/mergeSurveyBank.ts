import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REQUIRED_PARTIES, type SurveyQuestionSeed } from "./surveyProfiles";
import baseQuestions from "./data/surveyQuestions.json";
import programQuestions from "./data/programQuestions.json";
import extraQuestions from "./data/extraSurveyQuestions.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");

function loadJsonFromDisk(file: string): SurveyQuestionSeed[] {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function mergeSurveyQuestionBank(): SurveyQuestionSeed[] {
  const base = (baseQuestions as SurveyQuestionSeed[]).length
    ? (baseQuestions as SurveyQuestionSeed[])
    : loadJsonFromDisk("surveyQuestions.json");
  const program = (programQuestions as SurveyQuestionSeed[]).length
    ? (programQuestions as SurveyQuestionSeed[])
    : loadJsonFromDisk("programQuestions.json");
  const extra = (extraQuestions as SurveyQuestionSeed[]).length
    ? (extraQuestions as SurveyQuestionSeed[])
    : loadJsonFromDisk("extraSurveyQuestions.json");

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
