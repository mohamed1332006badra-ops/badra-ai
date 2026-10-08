import type { User, Workspace } from '@/types';

const USER_KEY = 'badra_user';
const WORKSPACE_KEY = 'badra_workspace';
const ONBOARDING_KEY = 'badra_onboarded';

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getWorkspace(): Workspace | null {
  const raw = localStorage.getItem(WORKSPACE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setWorkspace(workspace: Workspace): void {
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
}

export function isOnboarded(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
}

export function setOnboarded(): void {
  localStorage.setItem(ONBOARDING_KEY, 'true');
}

export function logout(): void {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(WORKSPACE_KEY);
  localStorage.removeItem(ONBOARDING_KEY);
}

export function register(email: string, password: string, name: string): User {
  const user: User = {
    id: `user_${Date.now()}`,
    email,
    name,
    role: 'owner',
    createdAt: new Date().toISOString(),
  };
  setUser(user);
  const accounts = JSON.parse(localStorage.getItem('badra_accounts') || '{}');
  accounts[email] = { password, userId: user.id };
  localStorage.setItem('badra_accounts', JSON.stringify(accounts));
  return user;
}

export function login(email: string, password: string): User | null {
  const accounts = JSON.parse(localStorage.getItem('badra_accounts') || '{}');
  const account = accounts[email];
  if (!account || account.password !== password) {
    return null;
  }
  const user: User = {
    id: account.userId || `user_${Date.now()}`,
    email,
    name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    role: 'owner',
    createdAt: new Date().toISOString(),
  };
  setUser(user);
  return user;
}

export function createDemoAccount(): User {
  const user: User = {
    id: 'demo_user',
    email: 'demo@badra.ai',
    name: 'Demo User',
    role: 'owner',
    createdAt: new Date().toISOString(),
  };
  setUser(user);
  const accounts = JSON.parse(localStorage.getItem('badra_accounts') || '{}');
  accounts['demo@badra.ai'] = { password: 'demo123', userId: 'demo_user' };
  localStorage.setItem('badra_accounts', JSON.stringify(accounts));
  const workspace: Workspace = {
    id: 'demo_workspace',
    name: 'Acme Corp',
    industry: 'Technology',
    size: '11-50',
    goal: 'Increase sales',
    ownerId: 'demo_user',
    plan: 'professional',
    createdAt: new Date().toISOString(),
  };
  setWorkspace(workspace);
  setOnboarded();
  return user;
}
