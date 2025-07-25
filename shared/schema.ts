import { pgTable, text, serial, integer, jsonb, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  textEn: text("text_en"), // English translation
  category: text("category").notNull(),
  partyPositions: jsonb("party_positions").notNull(), // Record<string, number>
});

export const parties = pgTable("parties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  color: text("color").notNull(),
  description: text("description").notNull(),
  ideology: text("ideology").notNull(),
});

export const surveyResponses = pgTable("survey_responses", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  questionId: integer("question_id").notNull(),
  answer: integer("answer").notNull(), // -2 to 2 scale
  createdAt: timestamp("created_at").defaultNow(),
});

export const surveyResults = pgTable("survey_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  partyAlignments: jsonb("party_alignments").notNull(), // Record<string, number>
  questionCount: integer("question_count").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Ideology test tables for left-center-right spectrum
export const ideologyQuestions = pgTable("ideology_questions", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  textEn: text("text_en"),
  category: text("category").notNull(),
  // Scoring: Each answer (1-5) maps to a political position score
  // 1 (Strongly Disagree) = leftScore, 5 (Strongly Agree) = rightScore
  leftScore: integer("left_score").notNull(), // Score when disagreeing (-3 to +3)
  rightScore: integer("right_score").notNull(), // Score when agreeing (-3 to +3)
});

export const ideologyResponses = pgTable("ideology_responses", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  questionId: integer("question_id").notNull().references(() => ideologyQuestions.id),
  answer: integer("answer").notNull(), // 1-5 scale
  createdAt: timestamp("created_at").defaultNow(),
});

export const ideologyResults = pgTable("ideology_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  totalScore: real("total_score").notNull(), // Average score from -3 to +3
  label: text("label").notNull(), // e.g., "Far Left", "Center-Left", "Center", "Center-Right", "Far Right"
  percentage: real("percentage").notNull(), // Position as percentage (0-100)
  createdAt: timestamp("created_at").defaultNow(),
});

// Knowledge Challenges - Greek Political History Quizzes
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  questionEn: text("question_en"),
  correctAnswer: text("correct_answer").notNull(),
  wrongAnswers: text("wrong_answers").array().notNull(), // Array of 3 wrong answers
  explanation: text("explanation").notNull(),
  explanationEn: text("explanation_en"),
  category: text("category").notNull(), // "modern_history", "constitutional", "parties", "leaders"
  difficulty: integer("difficulty").notNull(), // 1-3 (easy, medium, hard)
  era: text("era"), // "1974-1990", "1990-2010", "2010-present"
});

export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  questionId: integer("question_id").notNull().references(() => quizQuestions.id),
  userAnswer: text("user_answer").notNull(),
  isCorrect: integer("is_correct").notNull(), // 1 for true, 0 for false
  timeTaken: integer("time_taken"), // seconds
  createdAt: timestamp("created_at").defaultNow(),
});

// Prime Minister for a Day - Governing Scenarios
export const pmScenarios = pgTable("pm_scenarios", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  description: text("description").notNull(), // The crisis/situation
  descriptionEn: text("description_en"),
  context: text("context").notNull(), // Background information
  contextEn: text("context_en"),
  category: text("category").notNull(), // "economic", "social", "foreign_policy", "crisis"
  difficulty: integer("difficulty").notNull(), // 1-3
  timePressure: integer("time_pressure").default(0), // 1 for urgent, 0 for normal
});

export const pmPolicyOptions = pgTable("pm_policy_options", {
  id: serial("id").primaryKey(),
  scenarioId: integer("scenario_id").notNull().references(() => pmScenarios.id),
  optionText: text("option_text").notNull(),
  optionTextEn: text("option_text_en"),
  politicalCost: integer("political_cost").notNull(), // 1-10 scale
  economicImpact: integer("economic_impact").notNull(), // -5 to +5 scale
  socialImpact: integer("social_impact").notNull(), // -5 to +5 scale
  partyAlignment: text("party_alignment").notNull(), // JSON string of which parties would support this
  consequences: text("consequences").notNull(), // What happens if chosen
  consequencesEn: text("consequences_en"),
});

export const pmDecisions = pgTable("pm_decisions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  scenarioId: integer("scenario_id").notNull().references(() => pmScenarios.id),
  chosenOptionId: integer("chosen_option_id").notNull().references(() => pmPolicyOptions.id),
  decisionTime: integer("decision_time"), // seconds taken to decide
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertPartySchema = createInsertSchema(parties).omit({
  id: true,
});

// Quiz schemas
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({
  id: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
  createdAt: true,
});

// PM scenarios schemas
export const insertPmScenarioSchema = createInsertSchema(pmScenarios).omit({
  id: true,
});

export const insertPmPolicyOptionSchema = createInsertSchema(pmPolicyOptions).omit({
  id: true,
});

export const insertPmDecisionSchema = createInsertSchema(pmDecisions).omit({
  id: true,
  createdAt: true,
});

export const insertSurveyResponseSchema = createInsertSchema(surveyResponses).omit({
  id: true,
  createdAt: true,
});

export const insertSurveyResultSchema = createInsertSchema(surveyResults).omit({
  id: true,
  createdAt: true,
});

export const insertIdeologyQuestionSchema = createInsertSchema(ideologyQuestions).omit({
  id: true,
});

export const insertIdeologyResponseSchema = createInsertSchema(ideologyResponses).omit({
  id: true,
  createdAt: true,
});

export const insertIdeologyResultSchema = createInsertSchema(ideologyResults).omit({
  id: true,
  createdAt: true,
});

export type Question = typeof questions.$inferSelect;
export type Party = typeof parties.$inferSelect;
export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type SurveyResult = typeof surveyResults.$inferSelect;
export type IdeologyQuestion = typeof ideologyQuestions.$inferSelect;
export type IdeologyResponse = typeof ideologyResponses.$inferSelect;
export type IdeologyResult = typeof ideologyResults.$inferSelect;

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type InsertParty = z.infer<typeof insertPartySchema>;
export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type InsertSurveyResult = z.infer<typeof insertSurveyResultSchema>;
export type InsertIdeologyQuestion = z.infer<typeof insertIdeologyQuestionSchema>;
export type InsertIdeologyResponse = z.infer<typeof insertIdeologyResponseSchema>;
export type InsertIdeologyResult = z.infer<typeof insertIdeologyResultSchema>;

// Quiz types
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;

// PM scenario types
export type PmScenario = typeof pmScenarios.$inferSelect;
export type InsertPmScenario = z.infer<typeof insertPmScenarioSchema>;
export type PmPolicyOption = typeof pmPolicyOptions.$inferSelect;
export type InsertPmPolicyOption = z.infer<typeof insertPmPolicyOptionSchema>;
export type PmDecision = typeof pmDecisions.$inferSelect;
export type InsertPmDecision = z.infer<typeof insertPmDecisionSchema>;

export const answerValueSchema = z.number().min(-2).max(2);
export const questionCountSchema = z.enum(["15", "30", "60", "100"]);

export type AnswerValue = z.infer<typeof answerValueSchema>;
export type QuestionCount = z.infer<typeof questionCountSchema>;
