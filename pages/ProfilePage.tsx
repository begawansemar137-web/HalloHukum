import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/Icon';
import EditProfileModal from '../components/EditProfileModal';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-slate-200">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Profil Saya</h1>
              <p className="mt-2 text-slate-500">Kelola informasi akun dan layanan Anda di sini.</p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-brand-secondary text-white flex items-center justify-center text-4xl font-bold overflow-hidden flex-shrink-0">
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt="Foto profil pengguna" className="h-full w-full object-cover" />
                      ) : (
                        <span>{user.name.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-brand-dark">{user.name}</h2>
                      <p className="text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold py-2 px-4 bg-white text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200 transition-colors"
                  >
                      <Icon className="w-4 h-4"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></Icon>
                      Edit Profil
                  </button>
              </div>


              <div className="border-t border-slate-200 pt-6">
                <h3 className="text-lg font-semibold text-brand-dark">Detail Akun</h3>
                <dl className="mt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-slate-500">Nomor Telepon</dt>
                    <dd className="text-sm text-brand-dark">{user.phone || 'Belum diatur'}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-sm font-medium text-slate-500">Status Verifikasi Email</dt>
                    <dd className={`text-xs sm:text-sm font-semibold px-2 py-0.5 rounded-full ${
                      user.isEmailVerified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {user.isEmailVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <button
                  onClick={handleLogout}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <Icon className="w-5 h-5">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                  </Icon>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={user}
      />
    </>
  );
};

export default ProfilePage;