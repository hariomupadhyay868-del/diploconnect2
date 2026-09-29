import React from 'react';
import Link from 'next/link';
import { MainHeader } from '@/components/layout/MainHeader';
import { BIHAR_COLLEGES } from '@/lib/constants/colleges';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader currentUser={null} />

      <main className="flex-1 space-y-16 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-12 md:pt-16 md:pb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>Exclusive Platform for Polytechnic & Diploma Students in Bihar</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
              Build Your <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 dark:from-indigo-400 dark:to-indigo-200 bg-clip-text text-transparent">Professional Network</span> Before You Graduate.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Connect with fellow diploma students across SBTE Bihar colleges, showcase your projects, get verified skills, discover internships, and kickstart your engineering career.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transform hover:-translate-y-0.5 transition duration-150 text-base text-center"
              >
                Join the Network
              </Link>

              <Link
                href="/colleges"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 shadow-sm transition text-base text-center"
              >
                Explore Colleges
              </Link>
            </div>

            {/* Instant Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 max-w-md mx-auto">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                Instant Demo Credentials
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href="/auth/login?demo=student"
                  className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-100 transition"
                >
                  ⚡ Demo Student Login
                </Link>
                <Link
                  href="/auth/login?demo=admin"
                  className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 transition"
                >
                  🛡️ Demo Admin Portal
                </Link>
              </div>
            </div>

            {/* Stats Banner */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">12,500+</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Diploma Students</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">46</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Govt Polytechnics in Bihar</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">10 Branch</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Specialized Communities</p>
              </div>
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">450+</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Internship Opportunities</p>
              </div>
            </div>

          </div>
        </section>

        {/* Colleges Grid Highlight */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Participating Polytechnics in Bihar</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Pre-loaded SBTE accredited government colleges.</p>
            </div>
            <Link href="/colleges" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All Colleges &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BIHAR_COLLEGES.map((c) => (
              <Link
                key={c.id}
                href={`/colleges/${c.id}`}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition cursor-pointer flex items-start space-x-4"
              >
                <img src={c.logo} alt={c.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">{c.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.city}, Bihar &bull; {c.studentCount} Students</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.branches.slice(0, 4).map((b) => (
                      <span key={b} className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 rounded-md">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
