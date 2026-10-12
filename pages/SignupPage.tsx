
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nik: '',
    address: '',
    postalCode: '',
    phone: '',
  });
  const [ktpPhoto, setKtpPhoto] = useState<string | null>(null);
  const [ktpPhotoName, setKtpPhotoName] = useState<string | null>(null);
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const navigate = useNavigate();
  const auth = useAuth();

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'nik':
        if (!/^\d{16}$/.test(value) && value) {
          return 'NIK harus terdiri dari 16 digit angka.';
        }
        break;
      case 'postalCode':
        if (!/^\d{5}$/.test(value) && value) {
          return 'Kode Pos harus terdiri dari 5 digit angka.';
        }
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2MB
      setError('Ukuran file maksimal 2MB.');
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Hanya file JPG atau PNG yang diizinkan.');
      return;
    }

    setError('');
    setIsUploading(true);
    setKtpPhotoName(file.name);
    setKtpFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setKtpPhoto(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError('Gagal membaca file.');
      setIsUploading(false);
      setKtpPhotoName(null);
      setKtpPhoto(null);
      setKtpFile(null);
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password minimal harus 6 karakter.");
      return;
    }
    if (!ktpPhoto || !ktpFile) {
      setError("Harap unggah foto KTP Anda.");
      return;
    }
    if (!hasConsented) {
      setError("Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi untuk melanjutkan.");
      return;
    }
    setError('');
    setIsSubmitting(true);
    
    try {
      await auth.signup({
        ...formData,
        pass: formData.password,
        ktpFile,
      });
      navigate('/verify-email', { state: { email: formData.email } });
    } catch (err: any) {
      setError(err.message || 'Gagal membuat akun.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasValidationErrors = Object.values(errors).some(error => error !== null);
  const isFormInvalid = !formData.name || !formData.email || !formData.password || !formData.nik || !formData.address || !formData.postalCode || !formData.phone || !ktpPhoto || !hasConsented || hasValidationErrors;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <Link to="/" className="flex justify-center items-center space-x-2" aria-label="HalloHukum Homepage">
             <div className="bg-brand-dark p-2 rounded-lg">
                <Icon className="text-brand-accent h-8 w-8">
                    <path d="M12 22V2M2 12H22M17 2H7L2 12L7 22H17L22 12L17 2Z" />
                    <path d="M2.5 12C2.5 17.5228 7.47715 22.5 13 22.5" />
                    <path d="M21.5 12C21.5 6.47715 16.5228 1.5 11 1.5" />
                </Icon>
             </div>
            <span className="text-3xl font-bold text-brand-dark">HalloHukum</span>
          </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-dark">
          Buat Akun Baru
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-medium text-brand-secondary hover:text-sky-500">
            Login di sini
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 border border-slate-200">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Nama Lengkap
              </label>
              <div className="mt-1">
                <input id="name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Alamat Email
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" />
              </div>
            </div>
            
            <hr className="border-slate-200" />

            <div>
              <label htmlFor="nik" className="block text-sm font-medium text-slate-700">
                Nomor Induk Kependudukan (NIK)
              </label>
              <div className="mt-1">
                <input 
                  id="nik" 
                  name="nik" 
                  type="text" 
                  required 
                  value={formData.nik} 
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-secondary sm:text-sm ${errors.nik ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-secondary'}`}
                  placeholder="16 digit NIK" 
                  maxLength={16} 
                  pattern="\d{16}"
                  aria-invalid={!!errors.nik}
                  aria-describedby="nik-error"
                />
              </div>
              {errors.nik && <p id="nik-error" className="mt-1 text-xs text-red-600">{errors.nik}</p>}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-700">
                Alamat
              </label>
              <div className="mt-1">
                <textarea id="address" name="address" rows={3} required value={formData.address} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" placeholder="Alamat sesuai KTP"></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-slate-700">
                    Kode Pos
                  </label>
                  <div className="mt-1">
                    <input 
                      id="postalCode" 
                      name="postalCode" 
                      type="text" 
                      required 
                      value={formData.postalCode} 
                      onChange={handleChange} 
                      onBlur={handleBlur}
                      className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-secondary sm:text-sm ${errors.postalCode ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-brand-secondary'}`}
                      maxLength={5} 
                      aria-invalid={!!errors.postalCode}
                      aria-describedby="postalCode-error"
                    />
                  </div>
                  {errors.postalCode && <p id="postalCode-error" className="mt-1 text-xs text-red-600">{errors.postalCode}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    No. Telp
                  </label>
                  <div className="mt-1">
                    <input id="phone" name="phone" type="tel" autoComplete="tel" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm" placeholder="+62 812..." />
                  </div>
                </div>
            </div>

             <div>
              <label className="block text-sm font-medium text-slate-700">
                Upload KTP
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {ktpPhoto ? (
                    <img src={ktpPhoto} alt="Preview KTP" className="mx-auto h-24 w-auto rounded-md shadow-sm" />
                  ) : (
                    <Icon className="mx-auto h-12 w-12 text-slate-400">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <path d="M7 15h.01" />
                      <path d="M11 15h2" />
                    </Icon>
                  )}
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="ktp-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-secondary hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-secondary">
                      <span>Upload file</span>
                      <input id="ktp-upload" name="ktp-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" />
                    </label>
                  </div>
                   <p className="text-xs text-slate-500">
                    {isUploading ? 'Mengunggah...' : (ktpPhotoName || 'PNG, JPG hingga 2MB')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start">
                  <div className="flex items-center h-5">
                      <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          checked={hasConsented}
                          onChange={(e) => setHasConsented(e.target.checked)}
                          className="focus:ring-brand-secondary h-4 w-4 text-brand-secondary border-slate-300 rounded"
                      />
                  </div>
                  <div className="ml-3 text-sm">
                      <label htmlFor="consent" className="text-slate-600">
                          Saya setuju dengan{' '}
                          <Link to="/syarat-ketentuan" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-secondary hover:text-sky-500">
                              Syarat & Ketentuan
                          </Link>
                          {' '}dan{' '}
                          <Link to="/kebijakan-privasi" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-secondary hover:text-sky-500">
                              Kebijakan Privasi
                          </Link>
                          {' '}yang berlaku.
                      </label>
                  </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || isFormInvalid}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-brand-dark hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                 {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Daftar Sekarang'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
