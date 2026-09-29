'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Home,
  Users,
  Compass,
  Briefcase,
  Calendar,
  MessageSquare,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  LayoutDashboard,
  Shield,
  LogOut
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '../ui/Toast';

interface MainHeaderProps {
  currentUser?: {
    id: string;
    name: string;
    email: string;
    headline: string;
    avatarUrl: string;
    role: string;
    verified: boolean;
  } | null;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setIsDarkMode(isDark);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    showToast('Logged out successfully', 'info');
    router.push('/auth/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/discover?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Search Input */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <Link href={currentUser ? '/feed' : '/'} className="flex items-center space-x-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md font-bold text-lg">
              DC
            </div>
            <span className="hidden lg:inline text-lg font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-200 bg-clip-text text-transparent">
              DiplomaConnect
            </span>
          </Link>

          {currentUser && (
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students, skills, colleges..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-slate-900 dark:text-white transition"
              />
            </form>
          )}
        </div>

        {/* Navigation Links (Authenticated) */}
        {currentUser ? (
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 mx-4">
            <Link
              href="/feed"
              className={`flex flex-col items-center px-3 py-1 rounded-xl text-xs font-medium transition ${
                pathname === '/feed'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200'
              }`}
            >
              <Home className="w-5 h-5 mb-0.5" />
              <span>Feed</span>
            </Link>

            <Link
              href="/network"
              className={`flex flex-col items-center px-3 py-1 rounded-xl text-xs font-medium transition ${
                pathname === '/network'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200'
              }`}
            >
              <Users className="w-5 h-5 mb-0.5" />
              <span>Network</span>
            </Link>

            <Link
              href="/discover"
              className={`flex flex-col items-center px-3 py-1 rounded-xl text-xs font-medium transition ${
                pathname === '/discover'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200'
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span>Discover</span>
            </Link>

            <Link
              href="/opportunities"
              className={`flex flex-col items-center px-3 py-1 rounded-xl text-xs font-medium transition ${
                pathname === '/opportunities'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200'
              }`}
            >
              <Briefcase className="w-5 h-5 mb-0.5" />
              <span>Opportunities</span>
            </Link>

            <Link
              href="/events"
              className={`flex flex-col items-center px-3 py-1 rounded-xl text-xs font-medium transition ${
                pathname === '/events'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span>Events</span>
            </Link>

            <Link
              href="/messaging"
              className={`relative flex flex-col items-center px-3 py-1 rounded-xl text-xs font-medium transition ${
                pathname === '/messaging'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-5 h-5 mb-0.5" />
              <span>Messages</span>
            </Link>

            <Link
              href="/notifications"
              className={`relative flex flex-col items-center px-3 py-1 rounded-xl text-xs font-medium transition ${
                pathname === '/notifications'
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-slate-200'
              }`}
            >
              <Bell className="w-5 h-5 mb-0.5" />
              <span>Notifications</span>
            </Link>
          </nav>
        ) : (
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-white transition">Home</Link>
            <Link href="/discover" className="hover:text-indigo-600 dark:hover:text-white transition">Discover Students</Link>
            <Link href="/colleges" className="hover:text-indigo-600 dark:hover:text-white transition">Colleges</Link>
            <Link href="/opportunities" className="hover:text-indigo-600 dark:hover:text-white transition">Opportunities</Link>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {currentUser ? (
            <>
              {currentUser.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-700 rounded-xl hover:bg-amber-500/20 transition flex items-center space-x-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <img
                    src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.headline}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={`/profile/${currentUser.id}`}
                        onClick={() => setShowProfileMenu(false)}
                        className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center space-x-2"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>View Full Profile</span>
                      </Link>

                      <Link
                        href="/dashboard"
                        onClick={() => setShowProfileMenu(false)}
                        className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center space-x-2"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>Student Dashboard</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition"
              >
                Log In
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
              >
                Join Network
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
