import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Star, TrendingUp, X } from 'lucide-react';
import { mockLeads } from '@/lib/mockData';
import type { Lead } from '@/types';
import { formatCurrency, statusColor, formatDate } from '@/lib/utils';
import { toast } from 'sonner';

const statusOptions = ['all', 'new', 'contacted', 'qualified', 'unqualified'] as const;

function LeadModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl p-6 z-10"
        style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-foreground text-lg">{lead.name}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-muted-foreground mb-1">Lead Score</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-display font-bold text-white">{lead.score}%</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-muted-foreground mb-1">Est. Value</p>
              <span className="text-2xl font-display font-bold text-white">{formatCurrency(lead.value, true)}</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Company', value: lead.company },
              { label: 'Email', value: lead.email },
              { label: 'Phone', value: lead.phone },
              { label: 'Source', value: lead.source },
              { label: 'Status', value: lead.status },
              { label: 'Created', value: formatDate(lead.createdAt) },
            ].map((field, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <span className="text-xs text-muted-foreground">{field.label}</span>
                {field.label === 'Status' ? (
                  <span className={`status-badge ${statusColor(field.value)}`}>{field.value}</span>
                ) : (
                  <span className="text-sm text-foreground">{field.value}</span>
                )}
              </div>
            ))}
          </div>

          {lead.notes && (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
              <p className="text-xs text-blue-400 mb-1">Notes</p>
              <p className="text-sm text-gray-300">{lead.notes}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              onClick={() => { toast.success('Email drafted'); onClose(); }}>
              <Mail className="w-4 h-4" /> Email
            </button>
            <button className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
              onClick={() => { toast.success('Call scheduled'); onClose(); }}>
              <Phone className="w-4 h-4" /> Call
            </button>
            <button className="flex-1 btn-brand py-2.5 text-sm"
              onClick={() => { toast.success('Deal created from lead'); onClose(); }}>
              <TrendingUp className="w-4 h-4" /> Convert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<typeof statusOptions[number]>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'value' | 'createdAt'>('score');

  const filtered = mockLeads
    .filter(l => {
      const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || l.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'value') return b.value - a.value;
      return b.createdAt.localeCompare(a.createdAt);
    });

  return (
    <div className="space-y-6 max-w-[1400px]">
      {selectedLead && <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} leads in pipeline</p>
        </div>
        <button
          className="btn-brand"
          onClick={() => toast.success('Lead form opened')}
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="form-input pl-10 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusOptions.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === s ? 'text-blue-300' : 'text-muted-foreground hover:text-foreground'}`}
              style={statusFilter === s
                ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="form-input py-2 text-xs"
            style={{ width: 'auto', paddingRight: '2rem' }}
          >
            <option value="score">Score</option>
            <option value="value">Value</option>
            <option value="createdAt">Date</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Status</th>
                <th>Score</th>
                <th>Est. Value</th>
                <th>Source</th>
                <th>Created</th>
                <th>Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} className="cursor-pointer" onClick={() => setSelectedLead(lead)}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: `hsl(${lead.score * 2}, 70%, 45%)` }}>
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${statusColor(lead.status)}`}>{lead.status}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-white/8">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                          style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="text-xs font-medium text-foreground">{lead.score}%</span>
                    </div>
                  </td>
                  <td className="text-sm font-medium text-foreground">{formatCurrency(lead.value, true)}</td>
                  <td>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="text-xs text-muted-foreground">{formatDate(lead.createdAt)}</td>
                  <td className="text-xs text-muted-foreground">{lead.lastContact ? formatDate(lead.lastContact) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
