'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThumbsUp, MessageSquare, Share2, Bookmark, Send, Code, Award, Rocket } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function FeedPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'college' | 'branch' | 'saved'>('all');
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentInput, setCommentInput] = useState<Record<string, string>>({});

  const currentUser = {
    id: 'usr-1',
    name: 'Aarav Kumar',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
    banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
    headline: 'CSE Diploma Student | Java | Web Development | Open to Internships',
    collegeName: 'Government Polytechnic Patna-7',
    collegeId: 'gp-patna-7',
    branch: 'CSE',
    connectionsCount: 42,
  };

  const [posts, setPosts] = useState([
    {
      id: 'post-1',
      authorId: 'usr-1',
      authorName: 'Aarav Kumar',
      authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      authorHeadline: 'CSE Student @ GP Patna-7',
      collegeId: 'gp-patna-7',
      branch: 'CSE',
      category: 'Project Update',
      timestamp: '2 hours ago',
      content: `🚀 Thrilled to share my latest project created specifically for Bihar Diploma Students!\n\nI built the "SBTE Exam Result Helper" web application! It helps polytechnic students calculate their SGPA, CGPA, and track credit performance with 1-click.\n\nBuilt using HTML5, JavaScript & Tailwind CSS.\nCheck out the GitHub repository below and let me know your thoughts! #BiharPolytechnic #CSE #DiplomaConnect #WebDev`,
      media: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      likesCount: 24,
      likedByMe: false,
      savedByMe: false,
      comments: [
        {
          id: 'c-1',
          authorName: 'Priya Kumari',
          authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          content: 'Great initiative Aarav! Super helpful for SBTE exam grade calculations.',
          timestamp: '1 hour ago',
        },
      ],
    },
    {
      id: 'post-2',
      authorId: 'usr-2',
      authorName: 'Priya Kumari',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      authorHeadline: "ECE Student @ Women's Polytechnic Patna",
      collegeId: 'wgp-patna',
      branch: 'ECE',
      category: 'Certification Share',
      timestamp: '5 hours ago',
      content: `🎓 Successfully completed my 6-week "Embedded Systems & IoT Design" certification course from NIELIT Patna!\n\nDuring this course, I designed hardware circuits using ESP8266, DHT11 sensors, and integrated them with cloud monitoring platforms.\n\nSpecial thanks to our HOD and faculty at Women's Polytechnic Patna for constant guidance. #IoT #EmbeddedSystems #NIELIT #WomenInTech #PolytechnicBihar`,
      media: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      likesCount: 38,
      likedByMe: true,
      savedByMe: true,
      comments: [],
    },
  ]);

  const toggleLike = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            likedByMe: !p.likedByMe,
            likesCount: p.likedByMe ? p.likesCount - 1 : p.likesCount + 1,
          };
        }
        return p;
      })
    );
  };

  const toggleSave = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const nextSaved = !p.savedByMe;
          showToast(nextSaved ? 'Post bookmarked' : 'Post removed from saved', 'info');
          return { ...p, savedByMe: nextSaved };
        }
        return p;
      })
    );
  };

  const toggleCommentsSection = (postId: string) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const addComment = (postId: string) => {
    const text = commentInput[postId]?.trim();
    if (!text) return;

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                id: 'c-' + Date.now(),
                authorName: currentUser.name,
                authorAvatar: currentUser.avatar,
                content: text,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );

    setCommentInput(prev => ({ ...prev, [postId]: '' }));
    showToast('Comment posted', 'success');
  };

  const filteredPosts = posts.filter(p => {
    if (activeTab === 'college') return p.collegeId === currentUser.collegeId;
    if (activeTab === 'branch') return p.branch === currentUser.branch;
    if (activeTab === 'saved') return p.savedByMe;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar (Profile Summary & Quick Links) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-indigo-600 to-indigo-800 relative">
              <img src={currentUser.banner} alt="Banner" className="w-full h-full object-cover opacity-60" />
            </div>
            <div className="px-5 pb-5 pt-0 relative text-center">
              <div className="flex justify-center -mt-10 mb-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-md"
                />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">{currentUser.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{currentUser.headline}</p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 text-center text-xs">
                <div>
                  <span className="block font-bold text-slate-900 dark:text-white text-sm">{currentUser.connectionsCount}</span>
                  <span className="text-slate-400">Connections</span>
                </div>
                <div>
                  <span className="block font-bold text-indigo-600 dark:text-indigo-400 text-sm">85%</span>
                  <span className="text-slate-400">Profile Power</span>
                </div>
              </div>

              <Link
                href={`/profile/${currentUser.id}`}
                className="w-full block mt-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 rounded-xl transition"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Center Feed Stream */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Create Post Trigger Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs">
            <div className="flex items-center space-x-3">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-indigo-500/20" />
              <button
                onClick={() => showToast('Click the mobile + or use modal to publish', 'info')}
                className="w-full text-left py-2.5 px-4 bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 text-sm font-medium transition"
              >
                Start a post, share project update or certificate...
              </button>
            </div>
          </div>

          {/* Feed Filter Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition ${
                  activeTab === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setActiveTab('college')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition ${
                  activeTab === 'college'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                My College
              </button>
              <button
                onClick={() => setActiveTab('branch')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition ${
                  activeTab === 'branch'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                My Branch
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl transition ${
                  activeTab === 'saved'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Saved
              </button>
            </div>
          </div>

          {/* Feed Stream List */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <Link href={`/profile/${post.authorId}`} className="flex items-center space-x-3">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm hover:text-indigo-600 transition">{post.authorName}</h4>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-md">{post.branch}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{post.authorHeadline} &bull; <span className="text-slate-400">{post.timestamp}</span></p>
                    </div>
                  </Link>
                  <span className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">{post.category}</span>
                </div>

                <div className="mt-4 text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>

                {post.media && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-200/60 dark:border-slate-800 max-h-96">
                    <img src={post.media} alt="Attachment" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">👍</span>
                    <span>{post.likesCount} Likes</span>
                  </div>
                  <div>
                    <span>{post.comments.length} Comments</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 grid grid-cols-4 gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                      post.likedByMe ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likedByMe ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={() => toggleCommentsSection(post.id)}
                    className="py-2 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Comment</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      showToast('Post link copied to clipboard!', 'success');
                    }}
                    className="py-2 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition ${
                      post.savedByMe ? 'text-indigo-600 dark:text-indigo-400' : ''
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{post.savedByMe ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {openComments[post.id] && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {post.comments.map((c) => (
                        <div key={c.id} className="flex items-start space-x-2.5 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                          <img src={c.authorAvatar} alt={c.authorName} className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">{c.authorName}</span>
                            <span className="text-slate-400 text-[10px] ml-2">{c.timestamp}</span>
                            <p className="text-slate-700 dark:text-slate-300 mt-1">{c.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="text"
                        value={commentInput[post.id] || ''}
                        onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                        placeholder="Write a professional comment..."
                        className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white"
                        onKeyDown={(e) => e.key === 'Enter' && addComment(post.id)}
                      />
                      <button
                        onClick={() => addComment(post.id)}
                        className="px-3 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
