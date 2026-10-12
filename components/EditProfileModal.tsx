import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import { User } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, user }) => {
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
    postalCode: user.postalCode || '',
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(user.profilePicture || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens or user data changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        postalCode: user.postalCode || '',
      });
      setProfilePicture(user.profilePicture || null);
    }
  }, [isOpen, user]);
  
  // Handle Escape key to close modal
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUser({ ...formData, profilePicture: profilePicture || undefined });
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Failed to update profile:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
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
        className="relative bg-white w-full max-w-lg m-4 rounded-2xl shadow-xl transform transition-all duration-300 animate-scaleUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10 flex justify-between items-center">
          <h2 id="modal-title" className="text-2xl font-bold text-brand-dark">Edit Profil</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-brand-dark transition-colors" aria-label="Close modal">
            <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
          </button>
        </header>
        
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden bg-slate-200">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      <Icon className="w-10 h-10"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-brand-secondary font-semibold py-2 px-4 rounded-lg border border-brand-secondary hover:bg-sky-50 transition-colors text-sm"
                  >
                    Ganti Foto
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                  <p className="text-xs text-slate-500 mt-2">PNG atau JPG, maks. 2MB.</p>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email (tidak dapat diubah)</label>
                <input type="email" id="email" name="email" value={user.email} disabled className="mt-1 block w-full bg-slate-200 border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Nomor Telepon</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">Alamat</label>
                <textarea id="address" name="address" rows={3} value={formData.address} onChange={handleChange} className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent"></textarea>
              </div>

               <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700">Kode Pos</label>
                <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
              </div>
            </div>
          </div>
          <footer className="p-6 border-t border-slate-200 mt-auto bg-white rounded-b-2xl z-10 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-white text-slate-700 font-semibold py-2.5 px-6 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-brand-dark text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </footer>
        </form>

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
    </div>
  );
};

export default EditProfileModal;