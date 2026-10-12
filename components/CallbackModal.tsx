import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallbackModal: React.FC<CallbackModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    time: '',
    notes: '',
  });

  const timeSlots = [
    'Pagi (09:00 - 12:00)',
    'Siang (13:00 - 17:00)',
  ];

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('form');
        setIsSubmitting(false);
        setFormData({ name: '', phone: '', time: '', notes: '' });
      }, 300); // Wait for closing animation
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Callback requested:', formData);
      setIsSubmitting(false);
      setStep('confirmed');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md m-4 rounded-2xl shadow-xl transform transition-all duration-300 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-brand-dark transition-colors" aria-label="Close modal">
          <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
        </button>

        {step === 'form' && (
          <div className="p-8">
            <h2 id="modal-title" className="text-2xl font-bold text-brand-dark mb-2">Minta Dihubungi Kembali</h2>
            <p className="text-slate-500 mb-6">Isi formulir di bawah ini dan konsultan hukum kami akan menghubungi Anda pada waktu yang Anda pilih.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Nomor Telepon</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" placeholder="+62 812..." />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-slate-700">Waktu Terbaik untuk Dihubungi</label>
                <select id="time" name="time" value={formData.time} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent">
                  <option value="" disabled>Pilih waktu</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
               <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Catatan Singkat (Opsional)</label>
                <textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleChange} className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" placeholder="Contoh: Saya butuh bantuan pendaftaran merek dagang..."></textarea>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.phone || !formData.time}
                  className="w-full flex items-center justify-center bg-brand-dark text-white font-semibold py-3 rounded-lg transition-colors hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                   {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : 'Kirim Permintaan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'confirmed' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Icon className="w-8 h-8 text-green-600"><polyline points="20 6 9 17 4 12"></polyline></Icon>
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-2">Permintaan Terkirim!</h2>
            <p className="text-slate-500 mb-6">
              Terima kasih, {formData.name}. Tim kami akan menghubungi Anda di nomor <span className="font-semibold text-brand-dark">{formData.phone}</span> pada waktu yang telah Anda pilih.
            </p>
            <button onClick={onClose} className="w-full mt-4 bg-brand-dark text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors">
              Tutup
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CallbackModal;
