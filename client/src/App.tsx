import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Survey from "@/pages/survey";
import ElectionDashboard from "@/pages/election-dashboard";
import IdeologyTest from "@/pages/IdeologyTest";
import { KnowledgeChallengePage } from "@/pages/knowledge-challenge";
import { PrimeMinisterPage } from "@/pages/prime-minister";

function IdeologyTestWrapper() {
  const searchParams = new URLSearchParams(window.location.search);
  const count = parseInt(searchParams.get('count') || '30');
  return <IdeologyTest questionCount={count} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Survey} />
      <Route path="/αποτελεσματα" component={ElectionDashboard} />
      <Route path="/ideology" component={IdeologyTestWrapper} />
      <Route path="/ιδεολογια" component={IdeologyTestWrapper} />
      <Route path="/quiz" component={KnowledgeChallengePage} />
      <Route path="/κουιζ" component={KnowledgeChallengePage} />
      <Route path="/prime-minister" component={PrimeMinisterPage} />
      <Route path="/πρωθυπουργος" component={PrimeMinisterPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
