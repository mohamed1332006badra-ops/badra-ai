import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, X, Tag } from 'lucide-react';
import { mockCustomers } from '@/lib/mockData';
import type { Customer } from '@/types';
import { formatCurrency, statusColor, formatDate, getInitials } from '@/lib/utils';
import { toast } from 'sonner';

function CustomerModal({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl z-10 overflow-hidden"
        style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="p-6 pb-4" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.05))' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                {getInitials(customer.name)}
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-xl">{customer.name}</h3>
                <p className="text-muted-foreground text-sm">{customer.company}</p>
                <span className={`status-badge ${statusColor(customer.status)} mt-1`}>{customer.status}</span>
              </div>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Revenue', value: formatCurrency(customer.revenue) },
              { label: 'Last Activity', value: customer.lastActivity },
              { label: 'Member Since', value: formatDate(customer.createdAt) },
            ].map((stat, i) => (
              <div key={i} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{customer.email}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{customer.phone}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {customer.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-blue-300"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {customer.notes && (
            <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-muted-foreground mb-2">Notes</p>
              <p className="text-sm text-foreground">{customer.notes}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={() => { toast.success('Email drafted'); onClose(); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              <Mail className="w-4 h-4" /> Email
            </button>
            <button onClick={() => { toast.success('Calling...'); onClose(); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              <Phone className="w-4 h-4" /> Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Customer | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = mockCustomers.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      {selected && <CustomerModal customer={selected} onClose={() => setSelected(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground text-sm mt-1">{filtered.length} customers</p>
        </div>
        <button className="btn-brand" onClick={() => toast.success('Customer form opened')}>
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="form-input pl-10 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'inactive', 'prospect'].map(s => (
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
        <div className="flex gap-1 ml-auto">
          {(['grid', 'list'] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={`p-2 rounded-lg text-xs transition-all ${view === v ? 'text-white' : 'text-muted-foreground'}`}
              style={view === v ? { background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {v === 'grid' ? '⊞' : '≡'}
            </button>
          ))}
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(customer => (
            <div key={customer.id}
              className="glass-card-hover p-5 rounded-2xl cursor-pointer"
              onClick={() => setSelected(customer)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                  {getInitials(customer.name)}
                </div>
                <span className={`status-badge ${statusColor(customer.status)}`}>{customer.status}</span>
              </div>
              <h3 className="font-medium text-foreground mb-0.5">{customer.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{customer.company}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-sm font-bold text-foreground">{formatCurrency(customer.revenue, true)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Last active</p>
                  <p className="text-xs text-foreground">{customer.lastActivity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr><th>Customer</th><th>Company</th><th>Status</th><th>Revenue</th><th>Last Activity</th><th>Tags</th></tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="cursor-pointer" onClick={() => setSelected(c)}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                          {getInitials(c.name)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-foreground">{c.company}</td>
                    <td><span className={`status-badge ${statusColor(c.status)}`}>{c.status}</span></td>
                    <td className="text-sm font-medium text-foreground">{formatCurrency(c.revenue, true)}</td>
                    <td className="text-xs text-muted-foreground">{c.lastActivity}</td>
                    <td>
                      <div className="flex gap-1">
                        {c.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] text-muted-foreground" style={{ background: 'rgba(255,255,255,0.06)' }}>{tag}</span>
                        ))}
                      </div>
                    </td>
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
