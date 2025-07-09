import { useState } from "react";
import { WelcomeScreen } from "@/components/survey/welcome-screen";
import { QuestionScreen } from "@/components/survey/question-screen";
import { ResultsScreen } from "@/components/survey/results-screen";
import type { QuestionCount } from "@shared/schema";
import { Vote } from "lucide-react";

type SurveyStep = "welcome" | "questions" | "results";

export default function Survey() {
  const [currentStep, setCurrentStep] = useState<SurveyStep>("questions");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<QuestionCount>("30"); // Default to 30 questions
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);

  const handleStartSurvey = (questionCount: QuestionCount) => {
    setSelectedQuestionCount(questionCount);
    setCurrentStep("questions");
  };

  const handleSurveyComplete = () => {
    setCurrentStep("results");
  };

  const handleRestart = () => {
    setCurrentStep("welcome");
    setSelectedQuestionCount(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Vote className="text-primary text-2xl w-8 h-8" />
            <h1 className="text-xl font-semibold text-neutral-900">ΤιΨηφίζω</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentStep === "welcome" && (
          <WelcomeScreen onStartSurvey={handleStartSurvey} />
        )}
        
        {currentStep === "questions" && (
          <QuestionScreen
            questionCount={selectedQuestionCount}
            sessionId={sessionId}
            onComplete={handleSurveyComplete}
          />
        )}
        
        {currentStep === "results" && (
          <ResultsScreen sessionId={sessionId} onRestart={handleRestart} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-neutral-500 text-sm mb-2">
              Δημιουργήθηκε για εκπαιδευτικούς σκοπούς • Δεν αντικαθιστά την προσωπική έρευνα
            </p>
            <p className="text-neutral-400 text-xs">
              Τα δεδομένα βασίζονται σε δημόσια προγράμματα κομμάτων και δηλώσεις
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
