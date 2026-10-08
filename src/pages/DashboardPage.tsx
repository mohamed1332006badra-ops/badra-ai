import React, { useEffect, useState, useRef } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, CartesianGrid,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Users, DollarSign, Target, Briefcase,
  CheckSquare, ArrowRight, Bot, Zap,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import {
  dashboardMetrics, revenueData, funnelData, customerGrowthData,
  revenueByProduct, mockNotifications,
} from '@/lib/mockData';
import { formatCurrency, formatNumber, statusColor } from '@/lib/utils';

function AnimatedNumber({ target, prefix = '', suffix = '', decimals = 0 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(ease * target);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()}{suffix}
    </span>
  );
}

export default function DashboardPage() {
  const { user, workspace } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const unreadNotifs = mockNotifications.filter(n => !n.read);
  const firstName = user?.name?.split(' ')[0] || (language === 'ar' ? 'صديقنا' : 'there');

  const metrics = [
    {
      label: t('total_revenue'),
      value: dashboardMetrics.revenue,
      trend: dashboardMetrics.revenueTrend,
      icon: DollarSign,
      color: '#3b82f6',
      bg: 'rgba(59,130,246,0.1)',
      border: 'rgba(59,130,246,0.2)',
    },
    {
      label: t('total_customers'),
      value: dashboardMetrics.customers,
      trend: dashboardMetrics.customersTrend,
      icon: Users,
      color: '#8b5cf6',
      bg: 'rgba(139,92,246,0.1)',
      border: 'rgba(139,92,246,0.2)',
    },
    {
      label: t('conversion_rate'),
      value: dashboardMetrics.conversion,
      trend: dashboardMetrics.conversionTrend,
      icon: Target,
      color: '#22c55e',
      bg: 'rgba(34,197,94,0.1)',
      border: 'rgba(34,197,94,0.2)',
    },
    {
      label: t('active_deals'),
      value: dashboardMetrics.activeDeals,
      trend: dashboardMetrics.dealsTrend,
      icon: Briefcase,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.2)',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t('good_morning')}, {firstName} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {workspace?.name} · {new Date().toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/ai')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-400 transition-all duration-150"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}
          >
            <Bot className="w-4 h-4" />
            {t('ask_ai')}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground btn-brand">
            <Zap className="w-4 h-4" />
            {t('quick_action')}
          </button>
        </div>
      </div>

      {unreadNotifs.length > 0 && (
        <div
          className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.05))', border: '1px solid rgba(59,130,246,0.2)' }}
          onClick={() => navigate('/app/ai')}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground mb-1">
              AI identified {unreadNotifs.length} opportunities
            </p>
            <p className="text-sm text-muted-foreground truncate">{unreadNotifs[0]?.message}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          const positive = m.trend >= 0;
          return (
            <div key={i} className="metric-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                  <Icon className="w-4 h-4" style={{ color: m.color }} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(m.trend)}%
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground mb-1">
                <AnimatedNumber
                  target={m.value}
                  prefix={m.label === 'Total Revenue' ? '$' : ''}
                  suffix={m.label === 'Conversion Rate' ? '%' : ''}
                  decimals={m.label === 'Conversion Rate' ? 2 : 0}
                />
              </p>
              <p className="text-xs text-muted-foreground">{m.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-foreground">{t('revenue_overview')}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{t('monthly_rev_exp')}</p>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}K`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} fill="rgba(59,130,246,0.2)" />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#8b5cf6" strokeWidth={2} fill="rgba(139,92,246,0.2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <div className="mb-6">
            <h3 className="font-display font-semibold text-foreground">{t('revenue_by_source')}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{t('product_breakdown')}</p>
          </div>
          <div className="h-36 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={revenueByProduct} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                  {revenueByProduct.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
