import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { servicesData } from '../data/servicesData';

const openHumiChat = () => {
  window.dispatchEvent(new CustomEvent('openHumiChat'));
};

const askHumi = (prompt: string) => {
  window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', { detail: { prompt } }));
};

const highlights = [
  { label: 'Cepat & Praktis', icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /> },
  { label: 'Akurat & Terpercaya', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></> },
  { label: 'Didampingi Profesional', icon: <><circle cx="9" cy="8" r="4" /><path d="M2 21v-1a6 6 0 0 1 12 0v1" /><circle cx="17" cy="9" r="3" /><path d="M16 15a5 5 0 0 1 6 5v1" /></> },
  { label: 'Ramah UMKM', icon: <><path d="M12 22V11" /><path d="M12 11C12 7 9 4 4 4c0 4 3 7 8 7z" /><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z" /></> },
];

interface ServiceCard {
  title: string;
  text: string;
  cta: string;
  icon: React.ReactNode;
  spot: React.ReactNode;
  to?: string;
  onClick?: () => void;
  popular?: boolean;
}

const cards: ServiceCard[] = [
  {
    title: 'AI Legal Assistant',
    text: 'Tanya jawab hukum, penjelasan regulasi, dan panduan praktis untuk usaha Anda.',
    cta: 'Gunakan Sekarang',
    onClick: openHumiChat,
    popular: true,
    icon: <><rect x="4" y="8" width="16" height="12" rx="3" /><path d="M12 4v4" /><circle cx="12" cy="3" r="1" /><line x1="9" y1="13" x2="9" y2="15" /><line x1="15" y1="13" x2="15" y2="15" /></>,
    spot: <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M7 9h10M7 12h6" /><path d="M1 20h22" /></>,
  },
  {
    title: 'Pembuatan Dokumen',
    text: 'Buat dokumen hukum seperti kontrak, perjanjian, NDA, MoU, dan PKS dengan template siap pakai.',
    cta: 'Buat Dokumen',
    to: '/layanan/pembuatan-kontrak',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" /></>,
    spot: <><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11" /><path d="M7 8h7M7 12h5" /><path d="M20.5 4.5l-8 8L11 17l4.5-1.5 8-8z" /></>,
  },
  {
    title: 'Legalitas Usaha',
    text: 'Pendampingan pengurusan legalitas usaha seperti NIB, OSS, pendirian PT/CV, dan perizinan lainnya.',
    cta: 'Urus Legalitas',
    to: '/layanan/legalitas-usaha',
    icon: <><path d="M3 21h18" /><path d="M4 10h16" /><path d="M12 3l8 5H4z" /><path d="M6 10v8M10 10v8M14 10v8M18 10v8" /></>,
    spot: <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M6 9h5M6 12h3" /><circle cx="17" cy="12" r="3" /><polyline points="15.6 12 16.6 13 18.4 11" /><path d="M1 20h22" /></>,
  },
  {
    title: 'Konsultasi Profesional',
    text: 'Konsultasi langsung dengan advokat dan konsultan hukum berpengalaman, lewat chat, video, atau telepon.',
    cta: 'Konsultasi Sekarang',
    to: '/layanan/legal-advisor-on-demand',
    icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" /></>,
    spot: <><rect x="2" y="4" width="20" height="13" rx="2" /><circle cx="12" cy="9" r="2.5" /><path d="M8 15a4 4 0 0 1 8 0" /><path d="M1 20h22" /></>,
  },
  {
    title: 'Pemeriksaan Dokumen',
    text: 'Review dokumen hukum Anda untuk menemukan risiko dan mendapatkan rekomendasi perbaikan.',
    cta: 'Periksa Dokumen',
    to: '/layanan/legal-advisor-on-demand/review-dokumen',
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>,
    spot: <><path d="M14 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7" /><path d="M7 8h6M7 12h4" /><circle cx="17" cy="16" r="4" /><path d="M23 22l-3.2-3.2" /></>,
  },
  {
    title: 'Pemantauan Kepatuhan',
    text: 'Ketahui kewajiban hukum rutin usaha Anda dan perubahan regulasi yang perlu diperhatikan.',
    cta: 'Pantau Kepatuhan',
    onClick: () => askHumi('Kewajiban hukum apa saja yang harus rutin saya penuhi sebagai pemilik usaha, dan kapan tenggatnya?'),
    icon: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    spot: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h2M14 14h2M8 18h2" /></>,
  },
  {
    title: 'Pusat Regulasi',
    text: 'Cari peraturan yang relevan dengan usaha Anda, lengkap dengan nomor, tahun, dan statusnya.',
    cta: 'Jelajahi Regulasi',
    onClick: () => askHumi('Peraturan apa saja yang berlaku untuk usaha saya? Sebutkan nomor, tahun, dan statusnya.'),
    icon: <><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" /><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" /></>,
    spot: <><rect x="4" y="3" width="16" height="5" rx="1" /><rect x="3" y="9.5" width="17" height="5" rx="1" /><rect x="4" y="16" width="16" height="5" rx="1" /></>,
  },
  {
    title: 'Paket Berlangganan',
    text: 'Pilihan paket layanan untuk individu, UMKM, dan bisnis, dengan harga yang jelas sejak awal.',
    cta: 'Lihat Paket',
    to: '/harga',
    icon: <><rect x="3" y="14" width="4" height="7" rx="1" /><rect x="10" y="9" width="4" height="12" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></>,
    spot: <><rect x="3" y="5" width="16" height="17" rx="2" /><polyline points="6 10 7.5 11.5 10 9" /><path d="M12 10h4" /><polyline points="6 16 7.5 17.5 10 15" /><path d="M12 16h4" /><circle cx="19" cy="4" r="3" /></>,
  },
];

const Card: React.FC<{ card: ServiceCard }> = ({ card }) => {
  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hh-indigo-soft text-hh-indigo">
          <Icon className="w-6 h-6" aria-hidden="true">{card.icon}</Icon>
        </span>
        {card.popular && (
          <span className="inline-flex items-center gap-1 rounded-md bg-hh-indigo px-2.5 py-1 text-xs font-medium text-white">
            <Icon className="w-3 h-3" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z" /></Icon>
            Paling Populer
          </span>
        )}
      </div>
      <span className="mt-4 block text-lg font-bold text-hh-navy">{card.title}</span>
      <span className="mt-2 block max-w-[17rem] text-sm leading-relaxed text-hh-ink-2">{card.text}</span>
      <span className="mt-auto flex items-end justify-between gap-3 pt-6">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-hh-indigo">
          {card.cta}
          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>
        </span>
        <span aria-hidden="true" className="flex h-16 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#efeaff] to-[#dcd3ff] text-hh-indigo/80">
          <Icon className="w-10 h-10" strokeWidth={1.4}>{card.spot}</Icon>
        </span>
      </span>
    </>
  );
  const cls = 'group flex h-full w-full flex-col rounded-2xl border border-hh-line bg-white p-6 text-left shadow-hh-1 transition hover:border-hh-indigo/40 hover:shadow-hh-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-indigo';
  return card.to
    ? <Link to={card.to} className={cls}>{body}</Link>
    : <button onClick={card.onClick} className={cls}>{body}</button>;
};

