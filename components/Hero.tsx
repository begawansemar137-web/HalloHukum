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
// drawn as a product mockup (hairline border, soft blue-tinted shadow).
const mockup = 'bg-white rounded-2xl border border-hh-line shadow-hh-3 text-left text-hh-ink';
const tag = 'text-xs text-hh-mute border border-hh-line rounded-full px-2.5 py-0.5';

const AnswerVisual: React.FC<{ active: boolean }> = ({ active }) => {
  const part = (i: number) => ({
    className: `transition duration-500 ease-out ${active ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-2'}`,
    style: { transitionDelay: active ? `${250 + i * 400}ms` : '0ms' },
  });
  return (
    <figure aria-label="Contoh jawaban HUMI" className={`${mockup} overflow-hidden`}>
      <div className="flex gap-3 p-4 sm:p-5 bg-hh-soft border-b border-hh-line">
        <span aria-hidden="true" className="flex-shrink-0 h-8 w-8 rounded-full bg-hh-line text-hh-ink-2 text-sm font-semibold flex items-center justify-center">R</span>
        <p className="text-hh-ink-2 text-[15px]">Saya jualan katering rumahan, omzet sekitar Rp15 juta per bulan. Apakah saya wajib punya NIB?</p>
      </div>
      <div className="p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex-shrink-0 h-8 w-8 rounded-full bg-hh-indigo text-white text-sm font-bold flex items-center justify-center">H</span>
          <strong className="font-semibold">HUMI</strong>
          <span className={`ml-auto ${tag}`}>Contoh jawaban</span>
        </div>
        <div {...part(0)}>
          <h3 className="text-sm font-semibold">Ringkasan</h3>
          <p className="mt-1 text-hh-ink-2 text-sm leading-relaxed">Ya, sebaiknya daftarkan NIB melalui OSS. Untuk usaha mikro berisiko rendah, NIB sekaligus menjadi izin berusaha, dan tidak dipungut biaya.</p>
        </div>
        <div {...part(1)}>
          <h3 className="text-sm font-semibold">Dasar hukum</h3>
          <p className="mt-1 text-hh-ink-2 text-sm leading-relaxed">
            <span className="font-serif font-semibold text-hh-ink">PP No. 5 Tahun 2021</span> tentang Perizinan Berusaha Berbasis Risiko{' '}
            <span className="inline-block align-middle text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">Berlaku</span>
          </p>
        </div>
        <div {...part(2)}>
          <p className="text-xs text-hh-mute border-t border-hh-line pt-3">
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
  <figure aria-label="Contoh pelacakan pendirian PT" className={`${mockup} p-5 sm:p-6`}>
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs text-hh-mute">Pendirian PT</p>
        <p className="mt-0.5 font-semibold">PT Sumber Rasa Nusantara</p>
      </div>
      <span className={tag}>Contoh</span>
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
              <span aria-hidden="true" className={`absolute left-[11px] top-6 bottom-0 w-0.5 ${done ? 'bg-hh-indigo' : 'bg-hh-line'}`} />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center ${
                done ? 'bg-hh-indigo text-white' : now ? 'bg-white ring-2 ring-hh-indigo' : 'bg-white border-2 border-hh-line'
              }`}
            >
              {done && <Icon className="w-3.5 h-3.5" strokeWidth={3}><polyline points="20 6 9 17 4 12"></polyline></Icon>}
              {now && <span className="h-2 w-2 rounded-full bg-hh-indigo motion-safe:animate-pulse" />}
            </span>
            <div className="flex-1 flex flex-wrap justify-between gap-x-3">
              <span className={`text-sm ${now ? 'font-semibold' : done ? 'text-hh-ink-2' : 'text-hh-mute'}`}>{step.label}</span>
              {step.time && <span className={`hh-tnum text-xs ${now ? 'text-hh-indigo font-medium' : 'text-hh-mute'}`}>{step.time}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  </figure>
);

const ContractVisual: React.FC<{ active: boolean }> = ({ active }) => (
  <figure aria-label="Contoh klausul kontrak yang ditandai" className={`${mockup} p-5 sm:p-6`}>
    <p className="text-xs text-hh-mute">Perjanjian Distribusi, Pasal 7 ayat (2)</p>
    <p className="mt-3 font-serif text-[15px] leading-relaxed text-hh-ink">
      Distributor wajib membayar seluruh tagihan dalam waktu 7 (tujuh) hari kalender sejak barang dikirim,{' '}
      {/* The highlighter sweeps across the risky clause when the slide comes in */}
      <mark
        className="text-hh-ink px-0.5 bg-no-repeat transition-[background-size] duration-1000 ease-out"
        style={{
          backgroundColor: 'transparent',
          backgroundImage: 'linear-gradient(rgba(255,179,138,.55), rgba(255,179,138,.55))',
          backgroundSize: active || prefersReducedMotion() ? '100% 100%' : '0% 100%',
          transitionDelay: active ? '500ms' : '0ms',
        }}
      >
        dan Prinsipal berhak mengakhiri perjanjian ini secara sepihak tanpa pemberitahuan terlebih dahulu
      </mark>{' '}
      apabila terjadi keterlambatan pembayaran.
    </p>
    <div
      className={`mt-4 rounded-lg bg-hh-soft border border-hh-line p-3 transition duration-500 ${active ? 'opacity-100' : 'motion-safe:opacity-0'}`}
      style={{ transitionDelay: active ? '1400ms' : '0ms' }}
    >
      <p className="text-sm font-semibold flex items-center gap-2">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-hh-ruby" />
        Perlu dicermati
      </p>
      <p className="mt-1 text-sm text-hh-ink-2">Hak pemutusan sepihak hanya dimiliki satu pihak. Minta masa tenggang dan pemberitahuan tertulis.</p>
    </div>
  </figure>
);

const marks = [
  { name: 'SENJA KOPI', note: 'Mirip secara bunyi', tone: 'text-amber-800 bg-amber-50', label: 'Perlu dicermati' },
  { name: 'PAGI SENJA', note: 'Kelas berbeda', tone: 'text-emerald-700 bg-emerald-50', label: 'Aman' },
];

const TrademarkVisual: React.FC<{ active: boolean }> = ({ active }) => (
  <figure aria-label="Contoh hasil pengecekan merek" className={`${mockup} p-5 sm:p-6`}>
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs text-hh-mute">Pengecekan merek</p>
        <p className="mt-0.5 font-semibold">"Kopi Senja Pagi"</p>
        <p className="text-sm text-hh-mute">Kelas 30: kopi, teh, dan olahannya</p>
      </div>
      <span className={tag}>Contoh</span>
    </div>
    <ul className="mt-5 divide-y divide-hh-line border-y border-hh-line">
      {marks.map((m, i) => (
        <li
          key={m.name}
          className={`flex items-center justify-between gap-3 py-3 transition duration-500 ${active ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-2'}`}
          style={{ transitionDelay: active ? `${400 + i * 350}ms` : '0ms' }}
        >
          <div>
            <p className="text-sm font-semibold">{m.name}</p>
            <p className="text-xs text-hh-mute">{m.note}</p>
          </div>
          <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${m.tone}`}>{m.label}</span>
        </li>
      ))}
    </ul>
    <p className="mt-4 text-sm text-hh-ink-2">Konsultan kami menyarankan kelas dan elemen merek sebelum pengajuan ke DJKI.</p>
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

// One filled indigo pill per band; the second action is an outline pill.
const btnPrimary = 'inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium py-3 px-6 bg-hh-indigo text-white hover:bg-[#4434d4] active:bg-hh-indigo-press transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-indigo';
const btnSecondary = 'inline-flex items-center justify-center rounded-full text-[15px] font-medium py-3 px-6 bg-white/80 backdrop-blur text-hh-indigo ring-1 ring-inset ring-hh-indigo/40 hover:ring-hh-indigo transition';

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
      className="relative overflow-clip bg-white text-hh-ink"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={onKeyDown}
    >
      {/* Gradient mesh across the upper part of the hero, fading into the white canvas */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[560px] sm:h-[620px] [mask-image:linear-gradient(to_bottom,black_45%,transparent)]">
        <div className="hh-mesh absolute -inset-x-[10%] -top-40 h-[520px] opacity-80 origin-top-left [transform:skewY(-8deg)] motion-safe:[animation:hh-mesh-shift_14s_ease-in-out_infinite_alternate]" />
      </div>
      {/* Keeps the headline column readable over the mesh */}
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(100deg,rgba(255,255,255,.9)_0%,rgba(255,255,255,.6)_38%,rgba(255,255,255,0)_62%)]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-24 pb-10">
        <div className="grid" aria-live={running ? 'off' : 'polite'}>
          {slides.map((slide, i) => {
            const isActive = i === active && shown;
            const reveal = isActive ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-4';
            const headingClass = `text-[2.4rem] sm:text-5xl lg:text-[3.5rem] font-normal leading-[1.06] tracking-[-0.025em] max-w-[16ch] transition duration-700 ease-out ${reveal}`;
            const { Visual } = slide;
            return (
              <div
                key={slide.tab}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} dari ${slides.length}: ${slide.tab}`}
                aria-hidden={i !== active}
                inert={i !== active}
                className={`col-start-1 row-start-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center transition-opacity duration-700 ${
                  i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <div className="lg:col-span-6">
                  {i === 0 ? <h1 className={headingClass}>{slide.headline}</h1> : <h2 className={headingClass}>{slide.headline}</h2>}
                  <p
                    className={`mt-6 text-lg text-hh-ink-2 leading-relaxed max-w-xl transition duration-700 ease-out ${reveal}`}
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
                        <Icon className="w-[18px] h-[18px]" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                        {slide.primary.label}
                      </button>
                    )}
                    <Link to={slide.secondary.to} className={btnSecondary}>{slide.secondary.label}</Link>
                  </div>
                </div>
                <div
                  className={`lg:col-span-6 lg:pl-4 transition duration-700 ease-out ${
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
        <div className="mt-14 lg:mt-20 flex items-end gap-3 sm:gap-4">
          <div className="flex-1 grid grid-cols-4 gap-2 sm:gap-4">
            {slides.map((slide, i) => (
              <button
                key={slide.tab}
                onClick={() => setActive(i)}
                aria-label={`Tampilkan slide ${i + 1}: ${slide.tab}`}
                aria-current={i === active ? 'true' : undefined}
                className="group text-left pt-3 focus-visible:outline-none"
              >
                <span className="block h-0.5 rounded-full bg-hh-line overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-hh-indigo group-focus-visible:ring-offset-2">
                  {i === active && (
                    <span
                      key={active}
                      className="block h-full bg-hh-indigo origin-left"
                      style={
                        autoplay
                          ? { animation: `hh-progress ${SLIDE_MS}ms linear forwards`, animationPlayState: running ? 'running' : 'paused' }
                          : undefined
                      }
                      onAnimationEnd={next}
                    />
                  )}
                </span>
                <span className={`hidden sm:block mt-3 text-sm transition-colors ${i === active ? 'text-hh-ink font-medium' : 'text-hh-mute group-hover:text-hh-ink-2'}`}>
                  {slide.tab}
                </span>
              </button>
            ))}
          </div>
          {autoplay && (
            <button
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Putar slide otomatis' : 'Jeda slide otomatis'}
              className="flex-shrink-0 h-9 w-9 rounded-full ring-1 ring-inset ring-hh-line bg-white text-hh-mute hover:text-hh-ink hover:ring-hh-mute flex items-center justify-center transition"
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
