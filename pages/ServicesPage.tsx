

import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { servicesData } from '../data/servicesData';
import type { Service } from '../data/servicesData';
import Breadcrumb from '../components/Breadcrumb';

// --- New Featured Service Card Component ---
const FeaturedServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    const link = `/layanan/${service.slug}`;
    // Find the popular service option, or default to the first one to show relevant features.
    const popularOption = service.serviceOptions.find(o => o.isPopular) || service.serviceOptions[0];
    const featuresToShow = popularOption ? popularOption.features.slice(0, 3) : [];

    return (
        <Link 
            to={link}
            aria-label={`Lihat detail untuk layanan unggulan ${service.title}`}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-secondary flex flex-col group relative overflow-hidden transform hover:-translate-y-1"
        >
            <div className="flex items-center gap-5 mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-secondary/10 text-brand-secondary transition-colors group-hover:bg-brand-secondary/20">
                    {service.icon}
                </div>
                <h3 className="text-2xl font-extrabold text-brand-dark">{service.title}</h3>
            </div>
            <p className="text-slate-600 mb-6 flex-grow">{service.shortDescription}</p>
            <ul className="space-y-3 mb-6 text-sm">
                {featuresToShow.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <Icon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                        <span className="text-slate-700">{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-auto text-right">
                <div className="inline-block bg-brand-accent text-brand-dark font-semibold py-2 px-5 rounded-lg shadow transition-colors">
                    Lihat Detail
                </div>
            </div>
        </Link>
    );
};


// --- Existing Service Detail Card (for the categorized list) ---
interface ServiceDetailCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    slug: string;
}

const ServiceDetailCard: React.FC<ServiceDetailCardProps> = ({ icon, title, description, features, slug }) => {
    const link = `/layanan/${slug}`;

    return (
    <Link 
        to={link}
        aria-label={`Lihat detail untuk ${title}`}
        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 transform hover:-translate-y-1"
    >
        <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary/20 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-brand-dark">{title}</h3>
        </div>
        <p className="text-slate-500 mb-6">{description}</p>
        <ul className="space-y-3 mb-6 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                    <Icon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                    <span className="text-slate-600">{feature}</span>
                </li>
            ))}
        </ul>
        
        <div className="mt-auto pt-4 text-center">
            <div className="inline-block bg-brand-secondary text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">
                Lihat Detail
            </div>
        </div>
    </Link>
)};


// --- Main Services Page Component ---
const ServicesPage: React.FC = () => {
    // Define featured services for the top section
    const featuredServiceSlugs = ['legalitas-usaha', 'kekayaan-intelektual', 'pembuatan-kontrak'];
    const featuredServices = servicesData.filter(service => featuredServiceSlugs.includes(service.slug));

    // Group ALL services by category for the comprehensive list below
    const groupedServices = servicesData.reduce((acc, service) => {
      const category = service.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    }, {} as { [key: string]: typeof servicesData });

    const categoryOrder = [
        'Legalitas Usaha',
        'Kekayaan Intelektual',
        'Kontrak Bisnis',
        'Konsultasi Hukum'
    ];
    
    const breadcrumbItems = [
      { label: 'Beranda', link: '/' },
      { label: 'Layanan' },
    ];

    const openHumiChat = () => {
      window.dispatchEvent(new CustomEvent('openHumiChat'));
    };

    return (
        <>
            {/* Page Header */}
            <section className="py-12 sm:py-16 lg:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                         <div className="mb-8">
                            <Breadcrumb items={breadcrumbItems} />
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
                                Layanan Hukum Terintegrasi
                            </h1>
                            <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                                Kami menyediakan solusi hukum yang komprehensif, dirancang khusus untuk mendukung setiap tahap pertumbuhan bisnis UMKM Anda.
                            </p>
                            <div className="mt-8">
                                <button
                                    onClick={openHumiChat}
                                    className="inline-flex items-center justify-center gap-3 rounded-lg text-base font-semibold py-3 px-6 bg-brand-secondary text-white hover:bg-sky-400 transition-all shadow-md"
                                >
                                <Icon className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                                Punya Pertanyaan? Tanya HUMI
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Featured Services Section */}
            <section className="py-12 sm:py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Layanan Unggulan Kami</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                            Solusi paling populer dan esensial yang dibutuhkan oleh para pelaku UMKM untuk memulai dan melindungi bisnis mereka.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {featuredServices.map(service => (
                            <FeaturedServiceCard key={service.slug} service={service} />
                        ))}
                    </div>
                </div>
            </section>

            {/* All Services Section (Categorized) */}
            <section className="py-12 sm:py-16 lg:py-24 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Semua Layanan Kami</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                           Jelajahi semua kategori layanan yang kami tawarkan untuk menemukan solusi yang tepat bagi Anda.
                        </p>
                    </div>
                    <div className="space-y-16">
                        {categoryOrder.map(category => {
                            const services = groupedServices[category];
                            if (!services || services.length === 0) return null;

                            return (
                                <div key={category}>
                                    <h2 className="text-3xl font-extrabold text-brand-dark mb-8 border-b pb-4">{category}</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {services.map((service) => {
                                            const popularOption = service.serviceOptions.find(o => o.isPopular) || service.serviceOptions[0];
                                            const featuresToShow = popularOption ? popularOption.features.slice(0, 4) : [];

                                            return (
                                                <ServiceDetailCard 
                                                    key={service.slug} 
                                                    icon={service.icon}
                                                    title={service.title}
                                                    description={service.shortDescription}
                                                    features={featuresToShow}
                                                    slug={service.slug}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServicesPage;
