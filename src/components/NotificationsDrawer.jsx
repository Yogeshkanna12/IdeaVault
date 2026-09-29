import React, { useState } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { 
  Bell, 
  CheckCheck, 
  Sparkles, 
  Flame, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Rocket
} from 'lucide-react';

export default function NotificationsDrawer({ isOpen, onClose }) {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    openProjectDetail,
    projects
  } = useIdeas();

  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    if (notif.ideaId) {
      const proj = projects.find(p => p.id === notif.ideaId);
      if (proj) {
        openProjectDetail(proj);
        onClose();
      }
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'vote':
        return <Flame className="w-4 h-4 text-amber-400" />;
      case 'application':
        return <Users className="w-4 h-4 text-brand-cyan" />;
      case 'recommendation':
        return <Sparkles className="w-4 h-4 text-brand-violet" />;
      case 'milestone':
        return <Rocket className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-brand-indigo" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose} 
      />

      {/* Drawer Container */}
      <div className="fixed top-16 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] max-h-[82vh] flex flex-col rounded-2xl bg-vault-900/95 border border-white/10 shadow-2xl backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-vault-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-indigo/20 flex items-center justify-center text-brand-cyan">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
              <p className="text-xs text-slate-400">
                {unreadNotificationsCount} unread alert{unreadNotificationsCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {unreadNotificationsCount > 0 && (
              <button
                onClick={markAllNotificationsAsRead}
                className="text-xs text-brand-cyan hover:text-brand-blue flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 py-2 bg-vault-950/30 border-b border-white/5">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === 'all' 
                ? 'bg-brand-indigo/30 text-brand-cyan border border-brand-indigo/40' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              filter === 'unread' 
                ? 'bg-brand-indigo/30 text-brand-cyan border border-brand-indigo/40' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Unread ({unreadNotificationsCount})
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1">
          {filteredNotifs.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-300 font-medium">All caught up!</p>
              <p className="text-xs text-slate-500 mt-1">No {filter === 'unread' ? 'unread ' : ''}notifications right now.</p>
            </div>
          ) : (
            filteredNotifs.map(notif => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`p-3 rounded-xl transition-all cursor-pointer flex gap-3 items-start group ${
                  notif.read ? 'hover:bg-white/5 opacity-75' : 'bg-brand-indigo/10 hover:bg-brand-indigo/15 border border-brand-indigo/20'
                }`}
              >
                <div className="p-2 rounded-lg bg-vault-800/80 border border-white/5 shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs font-semibold text-slate-100 truncate group-hover:text-brand-cyan transition-colors">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {notif.message}
                  </p>
                  {notif.ideaId && (
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] text-brand-cyan font-medium group-hover:underline">
                      <span>View project</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                </div>

                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-brand-cyan shrink-0 mt-1.5 shadow-glow-cyan" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-vault-950/60 text-center">
          <p className="text-[11px] text-slate-500">
            Real-time updates for votes, applications, and recommendations
          </p>
        </div>
      </div>
    </>
  );
}
