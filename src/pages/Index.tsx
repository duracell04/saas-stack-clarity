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

        {/* Product Pillars */}
        <section id="product" className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Hyperlink does</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PillarCard
              icon={<Search className="h-8 w-8" />}
              title="Discover"
              description="We ingest your SaaS billing data from card statements or a dedicated invoice inbox and build a live inventory of every tool."
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

        {/* Report Preview */}
        <section className="container py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="mb-2">Example Report</Badge>
              <h3 className="text-2xl font-bold">42-person B2B SaaS team</h3>
              <div className="space-y-3">
                <StatRow label="Total SaaS spend" value="€48,237 / year" />
                <StatRow label="Estimated waste" value="€8,120 / year" highlight />
                <StatRow label="Tools detected" value="27 tools across 8 categories" />
              </div>
            </div>
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
          </div>
        </section>

        {/* Toolboxes */}
        <section id="toolboxes" className="container py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Toolboxes Hyperlink AI could suggest</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Curated stacks that match your team size, goals, and budget
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
        </section>

        {/* Vision */}
        <section className="container py-20">
          <Card className="p-8 border-border bg-card text-center">
            <h3 className="text-2xl font-bold mb-6">The roadmap</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <Badge className="mb-2">Today</Badge>
                <p className="text-sm text-muted-foreground">
                  Hyper-clear SaaS Leak Report on your existing stack
                </p>
              </div>
              <div>
                <Badge className="mb-2">Next</Badge>
                <p className="text-sm text-muted-foreground">
                  Live SaaS Ops dashboard with alerts and renewals
                </p>
              </div>
              <div>
                <Badge className="mb-2">Later</Badge>
                <p className="text-sm text-muted-foreground">
                  AI-curated toolboxes and migration assistants
                </p>
              </div>
            </div>
          </Card>
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

const StatRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center py-2 border-b border-border/50">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className={`font-semibold tabular-nums ${highlight ? 'text-destructive' : 'text-foreground'}`}>
      {value}
    </span>
  </div>
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
