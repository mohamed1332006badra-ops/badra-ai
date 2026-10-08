import type {
  Customer,
  Lead,
  Deal,
  Project,
  Task,
  Automation,
  Notification,
  RevenueData,
  FunnelData,
  DashboardMetrics,
} from '@/types';

export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 72000, expenses: 48000, profit: 24000 },
  { month: 'Feb', revenue: 84000, expenses: 52000, profit: 32000 },
  { month: 'Mar', revenue: 91000, expenses: 55000, profit: 36000 },
  { month: 'Apr', revenue: 87000, expenses: 51000, profit: 36000 },
  { month: 'May', revenue: 108000, expenses: 61000, profit: 47000 },
  { month: 'Jun', revenue: 115000, expenses: 64000, profit: 51000 },
  { month: 'Jul', revenue: 119000, expenses: 68000, profit: 51000 },
  { month: 'Aug', revenue: 128430, expenses: 72000, profit: 56430 },
];

export const funnelData: FunnelData[] = [
  { stage: 'Leads', count: 847, value: 4200000, color: '#3b82f6' },
  { stage: 'Contacted', count: 512, value: 2560000, color: '#6366f1' },
  { stage: 'Qualified', count: 289, value: 1445000, color: '#8b5cf6' },
  { stage: 'Proposal', count: 156, value: 780000, color: '#a855f7' },
  { stage: 'Negotiation', count: 74, value: 370000, color: '#d946ef' },
  { stage: 'Won', count: 38, value: 190000, color: '#22c55e' },
];

export const customerGrowthData = [
  { month: 'Jan', customers: 3200, new: 180, churned: 42 },
  { month: 'Feb', customers: 3380, new: 210, churned: 30 },
  { month: 'Mar', customers: 3620, new: 280, churned: 40 },
  { month: 'Apr', customers: 3820, new: 240, churned: 40 },
  { month: 'May', customers: 4100, new: 310, churned: 30 },
  { month: 'Jun', customers: 4430, new: 360, churned: 30 },
  { month: 'Jul', customers: 4680, new: 290, churned: 40 },
  { month: 'Aug', customers: 4892, new: 252, churned: 40 },
];

export const revenueByProduct = [
  { name: 'Enterprise Suite', value: 48200, color: '#3b82f6' },
  { name: 'Professional Plan', value: 32100, color: '#8b5cf6' },
  { name: 'Starter Plan', value: 28400, color: '#6366f1' },
  { name: 'Add-ons', value: 11800, color: '#a855f7' },
  { name: 'Consulting', value: 7930, color: '#22c55e' },
];

export const dashboardMetrics: DashboardMetrics = {
  revenue: 128430,
  revenueTrend: 18.6,
  customers: 4892,
  customersTrend: 12.3,
  conversion: 7.84,
  conversionTrend: 1.8,
  activeDeals: 126,
  dealsTrend: 5.2,
  projects: 24,
  tasks: 142,
  tasksTrend: -3.1,
};

