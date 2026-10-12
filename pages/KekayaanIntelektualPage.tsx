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

const ServiceOptionCard: React.FC<{ option: ServiceOption, serviceSlug: string }> = ({ option, serviceSlug }) => {
    const link = `/layanan/${serviceSlug}/${option.slug}`;
    
    return (
    <Link 
       to={link}
       aria-label={`Lihat detail untuk ${option.title}`}
       className={`bg-white rounded-2xl shadow-lg border ${option.isPopular ? 'border-brand-secondary ring-2 ring-brand-secondary' : 'border-slate-200'} p-8 flex flex-col h-full group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer`}>
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

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-6">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-brand-dark"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <Icon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </Icon>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-slate-600 pr-8">{answer}</p>
      </div>
    </div>
  );
};

const KekayaanIntelektualPage: React.FC = () => {
    const service = servicesData.find(s => s.slug === 'kekayaan-intelektual');

    if (!service) {
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h1 className="text-3xl font-bold">Layanan Tidak Ditemukan</h1>
            <p className="mt-4">Maaf, layanan yang Anda cari tidak ada.</p>
            <Link to="/layanan" className="mt-8 inline-block bg-brand-dark text-white font-semibold py-3 px-6 rounded-lg">Kembali ke Halaman Layanan</Link>
          </div>
        );
    }
    
    const faqs = [
        {
            question: "Apa saja jenis perlindungan kekayaan intelektual yang tersedia?",
            answer: "Jenis utamanya adalah Merek Dagang (melindungi nama/logo), Hak Cipta (melindungi karya seperti tulisan, musik, software), Paten (melindungi penemuan/inovasi teknis), dan Desain Industri (melindungi tampilan luar produk)."
        },
        {
            question: "Berapa lama proses pendaftaran hak cipta?",
            answer: "Berbeda dengan merek, perlindungan Hak Cipta timbul secara otomatis saat karya diciptakan. Namun, 'pencatatan' resmi di DJKI sebagai bukti hukum sangat cepat, biasanya hanya memakan waktu beberapa hari kerja setelah pengajuan."
        }
    ];

    return (
        <div className="animate-floatIn">
            {/* Hero Section */}
            <section className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
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
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
                                {service.title}
                            </h1>
                            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                                {service.heroSubtitle}
                            </p>
                            <Link to={`/mulai-layanan/${service.slug}`} className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-8 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Amankan Aset Saya Sekarang
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

            {/* IP Types Section */}
            <section className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-12">
                         <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">{service.serviceOptionsTitle}</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">{service.serviceOptionsSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                        {service.serviceOptions.map((option) => (
                            <div key={option.slug} className="relative">
                                 {option.isPopular && (
                                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10">
                                       <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-brand-secondary text-white">Paling Penting</span>
                                   </div>
                                 )}
                                <ServiceOptionCard option={option} serviceSlug={service.slug} />
                            </div>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <p className="text-slate-600">Butuh perlindungan untuk penemuan/inovasi teknologi? Tanyakan kepada tim kami tentang <strong className="text-brand-dark">Paten</strong>.</p>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-12 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">Proses Pendaftaran Kami Sederhanakan</h2>
                            <p className="text-slate-600 text-lg mb-8">Fokus pada kreasi Anda, biarkan kami yang mengurus proses pendaftaran yang rumit dari awal hingga akhir.</p>
                            <img src={service.image} alt="Proses pendaftaran Kekayaan Intelektual" className="rounded-2xl shadow-xl w-full h-auto object-cover" style={{ aspectRatio: '4/3' }} />
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

            {/* FAQ Section */}
            <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Pertanyaan Umum (FAQ)</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                            Jawaban cepat untuk pertanyaan seputar Kekayaan Intelektual.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
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

export default KekayaanIntelektualPage;