'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserPlus, Check, X, Users } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function NetworkPage() {
  const { showToast } = useToast();

  const [requests, setRequests] = useState([
    {
      id: 'usr-3',
      name: 'Rahul Kumar Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      headline: 'ME Student @ Government Polytechnic Siwan',
      mutuals: 3,
      semester: '5th Semester'
    }
  ]);

  const [suggestions, setSuggestions] = useState([
    {
      id: 'usr-2',
      name: 'Priya Kumari',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      headline: 'ECE Diploma Student | IoT & Circuit Design',
      college: "Women's Polytechnic Patna",
      skills: ['Circuit Design', 'Arduino', 'Raspberry Pi'],
      verified: true
    },
    {
      id: 'usr-4',
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      headline: 'Civil Engineering Diploma | STAAD Pro | Surveying',
      college: 'Government Polytechnic Muzaffarpur',
      skills: ['STAAD Pro', 'AutoCAD', 'Surveying'],
      verified: true
    }
  ]);

  const handleAccept = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    showToast('Connection request accepted!', 'success');
  };

  const handleIgnore = (id: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    showToast('Request ignored', 'info');
  };

  const handleConnect = (id: string) => {
    showToast('Connection request sent!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">My Student Network</h1>
          <p className="text-xs text-indigo-200 mt-1">Connect with polytechnic peers across Bihar to collaborate on projects & opportunities.</p>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-center">
          <div className="px-4 py-2 bg-indigo-950/60 rounded-2xl border border-indigo-700/60">
            <span className="block text-xl font-bold">42</span>
            <span className="text-[10px] text-indigo-300 uppercase">Connections</span>
          </div>
        </div>
      </div>

      {/* Pending Connection Requests */}
      {requests.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Pending Connection Requests ({requests.length})
          </h3>

          <div className="space-y-4">
            {requests.map(req => (
              <div key={req.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link href={`/profile/${req.id}`} className="flex items-center space-x-3">
                  <img src={req.avatar} alt={req.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{req.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{req.headline}</p>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">{req.mutuals} Mutual Connections &bull; {req.semester}</p>
                  </div>
                </Link>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center space-x-1"
                  >
                    <Check className="w-4 h-4" /> <span>Accept</span>
                  </button>
                  <button
                    onClick={() => handleIgnore(req.id)}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-300 transition"
                  >
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Connections Grid */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">People You May Know Across Bihar</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Expand your network with top diploma students.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {suggestions.map(user => (
            <div key={user.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 text-center shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover ring-2 ring-indigo-500/20" />
                  {user.verified && (
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white font-bold">✓</span>
                  )}
                </div>
                <Link href={`/profile/${user.id}`} className="font-bold text-slate-900 dark:text-white text-sm hover:text-indigo-600 transition">
                  {user.name}
                </Link>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5 line-clamp-1">{user.headline}</p>
                <p className="text-[11px] text-slate-400 mt-1">{user.college}</p>

                <div className="mt-3 flex flex-wrap justify-center gap-1">
                  {user.skills.map(s => (
                    <span key={s} className="px-2 py-0.5 text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleConnect(user.id)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center space-x-1"
                >
                  <UserPlus className="w-4 h-4" /> <span>Connect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
