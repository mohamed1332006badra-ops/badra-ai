import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, compact = false): string {
  if (compact && amount >= 1000) {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function timeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'text-emerald-400 bg-emerald-400/10',
    inactive: 'text-gray-400 bg-gray-400/10',
    prospect: 'text-blue-400 bg-blue-400/10',
    new: 'text-blue-400 bg-blue-400/10',
    contacted: 'text-purple-400 bg-purple-400/10',
    qualified: 'text-violet-400 bg-violet-400/10',
    unqualified: 'text-red-400 bg-red-400/10',
    proposal: 'text-amber-400 bg-amber-400/10',
    negotiation: 'text-orange-400 bg-orange-400/10',
    won: 'text-emerald-400 bg-emerald-400/10',
    lost: 'text-red-400 bg-red-400/10',
    planning: 'text-blue-400 bg-blue-400/10',
    'on-hold': 'text-amber-400 bg-amber-400/10',
    completed: 'text-emerald-400 bg-emerald-400/10',
    'in-progress': 'text-violet-400 bg-violet-400/10',
    review: 'text-amber-400 bg-amber-400/10',
    todo: 'text-gray-400 bg-gray-400/10',
    done: 'text-emerald-400 bg-emerald-400/10',
    high: 'text-orange-400 bg-orange-400/10',
    critical: 'text-red-400 bg-red-400/10',
    medium: 'text-amber-400 bg-amber-400/10',
    low: 'text-gray-400 bg-gray-400/10',
  };
  return map[status] ?? 'text-gray-400 bg-gray-400/10';
}
