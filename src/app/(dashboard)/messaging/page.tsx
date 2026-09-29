'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Send, Image, CheckCheck, MoreVertical } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function MessagingPage() {
  const { showToast } = useToast();

  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [messageInput, setMessageInput] = useState('');

  const [chats, setChats] = useState([
    {
      id: 'chat-1',
      peerId: 'usr-2',
      peerName: 'Priya Kumari',
      peerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      peerHeadline: 'ECE Student @ WGP Patna',
      messages: [
        { senderId: 'usr-2', text: 'Hi Aarav! Loved your SBTE Result Helper app.', time: 'Yesterday 4:15 PM' },
        { senderId: 'usr-1', text: 'Thanks Priya! Glad it helps polytechnic students.', time: 'Yesterday 4:20 PM' },
        { senderId: 'usr-2', text: 'Are you planning to add IoT hardware data integration in future projects?', time: 'Today 9:10 AM' }
      ]
    },
    {
      id: 'chat-2',
      peerId: 'usr-3',
      peerName: 'Rahul Kumar Sharma',
      peerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      peerHeadline: 'ME Student @ GP Siwan',
      messages: [
        { senderId: 'usr-3', text: 'Hey Aarav, do you have any Java tutorial recommendation for beginners?', time: '2 days ago' },
        { senderId: 'usr-1', text: 'Yes Rahul! NPTEL Java course by IIT Kharagpur is great.', time: '2 days ago' }
      ]
    }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const text = messageInput.trim();
    setChats(prev =>
      prev.map(c => {
        if (c.id === activeChatId) {
          return {
            ...c,
            messages: [
              ...c.messages,
              { senderId: 'usr-1', text, time: 'Just now' }
            ]
          };
        }
        return c;
      })
    );

    setMessageInput('');

    // Simulated peer response
    setTimeout(() => {
      setChats(prev =>
        prev.map(c => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: [
                ...c.messages,
                { senderId: c.peerId, text: "Thanks for reaching out! Let's collaborate.", time: 'Just now' }
              ]
            };
          }
          return c;
        })
      );
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden h-[75vh] grid grid-cols-1 md:grid-cols-12">
        
        {/* Sidebar Conversations */}
        <div className="md:col-span-4 border-r border-slate-200/80 dark:border-slate-800 flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-4 border-b border-slate-200/80 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Messages</h2>
            <div className="mt-2 relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 absolute left-3 top-2 text-slate-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {chats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`p-4 flex items-start space-x-3 cursor-pointer transition ${
                  chat.id === activeChatId
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                    : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="relative shrink-0">
                  <img src={chat.peerAvatar} alt={chat.peerName} className="w-11 h-11 rounded-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs truncate">{chat.peerName}</h4>
                    <span className="text-[10px] text-slate-400">9:10 AM</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {chat.messages[chat.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Main Area */}
        <div className="md:col-span-8 flex flex-col h-full bg-white dark:bg-slate-900">
          {activeChat && (
            <>
              <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <Link href={`/profile/${activeChat.peerId}`} className="flex items-center space-x-3">
                  <img src={activeChat.peerAvatar} alt={activeChat.peerName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{activeChat.peerName}</h3>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Online &bull; {activeChat.peerHeadline}</p>
                  </div>
                </Link>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {activeChat.messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.senderId === 'usr-1' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        m.senderId === 'usr-1'
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none'
                      }`}
                    >
                      <p>{m.text}</p>
                      <span className="block text-[9px] mt-1 opacity-70 text-right">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center space-x-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" /> <span>Send</span>
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
