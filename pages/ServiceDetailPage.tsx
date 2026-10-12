
import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import { relatedContentData } from '../data/relatedContentData';
import Icon from '../components/Icon';
import HumiPrompt from '../components/HumiPrompt';
import Breadcrumb from '../components/Breadcrumb';
import type { Benefit, ServiceOption } from '../types';

// --- Sub-components for this page ---

const BenefitCard: React.FC<{ icon: React.ReactNode, title: string, children: string }> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-secondary/10 text-brand-secondary mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{children}</p>
    </div>
);

const ServiceOptionCard: React.FC<{ option: ServiceOption, serviceSlug: string }> = ({ option, serviceSlug }) => {
    const link = `/layanan/${serviceSlug}/${option.slug}`;
    
    // Consolidate classes for better readability and enhanced effects
    const baseClasses = "bg-white rounded-2xl shadow-lg border p-8 flex flex-col h-full group transition-all duration-300 hover:shadow-xl cursor-pointer";
    const popularClasses = "border-brand-secondary ring-2 ring-brand-secondary hover:-translate-y-1.5";
    const normalClasses = "border-slate-200 hover:-translate-y-1";

    return (
    <Link 
       to={link}
       aria-label={`Lihat detail untuk ${option.title}`}
       className={`${baseClasses} ${option.isPopular ? popularClasses : normalClasses}`}>
        <h3 className="text-2xl font-bold text-brand-dark">{option.title}</h3>
        <p className="text-slate-500 mt-2 flex-grow">{option.description}</p>
        <div className="my-6">
            <p className="text-sm font-semibold text-slate-600 mb-2">Cocok untuk:</p>
            <span className="text-sm bg-sky-100 text-sky-800 font-medium px-3 py-1 rounded-full">{option.bestFor}</span>
        </div>
        <ul className="space-y-3 text-slate-600 flex-grow">
            {option.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                    <Icon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                    <span className="text-sm">{feature}</span>
                </li>
            ))}
        </ul>
        <div className="mt-8 text-center">
            <span className="font-semibold text-brand-secondary group-hover:underline">
                Lihat Detail &rarr;
            </span>
        </div>
    </Link>
)};

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


// --- Main Page Component ---

