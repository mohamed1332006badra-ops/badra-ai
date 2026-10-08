import React, { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, PieChart, Pie, Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target } from 'lucide-react';
import {
  revenueData, customerGrowthData, revenueByProduct, funnelData,
} from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

const timeRanges = ['7 days', '30 days', '90 days', '12 months'];

function TooltipStyle({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-4 py-3 rounded-xl text-sm" style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)' }}>
      <p className="text-muted-foreground mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {typeof p.value === 'number' && (p.name.toLowerCase().includes('rev') || p.name.toLowerCase().includes('profit')) ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('12 months');

  const metrics = [
    { label: 'Total Revenue', value: '$128,430', change: '+18.6%', positive: true, icon: DollarSign, color: '#3b82f6' },
    { label: 'New Customers', value: '252', change: '+8.2%', positive: true, icon: Users, color: '#22c55e' },
    { label: 'Conversion Rate', value: '7.84%', change: '+1.8%', positive: true, icon: Target, color: '#8b5cf6' },
    { label: 'Churn Rate', value: '0.82%', change: '-0.3%', positive: true, icon: TrendingDown, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Business performance insights</p>
        </div>
        <div className="flex gap-2">
          {timeRanges.map(r => (
            <button key={r} onClick={() => setTimeRange(r)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${timeRange === r ? 'text-blue-300' : 'text-muted-foreground hover:text-foreground'}`}
              style={timeRange === r ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="metric-card">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${m.color}15`, border: `1px solid ${m.color}25` }}>
                  <Icon className="w-4 h-4" style={{ color: m.color }} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {m.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {m.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-foreground">Revenue Analytics</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue, expenses and profit</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" /> Expenses</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Profit</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: -15 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
              <Tooltip content={<TooltipStyle />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} fill="rgba(59,130,246,0.2)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#8b5cf6" strokeWidth={2} fill="rgba(139,92,246,0.15)" />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#22c55e" strokeWidth={2} fill="rgba(34,197,94,0.15)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl">
          <div className="mb-5">
            <h3 className="font-display font-semibold text-foreground">Customer Growth</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Acquisitions vs churn</p>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerGrowthData} margin={{ top: 0, right: 0, bottom: 0, left: -25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="new" name="New" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="churned" name="Churned" fill="#ef4444" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="mb-5">
            <h3 className="font-display font-semibold text-foreground">Revenue Mix</h3>
            <p className="text-xs text-muted-foreground mt-0.5">By product/service</p>
          </div>
          <div className="h-36 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueByProduct} cx="50%" cy="50%" innerRadius={35} outerRadius={62} paddingAngle={3} dataKey="value">
                  {revenueByProduct.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {revenueByProduct.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-xs text-muted-foreground flex-1 truncate">{item.name}</span>
                <span className="text-xs font-medium text-foreground">{formatCurrency(item.value, true)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-5 rounded-2xl">
        <div className="mb-5">
          <h3 className="font-display font-semibold text-foreground">Sales Funnel Analysis</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Conversion at each stage</p>
        </div>
        <div className="space-y-3">
          {funnelData.map((stage, i) => {
            const convRate = i > 0 ? ((stage.count / funnelData[i - 1].count) * 100).toFixed(0) : '100';
            const pct = (stage.count / funnelData[0].count) * 100;
            return (
              <div key={i} className="flex items-center gap-4">
                <div className="w-24 text-xs text-muted-foreground text-right">{stage.stage}</div>
                <div className="flex-1">
                  <div className="h-8 rounded-lg flex items-center px-3 transition-all duration-700"
                    style={{ width: `${pct}%`, background: `${stage.color}20`, border: `1px solid ${stage.color}30`, minWidth: '60px' }}>
                    <span className="text-xs font-bold text-white whitespace-nowrap">{stage.count}</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground w-20 text-right">
                  {i > 0 ? `${convRate}% conv.` : '—'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
