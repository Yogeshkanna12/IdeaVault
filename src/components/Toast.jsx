import React, { useEffect } from 'react';
import { useIdeas } from '../context/IdeasContext';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage, setToastMessage } = useIdeas();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [toastMessage, setToastMessage]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-md">
      <div className="flex items-center gap-3 bg-vault-900/95 border border-brand-indigo/40 backdrop-blur-xl text-slate-100 px-4 py-3 rounded-xl shadow-2xl shadow-brand-indigo/20">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan/20 to-brand-indigo/30 flex items-center justify-center text-brand-cyan shrink-0">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <Sparkles className="w-5 h-5 text-brand-cyan" />
          )}
        </div>
        <p className="text-sm font-medium text-slate-200 pr-2">
          {toastMessage.message}
        </p>
        <button
          onClick={() => setToastMessage(null)}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
