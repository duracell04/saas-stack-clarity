import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface HeroCardProps {
  loading?: boolean;
}

export const HeroCard = ({ loading = false }: HeroCardProps) => {
  const [counts, setCounts] = useState({ spend: 0, waste: 0 });
  const finalSpend = 48237;
  const finalWaste = 8120;

  useEffect(() => {
    if (!loading) {
      const duration = 500;
      const steps = 30;
      const spendIncrement = finalSpend / steps;
      const wasteIncrement = finalWaste / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        if (step <= steps) {
          setCounts({
            spend: Math.floor(spendIncrement * step),
            waste: Math.floor(wasteIncrement * step),
          });
        } else {
          setCounts({ spend: finalSpend, waste: finalWaste });
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [loading]);

  return (
    <Card className="p-6 border-border bg-card shadow-lg shadow-black/30">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground">Acme SaaS GmbH</h3>
            <p className="text-sm text-muted-foreground">42 people</p>
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            Last 12 months
          </Badge>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className={cn(loading && "skeleton h-16 rounded-lg")}>
            {!loading && (
              <div className="animate-count-up">
                <p className="text-sm text-muted-foreground mb-1">Total SaaS spend</p>
                <p className="text-2xl font-bold tabular-nums">€{counts.spend.toLocaleString()}</p>
              </div>
            )}
          </div>
          <div className={cn(loading && "skeleton h-16 rounded-lg")}>
            {!loading && (
              <div className="animate-count-up">
                <p className="text-sm text-muted-foreground mb-1">Estimated waste</p>
                <p className="text-2xl font-bold tabular-nums text-destructive">€{counts.waste.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Issues */}
        <div className="space-y-2">
          {loading ? (
            <>
              <div className="skeleton h-12 rounded-lg" />
              <div className="skeleton h-12 rounded-lg" />
              <div className="skeleton h-12 rounded-lg" />
            </>
          ) : (
            <>
              <IssueRow
                tool="Figma"
                issue="Overprovisioned seats"
                cost="€2,400/year"
                type="warning"
              />
              <IssueRow
                tool="Notion + Confluence"
                issue="Duplicate tools"
                cost="€3,600/year"
                type="destructive"
              />
              <IssueRow
                tool="RandomTool.io"
                issue="Zombie subscription"
                cost="€2,120/year"
                type="destructive"
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

const IssueRow = ({
  tool,
  issue,
  cost,
  type,
}: {
  tool: string;
  issue: string;
  cost: string;
  type: 'warning' | 'destructive';
}) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-background-secondary/50 border border-border/50 hover:border-border transition-colors">
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{tool}</p>
      <p className="text-xs text-muted-foreground">{issue}</p>
    </div>
    <p className={cn("text-sm font-semibold tabular-nums", type === 'destructive' ? 'text-destructive' : 'text-warning')}>
      {cost}
    </p>
  </div>
);
