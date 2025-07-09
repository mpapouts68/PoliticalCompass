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

export interface IStorage {
  // Questions
  getQuestions(count: QuestionCount): Promise<Question[]>;
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
      }
    ];

    partyData.forEach(party => this.createParty(party));

    // Initialize sample questions with party positions
    const questionData = [
      {
        text: "Θεωρείτε ότι το κράτος πρέπει να παίζει μεγαλύτερο ρόλο στην οικονομία μέσω κρατικοποιήσεων και κρατικών επιχειρήσεων;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 2, "ΕΛ": -1 }
      },
      {
        text: "Υποστηρίζετε τη νομιμοποίηση των συμφώνων συμβίωσης ομόφυλων ζευγαριών;",
        category: "Κοινωνικά",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": -1, "ΕΛ": -2 }
      },
      {
        text: "Πρέπει να σταματήσει άμεσα η εξόρυξη λιγνίτη στην Ελλάδα;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": -1, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 0, "ΚΚΕ": 0, "ΕΛ": -2 }
      },
      {
        text: "Η Ελλάδα πρέπει να ενισχύσει τη συνεργασία της με το ΝΑΤΟ;",
        category: "Εξωτερική Πολιτική",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 1, "ΚΚΕ": -2, "ΕΛ": 0 }
      },
      {
        text: "Υποστηρίζετε την αύξηση του κατώτατου μισθού;",
        category: "Εργασία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 0 }
      },
      {
        text: "Πρέπει να μειωθούν οι φόροι για τις επιχειρήσεις;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 1 }
      },
      {
        text: "Υποστηρίζετε την ενίσχυση του δημόσιου συστήματος υγείας;",
        category: "Υγεία",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 2, "ΕΛ": 1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να περιοριστεί η μετανάστευση στην Ελλάδα;",
        category: "Μετανάστευση",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -1, "ΕΛ": 2 }
      },
      {
        text: "Υποστηρίζετε την αποκρατικοποίηση δημόσιων επιχειρήσεων;",
        category: "Οικονομία",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 0 }
      },
      {
        text: "Πρέπει να αυξηθούν οι δαπάνες για την άμυνα;",
        category: "Άμυνα",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -1, "ΠΑΣΟΚ": 0, "ΚΚΕ": -2, "ΕΛ": 2 }
      },
      {
        text: "Υποστηρίζετε την ψηφιοποίηση της δημόσιας διοίκησης;",
        category: "Διοίκηση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 1 }
      },
      {
        text: "Θεωρείτε ότι πρέπει να μειωθεί η γραφειοκρατία στο δημόσιο τομέα;",
        category: "Διοίκηση",
        partyPositions: { "ΝΔ": 2, "ΣΥΡΙΖΑ": 1, "ΠΑΣΟΚ": 1, "ΚΚΕ": 0, "ΕΛ": 1 }
      },
      {
        text: "Υποστηρίζετε την επέκταση των ανανεώσιμων πηγών ενέργειας;",
        category: "Περιβάλλον",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 2, "ΚΚΕ": 1, "ΕΛ": 0 }
      },
      {
        text: "Πρέπει να ενισχυθεί η ιδιωτική εκπαίδευση στην Ελλάδα;",
        category: "Εκπαίδευση",
        partyPositions: { "ΝΔ": 1, "ΣΥΡΙΖΑ": -2, "ΠΑΣΟΚ": -1, "ΚΚΕ": -2, "ΕΛ": 0 }
      },
      {
        text: "Υποστηρίζετε την αύξηση των συντάξεων;",
        category: "Κοινωνική Πολιτική",
        partyPositions: { "ΝΔ": 0, "ΣΥΡΙΖΑ": 2, "ΠΑΣΟΚ": 1, "ΚΚΕ": 2, "ΕΛ": 1 }
      }
    ];

    questionData.forEach(question => this.createQuestion(question));
  }

  async getQuestions(count: QuestionCount): Promise<Question[]> {
    const allQuestions = Array.from(this.questions.values());
    const num = parseInt(count);
    
    // Shuffle questions and return the requested count
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
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
}

export const storage = new MemStorage();
