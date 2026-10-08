import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    toast.success('Reset instructions sent!');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-white">BADRA AI</span>
        </Link>

        {!sent ? (
          <>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Reset your password</h1>
            <p className="text-gray-400 mb-8">Enter your email and we'll send you reset instructions.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <button type="submit" disabled={loading} className="btn-brand w-full py-3">
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Instructions <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold text-white mb-3">Check your inbox</h1>
            <p className="text-gray-400 mb-8">We've sent password reset instructions to <strong className="text-white">{email}</strong></p>
          </div>
        )}

        <Link to="/login" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mt-8">
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
