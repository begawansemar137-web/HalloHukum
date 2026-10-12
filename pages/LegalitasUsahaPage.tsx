import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Icon from '../components/Icon';
import type { ServiceOption } from '../types';

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, children: string }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-secondary/10 text-brand-secondary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{children}</p>
    </div>
);

const ProcessStep: React.FC<{ number: number, title: string, description: string, isLast?: boolean }> = ({ number, title, description, isLast = false }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <span className="text-lg font-bold text-brand-secondary">{number}</span>
                </div>
            </div>
            {!isLast && <div className="w-px h-full bg-slate-300"></div>}
        </div>
        <div className={isLast ? '' : 'pb-8'}>
            <p className="mb-2 text-xl font-bold text-brand-dark">{title}</p>
            <p className="text-slate-600">{description}</p>
        </div>
    </div>
);

// --- New Components for Detailed View ---

const ImageCarousel: React.FC<{ images: string[], title: string }> = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative group w-full max-w-lg mx-auto mt-10">
      <div className="overflow-hidden rounded-2xl shadow-xl w-full h-64 sm:h-72">
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Visualisasi untuk ${title} ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      {/* Arrows */}
      {images.length > 1 && (
        <>
            <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100" aria-label="Gambar sebelumnya">
                <Icon className="w-6 h-6 text-brand-dark"><path d="m15 18-6-6 6-6"></path></Icon>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10 opacity-0 group-hover:opacity-100" aria-label="Gambar berikutnya">
                <Icon className="w-6 h-6 text-brand-dark"><path d="m9 18 6-6-6-6"></path></Icon>
            </button>
        </>
      )}
    </div>
  );
};

