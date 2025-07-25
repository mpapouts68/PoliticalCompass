import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Crown, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  AlertTriangle,
  Target,
  Zap
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useTranslation, useLanguage } from "@/lib/i18n";

interface PmScenario {
  id: number;
  title: string;
  titleEn: string | null;
  description: string;
  descriptionEn: string | null;
  context: string;
  contextEn: string | null;
  category: string;
  difficulty: number;
  timePressure: number; // 1 for urgent, 0 for normal
}

interface PolicyOption {
  id: number;
  scenarioId: number;
  optionText: string;
  optionTextEn: string | null;
  politicalCost: number; // 1-10 scale
  economicImpact: number; // -5 to +5 scale
  socialImpact: number; // -5 to +5 scale
  partyAlignment: string; // JSON string
  consequences: string;
  consequencesEn: string | null;
}

interface PmDecision {
  scenarioId: number;
  chosenOptionId: number;
  decisionTime: number;
  sessionId: string;
}

interface ScenarioResult {
  scenario: PmScenario;
  chosenOption: PolicyOption;
  decisionTime: number;
  consequences: string;
  impacts: {
    political: number;
    economic: number;
    social: number;
  };
}

interface PrimeMinisterScenarioProps {
  sessionId: string;
  difficulty?: number;
  onComplete: (result: ScenarioResult) => void;
}

