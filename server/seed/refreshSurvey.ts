import { questions, surveyResponses, surveyResults } from "@shared/schema";
import { db } from "../db";
import { mergeSurveyQuestionBank } from "./mergeSurveyBank";

export async function refreshSurveyQuestions(): Promise<void> {
  const surveyRows = mergeSurveyQuestionBank();

  await db.delete(surveyResponses);
  await db.delete(surveyResults);
  await db.delete(questions);

  const batchSize = 50;
  for (let i = 0; i < surveyRows.length; i += batchSize) {
    await db.insert(questions).values(
      surveyRows.slice(i, i + batchSize).map((question) => ({
        text: question.text,
        textEn: question.textEn ?? null,
        category: question.category,
        partyPositions: question.partyPositions,
      })),
    );
  }

  console.log(`Refreshed survey bank with ${surveyRows.length} party-alignment questions.`);
}

if (process.argv[1]?.includes("refreshSurvey")) {
  refreshSurveyQuestions()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Survey refresh failed:", error);
      process.exit(1);
    });
}
