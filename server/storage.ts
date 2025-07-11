import { 
  questions, 
  parties, 
  surveyResponses, 
  surveyResults,
  type Question, 
  type Party, 
  type SurveyResponse, 
  type SurveyResult,
  type InsertQuestion,
  type InsertParty,
  type InsertSurveyResponse,
  type InsertSurveyResult,
  type QuestionCount
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, sql } from "drizzle-orm";

export interface IStorage {
  // Questions
  getQuestions(count: QuestionCount, excludeIds?: number[]): Promise<Question[]>;
  getAllQuestions(): Promise<Question[]>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // Parties
  getAllParties(): Promise<Party[]>;
  createParty(party: InsertParty): Promise<Party>;
  
  // Survey responses
  saveSurveyResponse(response: InsertSurveyResponse): Promise<SurveyResponse>;
  getSurveyResponses(sessionId: string): Promise<SurveyResponse[]>;
  
  // Survey results
  saveSurveyResult(result: InsertSurveyResult): Promise<SurveyResult>;
  getSurveyResult(sessionId: string): Promise<SurveyResult | undefined>;
  
  // Election statistics
  getTotalSurveyCount(): Promise<number>;
  getPartyStatistics(): Promise<Array<{party: string; percentage: number; count: number}>>;
  getRecentResults(limit?: number): Promise<SurveyResult[]>;
}

export class MemStorage implements IStorage {
  private questions: Map<number, Question>;
  private parties: Map<number, Party>;
  private responses: Map<string, SurveyResponse[]>;
  private results: Map<string, SurveyResult>;
  private currentQuestionId: number;
  private currentPartyId: number;
  private currentResponseId: number;
  private currentResultId: number;

