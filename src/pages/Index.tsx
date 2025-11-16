import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Header } from "@/components/Header";
import { HeroCard } from "@/components/HeroCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toolboxes } from "@/lib/mockData";
import { Users, Building2, GraduationCap, Search, AlertTriangle, Wand2 } from "lucide-react";

const Index = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading');
    if (hasSeenLoading) {
      setShowLoading(false);
      setHeroLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    sessionStorage.setItem('hasSeenLoading', 'true');
    
    setTimeout(() => {
      setHeroLoading(false);
    }, 300);
  };

  return (
    <>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section id="hero" className="container py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                The control panel for your{" "}
                <span className="gradient-text">SaaS stack</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hyperlink finds zombie tools, duplicate subscriptions and offboarding risks in your SaaS stack – 
                and turns "we have no idea what we pay for" into a clean, board-ready overview. 
                Hyperlink runs continuously in the background: when a new tool appears, a zombie resurfaces, 
                or a renewal is coming up, you see it before it becomes a problem.
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                In practice: a live SaaS inventory, a renewal calendar, risk & owner mapping, and a Leak Report 
                that shows where to save or simplify.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/demo">
                  <Button size="lg" className="bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground hover:opacity-90">
                    View mock report
                  </Button>
                </Link>
                <a href="mailto:contact@hyperlink.tools">
                  <Button size="lg" variant="outline">
                    Join waitlist
                  </Button>
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                The demo runs on mock data only – no real billing access required.
              </p>
            </div>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <HeroCard loading={heroLoading} />
            </div>
          </div>
        </section>

        {/* Product Pillars */}
        <section id="product" className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Hyperlink does</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PillarCard
              icon={<Search className="h-8 w-8" />}
              title="Discover"
              description="We ingest your SaaS billing data from card statements or a dedicated invoice inbox and build a live inventory of every tool — kept up to date automatically. We can pull data from card statements, email inboxes or accounting exports — and send insights back into your tools (e.g., Slack, email)."
            />
            <PillarCard
              icon={<AlertTriangle className="h-8 w-8" />}
              title="Diagnose"
              description="We detect duplicates, zombie subscriptions, overprovisioned seats and basic offboarding risks in your stack."
            />
            <PillarCard
              icon={<Wand2 className="h-8 w-8" />}
              title="Recommend"
              description="We propose concrete actions and curated toolboxes so your stack matches your goals and budget, not the latest hype."
            />
          </div>
        </section>

        {/* Core Features */}
        <section className="container py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What you get in Hyperlink</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hyperlink isn't just a PDF report — it's a lightweight SaaS ops cockpit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Live tool inventory"
              description="Every SaaS tool we detect, with vendor, category, owner, team, and spend in one list."
            />
            <FeatureCard
              title="Renewal calendar"
              description="Upcoming renewals by month, with 'high-risk' / 'high-amount' badges so nothing surprises finance."
            />
            <FeatureCard
              title="Zombie & duplicate detector"
              description="Automatic flags for tools with no usage signals or overlapping functionality."
            />
            <FeatureCard
              title="Offboarding risk view"
              description="Shows tools with many admins / ex-employees still having access, so you can clean up in minutes."
            />
            <FeatureCard
              title="Savings simulator"
              description="Toggle recommended actions on/off to see how much you'd save per year."
            />
            <FeatureCard
              title="Curated toolboxes"
              description="See what your stack could look like if you migrated to a clean, role-based toolbox."
            />
          </div>
        </section>

        {/* Use Cases */}
        <section id="use-cases" className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Built for tool-heavy teams</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PersonaCard
              icon={<Building2 className="h-6 w-6" />}
              title="SaaS companies"
              subtitle="25–80 people"
              pains={[
                "20–60 SaaS tools with no single source of truth",
                "Zombie seats after layoffs",
                "Annual renewals that surprise finance"
              ]}
            />
            <PersonaCard
              icon={<Users className="h-6 w-6" />}
              title="Agencies & studios"
              subtitle="8–40 people"
              pains={[
                "Client-specific tools on shared cards",
                "Hard to know which tools are still used by which team",
                "Offboarding freelancers is manual and error-prone"
              ]}
            />
            <PersonaCard
              icon={<GraduationCap className="h-6 w-6" />}
              title="Students & solo builders"
              subtitle="1–3 people"
              pains={[
                "Paying for too many 'just in case' tools",
                "Hard to pick a clean stack for your budget",
                "No time to audit subscriptions"
              ]}
            />
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            Hyperlink gives you a live inventory of what you use, what you pay, and what you can safely cut.
          </p>
        </section>

        {/* Report Preview */}
        <section className="container py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <Badge variant="outline" className="mb-2">Example Report</Badge>
              <h3 className="text-2xl font-bold">42-person B2B SaaS team</h3>
              <div className="space-y-3">
                <StatRow label="Total SaaS spend" value="€48,237 / year" />
                <StatRow label="Estimated waste" value="€8,120 / year" highlight />
                <StatRow label="Tools detected" value="27 tools across 8 categories" />
              </div>
              
              {/* Renewal Calendar Preview */}
              <div className="pt-4">
                <h4 className="text-sm font-semibold mb-3 text-foreground">🗓 Upcoming renewals</h4>
                <div className="space-y-2">
                  <RenewalRow tool="Slack" days={28} amount="€5,400 / year" />
                  <RenewalRow tool="Figma" days={42} amount="€2,400 / year" />
                  <RenewalRow tool="Notion" days={60} amount="€1,800 / year" />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  In Hyperlink, you'd see all renewals and set reminders before they auto-renew.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6 border-border bg-card">
                <h4 className="font-semibold mb-4">Top issues found</h4>
                <div className="space-y-3">
                  <IssuePreview tool="Figma" issue="Overprovisioned seats" />
                  <IssuePreview tool="Notion + Confluence" issue="Duplicate tools" />
                  <IssuePreview tool="Zoom + Whereby + Meet" issue="Fragmented comms" />
                </div>
                <Link to="/demo" className="block mt-6">
                  <Button className="w-full bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground hover:opacity-90">
                    Open the interactive mock report
                  </Button>
                </Link>
              </Card>
              
              {/* Risk & Owner Preview */}
              <Card className="p-6 border-border bg-card">
                <h4 className="font-semibold mb-4">🛡 Owner & risk overview</h4>
                <div className="space-y-3">
                  <OwnerRiskRow 
                    tool="Figma" 
                    owner="Design Lead" 
                    admins={3} 
                    status="healthy" 
                  />
                  <OwnerRiskRow 
                    tool="AWS" 
                    owner="CTO" 
                    admins={7} 
                    status="offboarding" 
                  />
                  <OwnerRiskRow 
                    tool="HubSpot" 
                    owner="Sales Ops" 
                    admins="shared login" 
                    status="security" 
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Hyperlink helps you assign an owner for each tool and spot risky access patterns.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="container py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Hyperlink fits into your week</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <WorkflowCard
              day="Monday"
              title="Snapshot"
              description="Ops opens Hyperlink for 5 minutes to check the latest SaaS inventory, spend and new tools detected."
            />
            <WorkflowCard
              day="Midweek"
              title="Alerts"
              description="Finance gets a Slack/email alert: 'Linear annual renewal in 30 days – €6,000. 2 unused seats detected.'"
            />
            <WorkflowCard
              day="End of month"
              title="Decisions"
              description="Leadership reviews the Leak Report summary, toggles 2–3 recommended cuts, and locks in €X/year in savings."
            />
          </div>
        </section>

        {/* Toolboxes */}
        <section id="toolboxes" className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Toolboxes Hyperlink AI could suggest</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hyperlink doesn't just tell you what's broken — it can propose a cleaner stack via Toolboxes 
            based on your current tools, team size and budget.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {toolboxes.map((toolbox) => (
              <Card key={toolbox.id} className="p-6 border-border bg-card hover:border-primary/50 transition-colors">
                <h3 className="text-xl font-bold mb-2">{toolbox.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{toolbox.tagline}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Ideal for:</span> {toolbox.idealFor}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Team size:</span> {toolbox.teamSize}
                  </p>
                </div>
                <div className="space-y-2">
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
                      <p className="text-xs text-muted-foreground">{tool.description} · {tool.approxCost}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          
          {/* Toolbox Capabilities */}
          <Card className="mt-8 p-6 border-border bg-card/50 max-w-3xl mx-auto">
            <p className="text-sm text-muted-foreground text-center mb-3">
              In the real app, you'll be able to:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Compare stacks</p>
                <p className="text-xs text-muted-foreground">Your current stack vs a toolbox</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">See swap options</p>
                <p className="text-xs text-muted-foreground">Which tools can be merged</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Simulate savings</p>
                <p className="text-xs text-muted-foreground">Before making changes</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Roadmap */}
        <section className="container py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The roadmap</h2>
            <p className="text-muted-foreground">Building the future of SaaS operations</p>
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line - hidden on mobile */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 transform -translate-y-1/2" />
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Today */}
              <div className="relative">
                <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block" />
                <Card className="p-6 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary transition-all">
                  <Badge className="mb-3 bg-primary text-primary-foreground">Today</Badge>
                  <h3 className="text-lg font-bold mb-2">SaaS Leak Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Hyper-clear report on your existing stack showing waste, risks, and optimization opportunities
                  </p>
                </Card>
              </div>

              {/* Next */}
              <div className="relative">
                <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background hidden md:block" />
                <Card className="p-6 border-accent/50 bg-gradient-to-br from-accent/5 to-transparent hover:border-accent transition-all">
                  <Badge variant="secondary" className="mb-3 bg-accent/20 text-accent-foreground">Next</Badge>
                  <h3 className="text-lg font-bold mb-2">Live Ops Dashboard</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-time monitoring with proactive alerts for renewals, new tools, and emerging risks
                  </p>
                </Card>
              </div>

              {/* Later */}
              <div className="relative">
                <div className="md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-muted border-4 border-background hidden md:block" />
                <Card className="p-6 border-border/50 bg-card/50 hover:border-muted transition-all">
                  <Badge variant="outline" className="mb-3">Later</Badge>
                  <h3 className="text-lg font-bold mb-2">AI Migration Assistant</h3>
                  <p className="text-sm text-muted-foreground">
                    Smart toolbox recommendations and guided migration paths powered by AI analysis
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Hyperlink.tools · Made for tool-heavy teams</p>
            <a href="mailto:contact@hyperlink.tools" className="hover:text-foreground transition-colors">
              contact@hyperlink.tools
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

const PersonaCard = ({
  icon,
  title,
  subtitle,
  pains,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  pains: string[];
}) => (
  <Card className="p-6 border-border bg-card hover:border-primary/30 transition-all hover:scale-[1.02]">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">{icon}</div>
      <div>
        <h3 className="font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <ul className="space-y-2">
      {pains.map((pain, idx) => (
        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
          <span className="text-destructive mt-0.5">•</span>
          <span>{pain}</span>
        </li>
      ))}
    </ul>
  </Card>
);

const PillarCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="p-6 border-border bg-card text-center">
    <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">{icon}</div>
    <h3 className="font-bold text-xl mb-3 text-foreground">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </Card>
);

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <Card className="p-6 border-border bg-card hover:border-primary/30 transition-colors">
    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </Card>
);

const StatRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center py-2 border-b border-border/50">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`font-semibold tabular-nums ${highlight ? 'text-destructive' : 'text-foreground'}`}>
      {value}
    </span>
  </div>
);

