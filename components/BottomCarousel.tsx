
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const slides = [
  {
    icon: <Icon className="w-10 h-10"><path d="M4.5 16.5c-1.5 1.5-3 2.3-4.5 3"></path><path d="M17.5 2.5c1.5-1.5 3-2.3 4.5-3"></path><path d="M21.5 21.5c-1.5-1.5-2.3-3-3-4.5"></path><path d="m3 3-2 2"></path><path d="M13 19l-4-4"></path><path d="m3 21 6-6"></path><path d="m19 13-4-4"></path><circle cx="11" cy="11" r="8"></circle></Icon>,
    title: "Siap Memulai Perjalanan Legal Anda?",
    description: "Lindungi bisnis Anda dari awal. Pilih paket layanan kami yang paling sesuai dan biarkan kami yang mengurus legalitasnya.",
    buttonText: "Lihat Paket Harga",
    buttonLink: "/harga"
  },
  {
    icon: <Icon className="w-10 h-10"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>,
    title: "Punya Pertanyaan Spesifik?",
    description: "Tim ahli hukum kami siap membantu. Jadwalkan konsultasi atau mulai chat dengan AI Legal Agent kami sekarang juga.",
    buttonText: "Hubungi Kami",
    buttonLink: "/kontak"
  },
  {
    icon: <Icon className="w-10 h-10"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></Icon>,
    title: "Kami Selalu Mendampingi Anda",
    description: "Di setiap langkah pertumbuhan bisnis Anda, HalloHukum hadir sebagai partner legal yang dapat diandalkan.",
    buttonText: "Learn About Us",
    buttonLink: "/about-us"
  }
];

const BottomCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 8000); // Change slide every 8 seconds

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <section className="bg-brand-dark text-brand-light py-20 sm:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative max-w-3xl mx-auto text-center">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {slides.map((slide, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div className="flex justify-center mb-6 text-brand-accent">
                                        {slide.icon}
                                    </div>
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{slide.title}</h2>
                                    <p className="text-slate-300 text-lg mb-8">{slide.description}</p>
                                    <Link
                                        to={slide.buttonLink}
                                        className="inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        {slide.buttonText}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Navigation */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
                        {slides.map((_, slideIndex) => (
                            <button
                                key={slideIndex}
                                onClick={() => goToSlide(slideIndex)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                aria-label={`Go to slide ${slideIndex + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BottomCarousel;
