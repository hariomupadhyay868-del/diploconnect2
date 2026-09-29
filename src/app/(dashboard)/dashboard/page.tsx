'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Users, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function StudentDashboardPage() {
  const { showToast } = useToast();

  const currentUser = {
    name: 'Aarav Kumar',
    collegeName: 'Government Polytechnic Patna-7',
    branch: 'CSE',
    connectionsCount: 42,
    verificationStatus: 'Verified',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Welcome back, {currentUser.name}!</h1>
          <p className="text-xs text-indigo-200 mt-1">{currentUser.branch} Student &bull; {currentUser.collegeName}</p>
        </div>
        <Link
          href="/profile/usr-1"
          className="px-5 py-2.5 bg-white text-indigo-900 text-xs font-bold rounded-xl hover:bg-indigo-50 transition shadow-md shrink-0 flex items-center space-x-1"
        >
          <span>View My Profile</span> <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Profile Views</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">128</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">↑ +14% this week</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Connections</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{currentUser.connectionsCount}</p>
          <span className="text-[10px] text-indigo-600 font-semibold mt-1 inline-block">Polytechnic Peers</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Post Impressions</span>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">540</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">↑ High Engagement</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold text-slate-400">Verification Status</span>
          <p className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">{currentUser.verificationStatus}</p>
          <span className="text-[10px] text-slate-400 mt-1 inline-block">College Verified</span>
        </div>
      </div>

      {/* Profile Completeness Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Profile Completeness Checklist</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Complete these tasks to increase recruiter visibility for upcoming campus drives.</p>
          </div>
          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl">85% Complete</span>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 text-xs">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">✓ Basic Info & Predefined College Selected</span>
            <span className="text-emerald-600 font-bold">Done</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 text-xs">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">✓ Added 5+ Technical Skills (Java, HTML5, SQL)</span>
            <span className="text-emerald-600 font-bold">Done</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-xs">
            <span className="font-semibold text-amber-800 dark:text-amber-300">○ Add 1 more Project with GitHub link</span>
            <Link href="/profile/usr-1" className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold">Add Project</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
