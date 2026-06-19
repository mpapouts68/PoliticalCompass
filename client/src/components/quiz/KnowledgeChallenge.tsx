import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, CheckCircle, XCircle, Clock, Trophy } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation, useLanguage } from "@/lib/i18n";

interface QuizQuestion {
  id: number;
  question: string;
  questionEn: string | null;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
  explanationEn: string | null;
  category: string;
  difficulty: number;
  era: string | null;
}

interface QuizResult {
  questionId: number;
  userAnswer: string;
  isCorrect: number; // 1 for correct, 0 for incorrect
  timeTaken: number;
  sessionId: string;
}

interface KnowledgeChallengeProps {
  sessionId: string;
  questionCount?: number;
  difficulty?: number;
  onComplete: (score: number, totalQuestions: number, durationSeconds: number) => void;
}

export function KnowledgeChallenge({ 
  sessionId, 
  questionCount = 5, 
  difficulty,
  onComplete 
}: KnowledgeChallengeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [quizStartTime] = useState<number>(Date.now());
  const [score, setScore] = useState(0);
  const { t, translateCategory } = useTranslation();
  const { language } = useLanguage();

  const { data: questions, isLoading } = useQuery<QuizQuestion[]>({
    queryKey: ['/api/quiz/questions', questionCount, difficulty],
    queryFn: async () => {
      const url = difficulty 
        ? `/api/quiz/questions/${questionCount}?difficulty=${difficulty}`
        : `/api/quiz/questions/${questionCount}`;
      const response = await fetch(url);
      return response.json();
    }
  });

  const saveResultMutation = useMutation({
    mutationFn: (result: QuizResult) => 
      apiRequest('POST', '/api/quiz/results', result),
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100) : 0;

  const normalizeWrongAnswers = (raw: unknown, correct: string): string[] => {
    if (Array.isArray(raw)) {
      return raw.map(String).filter((a) => a && a !== correct).slice(0, 3);
    }
    return [];
  };

  // Stable shuffled options with letter labels (avoids RadioGroup duplicate-value bugs)
  const answerOptions = useMemo(() => {
    if (!currentQuestion) return [];
    const wrong = normalizeWrongAnswers(currentQuestion.wrongAnswers, currentQuestion.correctAnswer);
    const options = [currentQuestion.correctAnswer, ...wrong].filter(Boolean);
    const unique = [...new Set(options)].slice(0, 4);
    if (unique.length < 4) return [];

    const letters = ["Α", "Β", "Γ", "Δ"];
    return unique
      .map((text) => ({ text }))
      .sort(() => Math.random() - 0.5)
      .map((option, index) => ({
        id: `q${currentQuestion.id}-opt${index}`,
        letter: letters[index],
        text: option.text,
      }));
  }, [currentQuestion?.id]);

  const selectedOption = answerOptions.find((option) => option.id === selectedAnswer);

  useEffect(() => {
    if (currentQuestion) {
      setStartTime(Date.now());
      setSelectedAnswer("");
      setShowExplanation(false);
      setIsAnswered(false);
    }
  }, [currentQuestion]);

  const handleAnswerSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedAnswer(optionId);
    const option = answerOptions.find((item) => item.id === optionId);
    if (!option) return;
    
    setTimeout(() => {
      handleSubmitAnswer(option.text);
    }, 800);
  };

  const handleSubmitAnswer = (answerText?: string) => {
    const answerToSubmit = answerText || selectedOption?.text;
    if (!currentQuestion || !answerToSubmit || isAnswered) return;

    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const isCorrect = answerToSubmit === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerToSubmit
    }));

    if (isCorrect) {
      setScore(newScore);
    }

    // Save result to database
    saveResultMutation.mutate({
      questionId: currentQuestion.id,
      userAnswer: answerToSubmit,
      isCorrect: isCorrect ? 1 : 0,
      timeTaken,
      sessionId
    });

    setIsAnswered(true);
    setShowExplanation(true);
    
    // Auto-advance to next question after showing explanation
    setTimeout(() => {
      if (currentQuestionIndex < (questions?.length || 0) - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onComplete(newScore, questions?.length || 0, Math.round((Date.now() - quizStartTime) / 1000));
      }
    }, 2500);
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Brain className="w-6 h-6 animate-pulse text-blue-600" />
            <span>{t('loading')}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">{t('noQuestionsAvailable')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span>{t('knowledgeChallenge')}</span>
          </CardTitle>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Trophy className="w-4 h-4" />
              <span>{score}/{questions.length}</span>
            </div>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
        <div className="text-sm text-gray-600 text-center">
          {t('question')} {currentQuestionIndex + 1} {t('of')} {questions.length}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {currentQuestion && (
          <div className="space-y-6">
            {/* Question */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-medium text-blue-900">
                {language === 'el' ? currentQuestion.question : (currentQuestion.questionEn || currentQuestion.question)}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-blue-700">
                <span className="bg-blue-200 px-2 py-1 rounded">
                  {translateCategory(currentQuestion.category)}
                </span>
                {currentQuestion.era && (
                  <span className="bg-blue-200 px-2 py-1 rounded">
                    {currentQuestion.era}
                  </span>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{t('difficulty')}: {currentQuestion.difficulty}/3</span>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            {answerOptions.length === 0 ? (
              <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">{t('noQuestionsAvailable')}</p>
            ) : (
            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {answerOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id}
                      disabled={isAnswered}
                    />
                    <Label 
                      htmlFor={option.id} 
                      className={`flex-1 p-3 rounded-lg border cursor-pointer transition-colors ${
                        isAnswered
                          ? option.text === currentQuestion.correctAnswer
                            ? 'bg-green-100 border-green-300 text-green-800'
                            : option.id === selectedAnswer && option.text !== currentQuestion.correctAnswer
                            ? 'bg-red-100 border-red-300 text-red-800'
                            : 'bg-gray-100 border-gray-300'
                          : selectedAnswer === option.id
                          ? 'bg-blue-100 border-blue-300'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span><span className="font-semibold mr-2">{option.letter}.</span>{option.text}</span>
                        {isAnswered && option.text === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                        )}
                        {isAnswered && option.id === selectedAnswer && option.text !== currentQuestion.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            )}

            {/* Explanation */}
            {showExplanation && (
              <div className={`p-4 rounded-lg ${
                selectedOption?.text === currentQuestion.correctAnswer 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-2">
                  {selectedOption?.text === currentQuestion.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${
                      selectedOption?.text === currentQuestion.correctAnswer 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {selectedOption?.text === currentQuestion.correctAnswer 
                        ? t('correct') 
                        : t('incorrect')}
                    </p>
                    {selectedOption?.text !== currentQuestion.correctAnswer && (
                      <p className="mt-1 text-sm text-red-700">
                        {t('correctAnswer')}: <strong>{currentQuestion.correctAnswer}</strong>
                      </p>
                    )}
                    <p className={`mt-2 text-sm ${
                      selectedOption?.text === currentQuestion.correctAnswer 
                        ? 'text-green-700' 
                        : 'text-red-700'
                    }`}>
                      {language === 'el' 
                        ? currentQuestion.explanation 
                        : (currentQuestion.explanationEn || currentQuestion.explanation)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Auto-advancing message */}
            {isAnswered && (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {currentQuestionIndex < questions.length - 1 
                    ? t('nextQuestionIn') || 'Επόμενη ερώτηση σε λίγα δευτερόλεπτα...'
                    : t('completingQuiz') || 'Ολοκλήρωση κουίζ...'}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}