const RenewalRow = ({ tool, days, amount }: { tool: string; days: number; amount: string }) => (
  <div className="flex items-center justify-between p-2 rounded-lg bg-background-secondary/50 border border-border/50">
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground">{tool}</p>
      <p className="text-xs text-muted-foreground">{days} days</p>
    </div>
    <p className="text-sm font-semibold tabular-nums text-foreground">{amount}</p>
  </div>
);

const OwnerRiskRow = ({ 
  tool, 
  owner, 
  admins, 
  status 
}: { 
  tool: string; 
  owner: string; 
  admins: number | string; 
  status: 'healthy' | 'offboarding' | 'security';
}) => {
  const statusConfig = {
    healthy: { icon: '✅', label: 'healthy', color: 'text-success' },
    offboarding: { icon: '⚠', label: 'offboarding risk', color: 'text-warning' },
    security: { icon: '⚠', label: 'security risk', color: 'text-destructive' },
  };
  const config = statusConfig[status];
  
  return (
    <div className="space-y-1 p-3 rounded-lg bg-background-secondary/50 border border-border/50">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">{tool}</p>
        <span className={`text-xs ${config.color}`}>{config.icon} {config.label}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        owner: {owner} · {typeof admins === 'number' ? `${admins} admins` : admins}
      </p>
    </div>
  );
};

const WorkflowCard = ({ 
  day, 
  title, 
  description 
}: { 
  day: string; 
  title: string; 
  description: string;
}) => (
  <Card className="p-6 border-border bg-card">
    <Badge className="mb-3 bg-primary/10 text-primary">{day}</Badge>
    <h3 className="font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </Card>
);

const IssuePreview = ({ tool, issue }: { tool: string; issue: string }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-background-secondary/50 border border-border/50">
    <div>
      <p className="text-sm font-medium text-foreground">{tool}</p>
      <p className="text-xs text-muted-foreground">{issue}</p>
    </div>
  </div>
);

export default Index;
