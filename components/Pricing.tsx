import React from 'react';
import Icon from './Icon';

interface Plan {
  name: string;
  // Paid plans show "Mulai dari" above the price; Gratis and Custom carry their own caption
  price: string;
  caption: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 'Gratis',
    caption: 'Tanpa biaya',
    description: 'Untuk individu atau bisnis yang baru ingin mencoba fitur dasar.',
    features: ['Akses HUMI AI Agent (terbatas)', '1 template dokumen gratis', 'Newsletter edukasi hukum', 'Akses penuh ke artikel blog'],
    buttonText: 'Mulai gratis',
  },
  {
    name: 'Basic',
    price: 'Rp499.000',
    caption: 'Mulai dari',
    description: 'Untuk UMKM yang baru mulai dan butuh legalitas dasar.',
    features: ['Semua fitur Starter', 'Pendirian PT Perorangan', 'Konsultasi Human Advisor (5 sesi)', 'Pustaka template dokumen dasar'],
    buttonText: 'Pilih Basic',
  },
  {
    name: 'Pro',
    price: 'Rp1.200.000',
    caption: 'Mulai dari',
    description: 'Untuk bisnis yang berkembang dan butuh dukungan legal berkelanjutan.',
    features: ['Semua fitur Basic', 'Pendirian PT atau CV', 'Konsultasi Human Advisor tanpa batas', 'Review dokumen dan kontrak (3 dokumen)', 'Pendaftaran merek dagang (1 kelas)'],
    buttonText: 'Pilih Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    caption: 'Sesuai kebutuhan',
    description: 'Solusi legal menyeluruh untuk skala bisnis yang lebih besar.',
    features: ['Semua fitur Pro', 'Legal retainer', 'Manajemen kekayaan intelektual', 'Dukungan sengketa bisnis', 'Prioritas layanan tertinggi'],
    buttonText: 'Hubungi sales',
  },
];

const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => (
  <div
    className={`relative flex h-full flex-col rounded-xl bg-white p-6 xl:p-7 ${
      plan.popular ? 'ring-2 ring-hh-indigo shadow-hh-2' : 'border border-hh-line shadow-hh-1'
    }`}
  >
    {plan.popular && (
      <span className="absolute left-6 top-0 -translate-y-1/2 whitespace-nowrap rounded-full bg-hh-indigo px-3 py-1 text-xs font-medium text-white">
        Paling populer
      </span>
    )}
    <h3 className="text-lg font-semibold text-hh-ink">{plan.name}</h3>
    <p className="mt-2 min-h-[3.75rem] text-sm leading-relaxed text-hh-mute">{plan.description}</p>

    <div className="mt-6 border-t border-hh-line pt-6">
      <p className="text-xs text-hh-mute">{plan.caption}</p>
      <p className="hh-tnum mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em] text-hh-ink">{plan.price}</p>
    </div>

    <ul className="mt-6 flex-grow space-y-3 text-sm text-hh-ink-2">
      {plan.features.map(feature => (
        <li key={feature} className="flex items-start gap-2.5">
          <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-hh-indigo"><polyline points="20 6 9 17 4 12"></polyline></Icon>
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <button
      className={`mt-8 w-full rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
        plan.popular
          ? 'bg-hh-indigo text-white hover:bg-hh-indigo-press'
          : 'text-hh-indigo ring-1 ring-inset ring-hh-indigo/40 hover:ring-hh-indigo'
      }`}
    >
      {plan.buttonText}
    </button>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <section id="harga" className="bg-hh-soft py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-hh-ink">Paket layanan yang fleksibel</h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-hh-ink-2">
            Pilih paket yang sesuai dengan skala dan kebutuhan bisnis Anda saat ini.
          </p>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
          {plans.map(plan => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-hh-mute">
          Harga akhir bergantung pada lingkup pekerjaan dan biaya resmi pemerintah. Rinciannya kami sampaikan sebelum Anda membayar.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
