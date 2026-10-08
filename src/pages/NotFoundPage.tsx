import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <p className="font-display text-8xl font-bold gradient-text-blue mb-4">404</p>
        <h1 className="font-display text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or was moved.</p>
        <Link to="/" className="btn-brand">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
