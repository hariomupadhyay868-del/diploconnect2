'use client';

import React, { createContext, useContext, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`flex items-center p-4 rounded-xl shadow-lg transform transition-all duration-300 text-sm font-medium ${
              t.type === 'success'
                ? 'bg-emerald-600 text-white'
                : t.type === 'error'
                ? 'bg-rose-600 text-white'
                : t.type === 'warning'
                ? 'bg-amber-600 text-white'
                : 'bg-indigo-600 text-white'
            }`}
          >
            {t.type === 'success' && <CheckCircle className="w-5 h-5 mr-2 shrink-0" />}
            {t.type === 'error' && <XCircle className="w-5 h-5 mr-2 shrink-0" />}
            {t.type === 'warning' && <AlertTriangle className="w-5 h-5 mr-2 shrink-0" />}
            {t.type === 'info' && <Info className="w-5 h-5 mr-2 shrink-0" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    return { showToast: (msg: string) => console.log(msg) };
  }
  return context;
};
