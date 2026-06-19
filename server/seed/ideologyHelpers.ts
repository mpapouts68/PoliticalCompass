export type IdeologyQuestionSeed = {
  text: string;
  textEn: string;
  category: string;
  leftScore: number;
  rightScore: number;
};

export function iq(
  text: string,
  textEn: string,
  category: string,
  leftScore: number,
  rightScore: number,
): IdeologyQuestionSeed {
  return { text, textEn, category, leftScore, rightScore };
}

/** Left-wing statement: agree pushes left */
export function leftStatement(text: string, textEn: string, category: string, strength = 3): IdeologyQuestionSeed {
  return iq(text, textEn, category, strength, -strength);
}

/** Right-wing statement: agree pushes right */
export function rightStatement(text: string, textEn: string, category: string, strength = 3): IdeologyQuestionSeed {
  return iq(text, textEn, category, -strength, strength);
}
