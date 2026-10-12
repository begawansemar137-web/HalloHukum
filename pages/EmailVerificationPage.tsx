import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/Icon';

interface EmailVerificationPageProps {
    token: string;
}

type VerificationStatus = 'verifying' | 'success' | 'error';

const EmailVerificationPage: React.FC<EmailVerificationPageProps> = ({ token }) => {
    const [status, setStatus] = useState<VerificationStatus>('verifying');
    const [errorMessage, setErrorMessage] = useState('');
    const { verifyEmail } = useAuth();

    useEffect(() => {
        const processVerification = async () => {
            if (!token) {
                setStatus('error');
                setErrorMessage('Token verifikasi tidak ditemukan.');
                return;
            }
            try {
                await verifyEmail(token);
                setStatus('success');
            } catch (err: any) {
                setStatus('error');
                setErrorMessage(err.message || 'Tautan verifikasi tidak valid atau sudah kedaluwarsa.');
            }
        };

        processVerification();
    }, [token, verifyEmail]);

    const statusContent = {
        verifying: {
            icon: <svg className="animate-spin h-12 w-12 text-brand-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>,
            title: 'Memverifikasi Email Anda...',
            message: 'Mohon tunggu sebentar, kami sedang memproses verifikasi Anda.',
            action: null,
        },
        success: {
            icon: <Icon className="h-12 w-12 text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></Icon>,
            title: 'Verifikasi Berhasil!',
            message: 'Email Anda telah berhasil diverifikasi. Anda sekarang dapat melanjutkan ke layanan kami.',
            action: <Link to="/login" className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark hover:bg-slate-700">Lanjutkan ke Login</Link>
        },
        error: {
            icon: <Icon className="h-12 w-12 text-red-500"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon>,
            title: 'Verifikasi Gagal',
            message: errorMessage,
            action: <Link to="/verify-email" className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark hover:bg-slate-700">Minta Tautan Baru</Link>
        }
    };

    const currentContent = statusContent[status];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center bg-white p-10 rounded-2xl shadow-lg border border-slate-200">
                <div className="mx-auto flex items-center justify-center h-20 w-20">
                    {currentContent.icon}
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-dark">
                    {currentContent.title}
                </h2>
                <p className="mt-2 text-slate-600">
                    {currentContent.message}
                </p>
                {currentContent.action && <div className="mt-6">{currentContent.action}</div>}
            </div>
        </div>
    );
};

export default EmailVerificationPage;
