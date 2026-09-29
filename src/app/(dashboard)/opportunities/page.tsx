'use client';

import React, { useState } from 'react';
import { Briefcase, Calendar, DollarSign, Send } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';

export default function OpportunitiesPage() {
  const { showToast } = useToast();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [coverNote, setCoverNote] = useState('');

  const opportunities = [
    {
      id: 'opp-1',
      title: 'Diploma Web Development Intern',
      organization: 'Bihar State Electronics Development Corp (BELTRON)',
      type: 'Internship',
      workMode: 'Hybrid (Patna / Remote)',
      duration: '3 Months',
      stipend: '₹8,000 / month',
      deadline: '2026-10-15',
      eligibility: 'CSE / IT Diploma Students (4th or 5th Semester)',
      skillsRequired: ['HTML5', 'CSS3', 'JavaScript', 'SQL Basics'],
      description: 'Looking for enthusiastic diploma students in Computer Science and IT to assist in front-end development and internal database maintenance for state technical portals.',
    },
    {
      id: 'opp-2',
      title: 'Junior CAD Designer / Drafter Trainee',
      organization: 'Patna Infrastructure Solutions',
      type: 'Apprenticeship',
      workMode: 'On-site (Patna)',
      duration: '6 Months',
      stipend: '₹10,000 / month',
      deadline: '2026-10-20',
      eligibility: 'Civil & Mechanical Diploma Passed out / 6th Sem',
      skillsRequired: ['AutoCAD', 'SolidWorks', 'Revit'],
      description: 'Great hands-on opportunity for Civil and Mechanical polytechnic graduates to draft architectural and structural layouts under senior engineers.',
    },
    {
      id: 'opp-3',
      title: 'State Inter-Polytechnic Hackathon 2026',
      organization: 'Department of Science, Tech & Technical Edu, Bihar',
      type: 'Hackathon',
      workMode: 'Offline (GP Patna-7)',
      duration: '2 Days Event',
      stipend: 'Prize Pool: ₹1,50,000',
      deadline: '2026-10-30',
      eligibility: 'All Polytechnic Students in Bihar (Any Branch)',
      skillsRequired: ['Innovation', 'Problem Solving', 'Coding / Hardware Prototyping'],
      description: 'Showcase your hardware or software solutions to solve real problems in Bihar agriculture, flood alert systems, e-governance, or rural electrification.',
    }
  ];

  const filteredOpps = activeFilter === 'All' ? opportunities : opportunities.filter(o => o.type === activeFilter);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Application submitted successfully! Recruiter notified.', 'success');
    setSelectedOpp(null);
    setCoverNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Diploma Opportunities Hub</h1>
          <p className="text-xs text-indigo-200 mt-1">Verified internships, apprenticeships, hackathons & vocational training curated for polytechnic engineers.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {['All', 'Internship', 'Apprenticeship', 'Hackathon'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition ${
              activeFilter === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {tab === 'All' ? 'All Opportunities' : tab + 's'}
          </button>
        ))}
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map((opp) => (
          <div
            key={opp.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 uppercase tracking-wider">
                  {opp.type}
                </span>
                <span className="text-[11px] font-medium text-slate-400">Deadline: {opp.deadline}</span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base mt-3 leading-snug">{opp.title}</h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">{opp.organization} &bull; <span className="text-slate-400 font-normal">{opp.workMode}</span></p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">{opp.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <div><span className="font-bold text-slate-700 dark:text-slate-300">Stipend / Prize:</span> {opp.stipend}</div>
                <div><span className="font-bold text-slate-700 dark:text-slate-300">Eligibility:</span> {opp.eligibility}</div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {opp.skillsRequired.map((s) => (
                  <span key={s} className="px-2 py-0.5 text-[9px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedOpp(opp)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      <Modal isOpen={!!selectedOpp} onClose={() => setSelectedOpp(null)} title={`Apply for ${selectedOpp?.title || ''}`}>
        <form onSubmit={handleApplySubmit} className="space-y-4">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200">
            Applying as <span className="font-bold">Aarav Kumar</span> (CSE @ GP Patna-7)
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Cover Note / Statement of Interest</label>
            <textarea
              rows={4}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Briefly describe your relevant skills and interest in this role..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border rounded-2xl text-xs text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3">
            <button type="button" onClick={() => setSelectedOpp(null)} className="px-4 py-2 text-xs text-slate-500">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl">Submit Application</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
