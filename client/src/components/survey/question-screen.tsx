import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation, useLanguage } from "@/lib/i18n";
import type { Question, QuestionCount, InsertSurveyResponse, AnswerValue } from "@shared/schema";

interface QuestionScreenProps {
  questionCount: QuestionCount;
  sessionId: string;
  onComplete: () => void;
}

export function QuestionScreen({ questionCount, sessionId, onComplete }: QuestionScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { data: questions, isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions", questionCount, sessionId],
    queryFn: async () => {
      // Get existing responses to filter out already answered questions
      const existingResponses = await fetch(`/api/responses/${sessionId}`).then(res => 
        res.ok ? res.json() : []
      ).catch(() => []);
      
      const answeredQuestionIds = new Set(existingResponses.map((r: any) => r.questionId));
      
      // Get new questions, excluding already answered ones
      const response = await fetch(`/api/questions/${questionCount}?sessionId=${sessionId}&exclude=${Array.from(answeredQuestionIds).join(',')}`);
      return response.json();
    }
  });

  const saveResponseMutation = useMutation({
    mutationFn: async (response: InsertSurveyResponse) => {
      const res = await apiRequest("POST", "/api/responses", response);
      return res.json();
    },
  });

  const calculateResultsMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/results", { sessionId });
      return res.json();
    },
    onSuccess: () => {
      onComplete();
    },
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100) : 0;

  const answerOptions = [
    { value: "2", label: t('stronglyAgree'), numericValue: 2 as AnswerValue },
    { value: "1", label: t('agree'), numericValue: 1 as AnswerValue },
    { value: "0", label: t('neutral'), numericValue: 0 as AnswerValue },
    { value: "-1", label: t('disagree'), numericValue: -1 as AnswerValue },
    { value: "-2", label: t('stronglyDisagree'), numericValue: -2 as AnswerValue },
  ];

  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = answers[currentQuestion.id];
      setCurrentAnswer(existingAnswer?.toString() || "");
    }
  }, [currentQuestion, answers]);

  // Auto-advance to next question when answer is selected
  useEffect(() => {
    if (currentAnswer !== "" && !saveResponseMutation.isPending && !calculateResultsMutation.isPending) {
      const timer = setTimeout(async () => {
        if (!currentQuestion || currentAnswer === "") return;

        const answerValue = parseInt(currentAnswer) as AnswerValue;
        const newAnswers = { ...answers, [currentQuestion.id]: answerValue };
        setAnswers(newAnswers);

        // Save response
        await saveResponseMutation.mutateAsync({
          sessionId,
          questionId: currentQuestion.id,
          answer: answerValue,
        });

        if (questions && currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setCurrentAnswer("");
        } else {
          // Calculate results
          await calculateResultsMutation.mutateAsync();
        }
      }, 800); // Small delay for better UX
      
      return () => clearTimeout(timer);
    }
  }, [currentAnswer, saveResponseMutation.isPending, calculateResultsMutation.isPending]);

  const handleNext = async () => {
    if (!currentQuestion || currentAnswer === "") return;

    const answerValue = parseInt(currentAnswer) as AnswerValue;
    const newAnswers = { ...answers, [currentQuestion.id]: answerValue };
    setAnswers(newAnswers);

    // Save response
    await saveResponseMutation.mutateAsync({
      sessionId,
      questionId: currentQuestion.id,
      answer: answerValue,
    });

    if (questions && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
    } else {
      // Calculate results
      await calculateResultsMutation.mutateAsync();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentAnswer("");
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-8 text-center">
          <div className="text-lg text-neutral-600">
            {t('loadingQuestions')}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!questions || !currentQuestion) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-8 text-center">
          <div className="text-lg text-red-600">
            {t('errorLoadingQuestions')}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {/* Progress Bar */}
      <Card className="bg-white shadow-md mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-500">
              {t('progress')}
            </span>
            <span className="text-sm font-medium text-primary">
              {currentQuestionIndex + 1} {t('of')} {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="bg-white shadow-md mb-6">
        <CardContent className="p-8">
          <div className="mb-6">
            <span className="inline-block bg-secondary/10 text-secondary text-sm font-medium px-3 py-1 rounded-full mb-4">
              {currentQuestion.category}
            </span>
            <h3 className="text-xl font-semibold text-neutral-900 leading-relaxed">
              {language === 'el' 
                ? currentQuestion.text 
                : (currentQuestion.textEn || currentQuestion.text)}
            </h3>
          </div>

          {/* Answer Options */}
          <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
            <div className="space-y-3">
              {answerOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-4 border border-neutral-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="ml-3 text-neutral-900 cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation - Auto-advance enabled */}
      <div className="flex justify-center items-center">
        <div className="text-center">
          <p className="text-sm text-neutral-500 mb-4">
            {t('autoAdvanceMessage')}
          </p>
          {(saveResponseMutation.isPending || calculateResultsMutation.isPending) && (
            <div className="text-primary font-medium">
              {calculateResultsMutation.isPending 
                ? t('calculatingResults')
                : t('savingAnswer')
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