export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Sarah Chen',
    company: 'NexaTech Solutions',
    email: 'sarah.chen@nexatech.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    revenue: 48200,
    lastActivity: '2 hours ago',
    tags: ['enterprise', 'vip', 'tech'],
    notes: 'Key enterprise account. Interested in expanding to AI tier.',
    createdAt: '2024-01-15',
  },
  {
    id: 'c2',
    name: 'Marcus Webb',
    company: 'Vertex Capital',
    email: 'marcus@vertexcapital.co',
    phone: '+1 (555) 345-6789',
    status: 'active',
    revenue: 36800,
    lastActivity: '1 day ago',
    tags: ['finance', 'enterprise'],
    notes: 'Finance sector client, requires strict compliance.',
    createdAt: '2024-02-20',
  },
  {
    id: 'c3',
    name: 'Amira Hassan',
    company: 'Global Logistics Co.',
    email: 'ahassan@globallogistics.com',
    phone: '+1 (555) 456-7890',
    status: 'active',
    revenue: 29400,
    lastActivity: '3 days ago',
    tags: ['logistics', 'mid-market'],
    notes: 'Needs supply chain automation features.',
    createdAt: '2024-03-10',
  },
  {
    id: 'c4',
    name: 'James Okafor',
    company: 'Bloom Retail Group',
    email: 'james.o@bloomretail.com',
    phone: '+1 (555) 567-8901',
    status: 'active',
    revenue: 21600,
    lastActivity: '5 days ago',
    tags: ['retail', 'smb'],
    notes: 'Growing account, great referral potential.',
    createdAt: '2024-04-05',
  },
  {
    id: 'c5',
    name: 'Elena Patel',
    company: 'MedCore Health',
    email: 'elena@medcorehealth.com',
    phone: '+1 (555) 678-9012',
    status: 'prospect',
    revenue: 0,
    lastActivity: '1 week ago',
    tags: ['healthcare', 'prospect'],
    notes: 'Evaluating against competitor. High-value opportunity.',
    createdAt: '2024-07-01',
  },
  {
    id: 'c6',
    name: 'David Kim',
    company: 'Cloudify Labs',
    email: 'dkim@cloudifylabs.io',
    phone: '+1 (555) 789-0123',
    status: 'active',
    revenue: 18900,
    lastActivity: '2 days ago',
    tags: ['saas', 'tech'],
    notes: 'Developer-focused team, uses API extensively.',
    createdAt: '2024-03-22',
  },
  {
    id: 'c7',
    name: 'Lisa Torres',
    company: 'Horizon Marketing',
    email: 'ltorres@horizonmkt.com',
    phone: '+1 (555) 890-1234',
    status: 'inactive',
    revenue: 8400,
    lastActivity: '3 weeks ago',
    tags: ['marketing', 'smb'],
    notes: 'Renewal pending. Need to re-engage.',
    createdAt: '2023-11-08',
  },
  {
    id: 'c8',
    name: 'Robert Zhang',
    company: 'UrbanSpace Properties',
    email: 'rzhang@urbanspace.co',
    phone: '+1 (555) 901-2345',
    status: 'active',
    revenue: 32100,
    lastActivity: '4 hours ago',
    tags: ['realestate', 'enterprise'],
    notes: 'Manages 40+ properties, needs portfolio analytics.',
    createdAt: '2024-01-30',
  },
];

