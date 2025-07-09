import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, RotateCcw, Share, TrendingUp, Users, Globe, Leaf } from "lucide-react";
import type { Party, SurveyResult } from "@shared/schema";

interface ResultsScreenProps {
  sessionId: string;
  onRestart: () => void;
}

interface ResultsResponse {
  result: SurveyResult;
  parties: Party[];
}

export function ResultsScreen({ sessionId, onRestart }: ResultsScreenProps) {
  const { data, isLoading, error } = useQuery<ResultsResponse>({
    queryKey: ["/api/results", sessionId],
  });

  if (isLoading) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-8 text-center">
          <div className="text-lg text-neutral-600">Υπολογισμός αποτελεσμάτων...</div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="bg-white shadow-md">
        <CardContent className="p-8 text-center">
          <div className="text-lg text-red-600">Σφάλμα φόρτωσης αποτελεσμάτων</div>
        </CardContent>
      </Card>
    );
  }

  const { result, parties } = data;
  const alignments = result.partyAlignments as Record<string, number>;

  // Sort parties by alignment percentage
  const sortedParties = parties
    .map(party => ({
      ...party,
      alignment: alignments[party.shortName] || 0
    }))
    .sort((a, b) => b.alignment - a.alignment);

  const topParty = sortedParties[0];

  // Mock issue analysis data
  const issueAnalysis = [
    {
      name: "Οικονομία",
      icon: TrendingUp,
      approach: "Φιλελεύθερη προσέγγιση",
      percentage: 85,
      color: "bg-green-600"
    },
    {
      name: "Κοινωνικά Θέματα",
      icon: Users,
      approach: "Συντηρητική προσέγγιση",
      percentage: 72,
      color: "bg-blue-600"
    },
    {
      name: "Εξωτερική Πολιτική",
      icon: Globe,
      approach: "Ευρω-ατλαντική προσέγγιση",
      percentage: 80,
      color: "bg-primary"
    },
    {
      name: "Περιβάλλον",
      icon: Leaf,
      approach: "Μέτρια προτεραιότητα",
      percentage: 65,
      color: "bg-yellow-600"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <BarChart3 className="text-primary text-6xl mb-4 mx-auto w-16 h-16" />
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">Τα Αποτελέσματά σας</h2>
        <p className="text-lg text-neutral-500">
          Βάσει των απαντήσεών σας, ανατρέξαμε στα προγράμματα των κομμάτων
        </p>
      </div>

      {/* Main Result */}
      <Card className="bg-white shadow-md mb-8 border-l-4 border-primary">
        <CardContent className="p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-2">
              Είστε ψηφοφόρος {topParty.name}
            </h3>
            <p className="text-neutral-600 mb-4">
              Οι απόψεις σας ταιριάζουν κατά {topParty.alignment}% με το πρόγραμμα του κόμματος
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-500">
              <span>{topParty.ideology}</span>
              <span>•</span>
              <span>{topParty.description.split('.')[0]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Party Results */}
      <Card className="bg-white shadow-md mb-8">
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-6">Αναλυτικά Αποτελέσματα</h3>
          
          <div className="space-y-4">
            {sortedParties.map((party) => (
              <Card key={party.id} className="border border-neutral-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: party.color }}
                      />
                      <span className="font-medium text-neutral-900">{party.name}</span>
                    </div>
                    <span className="font-semibold text-primary">{party.alignment}%</span>
                  </div>
                  <Progress value={party.alignment} className="mb-2" />
                  <p className="text-sm text-neutral-500">{party.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Issues Analysis */}
      <Card className="bg-white shadow-md mb-8">
        <CardContent className="p-8">
          <h3 className="text-xl font-semibold text-neutral-900 mb-6">Ανάλυση ανά Θέμα</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {issueAnalysis.map((issue) => {
              const Icon = issue.icon;
              return (
                <div key={issue.name} className="issue-analysis">
                  <h4 className="font-medium text-neutral-900 mb-3 flex items-center">
                    <Icon className="text-secondary mr-2 w-5 h-5" />
                    {issue.name}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{issue.approach}</span>
                      <span className="font-medium text-green-600">{issue.percentage}%</span>
                    </div>
                    <Progress value={issue.percentage} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="outline" onClick={onRestart}>
          <RotateCcw className="mr-2 w-4 h-4" />
          Νέο Τεστ
        </Button>
        
        <Button variant="secondary">
          <Share className="mr-2 w-4 h-4" />
          Μοιραστείτε το
        </Button>
      </div>
    </div>
  );
}
