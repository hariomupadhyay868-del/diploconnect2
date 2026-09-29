'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, UserPlus, CheckCircle } from 'lucide-react';
import { BIHAR_COLLEGES, DIPLOMA_BRANCHES, SKILLS_CATALOG } from '@/lib/constants/colleges';
import { useToast } from '@/components/ui/Toast';

function DiscoverContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState(searchParams?.get('query') || '');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  const [students] = useState([
    {
      id: 'usr-1',
      name: 'Aarav Kumar',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      headline: 'CSE Diploma Student | Java | Web Development',
      collegeName: 'Government Polytechnic Patna-7',
      collegeId: 'gp-patna-7',
      branch: 'CSE',
      skills: ['Java', 'Python', 'HTML5', 'JavaScript', 'SQL'],
      verified: true,
    },
    {
      id: 'usr-2',
      name: 'Priya Kumari',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      headline: 'ECE Diploma Student | Embedded Systems & IoT',
      collegeName: "Women's Polytechnic Patna",
      collegeId: 'wgp-patna',
      branch: 'ECE',
      skills: ['Circuit Design', 'Arduino', 'Raspberry Pi', 'C++'],
      verified: true,
    },
    {
      id: 'usr-3',
      name: 'Rahul Kumar Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      headline: 'Mechanical Engineering Diploma Student | AutoCAD | SolidWorks',
      collegeName: 'Government Polytechnic Siwan',
      collegeId: 'gp-siwan',
      branch: 'ME',
      skills: ['AutoCAD', 'SolidWorks', 'CATIA', 'C'],
      verified: true,
    },
  ]);

  const filteredStudents = students.filter((student) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = student.name.toLowerCase().includes(q);
      const matchHeadline = student.headline.toLowerCase().includes(q);
      const matchCollege = student.collegeName.toLowerCase().includes(q);
      const matchSkill = student.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchHeadline && !matchCollege && !matchSkill) return false;
    }
    if (selectedBranch && student.branch !== selectedBranch) return false;
    if (selectedCollege && student.collegeId !== selectedCollege) return false;
    if (selectedSkill && !student.skills.includes(selectedSkill)) return false;
    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBranch('');
    setSelectedCollege('');
    setSelectedSkill('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Search Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Smart Student Discovery</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Search and connect with diploma students across Bihar by college, branch, or technical skills.</p>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search e.g. 'Java', 'CSE from GP Siwan', 'AutoCAD', 'Web Dev'..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-900 dark:text-white font-medium"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-semibold shrink-0">Popular:</span>
          <button onClick={() => setSelectedSkill('Java')} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition shrink-0">☕ Java</button>
          <button onClick={() => setSelectedBranch('CSE')} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition shrink-0">💻 CSE Branch</button>
          <button onClick={() => setSelectedCollege('gp-siwan')} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition shrink-0">🏫 GP Siwan</button>
          <button onClick={() => setSelectedSkill('AutoCAD')} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-indigo-50 hover:text-indigo-600 transition shrink-0">📐 AutoCAD</button>
          <button onClick={resetFilters} className="px-3 py-1 rounded-xl text-rose-600 dark:text-rose-400 font-semibold hover:underline shrink-0">Clear Filters</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span>Filter Criteria</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">State</label>
              <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium">
                <option value="BR">Bihar (Active)</option>
                <option value="UP" disabled>Uttar Pradesh (Coming Soon)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Diploma Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium"
              >
                <option value="">All Branches</option>
                {DIPLOMA_BRANCHES.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Polytechnic College</label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium"
              >
                <option value="">All Colleges</option>
                {BIHAR_COLLEGES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Technical Skill</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white font-medium"
              >
                <option value="">All Skills</option>
                {SKILLS_CATALOG.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Student Cards Results */}
        <div className="lg:col-span-9 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredStudents.length}</span> student profile(s)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredStudents.map((user) => (
              <div
                key={user.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 text-center shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
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
                  <p className="text-[11px] text-slate-400 mt-1">{user.collegeName}</p>

                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {user.skills.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => showToast('Connection request sent!', 'success')}
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
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-slate-400">Loading discovery...</div>}>
      <DiscoverContent />
    </Suspense>
  );
}