export const mockLeads: Lead[] = [
  {
    id: 'l1',
    name: 'Charlotte White',
    company: 'Innovate Inc.',
    email: 'c.white@innovate.com',
    phone: '+1 (555) 111-2222',
    source: 'Website',
    status: 'new',
    score: 92,
    value: 24000,
    notes: 'Downloaded enterprise whitepaper. High-intent signals.',
    createdAt: '2026-10-06',
  },
  {
    id: 'l2',
    name: 'Tyler Brooks',
    company: 'Fastlane Commerce',
    email: 'tyler@fastlanecommerce.com',
    phone: '+1 (555) 222-3333',
    source: 'LinkedIn',
    status: 'contacted',
    score: 87,
    value: 18500,
    notes: 'Responded to LinkedIn outreach. Interested in Pro plan.',
    createdAt: '2026-10-04',
    lastContact: '2026-10-06',
  },
  {
    id: 'l3',
    name: 'Priya Sharma',
    company: 'DataDriven Analytics',
    email: 'priya@datadriven.ai',
    phone: '+1 (555) 333-4444',
    source: 'Referral',
    status: 'qualified',
    score: 95,
    value: 48000,
    notes: 'Referred by NexaTech. Budget confirmed. Ready for demo.',
    createdAt: '2026-09-28',
    lastContact: '2026-10-05',
  },
  {
    id: 'l4',
    name: 'Kevin O\'Brien',
    company: 'Alpine Consulting',
    email: 'kobrien@alpineconsult.com',
    phone: '+1 (555) 444-5555',
    source: 'Cold Email',
    status: 'new',
    score: 64,
    value: 9600,
    notes: 'Initial contact via cold outreach campaign.',
    createdAt: '2026-10-07',
  },
  {
    id: 'l5',
    name: 'Nina Kowalski',
    company: 'FlexWork Solutions',
    email: 'nina@flexwork.io',
    phone: '+1 (555) 555-6666',
    source: 'Google Ads',
    status: 'contacted',
    score: 78,
    value: 14400,
    notes: 'Clicked PPC ad. Interested in automation features.',
    createdAt: '2026-10-03',
    lastContact: '2026-10-07',
  },
  {
    id: 'l6',
    name: 'Alex Rivera',
    company: 'QuickShip Logistics',
    email: 'arivera@quickship.com',
    phone: '+1 (555) 666-7777',
    source: 'Content Marketing',
    status: 'qualified',
    score: 88,
    value: 36000,
    notes: 'Read 5 blog posts. Subscribed to newsletter. High intent.',
    createdAt: '2026-09-25',
    lastContact: '2026-10-06',
  },
  {
    id: 'l7',
    name: 'Fatima Al-Rashid',
    company: 'TechBridge MENA',
    email: 'fatima@techbridge.ae',
    phone: '+971 50 123 4567',
    source: 'Conference',
    status: 'new',
    score: 81,
    value: 42000,
    notes: 'Met at SaaS World 2026 conference. International expansion prospect.',
    createdAt: '2026-10-01',
  },
  {
    id: 'l8',
    name: 'Liam Foster',
    company: 'GreenPath Energy',
    email: 'lfoster@greenpath.com',
    phone: '+1 (555) 777-8888',
    source: 'Website',
    status: 'unqualified',
    score: 32,
    value: 4800,
    notes: 'Budget too low for current plans. Revisit in Q2.',
    createdAt: '2026-10-02',
    lastContact: '2026-10-04',
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    title: 'NexaTech Enterprise Expansion',
    customerId: 'c1',
    customerName: 'Sarah Chen',
    value: 84000,
    stage: 'negotiation',
    probability: 80,
    expectedClose: '2026-10-31',
    assignedTo: 'You',
    notes: 'Expanding from Pro to Business tier. Legal review in progress.',
    createdAt: '2026-09-01',
  },
  {
    id: 'd2',
    title: 'DataDriven Analytics – Full Suite',
    customerId: 'l3',
    customerName: 'Priya Sharma',
    value: 48000,
    stage: 'proposal',
    probability: 65,
    expectedClose: '2026-11-15',
    assignedTo: 'You',
    notes: 'Proposal sent. Awaiting review from CTO.',
    createdAt: '2026-09-15',
  },
  {
    id: 'd3',
    title: 'Vertex Capital – Q4 Contract',
    customerId: 'c2',
    customerName: 'Marcus Webb',
    value: 36800,
    stage: 'won',
    probability: 100,
    expectedClose: '2026-09-30',
    assignedTo: 'You',
    notes: 'Signed and activated. Revenue booked.',
    createdAt: '2026-08-20',
  },
  {
    id: 'd4',
    title: 'TechBridge MENA – Pilot',
    customerId: 'l7',
    customerName: 'Fatima Al-Rashid',
    value: 42000,
    stage: 'qualified',
    probability: 55,
    expectedClose: '2026-12-01',
    assignedTo: 'You',
    notes: 'International account. Compliance requirements being reviewed.',
    createdAt: '2026-10-01',
  },
  {
    id: 'd5',
    title: 'Bloom Retail – Analytics Add-on',
    customerId: 'c4',
    customerName: 'James Okafor',
    value: 12000,
    stage: 'contacted',
    probability: 40,
    expectedClose: '2026-11-30',
    assignedTo: 'You',
    notes: 'Interest in advanced analytics module.',
    createdAt: '2026-10-05',
  },
  {
    id: 'd6',
    title: 'UrbanSpace – Annual Renewal',
    customerId: 'c8',
    customerName: 'Robert Zhang',
    value: 32100,
    stage: 'won',
    probability: 100,
    expectedClose: '2026-10-01',
    assignedTo: 'You',
    notes: 'Renewed annual contract with 10% increase.',
    createdAt: '2026-09-10',
  },
  {
    id: 'd7',
    title: 'QuickShip Logistics – Automation',
    customerId: 'l6',
    customerName: 'Alex Rivera',
    value: 36000,
    stage: 'proposal',
    probability: 60,
    expectedClose: '2026-11-20',
    assignedTo: 'You',
    notes: 'Custom automation proposal being prepared.',
    createdAt: '2026-09-28',
  },
  {
    id: 'd8',
    title: 'MedCore Health – Evaluation',
    customerId: 'c5',
    customerName: 'Elena Patel',
    value: 56000,
    stage: 'new',
    probability: 25,
    expectedClose: '2026-12-15',
    assignedTo: 'You',
    notes: 'Early-stage evaluation. Competing with two other vendors.',
    createdAt: '2026-10-07',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    name: 'Customer Portal Redesign',
    description: 'Complete overhaul of the customer-facing portal with new UX and self-service features.',
    status: 'active',
    priority: 'high',
    progress: 68,
    dueDate: '2026-11-30',
    team: ['You', 'Sarah', 'Mike'],
    tasksTotal: 24,
    tasksCompleted: 16,
    createdAt: '2026-08-01',
  },
  {
    id: 'p2',
    name: 'AI Integration Phase 2',
    description: 'Expand AI capabilities with predictive analytics and automated lead scoring.',
    status: 'active',
    priority: 'critical',
    progress: 42,
    dueDate: '2026-12-15',
    team: ['You', 'Alex', 'Emma'],
    tasksTotal: 36,
    tasksCompleted: 15,
    createdAt: '2026-09-01',
  },
  {
    id: 'p3',
    name: 'Q4 Marketing Campaign',
    description: 'Holiday season campaign with targeted outreach to enterprise prospects.',
    status: 'planning',
    priority: 'medium',
    progress: 15,
    dueDate: '2026-11-01',
    team: ['You', 'Lisa'],
    tasksTotal: 18,
    tasksCompleted: 3,
    createdAt: '2026-10-01',
  },
  {
    id: 'p4',
    name: 'API v3.0 Launch',
    description: 'New REST API with improved performance, webhooks, and expanded endpoints.',
    status: 'active',
    priority: 'high',
    progress: 82,
    dueDate: '2026-10-31',
    team: ['Alex', 'Mike', 'James'],
    tasksTotal: 29,
    tasksCompleted: 24,
    createdAt: '2026-07-15',
  },
  {
    id: 'p5',
    name: 'SOC2 Compliance',
    description: 'Security audit and documentation for SOC2 Type II certification.',
    status: 'on-hold',
    priority: 'high',
    progress: 35,
    dueDate: '2027-01-31',
    team: ['You', 'Security Team'],
    tasksTotal: 52,
    tasksCompleted: 18,
    createdAt: '2026-06-01',
  },
  {
    id: 'p6',
    name: 'Mobile App Beta',
    description: 'iOS and Android companion app with core CRM and notification features.',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    dueDate: '2026-09-30',
    team: ['Mobile Team'],
    tasksTotal: 41,
    tasksCompleted: 41,
    createdAt: '2026-05-01',
  },
];

