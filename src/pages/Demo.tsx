import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getReportForScenario, toolboxes, type Issue } from "@/lib/mockData";
import { toast } from "sonner";

const Demo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialScenario = searchParams.get('scenario') || 'saas';
  
  const [scenario, setScenario] = useState(initialScenario);
  const [loading, setLoading] = useState(false);
  const [appliedFixes, setAppliedFixes] = useState<Set<string>>(new Set());
  
  const report = getReportForScenario(scenario);

  const handleScenarioChange = (newScenario: string) => {
    setScenario(newScenario);
    setSearchParams({ scenario: newScenario });
    setAppliedFixes(new Set());
  };

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Mock report generated");
    }, 800);
  };

  const toggleFix = (issueId: string) => {
    setAppliedFixes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(issueId)) {
        newSet.delete(issueId);
      } else {
        newSet.add(issueId);
      }
      return newSet;
    });
  };

  const calculateSavings = () => {
    let totalSaving = 0;
    report.issues.forEach(issue => {
      if (appliedFixes.has(issue.id)) {
        totalSaving += issue.potentialSaving;
      }
    });
    return totalSaving;
  };

  const remainingWaste = report.estimatedWaste - calculateSavings();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 space-y-8">
        {/* Scenario Selector */}
        <Card className="p-6 border-border bg-card">
          <h2 className="font-bold mb-4">Configure your mock company</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Scenario</label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={scenario === 'saas' ? 'default' : 'outline'}
                  onClick={() => handleScenarioChange('saas')}
                  className={scenario === 'saas' ? 'bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground' : ''}
                >
                  SaaS team
                </Button>
                <Button
                  variant={scenario === 'agency' ? 'default' : 'outline'}
                  onClick={() => handleScenarioChange('agency')}
                  className={scenario === 'agency' ? 'bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground' : ''}
                >
                  Agency
                </Button>
                <Button
                  variant={scenario === 'student' ? 'default' : 'outline'}
                  onClick={() => handleScenarioChange('student')}
                  className={scenario === 'student' ? 'bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground' : ''}
                >
                  Student
                </Button>
              </div>
            </div>
            <Button onClick={handleGenerateReport} disabled={loading}>
              {loading ? 'Generating...' : 'Generate report'}
            </Button>
            <p className="text-xs text-muted-foreground">
              In this demo, we use mock data from a {report.headcount}-person {scenario === 'saas' ? 'B2B SaaS company' : scenario === 'agency' ? 'digital agency' : 'student project'}.
            </p>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <SummaryCard
            label="Total SaaS spend"
            value={`€${report.totalSpend.toLocaleString()}`}
            sublabel="/ year"
          />
          <SummaryCard
            label="Estimated waste"
            value={`€${remainingWaste.toLocaleString()}`}
            sublabel="/ year"
            highlight
          />
          <SummaryCard
            label="Tools detected"
            value={report.toolsCount.toString()}
            sublabel={`across ${report.categoriesCount} categories`}
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="toolboxes">Toolboxes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top Issues */}
            <div>
              <h3 className="text-xl font-bold mb-4">Top issues</h3>
              <div className="grid gap-4">
                {report.issues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    isFixed={appliedFixes.has(issue.id)}
                    onToggle={() => toggleFix(issue.id)}
                  />
                ))}
              </div>
            </div>

            {/* Savings Simulation */}
            {appliedFixes.size > 0 && (
              <Card className="p-6 border-success/50 bg-success/5">
                <h4 className="font-semibold mb-2 text-success">Potential savings</h4>
                <p className="text-sm text-muted-foreground">
                  If you apply all selected fixes, your estimated waste drops from{" "}
                  <span className="font-semibold text-foreground">€{report.estimatedWaste.toLocaleString()}/year</span> to{" "}
                  <span className="font-semibold text-foreground">€{remainingWaste.toLocaleString()}/year</span>
                  {" "}— saving{" "}
                  <span className="font-semibold text-success">€{calculateSavings().toLocaleString()}/year</span>.
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">All tools in stack</h3>
              <div className="space-y-2">
                {report.tools.map((tool) => (
                  <Card key={tool.id} className="p-4 border-border bg-card hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{tool.name}</h4>
                          <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                          <StatusBadge status={tool.status} />
                        </div>
                        {tool.website && (
                          <a
                            href={`https://${tool.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            {tool.website} ↗
                          </a>
                        )}
                      </div>
                      <p className="text-lg font-semibold tabular-nums">
                        €{tool.annualSpend.toLocaleString()}
                        <span className="text-xs text-muted-foreground ml-1">/year</span>
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="toolboxes" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Suggested toolboxes</h3>
              <p className="text-sm text-muted-foreground">
                Based on your team size and current tools, these curated stacks might be a good fit.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {toolboxes.map((toolbox) => (
                  <Card key={toolbox.id} className="p-6 border-border bg-card">
                    <h4 className="text-lg font-bold mb-2">{toolbox.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{toolbox.tagline}</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Ideal for:</span> {toolbox.idealFor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Team size:</span> {toolbox.teamSize}
                      </p>
                    </div>
                    <div className="space-y-2 mb-4">
                      {toolbox.tools.map((tool, idx) => (
                        <div key={idx} className="text-sm">
                          <a
                            href={`https://${tool.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {tool.name} ↗
                          </a>
                          <p className="text-xs text-muted-foreground">
                            {tool.description} · {tool.approxCost}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => toast.info("In a real setup, this would propose a consolidation plan")}
                    >
                      Apply this toolbox
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Next Steps */}
        <Card className="p-8 border-border bg-card">
          <h3 className="text-xl font-bold mb-4">What a real Hyperlink engagement looks like</h3>
          <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">1.</span>
              You share read-only billing data (card statements or invoice inbox).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">2.</span>
              We run a full SaaS Leak Report and review it with you in 30 minutes.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">3.</span>
              If we don't find at least 10% savings or risk fixes, you don't pay.
            </li>
          </ul>
          <a href="mailto:contact@hyperlink.tools">
            <Button size="lg" className="bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground hover:opacity-90">
              Talk to us about a real audit
            </Button>
          </a>
        </Card>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground pb-8">
          This is a frontend-only demo using mock data. No real billing or personal data is processed in this version.
        </p>
      </div>
    </div>
  );
};

const SummaryCard = ({
  label,
  value,
  sublabel,
  highlight,
}: {
  label: string;
  value: string;
  sublabel: string;
  highlight?: boolean;
}) => (
  <Card className="p-6 border-border bg-card">
    <p className="text-sm text-muted-foreground mb-2">{label}</p>
    <p className={`text-3xl font-bold tabular-nums ${highlight ? 'text-destructive' : 'text-foreground'}`}>
      {value}
      <span className="text-sm text-muted-foreground ml-1">{sublabel}</span>
    </p>
  </Card>
);

const IssueCard = ({
  issue,
  isFixed,
  onToggle,
}: {
  issue: Issue;
  isFixed: boolean;
  onToggle: () => void;
}) => (
  <Card className="p-6 border-border bg-card">
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <h4 className="font-semibold">{issue.tool}</h4>
          <Badge variant="outline">{issue.category}</Badge>
          <IssueBadge type={issue.type} />
        </div>
        <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
        <p className="text-sm font-semibold text-success">
          Potential saving: €{issue.potentialSaving.toLocaleString()}/year
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-lg font-bold tabular-nums text-destructive">
          €{issue.annualCost.toLocaleString()}
          <span className="text-xs text-muted-foreground ml-1">/year</span>
        </p>
        <Button
          variant={isFixed ? "default" : "outline"}
          size="sm"
          onClick={onToggle}
          className={isFixed ? 'bg-success hover:bg-success/90' : ''}
        >
          {isFixed ? '✓ Fix applied' : 'Simulate fix'}
        </Button>
      </div>
    </div>
  </Card>
);

const IssueBadge = ({ type }: { type: Issue['type'] }) => {
  const variants = {
    zombie: { label: 'Zombie', className: 'bg-destructive/10 text-destructive' },
    duplicate: { label: 'Duplicate', className: 'bg-warning/10 text-warning' },
    overprovisioned: { label: 'Overprovisioned', className: 'bg-accent/10 text-accent' },
  };
  const variant = variants[type];
  return <Badge className={variant.className}>{variant.label}</Badge>;
};

const StatusBadge = ({ status }: { status: string }) => {
  const variants = {
    healthy: { label: 'Healthy', className: 'bg-success/10 text-success' },
    zombie: { label: 'Zombie', className: 'bg-destructive/10 text-destructive' },
    duplicate: { label: 'Duplicate', className: 'bg-warning/10 text-warning' },
    overprovisioned: { label: 'Over-provisioned', className: 'bg-accent/10 text-accent' },
  };
  const variant = variants[status as keyof typeof variants];
  return <Badge className={variant.className}>{variant.label}</Badge>;
};

export default Demo;
