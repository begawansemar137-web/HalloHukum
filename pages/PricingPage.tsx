import React from 'react';
import Pricing from '../components/Pricing';

const PricingPage: React.FC = () => {
  return (
    <>
        <section className="pt-16 pb-12 sm:pt-20 lg:pt-24 lg:pb-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-normal tracking-[-0.02em] text-hh-ink">
                    Harga Transparan untuk Setiap Skala Bisnis
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-hh-ink-2">
                    Tidak ada biaya tersembunyi. Pilih paket layanan yang paling sesuai dengan kebutuhan dan anggaran Anda untuk mulai melindungi bisnis Anda hari ini.
                </p>
            </div>
        </section>
        <Pricing />
    </>
  );
};

export default PricingPage;