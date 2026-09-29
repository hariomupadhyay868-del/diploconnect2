'use client';

import React, { useState } from 'react';
import { MainHeader } from '@/components/layout/MainHeader';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showToast } = useToast();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('General');
  const [postMediaUrl, setPostMediaUrl] = useState('');

  // Demo current user context
  const currentUser = {
    id: 'usr-1',
    name: 'Aarav Kumar',
    email: 'aarav.cse@gpp7.edu.in',
    headline: 'CSE Student @ GP Patna-7',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    role: 'student',
    verified: true,
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) {
      showToast('Please enter post content', 'warning');
      return;
    }

    showToast('Post published successfully!', 'success');
    setPostContent('');
    setPostMediaUrl('');
    setIsPostModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <MainHeader currentUser={currentUser} />

      <main className="flex-1 pb-20 md:pb-8">
        {children}
      </main>

      <MobileBottomNav
        currentUserId={currentUser.id}
        onOpenCreatePost={() => setIsPostModalOpen(true)}
      />

      {/* Global Create Post Modal */}
      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        title="Create a Post"
      >
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{currentUser.name}</h4>
              <select
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value)}
                className="text-xs bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-2 py-1 text-slate-600 dark:text-slate-300 font-medium"
              >
                <option value="General">General Update</option>
                <option value="Project Update">💻 Project Showcase</option>
                <option value="Certification Share">📜 Certification</option>
                <option value="Internship Experience">🚀 Internship Story</option>
                <option value="Technical Resource">📚 Resource / Notes</option>
              </select>
            </div>
          </div>

          <textarea
            rows={5}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What technical project, learning, or update would you like to share with fellow diploma students?"
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-800 dark:text-slate-200"
          />

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Optional Media Image URL
            </label>
            <input
              type="url"
              value={postMediaUrl}
              onChange={(e) => setPostMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or image link"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsPostModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
            >
              Publish Post
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
