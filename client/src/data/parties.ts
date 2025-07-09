// This file contains data about Greek political parties

export interface PartyData {
  id: number;
  name: string;
  shortName: string;
  color: string;
  description: string;
  ideology: string;
  website?: string;
  founded?: number;
}

export const greekParties: PartyData[] = [
  {
    id: 1,
    name: "Νέα Δημοκρατία",
    shortName: "ΝΔ",
    color: "#0066CC",
    description: "Κεντροδεξιό κόμμα με έμφαση στη φιλελεύθερη οικονομία και την ευρωπαϊκή ολοκλήρωση.",
    ideology: "Κεντροδεξιά",
    founded: 1974
  },
  {
    id: 2,
    name: "ΣΥΡΙΖΑ",
    shortName: "ΣΥΡΙΖΑ",
    color: "#CC0000",
    description: "Αριστερό κόμμα με προοδευτικό πρόγραμμα και κοινωνική δικαιοσύνη.",
    ideology: "Αριστερά",
    founded: 2004
  },
  {
    id: 3,
    name: "ΠΑΣΟΚ-ΚΙΝΑΛ",
    shortName: "ΠΑΣΟΚ",
    color: "#009900",
    description: "Κεντροαριστερό κόμμα με σοσιαλδημοκρατικό πρόγραμμα.",
    ideology: "Κεντροαριστερά",
    founded: 1974
  },
  {
    id: 4,
    name: "ΚΚΕ",
    shortName: "ΚΚΕ",
    color: "#990000",
    description: "Κομμουνιστικό κόμμα με μαρξιστικό-λενινιστικό πρόγραμμα.",
    ideology: "Κομμουνισμός",
    founded: 1918
  },
  {
    id: 5,
    name: "Ελληνική Λύση",
    shortName: "ΕΛ",
    color: "#663399",
    description: "Δεξιό κόμμα με εθνικιστικό πρόγραμμα και ευρωσκεπτικισμό.",
    ideology: "Δεξιά",
    founded: 2016
  }
];
