export const CAMPAIGN_STARTING_CAPITAL = 100;
export const CAMPAIGN_ROUNDS = 5;

export interface CapitalImpacts {
  politicalCost: number;
  economicImpact: number;
  socialImpact: number;
}

/** Net political capital change from a decision (-40 to +20 typical range). */
export function calculateCapitalChange(impacts: CapitalImpacts): number {
  const politicalDrain = impacts.politicalCost * 4;
  const publicSupport = (impacts.economicImpact + impacts.socialImpact) * 2;
  return Math.round(publicSupport - politicalDrain);
}

export function previewCapitalAfter(current: number, impacts: CapitalImpacts): number {
  return Math.max(0, Math.min(100, current + calculateCapitalChange(impacts)));
}

export type CampaignOutcome = "victory" | "collapsed" | "in_progress";

export function getCampaignOutcome(
  capital: number,
  round: number,
): { status: CampaignOutcome; labelKey: string } {
  if (capital <= 0) {
    return { status: "collapsed", labelKey: "pmCampaignCollapsed" };
  }
  if (round >= CAMPAIGN_ROUNDS) {
    if (capital >= 80) return { status: "victory", labelKey: "pmCampaignVictoryStrong" };
    if (capital >= 50) return { status: "victory", labelKey: "pmCampaignVictoryStable" };
    if (capital >= 25) return { status: "victory", labelKey: "pmCampaignVictoryWeak" };
    return { status: "victory", labelKey: "pmCampaignVictoryBarely" };
  }
  return { status: "in_progress", labelKey: "" };
}

export function capitalBarColor(capital: number): string {
  if (capital >= 70) return "bg-green-500";
  if (capital >= 40) return "bg-yellow-500";
  return "bg-red-500";
}
