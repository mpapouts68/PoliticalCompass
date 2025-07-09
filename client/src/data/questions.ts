// This file contains the question bank for the political survey
// Questions are categorized and include party positions

export interface QuestionData {
  id: number;
  text: string;
  category: string;
  partyPositions: Record<string, number>; // Party short name -> position (-2 to 2)
}

export const questionCategories = [
  "Οικονομία",
  "Κοινωνικά",
  "Περιβάλλον",
  "Εξωτερική Πολιτική",
  "Εργασία",
  "Υγεία",
  "Μετανάστευση",
  "Άμυνα",
  "Διοίκηση",
  "Εκπαίδευση",
  "Κοινωνική Πολιτική"
];

// This is a comprehensive question bank that would be used in a real application
// For the demo, we're using a smaller set initialized in the storage
export const questionBank: QuestionData[] = [
  {
    id: 1,
    text: "Θεωρείτε ότι το κράτος πρέπει να παίζει μεγαλύτερο ρόλο στην οικονομία μέσω κρατικοποιήσεων και κρατικών επιχειρήσεων;",
    category: "Οικονομία",
    partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 2, "ΕΛ": -1 }
  },
  {
    id: 2,
    text: "Υποστηρίζετε τη νομιμοποίηση των συμφώνων συμβίωσης ομόφυλων ζευγαριών;",
    category: "Κοινωνικά",
    partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": -1, "ΕΛ": -2 }
  },
  // Additional questions would be added here for a complete implementation
];
