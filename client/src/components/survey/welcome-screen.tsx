import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPie, Zap, Scale, Microscope, GraduationCap, Info, Play } from "lucide-react";
import type { QuestionCount } from "@shared/schema";

interface WelcomeScreenProps {
  onStartSurvey: (questionCount: QuestionCount) => void;
}

export function WelcomeScreen({ onStartSurvey }: WelcomeScreenProps) {

  const questionOptions = [
    {
      count: "15" as QuestionCount,
      title: "Γρήγορο Τεστ",
      description: "15 ερωτήσεις",
      duration: "~5 λεπτά",
      icon: Zap,
      color: "text-accent"
    },
    {
      count: "30" as QuestionCount,
      title: "Βασικό Τεστ",
      description: "30 ερωτήσεις",
      duration: "~10 λεπτά",
      icon: Scale,
      color: "text-secondary"
    },
    {
      count: "60" as QuestionCount,
      title: "Αναλυτικό Τεστ",
      description: "60 ερωτήσεις",
      duration: "~20 λεπτά",
      icon: Microscope,
      color: "text-primary"
    },
    {
      count: "100" as QuestionCount,
      title: "Εκτενές Τεστ",
      description: "100 ερωτήσεις",
      duration: "~30 λεπτά",
      icon: GraduationCap,
      color: "text-neutral-900"
    }
  ];

  return (
    <Card className="bg-white shadow-md mb-8">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-black bg-white flex items-center justify-center shadow-lg relative">
            <div className="absolute inset-2 rounded-full overflow-hidden">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-red-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 0% 0%, 50% 0%)' }}></div>
                <div className="absolute inset-0 bg-blue-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }}></div>
                <div className="absolute inset-0 bg-green-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                <div className="absolute inset-0 bg-purple-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%, 0% 0%)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-black" fill="currentColor">
                    <path d="M12 2L8 12L12 10L16 12L12 2Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-2">
            Μάθε ποιος είσαι πολιτικά
          </h2>
          <h3 className="text-2xl font-semibold text-neutral-700 mb-4">
            Ιδεολόγος <span className="text-blue-600">online</span>
          </h3>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            <span className="text-blue-600 font-medium">με 15 έως 100 ερωτήσεις</span>
          </p>
          <p className="text-base text-neutral-500 max-w-2xl mx-auto mt-2">
            Απαντήστε σε ερωτήσεις βασισμένες στα προγράμματα των κομμάτων και ανακαλύψτε ποιο κόμμα ταιριάζει περισσότερο στις απόψεις σας.
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
            Επιλέξτε τον αριθμό ερωτήσεων για να ξεκινήσει αυτόματα το τεστ
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <p className="text-sm text-neutral-600 text-center">
            <Info className="inline text-accent mr-2 w-4 h-4" />
            Αυτό το εργαλείο έχει εκπαιδευτικό χαρακτήρα και βοηθά στην κατανόηση των πολιτικών θέσεων. Δεν αντικαθιστά την προσωπική έρευνα και κρίση.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
