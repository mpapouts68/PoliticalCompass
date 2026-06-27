import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Compass, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface IdeologyStats {
  totalTests: number;
  ideologyStats: Array<{
    label: string;
    percentage: number;
    count: number;
  }>;
}

const labelColors: Record<string, string> = {
  "Far Left": "bg-red-600",
  "Left": "bg-red-400", 
  "Center-Left": "bg-orange-400",
  "Center": "bg-yellow-400",
  "Center-Right": "bg-blue-400",
  "Right": "bg-blue-600",
  "Far Right": "bg-purple-600"
};

function getLocalizedLabel(label: string, language: string): string {
  const translations: Record<string, string> = {
    "Far Left": language === 'el' ? "Ακροαριστερά" : "Far Left",
    "Left": language === 'el' ? "Αριστερά" : "Left", 
    "Center-Left": language === 'el' ? "Κεντροαριστερά" : "Center-Left",
    "Center": language === 'el' ? "Κέντρο" : "Center",
    "Center-Right": language === 'el' ? "Κεντροδεξιά" : "Center-Right",  
    "Right": language === 'el' ? "Δεξιά" : "Right",
    "Far Right": language === 'el' ? "Ακροδεξιά" : "Far Right"
  };
  return translations[label] || label;
}

export function IdeologyMiniResults() {
  const { data: stats, isLoading, isError } = useQuery<IdeologyStats>({
    queryKey: ["/api/ideology-stats"],
  });
  const { t, language } = useTranslation();

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
        <CardContent className="p-6 text-center text-sm text-gray-600">
          {t('loadingResults')}
        </CardContent>
      </Card>
    );
  }

  if (isError || !stats) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
        <CardContent className="p-6 text-center text-sm text-red-600">
          {t('errorLoadingResults')}
        </CardContent>
      </Card>
    );
  }

  const ideologies = stats.ideologyStats ?? [];

  if (stats.totalTests === 0 || ideologies.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              {t('ideologyResults')}
            </h3>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {t('noResultsYet')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {t('ideologyResults')}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{stats.totalTests.toLocaleString()} {t('tests')}</span>
          <TrendingUp className="w-4 h-4 ml-2" />
          <span>{t('updatingLive')}</span>
        </div>

        <div className="space-y-3">
          {ideologies.map((ideology, index) => (
            <div key={ideology.label} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full">
                {index + 1}
              </div>
              <div className={`w-4 h-4 rounded-full ${labelColors[ideology.label] || 'bg-gray-400'}`} />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {getLocalizedLabel(ideology.label, language)}
                  </span>
                  <span className="text-sm font-bold text-purple-600">{ideology.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${ideology.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {t('ideologyResultsBasedOn')} {stats.totalTests.toLocaleString()} {t('completedIdeologyTests')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}