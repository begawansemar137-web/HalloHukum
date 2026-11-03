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
  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
  </Icon>
);

const Cross: React.FC = () => (
  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-700" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </Icon>
);

const textLink = 'font-semibold text-brand-dark underline decoration-brand-accent decoration-2 underline-offset-4 hover:decoration-brand-dark';

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
  const chip = 'whitespace-nowrap text-sm text-slate-700 bg-white border border-slate-200 rounded-full px-4 py-2 hover:border-brand-dark hover:text-brand-dark transition-colors';
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
      <span aria-hidden="true" className="hidden md:block absolute top-0 left-0 right-0 h-px bg-slate-700" />
      <span
        aria-hidden="true"
        className={`hidden md:block absolute top-0 left-0 right-0 h-px bg-brand-accent origin-left transition-transform duration-[1800ms] ease-out ${inView ? 'scale-x-100' : 'motion-safe:scale-x-0'}`}
      />
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`flex md:block gap-4 md:pt-6 transition duration-500 ease-out ${inView ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-4'}`}
          style={{ transitionDelay: inView ? `${200 + i * 300}ms` : '0ms' }}
        >
          <span className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent text-brand-dark font-bold tabular-nums md:-mt-[42px] md:mb-4 ring-4 ring-brand-dark" aria-hidden="true">{i + 1}</span>
          <div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-slate-300">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

      {/* Common questions: each one opens HUMI with the question filled in */}
      <section aria-labelledby="topics-title" className="bg-brand-light border-b border-slate-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="topics-title" className="text-sm font-semibold text-slate-600">Coba tanyakan ke HUMI</h2>
        </div>
        <div className="mt-4 container mx-auto px-4 sm:px-6 lg:px-8">
          <TopicMarquee />
        </div>
      </section>

      {/* Services, straight from the service catalogue */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">Satu tempat untuk seluruh urusan hukum usaha</h2>
            <p className="mt-4 text-lg text-slate-600">Pakai yang Anda butuhkan saja. Semua permintaan tersimpan di satu akun, jadi Anda tidak perlu mengulang cerita dari awal.</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {servicesData.map((service, i) => (
              <Reveal key={service.slug} delay={i * 120} className="h-full">
                <Link
                  to={`/layanan/${service.slug}`}
                  className="group relative h-full flex flex-col bg-white rounded-2xl border border-slate-200 p-6 overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 hover:border-slate-300"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-dark text-brand-accent transition-transform duration-300 group-hover:scale-110 [&_svg]:w-6 [&_svg]:h-6">
                    {service.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-brand-dark">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.shortDescription}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                    {service.serviceOptions.slice(0, 3).map((option) => (
                      <li key={option.slug} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-accent" />
                        {option.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark">
                    Lihat layanan
                    <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></Icon>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-5 relative overflow-clip rounded-2xl bg-brand-dark text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">
              <div aria-hidden="true" className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl motion-safe:[animation:hh-drift_16s_ease-in-out_infinite_alternate]" />
              <div className="relative flex-1">
                <h3 className="text-xl font-bold">Belum yakin butuh layanan yang mana?</h3>
                <p className="mt-2 text-slate-300 max-w-2xl">Ceritakan situasinya ke HUMI. Setiap jawaban menyebutkan asumsi, sumber peraturan, dan statusnya, lalu mengarahkan Anda ke layanan yang sesuai.</p>
              </div>
              <button
                onClick={openHumiChat}
                className="relative flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-colors"
              >
                <Icon className="w-5 h-5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                Tanya HUMI
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Dari pertanyaan pertama sampai dokumen di tangan</h2>
            <p className="mt-4 text-lg text-slate-300">Anda bisa berhenti di tahap mana pun. Banyak pertanyaan sudah terjawab di tahap pertama.</p>
          </Reveal>
          <div className="md:mt-16">
            <Flow />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">AI membantu. Untuk keputusan penting, manusia yang memverifikasi.</h2>
            <p className="mt-4 text-lg text-slate-600">Hukum terlalu penting untuk ditebak. Ini batas yang kami pegang, dan Anda berhak tahu sejak awal.</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <Reveal delay={0}>
              <h3 className="font-semibold text-brand-dark">Yang selalu kami lakukan</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3"><Check />Menyebut sumber peraturan dan statusnya</li>
                <li className="flex gap-3"><Check />Mengatakan terus terang bila sumber tidak cukup</li>
                <li className="flex gap-3"><Check />Meneruskan kasus berisiko tinggi ke advokat</li>
              </ul>
            </Reveal>
            <Reveal delay={150}>
              <h3 className="font-semibold text-brand-dark">Yang tidak akan dilakukan HUMI</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3"><Cross />Mengarang nomor pasal, judul peraturan, atau kutipan</li>
                <li className="flex gap-3"><Cross />Menjanjikan kemenangan perkara</li>
                <li className="flex gap-3"><Cross />Mengirim dokumen Anda ke pihak lain tanpa izin</li>
              </ul>
            </Reveal>
            <Reveal delay={300}>
              <h3 className="font-semibold text-brand-dark">Data Anda</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
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
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-clip bg-brand-dark rounded-2xl px-6 py-10 sm:px-12 sm:py-14 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div aria-hidden="true" className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div aria-hidden="true" className="absolute -left-24 -bottom-32 h-72 w-72 rounded-full bg-brand-secondary/25 blur-3xl motion-safe:[animation:hh-drift_20s_ease-in-out_infinite_alternate]" />
              <div className="relative lg:col-span-3">
                <h2 className="text-3xl font-bold text-white tracking-tight">Mulai dari pertanyaan yang sedang Anda pikirkan.</h2>
                <p className="mt-3 text-slate-300">Bertanya ke HUMI gratis. Untuk layanan berbayar, harga terlihat sebelum Anda memesan.</p>
              </div>
              <div className="relative lg:col-span-2 flex flex-col sm:flex-row lg:justify-end gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-colors"
                >
                  Buat akun gratis
                </Link>
                <button
                  onClick={scheduleVideoCall}
                  className="inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 transition-colors"
                >
                  Jadwalkan konsultasi video
                </button>
              </div>
            </div>
          </Reveal>
          <p className="mt-6 text-sm text-slate-500">
            Lihat paket dan biaya di halaman <Link to="/harga" className="font-semibold text-brand-dark underline underline-offset-2">Harga</Link>.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
