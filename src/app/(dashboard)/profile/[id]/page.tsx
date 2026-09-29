'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Edit3, Plus, CheckCircle, ExternalLink, Award, FileText, Briefcase } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { Modal } from '@/components/ui/Modal';

export default function ProfilePage() {
  const params = useParams();
  const { showToast } = useToast();

  const [profileUser, setProfileUser] = useState({
    id: (params?.id as string) || 'usr-1',
    name: 'Aarav Kumar',
    headline: 'CSE Diploma Student | Java | Web Development | Open to Internships',
    about: 'Enthusiastic 5th-semester Computer Science Diploma student at GP Patna-7 with a strong passion for full-stack web development and Java OOPs. Active contributor to college coding events and open-source projects.',
    collegeName: 'Government Polytechnic Patna-7',
    branchName: 'Computer Science & Engineering',
    semester: '5th Semester',
    gradYear: 2026,
    state: 'BR',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
    skills: ['Java', 'Python', 'HTML5', 'CSS3', 'JavaScript', 'SQL', 'Git & GitHub'],
    projects: [
      {
        id: 'proj-1',
        title: 'SBTE Exam Result Portal Companion',
        description: 'A responsive web dashboard for Bihar diploma students to easily calculate Semester SGPA, CGPA and track subject credits.',
        tech: ['JavaScript', 'HTML5', 'Tailwind CSS', 'LocalStorage'],
        github: 'https://github.com/aarav-dev/sbte-result-helper',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        title: 'Java Programming Masterclass',
        org: 'NPTEL / IIT Kharagpur',
        issueDate: 'May 2024',
        credentialId: 'NPTEL24CS5678'
      }
    ]
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(profileUser.name);
  const [editHeadline, setEditHeadline] = useState(profileUser.headline);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileUser(prev => ({ ...prev, name: editName, headline: editHeadline }));
    showToast('Profile details updated', 'success');
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="h-44 sm:h-56 bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-900 relative">
          <img src={profileUser.banner} alt="Banner" className="w-full h-full object-cover opacity-60" />
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 gap-4">
            <div className="flex items-end space-x-4">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl bg-white"
              />
              <div className="hidden sm:block pb-2">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{profileUser.name}</h1>
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Verified Student
                  </span>
                </div>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{profileUser.headline}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 pt-2 sm:pt-0">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-4 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
            <div>🏫 <span className="font-medium">{profileUser.collegeName}</span></div>
            <div>💻 <span className="font-medium">{profileUser.branchName} ({profileUser.semester})</span></div>
            <div>📍 <span className="font-medium">Bihar, India &bull; Grad {profileUser.gradYear}</span></div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">About</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">{profileUser.about}</p>
      </div>

      {/* Skills Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Technical & Professional Skills</h3>
        <div className="flex flex-wrap gap-2">
          {profileUser.skills.map(skill => (
            <span key={skill} className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-1.5">
              <span>⚡</span>
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Projects</h3>
        <div className="space-y-4">
          {profileUser.projects.map(proj => (
            <div key={proj.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col md:flex-row gap-4">
              {proj.image && <img src={proj.image} alt={proj.title} className="w-full md:w-44 h-32 rounded-xl object-cover" />}
              <div className="flex-1 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-base">{proj.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{proj.description}</p>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                    <span>GitHub Repository</span> <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Headline</label>
            <input
              type="text"
              value={editHeadline}
              onChange={(e) => setEditHeadline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-3">
            <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-xs text-slate-500">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl">Save Changes</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
