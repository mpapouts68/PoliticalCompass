import { useState } from "react";
import { WelcomeScreen } from "@/components/survey/welcome-screen";
import { QuestionScreen } from "@/components/survey/question-screen";
import { ResultsScreen } from "@/components/survey/results-screen";
import type { QuestionCount } from "@shared/schema";
import { Vote } from "lucide-react";
import { PartyLogosSidebar } from "@/components/party-logos";

type SurveyStep = "welcome" | "questions" | "results";

export default function Survey() {
  const [currentStep, setCurrentStep] = useState<SurveyStep>("welcome");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<QuestionCount | null>(null);
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

  const handleContinueWithMore = (newQuestionCount: QuestionCount) => {
    setSelectedQuestionCount(newQuestionCount);
    setCurrentStep("questions");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 via-blue-500 to-green-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m7 11 2-2-2-2"/>
                  <path d="M11 13h4"/>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-neutral-900">Ιδεολόγος</h1>
            </div>
            {currentStep !== "welcome" && (
              <button
                onClick={handleRestart}
                className="text-neutral-500 hover:text-primary transition-colors text-sm"
              >
                ← Πίσω στην αρχή
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Party Logos Sidebar */}
      <PartyLogosSidebar />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pr-20">
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
