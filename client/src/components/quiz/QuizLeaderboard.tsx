import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface LeaderboardEntry {
  rank: number;
  nickname: string | null;
  score: number;
  totalQuestions: number;
  accuracy: number;
  difficulty: number;
  durationSeconds: number | null;
  createdAt: string | null;
}

interface QuizLeaderboardProps {
  difficulty?: number;
  limit?: number;
}

export function QuizLeaderboard({ difficulty, limit = 10 }: QuizLeaderboardProps) {
  const { t } = useTranslation();

  const { data: entries = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/quiz/leaderboard", difficulty, limit],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: String(limit) });
      if (difficulty) params.set("difficulty", String(difficulty));
      const res = await fetch(`/api/quiz/leaderboard?${params}`);
      return res.json();
    },
  });

  const displayName = (nickname: string | null) => nickname || t("anonymousPlayer");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {t("quizLeaderboard")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-gray-500">{t("loading")}</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-gray-500">{t("leaderboardEmpty")}</p>
        ) : (
          <div className="space-y-2">
            {entries.map((entry) => (
              <div
                key={`${entry.rank}-${entry.score}-${entry.createdAt}`}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-gray-50 text-sm"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-bold text-blue-600 w-6 shrink-0">#{entry.rank}</span>
                  <span className="truncate font-medium">{displayName(entry.nickname)}</span>
                </div>
                <div className="text-right shrink-0 text-gray-700">
                  <span className="font-semibold">{entry.score}/{entry.totalQuestions}</span>
                  <span className="text-gray-500 ml-2">({entry.accuracy}%)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
