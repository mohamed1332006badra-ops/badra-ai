import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { mockDeals } from '@/lib/mockData';
import type { Deal } from '@/types';
import { formatCurrency, statusColor, formatDate } from '@/lib/utils';
import { toast } from 'sonner';

type Stage = Deal['stage'];

const stages: { id: Stage; label: string; color: string }[] = [
  { id: 'new', label: 'New', color: '#3b82f6' },
  { id: 'contacted', label: 'Contacted', color: '#6366f1' },
  { id: 'qualified', label: 'Qualified', color: '#8b5cf6' },
  { id: 'proposal', label: 'Proposal', color: '#a855f7' },
  { id: 'negotiation', label: 'Negotiation', color: '#f59e0b' },
  { id: 'won', label: 'Won', color: '#22c55e' },
  { id: 'lost', label: 'Lost', color: '#ef4444' },
];

function DealModal({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl p-6 z-10"
        style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-foreground text-lg">{deal.title}</h3>
            <p className="text-muted-foreground text-sm">{deal.customerName}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          {[
            { label: 'Deal Value', value: formatCurrency(deal.value) },
            { label: 'Probability', value: `${deal.probability}%` },
            { label: 'Close Date', value: formatDate(deal.expectedClose) },
            { label: 'Stage', value: deal.stage, isStatus: true },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              {item.isStatus ? (
                <span className={`status-badge ${statusColor(item.value)}`}>{item.value}</span>
              ) : (
                <p className="text-sm font-bold text-foreground">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {deal.notes && (
          <div className="p-4 rounded-xl mb-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-muted-foreground mb-1">Notes</p>
            <p className="text-sm text-foreground">{deal.notes}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={() => { toast.success('Deal updated'); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Edit Deal
          </button>
          <button onClick={() => { toast.success('Stage updated to Won!'); onClose(); }}
            className="flex-1 btn-brand py-2.5 text-sm">
            Mark as Won
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DealsPage() {
  const [deals] = useState(mockDeals);
  const [search, setSearch] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const filtered = deals.filter(d =>
    !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const dealsByStage = stages.reduce<Record<Stage, Deal[]>>((acc, s) => {
    acc[s.id] = filtered.filter(d => d.stage === s.id);
    return acc;
  }, {} as Record<Stage, Deal[]>);

  const totalPipeline = deals.filter(d => !['won', 'lost'].includes(d.stage)).reduce((s, d) => s + d.value, 0);
  const wonTotal = deals.filter(d => d.stage === 'won').reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {selectedDeal && <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Deals</h1>
          <p className="text-muted-foreground text-sm mt-1">Pipeline: {formatCurrency(totalPipeline)} · Won: {formatCurrency(wonTotal)}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(['kanban', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${view === v ? 'text-blue-300' : 'text-muted-foreground'}`}
                style={view === v ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {v}
              </button>
            ))}
          </div>
          <button className="btn-brand" onClick={() => toast.success('New deal form opened')}>
            <Plus className="w-4 h-4" /> Add Deal
          </button>
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search deals..." className="form-input pl-10 py-2.5 text-sm" />
      </div>

      {view === 'kanban' ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {stages.map(stage => {
              const stageDeals = dealsByStage[stage.id];
              const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
              return (
                <div key={stage.id} className="kanban-column">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                      <span className="text-xs font-semibold text-foreground">{stage.label}</span>
                    </div>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white/80"
                      style={{ background: `${stage.color}20` }}>
                      {stageDeals.length}
                    </span>
                  </div>
                  {stageValue > 0 && <p className="text-[10px] text-muted-foreground px-1 mb-2">{formatCurrency(stageValue, true)}</p>}
                  {stageDeals.length === 0 ? (
                    <div className="h-16 flex items-center justify-center rounded-xl text-xs text-muted-foreground/40"
                      style={{ border: '1px dashed rgba(255,255,255,0.07)' }}>
                      Empty
                    </div>
                  ) : stageDeals.map(deal => (
                    <div key={deal.id} className="kanban-card" onClick={() => setSelectedDeal(deal)}>
                      <p className="text-sm font-medium text-foreground mb-1 line-clamp-2">{deal.title}</p>
                      <p className="text-xs text-muted-foreground mb-3">{deal.customerName}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{formatCurrency(deal.value, true)}</span>
                        <span className="text-xs text-muted-foreground">{deal.probability}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/8 mt-2">
                        <div className="h-full rounded-full transition-all" style={{ width: `${deal.probability}%`, background: stage.color }} />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-2">Close: {formatDate(deal.expectedClose)}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead><tr><th>Deal</th><th>Stage</th><th>Value</th><th>Probability</th><th>Close Date</th></tr></thead>
              <tbody>
                {filtered.map(deal => (
                  <tr key={deal.id} className="cursor-pointer" onClick={() => setSelectedDeal(deal)}>
                    <td>
                      <p className="text-sm font-medium text-foreground">{deal.title}</p>
                      <p className="text-xs text-muted-foreground">{deal.customerName}</p>
                    </td>
                    <td>
                      <span className={`status-badge ${statusColor(deal.stage)}`}>{deal.stage}</span>
                    </td>
                    <td className="text-sm font-bold text-foreground">{formatCurrency(deal.value, true)}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/8">
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${deal.probability}%` }} />
                        </div>
                        <span className="text-xs text-foreground">{deal.probability}%</span>
                      </div>
                    </td>
                    <td className="text-xs text-muted-foreground">{formatDate(deal.expectedClose)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
