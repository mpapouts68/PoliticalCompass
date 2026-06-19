import { count } from "drizzle-orm";
import {
  parties,
  questions,
  ideologyQuestions,
  quizQuestions,
  pmScenarios,
  pmPolicyOptions,
} from "@shared/schema";
import { db, runMigrations } from "../db";
import partyData from "./data/parties.json";
import { mergeSurveyQuestionBank } from "./mergeSurveyBank";
import { surveyToIdeologyQuestions } from "./deriveIdeologyFromSurvey";
import quizQuestionData from "./data/quizQuestions.json";
import extraQuizQuestionData from "./data/extraQuizQuestions.json";
import { dedupeQuizQuestions, normalizeQuizQuestion } from "./normalizeQuiz";
import { refreshPmData } from "./refreshPm";

async function seedCoreData(): Promise<void> {
  const existingParties = await db.select({ count: count() }).from(parties);
  if (existingParties[0]?.count > 0) {
    console.log("Core data already seeded, skipping parties/questions/ideology.");
    return;
  }

  console.log("Seeding parties...");
  await db.insert(parties).values(partyData);

  console.log("Seeding survey questions...");
  const surveyRows = mergeSurveyQuestionBank();
  await db.insert(questions).values(
    surveyRows.map((question) => ({
      text: question.text,
      textEn: question.textEn ?? null,
      category: question.category,
      partyPositions: question.partyPositions,
    })),
  );

  console.log("Seeding ideology questions from party programs...");
  const ideologyRows = surveyToIdeologyQuestions(surveyRows);
  await db.insert(ideologyQuestions).values(ideologyRows);
}

async function seedQuizData(): Promise<void> {
  const existing = await db.select({ count: count() }).from(quizQuestions);
  if (existing[0]?.count > 0) {
    console.log("Quiz questions already seeded.");
    return;
  }

  console.log("Seeding quiz questions...");
  const batchSize = 50;
  const rows = dedupeQuizQuestions([
    ...(quizQuestionData as Array<Record<string, unknown>>).map((row) => normalizeQuizQuestion(row)!),
    ...(extraQuizQuestionData as Array<Record<string, unknown>>).map((row) => normalizeQuizQuestion(row)!),
  ].filter(Boolean));

  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    if (batch.length > 0) {
      await db.insert(quizQuestions).values(batch);
    }
  }
}

async function seedPmData(): Promise<void> {
  const existing = await db.select({ count: count() }).from(pmScenarios);
  if (existing[0]?.count > 0) {
    console.log("PM scenarios already seeded.");
    return;
  }

  await refreshPmData();
}

export async function seedDatabase(force = false): Promise<void> {
  runMigrations();

  if (force) {
    const tables = [
      "pm_decisions",
      "pm_policy_options",
      "pm_scenarios",
      "quiz_results",
      "quiz_questions",
      "ideology_results",
      "ideology_responses",
      "ideology_questions",
      "survey_results",
      "survey_responses",
      "questions",
      "parties",
    ];
    for (const table of tables) {
      db.$client.prepare(`DELETE FROM ${table}`).run();
    }
    db.$client.prepare("DELETE FROM sqlite_sequence").run();
  }

  await seedCoreData();
  await seedQuizData();
  await seedPmData();

  const [partyCount] = await db.select({ count: count() }).from(parties);
  const [questionCount] = await db.select({ count: count() }).from(questions);
  const [ideologyCount] = await db.select({ count: count() }).from(ideologyQuestions);
  const [quizCount] = await db.select({ count: count() }).from(quizQuestions);
  const [pmScenarioCount] = await db.select({ count: count() }).from(pmScenarios);
  const [pmOptionCount] = await db.select({ count: count() }).from(pmPolicyOptions);

  console.log("Database seed complete:");
  console.log(`  Parties: ${partyCount.count}`);
  console.log(`  Survey questions: ${questionCount.count}`);
  console.log(`  Ideology questions: ${ideologyCount.count}`);
  console.log(`  Quiz questions: ${quizCount.count}`);
  console.log(`  PM scenarios: ${pmScenarioCount.count}`);
  console.log(`  PM policy options: ${pmOptionCount.count}`);
}

export async function isDatabaseEmpty(): Promise<boolean> {
  const [partyCount] = await db.select({ count: count() }).from(parties);
  return partyCount.count === 0;
}

if (process.argv[1]?.includes("seed")) {
  const force = process.argv.includes("--force");
  seedDatabase(force)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Seed failed:", error);
      process.exit(1);
    });
}