export const mockTasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Design new dashboard wireframes',
    description: 'Create high-fidelity wireframes for all portal sections',
    status: 'done',
    priority: 'high',
    assignedTo: 'Sarah',
    dueDate: '2026-10-10',
    createdAt: '2026-09-01',
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Implement responsive navigation',
    description: 'Mobile-first navigation with accessibility support',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'You',
    dueDate: '2026-10-15',
    createdAt: '2026-09-05',
  },
  {
    id: 't3',
    projectId: 'p2',
    title: 'Train lead scoring model',
    description: 'ML model for predicting lead conversion probability',
    status: 'in-progress',
    priority: 'critical',
    assignedTo: 'Alex',
    dueDate: '2026-10-25',
    createdAt: '2026-09-10',
  },
  {
    id: 't4',
    projectId: 'p4',
    title: 'Write API documentation',
    description: 'OpenAPI 3.0 spec and developer guide',
    status: 'review',
    priority: 'medium',
    assignedTo: 'Mike',
    dueDate: '2026-10-20',
    createdAt: '2026-09-15',
  },
  {
    id: 't5',
    projectId: 'p3',
    title: 'Define campaign target segments',
    description: 'Identify ICP and build audience segments',
    status: 'todo',
    priority: 'medium',
    assignedTo: 'You',
    dueDate: '2026-10-20',
    createdAt: '2026-10-01',
  },
];