interface ServiceDetailPageProps {
  slug: string;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug }) => {
  const service = servicesData.find(s => s.slug === slug);
  const relatedItems = relatedContentData[slug] || [];

  if (!service) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">Layanan Tidak Ditemukan</h1>
        <p className="mt-4">Maaf, layanan yang Anda cari tidak ada.</p>
        <Link to="/layanan" className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Halaman Layanan</Link>
      </div>
    );
  }

  const popularOption = service.serviceOptions.find(o => o.isPopular) || service.serviceOptions[0];

  const handleAskHumi = () => {
    const prompt = `Saya punya pertanyaan tentang layanan ${service.title}.`;
    window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', {
        detail: { prompt }
    }));
  };
  
  const scheduleVideoCall = () => {
    window.dispatchEvent(new CustomEvent('scheduleVideoCall'));
  };

  const breadcrumbItems = [
    { label: 'Beranda', link: '/' },
    { label: 'Layanan', link: '/layanan' },
    { label: service.title },
  ];

  return (
    <div className="animate-floatIn">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16">
           <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 rounded-full bg-brand-secondary/10 text-brand-secondary mb-6 flex items-center justify-center">
                        {React.cloneElement(service.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: "w-10 h-10" })}
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
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
      
      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-24">
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

      {/* Service Options Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="text-center mb-12">
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">{service.serviceOptionsTitle}</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">{service.serviceOptionsSubtitle}</p>
                 <div className="mt-8">
                    <button
                        onClick={handleAskHumi}
                        className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-secondary text-white hover:bg-sky-400 transition-all shadow-md"
                    >
                        <Icon className="w-5 h-5">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </Icon>
                        Punya Pertanyaan? Tanya HUMI
                    </button>
                </div>
            </div>
            <div className={`grid grid-cols-1 lg:grid-cols-${service.serviceOptions.length > 2 ? '3' : '2'} gap-8 max-w-7xl mx-auto items-stretch`}>
                {service.serviceOptions.map((option, index) => (
                    <div key={index} className={`relative ${option.isPopular ? 'transform lg:scale-105 z-10' : ''}`}>
                         {option.isPopular && (
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
                               <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-secondary text-white shadow-md">
                                   <Icon className="w-4 h-4 fill-current"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></Icon>
                                   Paling Populer
                               </span>
                           </div>
                         )}
                        <ServiceOptionCard option={option} serviceSlug={service.slug} />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 lg:py-24">
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
      
      {/* Description Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">
                    Deskripsi Layanan
                </h2>
                <p className="text-slate-600 text-lg">
                    {service.longDescription}
                </p>
            </div>
        </div>
      </section>

      {/* Popular Features & Requirements Section */}
      {popularOption && (
        <section className="py-12 sm:py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Features */}
                    <div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-6">Fitur Unggulan Terpopuler</h3>
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full">
                            <ul className="space-y-3">
                                {popularOption.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <Icon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </Icon>
                                        <span className="text-slate-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Requirements */}
                    <div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-6">Persyaratan Utama</h3>
                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm h-full">
                            <ul className="space-y-3">
                                {popularOption.detailedContent.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start">
                                        <Icon className="w-5 h-5 text-brand-secondary mr-3 flex-shrink-0 mt-1">
                                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                        </Icon>
                                        <span className="text-slate-600">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

      {/* Video Consultation CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-brand-light p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-white mb-6">
                <Icon className="h-8 w-8">
                    <path d="m23 7-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </Icon>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Butuh Diskusi Lebih Lanjut?</h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Jadwalkan sesi konsultasi video gratis dengan salah satu ahli hukum kami untuk membahas kebutuhan spesifik Anda terkait {service.title}.
            </p>
            <div className="mt-8">
              <button
                onClick={scheduleVideoCall}
                className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Jadwalkan Konsultasi Video Gratis"
              >
                Jadwalkan Konsultasi Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-brand-dark p-8 sm:p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Siap Melindungi Bisnis Anda?</h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Ambil langkah pertama untuk mengamankan bisnis Anda secara hukum. Proses kami cepat, mudah, dan transparan.
            </p>
            <div className="mt-8">
              <Link
                to={`/mulai-layanan/${service.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label={`Mulai layanan ${service.title}`}
              >
                Mulai Layanan Ini
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-8 text-center">Layanan Terkait Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesData.filter(s => s.slug !== slug).slice(0, 2).map((relatedService) => (
                <div key={relatedService.slug} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-secondary/10 text-brand-secondary">
                      {React.cloneElement(relatedService.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: "w-6 h-6" })}
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark">{relatedService.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm flex-grow mb-6">{relatedService.shortDescription}</p>
                  <Link
                    to={`/layanan/${relatedService.slug}`}
                    className="mt-auto inline-flex items-center justify-center rounded-lg text-sm font-semibold py-2.5 px-5 bg-brand-dark text-white hover:bg-slate-700 transition-colors"
                  >
                    Lihat Layanan
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Content Section */}
      {relatedItems.length > 0 && (
          <section className="py-12 sm:py-16 lg:py-24 bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-8 text-center">Pelajari Lebih Lanjut</h2>
                  <div className="space-y-4">
                      {relatedItems.map((item, index) => (
                          <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-5 flex items-start gap-4 transition-all hover:border-brand-secondary hover:shadow-sm">
                              <div className="flex-shrink-0 mt-1">
                                  {item.type === 'blog' ? (
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100">
                                          <Icon className="w-5 h-5 text-sky-600">
                                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                          </Icon>
                                      </div>
                                  ) : (
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                                          <Icon className="w-5 h-5 text-amber-600">
                                              <circle cx="12" cy="12" r="10"></circle>
                                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                          </Icon>
                                      </div>
                                  )}
                              </div>
                              <div>
                                  <h4 className="font-bold text-brand-dark">{item.title}</h4>
                                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                                  {item.link && (
                                      <Link to={item.link.substring(1)} className="text-sm font-semibold text-brand-secondary hover:underline mt-2 inline-block">
                                          Baca Selengkapnya &rarr;
                                      </Link>
                                  )}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

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

export default ServiceDetailPage;
