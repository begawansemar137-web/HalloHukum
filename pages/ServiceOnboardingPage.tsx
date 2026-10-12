
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Icon from '../components/Icon';
import HumiPrompt from '../components/HumiPrompt';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ServiceOnboardingPageProps {
  slug: string;
}

type RequestStatus = 'idle' | 'processing' | 'waiting_document' | 'completed';

// --- Sub-components for this page ---

const NotificationToast: React.FC<{ message: string; visible: boolean; onClose: () => void }> = ({ message, visible, onClose }) => {
  if (!visible) return null;
  return (
    <div className="fixed top-5 right-5 z-50 animate-fadeInDown">
      <div className="max-w-sm bg-white border border-slate-200 rounded-lg shadow-lg p-4 flex items-start">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-brand-secondary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></Icon>
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-brand-dark">Pembaruan Status!</p>
          <p className="mt-1 text-sm text-slate-600">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={onClose} className="inline-flex text-slate-400 hover:text-slate-500">
            <span className="sr-only">Close</span>
            <Icon className="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
  const steps = ["Pilih Layanan", "Profil Anda", "Detail Kebutuhan", "Konfirmasi", "Status"];
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((name, index) => (
          <li
            key={name}
            className={`relative ${index !== steps.length - 1 ? 'pr-6 sm:pr-16 lg:pr-20' : ''}`}
            aria-current={index + 1 === step ? 'step' : undefined}
          >
            {index < step - 1 ? (
              <>
                {/* Completed Step */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-brand-secondary" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-secondary">
                  <Icon className="h-5 w-5 text-white" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                  <span className="sr-only">{name} - Selesai</span>
                </div>
                <span aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-20 sm:w-24 text-center text-[10px] sm:text-xs text-brand-secondary font-semibold">{name}</span>
              </>
            ) : index === step - 1 ? (
              <>
                {/* Current Step */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-secondary bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-secondary" aria-hidden="true" />
                  <span className="sr-only">{name} - Saat ini</span>
                </div>
                <span aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-20 sm:w-24 text-center text-[10px] sm:text-xs text-brand-secondary font-semibold">{name}</span>
              </>
            ) : (
              <>
                {/* Upcoming Step */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                  <span className="sr-only">{name} - Berikutnya</span>
                </div>
                <span aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-20 sm:w-24 text-center text-[10px] sm:text-xs text-slate-500">{name}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// --- Main Page Component ---

const ServiceOnboardingPage: React.FC<ServiceOnboardingPageProps> = ({ slug }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    problemTitle: '',
    problemDescription: '',
    profilePicture: '',
  });

  const [requestStatus, setRequestStatus] = useState<RequestStatus>('idle');
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });


  const service = servicesData.find(s => s.slug === slug);

  let humiPromptContent: { title: string; promptText: string } | null = null;
  if (service?.slug === 'legalitas-usaha') {
    humiPromptContent = {
      title: "Bingung mulai dari mana? Tanya HUMI!",
      promptText: "Apa saja dokumen yang perlu disiapkan untuk mendirikan PT?"
    };
  } else if (service?.slug === 'pembuatan-kontrak') {
    humiPromptContent = {
      title: "Perlu Referensi? Tanya HUMI!",
      promptText: "Jelaskan perbedaan antara kontrak PKWT dan PKWTT."
    };
  } else if (service?.slug === 'kekayaan-intelektual') {
    humiPromptContent = {
      title: "Ada Pertanyaan? Tanya HUMI!",
      promptText: "Berapa lama proses pendaftaran merek dagang di Indonesia?"
    };
  }
  
  // Pre-fill form with user data from context
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);
  
  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      setNotification({ message: '', visible: false });
    }, 5000); // Auto-hide after 5 seconds
  };

  if (!service) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">Layanan Tidak Ditemukan</h1>
        <p className="mt-4">Maaf, layanan yang Anda cari tidak ada.</p>
        <Link to="/layanan" className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Halaman Layanan</Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      setIsUploading(true);
      reader.onloadend = () => {
        setTimeout(() => {
          setFormData(prev => ({ ...prev, profilePicture: reader.result as string }));
          setIsUploading(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleFinalSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    const { error } = await supabase.from('service_requests').insert({
      user_id: user.id,
      service_name: service?.title ?? slug,
      problem_summary: `${formData.problemTitle}\n\n${formData.problemDescription}`.trim(),
    });
    setIsSubmitting(false);
    if (error) {
      console.error('Failed to submit service request:', error);
      showNotification('Gagal mengirim permintaan. Silakan coba lagi.');
      return;
    }
    setRequestStatus('processing');
    setCurrentStep(4); // Move to status page
  };

  const renderStatusContent = () => {
    const statusInfo = {
      processing: {
        icon: <svg className="animate-spin h-12 w-12 text-brand-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>,
        title: 'Sedang Diproses',
        description: 'Permintaan Anda telah kami terima. Tim kami sedang melakukan verifikasi data dan persiapan awal. Mohon tunggu sebentar.'
      },
      waiting_document: {
        icon: <Icon className="h-12 w-12 text-amber-500"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>,
        title: 'Menunggu Dokumen',
        description: 'Ada beberapa dokumen tambahan yang kami perlukan dari Anda. Tim kami telah mengirimkan rinciannya ke alamat email Anda. Harap segera lengkapi.'
      },
      completed: {
        icon: <Icon className="h-12 w-12 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Icon>,
        title: 'Selesai!',
        description: 'Proses layanan Anda telah berhasil diselesaikan. Semua dokumen legal akan segera kami kirimkan. Tim kami akan menghubungi Anda untuk langkah selanjutnya.'
      }
    };

    const currentStatusInfo = statusInfo[requestStatus] || statusInfo.processing;

    return (
      <div key={4} className="animate-fadeIn text-center">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Status Permintaan Anda</h2>
        <p className="text-slate-600 mb-8">Anda dapat memantau progres layanan Anda di halaman ini. Kami akan memberikan notifikasi jika ada pembaruan.</p>
        <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200 flex flex-col items-center">
            <div className="mb-4">{currentStatusInfo.icon}</div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">{currentStatusInfo.title}</h3>
            <p className="text-slate-600 max-w-md mx-auto">{currentStatusInfo.description}</p>
        </div>
        <div className="mt-8">
            <Link to="/layanan" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-8 bg-brand-dark text-white hover:bg-slate-700 transition-all">
                Kembali ke Halaman Layanan
            </Link>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div key={1} className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Langkah 2: Profil Anda</h2>
            <form className="space-y-6" noValidate>
              <div className="flex flex-col items-center gap-4 mb-8">
                <div className="relative h-28 w-28 rounded-full">
                  {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-200 rounded-full">
                      <svg className="animate-spin h-8 w-8 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : formData.profilePicture ? (
                    <img src={formData.profilePicture} alt="Pratinjau Profil" className="h-full w-full object-cover rounded-full" />
                  ) : (
                    <div className="h-full w-full bg-slate-200 rounded-full flex items-center justify-center">
                      <Icon className="w-12 h-12 text-slate-400"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" /><circle cx="12" cy="10" r="3" /><circle cx="12" cy="12" r="10" /></Icon>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="profilePicture" className="cursor-pointer bg-white text-brand-secondary font-semibold py-2 px-4 rounded-lg border border-brand-secondary hover:bg-sky-50 transition-colors text-sm">
                    Upload Foto
                  </label>
                  <input type="file" id="profilePicture" name="profilePicture" accept="image/png, image/jpeg" className="sr-only" onChange={handleFileChange} />
                  <p className="text-xs text-slate-500 mt-2 text-center">PNG, JPG (Maks. 2MB)</p>
                </div>
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Alamat Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Nomor Telepon</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
              </div>
              <div className="pt-4 flex justify-end">
                <button type="button" onClick={nextStep} className="bg-brand-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-slate-700">
                  Lanjut
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div key={2} className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Langkah 3: Detail Kebutuhan Anda</h2>
            <form className="space-y-6" noValidate>
              <div>
                <label htmlFor="problemTitle" className="block text-sm font-medium text-slate-700">Judul Singkat Permasalahan</label>
                <input type="text" id="problemTitle" name="problemTitle" value={formData.problemTitle} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" placeholder="Contoh: Pembuatan Kontrak Kerja Karyawan" />
              </div>
              <div>
                <label htmlFor="problemDescription" className="block text-sm font-medium text-slate-700">Jelaskan Kebutuhan Anda Secara Rinci</label>
                <textarea id="problemDescription" name="problemDescription" rows={6} value={formData.problemDescription} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent"></textarea>
              </div>
              {humiPromptContent && (
                <HumiPrompt title={humiPromptContent.title} promptText={humiPromptContent.promptText} />
              )}
              <div className="pt-4 flex justify-between">
                <button type="button" onClick={prevStep} className="bg-slate-200 text-slate-700 font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-slate-300">
                  Kembali
                </button>
                <button type="button" onClick={nextStep} className="bg-brand-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-slate-700">
                  Lanjut
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div key={3} className="animate-fadeIn text-center">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">Langkah 4: Konfirmasi & Kirim</h2>
            <p className="text-slate-600 mb-8">Satu langkah lagi untuk memulai. Silakan periksa kembali detail permintaan Anda dan kirimkan.</p>
            <div className="bg-slate-50 rounded-lg p-6 text-left border border-slate-200 mb-8">
              <h3 className="font-bold text-brand-dark mb-4">Ringkasan Permintaan</h3>
              <div className="flex items-start gap-4">
                {formData.profilePicture && (
                  <img src={formData.profilePicture} alt="Profil" className="h-16 w-16 rounded-full object-cover flex-shrink-0" />
                )}
                <div className="flex-grow">
                  <p><strong>Layanan:</strong> {service.title}</p>
                  <p><strong>Nama:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Subjek:</strong> {formData.problemTitle}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-4">
              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-secondary text-white hover:bg-sky-400 transition-all disabled:bg-sky-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Memproses...</span>
                  </>
                ) : (
                  'Kirim Permintaan'
                )}
              </button>
            </div>
            <div className="mt-6">
              <button type="button" onClick={prevStep} className="text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50" disabled={isSubmitting}>
                Kembali
              </button>
            </div>
          </div>
        );
      case 4:
        return renderStatusContent();
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16 lg:py-24">
      <NotificationToast
        message={notification.message}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Memulai Layanan: {service.title}</h1>
            {currentStep <= 3 && <p className="mt-3 text-lg text-slate-600">{service.shortDescription}</p>}
          </div>
          <div className="mb-12 flex justify-center pb-10">
            <ProgressBar step={currentStep + 1} />
          </div>
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-slate-200">
            {renderStepContent()}
          </div>
        </div>
      </div>
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-fadeInDown { animation: fadeInDown 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ServiceOnboardingPage;
