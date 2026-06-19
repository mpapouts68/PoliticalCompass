import { eq } from "drizzle-orm";
import { quizQuestions, quizResults } from "@shared/schema";
import { db } from "../db";
import { dedupeQuizQuestions, normalizeQuizQuestion } from "./normalizeQuiz";
import quizQuestionData from "./data/quizQuestions.json";
import extraQuizQuestionData from "./data/extraQuizQuestions.json";

export async function refreshQuizQuestions(): Promise<void> {
  const merged = dedupeQuizQuestions([
    ...(quizQuestionData as Array<Record<string, unknown>>).map((row) => normalizeQuizQuestion(row)!),
    ...(extraQuizQuestionData as Array<Record<string, unknown>>).map((row) => normalizeQuizQuestion(row)!),
  ].filter(Boolean));

  await db.delete(quizResults);
  await db.delete(quizQuestions);

  const batchSize = 50;
  for (let i = 0; i < merged.length; i += batchSize) {
    await db.insert(quizQuestions).values(merged.slice(i, i + batchSize));
  }

  console.log(`Refreshed quiz bank with ${merged.length} questions.`);
}

if (process.argv[1]?.includes("refreshQuiz")) {
  refreshQuizQuestions()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Quiz refresh failed:", error);
      process.exit(1);
    });
}