export const mockAutomations: Automation[] = [
  {
    id: 'a1',
    name: 'High-Value Lead Alert',
    description: 'Notify team when a lead with score > 80 is detected and create a follow-up task.',
    status: 'active',
    trigger: {
      id: 'n1',
      type: 'trigger',
      name: 'New Lead Created',
      icon: 'user-plus',
      config: { condition: 'score > 80' },
    },
    actions: [
      { id: 'a1n1', type: 'action', name: 'AI Lead Analysis', icon: 'brain', config: {} },
      { id: 'a1n2', type: 'action', name: 'Create Deal', icon: 'briefcase', config: { stage: 'new' } },
      { id: 'a1n3', type: 'action', name: 'Send Notification', icon: 'bell', config: { message: 'High-value lead detected' } },
      { id: 'a1n4', type: 'action', name: 'Schedule Follow-up', icon: 'calendar', config: { delay: '2h' } },
    ],
    conditions: [
      { id: 'a1c1', type: 'condition', name: 'Score Check', icon: 'filter', config: { field: 'score', operator: '>', value: 80 } },
    ],
    executions: 847,
    successRate: 96.4,
    lastRun: '2 hours ago',
    createdAt: '2026-08-01',
  },
  {
    id: 'a2',
    name: 'Deal Won → Onboard',
    description: 'When a deal is marked Won, automatically trigger customer onboarding workflow.',
    status: 'active',
    trigger: {
      id: 'n2',
      type: 'trigger',
      name: 'Deal Stage Changed',
      icon: 'trending-up',
      config: { stage: 'won' },
    },
    actions: [
      { id: 'a2n1', type: 'action', name: 'Create Customer', icon: 'user-check', config: {} },
      { id: 'a2n2', type: 'action', name: 'Send Welcome Email', icon: 'mail', config: {} },
      { id: 'a2n3', type: 'action', name: 'Create Onboarding Project', icon: 'folder-plus', config: {} },
    ],
    conditions: [],
    executions: 312,
    successRate: 98.7,
    lastRun: '1 day ago',
    createdAt: '2026-07-15',
  },
  {
    id: 'a3',
    name: 'Weekly AI Business Report',
    description: 'Every Monday, generate an AI-powered business performance summary and send to team.',
    status: 'active',
    trigger: {
      id: 'n3',
      type: 'trigger',
      name: 'Schedule: Weekly',
      icon: 'clock',
      config: { day: 'monday', time: '09:00' },
    },
    actions: [
      { id: 'a3n1', type: 'action', name: 'Generate AI Report', icon: 'file-text', config: {} },
      { id: 'a3n2', type: 'action', name: 'Send to Team', icon: 'send', config: { channel: 'email' } },
    ],
    conditions: [],
    executions: 32,
    successRate: 100,
    lastRun: '5 days ago',
    createdAt: '2026-08-10',
  },
  {
    id: 'a4',
    name: 'Inactive Customer Re-engagement',
    description: 'Detect customers with no activity for 30 days and trigger re-engagement campaign.',
    status: 'inactive',
    trigger: {
      id: 'n4',
      type: 'trigger',
      name: 'Inactivity Detected',
      icon: 'user-minus',
      config: { days: 30 },
    },
    actions: [
      { id: 'a4n1', type: 'action', name: 'AI Personalized Message', icon: 'message-square', config: {} },
      { id: 'a4n2', type: 'action', name: 'Tag Customer', icon: 'tag', config: { tag: 'at-risk' } },
    ],
    conditions: [],
    executions: 156,
    successRate: 71.2,
    lastRun: '2 weeks ago',
    createdAt: '2026-06-20',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'High-value lead detected',
    message: 'Priya Sharma from DataDriven Analytics has a score of 95. Recommend immediate follow-up.',
    type: 'alert',
    read: false,
    category: 'crm',
    createdAt: '2026-10-08T08:30:00',
  },
  {
    id: 'n2',
    title: 'Deal won: Vertex Capital',
    message: 'Marcus Webb signed the Q4 contract for $36,800. Revenue booked.',
    type: 'success',
    read: false,
    category: 'deals',
    createdAt: '2026-10-07T16:45:00',
  },
  {
    id: 'n3',
    title: 'Revenue increased 18.6%',
    message: 'August revenue reached $128,430. This exceeds your monthly target by $8,430.',
    type: 'success',
    read: false,
    category: 'analytics',
    createdAt: '2026-10-07T09:00:00',
  },
  {
    id: 'n4',
    title: 'AI identified 3 opportunities',
    message: '14 high-value leads have not been contacted. Product A generated 32% of revenue.',
    type: 'info',
    read: false,
    category: 'ai',
    createdAt: '2026-10-08T07:00:00',
  },
  {
    id: 'n5',
    title: 'Automation executed successfully',
    message: 'High-Value Lead Alert automation triggered 12 times today.',
    type: 'info',
    read: true,
    category: 'ai',
    createdAt: '2026-10-07T14:20:00',
  },
  {
    id: 'n6',
    title: 'Project deadline approaching',
    message: 'API v3.0 Launch is due in 23 days with 82% progress.',
    type: 'warning',
    read: true,
    category: 'system',
    createdAt: '2026-10-06T12:00:00',
  },
  {
    id: 'n7',
    title: 'Customer renewal pending',
    message: 'Horizon Marketing subscription expires in 7 days. Action required.',
    type: 'warning',
    read: true,
    category: 'crm',
    createdAt: '2026-10-05T10:30:00',
  },
  {
    id: 'n8',
    title: 'New customer onboarded',
    message: 'Robert Zhang from UrbanSpace Properties completed onboarding.',
    type: 'success',
    read: true,
    category: 'crm',
    createdAt: '2026-10-04T15:00:00',
  },
];

