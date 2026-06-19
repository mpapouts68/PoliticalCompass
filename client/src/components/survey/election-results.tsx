import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PartyLogo } from "@/components/party-logos";
import { TrendingUp, Users, BarChart3 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface ElectionStats {
  totalVotes: number;
  partyStats: Array<{
    party: string;
    percentage: number;
    count: number;
  }>;
}

export function ElectionResults() {
  const { data: stats, isLoading } = useQuery<ElectionStats>({
    queryKey: ["/api/election-stats"],
  });
  const { t, language } = useTranslation();

  if (isLoading) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-8 text-center">
          <div className="text-lg text-neutral-600">
            {language === 'el' ? 'Φόρτωση στατιστικών...' : 'Loading statistics...'}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats || stats.totalVotes === 0) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-8 text-center">
          <div className="text-lg text-neutral-600">
            {language === 'el' ? 'Δεν υπάρχουν ακόμα αποτελέσματα' : 'No results yet'}
          </div>
          <p className="text-sm text-neutral-500 mt-2">
            {language === 'el' ? 'Γίνε ο πρώτος που θα πάρει το τεστ!' : 'Be the first to take the test!'}
          </p>
        </CardContent>
      </Card>
    );
  }

  const partyNames: Record<string, string> = {
    "ΝΔ": "Νέα Δημοκρατία",
    "ΣΥΡΙΖΑ": "ΣΥΡΙΖΑ-ΠΣ",
    "ΠΑΣΟΚ": "ΠΑΣΟΚ-ΚΙΝΑΛ",
    "ΚΚΕ": "ΚΚΕ",
    "ΕΛ": "Ελληνική Λύση",
    "ΠΕ": "Πλεύση Ελευθερίας",
    "ΝΙΚΗ": "Νίκη",
    "ΣΠΑΡ": "Σπαρτιάτες",
    "ΝΑ": "Νέα Αριστερά",
    "ΕΛΑΣ": "Ελληνική Αριστερή Συμπαράταξη",
    "ΕΛΠ": "Ελπίδα για τη Δημοκρατία",
    "ΦΛ": "Φωνή Λογικής"
  };

  return (
    <div className="space-y-6">
      {/* Election Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <CardContent className="p-8">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">
              {language === 'el' ? 'Αποτελέσματα Πολιτικού Τεστ' : 'Political Test Results'}
            </h2>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {stats.totalVotes.toLocaleString()} {language === 'el' ? 'συμμετοχές' : 'participants'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">{language === 'el' ? 'Ζωντανά αποτελέσματα' : 'Live results'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Party Results */}
      <Card className="bg-white shadow-md">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Κατανομή Προτιμήσεων
          </h3>
          
          <div className="space-y-4">
            {stats.partyStats.map((party, index) => (
              <Card key={party.party} className={`border-2 ${
                index === 0 ? 'border-yellow-400 bg-yellow-50' : 
                index === 1 ? 'border-gray-300 bg-gray-50' : 
                index === 2 ? 'border-orange-300 bg-orange-50' : 
                'border-neutral-200'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-500' : 
                        index === 2 ? 'bg-orange-500' : 
                        'bg-neutral-400'
                      }`}>
                        {index + 1}
                      </div>
                      <PartyLogo party={party.party} className="w-10 h-10" />
                      <div>
                        <h4 className="font-bold text-lg text-neutral-900">
                          {partyNames[party.party] || party.party}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {party.count.toLocaleString()} {party.count === 1 ? 'ψήφος' : 'ψήφοι'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-neutral-900">
                        {party.percentage}%
                      </div>
                      {index === 0 && (
                        <div className="text-sm font-semibold text-yellow-600">
                          ΠΡΩΤΟΣ
                        </div>
                      )}
                    </div>
                  </div>
                  <Progress 
                    value={party.percentage} 
                    className={`h-4 ${
                      index === 0 ? 'bg-yellow-100' : 
                      index === 1 ? 'bg-gray-100' : 
                      index === 2 ? 'bg-orange-100' : 
                      'bg-neutral-100'
                    }`}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
            <h4 className="font-semibold text-neutral-900 mb-4">Στατιστικά Συμμετοχής</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.totalVotes}</div>
                <div className="text-sm text-neutral-600">Συνολικές Συμμετοχές</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.partyStats.length}</div>
                <div className="text-sm text-neutral-600">Κόμματα</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.partyStats[0]?.percentage || 0}%
                </div>
                <div className="text-sm text-neutral-600">Υψηλότερο Ποσοστό</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}