import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPie, Zap, Scale, Microscope, GraduationCap, Info, Play, Compass } from "lucide-react";
import type { QuestionCount } from "@shared/schema";
import { PartyLogo } from "@/components/party-logos";
import { DonationSection } from "@/components/DonationSection";
import { MiniResultsGraph } from "./mini-results-graph";
import { IdeologyMiniResults } from "./ideology-mini-results";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ContactSection } from "@/components/ContactSection";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";

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

    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Title Section */}
      <div className="text-center mb-8">
        <CompassLogo className="w-24 h-24 mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-neutral-900 mb-2">
          {t('appSubtitle')}
        </h2>
        <h3 className="text-2xl font-semibold text-neutral-700 mb-4">
          {t('appTitle')} <span className="text-blue-600">online</span>
        </h3>
      </div>

      {/* Two Column Layout - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* LEFT COLUMN - Party Alignment Tests */}
        <div className="w-full">
          <Card className="bg-white shadow-md h-full">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <ChartPie className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {t('language') === 'el' ? 'Τεστ Κομματικής Ευθυγράμμισης' : 'Party Alignment Test'}
                </h3>
                <p className="text-base text-neutral-600 mb-4">
                  {t('language') === 'el' 
                    ? 'Ανακαλύψτε ποιο κόμμα ταιριάζει περισσότερο στις απόψεις σας'
                    : 'Discover which party best matches your views'}
                </p>
                
                {/* Party Logos Row */}
                <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                  {["ΝΔ", "ΣΥΡΙΖΑ", "ΠΑΣΟΚ", "ΚΚΕ", "ΕΛ", "ΠΕ", "ΝΙΚΗ", "ΣΠΑΡ", "ΝΑ"].map((party) => (
                    <PartyLogo key={party} party={party} className="w-8 h-8" />
                  ))}
                </div>
                
                <p className="text-sm text-blue-600 font-medium mb-4">
                  {t('surveyLength')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {questionOptions.map((option) => {
                  const Icon = option.icon;
                  
                  return (
                    <Card
                      key={option.count}
                      className="cursor-pointer transition-all hover:border-primary hover:bg-primary/5 border-neutral-200"
                      onClick={() => onStartSurvey(option.count)}
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Icon className={`${option.color} text-xl mb-2 mx-auto w-6 h-6`} />
                          <h4 className="font-semibold text-base mb-1">{option.title}</h4>
                          <p className="text-neutral-500 text-xs mb-2">{option.description}</p>
                          <span className={`${option.color} font-medium text-sm`}>{option.duration}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <p className="text-neutral-500 text-sm text-center">
                {t('selectQuestionCount')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - Ideology Test */}
        <div className="w-full">
          <Card className="bg-white shadow-md h-full">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Compass className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  {t('ideologyTest')}
                </h3>
                <p className="text-base text-neutral-600 mb-4">
                  {t('ideologyTestDescription')}
                </p>
                <p className="text-sm text-purple-600 font-medium mb-4">
                  {t('chooseQuestionCount')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {questionOptions.map((option) => {
                  const Icon = option.icon;
                  
                  return (
                    <Link key={option.count} href={`/ideology?count=${option.count}`}>
                      <Card className="cursor-pointer transition-all hover:border-purple-500 hover:bg-purple-50 border-neutral-200 w-full">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <Icon className="text-purple-600 text-xl mb-2 mx-auto w-6 h-6" />
                            <h4 className="font-semibold text-base mb-1">{option.title}</h4>
                            <p className="text-neutral-500 text-xs mb-2">{option.description}</p>
                            <span className="text-purple-600 font-medium text-sm">{option.duration}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-red-100 via-yellow-100 to-blue-100 p-4 rounded-lg mb-4">
                <div className="text-center">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-600 font-semibold text-xs">
                      {t('left').toUpperCase()}
                    </span>
                    <span className="text-gray-600 font-semibold text-xs">
                      {t('center').toUpperCase()}
                    </span>
                    <span className="text-blue-600 font-semibold text-xs">
                      {t('right').toUpperCase()}
                    </span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full"></div>
                </div>
              </div>

              <p className="text-neutral-500 text-sm text-center">
                {t('selectQuestionCount')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mb-8">
        <Card className="bg-accent/10 border border-accent/20">
          <CardContent className="p-4">
            <p className="text-sm text-neutral-600 text-center">
              <Info className="inline text-accent mr-2 w-4 h-4" />
              {t('educationalDisclaimer')}
            </p>
          </CardContent>
        </Card>
      </div>
    
    {/* Results Section - Two Columns */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <MiniResultsGraph />
      <IdeologyMiniResults />
    </div>
    
    {/* Donation Section */}
    <DonationSection />
    
    {/* Contact Section */}
    <ContactSection />
    </div>
    </div>
  );
}
