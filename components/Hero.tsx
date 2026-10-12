import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const heroSlides = [
  {
    serviceSlug: 'legalitas-usaha',
    headline: 'Amankan Fondasi Bisnis Anda',
    description: 'Dari PT, CV, hingga NIB, kami menyederhanakan seluruh proses legalitas usaha agar Anda bisa fokus pada pertumbuhan.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'Mulai Pendirian Usaha',
    ctaLink: '/mulai-layanan/legalitas-usaha',
  },
  {
    serviceSlug: 'pembuatan-kontrak',
    headline: 'Lindungi Setiap Kesepakatan',
    description: 'Buat kontrak kerja, sewa, dan kerjasama yang kuat secara hukum untuk meminimalisir risiko sengketa di masa depan.',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'Buat Kontrak Sekarang',
    ctaLink: '/mulai-layanan/pembuatan-kontrak',
  },
  {
    serviceSlug: 'kekayaan-intelektual',
    headline: 'Amankan Aset Kreatif Anda',
    description: 'Daftarkan merek dagang dan hak cipta Anda untuk melindungi identitas unik dan karya orisinal bisnis Anda dari peniruan.',
    image: 'https://images.unsplash.com/photo-1585753160454-b38872322103?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'Daftarkan Merek Dagang',
    ctaLink: '/mulai-layanan/kekayaan-intelektual',
  },
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? heroSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === heroSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const openHumiChat = () => {
    window.dispatchEvent(new CustomEvent('openHumiChat'));
  };

  return (
    <section className="relative h-[80vh] min-h-[600px] text-white overflow-hidden flex items-center justify-center">
      {/* Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{ 
                backgroundImage: `url(${slide.image})`,
                opacity: index === currentIndex ? 1 : 0 
            }}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-brand-dark/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative h-80 flex items-center">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.serviceSlug}
              className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
              aria-hidden={index !== currentIndex}
            >
                <div className={index === currentIndex ? "hero-content-animate" : ""}>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-shadow-md">
                      {slide.headline}
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-200 text-shadow">
                      {slide.description}
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                      <Link to={slide.ctaLink} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        {slide.ctaText}
                      </Link>
                      <button onClick={openHumiChat} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm ring-1 ring-inset ring-white/20 transition-all">
                        <Icon className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                        Tanya HUMI
                      </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all z-20"
        aria-label="Previous slide"
      >
        <Icon className="w-6 h-6 text-white"><path d="m15 18-6-6 6-6"></path></Icon>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 transition-all z-20"
        aria-label="Next slide"
      >
        <Icon className="w-6 h-6 text-white"><path d="m9 18 6-6-6-6"></path></Icon>
      </button>

       {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, slideIndex) => (
            <button 
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                aria-label={`Go to slide ${slideIndex + 1}`}
            />
        ))}
      </div>
      
       <style>{`
        .text-shadow { text-shadow: 0 1px 3px rgba(0,0,0,0.4); }
        .text-shadow-md { text-shadow: 0 2px 5px rgba(0,0,0,0.5); }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px); /* More subtle movement */
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Apply animation to the content container */
        .hero-content-animate {
          animation: fadeInUp 0.7s ease-out forwards; /* Synced with parent transition */
        }
      `}</style>
    </section>
  );
};

export default Hero;