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

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />

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
      <section className="py-16 sm:py-20 lg:py-28 bg-hh-navy text-white">
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
