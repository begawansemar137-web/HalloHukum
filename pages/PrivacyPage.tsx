import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <>
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Kebijakan Privasi
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            Privasi Anda penting bagi kami. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Terakhir diperbarui: 1 Agustus 2024.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="prose lg:prose-lg max-w-none text-slate-600">
                <h2>1. Informasi yang Kami Kumpulkan</h2>
                <p>
                    Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara sukarela, seperti nama, alamat email, nomor telepon, dan detail bisnis Anda saat Anda mendaftar, menggunakan formulir kontak, atau berinteraksi dengan layanan kami. Kami juga dapat mengumpulkan data non-pribadi seperti jenis browser dan pola penggunaan untuk meningkatkan layanan kami.
                </p>

                <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
                <p>
                    Informasi yang kami kumpulkan digunakan untuk:
                </p>
                <ul>
                    <li>Menyediakan, mengoperasikan, dan memelihara Layanan kami.</li>
                    <li>Meningkatkan, mempersonalisasi, dan memperluas Layanan kami.</li>
                    <li>Memahami dan menganalisis bagaimana Anda menggunakan Layanan kami.</li>
                    <li>Berkomunikasi dengan Anda, baik secara langsung atau melalui salah satu mitra kami, termasuk untuk layanan pelanggan, untuk memberi Anda pembaruan dan informasi lain yang berkaitan dengan Layanan, dan untuk tujuan pemasaran dan promosi.</li>
                    <li>Memproses transaksi Anda.</li>
                </ul>
                
                <h2>3. Keamanan Data</h2>
                <p>
                    Kami menerapkan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Namun, tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100% aman. Meskipun kami berusaha untuk menggunakan cara yang dapat diterima secara komersial untuk melindungi Informasi Pribadi Anda, kami tidak dapat menjamin keamanan mutlaknya.
                </p>

                <h2>4. Berbagi Informasi</h2>
                <p>
                    Kami tidak menjual, memperdagangkan, atau menyewakan informasi identifikasi pribadi pengguna kepada pihak lain. Kami dapat membagikan informasi demografis agregat generik yang tidak terkait dengan informasi identifikasi pribadi apa pun mengenai pengunjung dan pengguna dengan mitra bisnis kami, afiliasi tepercaya, dan pengiklan untuk tujuan yang diuraikan di atas.
                </p>
                
                <h2>5. Hak Anda</h2>
                <p>
                    Anda memiliki hak untuk mengakses, memperbarui, atau menghapus informasi pribadi Anda yang kami miliki. Jika Anda ingin menggunakan hak ini, silakan hubungi kami melalui informasi kontak yang tersedia di situs kami.
                </p>
            </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPage;