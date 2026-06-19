/** Official party websites — single source of truth for outbound links. */
export const PARTY_WEBSITES: Record<string, string> = {
  "ΝΔ": "https://nd.gr",
  "ΣΥΡΙΖΑ": "https://syriza.gr",
  "ΠΑΣΟΚ": "https://pasok.gr",
  "ΚΚΕ": "https://kke.gr",
  "ΕΛ": "https://elliniki-lysi.gr",
  "ΠΕ": "https://plefsi.gr",
  "ΝΙΚΗ": "https://niki.gr",
  "ΣΠΑΡ": "https://spartiates.gr",
  "ΝΑ": "https://nea-aristera.gr",
  "ΕΛΑΣ": "https://myelas.gr",
  "ΕΛΠ": "https://xekiname.gr",
  "ΦΛ": "https://fonilogikis.gr",
};

export function getPartyWebsite(shortName: string): string | undefined {
  return PARTY_WEBSITES[shortName];
}
