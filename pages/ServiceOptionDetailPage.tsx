
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import Icon from '../components/Icon';
import Breadcrumb from '../components/Breadcrumb';

interface ServiceOptionDetailPageProps {
  serviceSlug: string;
  optionSlug: string;
}

const ServiceOptionDetailPage: React.FC<ServiceOptionDetailPageProps> = ({ serviceSlug, optionSlug }) => {
  const service = servicesData.find(s => s.slug === serviceSlug);
  const option = service?.serviceOptions.find(o => o.slug === optionSlug);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!service || !option) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">Detail Layanan Tidak Ditemukan</h1>
        <p className="mt-4">Maaf, informasi yang Anda cari tidak ada.</p>
        <Link to={`/layanan/${serviceSlug}`} className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Halaman Layanan</Link>
      </div>
    );
  }
  
  const handleAskHumi = () => {
    const prompt = `Saya punya pertanyaan tentang ${option.title}.`;
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
    { label: service.title, link: `/layanan/${service.slug}` },
    { label: option.title },
  ];

  const { detailedContent } = option;
  const isLiveChat = serviceSlug === 'legal-advisor-on-demand' && optionSlug === 'live-chat-konsultasi';
  const relatedServices = servicesData.filter(s => s.slug !== serviceSlug).slice(0, 2);

  const images = detailedContent.images || [];

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

  const goToSlide = (slideIndex: number) => {
      setCurrentIndex(slideIndex);
  };

  return (
    <div className="animate-floatIn">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Breadcrumb items={breadcrumbItems} />
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
                    {option.title}
                </h1>
                <p className="mt-6 text-lg text-slate-600">
                    {detailedContent.longDescription}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                   {isLiveChat ? (
                        <Link 
                            to="/advisor-chat" 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Mulai Sesi Chat
                            <Icon className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                        </Link>
                    ) : (
                        <Link 
                            to={`/mulai-layanan/${service.slug}`} 
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Mulai Proses {option.title}
                        </Link>
                    )}
                     <button
                        onClick={handleAskHumi}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-white text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200 transition-colors"
                    >
                        <Icon className="w-5 h-5 text-brand-secondary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                        Tanya HUMI
                    </button>
                </div>
            </div>
        </div>
      </section>

       {/* Image Carousel Section */}
       {images.length > 0 && (
          <section className="pb-12 sm:pb-16 bg-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Galeri Layanan</h2>
                      <div className="relative group">
                          <div className="overflow-hidden rounded-2xl shadow-xl w-full h-[250px] sm:h-[400px]">
                              <div 
                                  className="flex transition-transform duration-700 ease-in-out h-full"
                                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                              >
                                  {images.map((src, index) => (
                                      <img
                                          key={index}
                                          src={src}
                                          alt={`Visualisasi untuk ${option.title} ${index + 1}`}
                                          className="w-full h-full object-cover flex-shrink-0"
                                      />
                                  ))}
                              </div>
                          </div>
                          {/* Left Arrow */}
                          <button onClick={prevSlide} className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" aria-label="Gambar sebelumnya">
                              <Icon className="w-6 h-6 text-brand-dark"><path d="m15 18-6-6 6-6"></path></Icon>
                          </button>
                          {/* Right Arrow */}
                          <button onClick={nextSlide} className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100" aria-label="Gambar berikutnya">
                              <Icon className="w-6 h-6 text-brand-dark"><path d="m9 18 6-6-6-6"></path></Icon>
                          </button>
                          {/* Dots */}
                          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
                              {images.map((_, slideIndex) => (
                                  <button 
                                      key={slideIndex}
                                      onClick={() => goToSlide(slideIndex)}
                                      className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125 ring-2 ring-white/50' : 'bg-white/50 hover:bg-white/80'}`}
                                      aria-label={`Lihat gambar ${slideIndex + 1}`}
                                  />
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </section>
      )}

      {/* Features & Requirements Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Features */}
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Fitur Unggulan</h2>
                    <div className="bg-white p-6 rounded-lg border border-slate-200 h-full shadow-sm">
                        <ul className="space-y-3">
                            {option.features.map((feature, index) => (
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
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Persyaratan yang Diperlukan</h2>
                    <div className="bg-white p-6 rounded-lg border border-slate-200 h-full shadow-sm">
                        <ul className="space-y-3">
                            {detailedContent.requirements.map((req, index) => (
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

      {/* Use Cases Section */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">Ideal Untuk Kebutuhan Berikut:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detailedContent.useCases.map((useCase, index) => (
                        <div key={index} className="bg-white p-5 rounded-lg border border-slate-200 flex items-start shadow-sm">
                            <Icon className="w-8 h-8 text-brand-secondary mr-4 flex-shrink-0 mt-1"><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></Icon>
                            <div>
                                <h4 className="font-semibold text-brand-dark">{useCase.title}</h4>
                                <p className="text-sm text-slate-500">{useCase.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Video Consultation CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-brand-light p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-white mb-6">
                <Icon className="h-8 w-8">
                    <path d="m23 7-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </Icon>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Perlu Penjelasan Lebih Rinci?</h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Jadwalkan sesi konsultasi video gratis dengan ahli kami untuk memastikan {option.title} adalah pilihan yang tepat untuk Anda.
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Lanjutkan dengan {option.title}?</h2>
            <p className="mt-4 text-slate-300 max-w-xl mx-auto">
              Ambil langkah pertama untuk mengamankan bisnis Anda. Proses kami cepat, mudah, dan transparan.
            </p>
            <div className="mt-8">
              <Link
                to={`/mulai-layanan/${serviceSlug}`}
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
      <section className="py-12 sm:py-16 lg:py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-8 text-center">Layanan Terkait Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedServices.map((relatedService) => (
                <div key={relatedService.slug} className="bg-slate-50 p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col group">
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

export default ServiceOptionDetailPage;
