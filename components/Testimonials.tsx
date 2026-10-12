import React, { useState } from 'react';
import Icon from './Icon';

const TestimonialCard: React.FC<{ quote: string; name: string; business: string; avatar: string }> = ({ quote, name, business, avatar }) => (
  <figure className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
    <blockquote className="text-slate-600 flex-grow">
      <p>"{quote}"</p>
    </blockquote>
    <figcaption className="flex items-center mt-6">
      <img className="h-12 w-12 rounded-full object-cover" src={avatar} alt={name} />
      <div className="ml-4">
        <div className="font-bold text-brand-dark">{name}</div>
        <div className="text-slate-500 text-sm">{business}</div>
      </div>
    </figcaption>
  </figure>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      quote: "HalloHukum benar-benar mengubah cara saya mengurus legalitas. Prosesnya cepat, biayanya transparan, dan timnya sangat membantu. Sangat direkomendasikan!",
      name: "Andi Wijaya",
      business: "Owner, Kopi Senja",
      avatar: "https://picsum.photos/id/1005/100/100",
    },
    {
      quote: "Sebagai UMKM baru, saya bingung soal kontrak dengan supplier. Tim HalloHukum memberikan solusi kontrak yang melindungi bisnis saya. Terima kasih banyak!",
      name: "Siti Aminah",
      business: "Founder, Cantik Hijab",
      avatar: "https://picsum.photos/id/1011/100/100",
    },
     {
      quote: "Konsultasi dengan HUMI AI sangat praktis untuk pertanyaan-pertanyaan hukum dasar. Cepat dan to the point. Fitur yang sangat inovatif!",
      name: "Budi Santoso",
      business: "CEO, Tech Startup",
      avatar: "https://picsum.photos/id/1025/100/100",
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <section id="testimoni" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Kisah Sukses UMKM Bersama Kami</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Jangan hanya dengar dari kami. Lihat apa yang dikatakan para pemilik bisnis.
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="max-w-2xl mx-auto relative">
            <div className="overflow-hidden rounded-2xl">
                <div 
                    className="whitespace-nowrap transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    role="list"
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="inline-block w-full align-top p-1" role="listitem">
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Left Arrow */}
            <button 
                onClick={prevSlide}
                className="absolute top-1/2 left-2 sm:-left-12 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
                aria-label="Previous testimonial"
            >
                <Icon className="w-6 h-6 text-brand-dark"><path d="m15 18-6-6 6-6"></path></Icon>
            </button>
            {/* Right Arrow */}
            <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-2 sm:-right-12 transform -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
                aria-label="Next testimonial"
            >
                <Icon className="w-6 h-6 text-brand-dark"><path d="m9 18 6-6-6-6"></path></Icon>
            </button>
            
            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, slideIndex) => (
                    <button 
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-brand-dark scale-125' : 'bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Go to testimonial ${slideIndex + 1}`}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;