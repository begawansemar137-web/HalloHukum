import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <>
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Syarat & Ketentuan
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            Harap baca Syarat & Ketentuan ini dengan saksama sebelum menggunakan layanan kami. Terakhir diperbarui: 1 Agustus 2024.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="prose lg:prose-lg max-w-none text-slate-600">
                <h2>1. Penerimaan Ketentuan</h2>
                <p>
                    Dengan mengakses dan menggunakan platform HalloHukum ("Layanan"), Anda setuju untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak diizinkan untuk menggunakan Layanan.
                </p>

                <h2>2. Deskripsi Layanan</h2>
                <p>
                    HalloHukum adalah platform teknologi hukum (legal-tech) yang menyediakan informasi, alat bantu, dan akses ke profesional hukum untuk membantu Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia. Layanan kami mencakup, namun tidak terbatas pada, informasi legalitas usaha, pembuatan draf kontrak, dan konsultasi hukum awal melalui AI Legal Agent (HUMI) dan konsultan hukum manusia.
                </p>
                
                <h2>3. Disclaimer Penting</h2>
                <p>
                    HalloHukum bukanlah firma hukum dan tidak memberikan nasihat hukum. Informasi yang diberikan melalui platform kami, termasuk oleh HUMI, bersifat informatif dan edukatif, dan tidak dapat dianggap sebagai pengganti konsultasi dengan pengacara yang berkualifikasi. Hubungan pengacara-klien tidak terbentuk hanya dengan menggunakan Layanan kami.
                </p>

                <h2>4. Kewajiban Pengguna</h2>
                <p>
                    Anda setuju untuk menggunakan Layanan hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku. Anda bertanggung jawab penuh atas keakuratan informasi yang Anda berikan saat menggunakan layanan kami. Anda dilarang keras menggunakan platform untuk aktivitas ilegal atau yang melanggar hak pihak ketiga.
                </p>
                
                <h2>5. Perubahan pada Layanan dan Ketentuan</h2>
                <p>
                    Kami berhak untuk mengubah atau menghentikan, sementara atau permanen, Layanan (atau bagian apa pun darinya) dengan atau tanpa pemberitahuan. Kami juga berhak untuk memodifikasi Syarat & Ketentuan ini dari waktu ke waktu. Penggunaan Anda yang berkelanjutan atas Layanan setelah perubahan tersebut merupakan penerimaan Anda terhadap ketentuan yang baru.
                </p>
            </div>
        </div>
      </section>
    </>
  );
};

export default TermsPage;