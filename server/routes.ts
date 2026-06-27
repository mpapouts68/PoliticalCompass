import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSurveyResponseSchema, 
  insertSurveyResultSchema, 
  insertIdeologyResponseSchema, 
  insertIdeologyResultSchema,
  insertQuizResultSchema,
  insertPmDecisionSchema,
  insertQuizSessionSchema,
  insertAnonymousProfileSchema,
  questionCountSchema, 
  ideologyQuestions 
} from "@shared/schema";
import { z } from "zod";
import { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } from "./paypal";
import { db, dbPath, isVolatileStorage } from "./db";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health & database status
  app.get("/api/health", async (_req, res) => {
    try {
      const stats = await storage.getDatabaseStats();
      res.json({
        status: "ok",
        database: "sqlite",
        path: dbPath,
        volatileStorage: isVolatileStorage,
        stats,
      });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({ status: "error", message: "Database unavailable" });
    }
  });

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
      const { sessionId, profileId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }

      if (profileId) {
        await storage.getOrCreateProfile(profileId);
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
        profileId: profileId ?? null,
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

  // Get ideology statistics
  app.get("/api/ideology-stats", async (req, res) => {
    try {
      const stats = await storage.getIdeologyStats();
      res.json(stats);
    } catch (error) {
      console.error("Error getting ideology stats:", error);
      res.status(500).json({ error: "Failed to get ideology statistics" });
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
      const { sessionId, profileId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID required" });
      }

      if (profileId) {
        await storage.getOrCreateProfile(profileId);
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
        profileId: profileId ?? null,
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
  app.get("/api/paypal/config", (_req, res) => {
    const fallbackClientId = "BAA5OZw-BfpwsFEZkx46RD7tNx2A0JV_RL0nJdCixwQmx6IPv6db0Rhsltws3eDLw7HRw7ZUSZyPOWOfpE";
    const clientId =
      process.env.PAYPAL_CLIENT_ID?.trim() ||
      process.env.VITE_PAYPAL_CLIENT_ID?.trim() ||
      fallbackClientId;
    const serverReady = Boolean(
      process.env.PAYPAL_CLIENT_ID?.trim() && process.env.PAYPAL_CLIENT_SECRET?.trim(),
    );
    res.json({ clientId, serverReady });
  });

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

  // Knowledge Challenge Quiz routes
  app.get("/api/quiz/questions/:count", async (req, res) => {
    try {
      const count = parseInt(req.params.count);
      const difficulty = req.query.difficulty ? parseInt(req.query.difficulty as string) : undefined;
      
      if (isNaN(count) || count < 1 || count > 20) {
        return res.status(400).json({ error: "Invalid question count (1-20)" });
      }
      
      const questions = await storage.getRandomQuizQuestions(count, difficulty);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      res.status(500).json({ error: "Failed to fetch quiz questions" });
    }
  });

  app.post("/api/quiz/results", async (req, res) => {
    try {
      const resultData = insertQuizResultSchema.parse(req.body);
      const result = await storage.saveQuizResult(resultData);
      res.json(result);
    } catch (error) {
      console.error("Error saving quiz result:", error);
      res.status(400).json({ error: "Invalid quiz result data" });
    }
  });

  app.get("/api/quiz/results/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const results = await storage.getQuizResults(sessionId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  });

  app.get("/api/quiz/stats", async (_req, res) => {
    try {
      const stats = await storage.getQuizStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching quiz stats:", error);
      res.status(500).json({ error: "Failed to fetch quiz statistics" });
    }
  });

  app.get("/api/quiz/leaderboard", async (req, res) => {
    try {
      const limit = req.query.limit ? Math.min(50, parseInt(req.query.limit as string, 10)) : 20;
      const difficulty = req.query.difficulty ? parseInt(req.query.difficulty as string, 10) : undefined;
      const leaderboard = await storage.getQuizLeaderboard(limit, difficulty);
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching quiz leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  app.post("/api/quiz/sessions", async (req, res) => {
    try {
      const sessionData = insertQuizSessionSchema.parse(req.body);
      await storage.getOrCreateProfile(sessionData.profileId);
      const session = await storage.saveQuizSession(sessionData);
      res.json(session);
    } catch (error) {
      console.error("Error saving quiz session:", error);
      res.status(400).json({ error: "Invalid quiz session data" });
    }
  });

  // Anonymous profile routes (no personal data — device-local ID only)
  app.post("/api/profile", async (req, res) => {
    try {
      const { id } = insertAnonymousProfileSchema.pick({ id: true }).parse(req.body);
      const profile = await storage.getOrCreateProfile(id);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  app.patch("/api/profile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const nickname = req.body.nickname === null || req.body.nickname === ""
        ? null
        : String(req.body.nickname).trim().slice(0, 24);
      await storage.getOrCreateProfile(id);
      const profile = await storage.updateProfileNickname(id, nickname);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: "Failed to update profile" });
    }
  });

  app.get("/api/profile/:id/history", async (req, res) => {
    try {
      const history = await storage.getProfileHistory(req.params.id);
      if (!history) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(history);
    } catch (error) {
      console.error("Error fetching profile history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  // Prime Minister scenario routes
  app.get("/api/pm/scenario", async (req, res) => {
    try {
      const difficulty = req.query.difficulty ? parseInt(req.query.difficulty as string) : undefined;
      const excludeIds = req.query.exclude
        ? String(req.query.exclude)
            .split(",")
            .map((id) => parseInt(id, 10))
            .filter((id) => !Number.isNaN(id))
        : [];
      const scenario = await storage.getRandomPmScenario(difficulty, excludeIds);
      
      if (!scenario) {
        return res.status(404).json({ error: "No scenarios available" });
      }

      const scenarioWithOptions = await storage.getPmScenarioWithOptions(scenario.id);
      res.json(scenarioWithOptions);
    } catch (error) {
      console.error("Error fetching PM scenario:", error);
      res.status(500).json({ error: "Failed to fetch scenario" });
    }
  });

  app.post("/api/pm/decisions", async (req, res) => {
    try {
      const decisionData = insertPmDecisionSchema.parse(req.body);
      const decision = await storage.savePmDecision(decisionData);
      res.json(decision);
    } catch (error) {
      console.error("Error saving PM decision:", error);
      res.status(400).json({ error: "Invalid decision data" });
    }
  });

  app.get("/api/pm/decisions/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const decisions = await storage.getPmDecisions(sessionId);
      res.json(decisions);
    } catch (error) {
      console.error("Error fetching PM decisions:", error);
      res.status(500).json({ error: "Failed to fetch decisions" });
    }
  });

  app.get("/api/pm/stats", async (_req, res) => {
    try {
      const stats = await storage.getPmStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching PM stats:", error);
      res.status(500).json({ error: "Failed to fetch PM statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
