import React, { useState } from 'react';
import Icon from '../components/Icon';
import WhyChooseUs from '../components/WhyChooseUs';

const TeamMemberCard = ({ name, role, avatar }: { name: string; role: string; avatar: string }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="text-center">
            <div className="relative mx-auto h-40 w-40">
                {/* Placeholder */}
                {isLoading && (
                    <div className="absolute inset-0 bg-slate-200 rounded-full animate-pulse" aria-hidden="true"></div>
                )}
                {/* Image */}
                <img
                    className={`h-40 w-40 rounded-full object-cover transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    src={avatar}
                    alt={name}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <h3 className="mt-6 text-xl font-bold text-brand-dark">{name}</h3>
            <p className="text-brand-secondary">{role}</p>
        </div>
    );
};

const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Tentang <span className="text-brand-secondary">HalloHukum</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            Kami adalah partner legal digital yang berdedikasi untuk memberdayakan Usaha Mikro, Kecil, dan Menengah (UMKM) di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* Misi & Visi Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">Misi Kami</h2>
                    <p className="text-slate-600 text-lg mb-6">Menyediakan akses yang mudah, terjangkau, dan terpercaya terhadap layanan hukum berkualitas bagi UMKM, sehingga mereka dapat bertumbuh dengan aman dan percaya diri.</p>
                     <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark mb-4">Visi Kami</h2>
                    <p className="text-slate-600 text-lg">Menjadi platform legal-tech terdepan di Indonesia yang mendorong ekosistem bisnis yang adil, transparan, dan berlandaskan hukum yang kuat.</p>
                </div>
                <div className="text-center">
                   <img src="https://images.unsplash.com/photo-1556761175-b413da4b2488?q=80&w=800" alt="Team discussing work" className="rounded-2xl shadow-xl w-full h-auto" />
                </div>
            </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Tim Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Tim Profesional Kami</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                    Didukung oleh para ahli di bidang hukum dan teknologi yang bersemangat membantu Anda.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <TeamMemberCard name="Gabrielle Krishna Setiawan" role="Founder & CEO" avatar="https://picsum.photos/id/200/200/200" />
                <TeamMemberCard name="Baskara Mahendra" role="Head of Legal" avatar="https://picsum.photos/id/433/200/200" />
                <TeamMemberCard name="Citra Kirana" role="Chief Technology Officer" avatar="https://picsum.photos/id/65/200/200" />
                <TeamMemberCard name="Dharma Putra" role="Head of Operations" avatar="https://picsum.photos/id/219/200/200" />
            </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;