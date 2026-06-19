import { questions } from "@shared/schema";
import { db } from "../db";
import programQuestionData from "./data/programQuestions.json";

type QuestionSeed = {
  text: string;
  category: string;
  partyPositions: Record<string, number>;
};

export async function appendProgramQuestions(): Promise<void> {
  const existing = await db.select().from(questions);
  const existingTexts = new Set(existing.map((q) => q.text));

  const toInsert = (programQuestionData as QuestionSeed[]).filter((q) => !existingTexts.has(q.text));
  if (toInsert.length === 0) {
    console.log("No new program questions to add.");
    return;
  }

  const inserted = await db
    .insert(questions)
    .values(
      toInsert.map((question) => ({
        text: question.text,
        category: question.category,
        partyPositions: question.partyPositions,
      })),
    )
    .returning();

  console.log(`Added ${inserted.length} program-aligned survey questions (party test only).`);
}

if (process.argv[1]?.includes("appendProgramQuestions")) {
  appendProgramQuestions()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Append failed:", error);
      process.exit(1);
    });
}
