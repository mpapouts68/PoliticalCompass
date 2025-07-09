import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSurveyResponseSchema, insertSurveyResultSchema, questionCountSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get questions for survey
  app.get("/api/questions/:count", async (req, res) => {
    try {
      const count = questionCountSchema.parse(req.params.count);
      const questions = await storage.getQuestions(count);
      res.json(questions);
    } catch (error) {
      res.status(400).json({ error: "Invalid question count" });
    }
  });

  // Get all parties
  app.get("/api/parties", async (req, res) => {
    try {
      const parties = await storage.getAllParties();
      res.json(parties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch parties" });
    }
  });

  // Save survey response
  app.post("/api/responses", async (req, res) => {
    try {
      const responseData = insertSurveyResponseSchema.parse(req.body);
      const response = await storage.saveSurveyResponse(responseData);
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: "Invalid response data" });
    }
  });

  // Calculate and save survey results
  app.post("/api/results", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }

      const responses = await storage.getSurveyResponses(sessionId);
      const parties = await storage.getAllParties();
      const questions = await storage.getAllQuestions();

      // Calculate party alignments
      const partyAlignments: Record<string, number> = {};
      
      for (const party of parties) {
        let totalScore = 0;
        let maxPossibleScore = 0;

        for (const response of responses) {
          const question = questions.find(q => q.id === response.questionId);
          if (question) {
            const partyPosition = (question.partyPositions as any)[party.shortName];
            if (typeof partyPosition === 'number') {
              // Calculate alignment score
              const difference = Math.abs(response.answer - partyPosition);
              const alignmentScore = Math.max(0, 4 - difference); // Max score is 4 when answers match perfectly
              totalScore += alignmentScore;
              maxPossibleScore += 4;
            }
          }
        }

        // Convert to percentage
        partyAlignments[party.shortName] = maxPossibleScore > 0 ? 
          Math.round((totalScore / maxPossibleScore) * 100) : 0;
      }

      const result = await storage.saveSurveyResult({
        sessionId,
        partyAlignments,
        questionCount: responses.length
      });

      res.json({ result, parties });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate results" });
    }
  });

  // Get existing survey result
  app.get("/api/results/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const result = await storage.getSurveyResult(sessionId);
      
      if (!result) {
        return res.status(404).json({ error: "Results not found" });
      }

      const parties = await storage.getAllParties();
      res.json({ result, parties });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch results" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
