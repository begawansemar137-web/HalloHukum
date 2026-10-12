import React from 'react';
import Icon from './Icon';

const BenefitItem: React.FC<{ icon: React.ReactElement; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center h-full">
        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-brand-accent/10 text-brand-accent mb-5">
            {React.cloneElement(icon, { className: "w-8 h-8" })}
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-slate-500 flex-grow">{description}</p>
    </div>
);


const WhyChooseUs: React.FC = () => {
    const benefits = [
        {
            icon: <Icon><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></Icon>,
            title: "Inovasi AI Terdepan",
            description: "Dapatkan informasi hukum awal secara instan 24/7 melalui HUMI, AI Legal Agent kami yang dirancang untuk menjawab pertanyaan dasar UMKM."
        },
        {
            icon: <Icon><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></Icon>,
            title: "Fokus #1 pada UMKM",
            description: "Seluruh layanan, proses, dan harga kami dirancang khusus untuk memenuhi kebutuhan dan tantangan unik yang dihadapi oleh UMKM Indonesia."
        },
        {
            icon: <Icon><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></Icon>,
            title: "Harga Transparan & Terjangkau",
            description: "Tidak ada biaya tersembunyi. Kami menyediakan paket layanan dengan harga yang jelas dan terjangkau, memungkinkan Anda mengelola anggaran dengan pasti."
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Mengapa Memilih HalloHukum?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Kami lebih dari sekadar penyedia layanan hukum. Kami adalah partner pertumbuhan bisnis Anda.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {benefits.map((benefit, index) => (
                        <BenefitItem key={index} {...benefit} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;