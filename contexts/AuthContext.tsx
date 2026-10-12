import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import type { User as AuthUser } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface SignupData {
  name: string;
  email: string;
  pass: string;
  nik: string;
  address: string;
  postalCode: string;
  phone: string;
  ktpFile: File;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: (email?: string) => Promise<void>;
  updateUser: (updatedData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const redirectUrl = () => `${window.location.origin}${window.location.pathname}#/verify-email/done`;

const extFor = (type: string) => (type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg');

const loadUser = async (authUser: AuthUser): Promise<User> => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, phone, nik, address, postal_code, avatar_url')
    .eq('id', authUser.id)
    .maybeSingle();
  return {
    id: authUser.id,
    name: profile?.name || '',
    email: authUser.email || '',
    isEmailVerified: !!authUser.email_confirmed_at,
    phone: profile?.phone ?? undefined,
    nik: profile?.nik ?? undefined,
    address: profile?.address ?? undefined,
    postalCode: profile?.postal_code ?? undefined,
    profilePicture: profile?.avatar_url ?? undefined,
  };
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer: calling supabase from inside this callback can deadlock.
      setTimeout(async () => {
        if (!active) return;
        setUser(session?.user ? await loadUser(session.user) : null);
        setIsLoading(false);
      }, 0);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) {
      if (/not confirmed/i.test(error.message)) {
        throw new Error('Email belum diverifikasi. Periksa kotak masuk Anda.');
      }
      throw new Error('Email atau password salah.');
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    // The user has no session until the email is confirmed, so the KTP goes to
    // a write-only "pending" path; the signup trigger links it to the profile.
    const ktpPath = `pending/${crypto.randomUUID()}.${extFor(data.ktpFile.type)}`;
    const upload = await supabase.storage.from('ktp').upload(ktpPath, data.ktpFile, {
      contentType: data.ktpFile.type,
      upsert: false,
    });
    if (upload.error) throw new Error('Gagal mengunggah foto KTP. Coba lagi.');

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.pass,
      options: {
        emailRedirectTo: redirectUrl(),
        data: {
          name: data.name,
          phone: data.phone,
          nik: data.nik,
          address: data.address,
          postal_code: data.postalCode,
          ktp_path: ktpPath,
        },
      },
    });
    if (error) throw new Error(error.message);
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  // The confirmation link comes back as /?code=... and supabase-js exchanges
  // it for a session on load. Here we just wait for that and check the result.
  const verifyEmail = async (_token: string): Promise<void> => {
    for (let i = 0; i < 10; i++) {
      const { data } = await supabase.auth.getUser();
      if (data.user?.email_confirmed_at) {
        setUser(await loadUser(data.user));
        return;
      }
      await new Promise(r => setTimeout(r, 500));
    }
    throw new Error('Tautan verifikasi tidak valid atau sudah kedaluwarsa.');
  };

  const resendVerificationEmail = async (email?: string): Promise<void> => {
    const target = email || user?.email;
    if (!target) throw new Error('Alamat email tidak diketahui.');
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: target,
      options: { emailRedirectTo: redirectUrl() },
    });
    if (error) throw new Error(error.message);
  };

  const updateUser = useCallback(
    async (updatedData: Partial<User>): Promise<void> => {
      if (!user) throw new Error('No user is logged in to update.');

      const patch: Record<string, unknown> = {};
      if (updatedData.name !== undefined) patch.name = updatedData.name;
      if (updatedData.phone !== undefined) patch.phone = updatedData.phone;
      if (updatedData.address !== undefined) patch.address = updatedData.address;
      if (updatedData.postalCode !== undefined) patch.postal_code = updatedData.postalCode;

      const picture = updatedData.profilePicture;
      if (picture && picture.startsWith('data:')) {
        const blob = await (await fetch(picture)).blob();
        const path = `${user.id}/avatar-${Date.now()}.${extFor(blob.type)}`;
        const up = await supabase.storage.from('avatars').upload(path, blob, { contentType: blob.type });
        if (up.error) throw new Error('Gagal mengunggah foto profil.');
        patch.avatar_url = supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
      }

      if (Object.keys(patch).length > 0) {
        const { error } = await supabase.from('profiles').update(patch).eq('id', user.id);
        if (error) throw new Error(error.message);
      }
      setUser({
        ...user,
        ...updatedData,
        profilePicture: (patch.avatar_url as string | undefined) ?? user.profilePicture,
      });
    },
    [user],
  );

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    verifyEmail,
    resendVerificationEmail,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
