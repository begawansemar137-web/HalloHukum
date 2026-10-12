import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { servicesData } from '../data/servicesData';
import type { Service } from '../data/servicesData';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const link = `/layanan/${service.slug}`;

  return (
    <Link
      to={link}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-brand-secondary flex flex-col text-left h-full w-full group relative focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 overflow-hidden transform hover:-translate-y-1"
      aria-label={`Pelajari lebih lanjut tentang ${service.title}`}
    >
      <div className="p-8 flex flex-col h-full">
        <div className="transition-colors duration-300 flex items-center justify-center h-16 w-16 rounded-full bg-brand-secondary/10 text-brand-secondary mb-6 group-hover:bg-brand-secondary/20">
          {service.icon}
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">{service.title}</h3>
        <p className="text-slate-500 text-sm flex-grow mb-4">{service.shortDescription}</p>
        <div className="mt-auto pt-4">
          <span className="font-semibold text-brand-secondary">
            Lihat Detail &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

const Services: React.FC = () => {
  return (
    <section id="layanan" className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Layanan Hukum Terintegrasi</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
            Satu platform untuk semua kebutuhan legalitas UMKM Anda, dari awal hingga berkembang.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;