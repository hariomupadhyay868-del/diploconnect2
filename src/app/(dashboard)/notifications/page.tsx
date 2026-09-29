'use client';

import React, { useState } from 'react';
import { Bell, CheckCheck, Users, ThumbsUp, Briefcase, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function NotificationsPage() {
  const { showToast } = useToast();

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'connection',
      title: 'New Connection Request',
      message: 'Rahul Kumar Sharma (GP Siwan) sent you a connection request.',
      time: '30 minutes ago',
      read: false
    },
    {
      id: 'notif-2',
      type: 'like',
      title: 'Post Liked',
      message: 'Priya Kumari and 3 others liked your project update post.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'notif-3',
      type: 'opportunity',
      title: 'New Internship Alert',
      message: 'BELTRON posted a new Diploma Web Dev Internship for CSE/IT students.',
      time: '5 hours ago',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Notification Center</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Stay updated on connection requests, likes, comments, and opportunities.</p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-xl hover:bg-indigo-100 transition flex items-center space-x-1"
        >
          <CheckCheck className="w-4 h-4" /> <span>Mark All as Read</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={`p-5 flex items-start space-x-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50 ${
              !notif.read ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 flex items-center justify-center text-lg shrink-0">
              {notif.type === 'connection' && <Users className="w-5 h-5 text-indigo-600" />}
              {notif.type === 'like' && <ThumbsUp className="w-5 h-5 text-indigo-600" />}
              {notif.type === 'opportunity' && <Briefcase className="w-5 h-5 text-indigo-600" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{notif.title}</h4>
                <span className="text-[10px] text-slate-400">{notif.time}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{notif.message}</p>
            </div>

            {!notif.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0 self-center" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
