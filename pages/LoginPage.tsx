import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../contexts/AuthContext';

type AccountType = 'clients' | 'partners' | 'admin' | 'guest';

// Clients, partners and admins all sign in with the same email account;
// the choice sets the heading and, for guests, swaps the form for a trial.
const accountTypes: { key: AccountType; label: string; hint: string; icon: React.ReactNode }[] = [
  { key: 'clients', label: 'Clients', hint: 'UMKM & pengguna umum', icon: <><circle cx="9" cy="8" r="4" /><path d="M2 21v-1a6 6 0 0 1 12 0v1" /><circle cx="17" cy="9" r="3" /><path d="M16 15a5 5 0 0 1 6 5v1" /></> },
  { key: 'partners', label: 'Partners', hint: 'Mitra, konsultan & institusi', icon: <><path d="M11 17l2 2a1 1 0 0 0 3-3" /><path d="M14 14l2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.9.9a1 1 0 0 1-3-3l2.8-2.8a3.9 3.9 0 0 1 4.8-.6l.5.3a2 2 0 0 0 1.4.3L21 4" /><path d="M21 3l1 11h-2" /><path d="M3 3L2 14l6.5 6.5a1 1 0 0 0 3-3" /><path d="M3 4h8" /></> },
  { key: 'admin', label: 'Admin', hint: 'Pengelola platform', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8l1.2 2.4 2.6.4-1.9 1.8.5 2.6L12 14l-2.4 1.2.5-2.6-1.9-1.8 2.6-.4z" /></> },
  { key: 'guest', label: 'Guest', hint: 'Akses terbatas (trial)', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></> },
];

const benefits = [
  { label: 'Konsultasi Hukum (AI)', icon: <><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4" /><line x1="9" y1="13" x2="9" y2="15" /><line x1="15" y1="13" x2="15" y2="15" /></> },
  { label: 'Pembuatan Dokumen', icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" /></> },
  { label: 'Legalitas Usaha (NIB, OSS)', icon: <><path d="M3 21h18" /><path d="M5 21V10l7-5 7 5v11" /><path d="M10 21v-5h4v5" /></> },
  { label: 'Pusat Regulasi', icon: <><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" /><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" /></> },
];

const inputWrap = 'flex items-center gap-3 rounded-xl border border-hh-line bg-white px-4 transition focus-within:border-hh-indigo focus-within:ring-2 focus-within:ring-hh-indigo/20';

const LoginPage: React.FC = () => {
  const [accountType, setAccountType] = useState<AccountType>('clients');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';
  const current = accountTypes.find(t => t.key === accountType)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await auth.login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Gagal masuk. Periksa email dan password Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tryAsGuest = () => {
    navigate('/');
    // Let the homepage mount before opening the chat over it
    setTimeout(() => window.dispatchEvent(new CustomEvent('openHumiChat')), 300);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f7f5ff] via-white to-[#efeaff]">
      <div className="container mx-auto grid gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-16">

        {/* Left: pitch and photo */}
        <div className="order-2 lg:order-1">
          <h1 className="font-sans text-3xl font-[800] leading-[1.1] tracking-[-0.025em] text-hh-navy sm:text-4xl xl:text-[2.9rem]">
            Platform Hukum Digital untuk Ekosistem UMKM
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-hh-ink-2">
            Konsultasi, legalitas, dokumen, dan kepatuhan usaha dalam satu platform berbasis AI.
          </p>
          <div className="relative mt-8">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2rem] sm:w-[78%]">
              <img
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop"
                alt="Pemilik usaha tersenyum sambil mengelola tokonya di tablet"
                className="h-full w-full object-cover object-[72%_center]"
              />
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:w-64 sm:-translate-y-1/2">
              {benefits.map(item => (
                <li key={item.label} className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-4 shadow-hh-2 ring-1 ring-hh-line">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-hh-indigo-soft text-hh-indigo">
                    <Icon className="w-[18px] h-[18px]" aria-hidden="true">{item.icon}</Icon>
                  </span>
                  <span className="flex-1 text-sm font-semibold text-hh-navy">{item.label}</span>
                  <Icon className="w-5 h-5 flex-shrink-0 text-emerald-500" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="8 12 11 15 16 9" /></Icon>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: sign-in card */}
        <div className="order-1 rounded-3xl bg-white p-6 shadow-hh-3 ring-1 ring-hh-line sm:p-8 lg:order-2 xl:p-10">
          <h2 className="font-sans text-3xl font-[800] tracking-[-0.02em] text-hh-navy">Masuk ke HalloHukum</h2>
          <p className="mt-2 text-hh-ink-2">Pilih jenis akun dan masuk untuk mengakses layanan sesuai kebutuhan Anda.</p>

          <fieldset className="mt-6">
            <legend className="sr-only">Jenis akun</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {accountTypes.map(type => {
                const selected = type.key === accountType;
                return (
                  <label
                    key={type.key}
                    className={`relative flex cursor-pointer flex-col items-center rounded-2xl border p-3 text-center transition focus-within:ring-2 focus-within:ring-hh-indigo/40 ${
                      selected ? 'border-hh-indigo bg-hh-indigo-soft/60' : 'border-hh-line bg-white hover:border-hh-indigo/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="account-type"
                      value={type.key}
                      checked={selected}
                      onChange={() => { setAccountType(type.key); setError(''); }}
                      className="sr-only"
                    />
                    {selected && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-hh-indigo text-white">
                        <Icon className="w-3 h-3" strokeWidth={3} aria-hidden="true"><polyline points="20 6 9 17 4 12" /></Icon>
                      </span>
                    )}
                    <Icon className={`w-7 h-7 ${selected ? 'text-hh-indigo' : 'text-hh-navy'}`} strokeWidth={1.7} aria-hidden="true">{type.icon}</Icon>
                    <span className={`mt-2 text-sm font-bold ${selected ? 'text-hh-indigo' : 'text-hh-navy'}`}>{type.label}</span>
                    <span className="mt-0.5 text-xs leading-snug text-hh-mute">{type.hint}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <h3 className="mt-8 text-lg font-bold text-hh-navy">Masuk sebagai {current.label}</h3>

          {accountType === 'guest' ? (
            <div className="mt-4 rounded-2xl bg-hh-soft p-5">
              <p className="text-sm leading-relaxed text-hh-ink-2">
                Tanpa akun, Anda bisa bertanya ke HUMI dan membaca artikel. Untuk memesan layanan dan menyimpan dokumen, Anda perlu akun.
              </p>
              <button
                type="button"
                onClick={tryAsGuest}
                className="mt-4 w-full rounded-xl bg-hh-indigo py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4434d4]"
              >
                Coba HUMI tanpa akun
              </button>
            </div>
          ) : (
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
              {accountType === 'partners' && (
                <p className="rounded-xl bg-hh-soft px-4 py-3 text-sm text-hh-ink-2">
                  Belum menjadi partner?{' '}
                  <Link to="/partner" className="font-semibold text-hh-indigo hover:underline">Daftarkan firma Anda</Link>.
                </p>
              )}
              {error && (
                <p role="alert" className="rounded-xl bg-hh-ruby/10 px-4 py-3 text-sm text-hh-ruby">{error}</p>
              )}
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <div className={inputWrap}>
                  <Icon className="w-5 h-5 flex-shrink-0 text-hh-mute" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 6 12 13 2 6" /></Icon>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] text-hh-ink placeholder-hh-mute focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className={inputWrap}>
                  <Icon className="w-5 h-5 flex-shrink-0 text-hh-mute" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></Icon>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] text-hh-ink placeholder-hh-mute focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    aria-pressed={showPassword}
                    className="flex-shrink-0 rounded p-1 text-hh-mute hover:text-hh-indigo"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true">
                      {showPassword
                        ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                        : <><path d="M17.9 17.9A10.1 10.1 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.1-5.9" /><path d="M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2" /><line x1="1" y1="1" x2="23" y2="23" /></>}
                    </Icon>
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#5b34d6] to-[#4a22c4] py-3.5 text-[15px] font-semibold text-white shadow-hh-2 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Memproses...' : 'Masuk'}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-hh-ink-2">
            Belum punya akun?{' '}
            <Link to="/signup" className="font-semibold text-hh-indigo hover:underline">Daftar Gratis</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
