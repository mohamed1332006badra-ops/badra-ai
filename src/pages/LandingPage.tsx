import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  Users,
  Zap,
  Bot,
  Shield,
  TrendingUp,
  ChevronDown,
  Check,
  Star,
  Play,
  Globe,
  Database,
  Lock,
  Layers,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FloatingMetric({ label, value, trend, delay = 0 }: { label: string; value: string; trend?: string; delay?: number }) {
  return (
    <div
      className="px-4 py-3 rounded-xl text-left"
      style={{
        background: 'rgba(15,17,25,0.9)',
        border: '1px solid rgba(59,130,246,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
        animationDelay: `${delay}ms`,
      }}
    >
      <p className="text-xs text-blue-400/70 mb-1">{label}</p>
      <p className="text-lg font-bold text-white font-display">{value}</p>
      {trend && <p className="text-xs text-emerald-400 mt-0.5">{trend}</p>}
    </div>
  );
}

const features = [
  {
    icon: Bot,
    title: 'AI Business Assistant',
    desc: 'Ask anything about your business. Get intelligent insights, forecasts, and recommendations powered by AI.',
    color: '#3b82f6',
  },
  {
    icon: Users,
    title: 'Smart CRM',
    desc: 'Unified view of all your customers, leads, and deals. AI-powered lead scoring and pipeline management.',
    color: '#8b5cf6',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    desc: 'Real-time dashboards with revenue, conversion, and customer growth metrics at a glance.',
    color: '#22c55e',
  },
  {
    icon: Zap,
    title: 'Business Automation',
    desc: 'Build powerful workflows that run automatically. From lead capture to customer onboarding.',
    color: '#f59e0b',
  },
  {
    icon: Layers,
    title: 'Project Management',
    desc: 'Kanban boards, task tracking, and team coordination — all integrated with your business data.',
    color: '#ec4899',
  },
  {
    icon: Database,
    title: 'Unified Data Platform',
    desc: 'All your business data in one place. No more switching between tools or losing context.',
    color: '#06b6d4',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, NexaTech Solutions',
    avatar: 'SC',
    content: 'BADRA AI completely transformed how we manage our sales pipeline. The AI assistant identified $200K in untapped opportunities in our first week.',
    stars: 5,
  },
  {
    name: 'Marcus Webb',
    role: 'VP Sales, Vertex Capital',
    avatar: 'MW',
    content: 'We replaced 4 separate tools with BADRA AI. Our team productivity increased by 40% and deal close rate went up significantly.',
    stars: 5,
  },
  {
    name: 'Amira Hassan',
    role: 'COO, Global Logistics Co.',
    avatar: 'AH',
    content: 'The automation builder is incredible. We automated 80% of our repetitive workflows in a single afternoon. ROI was immediate.',
    stars: 5,
  },
];

const pricing = [
  {
    name: 'Starter',
    price: 19,
    desc: 'Perfect for small teams getting started',
    features: ['Up to 5 users', '500 customers', 'Basic CRM', 'Analytics dashboard', 'Email support'],
    cta: 'Start Free Trial',
    featured: false,
  },
  {
    name: 'Professional',
    price: 49,
    desc: 'For growing businesses that need more power',
    features: ['Up to 25 users', 'Unlimited customers', 'Full CRM suite', 'AI Assistant', 'Automation builder', 'Advanced analytics', 'Priority support'],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Business',
    price: 99,
    desc: 'Enterprise-grade for serious companies',
    features: ['Unlimited users', 'Unlimited everything', 'Custom AI models', 'API access', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee'],
    cta: 'Contact Sales',
    featured: false,
  },
];

const faqs = [
  { q: 'How does the AI Assistant work?', a: 'The AI Assistant analyzes all your business data in real-time and provides intelligent insights, recommendations, and forecasts. Simply ask questions in natural language.' },
  { q: 'Can I migrate from my existing CRM?', a: 'Yes. BADRA AI supports CSV imports and direct integrations with major CRM platforms. Our team can assist with data migration.' },
  { q: 'Is my data secure?', a: 'Absolutely. All data is encrypted at rest and in transit. We are SOC2 compliant and follow enterprise security standards.' },
  { q: 'Do I need technical skills to use automations?', a: 'No coding required. Our visual automation builder lets you create powerful workflows with drag-and-drop simplicity.' },
  { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. No long-term commitments required.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const statsRef = useInView();
  const revenue = useCounter(128430, 2000, statsRef.inView);
  const customers = useCounter(4892, 2000, statsRef.inView);
  const automations = useCounter(847, 2000, statsRef.inView);

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white font-sans">
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4"
        style={{ background: 'rgba(10,11,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base text-white tracking-tight">BADRA AI</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#ai" className="hover:text-white transition-colors">AI Platform</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2">
            Sign In
          </Link>
          <Link to="/register" className="btn-brand text-sm py-2 px-5">
            Start Building
          </Link>
        </div>
      </nav>

      <section className="hero-bg relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
        <div className="bg-dot-pattern absolute inset-0 opacity-30" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium text-blue-300"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Business Operating System</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            <span className="block">BADRA</span>
            <span className="gradient-text">AI</span>
          </h1>

          <p className="text-xl sm:text-2xl font-display font-light text-gray-300 mb-4">
            Where AI Works, You Thrive.
          </p>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            One intelligent workspace to manage your customers, sales, projects, analytics and business automation. Built for ambitious SMBs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={() => navigate('/register')} className="btn-brand text-base px-8 py-4">
              <Sparkles className="w-4 h-4" />
              Start Building
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-gray-300 hover:text-white transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Play className="w-4 h-4" />
              Explore Platform
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
