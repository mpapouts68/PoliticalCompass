import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartPie, Zap, Scale, Microscope, GraduationCap, Info, Play } from "lucide-react";
import type { QuestionCount } from "@shared/schema";

interface WelcomeScreenProps {
  onStartSurvey: (questionCount: QuestionCount) => void;
}

export function WelcomeScreen({ onStartSurvey }: WelcomeScreenProps) {
  const [selectedCount, setSelectedCount] = useState<QuestionCount | null>(null);

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
          <ChartPie className="text-primary text-6xl mb-4 mx-auto w-16 h-16" />
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Ανακαλύψτε τη Πολιτική σας Ταυτότητα
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Απαντήστε σε ερωτήσεις βασισμένες στα προγράμματα των κομμάτων και ανακαλύψτε ποιο κόμμα ταιριάζει περισσότερο στις απόψεις σας.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {questionOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedCount === option.count;
            
            return (
              <Card
                key={option.count}
                className={`cursor-pointer transition-all hover:border-primary hover:bg-primary/5 ${
                  isSelected ? "border-primary bg-primary/10" : "border-neutral-200"
                }`}
                onClick={() => setSelectedCount(option.count)}
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
          <Button
            onClick={() => selectedCount && onStartSurvey(selectedCount)}
            disabled={!selectedCount}
            className="px-8 py-3 text-base"
          >
            <Play className="mr-2 w-4 h-4" />
            Έναρξη Τεστ
          </Button>
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
