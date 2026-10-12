import React from 'react';
import Pricing from '../components/Pricing';

const PricingPage: React.FC = () => {
  return (
    <>
        <section className="py-12 sm:py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
                    Harga Transparan untuk Setiap Skala Bisnis
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
                    Tidak ada biaya tersembunyi. Pilih paket layanan yang paling sesuai dengan kebutuhan dan anggaran Anda untuk mulai melindungi bisnis Anda hari ini.
                </p>
            </div>
        </section>
        <Pricing />
    </>
  );
};

export default PricingPage;