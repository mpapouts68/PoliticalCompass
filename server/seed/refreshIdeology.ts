import { ideologyQuestions, ideologyResponses, ideologyResults } from "@shared/schema";
import { db } from "../db";
import { surveyToIdeologyQuestions } from "./deriveIdeologyFromSurvey";
import { mergeSurveyQuestionBank } from "./mergeSurveyBank";

export async function refreshIdeologyQuestions(): Promise<void> {
  const rows = surveyToIdeologyQuestions(mergeSurveyQuestionBank());

  if (rows.length === 0) {
    throw new Error("No ideology questions derived from party programs.");
  }

  await db.delete(ideologyResponses);
  await db.delete(ideologyResults);
  await db.delete(ideologyQuestions);

  const batchSize = 50;
  for (let i = 0; i < rows.length; i += batchSize) {
    await db.insert(ideologyQuestions).values(rows.slice(i, i + batchSize));
  }

  console.log(`Refreshed ideology bank with ${rows.length} questions from party programs.`);
}

if (process.argv[1]?.includes("refreshIdeology")) {
  refreshIdeologyQuestions()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Ideology refresh failed:", error);
      process.exit(1);
    });
}
