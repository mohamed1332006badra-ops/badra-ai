import React, { useState } from 'react';
import { Bell, CheckCheck, X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { mockNotifications } from '@/lib/mockData';
import { timeAgo } from '@/lib/utils';
import { toast } from 'sonner';

const categoryColors: Record<string, string> = {
  crm: '#3b82f6',
  deals: '#22c55e',
  analytics: '#8b5cf6',
  ai: '#60a5fa',
  system: '#f59e0b',
};

const typeIcons: Record<string, { icon: React.ElementType; color: string }> = {
  info: { icon: Info, color: '#3b82f6' },
  success: { icon: CheckCircle, color: '#22c55e' },
  warning: { icon: AlertTriangle, color: '#f59e0b' },
  alert: { icon: AlertCircle, color: '#ef4444' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const dismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filtered = notifications.filter(n => filter === 'all' || !n.read);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {unreadCount} unread · {notifications.length} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(['all', 'unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${filter === f ? 'text-blue-300' : 'text-muted-foreground hover:text-foreground'}`}
                style={filter === f ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {f}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <CheckCheck className="w-3.5 h-3.5" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-16 rounded-2xl text-center">
          <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-medium text-foreground mb-2">All caught up!</p>
          <p className="text-sm text-muted-foreground">No {filter === 'unread' ? 'unread ' : ''}notifications</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(notification => {
            const { icon: Icon, color } = typeIcons[notification.type] || typeIcons.info;
            return (
              <div
                key={notification.id}
                className={`glass-card p-4 rounded-2xl transition-all duration-150 ${!notification.read ? 'cursor-pointer hover:bg-white/5' : ''}`}
                style={!notification.read ? { borderColor: 'rgba(59,130,246,0.15)' } : {}}
                onClick={() => !notification.read && markRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                          )}
                          <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-foreground/80'}`}>
                            {notification.title}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); dismiss(notification.id); }}
                        className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{ background: `${categoryColors[notification.category]}15`, color: categoryColors[notification.category] }}
                      >
                        {notification.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
