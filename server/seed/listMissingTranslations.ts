import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseSurveyTranslationsSql } from "./applyBilingual";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const dataDir = path.join(__dirname, "data");

const sqlMap = parseSurveyTranslationsSql(path.join(root, "add_english_translations.sql"));
const survey = JSON.parse(fs.readFileSync(path.join(dataDir, "surveyQuestions.json"), "utf8"));
const program = JSON.parse(fs.readFileSync(path.join(dataDir, "programQuestions.json"), "utf8"));

const missing = new Set<string>();
for (const q of [...survey, ...program]) {
  if (!sqlMap[q.text]) missing.add(q.text);
}

const out = path.join(dataDir, "missingTranslations.json");
fs.writeFileSync(out, JSON.stringify([...missing], null, 2));
console.log(`Missing ${missing.size} translations -> ${out}`);
