'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Check, X, Building2, Plus, BarChart3 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { BIHAR_COLLEGES } from '@/lib/constants/colleges';

export default function AdminPortalPage() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'verification' | 'colleges' | 'opportunities' | 'analytics'>('verification');

  const [unverifiedStudents, setUnverifiedStudents] = useState([
    {
      id: 'usr-5',
      name: 'Vikas Kumar',
      email: 'vikas.ee@gpgaya.ac.in',
      collegeName: 'Government Polytechnic Gaya',
      branch: 'EE',
      status: 'Pending'
    }
  ]);

  const handleApprove = (id: string) => {
    setUnverifiedStudents(prev => prev.filter(s => s.id !== id));
    showToast('Student successfully verified!', 'success');
  };

  const handleReject = (id: string) => {
    setUnverifiedStudents(prev => prev.filter(s => s.id !== id));
    showToast('Student verification rejected', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Banner Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/30 text-amber-200 border border-amber-400/30 uppercase">
              Official Admin Portal
            </span>
          </div>
          <h1 className="text-2xl font-extrabold mt-1">State Technical Education Administration</h1>
          <p className="text-xs text-amber-200 mt-1">Verify polytechnic students, manage accredited Bihar colleges, moderate content, and post official drives.</p>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
            activeTab === 'verification'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Student Verification ({unverifiedStudents.length})
        </button>
        <button
          onClick={() => setActiveTab('colleges')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
            activeTab === 'colleges'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Colleges & Branches ({BIHAR_COLLEGES.length})
        </button>
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
            activeTab === 'opportunities'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          Post New Opportunity
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
            activeTab === 'analytics'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          State Analytics
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'verification' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Pending Student Verification Requests</h3>

          <div className="space-y-3">
            {unverifiedStudents.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No pending verification requests.</p>
            ) : (
              unverifiedStudents.map(u => (
                <div key={u.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{u.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{u.email} &bull; {u.branch} &bull; {u.collegeName}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleApprove(u.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-1"
                    >
                      <Check className="w-4 h-4" /> <span>Approve & Verify</span>
                    </button>
                    <button
                      onClick={() => handleReject(u.id)}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" /> <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'colleges' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Accredited Bihar Polytechnic Directory</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BIHAR_COLLEGES.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-start space-x-3">
                <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">{c.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{c.city}, Bihar &bull; {c.studentCount} Students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-semibold">Total Verified Students</span>
            <p className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">12,500+</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-semibold">Government Colleges</span>
            <p className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">{BIHAR_COLLEGES.length}</p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
            <span className="text-xs text-slate-400 font-semibold">Active Daily Connections</span>
            <p className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">1,420</p>
          </div>
        </div>
      )}

    </div>
  );
}
