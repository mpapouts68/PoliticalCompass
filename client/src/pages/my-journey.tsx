import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { History, Home, Shield, Brain, Compass, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation, useLanguage } from "@/lib/i18n";
import { useAnonymousProfile } from "@/hooks/useAnonymousProfile";
import { ExploreParties } from "@/components/PartyLinkButton";

interface HistoryData {
  profile: { id: string; nickname: string | null };
  survey: Array<{
    id: number;
    partyAlignments: Record<string, number>;
    questionCount: number;
    createdAt: string | null;
  }>;
  ideology: Array<{
    id: number;
    label: string;
    percentage: number;
    totalScore: number;
    createdAt: string | null;
  }>;
  quiz: Array<{
    id: number;
    score: number;
    totalQuestions: number;
    accuracy: number;
    difficulty: number;
    createdAt: string | null;
  }>;
}

function topParty(alignments: Record<string, number>): { party: string; score: number } {
  const sorted = Object.entries(alignments).sort((a, b) => b[1] - a[1]);
  return { party: sorted[0]?.[0] ?? "—", score: sorted[0]?.[1] ?? 0 };
}

function formatDate(date: string | null, language: string): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString(language === "el" ? "el-GR" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MyJourneyPage() {
  const { t, language } = useTranslation();
  const { profileId, profile, updateNickname } = useAnonymousProfile();
  const [nicknameInput, setNicknameInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile?.nickname !== undefined) {
      setNicknameInput(profile.nickname ?? "");
    }
  }, [profile?.nickname]);

  const { data, isLoading } = useQuery<HistoryData>({
    queryKey: ["/api/profile", profileId, "history"],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${profileId}/history`);
      if (!res.ok) throw new Error("Failed to load history");
      return res.json();
    },
  });

  const surveyChartData = (data?.survey ?? [])
    .slice()
    .reverse()
    .map((entry, index) => {
      const top = topParty(entry.partyAlignments);
      return {
        name: `#${index + 1}`,
        date: formatDate(entry.createdAt, language),
        alignment: top.score,
        party: top.party,
      };
    });

  /** Average alignment across all survey runs — for party explore links */
  const avgAlignments = (() => {
    const surveys = data?.survey ?? [];
    if (surveys.length === 0) return {};
    const sums: Record<string, number> = {};
    for (const entry of surveys) {
      for (const [party, score] of Object.entries(entry.partyAlignments)) {
        sums[party] = (sums[party] ?? 0) + score;
      }
    }
    const result: Record<string, number> = {};
    for (const [party, total] of Object.entries(sums)) {
      result[party] = Math.round(total / surveys.length);
    }
    return result;
  })();

  const handleSaveNickname = async () => {
    setSaving(true);
    try {
      await updateNickname(nicknameInput.trim() || null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        <div className="text-center">
          <History className="w-14 h-14 text-blue-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-900">{t("myJourney")}</h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">{t("myJourneyDescription")}</p>
        </div>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4 flex gap-3">
            <Shield className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">{t("anonymousPrivacyNote")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t("optionalNickname")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Input
              value={nicknameInput}
              onChange={(e) => setNicknameInput(e.target.value)}
              placeholder={t("nicknamePlaceholder")}
              maxLength={24}
              className="flex-1"
            />
            <Button onClick={handleSaveNickname} disabled={saving}>
              {saving ? t("loading") : t("saveNickname")}
            </Button>
          </CardContent>
        </Card>

        {!isLoading && Object.keys(avgAlignments).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("exploreYourMatches")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ExploreParties alignments={avgAlignments} limit={5} />
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <Card><CardContent className="p-8 text-center text-gray-500">{t("loading")}</CardContent></Card>
        ) : (
          <>
            {surveyChartData.length >= 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="w-5 h-5" />
                    {t("partyAlignmentOverTime")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={surveyChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} unit="%" />
                      <Tooltip
                        formatter={(value: number) => [`${value}%`, t("partyAlignment")]}
                        labelFormatter={(_, payload) => {
                          const item = payload?.[0]?.payload;
                          return item ? `${item.date} — ${item.party}` : "";
                        }}
                      />
                      <Line type="monotone" dataKey="alignment" stroke="#2563eb" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Compass className="w-5 h-5" />
                  {t("surveyHistory")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(data?.survey ?? []).length === 0 ? (
                  <p className="text-sm text-gray-500">{t("noHistoryYet")}</p>
                ) : (
                  data!.survey.map((entry) => {
                    const top = topParty(entry.partyAlignments);
                    return (
                      <div key={entry.id} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                        <div>
                          <p className="font-medium">{top.party} — {top.score}%</p>
                          <p className="text-xs text-gray-500">
                            {entry.questionCount} {t("questions")} · {formatDate(entry.createdAt, language)}
                          </p>
                        </div>
                        <Badge variant="outline">{t("partyAlignment")}</Badge>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Compass className="w-5 h-5" />
                  {t("ideologyHistory")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(data?.ideology ?? []).length === 0 ? (
                  <p className="text-sm text-gray-500">{t("noHistoryYet")}</p>
                ) : (
                  data!.ideology.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <p className="font-medium">{entry.label}</p>
                        <p className="text-xs text-gray-500">{formatDate(entry.createdAt, language)}</p>
                      </div>
                      <Badge>{Math.round(entry.percentage)}%</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="w-5 h-5" />
                  {t("quizHistory")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {(data?.quiz ?? []).length === 0 ? (
                  <p className="text-sm text-gray-500">{t("noHistoryYet")}</p>
                ) : (
                  data!.quiz.map((entry) => (
                    <div key={entry.id} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <p className="font-medium">{entry.score}/{entry.totalQuestions} — {Math.round(entry.accuracy)}%</p>
                        <p className="text-xs text-gray-500">{formatDate(entry.createdAt, language)}</p>
                      </div>
                      <Badge variant="secondary">{t("difficulty")} {entry.difficulty}</Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </>
        )}

        <div className="text-center pb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              {t("backToHome")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
