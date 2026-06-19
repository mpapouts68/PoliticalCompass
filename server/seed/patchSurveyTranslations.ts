import { eq } from "drizzle-orm";
import { questions } from "@shared/schema";
import { db } from "../db";
import surveyQuestionData from "./data/surveyQuestions.json";

type SurveyQuestionSeed = {
  text: string;
  textEn: string | null;
  category: string;
  partyPositions: Record<string, number>;
};

export async function patchSurveyTranslations(): Promise<void> {
  const seeds = surveyQuestionData as SurveyQuestionSeed[];
  let updated = 0;

  for (const seed of seeds) {
    if (!seed.textEn) continue;

    await db
      .update(questions)
      .set({ textEn: seed.textEn })
      .where(eq(questions.text, seed.text));

    updated++;
  }

  console.log(`Patched English translations for ${updated} survey questions.`);
}

if (process.argv[1]?.includes("patchSurveyTranslations")) {
  patchSurveyTranslations()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Patch failed:", error);
      process.exit(1);
    });
}
