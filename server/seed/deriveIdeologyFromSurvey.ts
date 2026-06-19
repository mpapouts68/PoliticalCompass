import type { SurveyQuestionSeed } from "./surveyProfiles";
import type { IdeologyQuestionSeed } from "./ideologyHelpers";

const LEFT_PARTIES = ["ΚΚΕ", "ΣΥΡΙΖΑ", "ΝΑ", "ΕΛΑΣ", "ΕΛΠ"] as const;
const RIGHT_PARTIES = ["ΝΔ", "ΕΛ", "ΝΙΚΗ", "ΣΠΑΡ"] as const;

function avgPosition(positions: Record<string, number>, parties: readonly string[]): number {
  const values = parties.map((party) => positions[party] ?? 0);
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Derive left-right ideology items from party-program survey questions. */
export function surveyToIdeologyQuestions(survey: SurveyQuestionSeed[]): IdeologyQuestionSeed[] {
  const results: IdeologyQuestionSeed[] = [];

  for (const question of survey) {
    const spread =
      avgPosition(question.partyPositions, LEFT_PARTIES) -
      avgPosition(question.partyPositions, RIGHT_PARTIES);

    if (Math.abs(spread) < 0.25) continue;

    const strength = Math.min(3, Math.max(1, Math.round(Math.abs(spread) * 1.5)));
    const textEn = question.textEn?.trim() || question.text;

    if (spread > 0) {
      results.push({
        text: question.text,
        textEn,
        category: question.category,
        leftScore: strength,
        rightScore: -strength,
      });
    } else {
      results.push({
        text: question.text,
        textEn,
        category: question.category,
        leftScore: -strength,
        rightScore: strength,
      });
    }
  }

  return results;
}