const ServiceOptionDetail: React.FC<{ option: ServiceOption, serviceSlug: string }> = ({ option, serviceSlug }) => {
  const { detailedContent } = option;

  return (
    <div id={option.slug} className="pt-24 -mt-24 scroll-mt-24">
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-extrabold text-brand-dark">{option.title}</h3>
          <p className="text-slate-500 mt-2">{option.description}</p>
          <div className="mt-4">
            <span className="text-sm bg-sky-100 text-sky-800 font-medium px-4 py-1.5 rounded-full inline-block">
              <span className="font-semibold">Terbaik untuk:</span> {option.bestFor}
            </span>
          </div>
        </div>

        <p className="text-slate-600 max-w-3xl mx-auto text-center mb-10">{detailedContent.longDescription}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-brand-dark mb-4">Fitur Utama</h4>
              <ul className="space-y-3">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Icon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold text-brand-dark mb-4">Persyaratan</h4>
              <ul className="space-y-3">
                {detailedContent.requirements.map((req, i) => (
                  <li key={i} className="flex items-start">
                    <Icon className="w-5 h-5 text-brand-secondary mr-3 flex-shrink-0 mt-1"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></Icon>
                    <span className="text-slate-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-brand-dark mb-4">Contoh Penggunaan</h4>
            <div className="space-y-4">
              {detailedContent.useCases.map((useCase, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-start">
                  <Icon className="w-8 h-8 text-brand-secondary mr-4 flex-shrink-0 mt-1"><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></Icon>
                  <div>
                    <h5 className="font-semibold text-brand-dark">{useCase.title}</h5>
                    <p className="text-sm text-slate-500">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {detailedContent.images && detailedContent.images.length > 0 && (
          <ImageCarousel images={detailedContent.images} title={option.title} />
        )}

        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to={`/mulai-layanan/${serviceSlug}`} 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Mulai Proses {option.title}
          </Link>
          <Link 
            to={`/layanan/${serviceSlug}/${option.slug}`}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-white text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200 transition-colors"
          >
            Lihat Halaman Detail
          </Link>
        </div>
      </div>
    </div>
  );
};


const LegalitasUsahaPage: React.FC = () => {
    const service = servicesData.find(s => s.slug === 'legalitas-usaha');

    if (!service) {
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-3xl font-bold">Layanan Tidak Ditemukan</h1>
            <p className="mt-4">Maaf, layanan yang Anda cari tidak ada.</p>
            <Link to="/layanan" className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Halaman Layanan</Link>
          </div>
        );
    }
    
    const orderedOptions = [
        service.serviceOptions.find(o => o.slug === 'perseroan-terbatas'),
        service.serviceOptions.find(o => o.slug === 'commanditaire-vennootschap'),
        service.serviceOptions.find(o => o.slug === 'pt-perorangan'),
        service.serviceOptions.find(o => o.slug === 'persekutuan-perdata'),
        service.serviceOptions.find(o => o.slug === 'yayasan'),
    ].filter(Boolean) as ServiceOption[];
    
    const shortNames: { [key: string]: string } = {
        'Perseroan Terbatas (PT)': 'PT',
        'Commanditaire V. (CV)': 'CV',
        'PT Perorangan': 'PT Perorangan',
        'Persekutuan Perdata': 'Perdata',
        'Yayasan': 'Yayasan',
    };

    return (
        <div className="animate-floatIn">
            <section className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <Link to="/" className="text-sm font-semibold text-brand-secondary hover:underline">
                                &larr; Kembali ke beranda
                            </Link>
                        </div>
                        <div className="text-center">
                             <div className="mx-auto h-20 w-20 rounded-full bg-brand-secondary/10 text-brand-secondary mb-6 flex items-center justify-center">
                                {React.cloneElement(service.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: "w-10 h-10" })}
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight">
                                {service.title}
                            </h1>
                            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                                {service.heroSubtitle}
                            </p>
                            <Link to={`/mulai-layanan/${service.slug}`} className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Mulai Proses Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">{service.benefitsTitle}</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">{service.benefitsSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.benefits.map((benefit, index) => (
                            <BenefitCard key={index} icon={benefit.icon} title={benefit.title}>
                                {benefit.description}
                            </BenefitCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">{service.serviceOptionsTitle}</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">{service.serviceOptionsSubtitle}</p>
                    </div>
                    
                    <nav className="sticky top-[80px] bg-slate-50/80 backdrop-blur-md z-30 py-4 mb-12 border-y border-slate-200">
                        <div className="flex justify-center gap-2 sm:gap-4">
                            {orderedOptions.map(option => (
                                <a 
                                    key={option.slug}
                                    href={`#${option.slug}`} 
                                    className="px-4 py-2 text-sm sm:px-6 sm:py-2.5 sm:text-base font-semibold rounded-full transition-all duration-300 bg-white text-slate-600 hover:bg-slate-200 shadow-sm border border-slate-200"
                                >
                                    {shortNames[option.title] || option.title}
                                </a>
                            ))}
                        </div>
                    </nav>
                    
                    <div className="space-y-16 max-w-5xl mx-auto">
                        {orderedOptions.map(option => (
                            <ServiceOptionDetail key={option.slug} option={option} serviceSlug={service.slug} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">Proses Cepat & Transparan</h2>
                            <p className="text-slate-600 text-lg mb-8">Kami memangkas kerumitan birokrasi menjadi beberapa langkah sederhana. Anda akan selalu tahu progres pengurusan legalitas Anda.</p>
                            <img src={service.image} alt="Proses layanan" className="rounded-2xl shadow-xl w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
                        </div>
                        <div>
                            {service.processSteps.map((step, index) => (
                                <ProcessStep 
                                    key={index}
                                    number={index + 1} 
                                    title={step.title} 
                                    description={step.description}
                                    isLast={index === service.processSteps.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
             <section className="py-12 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center bg-brand-dark p-8 sm:p-12 rounded-2xl shadow-lg">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Masih Bingung Memilih?</h2>
                        <p className="mt-4 text-slate-300 max-w-xl mx-auto">
                            Diskusikan kebutuhan Anda dengan AI Legal Agent kami atau jadwalkan konsultasi gratis dengan tim ahli kami.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                             <button
                                onClick={() => window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', { detail: { prompt: 'Bantu saya memilih antara PT, CV, dan PT Perorangan.' } }))}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-secondary text-white hover:bg-sky-400 transition-all"
                            >
                                <Icon className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                                Tanya HUMI
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('scheduleVideoCall'))}
                                className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-white text-brand-dark hover:bg-slate-200 transition-all"
                            >
                                Jadwalkan Konsultasi
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <style>{`
                html {
                    scroll-behavior: smooth;
                }
                @keyframes floatIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-floatIn { animation: floatIn 0.7s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default LegalitasUsahaPage;