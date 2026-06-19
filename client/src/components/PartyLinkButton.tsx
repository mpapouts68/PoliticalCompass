import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PartyLogo } from "@/components/party-logos";
import { getPartyWebsite } from "@/data/partyWebsites";
import { useTranslation } from "@/lib/i18n";

interface PartyLinkButtonProps {
  shortName: string;
  alignment?: number;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm";
}

export function PartyLinkButton({
  shortName,
  alignment,
  variant = "outline",
  size = "sm",
}: PartyLinkButtonProps) {
  const { t } = useTranslation();
  const website = getPartyWebsite(shortName);
  if (!website) return null;

  return (
    <Button variant={variant} size={size} asChild>
      <a href={website} target="_blank" rel="noopener noreferrer" className="gap-2">
        <PartyLogo party={shortName} className="w-5 h-5" />
        <span>
          {t(`parties.${shortName}`) || shortName}
          {alignment !== undefined ? ` (${alignment}%)` : ""}
        </span>
        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
      </a>
    </Button>
  );
}

interface ExplorePartiesProps {
  /** Party shortName → alignment % */
  alignments: Record<string, number>;
  limit?: number;
}

export function ExploreParties({ alignments, limit = 3 }: ExplorePartiesProps) {
  const { t } = useTranslation();

  const topParties = Object.entries(alignments)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .filter(([, score]) => score > 0);

  if (topParties.length === 0) return null;

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-600">{t("explorePartyWebsites")}</p>
      <div className="flex flex-wrap gap-2">
        {topParties.map(([shortName, score]) => (
          <PartyLinkButton key={shortName} shortName={shortName} alignment={score} />
        ))}
      </div>
      <p className="text-xs text-gray-500">{t("partyLinkDisclaimer")}</p>
    </div>
  );
}
