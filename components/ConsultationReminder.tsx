import React, { useEffect } from 'react';
import Icon from './Icon';

interface ConsultationReminderProps {
  isOpen: boolean;
  onClose: () => void;
  time: string;
}

const ConsultationReminder: React.FC<ConsultationReminderProps> = ({ isOpen, onClose, time }) => {
  const meetingLink = "https://meet.google.com/new"; // Placeholder link

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 w-full max-w-sm transition-all duration-300 animate-slideUpFadeIn"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
        <div className="flex items-start">
            <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-secondary/10 text-brand-secondary">
                 <Icon className="w-6 h-6"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></Icon>
            </div>
            <div className="ml-4 flex-1">
                <h3 className="text-lg font-bold text-brand-dark">Pengingat Konsultasi</h3>
                <p className="text-slate-600 mt-1">
                    Sesi video Anda dijadwalkan pada pukul <strong className="text-brand-dark">{time}</strong>.
                </p>
                <div className="mt-4 flex gap-3">
                     <a
                        href={meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold py-2 px-4 bg-brand-secondary text-white hover:bg-sky-400 transition-colors shadow-sm"
                    >
                        Gabung Sekarang
                    </a>
                     <button
                        onClick={onClose}
                        className="inline-flex items-center justify-center rounded-lg text-sm font-semibold py-2 px-4 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>
             <div className="flex-shrink-0">
                <button onClick={onClose} className="text-slate-400 hover:text-brand-dark transition-colors" aria-label="Tutup pengingat">
                    <Icon className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
                </button>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUpFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUpFadeIn { animation: slideUpFadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ConsultationReminder;
