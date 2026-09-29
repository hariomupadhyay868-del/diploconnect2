'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Plus, Compass, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentUserId?: string;
  onOpenCreatePost?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentUserId,
  onOpenCreatePost
}) => {
  const pathname = usePathname();

  if (!currentUserId) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 md:hidden transition-all duration-200">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        <Link
          href="/feed"
          className={`flex flex-col items-center justify-center w-12 h-12 text-xs font-medium ${
            pathname === '/feed' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px]">Home</span>
        </Link>

        <Link
          href="/network"
          className={`flex flex-col items-center justify-center w-12 h-12 text-xs font-medium ${
            pathname === '/network' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-[10px]">Network</span>
        </Link>

        {/* Floating Create Post Button */}
        <button
          onClick={onOpenCreatePost}
          className="-mt-6 w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center transform active:scale-95 transition"
        >
          <Plus className="w-6 h-6" />
        </button>

        <Link
          href="/discover"
          className={`flex flex-col items-center justify-center w-12 h-12 text-xs font-medium ${
            pathname === '/discover' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Compass className="w-6 h-6" />
          <span className="text-[10px]">Discover</span>
        </Link>

        <Link
          href={`/profile/${currentUserId}`}
          className={`flex flex-col items-center justify-center w-12 h-12 text-xs font-medium ${
            pathname.startsWith('/profile') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px]">Profile</span>
        </Link>
      </div>
    </nav>
  );
};
