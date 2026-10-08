export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  industry: string;
  size: string;
  goal: string;
  ownerId: string;
  plan: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  revenue: number;
  lastActivity: string;
  tags: string[];
  notes: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  score: number;
  value: number;
  notes: string;
  createdAt: string;
  lastContact?: string;
}

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: string;
  probability: number;
  expectedClose: string;
  assignedTo: string;
  notes: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  dueDate: string;
  team: string[];
  tasksTotal: number;
  tasksCompleted: number;
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
  createdAt: string;
}

export interface AutomationNode {
  id: string;
  type: string;
  name: string;
  icon: string;
  config: Record<string, any>;
}

export interface AutomationCondition {
  id: string;
  type: string;
  name: string;
  icon: string;
  config: Record<string, any>;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  status: string;
  trigger: AutomationNode;
  actions: AutomationNode[];
  conditions: AutomationCondition[];
  executions: number;
  successRate: number;
  lastRun: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'success' | 'info' | 'warning' | string;
  read: boolean;
  category: string;
  createdAt: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface FunnelData {
  stage: string;
  count: number;
  value: number;
  color: string;
}

export interface DashboardMetrics {
  revenue: number;
  revenueTrend: number;
  customers: number;
  customersTrend: number;
  conversion: number;
  conversionTrend: number;
  activeDeals: number;
  dealsTrend: number;
  projects: number;
  tasks: number;
  tasksTrend: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}
