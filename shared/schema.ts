import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  textEn: text("text_en"),
  category: text("category").notNull(),
  partyPositions: text("party_positions", { mode: "json" }).notNull().$type<Record<string, number>>(),
});

export const parties = sqliteTable("parties", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  color: text("color").notNull(),
  description: text("description").notNull(),
  ideology: text("ideology").notNull(),
});

export const surveyResponses = sqliteTable("survey_responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  questionId: integer("question_id").notNull(),
  answer: integer("answer").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const surveyResults = sqliteTable("survey_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  profileId: text("profile_id"),
  partyAlignments: text("party_alignments", { mode: "json" }).notNull().$type<Record<string, number>>(),
  questionCount: integer("question_count").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const ideologyQuestions = sqliteTable("ideology_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  textEn: text("text_en"),
  category: text("category").notNull(),
  leftScore: integer("left_score").notNull(),
  rightScore: integer("right_score").notNull(),
});

export const ideologyResponses = sqliteTable("ideology_responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  questionId: integer("question_id").notNull().references(() => ideologyQuestions.id),
  answer: integer("answer").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const ideologyResults = sqliteTable("ideology_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  profileId: text("profile_id"),
  totalScore: real("total_score").notNull(),
  label: text("label").notNull(),
  percentage: real("percentage").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const quizQuestions = sqliteTable("quiz_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  questionEn: text("question_en"),
  correctAnswer: text("correct_answer").notNull(),
  wrongAnswers: text("wrong_answers", { mode: "json" }).notNull().$type<string[]>(),
  explanation: text("explanation").notNull(),
  explanationEn: text("explanation_en"),
  category: text("category").notNull(),
  difficulty: integer("difficulty").notNull(),
  era: text("era"),
});

export const quizResults = sqliteTable("quiz_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  questionId: integer("question_id").notNull().references(() => quizQuestions.id),
  userAnswer: text("user_answer").notNull(),
  isCorrect: integer("is_correct").notNull(),
  timeTaken: integer("time_taken"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const pmScenarios = sqliteTable("pm_scenarios", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  titleEn: text("title_en"),
  description: text("description").notNull(),
  descriptionEn: text("description_en"),
  context: text("context").notNull(),
  contextEn: text("context_en"),
  category: text("category").notNull(),
  difficulty: integer("difficulty").notNull(),
  timePressure: integer("time_pressure").default(0),
});

export const pmPolicyOptions = sqliteTable("pm_policy_options", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  scenarioId: integer("scenario_id").notNull().references(() => pmScenarios.id),
  optionText: text("option_text").notNull(),
  optionTextEn: text("option_text_en"),
  politicalCost: integer("political_cost").notNull(),
  economicImpact: integer("economic_impact").notNull(),
  socialImpact: integer("social_impact").notNull(),
  partyAlignment: text("party_alignment").notNull(),
  consequences: text("consequences").notNull(),
  consequencesEn: text("consequences_en"),
});

export const pmDecisions = sqliteTable("pm_decisions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  scenarioId: integer("scenario_id").notNull().references(() => pmScenarios.id),
  chosenOptionId: integer("chosen_option_id").notNull().references(() => pmPolicyOptions.id),
  decisionTime: integer("decision_time"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const anonymousProfiles = sqliteTable("anonymous_profiles", {
  id: text("id").primaryKey(),
  nickname: text("nickname"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const quizSessions = sqliteTable("quiz_sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  profileId: text("profile_id").notNull(),
  sessionId: text("session_id").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  accuracy: real("accuracy").notNull(),
  difficulty: integer("difficulty").notNull(),
  durationSeconds: integer("duration_seconds"),
  showOnLeaderboard: integer("show_on_leaderboard").notNull().default(1),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const insertQuestionSchema = createInsertSchema(questions).omit({ id: true });
export const insertPartySchema = createInsertSchema(parties).omit({ id: true });
export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({ id: true });
export const insertQuizResultSchema = createInsertSchema(quizResults).omit({ id: true, createdAt: true });
export const insertPmScenarioSchema = createInsertSchema(pmScenarios).omit({ id: true });
export const insertPmPolicyOptionSchema = createInsertSchema(pmPolicyOptions).omit({ id: true });
export const insertPmDecisionSchema = createInsertSchema(pmDecisions).omit({ id: true, createdAt: true });
export const insertSurveyResponseSchema = createInsertSchema(surveyResponses).omit({ id: true, createdAt: true });
export const insertSurveyResultSchema = createInsertSchema(surveyResults).omit({ id: true, createdAt: true });
export const insertIdeologyQuestionSchema = createInsertSchema(ideologyQuestions).omit({ id: true });
export const insertIdeologyResponseSchema = createInsertSchema(ideologyResponses).omit({ id: true, createdAt: true });
export const insertIdeologyResultSchema = createInsertSchema(ideologyResults).omit({ id: true, createdAt: true });
export const insertAnonymousProfileSchema = createInsertSchema(anonymousProfiles).omit({ createdAt: true });
export const insertQuizSessionSchema = createInsertSchema(quizSessions).omit({ id: true, createdAt: true });

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
export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type PmScenario = typeof pmScenarios.$inferSelect;
export type InsertPmScenario = z.infer<typeof insertPmScenarioSchema>;
export type PmPolicyOption = typeof pmPolicyOptions.$inferSelect;
export type InsertPmPolicyOption = z.infer<typeof insertPmPolicyOptionSchema>;
export type PmDecision = typeof pmDecisions.$inferSelect;
export type InsertPmDecision = z.infer<typeof insertPmDecisionSchema>;
export type AnonymousProfile = typeof anonymousProfiles.$inferSelect;
export type InsertAnonymousProfile = z.infer<typeof insertAnonymousProfileSchema>;
export type QuizSession = typeof quizSessions.$inferSelect;
export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;

export const answerValueSchema = z.number().min(-2).max(2);
export const questionCountSchema = z.enum(["15", "30", "60", "100", "150"]);

export type AnswerValue = z.infer<typeof answerValueSchema>;
export type QuestionCount = z.infer<typeof questionCountSchema>;
