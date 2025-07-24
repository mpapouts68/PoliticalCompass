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

export const insertQuestionSchema = createInsertSchema(questions).omit({
  id: true,
});

export const insertPartySchema = createInsertSchema(parties).omit({
  id: true,
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

export const answerValueSchema = z.number().min(-2).max(2);
export const questionCountSchema = z.enum(["15", "30", "60", "100"]);

export type AnswerValue = z.infer<typeof answerValueSchema>;
export type QuestionCount = z.infer<typeof questionCountSchema>;
