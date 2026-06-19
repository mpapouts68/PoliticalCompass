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
  },
  {
    id: 6,
    name: "Πλεύση Ελευθερίας",
    shortName: "ΠΕ",
    color: "#059669",
    description: "Φιλελεύθερο κόμμα με έμφαση στην ατομική ελευθερία και την οικονομική ελευθερία.",
    ideology: "Φιλελευθερισμός",
    founded: 2021
  },
  {
    id: 7,
    name: "Νίκη",
    shortName: "ΝΙΚΗ",
    color: "#dc2626",
    description: "Εθνικό κόμμα με έμφαση στην παράδοση και τις θρησκευτικές αξίες.",
    ideology: "Εθνικός Συντηρητισμός",
    founded: 2019
  },
  {
    id: 8,
    name: "Σπαρτιάτες",
    shortName: "ΣΠΑΡ",
    color: "#7c2d12",
    description: "Εθνικιστικό κόμμα με στρατιωτικές αξίες και αντι-ευρωπαϊκή στάση.",
    ideology: "Εθνικισμός",
    founded: 2022
  },
  {
    id: 9,
    name: "Νέα Αριστερά",
    shortName: "ΝΑ",
    color: "#7c3aed",
    description: "Νέο αριστερό κόμμα με προοδευτικές και οικολογικές απόψεις.",
    ideology: "Πράσινη Αριστερά",
    founded: 2023
  },
  {
    id: 10,
    name: "Ελληνική Αριστερή Συμπαράταξη",
    shortName: "ΕΛΑΣ",
    color: "#E11D48",
    description: "Προοδευτικό αριστερό κόμμα του Αλέξη Τσίπρα με έμφαση στη κοινωνική δικαιοσύνη, τη δημοκρατία και την ανασυγκρότηση.",
    ideology: "Προοδευτική Αριστερά",
    founded: 2026,
    website: "https://elas.gr"
  },
  {
    id: 11,
    name: "Ελπίδα για τη Δημοκρατία",
    shortName: "ΕΛΠ",
    color: "#CA8A04",
    description: "Κίνημα της Μαρίας Καρυστιανού με επίκεντρο το κράτος δικαίου, την καταπολέμηση της διαφθοράς και την κοινωνική προστασία.",
    ideology: "Κράτος Δικαίου",
    founded: 2026,
    website: "https://xekiname.gr"
  },
  {
    id: 12,
    name: "Φωνή Λογικής",
    shortName: "ΦΛ",
    color: "#1D4ED8",
    description: "Πατριωτικό κόμμα της Αφροδίτης Λατινοπούλου με φιλελεύθερη οικονομία, προστασία της οικογένειας και αυστηρή μεταναστευτική πολιτική.",
    ideology: "Πατριωτική Δεξιά",
    founded: 2023,
    website: "https://fonilogikis.gr"
  }
];
