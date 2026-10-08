import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { login, createDemoAccount, getWorkspace } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setWorkspace } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 600));

    const user = login(email, password);
    if (!user) {
      setError('Invalid email or password. Try the demo account.');
      setLoading(false);
      return;
    }

    setUser(user);
    toast.success(`Welcome back, ${user.name}!`);
    const isOnboarded = localStorage.getItem('badra_onboarded') === 'true';
    navigate(isOnboarded ? '/app' : '/onboarding');
  };

  const handleDemo = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const user = createDemoAccount();
    setUser(user);
    setWorkspace(getWorkspace());
    toast.success('Welcome to BADRA AI demo!');
    navigate('/app');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white text-lg">BADRA AI</span>
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-gray-400 mb-8">Sign in to your workspace</p>

        <button
          onClick={handleDemo}
          disabled={loading}
          className="w-full mb-6 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}
        >
          <Sparkles className="w-4 h-4" />
          Explore with Demo Account
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="btn-brand w-full py-3">
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Sign In <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Start for free
          </Link>
        </p>
      </div>
    </div>
  );
}
