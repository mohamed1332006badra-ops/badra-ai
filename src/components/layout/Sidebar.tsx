import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Bot,
  Users,
  UserCheck,
  Contact,
  Handshake,
  FolderKanban,
  BarChart3,
  Zap,
  FileText,
  Bell,
  Settings,
  X,
  ChevronRight,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { getInitials } from '@/lib/utils';
import { toast } from 'sonner';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  key?: string;
  dividerKey?: string;
  icon?: React.ElementType;
  path?: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { key: 'overview', icon: LayoutDashboard, path: '/app' },
  { key: 'ai_assistant', icon: Bot, path: '/app/ai', badge: 'AI' },
  { dividerKey: 'divider_crm' },
  { key: 'crm', icon: Contact, path: '/app/crm' },
  { key: 'leads', icon: UserCheck, path: '/app/leads' },
  { key: 'customers', icon: Users, path: '/app/customers' },
  { key: 'deals', icon: Handshake, path: '/app/deals' },
  { dividerKey: 'divider_work' },
  { key: 'projects', icon: FolderKanban, path: '/app/projects' },
  { key: 'analytics', icon: BarChart3, path: '/app/analytics' },
  { key: 'automations', icon: Zap, path: '/app/automations' },
  { key: 'reports', icon: FileText, path: '/app/reports' },
  { dividerKey: 'divider_account' },
  { key: 'notifications', icon: Bell, path: '/app/notifications', badge: '4' },
  { key: 'settings', icon: Settings, path: '/app/settings' },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user, workspace, logout } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully');
    navigate('/');
  };

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-base text-foreground tracking-tight">BADRA AI</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {workspace && (
        <div className="mx-3 mb-3 px-3 py-2 rounded-xl flex items-center gap-2" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}>
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{workspace.name[0]}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-foreground truncate">{workspace.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{workspace.plan} {t('plan')}</p>
          </div>
          <ChevronRight className="w-3 h-3 text-muted-foreground ml-auto rtl:rotate-180 flex-shrink-0" />
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {navItems.map((item, i) => {
          if (item.dividerKey) {
            return (
              <p key={i} className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest mt-5 mb-1.5 px-3">
                {t(item.dividerKey)}
              </p>
            );
          }

          const Icon = item.icon!;
          const label = item.key ? t(item.key) : '';

          return (
            <NavLink
              key={item.path}
              to={item.path!}
              end={item.path === '/app'}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''} group`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1 text-sm">{label}</span>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  item.badge === 'AI'
                    ? 'text-blue-400 bg-blue-500/15 border border-blue-500/20'
                    : 'text-white bg-blue-500 min-w-[18px] text-center'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-3 pb-5">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
            {user ? getInitials(user.name) : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-red-400 transition-colors p-1"
            title={t('logout')}
          >
            <LogOut className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </aside>
  );
}
