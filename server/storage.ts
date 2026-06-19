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
  anonymousProfiles,
  quizSessions,
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
  type AnonymousProfile,
  type InsertAnonymousProfile,
  type QuizSession,
  type InsertQuizSession,
  type QuestionCount
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, notInArray, and } from "drizzle-orm";
import { formatQuizQuestionForClient } from "./seed/formatQuiz";

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

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export class DatabaseStorage implements IStorage {
  async getQuestions(count: QuestionCount, excludeIds: number[] = []): Promise<Question[]> {
    const countNum = parseInt(count);
    
    let allQuestions: Question[];
    if (excludeIds.length > 0) {
      allQuestions = await db.select().from(questions).where(notInArray(questions.id, excludeIds));
    } else {
      allQuestions = await db.select().from(questions);
    }
    
    return shuffle(allQuestions).slice(0, countNum);
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
    return shuffle(allQuestions).slice(0, count);
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
    const allQuestions = difficulty
      ? await db.select().from(quizQuestions).where(eq(quizQuestions.difficulty, difficulty))
      : await db.select().from(quizQuestions);

    const valid = allQuestions
      .map(formatQuizQuestionForClient)
      .filter((question) => question.wrongAnswers.length >= 3 && question.wrongAnswers.every((a) => a !== "—"));

    const shuffled = shuffle(valid);
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
  async getRandomPmScenario(difficulty?: number, excludeIds: number[] = []): Promise<PmScenario | undefined> {
    let scenarios = difficulty
      ? await db.select().from(pmScenarios).where(eq(pmScenarios.difficulty, difficulty))
      : await db.select().from(pmScenarios);

    if (excludeIds.length > 0) {
      const excluded = new Set(excludeIds);
      const filtered = scenarios.filter((s) => !excluded.has(s.id));
      if (filtered.length > 0) {
        scenarios = filtered;
      }
    }

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

  async getQuizStats(): Promise<{
    totalAnswers: number;
    correctAnswers: number;
    accuracyRate: number;
    byCategory: Array<{ category: string; total: number; correct: number }>;
  }> {
    const results = await db.select().from(quizResults);
    const questions = await db.select().from(quizQuestions);
    const questionMap = new Map(questions.map((q) => [q.id, q.category]));

    const byCategory: Record<string, { total: number; correct: number }> = {};
    let correctAnswers = 0;

    for (const result of results) {
      if (result.isCorrect) correctAnswers++;
      const category = questionMap.get(result.questionId) ?? "unknown";
      if (!byCategory[category]) byCategory[category] = { total: 0, correct: 0 };
      byCategory[category].total++;
      if (result.isCorrect) byCategory[category].correct++;
    }

    const totalAnswers = results.length;
    return {
      totalAnswers,
      correctAnswers,
      accuracyRate: totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0,
      byCategory: Object.entries(byCategory)
        .map(([category, stats]) => ({ category, ...stats }))
        .sort((a, b) => b.total - a.total),
    };
  }

  async getPmStats(): Promise<{
    totalDecisions: number;
    scenarioCount: number;
    byCategory: Array<{ category: string; count: number }>;
    avgDecisionTime: number;
  }> {
    const decisions = await db.select().from(pmDecisions);
    const scenarios = await db.select().from(pmScenarios);
    const scenarioMap = new Map(scenarios.map((s) => [s.id, s.category]));

    const byCategory: Record<string, number> = {};
    let totalDecisionTime = 0;
    let timedDecisions = 0;

    for (const decision of decisions) {
      const category = scenarioMap.get(decision.scenarioId) ?? "unknown";
      byCategory[category] = (byCategory[category] || 0) + 1;
      if (decision.decisionTime) {
        totalDecisionTime += decision.decisionTime;
        timedDecisions++;
      }
    }

    return {
      totalDecisions: decisions.length,
      scenarioCount: scenarios.length,
      byCategory: Object.entries(byCategory)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count),
      avgDecisionTime: timedDecisions > 0 ? Math.round(totalDecisionTime / timedDecisions) : 0,
    };
  }

  async getDatabaseStats(): Promise<Record<string, number>> {
    const [
      partyCount,
      questionCount,
      ideologyCount,
      quizCount,
      pmScenarioCount,
      surveyResultCount,
      ideologyResultCount,
    ] = await Promise.all([
      db.select({ count: count() }).from(parties),
      db.select({ count: count() }).from(questions),
      db.select({ count: count() }).from(ideologyQuestions),
      db.select({ count: count() }).from(quizQuestions),
      db.select({ count: count() }).from(pmScenarios),
      db.select({ count: count() }).from(surveyResults),
      db.select({ count: count() }).from(ideologyResults),
    ]);

    return {
      parties: partyCount[0].count,
      surveyQuestions: questionCount[0].count,
      ideologyQuestions: ideologyCount[0].count,
      quizQuestions: quizCount[0].count,
      pmScenarios: pmScenarioCount[0].count,
      surveyResults: surveyResultCount[0].count,
      ideologyResults: ideologyResultCount[0].count,
    };
  }

  async getOrCreateProfile(id: string): Promise<AnonymousProfile> {
    const [existing] = await db.select().from(anonymousProfiles).where(eq(anonymousProfiles.id, id));
    if (existing) return existing;

    const [created] = await db.insert(anonymousProfiles).values({ id }).returning();
    return created;
  }

  async updateProfileNickname(id: string, nickname: string | null): Promise<AnonymousProfile | undefined> {
    const [updated] = await db
      .update(anonymousProfiles)
      .set({ nickname })
      .where(eq(anonymousProfiles.id, id))
      .returning();
    return updated;
  }

  async getProfileHistory(profileId: string) {
    const [profile] = await db.select().from(anonymousProfiles).where(eq(anonymousProfiles.id, profileId));
    if (!profile) return null;

    const survey = await db
      .select()
      .from(surveyResults)
      .where(eq(surveyResults.profileId, profileId))
      .orderBy(desc(surveyResults.createdAt));

    const ideology = await db
      .select()
      .from(ideologyResults)
      .where(eq(ideologyResults.profileId, profileId))
      .orderBy(desc(ideologyResults.createdAt));

    const quiz = await db
      .select()
      .from(quizSessions)
      .where(eq(quizSessions.profileId, profileId))
      .orderBy(desc(quizSessions.createdAt));

    return { profile, survey, ideology, quiz };
  }

  async saveQuizSession(session: InsertQuizSession): Promise<QuizSession> {
    const [created] = await db.insert(quizSessions).values(session).returning();
    return created;
  }

  async getQuizLeaderboard(limit = 20, difficulty?: number) {
    const conditions = difficulty
      ? and(eq(quizSessions.showOnLeaderboard, 1), eq(quizSessions.difficulty, difficulty))
      : eq(quizSessions.showOnLeaderboard, 1);

    const rows = await db
      .select({
        id: quizSessions.id,
        profileId: quizSessions.profileId,
        nickname: anonymousProfiles.nickname,
        score: quizSessions.score,
        totalQuestions: quizSessions.totalQuestions,
        accuracy: quizSessions.accuracy,
        difficulty: quizSessions.difficulty,
        durationSeconds: quizSessions.durationSeconds,
        createdAt: quizSessions.createdAt,
      })
      .from(quizSessions)
      .leftJoin(anonymousProfiles, eq(quizSessions.profileId, anonymousProfiles.id))
      .where(conditions)
      .orderBy(desc(quizSessions.score), desc(quizSessions.accuracy), desc(quizSessions.createdAt))
      .limit(limit);

    return rows.map((row, index) => ({
      rank: index + 1,
      nickname: row.nickname,
      score: row.score,
      totalQuestions: row.totalQuestions,
      accuracy: Math.round(row.accuracy),
      difficulty: row.difficulty,
      durationSeconds: row.durationSeconds,
      createdAt: row.createdAt,
    }));
  }
}

export const storage = new DatabaseStorage();