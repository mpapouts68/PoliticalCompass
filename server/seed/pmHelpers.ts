export type PmOptionSeed = {
  optionText: string;
  optionTextEn: string | null;
  politicalCost: number;
  economicImpact: number;
  socialImpact: number;
  partyAlignment: string;
  consequences: string;
  consequencesEn: string | null;
};

export type PmScenarioBundle = {
  sourceId: number;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
  context: string;
  contextEn: string | null;
  category: string;
  difficulty: number;
  timePressure: number;
  options: PmOptionSeed[];
};

const PARTY_KEYS = ["ΝΔ", "ΣΥΡΙΖΑ", "ΠΑΣΟΚ", "ΚΚΕ", "ΕΛ", "ΠΕ", "ΝΙΚΗ", "ΣΠΑΡ", "ΝΑ", "ΕΛΑΣ", "ΕΛΠ", "ΦΛ"] as const;

export function partyAlign(overrides: Partial<Record<(typeof PARTY_KEYS)[number], number>>): string {
  const values = Object.fromEntries(PARTY_KEYS.map((key) => [key, overrides[key] ?? 2]));
  return JSON.stringify(values);
}

export function option(
  text: string,
  textEn: string,
  political: number,
  economic: number,
  social: number,
  align: Partial<Record<(typeof PARTY_KEYS)[number], number>>,
  consequences: string,
  consequencesEn: string,
): PmOptionSeed {
  return {
    optionText: text,
    optionTextEn: textEn,
    politicalCost: political,
    economicImpact: economic,
    socialImpact: social,
    partyAlignment: partyAlign(align),
    consequences,
    consequencesEn,
  };
}

export function scenario(
  sourceId: number,
  title: string,
  titleEn: string,
  description: string,
  descriptionEn: string,
  context: string,
  contextEn: string,
  category: string,
  difficulty: number,
  timePressure: number,
  options: PmOptionSeed[],
): PmScenarioBundle {
  return {
    sourceId,
    title,
    titleEn,
    description,
    descriptionEn,
    context,
    contextEn,
    timePressure,
    category,
    difficulty,
    options,
  };
}
