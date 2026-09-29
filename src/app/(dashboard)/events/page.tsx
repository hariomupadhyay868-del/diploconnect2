'use client';

import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function EventsPage() {
  const { showToast } = useToast();

  const events = [
    {
      id: 'evt-1',
      title: 'Masterclass: Getting Started with Java OOPs & Git for Diploma Students',
      organizer: 'CSE Branch Community - DiplomaConnect',
      date: 'Oct 5, 2026',
      time: '4:00 PM - 6:00 PM IST',
      mode: 'Online (Google Meet)',
      banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      description: 'A 2-hour interactive workshop covering essential Java object-oriented principles, project structure, and GitHub repository creation for polytechnic students.',
      attendeesCount: 142
    },
    {
      id: 'evt-2',
      title: 'AutoCAD 2D & 3D Industrial Design Bootcamp',
      organizer: 'GP Muzaffarpur Mechanical Club',
      date: 'Oct 12, 2026',
      time: '10:00 AM - 3:00 PM IST',
      mode: 'Offline @ GP Muzaffarpur Auditorium',
      banner: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      description: 'Hands-on CAD workshop focusing on mechanical component modeling, dimensioning, and blueprint reading.',
      attendeesCount: 88
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">State & Campus Events</h1>
          <p className="text-xs text-indigo-200 mt-1">Technical workshops, webinars, hackathons & inter-polytechnic coding contests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(evt => (
          <div key={evt.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between">
            <div>
              <div className="h-44 bg-slate-800 relative">
                <img src={evt.banner} alt={evt.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-indigo-600 text-white text-[10px] font-extrabold rounded-full shadow-md uppercase tracking-wider">{evt.mode}</span>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{evt.date} &bull; {evt.time}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{evt.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Organized by: <span className="font-semibold text-slate-700 dark:text-slate-300">{evt.organizer}</span></p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{evt.description}</p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">👥 {evt.attendeesCount} Registered</span>
              <button
                onClick={() => showToast('Successfully registered for event! Link sent to your email.', 'success')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
              >
                Register for Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