export const aiResponses: Record<string, string> = {
  default: `## Business Performance Analysis

**Revenue is up 18.6% this month**, reaching $128,430 — your strongest month yet.

### 3 Key Opportunities I've Identified:

1. **14 high-value leads** have not been contacted in the last 72 hours. Combined estimated value: $312,000.
2. **Enterprise Suite** generated 37.5% of total revenue. Consider a focused upsell campaign to existing Professional customers.
3. **Conversion rate** dipped 8% in the last 7 days — likely tied to 3 stalled proposals in negotiation stage.

### Recommended Actions:
- Follow up with Priya Sharma (DataDriven Analytics) — score 95, ready to close.
- Review NexaTech negotiation — $84K deal at risk if not moved forward this week.
- Activate the re-engagement automation for 7 inactive customers.

*Would you like me to draft follow-up messages or create tasks for these actions?*`,

  sales: `## Sales Performance Summary

**This Week vs. Last Week:**
- Deals created: 8 (+33%)
- Deals closed (Won): 2 ($68,900)
- Pipeline value: $346,400 (↑ $42,000)

### Top Performing Deals:
1. NexaTech Enterprise Expansion — $84,000 (Negotiation)
2. DataDriven Analytics — $48,000 (Proposal)
3. TechBridge MENA Pilot — $42,000 (Qualified)

### Sales Velocity: 18.4 days average deal cycle

**Recommendation:** The 3 deals in "Proposal" stage account for $138,100. Prioritize moving them to negotiation before week end.`,

  customers: `## Your Best Customers

Ranked by lifetime revenue and growth potential:

| Customer | Revenue | Status | Growth Signal |
|----------|---------|--------|---------------|
| Sarah Chen (NexaTech) | $48,200 | Active | ↑ Expansion deal open |
| Robert Zhang (UrbanSpace) | $32,100 | Active | ↑ Renewed +10% |
| Marcus Webb (Vertex) | $36,800 | Active | → Stable |
| Priya Sharma (DataDriven) | Prospect | High Intent | ⚡ Close now |

**3 customers are at churn risk** — Horizon Marketing has not engaged in 21 days. Recommend immediate outreach.`,

  focus: `## Your Focus for Today

Based on your current pipeline and AI analysis:

### 🔴 Critical (Do Today)
1. Follow up with **Priya Sharma** — demo scheduled, decision pending
2. Review **NexaTech** contract redlines — $84K at risk
3. Contact **14 unresponded leads** — automated sequence ready to send

### 🟡 Important (This Week)
- Prepare Q4 marketing campaign brief
- Review API v3.0 documentation with engineering
- Re-engage Horizon Marketing account

### 🟢 On Track
- Vertex Capital renewed ✓
- UrbanSpace onboarding complete ✓
- 3 automations running smoothly ✓

**Your win probability this week: 74%** if you act on the critical items.`,
};

export const suggestedPrompts = [
  { icon: '📊', text: 'Analyze my business performance', key: 'default' },
  { icon: '💰', text: 'Summarize sales this week', key: 'sales' },
  { icon: '👥', text: 'Show me my best customers', key: 'customers' },
  { icon: '🎯', text: 'What should I focus on today?', key: 'focus' },
  { icon: '📈', text: 'Generate a revenue forecast', key: 'default' },
  { icon: '🤖', text: 'Which leads should I contact first?', key: 'sales' },
];
