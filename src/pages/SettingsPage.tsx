import React, { useState } from 'react';
import { User, Building2, Palette, Bell, Shield, Bot, CreditCard, Check, Sun, Moon, Monitor } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';
import { setUser as saveUser, setWorkspace as saveWorkspace } from '@/lib/auth';

type Section = 'profile' | 'workspace' | 'appearance' | 'notifications' | 'security' | 'ai' | 'billing';

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'ai', label: 'AI Preferences', icon: Bot },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

const plans = [
  { id: 'starter', name: 'Starter', price: '$19/mo', features: ['5 users', '500 customers', 'Basic CRM'] },
  { id: 'professional', name: 'Professional', price: '$49/mo', features: ['25 users', 'Unlimited customers', 'AI Assistant', 'Automations'], current: true },
  { id: 'business', name: 'Business', price: '$99/mo', features: ['Unlimited users', 'Custom AI', 'API access', 'Dedicated support'] },
];

const themes = [
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'system', label: 'System', icon: Monitor },
];

export default function SettingsPage() {
  const { user, workspace, setUser, setWorkspace } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<Section>('profile');

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [wsName, setWsName] = useState(workspace?.name || '');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifDeals, setNotifDeals] = useState(true);
  const [notifAI, setNotifAI] = useState(true);
  const [aiModel, setAiModel] = useState('balanced');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));

    if (user) {
      const updated = { ...user, name, email };
      saveUser(updated);
      setUser(updated);
    }
    if (workspace) {
      const updatedWs = { ...workspace, name: wsName };
      saveWorkspace(updatedWs);
      setWorkspace(updatedWs);
    }

    setSaving(false);
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and workspace preferences</p>
      </div>

      <div className="flex gap-6">
        <div className="w-48 flex-shrink-0">
          <nav className="space-y-1">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`nav-item w-full ${activeSection === s.id ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          {activeSection === 'profile' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="font-display font-semibold text-foreground">Profile Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                  {user ? getInitials(user.name) : 'U'}
                </div>
                <div>
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors" onClick={() => toast.success('Photo upload opened')}>
                    Change avatar
                  </button>
                  <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="form-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email address</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder="email@example.com" type="email" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                <input value={user?.role || 'owner'} className="form-input opacity-60" disabled />
              </div>

              <button onClick={handleSave} disabled={saving} className="btn-brand">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
              </button>
            </div>
          )}

          {activeSection === 'workspace' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="font-display font-semibold text-foreground">Workspace Settings</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Workspace name</label>
                <input value={wsName} onChange={e => setWsName(e.target.value)} className="form-input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                  <input value={workspace?.industry || ''} className="form-input opacity-60" disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company size</label>
                  <input value={workspace?.size || ''} className="form-input opacity-60" disabled />
                </div>
              </div>
              <button onClick={handleSave} disabled={saving} className="btn-brand">
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
              </button>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="font-display font-semibold text-foreground">Appearance</h3>
              <div className="grid grid-cols-3 gap-3">
                {themes.map(t => {
                  const Icon = t.icon;
                  const active = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id as typeof theme); toast.success(`Theme set to ${t.label}`); }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-150"
                      style={active ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <Icon className="w-5 h-5" style={{ color: active ? '#60a5fa' : '#6b7280' }} />
                      <span className={`text-sm font-medium ${active ? 'text-blue-300' : 'text-muted-foreground'}`}>{t.label}</span>
                      {active && <Check className="w-3.5 h-3.5 text-blue-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="font-display font-semibold text-foreground">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications', desc: 'Receive summary emails', state: notifEmail, set: setNotifEmail },
                  { label: 'Deal updates', desc: 'Notify when deal stage changes', state: notifDeals, set: setNotifDeals },
                  { label: 'AI insights', desc: 'Get notified when AI finds opportunities', state: notifAI, set: setNotifAI },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => { item.set(!item.state); toast.success('Preference saved'); }}
                      className={`w-11 h-6 rounded-full transition-all duration-200 relative ${item.state ? 'bg-blue-500' : 'bg-white/15'}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${item.state ? 'translate-x-5' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="font-display font-semibold text-foreground">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">New password</label>
                  <input type="password" className="form-input" placeholder="••••••••" />
                </div>
                <button onClick={() => toast.success('Password updated')} className="btn-brand">Update Password</button>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="glass-card p-6 rounded-2xl space-y-5">
              <h3 className="font-display font-semibold text-foreground">AI Preferences</h3>
              <div className="space-y-2">
                {[
                  { id: 'concise', label: 'Concise', desc: 'Short, direct answers with key data points' },
                  { id: 'balanced', label: 'Balanced', desc: 'Detailed analysis with actionable recommendations' },
                  { id: 'comprehensive', label: 'Comprehensive', desc: 'Full deep-dive reports and extensive context' },
                ].map(m => (
                  <button key={m.id} onClick={() => setAiModel(m.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${aiModel === m.id ? '' : 'hover:bg-white/5'}`}
                    style={aiModel === m.id ? { background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)' } : { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="space-y-5">
              <div className="glass-card p-5 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Current Plan</h3>
                    <p className="text-xs text-emerald-400">Professional · Active</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-display font-bold text-white">$49</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
              </div>
              <div className="space-y-3">
                {plans.map(plan => (
                  <div key={plan.id} className="p-5 rounded-2xl" style={{ background: plan.current ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.02)', border: plan.current ? '1px solid rgba(59,130,246,0.25)' : '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{plan.name}</h4>
                      <p className="font-display font-bold text-white">{plan.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
