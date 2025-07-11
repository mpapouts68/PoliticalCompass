import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPie, Zap, Scale, Microscope, GraduationCap, Info, Play } from "lucide-react";
import type { QuestionCount } from "@shared/schema";
import { PartyLogo } from "@/components/party-logos";
import { DonationSection } from "@/components/DonationSection";
import { MiniResultsGraph } from "./mini-results-graph";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ContactSection } from "@/components/ContactSection";
import { useTranslation } from "@/lib/i18n";

// SVG version of the Ιδεολόγος compass logo
const CompassLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {/* Black border circle */}
    <circle cx="50" cy="50" r="48" fill="none" stroke="black" strokeWidth="4"/>
    
    {/* Colored quadrants */}
    <path d="M 50,50 L 50,2 A 48,48 0 0,1 98,50 Z" fill="#ff6b6b" />
    <path d="M 50,50 L 98,50 A 48,48 0 0,1 50,98 Z" fill="#4ecdc4" />
    <path d="M 50,50 L 50,98 A 48,48 0 0,1 2,50 Z" fill="#45b7d1" />
    <path d="M 50,50 L 2,50 A 48,48 0 0,1 50,2 Z" fill="#9b59b6" />
    
    {/* Compass needle */}
    <path d="M 50,15 L 40,50 L 50,40 L 60,50 Z" fill="black" />
  </svg>
);

interface WelcomeScreenProps {
  onStartSurvey: (questionCount: QuestionCount) => void;
}

export function WelcomeScreen({ onStartSurvey }: WelcomeScreenProps) {
  const { t } = useTranslation();

  const questionOptions = [
    {
      count: "15" as QuestionCount,
      title: t('quickTest'),
      description: `15 ${t('questions')}`,
      duration: t('language') === 'el' ? "~5 λεπτά" : "~5 min",
      icon: Zap,
      color: "text-accent"
    },
    {
      count: "30" as QuestionCount,
      title: t('standardTest'),
      description: `30 ${t('questions')}`,
      duration: t('language') === 'el' ? "~10 λεπτά" : "~10 min",
      icon: Scale,
      color: "text-secondary"
    },
    {
      count: "60" as QuestionCount,
      title: t('detailedTest'),
      description: `60 ${t('questions')}`,
      duration: t('language') === 'el' ? "~20 λεπτά" : "~20 min",
      icon: Microscope,
      color: "text-primary"
    },
    {
      count: "100" as QuestionCount,
      title: t('completeTest'),
      description: `100 ${t('questions')}`,
      duration: t('language') === 'el' ? "~30 λεπτά" : "~30 min",
      icon: GraduationCap,
      color: "text-neutral-900"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    {/* Header with language selector */}
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CompassLogo className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('appTitle')}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">online</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 py-8">
    <Card className="bg-white shadow-md mb-8">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <CompassLogo className="w-24 h-24 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-neutral-900 mb-2">
            {t('appSubtitle')}
          </h2>
          <h3 className="text-2xl font-semibold text-neutral-700 mb-4">
            {t('appTitle')} <span className="text-blue-600">online</span>
          </h3>
          
          {/* Party Logos Row */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            {["ΝΔ", "ΣΥΡΙΖΑ", "ΠΑΣΟΚ", "ΚΚΕ", "ΕΛ", "ΠΕ", "ΝΙΚΗ", "ΣΠΑΡ", "ΝΑ"].map((party) => (
              <PartyLogo key={party} party={party} className="w-12 h-12" />
            ))}
          </div>
          
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            <span className="text-blue-600 font-medium">{t('surveyLength')}</span>
          </p>
          <p className="text-base text-neutral-500 max-w-2xl mx-auto mt-2">
            {t('appDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {questionOptions.map((option) => {
            const Icon = option.icon;
            
            return (
              <Card
                key={option.count}
                className="cursor-pointer transition-all hover:border-primary hover:bg-primary/5 border-neutral-200"
                onClick={() => onStartSurvey(option.count)}
              >
                <CardContent className="p-6">
                  <div className="text-center">
                    <Icon className={`${option.color} text-2xl mb-3 mx-auto w-8 h-8`} />
                    <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                    <p className="text-neutral-500 text-sm mb-3">{option.description}</p>
                    <span className={`${option.color} font-medium`}>{option.duration}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-neutral-500 text-sm">
            {t('language') === 'el' 
              ? 'Επιλέξτε τον αριθμό ερωτήσεων για να ξεκινήσει αυτόματα το τεστ'
              : 'Select the number of questions to automatically start the test'}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <p className="text-sm text-neutral-600 text-center">
            <Info className="inline text-accent mr-2 w-4 h-4" />
            {t('language') === 'el' 
              ? 'Αυτό το εργαλείο έχει εκπαιδευτικό χαρακτήρα και βοηθά στην κατανόηση των πολιτικών θέσεων. Δεν αντικαθιστά την προσωπική έρευνα και κρίση.'
              : 'This tool is educational and helps understand political positions. It does not replace personal research and judgment.'}
          </p>
        </div>
      </CardContent>
    </Card>
    
    {/* Mini Results Graph */}
    <div className="mb-8">
      <MiniResultsGraph />
    </div>
    
    {/* Donation Section */}
    <DonationSection />
    
    {/* Contact Section */}
    <ContactSection />
    </div>
    </div>
  );
}
