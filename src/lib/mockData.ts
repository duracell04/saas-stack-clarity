export interface Tool {
  id: string;
  name: string;
  category: string;
  annualSpend: number;
  status: 'healthy' | 'zombie' | 'duplicate' | 'overprovisioned';
  description?: string;
  website?: string;
}

export interface Issue {
  id: string;
  tool: string;
  category: string;
  type: 'zombie' | 'duplicate' | 'overprovisioned';
  annualCost: number;
  recommendation: string;
  potentialSaving: number;
}

export interface Toolbox {
  id: string;
  name: string;
  tagline: string;
  idealFor: string;
  teamSize: string;
  tools: {
    name: string;
    description: string;
    website: string;
    approxCost: string;
  }[];
}

export interface LeakReport {
  companyName: string;
  headcount: number;
  period: string;
  totalSpend: number;
  estimatedWaste: number;
  toolsCount: number;
  categoriesCount: number;
  issues: Issue[];
  tools: Tool[];
  toolboxes: string[];
}

export const toolboxes: Toolbox[] = [
  {
    id: 'student',
    name: 'Student Creator Toolbox',
    tagline: 'Ship uni projects and side hustles on a student budget',
    idealFor: 'Students, side-project builders',
    teamSize: '1–3 people',
    tools: [
      { name: 'Figma', description: 'Collaborative design', website: 'figma.com', approxCost: 'Free for students' },
      { name: 'Notion', description: 'Docs & knowledge', website: 'notion.so', approxCost: 'Free for students' },
      { name: 'Canva', description: 'Visuals & social', website: 'canva.com', approxCost: '€11/mo' },
      { name: 'Google Workspace', description: 'Email & files', website: 'workspace.google.com', approxCost: 'Free' },
      { name: 'Calendly', description: 'Scheduling', website: 'calendly.com', approxCost: 'Free' },
    ],
  },
  {
    id: 'product',
    name: 'Product Team Toolbox',
    tagline: 'Build and ship great products efficiently',
    idealFor: 'SaaS companies',
    teamSize: '5–20 people',
    tools: [
      { name: 'Linear', description: 'Issue tracking', website: 'linear.app', approxCost: '€8/user' },
      { name: 'Slack', description: 'Team communication', website: 'slack.com', approxCost: '€6.75/user' },
      { name: 'GitHub', description: 'Code & CI/CD', website: 'github.com', approxCost: '€4/user' },
      { name: 'Vercel', description: 'Hosting & deployment', website: 'vercel.com', approxCost: '€20/user' },
      { name: 'PostHog', description: 'Product analytics', website: 'posthog.com', approxCost: 'Usage-based' },
    ],
  },
  {
    id: 'agency',
    name: 'Agency Toolbox',
    tagline: 'Deliver client work with clarity and speed',
    idealFor: 'Digital agencies',
    teamSize: '8–40 people',
    tools: [
      { name: 'Miro', description: 'Collaborative whiteboard', website: 'miro.com', approxCost: '€8/user' },
      { name: 'ClickUp', description: 'Project management', website: 'clickup.com', approxCost: '€7/user' },
      { name: 'Loom', description: 'Video messaging', website: 'loom.com', approxCost: '€12.50/user' },
      { name: 'HubSpot CRM', description: 'Client management', website: 'hubspot.com', approxCost: 'Free–€45/user' },
      { name: '1Password', description: 'Password management', website: '1password.com', approxCost: '€7.99/user' },
    ],
  },
];