export function PrimeMinisterScenario({ 
  sessionId, 
  difficulty = 1,
  onComplete 
}: PrimeMinisterScenarioProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { data: scenarioData, isLoading } = useQuery<{ scenario: PmScenario; options: PolicyOption[] }>({
    queryKey: ['/api/pm/scenario', difficulty],
    queryFn: async () => {
      const response = await fetch(`/api/pm/scenario?difficulty=${difficulty}`);
      return response.json();
    }
  });

  const saveDecisionMutation = useMutation({
    mutationFn: (decision: PmDecision) => 
      apiRequest('POST', '/api/pm/decisions', decision),
    onSuccess: (data) => {
      if (scenarioData && selectedOptionId) {
        const chosenOption = scenarioData.options.find(opt => opt.id === selectedOptionId);
        if (chosenOption) {
          const decisionTime = Math.round((Date.now() - startTime) / 1000);
          const result: ScenarioResult = {
            scenario: scenarioData.scenario,
            chosenOption,
            decisionTime,
            consequences: language === 'el' 
              ? chosenOption.consequences 
              : (chosenOption.consequencesEn || chosenOption.consequences),
            impacts: {
              political: chosenOption.politicalCost,
              economic: chosenOption.economicImpact,
              social: chosenOption.socialImpact
            }
          };
          onComplete(result);
        }
      }
    }
  });

  // Handle countdown timer for urgent scenarios
  useEffect(() => {
    if (scenarioData?.scenario.timePressure === 1) {
      const urgentTimeLimit = 120; // 2 minutes for urgent decisions
      setTimeLeft(urgentTimeLimit);
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            // Time's up - auto-select first option if none selected
            if (!selectedOptionId && scenarioData.options.length > 0) {
              setSelectedOptionId(scenarioData.options[0].id);
              handleSubmitDecision(scenarioData.options[0].id);
            }
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [scenarioData, selectedOptionId]);

  const handleSubmitDecision = (optionId?: number) => {
    const chosenId = optionId || selectedOptionId;
    if (!chosenId || !scenarioData) return;

    const decisionTime = Math.round((Date.now() - startTime) / 1000);
    
    saveDecisionMutation.mutate({
      scenarioId: scenarioData.scenario.id,
      chosenOptionId: chosenId,
      decisionTime,
      sessionId
    });
  };

  const getImpactIcon = (impact: number) => {
    if (impact > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (impact < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Target className="w-4 h-4 text-gray-600" />;
  };

  const getImpactColor = (impact: number) => {
    if (impact > 2) return "text-green-700 bg-green-50";
    if (impact > 0) return "text-green-600 bg-green-50";
    if (impact < -2) return "text-red-700 bg-red-50";
    if (impact < 0) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'economic': return <DollarSign className="w-5 h-5" />;
      case 'social': return <Users className="w-5 h-5" />;
      case 'crisis': return <AlertTriangle className="w-5 h-5" />;
      default: return <Crown className="w-5 h-5" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="w-6 h-6 animate-pulse text-purple-600" />
            <span>{t('loadingScenario')}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!scenarioData) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <Crown className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">{t('noScenariosAvailable')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { scenario, options } = scenarioData;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-purple-600" />
            <span>{t('primeMinisterForADay')}</span>
          </CardTitle>
          <div className="flex items-center space-x-4">
            {scenario.timePressure === 1 && timeLeft !== null && (
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                timeLeft < 30 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
            <Badge variant="outline" className="flex items-center space-x-1">
              {getCategoryIcon(scenario.category)}
              <span>{scenario.category}</span>
            </Badge>
          </div>
        </div>
        {scenario.timePressure === 1 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-red-700">
              <Zap className="w-5 h-5" />
              <span className="font-medium">{t('urgentScenario')}</span>
            </div>
            <p className="text-sm text-red-600 mt-1">{t('timeLimit2Minutes')}</p>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Scenario Title and Description */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-purple-900 mb-3">
              {language === 'el' ? scenario.title : (scenario.titleEn || scenario.title)}
            </h2>
            <p className="text-purple-800 text-lg leading-relaxed mb-4">
              {language === 'el' ? scenario.description : (scenario.descriptionEn || scenario.description)}
            </p>
            <div className="bg-purple-100 p-4 rounded border-l-4 border-purple-400">
              <p className="text-sm text-purple-700 leading-relaxed">
                <strong>{t('context')}:</strong> {language === 'el' ? scenario.context : (scenario.contextEn || scenario.context)}
              </p>
            </div>
          </div>

          {/* Policy Options */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5 text-gray-600" />
              <span>{t('yourOptions')}</span>
            </h3>
            
            <RadioGroup 
              value={selectedOptionId?.toString() || ""} 
              onValueChange={(value) => setSelectedOptionId(parseInt(value))}
            >
              <div className="space-y-4">
                {options.map((option) => (
                  <div key={option.id} className="border rounded-lg">
                    <div className="flex items-start space-x-3 p-4">
                      <RadioGroupItem 
                        value={option.id.toString()} 
                        id={`option-${option.id}`}
                        className="mt-1"
                      />
                      <Label 
                        htmlFor={`option-${option.id}`} 
                        className="flex-1 cursor-pointer"
                      >
                        <div>
                          <p className="text-base font-medium text-gray-900 mb-2">
                            {language === 'el' ? option.optionText : (option.optionTextEn || option.optionText)}
                          </p>
                          
                          {/* Impact Indicators */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${getImpactColor(option.politicalCost)}`}>
                              <Crown className="w-3 h-3" />
                              <span>{t('political')}: {option.politicalCost}/10</span>
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${getImpactColor(option.economicImpact)}`}>
                              {getImpactIcon(option.economicImpact)}
                              <span>{t('economic')}: {option.economicImpact > 0 ? '+' : ''}{option.economicImpact}</span>
                            </div>
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${getImpactColor(option.socialImpact)}`}>
                              <Users className="w-3 h-3" />
                              <span>{t('social')}: {option.socialImpact > 0 ? '+' : ''}{option.socialImpact}</span>
                            </div>
                          </div>

                          {/* Party Support */}
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">{t('partySupport')}:</span>
                            <span className="ml-1">{option.partyAlignment}</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Submit Decision */}
          <div className="flex justify-center pt-4">
            <Button 
              onClick={() => handleSubmitDecision()}
              disabled={!selectedOptionId || saveDecisionMutation.isPending}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              {saveDecisionMutation.isPending ? t('submittingDecision') : t('makeDecision')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}