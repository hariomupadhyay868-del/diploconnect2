'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BIHAR_COLLEGES, DIPLOMA_BRANCHES } from '@/lib/constants/colleges';
import { MapPin, Globe, ExternalLink, Users, BookOpen, Bell } from 'lucide-react';

export default function CollegeDetailPage() {
  const params = useParams();
  const collegeId = (params?.id as string) || 'gp-patna-7';
  const college = BIHAR_COLLEGES.find((c) => c.id === collegeId) || BIHAR_COLLEGES[0];

  const collegeStudents = [
    {
      id: 'usr-1',
      name: 'Aarav Kumar',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      branch: 'CSE',
      semester: '5th Semester',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* College Banner Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="h-48 sm:h-64 relative bg-slate-800">
          <img src={college.banner} alt={college.name} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="flex items-end space-x-4">
              <img src={college.logo} alt={college.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white/20 shadow-xl bg-white" />
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-3xl font-extrabold">{college.name}</h1>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-500/30 text-indigo-200 rounded-md border border-indigo-400/30">{college.code}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">{college.city}, Bihar &bull; Established {college.established} &bull; {college.type}</p>
              </div>
            </div>

            <a href={college.website} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl backdrop-blur-md transition flex items-center space-x-1">
              <Globe className="w-4 h-4" /> <span>Official Website</span> <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
          <div>
            <span className="block font-extrabold text-indigo-600 dark:text-indigo-400 text-lg">{college.studentCount}</span>
            <span className="text-slate-500 dark:text-slate-400">Total Enrolled Students</span>
          </div>
          <div>
            <span className="block font-extrabold text-indigo-600 dark:text-indigo-400 text-lg">{college.branches.length}</span>
            <span className="text-slate-500 dark:text-slate-400">Diploma Branches</span>
          </div>
          <div>
            <span className="block font-extrabold text-indigo-600 dark:text-indigo-400 text-lg">100%</span>
            <span className="text-slate-500 dark:text-slate-400">SBTE Bihar Accredited</span>
          </div>
          <div>
            <span className="block font-extrabold text-indigo-600 dark:text-indigo-400 text-lg">Active</span>
            <span className="text-slate-500 dark:text-slate-400">Placement Cell</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">About {college.name}</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{college.about}</p>
            <p className="text-xs text-slate-400 mt-3 font-medium">Address: {college.address}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Offered Engineering Branches</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {college.branches.map((bCode) => {
                const bObj = DIPLOMA_BRANCHES.find((b) => b.code === bCode);
                return (
                  <Link
                    key={bCode}
                    href={`/communities/${bCode}`}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-400 cursor-pointer transition flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{bObj ? bObj.name : bCode}</h4>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{bCode} Branch</span>
                    </div>
                    <span className="text-indigo-500 font-bold">&rarr;</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Campus Announcements</h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60">
                <span className="px-2 py-0.5 text-[9px] font-bold bg-indigo-600 text-white rounded-md">SBTE Notice</span>
                <h5 className="font-bold text-slate-900 dark:text-white text-xs mt-2">5th Semester Practical Exam Schedule</h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">SBTE Bihar winter exam timetable released. Verify lab journals before Oct 10.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
