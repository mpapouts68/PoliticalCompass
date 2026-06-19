import { eq } from "drizzle-orm";
import { parties, questions } from "@shared/schema";
import { db } from "../db";
import partyData from "./data/parties.json";
import surveyQuestionData from "./data/surveyQuestions.json";

type SurveyQuestionSeed = {
  text: string;
  partyPositions: Record<string, number>;
};

const TRACKED_SHORT_NAMES = ["ΕΛΑΣ", "ΕΛΠ", "ΦΛ"] as const;

export async function patchParties2026(): Promise<void> {
  const existing = await db.select().from(parties);
  const existingShortNames = new Set(existing.map((p) => p.shortName));

  for (const party of partyData) {
    if (!TRACKED_SHORT_NAMES.includes(party.shortName as (typeof TRACKED_SHORT_NAMES)[number])) {
      continue;
    }
    if (!existingShortNames.has(party.shortName)) {
      await db.insert(parties).values(party);
      console.log(`Added party: ${party.shortName}`);
    }
  }

  const allQuestions = await db.select().from(questions);
  const seedByText = new Map(
    (surveyQuestionData as SurveyQuestionSeed[]).map((q) => [q.text, q.partyPositions]),
  );

  let updated = 0;
  for (const question of allQuestions) {
    const seedPositions = seedByText.get(question.text);
    if (!seedPositions) continue;

    const current = question.partyPositions as Record<string, number>;
    const missing = TRACKED_SHORT_NAMES.filter((key) => current[key] === undefined);
    if (missing.length === 0) continue;

    const merged = { ...current };
    for (const key of missing) {
      if (seedPositions[key] !== undefined) {
        merged[key] = seedPositions[key];
      }
    }

    await db
      .update(questions)
      .set({ partyPositions: merged })
      .where(eq(questions.id, question.id));
    updated++;
  }

  console.log(`Updated ${updated} questions with new party positions.`);
}

if (process.argv[1]?.includes("patchParties2026")) {
  patchParties2026()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Patch failed:", error);
      process.exit(1);
    });
}