// Decorative scene for the header: a "Legal Service" sheet, the scales, a leaf
const HeroArt: React.FC = () => (
  <div aria-hidden="true" className="relative mx-auto hidden h-64 w-full max-w-md lg:block">
    <div className="absolute inset-y-0 right-0 w-[85%] rounded-full bg-gradient-to-br from-[#e4dcff] to-[#cfc3ff] opacity-80" />
    <div className="absolute right-10 top-4 w-44 rotate-[6deg] rounded-2xl bg-white p-5 shadow-hh-3">
      <p className="font-serif text-xl italic leading-tight text-hh-navy">Legal<br />Service</p>
      {[0, 1, 2].map(i => (
        <div key={i} className="mt-3 flex items-center gap-2">
          <span className={`flex h-4 w-4 items-center justify-center rounded-full ${i < 2 ? 'bg-hh-indigo text-white' : 'bg-hh-line'}`}>
            {i < 2 && <Icon className="w-2.5 h-2.5" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></Icon>}
          </span>
          <span className="h-1.5 flex-1 rounded-full bg-hh-line" />
        </div>
      ))}
    </div>
    <div className="absolute bottom-2 left-6 flex h-36 w-36 items-center justify-center rounded-3xl bg-hh-navy text-[#f3c25b] shadow-hh-3">
      <Icon className="w-20 h-20" strokeWidth={1.3}>
        <path d="M12 3v18" /><path d="M7 21h10" /><path d="M5 7h14" />
        <path d="M5 7l-3 7a3 3 0 0 0 6 0L5 7z" /><path d="M19 7l-3 7a3 3 0 0 0 6 0l-3-7z" />
      </Icon>
    </div>
    <div className="absolute bottom-6 right-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-hh-2">
      <Icon className="w-9 h-9" strokeWidth={1.6}><path d="M12 22V11" /><path d="M12 11C12 7 9 4 4 4c0 4 3 7 8 7z" /><path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7z" /></Icon>
    </div>
  </div>
);

