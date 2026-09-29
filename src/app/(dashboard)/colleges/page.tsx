import React from 'react';
import Link from 'next/link';
import { BIHAR_COLLEGES } from '@/lib/constants/colleges';
import { Building2, Users, MapPin, ExternalLink } from 'lucide-react';

export default function CollegesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Polytechnic Colleges in Bihar</h1>
          <p className="text-xs text-indigo-200 mt-1">Explore SBTE Bihar accredited government diploma engineering institutes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BIHAR_COLLEGES.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="h-32 bg-slate-800 relative">
                <img src={c.banner} alt={c.name} className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <img src={c.logo} alt={c.name} className="w-14 h-14 rounded-xl object-cover absolute bottom-3 left-4 ring-2 ring-white bg-white" />
              </div>

              <div className="p-5 space-y-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-md">
                  {c.code}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{c.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" /> {c.city}, Bihar &bull; Est. {c.established}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">{c.about}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {c.branches.map((b) => (
                    <span key={b} className="px-2 py-0.5 text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 mt-4">
              <span className="text-xs font-semibold text-slate-500">👥 {c.studentCount} Enrolled</span>
              <Link
                href={`/colleges/${c.id}`}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition"
              >
                Visit Hub &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
