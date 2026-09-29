'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { DIPLOMA_BRANCHES } from '@/lib/constants/colleges';
import { Download, ExternalLink, BookOpen, Users, Code } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function BranchCommunityPage() {
  const params = useParams();
  const { showToast } = useToast();
  const code = ((params?.code as string) || 'CSE').toUpperCase();
  const branchObj = DIPLOMA_BRANCHES.find((b) => b.code === code) || DIPLOMA_BRANCHES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Selector Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {DIPLOMA_BRANCHES.map((b) => (
          <Link
            key={b.code}
            href={`/communities/${b.code}`}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold shrink-0 transition ${
              b.code === code
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {b.name}
          </Link>
        ))}
      </div>

      {/* Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
            {code} Engineering Community
          </span>
          <h1 className="text-3xl font-extrabold">{branchObj.name} Community</h1>
          <p className="text-sm text-indigo-100 leading-relaxed">
            Hub for diploma students across Bihar polytechnics to collaborate on lab practicals, final-year projects, code repositories, and placements.
          </p>
          <div className="pt-2 flex items-center space-x-4 text-xs font-semibold text-indigo-200">
            <span>👥 1,850+ Diploma Members</span>
            <span>📚 Curated Study Materials</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Popular Discussion Topics in {code}</h3>
            <div className="flex flex-wrap gap-2">
              {['Java OOPs', 'Web Development', 'Python', 'Database Management', 'SBTE Lab Practical Help'].map((t) => (
                <span key={t} className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/60">
                  # {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Curated SBTE {code} Resources</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📑</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">SBTE 5th Semester Complete Lab Manual & Viva Prep</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">PDF Notes & Experiment Solutions</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Downloading SBTE Lab Manual PDF...', 'success')}
                  className="px-3.5 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" /> <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Active Branch Members</h3>
            <div className="space-y-3">
              <Link href="/profile/usr-1" className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-3 cursor-pointer hover:bg-slate-100 transition">
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80" alt="Aarav" className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">Aarav Kumar</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">GP Patna-7 &bull; 5th Sem</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
