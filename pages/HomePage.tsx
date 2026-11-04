import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Icon from '../components/Icon';
import FAQSection from '../components/FAQSection';
import { servicesData } from '../data/servicesData';

const openHumiChat = () => {
  window.dispatchEvent(new CustomEvent('openHumiChat'));
};

const askHumi = (prompt: string) => {
  window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', { detail: { prompt } }));
};

const scheduleVideoCall = () => {
  window.dispatchEvent(new CustomEvent('scheduleVideoCall'));
};

// True once the element has scrolled into view; stays true afterwards.
function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

// Fades its children up into place the first time they scroll into view.
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-6'} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

const Check: React.FC = () => (
  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-hh-indigo" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
  </Icon>
);

const Cross: React.FC = () => (
  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-hh-ruby" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </Icon>
);

const textLink = 'font-medium text-hh-indigo hover:text-hh-indigo-press underline-offset-4 hover:underline';

const topics = [
  'Apakah usaha saya wajib punya NIB?',
  'Lebih baik PT, CV, atau PT Perorangan?',
  'Apa yang harus dicek di kontrak reseller?',
  'Bagaimana cara mendaftarkan merek?',
  'Pembeli online tidak membayar, apa langkah saya?',
  'Bagaimana menagih piutang yang macet?',
  'Apakah karyawan kontrak wajib didaftarkan BPJS?',
  'Bolehkah memakai foto dari internet untuk promosi?',
];

const steps = [
  { title: 'Tanya', text: 'Ceritakan situasi Anda ke HUMI dan dapatkan penjelasan beserta dasar hukumnya.' },
  { title: 'Pilih layanan', text: 'Tentukan yang Anda butuhkan: pendirian usaha, merek, kontrak, atau konsultasi.' },
  { title: 'Lengkapi data', text: 'Isi formulir dan unggah dokumen. Tim kami memeriksa kelengkapannya.' },
  { title: 'Pantau', text: 'Lihat perkembangan setiap permintaan di halaman Layanan Saya.' },
  { title: 'Selesai', text: 'Terima dokumen resmi, atau lanjutkan ke advokat bila kasusnya perlu pendampingan.' },
];

const faqs = [
  {
    question: 'Apakah jawaban HUMI bisa dijadikan pegangan hukum?',
    answer: 'Jawaban HUMI adalah informasi hukum umum yang menyebutkan sumber peraturan dan statusnya, bukan pendapat hukum resmi. Untuk keputusan penting atau kasus berisiko tinggi, kami sarankan meminta advokat memeriksa.',
  },
  {
    question: 'Bagaimana jika HUMI tidak menemukan dasar hukumnya?',
    answer: 'HUMI akan mengatakannya terus terang dan tidak akan mengarang nomor pasal atau judul peraturan. Anda bisa melanjutkan pertanyaan ke konsultan atau advokat.',
  },
  {
    question: 'Bagaimana proses pendirian PT melalui HalloHukum?',
    answer: 'Isi formulir online dan unggah dokumen yang diperlukan. Tim kami menangani akta notaris, pengesahan Kemenkumham, hingga NIB, dan setiap tahap bisa Anda pantau di halaman Layanan Saya.',
  },
  {
    question: 'Apakah dokumen saya aman?',
    answer: 'Dokumen hanya bisa diakses oleh Anda dan pihak yang Anda izinkan. Kami mengelola data dengan mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.',
  },
];