const ServicesPage: React.FC = () => {
  return (
    <>
      {/* Page header */}
      <section className="overflow-hidden bg-gradient-to-r from-[#f7f5ff] via-[#f3f0ff] to-[#e9e3ff]">
        <div className="container mx-auto grid items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.8fr_1fr] lg:px-8 lg:py-14">
          <div>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-hh-ink-2">
                <li>
                  <Link to="/" className="inline-flex items-center gap-1.5 hover:text-hh-indigo">
                    <Icon className="w-4 h-4 text-hh-indigo" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z" /></Icon>
                    Beranda
                  </Link>
                </li>
                <li aria-hidden="true"><Icon className="w-4 h-4 text-hh-mute"><polyline points="9 18 15 12 9 6" /></Icon></li>
                <li aria-current="page" className="font-medium text-hh-ink">Layanan</li>
              </ol>
            </nav>
            <h1 className="mt-6 font-sans text-4xl font-[800] tracking-[-0.025em] text-hh-navy sm:text-5xl">Layanan HalloHukum</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-hh-ink-2">
              Berbagai layanan hukum digital berbasis AI untuk mendukung legalitas, kepatuhan, dan pertumbuhan usaha Anda.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {highlights.map(item => (
                <li key={item.label} className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-hh-navy shadow-hh-1">
                  <Icon className="w-[18px] h-[18px] text-hh-indigo" aria-hidden="true">{item.icon}</Icon>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <HeroArt />
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-hh-soft py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-[800] tracking-[-0.02em] text-hh-navy">Pilihan Layanan Kami</h2>
          <p className="mt-2 text-hh-ink-2">Pilih layanan sesuai kebutuhan usaha Anda.</p>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map(card => (
              <li key={card.title}><Card card={card} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Every service and its packages, straight from the catalogue */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-2xl font-[800] tracking-[-0.02em] text-hh-navy">Semua layanan dan paketnya</h2>
          <p className="mt-2 text-hh-ink-2">Langsung ke paket yang Anda butuhkan.</p>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {servicesData.map(service => (
              <div key={service.slug} className="border-t border-hh-line pt-6">
                <Link to={`/layanan/${service.slug}`} className="group inline-flex items-center gap-2 font-bold text-hh-navy hover:text-hh-indigo">
                  {service.title}
                  <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-hh-mute">{service.shortDescription}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {service.serviceOptions.map(option => (
                    <li key={option.slug}>
                      <Link
                        to={`/layanan/${service.slug}/${option.slug}`}
                        className="inline-block rounded-full border border-hh-line px-3 py-1.5 text-sm text-hh-ink-2 transition-colors hover:border-hh-indigo/50 hover:text-hh-indigo"
                      >
                        {option.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-hh-indigo-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-lg font-bold text-hh-navy">Belum yakin butuh layanan yang mana?</p>
              <p className="mt-1 text-hh-ink-2">Ceritakan situasinya ke HUMI. HUMI akan mengarahkan Anda ke layanan yang sesuai.</p>
            </div>
            <button
              onClick={openHumiChat}
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-hh-indigo px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#4434d4]"
            >
              <Icon className="w-5 h-5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>
              Tanya HUMI
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
