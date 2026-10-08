import React, { useState } from 'react';
import { FileText, Download, Bot, TrendingUp, DollarSign, Users, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { revenueData } from '@/lib/mockData';
import { toast } from 'sonner';

const reportTypes = [
  { id: 'sales', name: 'Sales Report', icon: TrendingUp, color: '#3b82f6', desc: 'Deal activity, conversion rates, and sales velocity' },
  { id: 'revenue', name: 'Revenue Report', icon: DollarSign, color: '#22c55e', desc: 'MRR, ARR, revenue breakdown by product and segment' },
  { id: 'customer', name: 'Customer Report', icon: Users, color: '#8b5cf6', desc: 'Acquisition, retention, churn, and LTV analysis' },
  { id: 'performance', name: 'Performance Report', icon: BarChart3, color: '#f59e0b', desc: 'Team KPIs, activity metrics, and goal tracking' },
];

const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year', 'Custom'];

const aiInsights = [
  '📈 Revenue grew 18.6% month-over-month, driven primarily by Enterprise Suite (37% of revenue).',
  '⚠️ Customer churn risk: 3 accounts showing disengagement signals. Recommend immediate outreach.',
  '🎯 Deal velocity improved: Average days to close decreased from 24 to 18 days.',
  '🤖 Automation saved ~43 hours of manual work this month across 3 active workflows.',
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!selectedType) {
      toast.error('Please select a report type');
      return;
    }
    setGenerating(true);
    setGenerated(false);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
    toast.success('Report generated successfully!');
  };

  const selectedReport = reportTypes.find(r => r.id === selectedType);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate AI-powered business reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-card p-5 rounded-2xl space-y-5">
          <h3 className="font-display font-semibold text-foreground">Build Report</h3>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Report Type</p>
            <div className="space-y-2">
              {reportTypes.map(report => {
                const Icon = report.icon;
                return (
                  <button
                    key={report.id}
                    onClick={() => setSelectedType(report.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-150 ${selectedType === report.id ? '' : 'hover:bg-white/5'}`}
                    style={selectedType === report.id ? { background: `${report.color}12`, border: `1px solid ${report.color}30` } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${report.color}15` }}>
                      <Icon className="w-4 h-4" style={{ color: report.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{report.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Date Range</p>
            <div className="space-y-1.5">
              {dateRanges.map(d => (
                <button
                  key={d}
                  onClick={() => setDateRange(d)}
                  className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all ${dateRange === d ? 'text-blue-300' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                  style={dateRange === d ? { background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' } : {}}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !selectedType}
            className="btn-brand w-full py-3 disabled:opacity-40"
          >
            {generating ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Bot className="w-4 h-4" />
                Generate Report
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-2">
          {!generated ? (
            <div className="glass-card p-8 rounded-2xl h-full flex flex-col items-center justify-center text-center min-h-[400px]">
              {generating ? (
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                    <Bot className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <p className="font-medium text-foreground">Generating your report...</p>
                  <p className="text-sm text-muted-foreground">AI is analyzing your business data</p>
                  <div className="w-48 h-1.5 rounded-full bg-white/8 mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-pulse" style={{ width: '70%' }} />
                  </div>
                </div>
              ) : (
                <div>
                  <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="font-medium text-foreground mb-2">Select a report type</p>
                  <p className="text-sm text-muted-foreground">Choose report type and date range, then click Generate</p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-6 pb-4" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.04))', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <h3 className="font-display font-bold text-foreground">{selectedReport?.name}</h3>
                  </div>
                  <button
                    onClick={() => toast.success('Report exported')}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5 text-muted-foreground hover:text-foreground"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">{dateRange} · Generated just now</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Total Revenue', value: '$128,430' },
                    { label: 'Growth', value: '+18.6%' },
                    { label: 'New Customers', value: '252' },
                  ].map((m, i) => (
                    <div key={i} className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="font-display font-bold text-xl text-foreground">{m.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">Revenue Trend</p>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: -25 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="rgba(59,130,246,0.2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-blue-400" />
                    <p className="text-sm font-semibold text-blue-300">AI Insights & Recommendations</p>
                  </div>
                  <div className="space-y-2">
                    {aiInsights.map((insight, i) => (
                      <p key={i} className="text-sm text-gray-300">{insight}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