// Questions scroll past in a continuous row; hovering pauses it. With reduced
// motion the row becomes a static, wrapping list.
const TopicMarquee: React.FC = () => {
  const chip = 'whitespace-nowrap text-sm text-hh-ink-2 bg-white border border-hh-line shadow-hh-1 rounded-full px-4 py-2 hover:border-hh-indigo/50 hover:text-hh-indigo transition-colors';
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex flex-shrink-0 gap-3 pr-3 motion-safe:animate-marquee-slow motion-reduce:flex-wrap motion-reduce:flex-shrink"
    >
      {topics.map((topic) => (
        <li key={topic}>
          <button onClick={() => askHumi(topic)} tabIndex={hidden ? -1 : undefined} className={chip}>{topic}</button>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none] hover:[&_ul]:[animation-play-state:paused] focus-within:[&_ul]:[animation-play-state:paused]">
      {row(false)}
      <div className="motion-reduce:hidden flex">{row(true)}</div>
    </div>
  );
};

const Flow: React.FC = () => {
  const [ref, inView] = useInView<HTMLOListElement>(0.3);
  return (
    <ol ref={ref} className="relative mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
      {/* The line fills left to right once the steps are on screen */}
      <span aria-hidden="true" className="hidden md:block absolute top-0 left-0 right-0 h-px bg-white/15" />
      <span
        aria-hidden="true"
        className={`hidden md:block absolute top-0 left-0 right-0 h-px bg-[#b9b0ff] origin-left transition-transform duration-[1800ms] ease-out ${inView ? 'scale-x-100' : 'motion-safe:scale-x-0'}`}
      />
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`flex md:block gap-4 md:pt-6 transition duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-4'}`}
          style={{ transitionDelay: inView ? `${200 + i * 300}ms` : '0ms' }}
        >
          <span className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-white text-hh-indigo text-sm font-semibold hh-tnum md:-mt-[42px] md:mb-4 ring-4 ring-hh-navy" aria-hidden="true">{i + 1}</span>
          <div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-[#c8cbe8]">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};

const featureIcon = 'flex h-11 w-11 items-center justify-center rounded-xl bg-hh-indigo-soft text-hh-indigo';

// The five things the platform does, in the strip under the hero
const features: { title: string; text: string; to?: string; onClick?: () => void; icon: React.ReactNode }[] = [
  {
    title: 'AI Legal Assistant',
    text: 'Tanya jawab hukum berbasis regulasi',
    onClick: openHumiChat,
    icon: <Icon className="w-6 h-6" aria-hidden="true"><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4" /><circle cx="12" cy="3" r="1" /><line x1="9" y1="13" x2="9" y2="15" /><line x1="15" y1="13" x2="15" y2="15" /><path d="M2 13v2M22 13v2" /></Icon>,
  },
  {
    title: 'Pembuatan Dokumen',
    text: 'Buat dokumen hukum siap pakai',
    to: '/layanan/pembuatan-kontrak',
    icon: <Icon className="w-6 h-6" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" /></Icon>,
  },
  {
    title: 'Legalitas Usaha',
    text: 'Panduan NIB, OSS, dan perizinan lainnya',
    to: '/layanan/legalitas-usaha',
    icon: <Icon className="w-6 h-6" aria-hidden="true"><path d="M3 9l1.5-5h15L21 9" /><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" /><path d="M5 12v8h14v-8" /><path d="M10 20v-5h4v5" /></Icon>,
  },
  {
    title: 'Konsultasi Profesional',
    text: 'Terhubung dengan advokat dan konsultan hukum',
    to: '/layanan/legal-advisor-on-demand',
    icon: <Icon className="w-6 h-6" aria-hidden="true"><circle cx="9" cy="8" r="4" /><path d="M2 21v-1a6 6 0 0 1 12 0v1" /><circle cx="17" cy="9" r="3" /><path d="M16 15a5 5 0 0 1 6 5v1" /></Icon>,
  },
  {
    title: 'Pemantauan Kepatuhan',
    text: 'Ingatkan kewajiban dan perubahan regulasi',
    onClick: () => askHumi('Kewajiban hukum apa saja yang harus rutin saya penuhi sebagai pemilik usaha, dan kapan tenggatnya?'),
    icon: <Icon className="w-6 h-6" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></Icon>,
  },
];

const FeatureStrip: React.FC = () => (
  <section aria-label="Fitur HalloHukum" className="border-y border-hh-line bg-white">
    <ul className="container mx-auto grid grid-cols-1 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
      {features.map((feature) => {
        const body = (
          <>
            <span className={featureIcon}>{feature.icon}</span>
            <span className="mt-4 block font-bold text-hh-navy">{feature.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-hh-mute">{feature.text}</span>
          </>
        );
        const cls = 'flex h-full w-full flex-col items-start py-7 text-left transition-colors hover:[&_span:nth-child(2)]:text-hh-indigo lg:px-6';
        return (
          <li key={feature.title} className="border-b border-hh-line last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:[&:first-child>*]:pl-0">
            {feature.to
              ? <Link to={feature.to} className={cls}>{body}</Link>
              : <button onClick={feature.onClick} className={cls}>{body}</button>}
          </li>
        );
      })}
    </ul>
  </section>
);

const stages = [
  {
    title: 'Memulai Usaha',
    text: 'Tentukan bentuk usaha, urus legalitas, dan siapkan dokumen dasar.',
    to: '/layanan/legalitas-usaha',
    icon: <Icon className="w-7 h-7 text-emerald-600" aria-hidden="true"><path d="M12 22V11" /><path d="M12 11C12 7 9 4 4 4c0 4 3 7 8 7z" /><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z" /></Icon>,
  },
  {
    title: 'Menjalankan Usaha',
    text: 'Penuhi kewajiban hukum, kelola kontrak, dan kurangi risiko.',
    to: '/layanan/pembuatan-kontrak',
    icon: <Icon className="w-7 h-7 text-hh-indigo" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></Icon>,
  },
  {
    title: 'Mengembangkan Usaha',
    text: 'Lindungi merek, jaga kepatuhan, dan dapatkan dukungan hukum lanjutan.',
    to: '/layanan/kekayaan-intelektual',
    icon: <Icon className="w-7 h-7 text-hh-indigo" aria-hidden="true"><rect x="3" y="14" width="4" height="7" rx="1" /><rect x="10" y="9" width="4" height="12" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></Icon>,
  },
];

const Stages: React.FC = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="container mx-auto grid items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-12 lg:px-8">
      <div>
        <h2 className="font-sans text-3xl font-[800] leading-[1.12] tracking-[-0.02em] text-hh-navy sm:text-[2.2rem]">Solusi Hukum untuk Setiap Tahap Usaha</h2>
        <p className="mt-4 leading-relaxed text-hh-ink-2">Dari memulai, menjalankan, hingga mengembangkan usaha, HalloHukum siap mendampingi Anda.</p>
      </div>
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-3">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.title}>
            {i > 0 && (
              <li aria-hidden="true" className="hidden items-center justify-center text-hh-navy md:flex">
                <Icon className="w-5 h-5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>
              </li>
            )}
            <li>
              <Link
                to={stage.to}
                className="flex h-full flex-col rounded-xl border border-hh-line bg-white p-5 shadow-hh-1 transition hover:border-hh-indigo/40 hover:shadow-hh-2"
              >
                {stage.icon}
                <span className="mt-3 font-bold text-hh-navy">{stage.title}</span>
                <span className="mt-1 text-sm leading-relaxed text-hh-ink-2">{stage.text}</span>
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </div>
  </section>
);

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <Stages />

      {/* Common questions: each one opens HUMI with the question filled in */}
      <section aria-labelledby="topics-title" className="bg-hh-soft border-y border-hh-line py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="topics-title" className="text-sm font-medium text-hh-mute">Coba tanyakan ke HUMI</h2>
        </div>
        <div className="mt-4 container mx-auto px-4 sm:px-6 lg:px-8">
          <TopicMarquee />
        </div>
      </section>

      {/* Services, straight from the service catalogue */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl sm:text-[2.6rem] font-normal leading-[1.1] tracking-[-0.02em] text-hh-ink">Satu tempat untuk seluruh urusan hukum usaha</h2>
            <p className="mt-4 text-lg text-hh-ink-2">Pakai yang Anda butuhkan saja. Semua permintaan tersimpan di satu akun, jadi Anda tidak perlu mengulang cerita dari awal.</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {servicesData.map((service, i) => (
              <Reveal key={service.slug} delay={i * 120} className="h-full">
                <Link
                  to={`/layanan/${service.slug}`}
                  className="group relative h-full flex flex-col bg-white rounded-xl border border-hh-line shadow-hh-1 p-6 transition duration-300 hover:shadow-hh-2 hover:border-[#d4dbe4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-indigo"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-hh-indigo-soft text-hh-indigo [&_svg]:w-6 [&_svg]:h-6">
                    {service.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-hh-ink">{service.title}</h3>
                  <p className="mt-2 text-sm text-hh-mute leading-relaxed">{service.shortDescription}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-hh-ink-2">
                    {service.serviceOptions.slice(0, 3).map((option) => (
                      <li key={option.slug} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-hh-indigo/60" />
                        {option.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-medium text-hh-indigo">
                    Lihat layanan
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></Icon>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-5 rounded-xl bg-hh-cream text-hh-ink p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-normal tracking-[-0.01em]">Belum yakin butuh layanan yang mana?</h3>
                <p className="mt-2 text-hh-ink-2 max-w-2xl">Ceritakan situasinya ke HUMI. Setiap jawaban menyebutkan asumsi, sumber peraturan, dan statusnya, lalu mengarahkan Anda ke layanan yang sesuai.</p>
              </div>
              <button
                onClick={openHumiChat}
                className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium py-3 px-6 bg-hh-indigo text-white hover:bg-[#4434d4] active:bg-hh-indigo-press transition-colors"
              >
                <Icon className="w-5 h-5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                Tanya HUMI
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="cara-kerja" className="scroll-mt-20 py-16 sm:py-20 lg:py-28 bg-hh-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl sm:text-[2.6rem] font-normal leading-[1.1] tracking-[-0.02em]">Dari pertanyaan pertama sampai dokumen di tangan</h2>
            <p className="mt-4 text-lg text-[#c8cbe8]">Anda bisa berhenti di tahap mana pun. Banyak pertanyaan sudah terjawab di tahap pertama.</p>
          </Reveal>
          <div className="md:mt-16">
            <Flow />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl sm:text-[2.6rem] font-normal leading-[1.1] tracking-[-0.02em] text-hh-ink">AI membantu. Untuk keputusan penting, manusia yang memverifikasi.</h2>
            <p className="mt-4 text-lg text-hh-ink-2">Hukum terlalu penting untuk ditebak. Ini batas yang kami pegang, dan Anda berhak tahu sejak awal.</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-hh-line border-t border-hh-line pt-10">
            <Reveal delay={0} className="md:pr-10">
              <h3 className="font-semibold text-hh-ink">Yang selalu kami lakukan</h3>
              <ul className="mt-4 space-y-3 text-hh-ink-2">
                <li className="flex gap-3"><Check />Menyebut sumber peraturan dan statusnya</li>
                <li className="flex gap-3"><Check />Mengatakan terus terang bila sumber tidak cukup</li>
                <li className="flex gap-3"><Check />Meneruskan kasus berisiko tinggi ke advokat</li>
              </ul>
            </Reveal>
            <Reveal delay={150} className="md:px-10">
              <h3 className="font-semibold text-hh-ink">Yang tidak akan dilakukan HUMI</h3>
              <ul className="mt-4 space-y-3 text-hh-ink-2">
                <li className="flex gap-3"><Cross />Mengarang nomor pasal, judul peraturan, atau kutipan</li>
                <li className="flex gap-3"><Cross />Menjanjikan kemenangan perkara</li>
                <li className="flex gap-3"><Cross />Mengirim dokumen Anda ke pihak lain tanpa izin</li>
              </ul>
            </Reveal>
            <Reveal delay={300} className="md:pl-10">
              <h3 className="font-semibold text-hh-ink">Data Anda</h3>
              <ul className="mt-4 space-y-3 text-hh-ink-2">
                <li className="flex gap-3"><Check />Dikelola dengan mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</li>
                <li className="flex gap-3"><Check />Dokumen hanya bisa dibuka oleh Anda dan pihak yang Anda izinkan</li>
              </ul>
              <Link to="/kebijakan-privasi" className={`mt-4 inline-block text-sm ${textLink}`}>Baca kebijakan privasi</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      {/* Closing CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-clip bg-hh-navy rounded-2xl px-6 py-10 sm:px-12 sm:py-14 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div aria-hidden="true" className="hh-mesh absolute -right-1/4 -bottom-1/2 h-[140%] w-[90%] opacity-50 [transform:skewY(-8deg)] motion-safe:[animation:hh-mesh-shift_16s_ease-in-out_infinite_alternate]" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#1c1e54_35%,rgba(28,30,84,.55))]" />
              <div className="relative lg:col-span-3">
                <h2 className="text-3xl sm:text-[2.4rem] font-normal leading-[1.1] tracking-[-0.02em] text-white">Mulai dari pertanyaan yang sedang Anda pikirkan.</h2>
                <p className="mt-3 text-[#c8cbe8]">Bertanya ke HUMI gratis. Untuk layanan berbayar, harga terlihat sebelum Anda memesan.</p>
              </div>
              <div className="relative lg:col-span-2 flex flex-col sm:flex-row lg:justify-end gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-full text-[15px] font-medium py-3 px-6 bg-white text-hh-indigo hover:bg-hh-indigo-soft transition-colors"
                >
                  Buat akun gratis
                </Link>
                <button
                  onClick={scheduleVideoCall}
                  className="inline-flex items-center justify-center rounded-full text-[15px] font-medium py-3 px-6 text-white ring-1 ring-inset ring-white/40 hover:bg-white/10 transition-colors"
                >
                  Jadwalkan konsultasi video
                </button>
              </div>
            </div>
          </Reveal>
          <p className="mt-6 text-sm text-hh-mute">
            Lihat paket dan biaya di halaman <Link to="/harga" className="font-medium text-hh-indigo hover:underline underline-offset-4">Harga</Link>.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
