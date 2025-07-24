import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Compass } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation } from "@/lib/i18n";

interface IdeologyQuestion {
  id: number;
  text: string;
  text_en: string | null;
  category: string;
  leftScore: number;
  rightScore: number;
}

interface IdeologyResponse {
  questionId: number;
  answer: number;
  sessionId: string;
}

interface IdeologyResult {
  id: number;
  sessionId: string;
  totalScore: number;
  label: string;
  percentage: number;
  createdAt: string;
}

const ANSWER_OPTIONS = [
  { value: 1, key: "stronglyDisagree" },
  { value: 2, key: "disagree" },
  { value: 3, key: "neutral" },
  { value: 4, key: "agree" },
  { value: 5, key: "stronglyAgree" }
];

export default function IdeologyTest() {
  const { t } = useTranslation();
  const [sessionId] = useState(() => `ideology-${Date.now()}-${Math.random()}`);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const queryClient = useQueryClient();

  const { data: questions, isLoading } = useQuery<IdeologyQuestion[]>({
    queryKey: ['/api/ideology/questions/30'],
    enabled: !isComplete
  });

  const { data: resultData } = useQuery<{ result: IdeologyResult }>({
    queryKey: ['/api/ideology/results', sessionId],
    enabled: showResults
  });

  const saveResponseMutation = useMutation({
    mutationFn: (response: IdeologyResponse) => 
      apiRequest('POST', '/api/ideology/responses', response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ideology/responses'] });
    }
  });

  const calculateResultsMutation = useMutation({
    mutationFn: (sessionId: string) => 
      apiRequest('POST', '/api/ideology/results', { sessionId }),
    onSuccess: () => {
      setShowResults(true);
      queryClient.invalidateQueries({ queryKey: ['/api/ideology/results', sessionId] });
    }
  });

  const handleAnswer = async (answer: number) => {
    if (!questions?.[currentQuestionIndex]) return;

    const questionId = questions[currentQuestionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));

    // Save response to backend
    await saveResponseMutation.mutateAsync({
      questionId,
      answer,
      sessionId
    });

    // Auto-advance after 800ms delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setIsComplete(true);
        calculateResultsMutation.mutate(sessionId);
      }
    }, 800);
  };

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">
            {t('loadingQuestions')}
          </p>
        </div>
      </div>
    );
  }

  if (showResults && resultData?.result) {
    const result = resultData.result as IdeologyResult;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t('home')}
              </Button>
            </Link>
          </div>

          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                <Compass className="h-8 w-8 inline-block mr-2" />
                {t('ideologyResults')}
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                {t('yourPoliticalPosition')}
              </p>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {Math.round(result.percentage)}%
                </div>
                <div className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {getLocalizedLabel(result.label, t('language'))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t('score')} {result.totalScore.toFixed(2)} ({t('from')} -3 {t('to')} +3)
                </div>
              </div>

              {/* Visual gauge */}
              <div className="mb-8">
                <div className="relative h-8 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full">
                  <div 
                    className="absolute top-0 h-8 w-1 bg-black transform -translate-x-0.5"
                    style={{ left: `${result.percentage}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs">
                      {Math.round(result.percentage)}%
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-2">
                  <span>{t('left')}</span>
                  <span>{t('center')}</span>
                  <span>{t('right')}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {t('description')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">
                      {getIdeologyDescription(result.label, t('language'))}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {t('characteristics')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      {getIdeologyCharacteristics(result.label, t('language')).map((char, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-8">
                <Link href="/">
                  <Button size="lg" className="mr-4">
                    {t('homePage')}
                  </Button>
                </Link>
                <Link href="/survey">
                  <Button variant="outline" size="lg">
                    {t('partyAlignmentTest')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isComplete && !showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">
            {t('calculatingResults')}
          </p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">
            {t('errorLoadingQuestions')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t('home')}
            </Button>
          </Link>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
{t('question')} {currentQuestionIndex + 1} {t('of')} {questions?.length || 30}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800 dark:text-gray-200">
              {t('ideologyTest')}
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-400">
              {t('ideologyTestDescription')}
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-6">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>{t('category')}</strong> {currentQuestion.category}
                </p>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center leading-relaxed">
                {t('language') === 'el' ? currentQuestion.text : (currentQuestion.text_en || currentQuestion.text)}
              </h2>
              
              <div className="grid grid-cols-1 gap-3">
                {ANSWER_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    onClick={() => handleAnswer(option.value)}
                    disabled={saveResponseMutation.isPending}
                  >
                    <div className="flex items-center w-full">
                      <div className="w-8 h-8 rounded-full border-2 border-blue-600 flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-blue-600 font-semibold">{option.value}</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {t(option.key)}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper functions for labels and descriptions
function getLocalizedLabel(label: string, language: string): string {
  const translations: Record<string, string> = {
    "Far Left": language === 'el' ? "Ακροαριστερά" : "Far Left",
    "Left": language === 'el' ? "Αριστερά" : "Left", 
    "Center-Left": language === 'el' ? "Κεντροαριστερά" : "Center-Left",
    "Center": language === 'el' ? "Κέντρο" : "Center",
    "Center-Right": language === 'el' ? "Κεντροδεξιά" : "Center-Right",  
    "Right": language === 'el' ? "Δεξιά" : "Right",
    "Far Right": language === 'el' ? "Ακροδεξιά" : "Far Right"
  };
  return translations[label] || label;
}

function getIdeologyDescription(label: string, language: string): string {
  const descriptions: Record<string, {el: string, en: string}> = {
    "Far Left": {
      el: "Υποστηρίζετε ριζικές αλλαγές στο οικονομικό και κοινωνικό σύστημα, με έμφαση στην ισότητα και την κρατική παρέμβαση.",
      en: "You support radical changes to the economic and social system, with emphasis on equality and state intervention."
    },
    "Left": {
      el: "Τείνετε προς προοδευτικές πολιτικές, υποστηρίζοντας την κοινωνική δικαιοσύνη και τον μεγαλύτερο ρόλο του κράτους.",
      en: "You lean towards progressive policies, supporting social justice and a larger role for the state."
    },
    "Center-Left": {
      el: "Συνδυάζετε κεντρώες απόψεις με κάποια στοιχεία προοδευτικής πολιτικής και κοινωνικής δικαιοσύνης.",
      en: "You combine centrist views with some elements of progressive politics and social justice."
    },
    "Center": {
      el: "Υιοθετείτε μια ισορροπημένη προσέγγιση, συνδυάζοντας στοιχεία από διαφορετικές πολιτικές παραδόσεις.",
      en: "You adopt a balanced approach, combining elements from different political traditions."
    },
    "Center-Right": {
      el: "Συνδυάζετε κεντρώες απόψεις με κάποια στοιχεία συντηρητικής πολιτικής και οικονομικού φιλελευθερισμού.",
      en: "You combine centrist views with some elements of conservative politics and economic liberalism."
    },
    "Right": {
      el: "Τείνετε προς συντηρητικές πολιτικές, υποστηρίζοντας την ελεύθερη αγορά και τις παραδοσιακές αξίες.",
      en: "You lean towards conservative policies, supporting free markets and traditional values."
    },
    "Far Right": {
      el: "Υποστηρίζετε ισχυρά συντηρητικές και εθνικιστικές πολιτικές με έμφαση στην παράδοση και την αυθεντία.",
      en: "You support strongly conservative and nationalist policies with emphasis on tradition and authority."
    }
  };
  
  const desc = descriptions[label];
  return desc ? desc[language as 'el' | 'en'] : '';
}

function getIdeologyCharacteristics(label: string, language: string): string[] {
  const characteristics: Record<string, {el: string[], en: string[]}> = {
    "Far Left": {
      el: ["Ισχυρή κρατική παρέμβαση", "Κοινωνική ισότητα", "Εργατικά δικαιώματα", "Αντικαπιταλισμός"],
      en: ["Strong state intervention", "Social equality", "Workers' rights", "Anti-capitalism"]
    },
    "Left": {
      el: ["Κοινωνική δικαιοσύνη", "Δημόσιες υπηρεσίες", "Περιβαλλοντική προστασία", "Προοδευτικές αξίες"],
      en: ["Social justice", "Public services", "Environmental protection", "Progressive values"]
    },
    "Center-Left": {
      el: ["Μικτή οικονομία", "Κοινωνικό κράτος", "Ανθρώπινα δικαιώματα", "Μέτρια μεταρρύθμιση"],
      en: ["Mixed economy", "Welfare state", "Human rights", "Moderate reform"]
    },
    "Center": {
      el: ["Πραγματισμός", "Συμβιβασμός", "Σταδιακή αλλαγή", "Ισορροπημένες λύσεις"],
      en: ["Pragmatism", "Compromise", "Gradual change", "Balanced solutions"]
    },
    "Center-Right": {
      el: ["Οικονομική ελευθερία", "Μέτρια συντήρηση", "Προσωπική ευθύνη", "Αποδοτικότητα"],
      en: ["Economic freedom", "Moderate conservation", "Personal responsibility", "Efficiency"]
    },
    "Right": {
      el: ["Ελεύθερη αγορά", "Παραδοσιακές αξίες", "Ατομική ελευθερία", "Περιορισμένο κράτος"],
      en: ["Free market", "Traditional values", "Individual freedom", "Limited government"]
    },
    "Far Right": {
      el: ["Εθνικισμός", "Αυθορισμός", "Παραδοσιακή κοινωνία", "Ισχυρή εξουσία"],
      en: ["Nationalism", "Authoritarianism", "Traditional society", "Strong authority"]
    }
  };
  
  const chars = characteristics[label];
  return chars ? chars[language as 'el' | 'en'] : [];
}