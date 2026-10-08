import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Bot, ChevronDown, Languages } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials } from '@/lib/utils';
import { mockNotifications } from '@/lib/mockData';

interface TopNavProps {
  onMenuToggle: () => void;
}

const routeTitleKeys: Record<string, string> = {
  '/app': 'overview',
  '/app/ai': 'ai_assistant',
  '/app/crm': 'crm',
  '/app/leads': 'leads',
  '/app/customers': 'customers',
  '/app/deals': 'deals',
  '/app/projects': 'projects',
  '/app/analytics': 'analytics',
  '/app/automations': 'automations',
  '/app/reports': 'reports',
  '/app/notifications': 'notifications',
  '/app/settings': 'settings',
};

export default function TopNav({ onMenuToggle }: TopNavProps) {
  const { user } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchFocused, setSearchFocused] = useState(false);

  const titleKey = routeTitleKeys[location.pathname];
  const title = titleKey ? t(titleKey) : 'BADRA AI';
  const unread = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="top-nav">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="font-display font-semibold text-foreground text-base hidden sm:block">{title}</h1>

      <div className={`flex-1 max-w-sm relative transition-all duration-200 ${searchFocused ? 'max-w-md' : ''}`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rtl:left-auto rtl:right-3" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-sm rounded-xl outline-none transition-all duration-150"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: searchFocused ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
            color: 'hsl(var(--foreground))',
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      <div className="flex items-center gap-2.5 ml-auto rtl:ml-0 rtl:mr-auto">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all duration-150"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          title={language === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
        >
          <Languages className="w-3.5 h-3.5 text-blue-400" />
          <span>{language === 'ar' ? 'English' : 'العربية'}</span>
        </button>

        <button
          onClick={() => navigate('/app/ai')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 transition-all duration-150"
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>{t('ask_ai')}</span>
        </button>

        <button
          onClick={() => navigate('/app/notifications')}
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('/app/settings')}
          className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          >
            {user ? getInitials(user.name) : 'U'}
          </div>
          <span className="text-sm text-foreground hidden sm:block max-w-[100px] truncate">{user?.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
