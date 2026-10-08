import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { setWorkspace, setOnboarded } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import type { Workspace } from '@/types';

const industries = ['Technology', 'Full Stack Development', 'E-commerce', 'Finance', 'Healthcare', 'Marketing', 'Manufacturing', 'Education', 'Real Estate', 'Consulting', 'Other'];
const sizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
const goals = [
  { label: 'Increase sales', icon: '📈', desc: 'Grow revenue and close more deals' },
  { label: 'Manage customers', icon: '👥', desc: 'Build stronger customer relationships' },
  { label: 'Automate operations', icon: '⚡', desc: 'Streamline repetitive business processes' },
  { label: 'Understand analytics', icon: '📊', desc: 'Make data-driven business decisions' },
  { label: 'Manage projects', icon: '📋', desc: 'Coordinate team and project work efficiently' },
];

export default function OnboardingPage() {
  const { user, setWorkspace: setWS, setOnboarded: setOB } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFinish = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));

    const finalName = businessName.trim() || (user?.name ? `${user.name}'s Workspace` : 'My Workspace');
    const ws: Workspace = {
      id: `ws_${Date.now()}`,
      name: finalName,
      industry: industry || 'Technology',
      size: size || '11-50',
      goal: goal || 'Increase sales',
      ownerId: user?.id || 'demo_user',
      plan: 'professional',
      createdAt: new Date().toISOString(),
    };

    setWorkspace(ws);
    setOnboarded();
    setWS(ws);
    setOB(true);

    toast.success(`Welcome to BADRA AI!`);
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-display font-bold text-white">BADRA AI</span>
      </div>

      <div className="w-full max-w-lg">
        {step === 1 && (
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-3">What's your business name?</h1>
            <input
              type="text"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              className="form-input text-lg py-4 mb-4"
              placeholder="e.g. Badra Tech"
            />
            <button onClick={() => setStep(2)} disabled={!businessName.trim()} className="btn-brand w-full py-3">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-3">Select your industry & size</h1>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {industries.map(ind => (
                <button key={ind} onClick={() => setIndustry(ind)} className={`px-4 py-2.5 rounded-xl text-sm ${industry === ind ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300'}`}>{ind}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {sizes.map(s => (
                <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-xl text-xs ${size === s ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300'}`}>{s} team</button>
              ))}
            </div>
            <button onClick={() => setStep(3)} disabled={!industry || !size} className="btn-brand w-full py-3">Continue <ArrowRight className="w-4 h-4" /></button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-3">Primary goal</h1>
            <div className="space-y-2 mb-6">
              {goals.map(g => (
                <button key={g.label} onClick={() => setGoal(g.label)} className={`w-full p-4 rounded-xl text-left flex items-center gap-3 ${goal === g.label ? 'bg-blue-600/20 border border-blue-500 text-white' : 'bg-white/5 text-gray-300'}`}>
                  <span>{g.icon}</span>
                  <div><p className="font-medium">{g.label}</p><p className="text-xs text-gray-500">{g.desc}</p></div>
                </button>
              ))}
            </div>
            <button onClick={handleFinish} disabled={!goal || loading} className="btn-brand w-full py-3">Launch Workspace <ArrowRight className="w-4 h-4" /></button>
          </div>
        )}
      </div>
    </div>
  );
}