  constructor() {
    this.questions = new Map();
    this.parties = new Map();
    this.responses = new Map();
    this.results = new Map();
    this.currentQuestionId = 1;
    this.currentPartyId = 1;
    this.currentResponseId = 1;
    this.currentResultId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize Greek political parties
    const partyData = [
      {
        name: "Νέα Δημοκρατία",
        shortName: "ΝΔ",
        color: "#0066CC",
        description: "Κεντροδεξιό κόμμα με έμφαση στη φιλελεύθερη οικονομία και την ευρωπαϊκή ολοκλήρωση.",
        ideology: "Κεντροδεξιά"
      },
      {
        name: "ΣΥΡΙΖΑ",
        shortName: "ΣΥΡΙΖΑ",
        color: "#CC0000",
        description: "Αριστερό κόμμα με προοδευτικό πρόγραμμα και κοινωνική δικαιοσύνη.",
        ideology: "Αριστερά"
      },
      {
        name: "ΠΑΣΟΚ-ΚΙΝΑΛ",
        shortName: "ΠΑΣΟΚ",
        color: "#009900",
        description: "Κεντροαριστερό κόμμα με σοσιαλδημοκρατικό πρόγραμμα.",
        ideology: "Κεντροαριστερά"
      },
      {
        name: "ΚΚΕ",
        shortName: "ΚΚΕ",
        color: "#990000",
        description: "Κομμουνιστικό κόμμα με μαρξιστικό-λενινιστικό πρόγραμμα.",
        ideology: "Κομμουνισμός"
      },
      {
        name: "Ελληνική Λύση",
        shortName: "ΕΛ",
        color: "#663399",
        description: "Δεξιό κόμμα με εθνικιστικό πρόγραμμα και ευρωσκεπτικισμό.",
        ideology: "Δεξιά"
      },
      {
        name: "Πλεύση Ελευθερίας",
        shortName: "ΠΕ",
        color: "#059669",
        description: "Φιλελεύθερο κόμμα με έμφαση στην ατομική ελευθερία και την οικονομική ελευθερία.",
        ideology: "Φιλελευθερισμός"
      },
      {
        name: "Νίκη",
        shortName: "ΝΙΚΗ",
        color: "#dc2626",
        description: "Εθνικό κόμμα με έμφαση στην παράδοση και τις θρησκευτικές αξίες.",
        ideology: "Εθνικός Συντηρητισμός"
      },
      {
        name: "Σπαρτιάτες",
        shortName: "ΣΠΑΡ",
        color: "#7c2d12",
        description: "Εθνικιστικό κόμμα με στρατιωτικές αξίες και αντι-ευρωπαϊκή στάση.",
        ideology: "Εθνικισμός"
      },
      {
        name: "Νέα Αριστερά",
        shortName: "ΝΑ",
        color: "#7c3aed",
        description: "Νέο αριστερό κόμμα με προοδευτικές και οικολογικές απόψεις.",
        ideology: "Πράσινη Αριστερά"
      }
    ];

    partyData.forEach(party => this.createParty(party));

    // Initialize sample questions with party positions
    const questionData = [
      {
        text: "Θεωρείτε ότι το κράτος πρέπει να παίζει μεγαλύτερο ρόλο στην οικονομία μέσω κρατικοποιήσεων και κρατικών επιχειρήσεων;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 2, "ΕΛ": -1, "ΠΕ": -1, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε τη νομιμοποίηση των συμφώνων συμβίωσης ομόφυλων ζευγαριών;",
        category: "Κοινωνικά",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": -1, "ΕΛ": -2, "ΠΕ": 0, "ΝΙΚΗ": -2, "ΣΠΑΡ": -2, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να σταματήσει άμεσα η εξόρυξη λιγνίτη στην Ελλάδα;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 0, "ΕΛ": -2, "ΠΕ": -1, "ΝΙΚΗ": -2, "ΣΠΑΡ": -2, "ΝΑ": 1 }
      },
      {
        text: "Η Ελλάδα πρέπει να ενισχύσει τη συνεργασία της με το ΝΑΤΟ;",
        category: "Εξωτερική Πολιτική",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 1, "ΚΚΕ": -2, "ΕΛ": 0, "ΠΕ": 2, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -1 }
      },
      {
        text: "Υποστηρίζετε την αύξηση του κατώτατου μισθού;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": 0, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να μειωθούν οι φόροι για τις επιχειρήσεις;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": -2 }
      },
      {
        text: "Υποστηρίζετε την ενίσχυση του δημόσιου συστήματος υγείας;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστεί η μετανάστευση στην Ελλάδα;",
        category: "Μετανάστευση",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -1, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": -1 }
      },
      {
        text: "Υποστηρίζετε την αποκρατικοποίηση δημόσιων επιχειρήσεων;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -2 }
      },
      {
        text: "Πρέπει να αυξηθούν οι δαπάνες για την άμυνα;",
        category: "Άμυνα",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -2, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": -1 }
      },
      {
        text: "Υποστηρίζετε την ψηφιοποίηση της δημόσιας διοίκησης;",
        category: "Διοίκηση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να μειωθεί η γραφειοκρατία στο δημόσιο τομέα;",
        category: "Διοίκηση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των ανανεώσιμων πηγών ενέργειας;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να ενισχυθεί η ιδιωτική εκπαίδευση στην Ελλάδα;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -2 }
      },
      {
        text: "Υποστηρίζετε την αύξηση των συντάξεων;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      // Additional questions for larger surveys
      {
        text: "Θεωρείτε ότι πρέπει να αυξηθεί η φορολογία για τους υψηλόμισθους;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": -1, "ΠΕ": -1, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των δικαιωμάτων των εργαζομένων;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": -1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να ενισχυθεί ο ρόλος της Εκκλησίας στην εκπαίδευση;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": -2 }
      },
      {
        text: "Υποστηρίζετε την αποποινικοποίηση της χρήσης κάνναβης;",
        category: "Κοινωνικά",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -1, "ΕΛ": -2, "ΠΕ": -1, "ΝΙΚΗ": -2, "ΣΠΑΡ": -2, "ΝΑ": 1 }
      },
      {
        text: "Θεωρείτε ότι η Ελλάδα πρέπει να αποχωρήσει από την Ευρωζώνη;",
        category: "Εξωτερική Πολιτική",
        partyPositions: { "ΝΔ": -2, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": -2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": -2, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -1 }
      },
      {
        text: "Υποστηρίζετε την κατασκευή νέων πυρηνικών εργοστασίων;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": -2 }
      },
      {
        text: "Πρέπει να περιοριστούν οι απεργίες στους βασικούς τομείς;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -2 }
      },
      {
        text: "Υποστηρίζετε την υποχρεωτική στρατιωτική θητεία;",
        category: "Άμυνα",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -1, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": -1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να ενισχυθεί η ασφάλεια στα σύνορα;",
        category: "Μετανάστευση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 2, "ΠΕ": 2, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Υποστηρίζετε την ελεύθερη διάθεση αντισυλληπτικών χαπιών;",
        category: "Κοινωνικά",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": -1, "ΠΕ": 1, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να αυξηθούν οι ποινές για τα οικονομικά εγκλήματα;",
        category: "Δικαιοσύνη",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την ιδιωτικοποίηση των αεροδρομίων;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 0, "ΠΕ": 2, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να ενισχυθεί η γαλλική γλώσσα στα σχολεία;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": -1, "ΠΕ": 0, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση του τέλους κυκλοφορίας για τα αυτοκίνητα;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 0, "ΚΚΕ": 1, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Πρέπει να περιοριστεί η πρόσβαση στα social media για τους ανήλικους;",
        category: "Κοινωνικά",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Υποστηρίζετε την επιβολή περιβαλλοντικού τέλους σε βιομηχανίες;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": -1, "ΠΕ": 0, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να αυξηθούν τα όρια ταχύτητας στους αυτοκινητόδρομους;",
        category: "Μεταφορές",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": -1, "ΚΚΕ": -1, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": -1 }
      },
      {
        text: "Υποστηρίζετε την ενίσχυση των τοπικών αυτοδιοικήσεων;",
        category: "Διοίκηση",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να καταργηθεί η θανατική ποινή οριστικά;",
        category: "Δικαιοσύνη",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": -1, "ΠΕ": 1, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των δημόσιων συγκοινωνιών;",
        category: "Μεταφορές",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να αυξηθεί η χρηματοδότηση για την έρευνα;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση της βενζίνης αμόλυβδης;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να περιοριστεί η διαφήμιση των τσιγάρων;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την αύξηση του φόρου στα πολυτελή αγαθά;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": -1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να ενισχυθεί η αστυνόμευση στις πόλεις;",
        category: "Ασφάλεια",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 1, "ΚΚΕ": -1, "ΕΛ": 2, "ΠΕ": 2, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των διοδίων;",
        category: "Μεταφορές",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": -1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Πρέπει να αυξηθεί η χρηματοδότηση για τις τέχνες;",
        category: "Πολιτισμός",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 0, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση του μετρό σε όλες τις μεγάλες πόλεις;",
        category: "Μεταφορές",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστεί η χρήση πλαστικών σακουλών;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση της υποχρεωτικής φοίτησης στο Λύκειο;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -2, "ΚΚΕ": -2, "ΕΛ": 0, "ΠΕ": -1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -2 }
      },
      {
        text: "Πρέπει να αυξηθούν οι ελέγχοι για την φοροδιαφυγή;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των κλειστών επαγγελμάτων;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -2, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": -1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να ενισχυθεί η προστασία των προσωπικών δεδομένων;",
        category: "Τεχνολογία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση του ωραρίου των καταστημάτων;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": -1 }
      },
      {
        text: "Πρέπει να περιοριστούν οι επενδύσεις σε fossil fuels;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": -1, "ΠΕ": 0, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών κινητής τηλεφωνίας στην ΕΕ;",
        category: "Τεχνολογία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 2, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να αυξηθεί η στήριξη για τις νεοφυείς επιχειρήσεις;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των bike lanes στις πόλεις;",
        category: "Μεταφορές",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να ενισχυθεί η προστασία των εργαζομένων στα delivery;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση της υποχρεωτικής χρήσης μάσκας;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 0, "ΚΚΕ": -1, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να αυξηθεί η χρηματοδότηση για τη ψυχική υγεία;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών στις τράπεζες;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": -1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Πρέπει να περιοριστεί η χρήση των αυτοκινήτων στα κέντρα των πόλεων;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 1, "ΕΛ": -1, "ΠΕ": 0, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των κάμερων ασφαλείας στους δρόμους;",
        category: "Ασφάλεια",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -2, "ΕΛ": 2, "ΠΕ": 2, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": -1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να ενισχυθεί η στήριξη για τις μονογονεϊκές οικογένειες;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση της λογοκρισίας στο διαδίκτυο;",
        category: "Τεχνολογία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": -1, "ΠΕ": 0, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 1 }
      },
      {
        text: "Πρέπει να αυξηθεί η στήριξη για τους αγρότες;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των εξετάσεων εισόδου στα πανεπιστήμια;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": -2, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": -1, "ΚΚΕ": 0, "ΕΛ": -1, "ΠΕ": -2, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": -1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να ενισχυθεί η προστασία των καταναλωτών;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των εργαστηρίων στα σχολεία;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να περιοριστούν οι εισαγωγές από χώρες εκτός ΕΕ;",
        category: "Εξωτερική Πολιτική",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": -1, "ΚΚΕ": 1, "ΕΛ": 2, "ΠΕ": -1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση της αξιολόγησης των εκπαιδευτικών;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": -2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": -2, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να ενισχυθεί η διαφάνεια στη δημόσια διοίκηση;",
        category: "Διοίκηση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των φόρων κληρονομιάς;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": -2 }
      },
      {
        text: "Πρέπει να αυξηθεί η στήριξη για τα άτομα με αναπηρίες;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των δωρεάν γευμάτων στα σχολεία;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστεί η διαφήμιση των στοιχημάτων;",
        category: "Κοινωνικά",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση του χρονικού ορίου στις άδειες μητρότητας;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": 0, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να ενισχυθεί η κυβερνοασφάλεια στο κράτος;",
        category: "Τεχνολογία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 2, "ΠΕ": 2, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των κοινόχρηστων χώρων στις πόλεις;",
        category: "Πολεοδομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστούν τα διαφημιστικά μηνύματα για παιδιά;",
        category: "Κοινωνικά",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών διοδίων σε νησιά;",
        category: "Μεταφορές",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 2, "ΠΕ": 0, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 1 }
      },
      {
        text: "Πρέπει να αυξηθεί η στήριξη για τους νέους επιχειρηματίες;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 0, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των υπηρεσιών τηλεϊατρικής;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστεί η χρήση των drones από ιδιώτες;",
        category: "Τεχνολογία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών στα φάρμακα;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να ενισχυθεί η προστασία των παραλιών από την οικοδόμηση;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των προγραμμάτων δια βίου μάθησης;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστούν οι τιμές των ενοικίων;",
        category: "Στέγαση",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": -1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών κίνησης κεφαλαίων;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -2, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": -1 }
      },
      {
        text: "Πρέπει να αυξηθεί η χρηματοδότηση για τα κέντρα ημερήσιας φροντίδας;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των προγραμμάτων ανακύκλωσης;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστεί η εξαγωγή φυσικών πόρων;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": -1, "ΠΕ": 0, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των περιορισμών στις Sunday εργασίες;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": -2 }
      },
      {
        text: "Πρέπει να ενισχυθεί η στήριξη για τους homeless;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των δικτύων 5G σε όλη τη χώρα;",
        category: "Τεχνολογία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 0, "ΠΕ": 2, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστούν οι επενδύσεις σε κρυπτονομίσματα;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των φόρων στις μικρές επιχειρήσεις;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 1, "ΚΚΕ": -1, "ΕΛ": 2, "ΠΕ": 2, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Πρέπει να αυξηθεί η στήριξη για τις επιχειρήσεις που εφαρμόζουν green practices;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των προγραμμάτων apprenticeship;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστούν οι διαφημίσεις αλκοόλ στα ΜΜΕ;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση της μείωσης του ΦΠΑ σε βασικά αγαθά;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -2, "ΚΚΕ": -2, "ΕΛ": -1, "ΠΕ": -1, "ΝΙΚΗ": -2, "ΣΠΑΡ": -1, "ΝΑ": -2 }
      },
      {
        text: "Πρέπει να ενισχυθεί η προστασία των εργαζομένων στην οικονομία του διαμοιρασμού;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των κοινωνικών δομών στην επαρχία;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστούν τα μπόνους των τραπεζικών στελεχών;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών στις τραπεζικές συναλλαγές;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Πρέπει να αυξηθεί η χρηματοδότηση για τα μουσεία και τις βιβλιοθήκες;",
        category: "Πολιτισμός",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των προγραμμάτων εθελοντισμού;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστούν οι εκπομπές CO2 από τα αυτοκίνητα;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0, "ΠΕ": 1, "ΝΙΚΗ": -1, "ΣΠΑΡ": 0, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των περιορισμών στις ώρες λειτουργίας των φαρμακείων;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": 1, "ΚΚΕ": -1, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 0 }
      },
      {
        text: "Πρέπει να ενισχυθεί η στήριξη για τις μικρές αγροτικές εκμεταλλεύσεις;",
        category: "Αγροτική Πολιτική",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 2, "ΠΕ": 1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των δωρεάν WiFi hotspots στις πόλεις;",
        category: "Τεχνολογία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστεί η διαφήμιση των fast food προς παιδιά;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών εισόδου στα μουσεία για φοιτητές;",
        category: "Πολιτισμός",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Πρέπει να αυξηθεί η στήριξη για τις εργαζόμενες μητέρες;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 1, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των προγραμμάτων κατάρτισης για άνεργους;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 1, "ΠΕ": 2, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστούν οι εισαγωγές ξένων αυτοκινήτων;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 0, "ΠΑΣΟΚ": -1, "ΚΚΕ": 1, "ΕΛ": 2, "ΠΕ": -1, "ΝΙΚΗ": 1, "ΣΠΑΡ": 2, "ΝΑ": 0 }
      },
      {
        text: "Υποστηρίζετε την κατάργηση των τελών στις κάρτες πληρωμών;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 1 }
      },
      {
        text: "Πρέπει να ενισχυθεί η προστασία των εργαζομένων στη νυχτερινή εργασία;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1, "ΠΕ": 0, "ΝΙΚΗ": 0, "ΣΠΑΡ": 1, "ΝΑ": 2 }
      }];

    questionData.forEach(question => this.createQuestion(question));
  }

  async getQuestions(count: QuestionCount, excludeIds: number[] = []): Promise<Question[]> {
    const allQuestions = Array.from(this.questions.values());
    const num = parseInt(count);
    
    // Filter out excluded questions (already answered)
    const availableQuestions = allQuestions.filter(q => !excludeIds.includes(q.id));
    
    // Shuffle questions and return the requested count
    const shuffled = availableQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(num, shuffled.length));
  }

  async getAllQuestions(): Promise<Question[]> {
    return Array.from(this.questions.values());
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const question: Question = { ...insertQuestion, id };
    this.questions.set(id, question);
    return question;
  }

  async getAllParties(): Promise<Party[]> {
    return Array.from(this.parties.values());
  }

  async createParty(insertParty: InsertParty): Promise<Party> {
    const id = this.currentPartyId++;
    const party: Party = { ...insertParty, id };
    this.parties.set(id, party);
    return party;
  }

  async saveSurveyResponse(insertResponse: InsertSurveyResponse): Promise<SurveyResponse> {
    const id = this.currentResponseId++;
    const response: SurveyResponse = { 
      ...insertResponse, 
      id,
      createdAt: new Date()
    };
    
    const sessionResponses = this.responses.get(insertResponse.sessionId) || [];
    sessionResponses.push(response);
    this.responses.set(insertResponse.sessionId, sessionResponses);
    
    return response;
  }

  async getSurveyResponses(sessionId: string): Promise<SurveyResponse[]> {
    return this.responses.get(sessionId) || [];
  }

  async saveSurveyResult(insertResult: InsertSurveyResult): Promise<SurveyResult> {
    const id = this.currentResultId++;
    const result: SurveyResult = { 
      ...insertResult, 
      id,
      createdAt: new Date()
    };
    this.results.set(insertResult.sessionId, result);
    return result;
  }

  async getSurveyResult(sessionId: string): Promise<SurveyResult | undefined> {
    return this.results.get(sessionId);
  }

  async getTotalSurveyCount(): Promise<number> {
    return this.results.size;
  }

  async getPartyStatistics(): Promise<Array<{party: string; percentage: number; count: number}>> {
    const partyStats: Record<string, number> = {};
    let totalResults = 0;

    Array.from(this.results.values()).forEach(result => {
      const alignments = result.partyAlignments as Record<string, number>;
      let topParty = '';
      let topAlignment = 0;

      Object.entries(alignments).forEach(([party, alignment]) => {
        if (alignment > topAlignment) {
          topAlignment = alignment;
          topParty = party;
        }
      });

      if (topParty) {
        partyStats[topParty] = (partyStats[topParty] || 0) + 1;
        totalResults++;
      }
    });

    return Object.entries(partyStats).map(([party, count]) => ({
      party,
      count,
      percentage: totalResults > 0 ? Math.round((count / totalResults) * 100) : 0
    })).sort((a, b) => b.percentage - a.percentage);
  }

  async getRecentResults(limit = 50): Promise<SurveyResult[]> {
    return Array.from(this.results.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getQuestions(count: QuestionCount, excludeIds: number[] = []): Promise<Question[]> {
    const limit = parseInt(count);
    const query = db.select().from(questions).limit(limit);
    
    if (excludeIds.length > 0) {
      // For now, just get all and filter - can optimize later
      const allQuestions = await db.select().from(questions);
      const filtered = allQuestions.filter(q => !excludeIds.includes(q.id));
      return filtered.slice(0, limit);
    }
    
    return await query;
  }

  async getAllQuestions(): Promise<Question[]> {
    return await db.select().from(questions);
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const [question] = await db
      .insert(questions)
      .values(insertQuestion)
      .returning();
    return question;
  }

  async getAllParties(): Promise<Party[]> {
    return await db.select().from(parties);
  }

  async createParty(insertParty: InsertParty): Promise<Party> {
    const [party] = await db
      .insert(parties)
      .values(insertParty)
      .returning();
    return party;
  }

  async saveSurveyResponse(insertResponse: InsertSurveyResponse): Promise<SurveyResponse> {
    const [response] = await db
      .insert(surveyResponses)
      .values(insertResponse)
      .returning();
    return response;
  }

  async getSurveyResponses(sessionId: string): Promise<SurveyResponse[]> {
    return await db
      .select()
      .from(surveyResponses)
      .where(eq(surveyResponses.sessionId, sessionId));
  }

  async saveSurveyResult(insertResult: InsertSurveyResult): Promise<SurveyResult> {
    const [result] = await db
      .insert(surveyResults)
      .values(insertResult)
      .returning();
    return result;
  }

  async getSurveyResult(sessionId: string): Promise<SurveyResult | undefined> {
    const [result] = await db
      .select()
      .from(surveyResults)
      .where(eq(surveyResults.sessionId, sessionId));
    return result;
  }

  async getTotalSurveyCount(): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(surveyResults);
    return result.count;
  }

  async getPartyStatistics(): Promise<Array<{party: string; percentage: number; count: number}>> {
    // Get all results and calculate party statistics
    const results = await db.select().from(surveyResults);
    const partyStats: Record<string, number> = {};
    let totalResults = 0;

    results.forEach(result => {
      const alignments = result.partyAlignments as Record<string, number>;
      let topParty = '';
      let topAlignment = 0;

      Object.entries(alignments).forEach(([party, alignment]) => {
        if (alignment > topAlignment) {
          topAlignment = alignment;
          topParty = party;
        }
      });

      if (topParty) {
        partyStats[topParty] = (partyStats[topParty] || 0) + 1;
        totalResults++;
      }
    });

    return Object.entries(partyStats).map(([party, count]) => ({
      party,
      count,
      percentage: totalResults > 0 ? Math.round((count / totalResults) * 100) : 0
    })).sort((a, b) => b.percentage - a.percentage);
  }

  async getRecentResults(limit = 50): Promise<SurveyResult[]> {
    return await db
      .select()
      .from(surveyResults)
      .orderBy(desc(surveyResults.createdAt))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
export const dbStorage = new DatabaseStorage();

// Initialize database with data if empty
async function initializeDatabase() {
  try {
    const questionCount = await storage.getAllQuestions();
    const partyCount = await storage.getAllParties();
    
    if (questionCount.length === 0 || partyCount.length === 0) {
      console.log("Database is empty, initializing with data...");
      
      // Create a temporary MemStorage to get the data
      const tempMemStorage = new MemStorage();
      
      // Copy parties
      if (partyCount.length === 0) {
        const parties = await tempMemStorage.getAllParties();
        for (const party of parties) {
          await storage.createParty({
            name: party.name,
            shortName: party.shortName,
            color: party.color,
            description: party.description,
            ideology: party.ideology,
            website: party.website,
            founded: party.founded
          });
        }
        console.log(`Initialized ${parties.length} parties`);
      }
      
      // Copy questions  
      if (questionCount.length === 0) {
        const questions = await tempMemStorage.getAllQuestions();
        for (const question of questions) {
          await storage.createQuestion({
            text: question.text,
            category: question.category,
            partyPositions: question.partyPositions
          });
        }
        console.log(`Initialized ${questions.length} questions`);
      }
    }
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

// Initialize on startup
initializeDatabase();
