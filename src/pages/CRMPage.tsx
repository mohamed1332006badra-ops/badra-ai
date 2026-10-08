import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, Handshake, TrendingUp, ArrowRight } from 'lucide-react';
import { mockLeads, mockCustomers, mockDeals } from '@/lib/mockData';
import { formatCurrency, statusColor } from '@/lib/utils';

const stages = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'] as const;

const stageColors: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#6366f1',
  qualified: '#8b5cf6',
  proposal: '#a855f7',
  negotiation: '#f59e0b',
  won: '#22c55e',
  lost: '#ef4444',
};

export default function CRMPage() {
  const navigate = useNavigate();

  const dealsByStage = stages.reduce<Record<string, typeof mockDeals>>((acc, stage) => {
    acc[stage] = mockDeals.filter(d => d.stage === stage);
    return acc;
  }, {} as Record<string, typeof mockDeals>);

  const totalPipeline = mockDeals.filter(d => d.stage !== 'lost').reduce((sum, d) => sum + d.value, 0);
  const wonDeals = mockDeals.filter(d => d.stage === 'won');
  const wonRevenue = wonDeals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">CRM</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your relationships and pipeline</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: mockLeads.length, icon: UserCheck, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', path: '/app/leads' },
          { label: 'Active Customers', value: mockCustomers.filter(c => c.status === 'active').length, icon: Users, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', path: '/app/customers' },
          { label: 'Pipeline Value', value: formatCurrency(totalPipeline, true), icon: TrendingUp, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', path: '/app/deals' },
          { label: 'Won Revenue', value: formatCurrency(wonRevenue, true), icon: Handshake, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', path: '/app/deals' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i}
              className="metric-card cursor-pointer"
              onClick={() => navigate(stat.path)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: stat.bg }}>
                  <Icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-5 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-foreground">Sales Pipeline</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Visual deal stage overview</p>
          </div>
          <button onClick={() => navigate('/app/deals')} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
            Manage Deals <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {stages.map(stage => {
              const deals = dealsByStage[stage] || [];
              const stageTotal = deals.reduce((sum, d) => sum + d.value, 0);
              const color = stageColors[stage];
              return (
                <div key={stage} className="pipeline-stage w-60">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-xs font-semibold text-foreground capitalize">{stage}</span>
                    </div>
                    <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: `${color}25` }}>
                      {deals.length}
                    </span>
                  </div>
                  {stageTotal > 0 && (
                    <p className="text-xs text-muted-foreground mb-2">{formatCurrency(stageTotal, true)}</p>
                  )}
                  {deals.length === 0 ? (
                    <div className="h-16 flex items-center justify-center rounded-lg text-xs text-muted-foreground/50"
                      style={{ border: '1px dashed rgba(255,255,255,0.08)' }}>
                      No deals
                    </div>
                  ) : (
                    deals.map(deal => (
                      <div key={deal.id} className="kanban-card mb-2" onClick={() => navigate('/app/deals')}>
                        <p className="text-xs font-medium text-foreground mb-1 line-clamp-1">{deal.title}</p>
                        <p className="text-xs text-muted-foreground mb-2">{deal.customerName}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{formatCurrency(deal.value, true)}</span>
                          <span className="text-[10px] text-muted-foreground">{deal.probability}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/8 mt-2">
                          <div className="h-full rounded-full" style={{ width: `${deal.probability}%`, background: color }} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-foreground">Hot Leads</h3>
            <button onClick={() => navigate('/app/leads')} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {mockLeads.filter(l => l.score >= 80).slice(0, 4).map(lead => (
              <div key={lead.id} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150 cursor-pointer hover:bg-white/5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                  {lead.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{lead.company}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-bold text-white">{lead.score}%</div>
                  <div className="text-[10px] text-emerald-400">{formatCurrency(lead.value, true)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-semibold text-foreground">Top Customers</h3>
            <button onClick={() => navigate('/app/customers')} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {mockCustomers.filter(c => c.status === 'active').sort((a, b) => b.revenue - a.revenue).slice(0, 4).map(cust => (
              <div key={cust.id} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-150 cursor-pointer hover:bg-white/5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                  {cust.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{cust.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{cust.company}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-bold text-white">{formatCurrency(cust.revenue, true)}</div>
                  <span className={`status-badge text-[10px] ${statusColor(cust.status)}`}>{cust.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
