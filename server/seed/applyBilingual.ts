import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const dataDir = path.join(__dirname, "data");

export function parseSurveyTranslationsSql(sqlPath: string): Record<string, string> {
  const sql = fs.readFileSync(sqlPath, "utf8");
  const map: Record<string, string> = {};

  const regex = /text_en = '((?:''|[^'])*)' WHERE text = '((?:''|[^'])*)'/g;
  for (const match of sql.matchAll(regex)) {
    const english = match[1].replace(/''/g, "'");
    const greek = match[2].replace(/''/g, "'");
    map[greek] = english;
  }

  return map;
}

export const CATEGORY_EN: Record<string, string> = {
  "Οικονομία": "Economy",
  "Κοινωνικά": "Social Issues",
  "Περιβάλλον": "Environment",
  "Άμυνα": "Defense",
  "Εξωτερική Πολιτική": "Foreign Policy",
  "Δικαιοσύνη": "Justice",
  "Διοίκηση": "Governance",
  "Εκπαίδευση": "Education",
  "Υγεία": "Healthcare",
  "Εργασία": "Labor",
  "Μετανάστευση": "Immigration",
  "Τεχνολογία": "Technology",
  "Κοινωνική Πολιτική": "Social Policy",
  "Σύνταγμα": "Constitution",
  "Ευρωπαϊκή Πολιτική": "European Policy",
  "Ενέργεια": "Energy",
  "Στέγαση": "Housing",
  "Αγροτική Πολιτική": "Agricultural Policy",
  "Πολιτισμός": "Culture",
  "Ασφάλεια": "Security",
  economic: "Economy",
  social: "Social Issues",
  crisis: "Crisis",
  foreign_policy: "Foreign Policy",
  justice: "Justice",
  politics: "Politics",
  environment: "Environment",
  energy: "Energy",
  health: "Healthcare",
  education: "Education",
  technology: "Technology",
  defense: "Defense",
  society: "Society",
  economy: "Economy",
};

export const PM_CATEGORY_EN = CATEGORY_EN;

type SurveySeed = {
  text: string;
  textEn?: string | null;
  category: string;
  categoryEn?: string | null;
  partyPositions: Record<string, number>;
};

function loadExtraTranslations(): Record<string, string> {
  const file = path.join(dataDir, "surveyTranslationsExtra.json");
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function applySurveyBilingual(): number {
  const sqlMap = parseSurveyTranslationsSql(path.join(root, "add_english_translations.sql"));
  const extraMap = loadExtraTranslations();
  const combined = { ...sqlMap, ...extraMap };

  const survey = JSON.parse(fs.readFileSync(path.join(dataDir, "surveyQuestions.json"), "utf8")) as SurveySeed[];
  let applied = 0;

  for (const question of survey) {
    const textEn = combined[question.text];
    if (textEn) {
      question.textEn = textEn;
      applied++;
    } else if (!question.textEn) {
      question.textEn = null;
    }
    question.categoryEn = CATEGORY_EN[question.category] ?? question.category;
  }

  fs.writeFileSync(path.join(dataDir, "surveyQuestions.json"), JSON.stringify(survey, null, 2));
  return applied;
}

export function applyProgramBilingual(): number {
  const extraMap = loadExtraTranslations();
  const program = JSON.parse(fs.readFileSync(path.join(dataDir, "programQuestions.json"), "utf8")) as SurveySeed[];
  let applied = 0;

  for (const question of program) {
    const textEn = extraMap[question.text];
    if (textEn) {
      question.textEn = textEn;
      applied++;
    } else if (!question.textEn) {
      question.textEn = null;
    }
    question.categoryEn = CATEGORY_EN[question.category] ?? question.category;
  }

  fs.writeFileSync(path.join(dataDir, "programQuestions.json"), JSON.stringify(program, null, 2));
  return applied;
}

type QuizTranslation = { questionEn: string; explanationEn: string };

function loadQuizTranslationsExtra(): Record<string, QuizTranslation> {
  const file = path.join(dataDir, "quizTranslationsExtra.json");
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

type QuizSeed = {
  question: string;
  questionEn?: string | null;
  explanation: string;
  explanationEn?: string | null;
};

export function applyQuizBilingual(): number {
  const translations = loadQuizTranslationsExtra();
  const extraPath = path.join(dataDir, "extraQuizQuestions.json");
  if (!fs.existsSync(extraPath)) return 0;

  const extra = JSON.parse(fs.readFileSync(extraPath, "utf8")) as QuizSeed[];
  let applied = 0;

  for (const item of extra) {
    const tr = translations[item.question];
    if (!tr) continue;
    if (!item.questionEn) {
      item.questionEn = tr.questionEn;
      applied++;
    }
    if (!item.explanationEn) {
      item.explanationEn = tr.explanationEn;
    }
  }

  fs.writeFileSync(extraPath, JSON.stringify(extra, null, 2));
  return applied;
}

if (process.argv[1]?.includes("applyBilingual")) {
  const surveyCount = applySurveyBilingual();
  const programCount = applyProgramBilingual();
  const quizCount = applyQuizBilingual();
  const survey = JSON.parse(fs.readFileSync(path.join(dataDir, "surveyQuestions.json"), "utf8"));
  const missing = survey.filter((q: SurveySeed) => !q.textEn).length;
  console.log(`Applied translations: ${surveyCount} survey, ${programCount} program, ${quizCount} quiz. Missing survey EN: ${missing}`);
}
