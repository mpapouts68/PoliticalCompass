export const REQUIRED_PARTIES = [
  "ΝΔ", "ΣΥΡΙΖΑ", "ΠΑΣΟΚ", "ΚΚΕ", "ΕΛ", "ΠΕ", "ΝΙΚΗ", "ΣΠΑΡ", "ΝΑ", "ΕΛΑΣ", "ΕΛΠ", "ΦΛ",
] as const;

export type PartyShort = (typeof REQUIRED_PARTIES)[number];
export type PartyProfile = Record<PartyShort, number>;

/** Typical party lean on a policy dimension (-2 … +2). */
export const PROFILES: Record<string, PartyProfile> = {
  proMarket: {
    ΝΔ: 2, ΣΥΡΙΖΑ: -2, ΠΑΣΟΚ: -1, ΚΚΕ: -2, ΕΛ: 1, ΠΕ: 2, ΝΙΚΗ: 0, ΣΠΑΡ: 0, ΝΑ: -1, ΕΛΑΣ: -2, ΕΛΠ: 0, ΦΛ: 1,
  },
  proWelfare: {
    ΝΔ: -1, ΣΥΡΙΖΑ: 2, ΠΑΣΟΚ: 2, ΚΚΕ: 2, ΕΛ: 0, ΠΕ: -1, ΝΙΚΗ: 0, ΣΠΑΡ: 0, ΝΑ: 2, ΕΛΑΣ: 2, ΕΛΠ: 2, ΦΛ: 0,
  },
  proEnvironment: {
    ΝΔ: 0, ΣΥΡΙΖΑ: 2, ΠΑΣΟΚ: 1, ΚΚΕ: 2, ΕΛ: -1, ΠΕ: 0, ΝΙΚΗ: -1, ΣΠΑΡ: -1, ΝΑ: 2, ΕΛΑΣ: 2, ΕΛΠ: 1, ΦΛ: 0,
  },
  proTraditional: {
    ΝΔ: 1, ΣΥΡΙΖΑ: -2, ΠΑΣΟΚ: -1, ΚΚΕ: -1, ΕΛ: 2, ΠΕ: 0, ΝΙΚΗ: 2, ΣΠΑΡ: 2, ΝΑ: -1, ΕΛΑΣ: -1, ΕΛΠ: 0, ΦΛ: 1,
  },
  proProgressive: {
    ΝΔ: -1, ΣΥΡΙΖΑ: 2, ΠΑΣΟΚ: 2, ΚΚΕ: 1, ΕΛ: -2, ΠΕ: 1, ΝΙΚΗ: -2, ΣΠΑΡ: -2, ΝΑ: 2, ΕΛΑΣ: 2, ΕΛΠ: 2, ΦΛ: 0,
  },
  proSecurity: {
    ΝΔ: 2, ΣΥΡΙΖΑ: 0, ΠΑΣΟΚ: 1, ΚΚΕ: -1, ΕΛ: 2, ΠΕ: 1, ΝΙΚΗ: 2, ΣΠΑΡ: 2, ΝΑ: 0, ΕΛΑΣ: 0, ΕΛΠ: 1, ΦΛ: 1,
  },
  proImmigrationRestrict: {
    ΝΔ: 1, ΣΥΡΙΖΑ: -2, ΠΑΣΟΚ: 0, ΚΚΕ: -1, ΕΛ: 2, ΠΕ: 1, ΝΙΚΗ: 2, ΣΠΑΡ: 2, ΝΑ: -1, ΕΛΑΣ: -1, ΕΛΠ: 0, ΦΛ: 1,
  },
  proEU: {
    ΝΔ: 2, ΣΥΡΙΖΑ: 0, ΠΑΣΟΚ: 2, ΚΚΕ: -2, ΕΛ: -1, ΠΕ: 1, ΝΙΚΗ: 0, ΣΠΑΡ: -1, ΝΑ: 0, ΕΛΑΣ: 0, ΕΛΠ: 2, ΦΛ: 1,
  },
  proLabor: {
    ΝΔ: -1, ΣΥΡΙΖΑ: 2, ΠΑΣΟΚ: 2, ΚΚΕ: 2, ΕΛ: 0, ΠΕ: -1, ΝΙΚΗ: 0, ΣΠΑΡ: 0, ΝΑ: 2, ΕΛΑΣ: 2, ΕΛΠ: 1, ΦΛ: 0,
  },
  proReform: {
    ΝΔ: 2, ΣΥΡΙΖΑ: 0, ΠΑΣΟΚ: 1, ΚΚΕ: -2, ΕΛ: 0, ΠΕ: 2, ΝΙΚΗ: 0, ΣΠΑΡ: 0, ΝΑ: 1, ΕΛΑΣ: 0, ΕΛΠ: 2, ΦΛ: 1,
  },
  proState: {
    ΝΔ: -1, ΣΥΡΙΖΑ: 2, ΠΑΣΟΚ: 1, ΚΚΕ: 2, ΕΛ: 0, ΠΕ: -2, ΝΙΚΗ: 0, ΣΠΑΡ: 0, ΝΑ: 2, ΕΛΑΣ: 2, ΕΛΠ: 1, ΦΛ: 0,
  },
};

export type SurveyQuestionSeed = {
  text: string;
  textEn: string;
  category: string;
  partyPositions: PartyProfile;
};

export function sq(
  text: string,
  textEn: string,
  category: string,
  profile: keyof typeof PROFILES,
): SurveyQuestionSeed {
  return { text, textEn, category, partyPositions: { ...PROFILES[profile] } };
}
