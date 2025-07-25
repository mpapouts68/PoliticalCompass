import { 
  questions, 
  parties, 
  surveyResponses, 
  surveyResults,
  ideologyQuestions,
  ideologyResponses,
  ideologyResults,
  quizQuestions,
  quizResults,
  pmScenarios,
  pmPolicyOptions,
  pmDecisions,
  type Question, 
  type Party, 
  type SurveyResponse, 
  type SurveyResult,
  type IdeologyQuestion,
  type IdeologyResponse,
  type IdeologyResult,
  type QuizQuestion,
  type QuizResult,
  type PmScenario,
  type PmPolicyOption,
  type PmDecision,
  type InsertQuestion,
  type InsertParty,
  type InsertSurveyResponse,
  type InsertSurveyResult,
  type InsertIdeologyResponse,
  type InsertIdeologyResult,
  type InsertQuizQuestion,
  type InsertQuizResult,
  type InsertPmScenario,
  type InsertPmPolicyOption,
  type InsertPmDecision,
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
  
  // Ideology test
  getRandomIdeologyQuestions(count: number): Promise<IdeologyQuestion[]>;
  saveIdeologyResponse(response: InsertIdeologyResponse): Promise<IdeologyResponse>;
  getIdeologyResponses(sessionId: string): Promise<IdeologyResponse[]>;
  saveIdeologyResult(result: InsertIdeologyResult): Promise<IdeologyResult>;
  getIdeologyResult(sessionId: string): Promise<IdeologyResult | undefined>;
  
  // Election statistics
  getTotalSurveyCount(): Promise<number>;
  getPartyStatistics(): Promise<Array<{party: string; percentage: number; count: number}>>;
  getRecentResults(limit?: number): Promise<SurveyResult[]>;
  
  // Ideology statistics
  getIdeologyStats(): Promise<{
    totalTests: number;
    ideologyStats: Array<{label: string; percentage: number; count: number}>;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getQuestions(count: QuestionCount, excludeIds: number[] = []): Promise<Question[]> {
    const countNum = parseInt(count);
    
    let allQuestions: Question[];
    if (excludeIds.length > 0) {
      allQuestions = await db.select().from(questions).where(sql`${questions.id} NOT IN (${excludeIds.join(',')})`);
    } else {
      allQuestions = await db.select().from(questions);
    }
    
    // Shuffle and return requested count
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, countNum);
  }

  async getAllQuestions(): Promise<Question[]> {
    return await db.select().from(questions);
  }

  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [result] = await db.insert(questions).values(question).returning();
    return result;
  }

  async getAllParties(): Promise<Party[]> {
    return await db.select().from(parties);
  }

  async createParty(party: InsertParty): Promise<Party> {
    const [result] = await db.insert(parties).values(party).returning();
    return result;
  }

  async saveSurveyResponse(response: InsertSurveyResponse): Promise<SurveyResponse> {
    const [result] = await db.insert(surveyResponses).values(response).returning();
    return result;
  }

  async getSurveyResponses(sessionId: string): Promise<SurveyResponse[]> {
    return await db.select().from(surveyResponses).where(eq(surveyResponses.sessionId, sessionId));
  }

  async saveSurveyResult(result: InsertSurveyResult): Promise<SurveyResult> {
    const [inserted] = await db.insert(surveyResults).values(result).returning();
    return inserted;
  }

  async getSurveyResult(sessionId: string): Promise<SurveyResult | undefined> {
    const [result] = await db.select().from(surveyResults).where(eq(surveyResults.sessionId, sessionId));
    return result;
  }

  // Ideology test methods
  async getRandomIdeologyQuestions(count: number): Promise<IdeologyQuestion[]> {
    const allQuestions = await db.select().from(ideologyQuestions);
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  async saveIdeologyResponse(response: InsertIdeologyResponse): Promise<IdeologyResponse> {
    const [result] = await db.insert(ideologyResponses).values(response).returning();
    return result;
  }

  async getIdeologyResponses(sessionId: string): Promise<IdeologyResponse[]> {
    return await db.select().from(ideologyResponses).where(eq(ideologyResponses.sessionId, sessionId));
  }

  async saveIdeologyResult(result: InsertIdeologyResult): Promise<IdeologyResult> {
    const [inserted] = await db.insert(ideologyResults).values(result).returning();
    return inserted;
  }

  async getIdeologyResult(sessionId: string): Promise<IdeologyResult | undefined> {
    const [result] = await db.select().from(ideologyResults).where(eq(ideologyResults.sessionId, sessionId));
    return result;
  }

  async getTotalSurveyCount(): Promise<number> {
    const [result] = await db.select({ count: count() }).from(surveyResults);
    return result.count;
  }

  async getPartyStatistics(): Promise<Array<{party: string; percentage: number; count: number}>> {
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

  async getIdeologyStats(): Promise<{
    totalTests: number;
    ideologyStats: Array<{label: string; percentage: number; count: number}>;
  }> {
    const results = await db.select().from(ideologyResults);
    
    const labelStats: Record<string, number> = {};
    const totalTests = results.length;

    results.forEach(result => {
      const label = result.label;
      labelStats[label] = (labelStats[label] || 0) + 1;
    });

    const ideologyStats = Object.entries(labelStats).map(([label, count]) => ({
      label,
      count,
      percentage: totalTests > 0 ? Math.round((count / totalTests) * 100) : 0
    })).sort((a, b) => b.count - a.count);

    return {
      totalTests,
      ideologyStats
    };
  }

  // Knowledge Challenge Quiz methods
  async getRandomQuizQuestions(count: number, difficulty?: number): Promise<QuizQuestion[]> {
    let query = db.select().from(quizQuestions);
    
    if (difficulty) {
      query = query.where(eq(quizQuestions.difficulty, difficulty));
    }
    
    const allQuestions = await query;
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  async saveQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const [inserted] = await db.insert(quizResults).values(result).returning();
    return inserted;
  }

  async getQuizResults(sessionId: string): Promise<QuizResult[]> {
    return await db.select().from(quizResults).where(eq(quizResults.sessionId, sessionId));
  }

  async createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion> {
    const [result] = await db.insert(quizQuestions).values(question).returning();
    return result;
  }

  // Prime Minister scenarios methods
  async getRandomPmScenario(difficulty?: number): Promise<PmScenario | undefined> {
    let query = db.select().from(pmScenarios);
    
    if (difficulty) {
      query = query.where(eq(pmScenarios.difficulty, difficulty));
    }
    
    const scenarios = await query;
    if (scenarios.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    return scenarios[randomIndex];
  }

  async getPmScenarioWithOptions(scenarioId: number): Promise<{ scenario: PmScenario; options: PmPolicyOption[] } | undefined> {
    const [scenario] = await db.select().from(pmScenarios).where(eq(pmScenarios.id, scenarioId));
    if (!scenario) return undefined;

    const options = await db.select().from(pmPolicyOptions).where(eq(pmPolicyOptions.scenarioId, scenarioId));
    return { scenario, options };
  }

  async savePmDecision(decision: InsertPmDecision): Promise<PmDecision> {
    const [result] = await db.insert(pmDecisions).values(decision).returning();
    return result;
  }

  async getPmDecisions(sessionId: string): Promise<PmDecision[]> {
    return await db.select().from(pmDecisions).where(eq(pmDecisions.sessionId, sessionId));
  }

  async createPmScenario(scenario: InsertPmScenario): Promise<PmScenario> {
    const [result] = await db.insert(pmScenarios).values(scenario).returning();
    return result;
  }

  async createPmPolicyOption(option: InsertPmPolicyOption): Promise<PmPolicyOption> {
    const [result] = await db.insert(pmPolicyOptions).values(option).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();