import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users } from 'lucide-react';
import { PartyLogo } from '@/components/party-logos';
import { useTranslation } from '@/lib/i18n';

interface ElectionStats {
  totalVotes: number;
  partyStats: Array<{
    party: string;
    percentage: number;
    count: number;
  }>;
}

export function MiniResultsGraph() {
  const { data: stats, isLoading } = useQuery<ElectionStats>({
    queryKey: ["/api/election-stats"],
  });
  const { t } = useTranslation();

  if (isLoading || !stats || stats.totalVotes === 0) {
    return null; // Don't show if no data yet
  }

  // Take top 5 parties
  const topParties = stats.partyStats.slice(0, 5);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-800">
            {t('language') === 'el' ? 'Αποτελέσματα σε πραγματικό χρόνο' : 'Live Results'}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{stats.totalVotes.toLocaleString()} {t('language') === 'el' ? 'συμμετοχές' : 'participants'}</span>
          <TrendingUp className="w-4 h-4 ml-2" />
          <span>{t('language') === 'el' ? 'Ενημερώνεται ζωντανά' : 'Updating live'}</span>
        </div>

        <div className="space-y-3">
          {topParties.map((party, index) => (
            <div key={party.party} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-bold rounded-full">
                {index + 1}
              </div>
              <PartyLogo party={party.party} className="w-6 h-6" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{party.party}</span>
                  <span className="text-sm font-bold text-primary">{party.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${party.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {t('language') === 'el' 
              ? `Τα αποτελέσματα βασίζονται σε ${stats.totalVotes.toLocaleString()} ολοκληρωμένα τεστ`
              : `Results based on ${stats.totalVotes.toLocaleString()} completed tests`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}