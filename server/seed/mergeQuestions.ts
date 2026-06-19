import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");

const REQUIRED_PARTIES = [
  "ΝΔ", "ΣΥΡΙΖΑ", "ΠΑΣΟΚ", "ΚΚΕ", "ΕΛ", "ΠΕ", "ΝΙΚΗ", "ΣΠΑΡ", "ΝΑ", "ΕΛΑΣ", "ΕΛΠ", "ΦΛ",
];

type QuestionSeed = {
  text: string;
  textEn?: string | null;
  category: string;
  partyPositions: Record<string, number>;
};

function loadJson(file: string): QuestionSeed[] {
  return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
}

const base = loadJson("surveyQuestions.json");
const program = loadJson("programQuestions.json");
const existingTexts = new Set(base.map((q) => q.text));

const merged = [...base];
let added = 0;

for (const question of program) {
  const missingParties = REQUIRED_PARTIES.filter((p) => question.partyPositions[p] === undefined);
  if (missingParties.length > 0) {
    throw new Error(`Question missing parties ${missingParties.join(", ")}: ${question.text.slice(0, 60)}...`);
  }
  if (existingTexts.has(question.text)) continue;
  merged.push(question);
  existingTexts.add(question.text);
  added++;
}

fs.writeFileSync(path.join(dataDir, "surveyQuestions.json"), JSON.stringify(merged, null, 2));
console.log(`Merged question bank: ${base.length} base + ${added} new = ${merged.length} total`);