export const mockReports: Record<string, LeakReport> = {
  saas: {
    companyName: 'Acme SaaS GmbH',
    headcount: 42,
    period: 'Last 12 months',
    totalSpend: 48237,
    estimatedWaste: 8120,
    toolsCount: 27,
    categoriesCount: 8,
    toolboxes: ['product'],
    issues: [
      {
        id: 'issue-1',
        tool: 'Figma',
        category: 'Design',
        type: 'overprovisioned',
        annualCost: 2400,
        potentialSaving: 1200,
        recommendation: 'You have 15 Figma seats but only 8 active users in the last 90 days. Consider downgrading to 10 seats.',
      },
      {
        id: 'issue-2',
        tool: 'Notion + Confluence',
        category: 'Docs',
        type: 'duplicate',
        annualCost: 3600,
        potentialSaving: 1800,
        recommendation: 'Your team uses both Notion and Confluence for documentation. Consolidating to one tool could save ~€1,800/year.',
      },
      {
        id: 'issue-3',
        tool: 'RandomTool.io',
        category: 'Other',
        type: 'zombie',
        annualCost: 2120,
        potentialSaving: 2120,
        recommendation: 'No logins detected in 6+ months. This appears to be a zombie subscription.',
      },
      {
        id: 'issue-4',
        tool: 'Zoom + Whereby + Meet',
        category: 'Communication',
        type: 'duplicate',
        annualCost: 3000,
        potentialSaving: 2000,
        recommendation: 'Three video conferencing tools detected. Standardizing on one could eliminate ~€2,000/year in redundant costs.',
      },
    ],
    tools: [
      { id: 't1', name: 'Figma', category: 'Design', annualSpend: 2400, status: 'overprovisioned', website: 'figma.com' },
      { id: 't2', name: 'Notion', category: 'Docs', annualSpend: 1800, status: 'duplicate', website: 'notion.so' },
      { id: 't3', name: 'Confluence', category: 'Docs', annualSpend: 1800, status: 'duplicate', website: 'atlassian.com' },
      { id: 't4', name: 'Slack', category: 'Communication', annualSpend: 3400, status: 'healthy', website: 'slack.com' },
      { id: 't5', name: 'Linear', category: 'Product', annualSpend: 4000, status: 'healthy', website: 'linear.app' },
      { id: 't6', name: 'GitHub', category: 'Dev', annualSpend: 2000, status: 'healthy', website: 'github.com' },
      { id: 't7', name: 'RandomTool.io', category: 'Other', annualSpend: 2120, status: 'zombie', website: 'randomtool.io' },
      { id: 't8', name: 'Zoom', category: 'Communication', annualSpend: 1500, status: 'duplicate', website: 'zoom.us' },
      { id: 't9', name: 'Whereby', category: 'Communication', annualSpend: 800, status: 'duplicate', website: 'whereby.com' },
    ],
  },
  agency: {
    companyName: 'Digital Studio Co',
    headcount: 28,
    period: 'Last 12 months',
    totalSpend: 35420,
    estimatedWaste: 6200,
    toolsCount: 22,
    categoriesCount: 7,
    toolboxes: ['agency'],
    issues: [
      {
        id: 'issue-a1',
        tool: 'Adobe Creative Cloud',
        category: 'Design',
        type: 'overprovisioned',
        annualCost: 6000,
        potentialSaving: 2000,
        recommendation: '10 Creative Cloud licenses but only 6 active users. Consider reducing to 7 licenses.',
      },
      {
        id: 'issue-a2',
        tool: 'Asana + Trello',
        category: 'Project Management',
        type: 'duplicate',
        annualCost: 2400,
        potentialSaving: 1200,
        recommendation: 'Both Asana and Trello are active. Consolidating to one PM tool could save ~€1,200/year.',
      },
      {
        id: 'issue-a3',
        tool: 'OldAnalyticsTool',
        category: 'Analytics',
        type: 'zombie',
        annualCost: 3000,
        potentialSaving: 3000,
        recommendation: 'No activity for 8 months. Appears to be unused.',
      },
    ],
    tools: [
      { id: 'ta1', name: 'Adobe CC', category: 'Design', annualSpend: 6000, status: 'overprovisioned', website: 'adobe.com' },
      { id: 'ta2', name: 'Miro', category: 'Collaboration', annualSpend: 2800, status: 'healthy', website: 'miro.com' },
      { id: 'ta3', name: 'ClickUp', category: 'PM', annualSpend: 2400, status: 'healthy', website: 'clickup.com' },
      { id: 'ta4', name: 'Asana', category: 'PM', annualSpend: 1400, status: 'duplicate', website: 'asana.com' },
      { id: 'ta5', name: 'Trello', category: 'PM', annualSpend: 1000, status: 'duplicate', website: 'trello.com' },
      { id: 'ta6', name: 'HubSpot', category: 'CRM', annualSpend: 4800, status: 'healthy', website: 'hubspot.com' },
      { id: 'ta7', name: 'OldAnalyticsTool', category: 'Analytics', annualSpend: 3000, status: 'zombie' },
    ],
  },
  student: {
    companyName: 'Student Side Project',
    headcount: 2,
    period: 'Last 12 months',
    totalSpend: 1240,
    estimatedWaste: 420,
    toolsCount: 8,
    categoriesCount: 4,
    toolboxes: ['student'],
    issues: [
      {
        id: 'issue-s1',
        tool: 'Premium Analytics',
        category: 'Analytics',
        type: 'overprovisioned',
        annualCost: 240,
        potentialSaving: 240,
        recommendation: 'A free alternative like Google Analytics or Plausible could work just as well for your traffic level.',
      },
      {
        id: 'issue-s2',
        tool: 'Unused Hosting',
        category: 'Infrastructure',
        type: 'zombie',
        annualCost: 180,
        potentialSaving: 180,
        recommendation: 'Server has been idle for 4 months with no deployments.',
      },
    ],
    tools: [
      { id: 'ts1', name: 'Figma', category: 'Design', annualSpend: 0, status: 'healthy', website: 'figma.com' },
      { id: 'ts2', name: 'Notion', category: 'Docs', annualSpend: 0, status: 'healthy', website: 'notion.so' },
      { id: 'ts3', name: 'Vercel', category: 'Hosting', annualSpend: 240, status: 'healthy', website: 'vercel.com' },
      { id: 'ts4', name: 'Canva Pro', category: 'Design', annualSpend: 130, status: 'healthy', website: 'canva.com' },
      { id: 'ts5', name: 'Premium Analytics', category: 'Analytics', annualSpend: 240, status: 'overprovisioned' },
      { id: 'ts6', name: 'Unused Hosting', category: 'Infrastructure', annualSpend: 180, status: 'zombie' },
    ],
  },
};

export function getReportForScenario(scenario: string): LeakReport {
  return mockReports[scenario] || mockReports.saas;
}
