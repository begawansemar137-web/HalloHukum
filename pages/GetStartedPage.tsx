import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { servicesData } from '../data/servicesData';
import type { Service } from '../data/servicesData';

// Reusable ProgressBar component for the onboarding flow
const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
  const steps = ["Pilih Layanan", "Profil Anda", "Detail Kebutuhan", "Konfirmasi"];
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((name, index) => (
          <li
            key={name}
            className={`relative ${index !== steps.length - 1 ? 'pr-6 sm:pr-16 lg:pr-20' : ''}`}
            aria-current={index + 1 === step ? 'step' : undefined}
          >
            {index < step - 1 ? (
              <>
                {/* Completed Step */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-brand-secondary" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-secondary">
                  <Icon className="h-5 w-5 text-white" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                  <span className="sr-only">{name} - Selesai</span>
                </div>
                <span aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-20 sm:w-24 text-center text-[10px] sm:text-xs text-brand-secondary font-semibold">{name}</span>
              </>
            ) : index === step - 1 ? (
              <>
                {/* Current Step */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-secondary bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-secondary" aria-hidden="true" />
                  <span className="sr-only">{name} - Saat ini</span>
                </div>
                <span aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-20 sm:w-24 text-center text-[10px] sm:text-xs text-brand-secondary font-semibold">{name}</span>
              </>
            ) : (
              <>
                {/* Upcoming Step */}
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-300 bg-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true" />
                  <span className="sr-only">{name} - Berikutnya</span>
                </div>
                 <span aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-20 sm:w-24 text-center text-[10px] sm:text-xs text-slate-500">{name}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};


const ServiceChoiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const link = `/mulai-layanan/${service.slug}`;

  return (
    <Link
      to={link}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col text-left h-full group transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2"
      aria-label={`Mulai layanan ${service.title}`}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-brand-secondary/10 text-brand-secondary mb-6 group-hover:bg-brand-secondary/20 transition-colors">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">{service.title}</h3>
        <p className="text-slate-500 flex-grow mb-6">{service.shortDescription}</p>
        <div className="mt-auto">
          <span className="font-semibold text-brand-secondary group-hover:underline">
            Pilih Layanan Ini &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};


const GetStartedPage: React.FC = () => {
  const openHumiChat = () => {
    window.dispatchEvent(new CustomEvent('openHumiChat'));
  };

  return (
    <div className="animate-floatIn bg-slate-50">
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Memulai Layanan HalloHukum</h1>
                    <p className="mt-3 text-lg text-slate-600">Selamat datang! Langkah pertama adalah memilih layanan yang paling sesuai dengan kebutuhan bisnis Anda saat ini.</p>
                </div>
                <div className="mb-12 flex justify-center pb-10">
                    <ProgressBar step={1} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {servicesData.map((service) => (
                    <ServiceChoiceCard key={service.slug} service={service} />
                    ))}
                </div>

                 <div className="mt-20 max-w-3xl mx-auto text-center bg-white p-8 sm:p-12 rounded-2xl shadow-md border border-slate-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">Masih Bingung Harus Mulai dari Mana?</h2>
                    <p className="mt-4 text-slate-600 max-w-xl mx-auto">
                        Jangan khawatir, kami siap membantu Anda. Dapatkan informasi cepat dari AI Legal Agent kami atau hubungi tim kami untuk diskusi lebih lanjut.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={openHumiChat}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-secondary text-white hover:bg-sky-400 transition-all"
                        >
                            <Icon className="w-5 h-5">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </Icon>
                            Tanya HUMI
                        </button>
                        <Link to="/kontak" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-brand-dark text-white hover:bg-slate-700 transition-all">
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <style>{`
        @keyframes floatIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-floatIn { animation: floatIn 0.7s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default GetStartedPage;