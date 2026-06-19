import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, TrendingUp, TrendingDown, Users, DollarSign, AlertTriangle, Home, Target } from "lucide-react";
import { PrimeMinisterScenario } from "@/components/pm/PrimeMinisterScenario";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";
import {
  CAMPAIGN_ROUNDS,
  CAMPAIGN_STARTING_CAPITAL,
  getCampaignOutcome,
} from "@/lib/pmCampaign";

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
  capitalChange?: number;
  capitalAfter?: number;
}

export function PrimeMinisterPage() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [gameMode, setGameMode] = useState<"campaign" | "challenge" | "single">("campaign");
  const [isStarted, setIsStarted] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [challengeRound, setChallengeRound] = useState(1);
  const [challengeResults, setChallengeResults] = useState<ScenarioResult[]>([]);
  const [campaignRound, setCampaignRound] = useState(1);
  const [politicalCapital, setPoliticalCapital] = useState(CAMPAIGN_STARTING_CAPITAL);
  const [campaignResults, setCampaignResults] = useState<ScenarioResult[]>([]);
  const [playedScenarioIds, setPlayedScenarioIds] = useState<number[]>([]);
  const [campaignEnded, setCampaignEnded] = useState(false);
  const [scenarioKey, setScenarioKey] = useState(0);
  const { t, translateCategory, language } = useTranslation();

  const CHALLENGE_ROUNDS = 3;

  const { data: pmStats } = useQuery<{ scenarioCount: number }>({
    queryKey: ["/api/pm/stats"],
    queryFn: async () => {
      const response = await fetch("/api/pm/stats");
      return response.json();
    },
  });

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
    if (gameMode === "campaign") {
      const change = scenarioResult.capitalChange ?? 0;
      const nextCapital = Math.max(0, politicalCapital + change);
      const nextResults = [...campaignResults, scenarioResult];

      setCampaignResults(nextResults);
      setPoliticalCapital(nextCapital);
      setPlayedScenarioIds((prev) => [...prev, scenarioResult.scenario.id]);

      const collapsed = nextCapital <= 0;
      const finished = campaignRound >= CAMPAIGN_ROUNDS;

      if (collapsed || finished) {
        setCampaignEnded(true);
        setIsStarted(false);
        return;
      }

      setCampaignRound((prev) => prev + 1);
      setScenarioKey((prev) => prev + 1);
      return;
    }

    if (gameMode === "challenge") {
      const nextResults = [...challengeResults, scenarioResult];
      setChallengeResults(nextResults);

      if (challengeRound < CHALLENGE_ROUNDS) {
        setChallengeRound((prev) => prev + 1);
        setScenarioKey((prev) => prev + 1);
      } else {
        setIsStarted(false);
      }
      return;
    }

    setResult(scenarioResult);
    setIsStarted(false);
  };

  const handleStartScenario = () => {
    if (selectedDifficulty) {
      setChallengeRound(1);
      setChallengeResults([]);
      setCampaignRound(1);
      setPoliticalCapital(CAMPAIGN_STARTING_CAPITAL);
      setCampaignResults([]);
      setPlayedScenarioIds([]);
      setCampaignEnded(false);
      setScenarioKey(0);
      setIsStarted(true);
    }
  };

  const handleTryAgain = () => {
    setIsStarted(false);
    setResult(null);
    setSelectedDifficulty(null);
    setChallengeRound(1);
    setChallengeResults([]);
    setCampaignRound(1);
    setPoliticalCapital(CAMPAIGN_STARTING_CAPITAL);
    setCampaignResults([]);
    setPlayedScenarioIds([]);
    setCampaignEnded(false);
    setScenarioKey(0);
  };

  if (gameMode === "campaign" && campaignEnded && !isStarted) {
    const finalCapital = politicalCapital;
    const { labelKey } = getCampaignOutcome(finalCapital, campaignRound);
    const collapsed = finalCapital <= 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto pt-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Crown className={`w-16 h-16 ${collapsed ? "text-red-600" : "text-purple-600"}`} />
              </div>
              <CardTitle className="text-center text-2xl">
                {collapsed ? t("pmCampaignCollapsed") : t("pmCampaignComplete")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{t("pmPoliticalCapital")}</p>
                <p className={`text-4xl font-bold ${collapsed ? "text-red-700" : "text-purple-700"}`}>
                  {finalCapital}/100
                </p>
                {!collapsed && labelKey && (
                  <Badge className="mt-3 text-lg px-4 py-2">{t(labelKey)}</Badge>
                )}
                {collapsed && (
                  <p className="text-red-700 mt-3">{t("pmCampaignCollapsedDetail")}</p>
                )}
              </div>
              {campaignResults.map((r, index) => (
                <div key={index} className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-medium text-purple-900">
                    {index + 1}. {t("language") === "el" ? r.scenario.title : (r.scenario.titleEn || r.scenario.title)}
                  </p>
                  <p className="text-sm text-purple-700 mt-1">
                    {t("language") === "el" ? r.chosenOption.optionText : (r.chosenOption.optionTextEn || r.chosenOption.optionText)}
                  </p>
                  {r.capitalChange !== undefined && (
                    <p className={`text-xs font-medium mt-2 ${r.capitalChange >= 0 ? "text-green-700" : "text-red-700"}`}>
                      {t("pmCapitalChange")}: {r.capitalChange >= 0 ? "+" : ""}{r.capitalChange} → {r.capitalAfter}/100
                    </p>
                  )}
                </div>
              ))}
              <div className="flex justify-center gap-4">
                <Button onClick={handleTryAgain} variant="outline">
                  {t("tryAgain")}
                </Button>
                <Link href="/">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    {t("backToHome")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (gameMode === "challenge" && challengeResults.length >= CHALLENGE_ROUNDS && !isStarted) {
    const avgPolitical = Math.round(
      challengeResults.reduce((sum, r) => sum + r.impacts.political, 0) / challengeResults.length,
    );
    const avgEconomic = Math.round(
      challengeResults.reduce((sum, r) => sum + r.impacts.economic, 0) / challengeResults.length,
    );
    const avgSocial = Math.round(
      challengeResults.reduce((sum, r) => sum + r.impacts.social, 0) / challengeResults.length,
    );
    const { rating, color } = getOverallRating(avgPolitical, avgEconomic, avgSocial);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto pt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">{t('pmChallengeComplete')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge className={`text-lg px-4 py-2 ${color}`}>{rating}</Badge>
                <p className="text-sm text-gray-600 mt-2">
                  {CHALLENGE_ROUNDS} {t('pmRound').toLowerCase()}s · {t('political')}: {avgPolitical}/10
                </p>
              </div>
              {challengeResults.map((r, index) => (
                <div key={index} className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-medium text-purple-900">
                    {index + 1}. {language === 'el' ? r.scenario.title : (r.scenario.titleEn || r.scenario.title)}
                  </p>
                  <p className="text-sm text-purple-700 mt-1">
                    {language === 'el' ? r.chosenOption.optionText : (r.chosenOption.optionTextEn || r.chosenOption.optionText)}
                  </p>
                </div>
              ))}
              <div className="flex justify-center gap-4">
                <Button onClick={handleTryAgain} variant="outline">
                  {t('newScenario')}
                </Button>
                <Link href="/">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    {t('backToHome')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (result && gameMode === "single") {
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
                  {language === 'el' ? result.scenario.title : (result.scenario.titleEn || result.scenario.title)}
                </h3>
                <Badge className="mb-2">{translateCategory(result.scenario.category)}</Badge>
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
                  {language === 'el' ? result.chosenOption.optionText : (result.chosenOption.optionTextEn || result.chosenOption.optionText)}
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
          {gameMode === "challenge" && (
            <p className="text-center text-purple-800 font-medium mb-4">
              {t('pmRound')} {challengeRound} / {CHALLENGE_ROUNDS}
            </p>
          )}
          <PrimeMinisterScenario
            key={scenarioKey}
            sessionId={sessionId}
            difficulty={selectedDifficulty!}
            excludeScenarioIds={gameMode === "campaign" ? playedScenarioIds : []}
            politicalCapital={gameMode === "campaign" ? politicalCapital : undefined}
            campaignRound={gameMode === "campaign" ? campaignRound : undefined}
            campaignTotalRounds={gameMode === "campaign" ? CAMPAIGN_ROUNDS : undefined}
            showCapitalPreview={gameMode === "campaign"}
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
          {pmStats?.scenarioCount ? (
            <p className="text-purple-700 font-semibold mt-2">
              {pmStats.scenarioCount}+ {t('pmScenarioCount')}
            </p>
          ) : null}
        </div>

        {/* Game mode */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t('newFeatures')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                className={`cursor-pointer ${gameMode === "campaign" ? "ring-2 ring-purple-500 bg-purple-50" : ""}`}
                onClick={() => setGameMode("campaign")}
              >
                <CardContent className="p-4">
                  <h3 className="font-bold text-purple-900">{t("pmCampaignMode")}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t("pmCampaignDescription")}</p>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer ${gameMode === "challenge" ? "ring-2 ring-purple-500 bg-purple-50" : ""}`}
                onClick={() => setGameMode("challenge")}
              >
                <CardContent className="p-4">
                  <h3 className="font-bold text-purple-900">{t('pmChallengeMode')}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t('pmChallengeDescription')}</p>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer ${gameMode === "single" ? "ring-2 ring-purple-500 bg-purple-50" : ""}`}
                onClick={() => setGameMode("single")}
              >
                <CardContent className="p-4">
                  <h3 className="font-bold text-purple-900">{t('pmSingleMode')}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t('takeOnDecisions')}</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

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