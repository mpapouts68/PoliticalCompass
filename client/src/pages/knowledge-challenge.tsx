import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Trophy, Clock, Home, Star } from "lucide-react";
import { KnowledgeChallenge } from "@/components/quiz/KnowledgeChallenge";
import { QuizLeaderboard } from "@/components/quiz/QuizLeaderboard";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";
import { useAnonymousProfile } from "@/hooks/useAnonymousProfile";
import { apiRequest } from "@/lib/queryClient";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface QuizResult {
  score: number;
  totalQuestions: number;
  accuracy: number;
  grade: string;
  feedback: string;
}

export function KnowledgeChallengePage() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const { t } = useTranslation();
  const { profileId } = useAnonymousProfile();

  const difficulties = [
    {
      level: 1,
      name: t('easy'),
      description: t('basicPoliticalHistory'),
      color: 'bg-green-100 text-green-800 border-green-300'
    },
    {
      level: 2,
      name: t('medium'),
      description: t('intermediateKnowledge'),
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    },
    {
      level: 3,
      name: t('hard'),
      description: t('specializedKnowledge'),
      color: 'bg-red-100 text-red-800 border-red-300'
    }
  ];

  const questionCounts = [5, 10, 15, 20];

  const calculateGrade = (accuracy: number): { grade: string; feedback: string } => {
    if (accuracy >= 90) {
      return {
        grade: t('excellent'),
        feedback: t('outstandingKnowledge')
      };
    } else if (accuracy >= 75) {
      return {
        grade: t('veryGood'),
        feedback: t('veryGoodKnowledge')
      };
    } else if (accuracy >= 60) {
      return {
        grade: t('good'),
        feedback: t('goodFoundation')
      };
    } else if (accuracy >= 40) {
      return {
        grade: t('fair'),
        feedback: t('needsMoreStudy')
      };
    } else {
      return {
        grade: t('poor'),
        feedback: t('significantImprovement')
      };
    }
  };

  const handleQuizComplete = async (score: number, totalQuestions: number, durationSeconds: number) => {
    const accuracy = (score / totalQuestions) * 100;
    const { grade, feedback } = calculateGrade(accuracy);

    try {
      await apiRequest("POST", "/api/quiz/sessions", {
        profileId,
        sessionId,
        score,
        totalQuestions,
        accuracy,
        difficulty: selectedDifficulty,
        durationSeconds,
        showOnLeaderboard: showOnLeaderboard ? 1 : 0,
      });
    } catch {
      // History save is best-effort; still show results
    }
    
    setResult({
      score,
      totalQuestions,
      accuracy,
      grade,
      feedback
    });
  };

  const handleStartQuiz = () => {
    if (selectedDifficulty && selectedQuestionCount) {
      setIsStarted(true);
    }
  };

  const handleTryAgain = () => {
    setIsStarted(false);
    setResult(null);
    setSelectedDifficulty(null);
    setSelectedQuestionCount(null);
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Trophy className="w-16 h-16 text-yellow-500" />
              </div>
              <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                <span>{t('quizResults')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{result.score}</div>
                  <div className="text-sm text-gray-600">
                    {t('correctAnswers')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{result.totalQuestions}</div>
                  <div className="text-sm text-gray-600">
                    {t('totalQuestions')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{Math.round(result.accuracy)}%</div>
                  <div className="text-sm text-gray-600">
                    {t('accuracyPercent')}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <Badge className="mb-2 text-lg px-4 py-2">{result.grade}</Badge>
                <p className="text-blue-800">{result.feedback}</p>
              </div>

              <div className="flex space-x-4 justify-center">
                <Button onClick={handleTryAgain} variant="outline" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>{t('tryAgain')}</span>
                </Button>
                <Link href="/">
                  <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
                    <Home className="w-4 h-4" />
                    <span>{t('backToHome')}</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="pt-8">
          <KnowledgeChallenge
            sessionId={sessionId}
            questionCount={selectedQuestionCount!}
            difficulty={selectedDifficulty!}
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Brain className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('knowledgeChallenge')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('testYourKnowledge')}
          </p>
        </div>

        {/* Difficulty Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>
                {t('selectDifficultyLevel')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficulties.map((difficulty) => (
                <Card
                  key={difficulty.level}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedDifficulty === difficulty.level
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDifficulty(difficulty.level)}
                >
                  <CardContent className="p-4 text-center">
                    <Badge className={`mb-2 ${difficulty.color}`}>
                      {difficulty.name}
                    </Badge>
                    <p className="text-sm text-gray-600">{difficulty.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Count Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{t('selectNumberOfQuestions')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {questionCounts.map((count) => (
                <Card
                  key={count}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedQuestionCount === count
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedQuestionCount(count)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{count}</div>
                    <div className="text-sm text-gray-600">{t('questions')}</div>
                    <div className="text-xs text-gray-500">
                      ~{Math.ceil(count / 3)} {t('minAbbrev')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex items-center gap-2 justify-center">
          <Checkbox
            id="leaderboard-opt-in"
            checked={showOnLeaderboard}
            onCheckedChange={(checked) => setShowOnLeaderboard(checked === true)}
          />
          <Label htmlFor="leaderboard-opt-in" className="text-sm text-gray-700 cursor-pointer">
            {t('leaderboardOptIn')}
          </Label>
        </div>

        <div className="mb-6">
          <QuizLeaderboard difficulty={selectedDifficulty ?? undefined} limit={10} />
        </div>

        {/* Start Button */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleStartQuiz}
            disabled={!selectedDifficulty || !selectedQuestionCount}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            {t('startQuiz')}
          </Button>
          
          <div>
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>{t('backToHome')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}