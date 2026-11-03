import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const SLIDE_MS = 8000;

const openHumiChat = () => {
  window.dispatchEvent(new CustomEvent('openHumiChat'));
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Each visual is an example of what the user actually gets from that service,
// built in HTML so it stays sharp and needs no stock photo.

const AnswerVisual: React.FC<{ active: boolean }> = ({ active }) => {
  const part = (i: number) => ({
    className: `transition duration-500 ease-out ${active ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-2'}`,
    style: { transitionDelay: active ? `${250 + i * 400}ms` : '0ms' },
  });
  return (
    <figure aria-label="Contoh jawaban HUMI" className="bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden text-left">
      <div className="flex gap-3 p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
        <span aria-hidden="true" className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-300 text-slate-700 text-sm font-semibold flex items-center justify-center">R</span>
        <p className="text-slate-700 text-[15px]">Saya jualan katering rumahan, omzet sekitar Rp15 juta per bulan. Apakah saya wajib punya NIB?</p>
      </div>
      <div className="p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-dark text-brand-accent text-sm font-bold flex items-center justify-center">H</span>
          <strong className="text-brand-dark">HUMI</strong>
          <span className="ml-auto text-xs text-slate-500 border border-slate-200 rounded-full px-2.5 py-0.5">Contoh jawaban</span>
        </div>
        <div {...part(0)}>
          <h3 className="text-sm font-semibold text-brand-dark">Ringkasan</h3>
          <p className="mt-1 text-slate-600 text-sm leading-relaxed">Ya, sebaiknya daftarkan NIB melalui OSS. Untuk usaha mikro berisiko rendah, NIB sekaligus menjadi izin berusaha, dan tidak dipungut biaya.</p>
        </div>
        <div {...part(1)}>
          <h3 className="text-sm font-semibold text-brand-dark">Dasar hukum</h3>
          <p className="mt-1 text-slate-600 text-sm leading-relaxed">
            <span className="font-serif font-semibold text-brand-dark">PP No. 5 Tahun 2021</span> tentang Perizinan Berusaha Berbasis Risiko{' '}
            <span className="inline-block align-middle text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">Berlaku</span>
          </p>
        </div>
        <div {...part(2)}>
          <p className="text-xs text-slate-500 border-t border-slate-100 pt-3">
            Informasi umum, bukan pendapat hukum. Kasus berisiko tinggi diteruskan ke advokat.
          </p>
        </div>
      </div>
    </figure>
  );
};

const legalSteps = [
  { label: 'Data dan dokumen lengkap', time: '3 Nov' },
  { label: 'Akta pendirian ditandatangani', time: '5 Nov' },
  { label: 'Pengesahan Kemenkumham', time: 'Sedang diproses' },
  { label: 'NIB terbit', time: '' },
];

const LegalVisual: React.FC<{ active: boolean }> = ({ active }) => (
  <figure aria-label="Contoh pelacakan pendirian PT" className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-5 sm:p-6 text-left">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs text-slate-500">Pendirian PT</p>
        <p className="mt-0.5 font-bold text-brand-dark">PT Sumber Rasa Nusantara</p>
      </div>
      <span className="text-xs text-slate-500 border border-slate-200 rounded-full px-2.5 py-0.5">Contoh</span>
    </div>
    <ol className="mt-5">
      {legalSteps.map((step, i) => {
        const done = i < 2;
        const now = i === 2;
        return (
          <li
            key={step.label}
            className={`relative flex gap-4 pb-5 last:pb-0 transition duration-500 ${active ? 'opacity-100 translate-x-0' : 'motion-safe:opacity-0 motion-safe:-translate-x-2'}`}
            style={{ transitionDelay: active ? `${250 + i * 300}ms` : '0ms' }}
          >
            {i < legalSteps.length - 1 && (
              <span aria-hidden="true" className={`absolute left-[11px] top-6 bottom-0 w-0.5 ${done ? 'bg-emerald-500' : 'bg-slate-200'}`} />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center ${
                done ? 'bg-emerald-500 text-white' : now ? 'bg-brand-accent ring-4 ring-brand-accent/30' : 'bg-white border-2 border-slate-300'
              }`}
            >
              {done && <Icon className="w-3.5 h-3.5" strokeWidth={3}><polyline points="20 6 9 17 4 12"></polyline></Icon>}
              {now && <span className="h-2 w-2 rounded-full bg-brand-dark motion-safe:animate-pulse" />}
            </span>
            <div className="flex-1 flex flex-wrap justify-between gap-x-3">
              <span className={`text-sm ${now ? 'font-semibold text-brand-dark' : done ? 'text-slate-700' : 'text-slate-400'}`}>{step.label}</span>
              {step.time && <span className={`text-xs ${now ? 'text-amber-700 font-medium' : 'text-slate-400'}`}>{step.time}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  </figure>
);

const ContractVisual: React.FC<{ active: boolean }> = ({ active }) => (
  <figure aria-label="Contoh klausul kontrak yang ditandai" className="bg-[#FBFAF6] rounded-2xl shadow-2xl shadow-black/30 p-5 sm:p-6 text-left font-serif">
    <p className="font-sans text-xs text-slate-500">Perjanjian Distribusi, Pasal 7 ayat (2)</p>
    <p className="mt-3 text-[15px] leading-relaxed text-slate-800">
      Distributor wajib membayar seluruh tagihan dalam waktu 7 (tujuh) hari kalender sejak barang dikirim,{' '}
      {/* The highlighter sweeps across the risky clause when the slide comes in */}
      <mark
        className="text-slate-900 px-0.5 bg-no-repeat transition-[background-size] duration-1000 ease-out"
        style={{
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(rgba(251,191,36,.55), rgba(251,191,36,.55))',
          backgroundSize: active || prefersReducedMotion() ? '100% 100%' : '0% 100%',
          transitionDelay: active ? '500ms' : '0ms',
        }}
      >
        dan Prinsipal berhak mengakhiri perjanjian ini secara sepihak tanpa pemberitahuan terlebih dahulu
      </mark>{' '}
      apabila terjadi keterlambatan pembayaran.
    </p>
    <div
      className={`mt-4 font-sans border-l-2 border-brand-accent pl-3 transition duration-500 ${active ? 'opacity-100' : 'motion-safe:opacity-0'}`}
      style={{ transitionDelay: active ? '1400ms' : '0ms' }}
    >
      <p className="text-sm font-semibold text-brand-dark">Perlu dicermati</p>
      <p className="text-sm text-slate-600">Hak pemutusan sepihak hanya dimiliki satu pihak. Minta masa tenggang dan pemberitahuan tertulis.</p>
    </div>
  </figure>
);

const marks = [
  { name: 'SENJA KOPI', note: 'Mirip secara bunyi', tone: 'text-amber-700 bg-amber-50 border-amber-200', label: 'Perlu dicermati' },
  { name: 'PAGI SENJA', note: 'Kelas berbeda', tone: 'text-emerald-700 bg-emerald-50 border-emerald-200', label: 'Aman' },
];

const TrademarkVisual: React.FC<{ active: boolean }> = ({ active }) => (
  <figure aria-label="Contoh hasil pengecekan merek" className="bg-white rounded-2xl shadow-2xl shadow-black/30 p-5 sm:p-6 text-left">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs text-slate-500">Pengecekan merek</p>
        <p className="mt-0.5 font-bold text-brand-dark">"Kopi Senja Pagi"</p>
        <p className="text-sm text-slate-500">Kelas 30: kopi, teh, dan olahannya</p>
      </div>
      <span className="text-xs text-slate-500 border border-slate-200 rounded-full px-2.5 py-0.5">Contoh</span>
    </div>
    <ul className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
      {marks.map((m, i) => (
        <li
          key={m.name}
          className={`flex items-center justify-between gap-3 py-3 transition duration-500 ${active ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-2'}`}
          style={{ transitionDelay: active ? `${400 + i * 350}ms` : '0ms' }}
        >
          <div>
            <p className="text-sm font-semibold text-slate-800">{m.name}</p>
            <p className="text-xs text-slate-500">{m.note}</p>
          </div>
          <span className={`text-xs font-semibold border rounded px-1.5 py-0.5 ${m.tone}`}>{m.label}</span>
        </li>
      ))}
    </ul>
    <p className="mt-4 text-sm text-slate-600">Konsultan kami menyarankan kelas dan elemen merek sebelum pengajuan ke DJKI.</p>
  </figure>
);

type Slide = {
  tab: string;
  headline: string;
  text: string;
  primary: { label: string; to?: string; onClick?: () => void };
  secondary: { label: string; to: string };
  Visual: React.FC<{ active: boolean }>;
};

const slides: Slide[] = [
  {
    tab: 'Tanya HUMI',
    headline: 'Pertanyaan hukum usaha, dijawab dengan dasar yang bisa diperiksa.',
    text: 'HUMI menjelaskan aturan yang berlaku untuk usaha Anda, lengkap dengan sumber peraturan dan statusnya. Gratis untuk mulai.',
    primary: { label: 'Tanya HUMI gratis', onClick: openHumiChat },
    secondary: { label: 'Lihat semua layanan', to: '/layanan' },
    Visual: AnswerVisual,
  },
  {
    tab: 'Legalitas usaha',
    headline: 'Dirikan PT atau CV tanpa bolak-balik kantor.',
    text: 'Unggah dokumen dari rumah. Kami mengurus akta, pengesahan, sampai NIB terbit, dan setiap tahapnya bisa Anda pantau.',
    primary: { label: 'Dirikan usaha', to: '/layanan/legalitas-usaha' },
    secondary: { label: 'Bandingkan PT dan CV', to: '/layanan/legalitas-usaha' },
    Visual: LegalVisual,
  },
  {
    tab: 'Kontrak',
    headline: 'Kenali klausul berisiko sebelum Anda tanda tangan.',
    text: 'Buat kontrak dari awal atau minta kontrak dari mitra ditinjau. Kami tandai bagian yang merugikan dan sarankan perbaikannya.',
    primary: { label: 'Layanan kontrak', to: '/layanan/pembuatan-kontrak' },
    secondary: { label: 'Konsultasi dengan ahli', to: '/layanan/legal-advisor-on-demand' },
    Visual: ContractVisual,
  },
  {
    tab: 'Merek',
    headline: 'Lindungi nama dan logo usaha sebelum dipakai orang lain.',
    text: 'Kami cek kemiripan dengan merek terdaftar, pilihkan kelas yang tepat, lalu ajukan pendaftarannya ke DJKI.',
    primary: { label: 'Daftarkan merek', to: '/layanan/kekayaan-intelektual' },
    secondary: { label: 'Konsultasi dengan ahli', to: '/layanan/legal-advisor-on-demand' },
    Visual: TrademarkVisual,
  },
];

const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent';
const btnGhost = 'inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 transition-colors';

// Homepage banner: one slide per service, auto-advancing. The progress bar under the
// active tab drives the timing, so hovering, focusing, or pausing simply pauses it.
const Hero: React.FC = () => {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [autoplay] = useState(() => !prefersReducedMotion());
  const [shown, setShown] = useState(false);

  // Let the first slide animate in after the initial paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + slides.length) % slides.length), []);

  const running = autoplay && !userPaused && !hovered;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sorotan layanan HalloHukum"
      className="relative overflow-clip bg-brand-dark text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={onKeyDown}
    >
      {/* Background: dotted grid plus two slow-moving glows */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div aria-hidden="true" className="absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full bg-brand-accent/20 blur-3xl motion-safe:[animation:hh-drift_18s_ease-in-out_infinite_alternate]" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-brand-secondary/20 blur-3xl motion-safe:[animation:hh-drift_22s_ease-in-out_infinite_alternate-reverse]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="grid" aria-live={running ? 'off' : 'polite'}>
          {slides.map((slide, i) => {
            const isActive = i === active && shown;
            const reveal = isActive ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-4';
            const { Visual } = slide;
            return (
              <div
                key={slide.tab}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} dari ${slides.length}: ${slide.tab}`}
                aria-hidden={i !== active}
                inert={i !== active}
                className={`col-start-1 row-start-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center transition-opacity duration-700 ${
                  i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="lg:col-span-6">
                  {i === 0 ? (
                    <h1 className={`text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight max-w-[17ch] transition duration-700 ease-out ${reveal}`}>
                      {slide.headline}
                    </h1>
                  ) : (
                    <h2 className={`text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight max-w-[17ch] transition duration-700 ease-out ${reveal}`}>
                      {slide.headline}
                    </h2>
                  )}
                  <p
                    className={`mt-6 text-lg text-slate-300 leading-relaxed max-w-xl transition duration-700 ease-out ${reveal}`}
                    style={{ transitionDelay: isActive ? '120ms' : '0ms' }}
                  >
                    {slide.text}
                  </p>
                  <div
                    className={`mt-8 flex flex-col sm:flex-row gap-3 transition duration-700 ease-out ${reveal}`}
                    style={{ transitionDelay: isActive ? '220ms' : '0ms' }}
                  >
                    {slide.primary.to ? (
                      <Link to={slide.primary.to} className={btnPrimary}>{slide.primary.label}</Link>
                    ) : (
                      <button onClick={slide.primary.onClick} className={btnPrimary}>
                        <Icon className="w-5 h-5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                        {slide.primary.label}
                      </button>
                    )}
                    <Link to={slide.secondary.to} className={btnGhost}>{slide.secondary.label}</Link>
                  </div>
                </div>
                <div
                  className={`lg:col-span-6 lg:pl-6 transition duration-700 ease-out ${
                    isActive ? 'opacity-100 translate-y-0 scale-100' : 'motion-safe:opacity-0 motion-safe:translate-y-6 motion-safe:scale-[0.98]'
                  }`}
                  style={{ transitionDelay: isActive ? '150ms' : '0ms' }}
                >
                  <Visual active={isActive} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide controls: each tab names its slide and fills up until the next one */}
        <div className="mt-12 lg:mt-16 flex items-end gap-3 sm:gap-4">
          <div className="flex-1 grid grid-cols-4 gap-2 sm:gap-4">
            {slides.map((slide, i) => (
              <button
                key={slide.tab}
                onClick={() => setActive(i)}
                aria-label={`Tampilkan slide ${i + 1}: ${slide.tab}`}
                aria-current={i === active ? 'true' : undefined}
                className="group text-left pt-3 focus-visible:outline-none"
              >
                <span className="block h-1 rounded-full bg-white/15 overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-brand-accent group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-brand-dark">
                  {i === active && (
                    <span
                      key={active}
                      className="block h-full bg-brand-accent origin-left"
                      style={
                        autoplay
                          ? { animation: `hh-progress ${SLIDE_MS}ms linear forwards`, animationPlayState: running ? 'running' : 'paused' }
                          : undefined
                      }
                      onAnimationEnd={next}
                    />
                  )}
                </span>
                <span className={`hidden sm:block mt-3 text-sm transition-colors ${i === active ? 'text-white font-semibold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                  {slide.tab}
                </span>
              </button>
            ))}
          </div>
          {autoplay && (
            <button
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Putar slide otomatis' : 'Jeda slide otomatis'}
              className="flex-shrink-0 h-9 w-9 rounded-full ring-1 ring-inset ring-white/25 text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              {userPaused ? (
                <Icon className="w-4 h-4" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4"></polygon></Icon>
              ) : (
                <Icon className="w-4 h-4" aria-hidden="true"><line x1="9" y1="5" x2="9" y2="19"></line><line x1="15" y1="5" x2="15" y2="19"></line></Icon>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
