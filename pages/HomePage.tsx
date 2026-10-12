import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Icon from '../components/Icon';
import WhyChooseUs from '../components/WhyChooseUs';
import FAQSection from '../components/FAQSection';

const HomePage: React.FC = () => {
  const openHumiChat = () => {
    window.dispatchEvent(new CustomEvent('openHumiChat'));
  };

  const scheduleVideoCall = () => {
    window.dispatchEvent(new CustomEvent('scheduleVideoCall'));
  };

  const faqs = [
    {
      question: "Apa saja layanan utama yang ditawarkan HalloHukum?",
      answer: "HalloHukum menyediakan layanan legalitas usaha (pendirian PT, CV, UMKM), pembuatan berbagai jenis kontrak bisnis, bantuan hukum untuk sengketa, dan layanan Legal Advisor On-Demand untuk konsultasi langsung dengan ahli hukum."
    },
    {
      question: "Siapa target utama pengguna HalloHukum?",
      answer: "Layanan kami dirancang khusus untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia yang membutuhkan solusi hukum yang mudah, terjangkau, dan terpercaya untuk mendukung pertumbuhan bisnis mereka."
    },
    {
      question: "Bagaimana proses pendirian PT melalui HalloHukum?",
      answer: "Prosesnya sangat mudah. Anda hanya perlu mengisi formulir online, mengunggah dokumen yang diperlukan, dan tim kami akan menangani semua proses birokrasi dari awal hingga akhir. Kami akan terus memberikan update hingga badan usaha Anda resmi terdaftar."
    }
  ];

  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />

      {/* Ask a Question CTA */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-white mb-6">
                <Icon className="h-8 w-8">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </Icon>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Ajukan Pertanyaan Hukum</h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Klik tombol di bawah untuk memulai percakapan dengan HUMI, AI Legal Agent kami. Dapatkan panduan awal secara gratis dan instan, kapan pun Anda butuhkan.
            </p>
            <div className="mt-8">
              <button
                onClick={openHumiChat}
                className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Ajukan Pertanyaan Hukum pada HUMI"
              >
                Mulai Chat dengan HUMI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Core Services CTA Section */}
      <section className="bg-gradient-to-br from-sky-500 to-brand-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Siap Ambil Langkah Pertama? Amankan Bisnis Anda Sekarang.
              </h2>
              <p className="mt-4 text-lg text-sky-100">
                Jangan biarkan urusan legalitas menghambat pertumbuhan bisnis Anda. Dengan HalloHukum, Anda mendapatkan partner terpercaya untuk mengurus semua kebutuhan hukum, dari pendirian usaha hingga perlindungan merek.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Icon className="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                  <span><strong className="text-white">Proses Cepat & Online:</strong> Hemat waktu Anda, semua proses dapat dipantau secara digital.</span>
                </li>
                <li className="flex items-start">
                  <Icon className="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                  <span><strong className="text-white">Biaya Transparan:</strong> Tidak ada biaya tersembunyi, semua paket layanan kami jelas dan terperinci.</span>
                </li>
                 <li className="flex items-start">
                  <Icon className="w-6 h-6 text-brand-accent mr-3 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                  <span><strong className="text-white">Dukungan Ahli:</strong> Didukung oleh tim konsultan hukum profesional yang berfokus pada UMKM.</span>
                </li>
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                 <Link to="/mulai" className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    Mulai Layanan Hukum Anda
                  </Link>
                  <button
                    onClick={openHumiChat}
                    className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm ring-1 ring-inset ring-white/20 transition-all"
                  >
                    <Icon className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                    Chat dengan HUMI
                  </button>
              </div>
            </div>
             <div className="flex justify-center items-center">
                <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop" 
                    alt="Seorang profesional sedang bekerja dengan laptop, melambangkan kemudahan layanan hukum digital"
                    className="rounded-xl shadow-2xl object-cover w-full max-w-lg"
                    style={{aspectRatio: '5/4'}}
                />
            </div>
          </div>
        </div>
      </section>

      {/* Humi Call to Action Section */}
      <section className="bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Punya Pertanyaan Hukum? <span className="text-brand-secondary">Tanya HUMI</span>
              </h2>
              <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-slate-300">
                AI Legal Agent kami siap 24/7 untuk memberikan informasi awal dan panduan mengenai kebutuhan legalitas bisnis Anda. Cepat, mudah, dan gratis.
              </p>
              <button
                onClick={openHumiChat}
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Mulai Chat dengan HUMI"
              >
                <Icon className="w-5 h-5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </Icon>
                Mulai Chat Sekarang
              </button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop" 
                alt="Ilustrasi antarmuka AI Legal Agent" 
                className="rounded-2xl shadow-2xl object-cover max-w-md w-full"
                style={{aspectRatio: '4/3'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Consultation CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center bg-brand-light p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-secondary text-white mb-6">
                <Icon className="h-8 w-8">
                    <path d="M15.5 3H8.5a1 1 0 0 0-1 1v1.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
                    <path d="M2 12h20"></path>
                    <path d="M2 7h20v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path>
                </Icon>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Siap Mengambil Langkah Berikutnya?</h2>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto">
              Diskusikan kebutuhan hukum bisnis Anda secara langsung dengan konsultan berpengalaman kami. Jadwalkan sesi konsultasi video gratis sekarang juga.
            </p>
            <div className="mt-8">
              <button
                onClick={scheduleVideoCall}
                className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Jadwalkan Konsultasi Video Gratis"
              >
                Jadwalkan Konsultasi Video Gratis
              </button>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      <Pricing />
    </>
  );
};

export default HomePage;