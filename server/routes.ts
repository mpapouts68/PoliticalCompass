import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSurveyResponseSchema, insertSurveyResultSchema, insertIdeologyResponseSchema, insertIdeologyResultSchema, questionCountSchema, ideologyQuestions } from "@shared/schema";
import { z } from "zod";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { db } from "./db";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get questions for survey
  app.get("/api/questions/:count", async (req, res) => {
    try {
      const count = questionCountSchema.parse(req.params.count);
      const excludeIds = req.query.exclude ? (req.query.exclude as string).split(',').map(Number) : [];
      const questions = await storage.getQuestions(count, excludeIds);
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

  // Get survey responses by session
  app.get("/api/responses/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const responses = await storage.getSurveyResponses(sessionId);
      res.json(responses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch responses" });
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

  // Get election statistics
  app.get("/api/election-stats", async (req, res) => {
    try {
      const totalVotes = await storage.getTotalSurveyCount();
      const partyStats = await storage.getPartyStatistics();
      
      res.json({
        totalVotes,
        partyStats
      });
    } catch (error) {
      console.error("Error getting election stats:", error);
      res.status(500).json({ error: "Failed to get election statistics" });
    }
  });

  // Ideology test routes
  app.get("/api/ideology/questions/:count", async (req, res) => {
    try {
      const count = parseInt(req.params.count);
      if (isNaN(count) || count < 1 || count > 300) {
        return res.status(400).json({ error: "Invalid question count" });
      }
      const questions = await storage.getRandomIdeologyQuestions(count);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ideology questions" });
    }
  });

  app.post("/api/ideology/responses", async (req, res) => {
    try {
      const responseData = insertIdeologyResponseSchema.parse(req.body);
      const response = await storage.saveIdeologyResponse(responseData);
      res.json(response);
    } catch (error) {
      res.status(400).json({ error: "Invalid ideology response data" });
    }
  });

  app.post("/api/ideology/results", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }

      const responses = await storage.getIdeologyResponses(sessionId);
      const questions = await db.select().from(ideologyQuestions);

      // Calculate ideology score
      let totalScore = 0;
      let questionCount = 0;

      for (const response of responses) {
        const question = questions.find(q => q.id === response.questionId);
        if (question) {
          // Map answer (1-5) to score based on question scoring
          const answerScore = response.answer; // 1-5
          let questionScore;
          
          if (answerScore === 1) { // Strongly Disagree
            questionScore = question.leftScore;
          } else if (answerScore === 2) { // Disagree
            questionScore = question.leftScore * 0.5;
          } else if (answerScore === 3) { // Neutral
            questionScore = 0;
          } else if (answerScore === 4) { // Agree  
            questionScore = question.rightScore * 0.5;
          } else { // Strongly Agree
            questionScore = question.rightScore;
          }
          
          totalScore += questionScore;
          questionCount++;
        }
      }

      const averageScore = questionCount > 0 ? totalScore / questionCount : 0;
      
      // Determine label and percentage based on score
      let label: string;
      let percentage: number;
      
      if (averageScore <= -2.5) {
        label = "Far Left";
        percentage = Math.max(0, (averageScore + 3) * 100 / 0.5);
      } else if (averageScore <= -1.5) {
        label = "Left";
        percentage = 10 + (averageScore + 2.5) * 15;
      } else if (averageScore <= -0.5) {
        label = "Center-Left";
        percentage = 25 + (averageScore + 1.5) * 15;
      } else if (averageScore <= 0.5) {
        label = "Center";
        percentage = 40 + (averageScore + 0.5) * 20;
      } else if (averageScore <= 1.5) {
        label = "Center-Right";
        percentage = 60 + (averageScore - 0.5) * 15;
      } else if (averageScore <= 2.5) {
        label = "Right";
        percentage = 75 + (averageScore - 1.5) * 15;
      } else {
        label = "Far Right";
        percentage = Math.min(100, 90 + (averageScore - 2.5) * 20);
      }

      const result = await storage.saveIdeologyResult({
        sessionId,
        totalScore: averageScore,
        label,
        percentage
      });

      res.json({ result, averageScore, questionCount });
    } catch (error) {
      console.error("Error calculating ideology results:", error);
      res.status(500).json({ error: "Failed to calculate ideology results" });
    }
  });

  app.get("/api/ideology/results/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const result = await storage.getIdeologyResult(sessionId);
      
      if (!result) {
        return res.status(404).json({ error: "Ideology results not found" });
      }

      res.json({ result });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ideology results" });
    }
  });

  // PayPal routes
  app.get("/paypal/setup", async (req, res) => {
    await loadPaypalDefault(req, res);
  });

  app.post("/paypal/order", async (req, res) => {
    // Request body should contain: { intent, amount, currency }
    await createPaypalOrder(req, res);
  });

  app.post("/paypal/order/:orderID/capture", async (req, res) => {
    await capturePaypalOrder(req, res);
  });

  const httpServer = createServer(app);
  return httpServer;
}
