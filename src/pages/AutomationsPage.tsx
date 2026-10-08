import React, { useState } from 'react';
import { Plus, Play, Pause, Zap, ArrowDown, CheckCircle, AlertCircle, Clock, X } from 'lucide-react';
import { mockAutomations } from '@/lib/mockData';
import type { Automation, AutomationNode } from '@/types';
import { statusColor } from '@/lib/utils';
import { toast } from 'sonner';

const nodeIcons: Record<string, React.ReactNode> = {
  'user-plus': '👤',
  'brain': '🧠',
  'briefcase': '💼',
  'bell': '🔔',
  'calendar': '📅',
  'trending-up': '📈',
  'user-check': '✅',
  'mail': '📧',
  'folder-plus': '📁',
  'clock': '⏰',
  'file-text': '📄',
  'send': '📤',
  'user-minus': '👋',
  'message-square': '💬',
  'tag': '🏷️',
  'filter': '🔍',
};

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  trigger: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
  action: { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.3)', text: '#a78bfa' },
  condition: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
};

function WorkflowNode({ node }: { node: AutomationNode }) {
  const colors = typeColors[node.type];
  return (
    <div className="workflow-node" style={{ background: colors.bg, borderColor: colors.border }}>
      <span className="text-xl">{nodeIcons[node.icon] || '⚡'}</span>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: colors.text }}>{node.type}</p>
        <p className="text-sm font-medium text-foreground">{node.name}</p>
      </div>
    </div>
  );
}

function AutomationDetail({ automation, onClose }: { automation: Automation; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-2xl p-6 z-10 max-h-[85vh] overflow-y-auto"
        style={{ background: '#0f1117', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-display font-bold text-foreground text-xl">{automation.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">{automation.description}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground flex-shrink-0 ml-4">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Executions', value: automation.executions.toLocaleString() },
            { label: 'Success Rate', value: `${automation.successRate}%` },
            { label: 'Last Run', value: automation.lastRun || 'Never' },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-sm font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Workflow</p>
          <div className="flex flex-col items-center gap-3">
            <WorkflowNode node={automation.trigger} />
            {automation.conditions.map(c => (
              <React.Fragment key={c.id}>
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-white/15" />
                  <ArrowDown className="w-3 h-3 text-white/30" />
                </div>
                <WorkflowNode node={c} />
              </React.Fragment>
            ))}
            {automation.actions.map(a => (
              <React.Fragment key={a.id}>
                <div className="flex flex-col items-center">
                  <div className="w-px h-4 bg-white/15" />
                  <ArrowDown className="w-3 h-3 text-white/30" />
                </div>
                <WorkflowNode node={a} />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button onClick={() => { toast.success('Automation test triggered'); onClose(); }}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            Test Now
          </button>
          <button onClick={() => { toast.success('Automation edited'); onClose(); }}
            className="flex-1 btn-brand py-2.5 text-sm">
            Edit Workflow
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AutomationsPage() {
  const [automations, setAutomations] = useState(mockAutomations);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);

  const toggleStatus = (id: string) => {
    setAutomations(prev => prev.map(a => {
      if (a.id !== id) return a;
      const newStatus = a.status === 'active' ? 'inactive' : 'active';
      toast.success(`Automation ${newStatus === 'active' ? 'activated' : 'paused'}`);
      return { ...a, status: newStatus };
    }));
  };

  const activeCount = automations.filter(a => a.status === 'active').length;
  const totalExecutions = automations.reduce((s, a) => s + a.executions, 0);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {selectedAutomation && <AutomationDetail automation={selectedAutomation} onClose={() => setSelectedAutomation(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Automations</h1>
          <p className="text-muted-foreground text-sm mt-1">{activeCount} active · {totalExecutions.toLocaleString()} total executions</p>
        </div>
        <button className="btn-brand" onClick={() => toast.success('Automation builder opened')}>
          <Plus className="w-4 h-4" /> New Automation
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Active', value: activeCount, color: '#22c55e' },
          { label: 'Total Executions', value: totalExecutions.toLocaleString(), color: '#3b82f6' },
          { label: 'Avg Success Rate', value: `${(automations.reduce((s, a) => s + a.successRate, 0) / automations.length).toFixed(1)}%`, color: '#8b5cf6' },
          { label: 'Time Saved (hrs)', value: Math.floor(totalExecutions * 0.05).toLocaleString(), color: '#f59e0b' },
        ].map((stat, i) => (
          <div key={i} className="metric-card">
            <p className="font-display text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {automations.map(automation => (
          <div key={automation.id}
            className="glass-card p-5 rounded-2xl"
            style={{ border: automation.status === 'active' ? '1px solid rgba(59,130,246,0.15)' : '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: automation.status === 'active' ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${automation.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.08)'}` }}>
                <Zap className="w-5 h-5" style={{ color: automation.status === 'active' ? '#22c55e' : '#6b7280' }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-foreground">{automation.name}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{automation.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`status-badge ${statusColor(automation.status)}`}>{automation.status}</span>
                    <button
                      onClick={() => toggleStatus(automation.id)}
                      className="p-2 rounded-lg transition-all duration-150 hover:bg-white/5 text-muted-foreground hover:text-foreground"
                    >
                      {automation.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg flex-shrink-0 text-xs"
                    style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
                    <span>{nodeIcons[automation.trigger.icon] || '⚡'}</span>
                    <span className="text-blue-400 font-medium">{automation.trigger.name}</span>
                  </div>

                  {automation.actions.slice(0, 3).map((action) => (
                    <React.Fragment key={action.id}>
                      <span className="text-muted-foreground flex-shrink-0">→</span>
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg flex-shrink-0 text-xs"
                        style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
                        <span>{nodeIcons[action.icon] || '⚡'}</span>
                        <span className="text-violet-400 font-medium">{action.name}</span>
                      </div>
                    </React.Fragment>
                  ))}

                  {automation.actions.length > 3 && (
                    <span className="text-xs text-muted-foreground flex-shrink-0">+{automation.actions.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{automation.executions.toLocaleString()} runs</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span>{automation.successRate}% success</span>
                  </div>
                  {automation.lastRun && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Last run: {automation.lastRun}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedAutomation(automation)}
                    className="ml-auto text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
