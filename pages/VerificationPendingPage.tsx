import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/Icon';

const VerificationPendingPage: React.FC = () => {
    const { user, resendVerificationEmail } = useAuth();
    const location = useLocation();
    const [isResending, setIsResending] = useState(false);
    const [resendStatus, setResendStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Determine the email to display
    const displayEmail = user?.email || location.state?.email;

    const handleResend = async () => {
        setIsResending(true);
        setResendStatus('idle');
        try {
            await resendVerificationEmail(displayEmail);
            setResendStatus('success');
        } catch (error) {
            console.error(error);
            setResendStatus('error');
        } finally {
            setIsResending(false);
            setTimeout(() => setResendStatus('idle'), 3000); // Reset status message after 3 seconds
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-brand-secondary/10">
                        <Icon className="h-12 w-12 text-brand-secondary">
                            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6Z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </Icon>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-dark">
                        Verifikasi Email Anda
                    </h2>
                    <p className="mt-2 text-slate-600">
                        Kami telah mengirimkan tautan verifikasi ke alamat email:
                    </p>
                    {displayEmail && (
                        <p className="font-semibold text-brand-dark mt-1">{displayEmail}</p>
                    )}
                    <p className="mt-2 text-slate-600">
                        Silakan klik tautan tersebut untuk mengaktifkan akun Anda.
                    </p>
                </div>
                
                {displayEmail && !user?.isEmailVerified && (
                    <div>
                        <button
                            onClick={handleResend}
                            disabled={isResending}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-dark hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:bg-slate-400"
                        >
                            {isResending ? 'Mengirim...' : 'Kirim Ulang Email Verifikasi'}
                        </button>
                        {resendStatus === 'success' && (
                            <p className="mt-2 text-sm text-green-600">Email verifikasi baru telah dikirim!</p>
                        )}
                        {resendStatus === 'error' && (
                            <p className="mt-2 text-sm text-red-600">Gagal mengirim email. Silakan coba lagi.</p>
                        )}
                    </div>
                )}
                
                <div className="text-sm">
                    <Link to="/" className="font-medium text-brand-secondary hover:text-sky-500">
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerificationPendingPage;
