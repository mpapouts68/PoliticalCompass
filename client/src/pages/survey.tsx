import { useState } from "react";
import { WelcomeScreen } from "@/components/survey/welcome-screen";
import { QuestionScreen } from "@/components/survey/question-screen";
import { ResultsScreen } from "@/components/survey/results-screen";
import type { QuestionCount } from "@shared/schema";
import { Vote, ArrowLeft } from "lucide-react";
import { PartyLogosSidebar } from "@/components/party-logos";
import { useTranslation } from "@/lib/i18n";

type SurveyStep = "welcome" | "questions" | "results";

export default function Survey() {
  const [currentStep, setCurrentStep] = useState<SurveyStep>("welcome");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<QuestionCount | null>(null);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const { t } = useTranslation();

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

  const handleContinueWithMore = (newQuestionCount: QuestionCount) => {
    setSelectedQuestionCount(newQuestionCount);
    setCurrentStep("questions");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Home Button - only show when not on welcome */}
        {currentStep !== "welcome" && (
          <div className="mb-6">
            <button
              onClick={handleRestart}
              className="text-neutral-500 hover:text-primary transition-colors text-sm flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToHome')}</span>
            </button>
          </div>
        )}
        
        {currentStep === "welcome" && (
          <WelcomeScreen onStartSurvey={handleStartSurvey} />
        )}
        
        {currentStep === "questions" && selectedQuestionCount && (
          <QuestionScreen
            questionCount={selectedQuestionCount}
            sessionId={sessionId}
            onComplete={handleSurveyComplete}
          />
        )}
        
        {currentStep === "results" && selectedQuestionCount && (
          <ResultsScreen 
            sessionId={sessionId} 
            currentQuestionCount={selectedQuestionCount}
            onRestart={handleRestart}
            onContinueWithMore={handleContinueWithMore}
          />
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
