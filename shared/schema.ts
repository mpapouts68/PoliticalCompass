import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
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

export type Question = typeof questions.$inferSelect;
export type Party = typeof parties.$inferSelect;
export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type SurveyResult = typeof surveyResults.$inferSelect;

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type InsertParty = z.infer<typeof insertPartySchema>;
export type InsertSurveyResponse = z.infer<typeof insertSurveyResponseSchema>;
export type InsertSurveyResult = z.infer<typeof insertSurveyResultSchema>;

export const answerValueSchema = z.number().min(-2).max(2);
export const questionCountSchema = z.enum(["15", "30", "60", "100"]);

export type AnswerValue = z.infer<typeof answerValueSchema>;
export type QuestionCount = z.infer<typeof questionCountSchema>;
