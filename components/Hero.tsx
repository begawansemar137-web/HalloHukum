import React from 'react';
import Icon from './Icon';

const openHumiChat = () => {
  window.dispatchEvent(new CustomEvent('openHumiChat'));
};

const askHumi = (prompt: string) => {
  window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', { detail: { prompt } }));
};

const scrollToHowItWorks = () => {
  document.getElementById('cara-kerja')?.scrollIntoView({ behavior: 'smooth' });
};

// Each chip opens HUMI with a ready-made question
const quickAsks = [
  { label: 'Legalitas usaha (NIB, OSS)', prompt: 'Apa saja izin yang saya perlukan untuk usaha saya, dan bagaimana cara membuat NIB di OSS?' },
  { label: 'Buat dokumen perjanjian', prompt: 'Saya ingin membuat perjanjian kerja sama. Apa saja yang harus ada di dalamnya?' },
  { label: 'Tanya peraturan & kewajiban', prompt: 'Apa saja kewajiban hukum yang harus dipenuhi usaha kecil seperti saya?' },
];

const assurances = ['Berbasis regulasi resmi', 'Mudah untuk UMKM', 'Aman & terpercaya'];

const ScalesIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <Icon className={className} aria-hidden="true">
    <path d="M12 3v18" /><path d="M7 21h10" /><path d="M5 7h14" />
    <path d="M5 7l-3 7a3 3 0 0 0 6 0L5 7z" /><path d="M19 7l-3 7a3 3 0 0 0 6 0l-3-7z" />
  </Icon>
);

const DocIcon: React.FC = () => (
  <Icon className="w-5 h-5" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" />
  </Icon>
);

const FloatingCard: React.FC<{ title: string; text: string; badge?: boolean; className: string }> = ({ title, text, badge, className }) => (
  <div className={`absolute hidden sm:flex lg:hidden xl:flex w-52 items-start gap-3 rounded-xl bg-white p-3.5 shadow-hh-2 ring-1 ring-hh-line ${className}`}>
    <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-hh-indigo-soft text-hh-indigo">
      <DocIcon />
      {badge && (
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
          <Icon className="w-2.5 h-2.5" strokeWidth={3} aria-hidden="true"><polyline points="20 6 9 17 4 12" /></Icon>
        </span>
      )}
    </span>
    <div>
      <p className="text-sm font-semibold text-hh-navy">{title}</p>
      <p className="mt-0.5 text-xs leading-snug text-hh-mute">{text}</p>
    </div>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f4f2ff]">
      <div className="container mx-auto grid items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-20">

        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-hh-indigo-soft px-3.5 py-1.5 text-sm font-medium text-hh-navy">
            <span aria-hidden="true" className="flex h-3 w-4 flex-col overflow-hidden rounded-[2px] ring-1 ring-black/5">
              <span className="h-1/2 bg-[#e70011]" /><span className="h-1/2 bg-white" />
            </span>
            Solusi Legal UMKM Indonesia
          </span>
          <h1 className="mt-6 font-sans text-[2.4rem] font-[800] leading-[1.08] tracking-[-0.025em] text-hh-navy sm:text-5xl lg:text-[2.4rem] xl:text-[3rem] 2xl:text-[3.5rem]">
            Pendamping Hukum <br className="hidden lg:inline" />Digital untuk <br className="hidden lg:inline" />Pertumbuhan Usaha Anda
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-hh-ink-2">
            Konsultasi hukum, pembuatan dokumen, panduan legalitas usaha, dan pemantauan kepatuhan dalam satu platform berbasis AI.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={openHumiChat}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-hh-indigo px-6 py-3.5 text-[15px] font-semibold text-white shadow-hh-2 transition-colors hover:bg-[#4434d4] active:bg-hh-indigo-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-indigo"
            >
              <Icon className="w-5 h-5" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></Icon>
              Tanya AI Hukum Sekarang
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[15px] font-semibold text-hh-navy ring-1 ring-inset ring-hh-line transition hover:ring-hh-indigo/50"
            >
              <Icon className="w-5 h-5" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" /></Icon>
              Lihat Cara Kerja
            </button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-hh-ink-2">
            {assurances.map(item => (
              <li key={item} className="flex items-center gap-2">
                <Icon className="w-[18px] h-[18px] text-emerald-500" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="8 12 11 15 16 9" /></Icon>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Visual: photo with the HUMI chat card over it */}
        <div className="relative lg:pl-6">
          <div aria-hidden="true" className="absolute -left-6 top-10 bottom-6 w-[70%] rounded-[3rem] bg-[#e6e0ff] hidden lg:block" />
          <div className="relative ml-auto aspect-[4/3] w-full overflow-hidden rounded-[2rem] lg:w-[78%] lg:aspect-[4/5] xl:aspect-[5/5.4]">
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1100&auto=format&fit=crop"
              alt="Pemilik usaha tersenyum sambil mengelola tokonya di tablet"
              className="h-full w-full object-cover object-[72%_center]"
              loading="eager"
            />
          </div>

          <FloatingCard title="NIB & Perizinan" text="Panduan lengkap sesuai jenis usaha" badge className="-right-2 top-[38%] lg:-right-6" />
          <FloatingCard title="Dokumen Hukum" text="Buat kontrak, NDA, atau perjanjian usaha" className="-right-2 top-[60%] lg:-right-6" />

          <div className="relative -mt-16 mx-3 rounded-2xl bg-white/95 p-5 shadow-hh-3 ring-1 ring-hh-line backdrop-blur sm:mx-auto sm:max-w-sm lg:absolute lg:left-0 lg:top-1/2 lg:mx-0 lg:mt-0 lg:w-[16.5rem] xl:w-[19rem] lg:-translate-y-1/2">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-hh-indigo text-white"><ScalesIcon className="w-[18px] h-[18px]" /></span>
              <p className="font-semibold text-hh-navy">AI HalloHukum</p>
            </div>
            <p className="mt-4 rounded-xl bg-hh-indigo-soft/70 px-4 py-3 text-sm leading-relaxed text-hh-ink">
              Ada yang bisa saya bantu tentang hukum usaha Anda?
            </p>
            <ul className="mt-3 space-y-2">
              {quickAsks.map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => askHumi(item.prompt)}
                    className="flex w-full items-center gap-2.5 rounded-full border border-hh-line bg-white px-3.5 py-2 text-left text-[13px] text-hh-ink transition-colors hover:border-hh-indigo/50 hover:text-hh-indigo"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 text-hh-indigo" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><polyline points="8 12 11 15 16 9" /></Icon>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={openHumiChat}
              className="mt-4 flex w-full items-center justify-between rounded-full bg-hh-soft py-1.5 pl-4 pr-1.5 text-sm text-hh-mute ring-1 ring-inset ring-hh-line transition hover:ring-hh-indigo/40"
            >
              Tulis pertanyaan Anda...
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hh-indigo text-white">
                <Icon className="w-4 h-4" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></Icon>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
