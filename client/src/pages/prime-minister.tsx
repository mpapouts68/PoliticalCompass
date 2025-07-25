import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, TrendingUp, TrendingDown, Users, DollarSign, AlertTriangle, Home, Target } from "lucide-react";
import { PrimeMinisterScenario } from "@/components/pm/PrimeMinisterScenario";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";

interface ScenarioResult {
  scenario: {
    id: number;
    title: string;
    titleEn: string | null;
    category: string;
  };
  chosenOption: {
    id: number;
    optionText: string;
    optionTextEn: string | null;
    politicalCost: number;
    economicImpact: number;
    socialImpact: number;
  };
  decisionTime: number;
  consequences: string;
  impacts: {
    political: number;
    economic: number;
    social: number;
  };
}

export function PrimeMinisterPage() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const { t } = useTranslation();

  const difficulties = [
    {
      level: 1,
      name: t('easy'),
      description: t('basicGovernance'),
      color: 'bg-green-100 text-green-800 border-green-300',
      examples: t('exampleEnvironmental')
    },
    {
      level: 2,
      name: t('medium'),
      description: t('complexDilemmas'),
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      examples: t('exampleEconomicSocial')
    },
    {
      level: 3,
      name: t('hard'),
      description: t('urgentCrises'),
      color: 'bg-red-100 text-red-800 border-red-300',
      examples: t('exampleForeignPolicy')
    }
  ];

  const getImpactIcon = (impact: number) => {
    if (impact > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (impact < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Target className="w-4 h-4 text-gray-600" />;
  };

  const getImpactColor = (impact: number) => {
    if (impact > 2) return "text-green-700 bg-green-50 border-green-200";
    if (impact > 0) return "text-green-600 bg-green-50 border-green-200";
    if (impact < -2) return "text-red-700 bg-red-50 border-red-200";
    if (impact < 0) return "text-red-600 bg-red-50 border-red-200";
    return "text-gray-600 bg-gray-50 border-gray-200";
  };

  const getOverallRating = (political: number, economic: number, social: number): { rating: string; color: string } => {
    const total = political + Math.abs(economic) + Math.abs(social);
    const avgImpact = (Math.abs(economic) + Math.abs(social)) / 2;
    
    if (political <= 3 && avgImpact >= 2) {
      return { 
        rating: t('excellentDecision'), 
        color: 'text-green-700' 
      };
    } else if (political <= 5 && avgImpact >= 1) {
      return { 
        rating: t('goodDecision'), 
        color: 'text-blue-700' 
      };
    } else if (political <= 7) {
      return { 
        rating: t('fairDecision'), 
        color: 'text-yellow-700' 
      };
    } else {
      return { 
        rating: t('difficultDecision'), 
        color: 'text-red-700' 
      };
    }
  };

  const handleScenarioComplete = (scenarioResult: ScenarioResult) => {
    setResult(scenarioResult);
  };

  const handleStartScenario = () => {
    if (selectedDifficulty) {
      setIsStarted(true);
    }
  };

  const handleTryAgain = () => {
    setIsStarted(false);
    setResult(null);
    setSelectedDifficulty(null);
  };

  if (result) {
    const { rating, color } = getOverallRating(
      result.impacts.political,
      result.impacts.economic,
      result.impacts.social
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Crown className="w-16 h-16 text-purple-600" />
              </div>
              <CardTitle className="text-2xl text-center">
                {t('decisionResults')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Scenario Info */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">
                  {t('language') === 'el' ? result.scenario.title : (result.scenario.titleEn || result.scenario.title)}
                </h3>
                <Badge className="mb-2">{result.scenario.category}</Badge>
                <p className="text-sm text-purple-700">
                  {t('decisionTime')} {result.decisionTime} {t('secondsUnit')}
                </p>
              </div>

              {/* Chosen Option */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  {t('yourDecision')}
                </h4>
                <p className="text-blue-800">
                  {t('language') === 'el' ? result.chosenOption.optionText : (result.chosenOption.optionTextEn || result.chosenOption.optionText)}
                </p>
              </div>

              {/* Impact Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`border ${getImpactColor(result.impacts.political)}`}>
                  <CardContent className="p-4 text-center">
                    <Crown className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-lg font-bold">{result.impacts.political}/10</div>
                    <div className="text-sm">{t('political')}</div>
                  </CardContent>
                </Card>

                <Card className={`border ${getImpactColor(result.impacts.economic)}`}>
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2">
                      {getImpactIcon(result.impacts.economic)}
                    </div>
                    <div className="text-lg font-bold">
                      {result.impacts.economic > 0 ? '+' : ''}{result.impacts.economic}
                    </div>
                    <div className="text-sm">{t('economic')}</div>
                  </CardContent>
                </Card>

                <Card className={`border ${getImpactColor(result.impacts.social)}`}>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-lg font-bold">
                      {result.impacts.social > 0 ? '+' : ''}{result.impacts.social}
                    </div>
                    <div className="text-sm">{t('social')}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Overall Rating */}
              <div className="text-center">
                <Badge className={`text-lg px-4 py-2 ${color}`}>
                  {rating}
                </Badge>
              </div>

              {/* Consequences */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  {t('consequencesLabel')}
                </h4>
                <p className="text-gray-700">{result.consequences}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 justify-center">
                <Button onClick={handleTryAgain} variant="outline" className="flex items-center space-x-2">
                  <Crown className="w-4 h-4" />
                  <span>{t('newScenario')}</span>
                </Button>
                <Link href="/">
                  <Button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700">
                    <Home className="w-4 h-4" />
                    <span>{t('backToHome')}</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="pt-8">
          <PrimeMinisterScenario
            sessionId={sessionId}
            difficulty={selectedDifficulty!}
            onComplete={handleScenarioComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Crown className="w-16 h-16 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('primeMinisterForADay')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('takeOnDecisions')}
          </p>
        </div>

        {/* Difficulty Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>
                {t('selectDifficultyLevel')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {difficulties.map((difficulty) => (
                <Card
                  key={difficulty.level}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedDifficulty === difficulty.level
                      ? 'ring-2 ring-purple-500 bg-purple-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDifficulty(difficulty.level)}
                >
                  <CardContent className="p-4">
                    <Badge className={`mb-3 ${difficulty.color}`}>
                      {difficulty.name}
                    </Badge>
                    <h3 className="font-medium mb-2">{difficulty.description}</h3>
                    <p className="text-sm text-gray-600">{difficulty.examples}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Information Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Crown className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {t('political')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('politicalCostDescription')}
                </p>
              </div>
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {t('economic')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('economicImpactDescription')}
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {t('social')}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('socialImpactDescription')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleStartScenario}
            disabled={!selectedDifficulty}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
          >
            {t('startScenario')}
          </Button>
          
          <div>
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>{t('backToHome')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}