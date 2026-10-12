import React from 'react';
import Icon from '../components/Icon';
import type { Benefit, ServiceOption } from '../types';

export interface Service {
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  // FIX: Relaxed type from React.ReactElement<React.SVGProps<SVGSVGElement>> to React.ReactElement to allow for function component elements.
  icon: React.ReactElement;
  image: string;
  features: string[];
  processSteps: { title: string; description: string }[];
  // Enriched Content Fields
  heroSubtitle: string;
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefits: Benefit[];
  serviceOptionsTitle: string;
  serviceOptionsSubtitle: string;
  serviceOptions: ServiceOption[];
}

export const servicesData: Service[] = [
  {
    slug: 'legalitas-usaha',
    category: 'Legalitas Usaha',
    title: 'Legalitas Usaha',
    shortDescription: 'Pendirian PT, CV, UMKM, pengurusan izin usaha, dan legalitas lainnya dengan proses yang cepat dan transparan.',
    longDescription: 'Kami memahami bahwa mendirikan badan usaha bisa menjadi langkah yang rumit. HalloHukum hadir untuk menyederhanakan seluruh proses, memastikan bisnis Anda memiliki fondasi hukum yang kuat sejak hari pertama. Kami membantu Anda memilih bentuk badan usaha yang paling sesuai, mengurus semua dokumentasi yang diperlukan, hingga mendapatkan izin resmi.',
    icon: React.createElement(Icon, { className: "w-8 h-8" }, React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }), React.createElement("polyline", { points: "14 2 14 8 20 8" }), React.createElement("line", { x1: "16", y1: "13", x2: "8", y2: "13" }), React.createElement("line", { x1: "16", y1: "17", x2: "8", y2: "17" }), React.createElement("polyline", { points: "10 9 9 9 8 9" })),
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1200&auto=format&fit=crop',
    features: [], // Features are now part of serviceOptions
    processSteps: [
        { title: "Konsultasi & Pengumpulan Data", description: "Anda mengisi formulir online dan mengunggah dokumen yang diperlukan. Tim kami akan memverifikasi dan memberikan konsultasi awal." },
        { title: "Proses Akta Notaris", description: "Kami bekerja sama dengan notaris terpercaya untuk pembuatan draf dan penandatanganan Akta Pendirian Perusahaan." },
        { title: "Pengesahan Kemenkumham", description: "Akta yang telah ditandatangani akan kami proses untuk mendapatkan pengesahan resmi dari Kementerian Hukum dan HAM." },
        { title: "Penerbitan Izin & Dokumen Legal", description: "Setelah disahkan, kami akan mengurus NIB (Nomor Induk Berusaha) dan izin lainnya. Semua dokumen legal akan kami serahkan kepada Anda." }
    ],
    heroSubtitle: 'Dari PT, CV, hingga PT Perorangan, kami menyederhanakan seluruh proses birokrasi agar Anda bisa fokus mengembangkan bisnis dengan fondasi hukum yang kuat.',
    benefitsTitle: 'Mengapa Legalitas Usaha Penting?',
    benefitsSubtitle: 'Legalitas bukan hanya soal formalitas, tapi investasi untuk masa depan bisnis Anda.',
    benefits: [
      {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })),
        title: 'Perlindungan Hukum',
        description: 'Amankan aset pribadi Anda dari risiko bisnis dan beroperasi dengan tenang di bawah payung hukum yang jelas.'
      },
      {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), React.createElement("circle", { cx: "9", cy: "7", r: "4" }), React.createElement("path", { d: "m21.2 15.2 1.3-1.3a2 2 0 0 0-3-3l-1.3 1.3a2 2 0 0 0 3 3Z" })),
        title: 'Kredibilitas Profesional',
        description: 'Tingkatkan kepercayaan pelanggan, investor, dan mitra bisnis dengan status badan usaha yang resmi dan terdaftar.'
      },
      {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M12 2L2 7l10 5 10-5-10-5z" }), React.createElement("path", { d: "M2 17l10 5 10-5" }), React.createElement("path", { d: "M2 12l10 5 10-5" })),
        title: 'Akses Permodalan',
        description: 'Buka peluang untuk mendapatkan pinjaman bank, pendanaan dari investor, dan mengikuti tender pemerintah.'
      }
    ],
    serviceOptionsTitle: 'Pilih Badan Usaha yang Tepat',
    serviceOptionsSubtitle: 'Setiap jenis badan usaha memiliki kelebihan dan peruntukannya masing-masing. Kami bantu Anda memilih yang terbaik.',
    serviceOptions: [
      {
        slug: 'pt-perorangan',
        title: 'PT Perorangan',
        description: 'Solusi bagi pengusaha tunggal yang ingin menikmati keuntungan status badan hukum PT dengan syarat yang lebih mudah.',
        bestFor: 'Usaha Mikro & Kecil',
        features: ["Didirikan oleh 1 orang", "Pemisahan harta pribadi & perusahaan", "Status badan hukum", "Tidak ada modal minimal"],
        detailedContent: {
          longDescription: "PT Perorangan adalah terobosan hukum yang memungkinkan pelaku usaha mikro dan kecil (UMK) untuk mendirikan perseroan terbatas seorang diri. Ini memberikan perlindungan hukum berupa pemisahan antara aset pribadi dan aset perusahaan, sebuah keuntungan yang sebelumnya hanya dimiliki oleh PT biasa. Dengan persyaratan yang lebih sederhana dan tanpa kewajiban modal dasar minimal, PT Perorangan menjadi pilihan ideal bagi solopreneur yang ingin meningkatkan profesionalisme dan keamanan bisnisnya.",
          useCases: [
            { title: "Online Seller", description: "Meningkatkan kepercayaan pembeli dan membuka akses ke platform e-commerce yang memerlukan badan usaha." },
            { title: "Freelancer & Konsultan", description: "Memberikan citra profesional dan memudahkan dalam penagihan B2B (Business-to-Business)." },
            { title: "Warung atau Toko Kelontong", description: "Melindungi aset pribadi pemilik dari utang atau kerugian usaha." },
          ],
          requirements: ["KTP (Kartu Tanda Penduduk) pendiri", "NPWP (Nomor Pokok Wajib Pajak) pribadi pendiri", "Alamat email dan nomor telepon yang aktif", "Rencana nama PT Perorangan"],
          images: [
            "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
          ]
        }
      },
      {
        slug: 'perseroan-terbatas',
        title: 'Perseroan Terbatas (PT)',
        description: 'Bentuk badan usaha paling kredibel, ideal untuk bisnis yang berencana untuk tumbuh besar dan menarik investor.',
        bestFor: 'Startup & Bisnis Berkembang',
        features: ["Didirikan oleh min. 2 orang", "Tanggung jawab terbatas pada modal", "Fleksibilitas kepemilikan saham", "Akses lebih mudah ke pendanaan"],
        isPopular: true,
        detailedContent: {
          longDescription: "Perseroan Terbatas (PT) adalah bentuk badan usaha yang paling umum dan diakui kredibilitasnya di Indonesia. Didirikan oleh minimal dua orang dengan modal dasar yang terbagi dalam saham, PT menawarkan pemisahan harta yang jelas antara pemilik (pemegang saham) dan perusahaan. Ini berarti tanggung jawab pemegang saham terbatas hanya pada modal yang disetorkan. Fleksibilitas dalam kepemilikan saham membuat PT menjadi pilihan utama bagi bisnis yang berencana untuk tumbuh, mencari investasi eksternal, atau berpartisipasi dalam proyek skala besar.",
          useCases: [
            { title: "Startup Teknologi", description: "Struktur PT memudahkan pembagian saham untuk founder, co-founder, dan investor." },
            { title: "Perusahaan Dagang & Jasa", description: "Memberikan citra profesional dan legalitas yang kuat untuk transaksi besar." },
            { title: "Bisnis yang Mengincar Tender", description: "Banyak tender pemerintah atau korporat yang mensyaratkan peserta harus berbentuk PT." },
          ],
          requirements: ["KTP dan NPWP para pendiri (minimal 2 orang)", "Pas foto direktur ukuran 3x4", "Surat Keterangan Domisili Usaha", "Struktur kepengurusan (Direktur & Komisaris)"]
        }
      },
      {
        slug: 'commanditaire-vennootschap',
        title: 'Commanditaire V. (CV)',
        description: 'Pilihan populer untuk usaha bersama dengan proses pendirian yang lebih sederhana dan biaya lebih rendah dibandingkan PT.',
        bestFor: 'Usaha bersama skala kecil-menengah',
        features: ["Didirikan oleh min. 2 orang", "Ada sekutu aktif & pasif", "Proses pendirian lebih mudah", "Tidak ada modal minimal yang ditentukan"],
        detailedContent: {
          longDescription: "CV (Commanditaire Vennootschap) adalah bentuk badan usaha yang didirikan oleh minimal dua orang, yang terdiri dari sekutu aktif (persero pengurus) dan sekutu pasif (persero komanditer). Sekutu aktif bertanggung jawab penuh atas pengelolaan dan utang perusahaan hingga harta pribadi, sementara sekutu pasif hanya menyetorkan modal dan bertanggung jawab sebatas modal tersebut. Proses pendirian CV lebih sederhana dan biayanya lebih terjangkau dibandingkan PT, menjadikannya pilihan populer bagi kemitraan bisnis skala kecil hingga menengah.",
          useCases: [
            { title: "Kemitraan Bisnis", description: "Ideal untuk kolaborasi di mana satu pihak mengelola operasional dan pihak lain hanya sebagai investor." },
            { title: "Usaha Dagang (Toko/Distributor)", description: "Bentuk yang umum untuk bisnis perdagangan yang belum memerlukan struktur sekompleks PT." },
            { title: "Jasa Kontraktor Skala Kecil", description: "Memungkinkan pembagian peran yang jelas antara pelaksana proyek dan penyedia modal." },
          ],
          requirements: ["KTP para pendiri (sekutu aktif dan pasif)", "NPWP sekutu aktif", "Nama CV yang akan digunakan", "Akta pendirian dari Notaris"]
        }
      },
      {
        slug: 'persekutuan-perdata',
        title: 'Persekutuan Perdata',
        description: 'Bentuk badan usaha untuk menjalankan profesi bersama, seperti konsultan, akuntan, atau pengacara.',
        bestFor: 'Profesional & Rekan Praktisi',
        features: ["Didirikan oleh min. 2 orang", "Tanggung jawab pribadi para sekutu", "Tidak berbadan hukum", "Fleksibilitas perjanjian internal"],
        detailedContent: {
          longDescription: "Persekutuan Perdata adalah bentuk kerja sama antara dua orang atau lebih yang mengikatkan diri untuk memasukkan sesuatu (inbreng) ke dalam persekutuan dengan maksud untuk membagi keuntungan. Bentuk ini tidak berbadan hukum dan sering digunakan oleh para profesional untuk menjalankan praktik bersama, seperti kantor hukum, kantor akuntan publik, atau firma konsultan. Tanggung jawab para sekutu bersifat pribadi dan tidak terbatas.",
          useCases: [
            { title: 'Kantor Hukum', description: 'Para pengacara berpraktik bersama di bawah satu nama firma.' },
            { title: 'Kantor Akuntan Publik (KAP)', description: 'Para akuntan mendirikan persekutuan untuk memberikan jasa audit dan akuntansi.' },
            { title: 'Firma Konsultan', description: 'Para ahli di bidang tertentu (misal: arsitek, konsultan manajemen) berkolaborasi dalam satu entitas.' }
          ],
          requirements: ["KTP para pendiri (sekutu)", "NPWP para pendiri", "Perjanjian persekutuan yang dibuat di hadapan notaris", "Surat Keterangan Domisili"]
        }
      },
      {
        slug: 'yayasan',
        title: 'Yayasan',
        description: 'Badan hukum yang didirikan untuk tujuan sosial, keagamaan, dan kemanusiaan, bukan untuk mencari keuntungan.',
        bestFor: 'Kegiatan Nirlaba & Sosial',
        features: ["Tujuan sosial, keagamaan, kemanusiaan", "Berbadan hukum", "Tidak memiliki anggota/pemilik saham", "Kekayaan dipisahkan dari pendiri"],
        detailedContent: {
          longDescription: "Yayasan adalah badan hukum yang terdiri atas kekayaan yang dipisahkan dan diperuntukkan untuk mencapai tujuan tertentu di bidang sosial, keagamaan, dan kemanusiaan. Berbeda dengan PT atau CV, yayasan tidak didirikan untuk mencari keuntungan (nirlaba) dan tidak memiliki saham atau anggota. Semua keuntungan yang diperoleh dari kegiatan usahanya harus digunakan kembali untuk mencapai tujuan yayasan.",
          useCases: [
            { title: 'Lembaga Pendidikan', description: 'Mendirikan sekolah, universitas, atau lembaga kursus nirlaba.' },
            { title: 'Organisasi Sosial', description: 'Menjalankan panti asuhan, lembaga bantuan bencana, atau program pemberdayaan masyarakat.' },
            { title: 'Lembaga Keagamaan', description: 'Mengelola rumah ibadah, lembaga dakwah, atau kegiatan keagamaan lainnya.' }
          ],
          requirements: ["Nama dan Kekayaan Awal yang dipisahkan", "Data diri pendiri, pembina, pengurus, dan pengawas", "Program kerja awal", "Akta pendirian dari notaris"]
        }
      }
    ]
  },
  {
    slug: 'kekayaan-intelektual',
    category: 'Kekayaan Intelektual',
    title: 'Kekayaan Intelektual',
    shortDescription: 'Lindungi aset kreatif Anda. Pendaftaran merek dagang dan hak cipta untuk mengamankan identitas unik bisnis Anda.',
    longDescription: 'Di dunia bisnis yang kompetitif, merek dan karya orisinal adalah aset Anda yang paling berharga. Kami membantu Anda melindungi aset-aset ini melalui pendaftaran Merek Dagang dan pencatatan Hak Cipta, memberikan Anda perlindungan hukum dari peniruan dan penyalahgunaan oleh pihak lain.',
    icon: React.createElement(Icon, { className: "w-8 h-8" }, React.createElement("circle", { cx: "12", cy: "12", r: "3" }), React.createElement("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })),
    image: 'https://images.unsplash.com/photo-1585753160454-b38872322103?q=80&w=1200&auto=format&fit=crop',
    features: [],
    processSteps: [
        { title: "Konsultasi & Penelusuran", description: "Kami menganalisis kebutuhan Anda dan melakukan penelusuran mendalam untuk memastikan merek Anda unik dan dapat didaftarkan." },
        { title: "Persiapan & Pengajuan Dokumen", description: "Tim kami membantu menyiapkan semua dokumen dan persyaratan yang diperlukan untuk pengajuan ke Direktorat Jenderal Kekayaan Intelektual (DJKI)." },
        { title: "Pengajuan & Monitoring Proses", description: "Kami mengajukan permohonan Anda secara resmi dan memonitor seluruh tahapan proses, mulai dari publikasi hingga pemeriksaan substantif." },
        { title: "Sertifikat Terbit!", description: "Setelah disetujui oleh DJKI, sertifikat resmi akan terbit. Aset intelektual Anda kini terlindungi secara hukum." }
    ],
    heroSubtitle: 'Dari merek dagang, logo, hingga karya orisinal, amankan identitas unik bisnis Anda dari peniruan dan penyalahgunaan.',
    benefitsTitle: 'Aset Tak Terlihat, Bernilai Nyata',
    benefitsSubtitle: 'Perlindungan Kekayaan Intelektual (KI) adalah fondasi untuk membangun brand yang kuat dan berkelanjutan.',
    benefits: [
        {
          icon: React.createElement(Icon, null, React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })),
          title: 'Mencegah Peniruan',
          description: 'Dapatkan hak eksklusif untuk menggunakan merek atau karya Anda, dan cegah pihak lain menjiplak hasil kerja keras Anda.'
        },
        {
          icon: React.createElement(Icon, null, React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), React.createElement("circle", { cx: "9", cy: "7", r: "4" }), React.createElement("path", { d: "m21.2 15.2 1.3-1.3a2 2 0 0 0-3-3l-1.3 1.3a2 2 0 0 0 3 3Z" })),
          title: 'Membangun Identitas Brand',
          description: 'Merek dagang yang terdaftar secara resmi memperkuat identitas dan citra profesional bisnis Anda di mata konsumen.'
        },
        {
          icon: React.createElement(Icon, null, React.createElement("path", { d: "M12 2L2 7l10 5 10-5-10-5z" }), React.createElement("path", { d: "M2 17l10 5 10-5" }), React.createElement("path", { d: "M2 12l10 5 10-5" })),
          title: 'Meningkatkan Nilai Aset',
          description: 'Kekayaan intelektual yang terlindungi adalah aset berharga yang dapat dilisensikan atau dijual, meningkatkan valuasi bisnis Anda.'
        }
    ],
    serviceOptionsTitle: 'Jenis Perlindungan untuk Anda',
    serviceOptionsSubtitle: 'Pahami perbedaan antara Merek Dagang dan Hak Cipta untuk memilih perlindungan yang paling tepat.',
    serviceOptions: [
      {
        slug: 'merek-dagang',
        title: 'Merek Dagang',
        description: 'Melindungi identitas komersial bisnis Anda, seperti nama, logo, atau slogan yang membedakan produk/jasa Anda dari pesaing.',
        bestFor: 'Semua Jenis Bisnis',
        features: ["Perlindungan 10 tahun (dapat diperpanjang)", "Mencegah pihak lain memakai nama/logo serupa", "Meningkatkan kepercayaan konsumen", "Dasar untuk waralaba (franchise)"],
        isPopular: true,
        detailedContent: {
          longDescription: "Merek Dagang adalah tanda pengenal unik untuk produk atau jasa Anda. Ini bisa berupa nama, logo, slogan, atau kombinasi dari semuanya. Mendaftarkan merek dagang memberikan Anda hak eksklusif untuk menggunakan tanda tersebut dalam kegiatan komersial di seluruh wilayah Indonesia. Perlindungan ini sangat krusial untuk mencegah kompetitor menggunakan nama atau logo yang serupa, yang dapat membingungkan konsumen dan merusak reputasi brand yang telah Anda bangun.",
          useCases: [
            { title: "Brand Produk Konsumen", description: "Melindungi nama produk makanan, minuman, fashion, kosmetik, dll." },
            { title: "Logo Perusahaan", description: "Mengamankan identitas visual utama dari bisnis Anda." },
            { title: "Nama Jasa/Layanan", description: "Melindungi nama unik dari sebuah kafe, bengkel, atau agensi digital." },
          ],
          requirements: ["Etiket/Label Merek (file gambar logo/nama)", "Identitas Pemohon (KTP/Akta Perusahaan)", "Surat Pernyataan Kepemilikan Merek", "Klasifikasi kelas barang/jasa"],
          images: [
            "https://images.unsplash.com/photo-1620259223847-a8575c328574?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600880292203-757bb62b4be3?q=80&w=1200&auto=format&fit=crop"
          ]
        }
      },
      {
        slug: 'hak-cipta',
        title: 'Hak Cipta',
        description: 'Melindungi karya orisinal dalam bidang ilmu pengetahuan, seni, dan sastra. Perlindungan timbul secara otomatis saat karya diciptakan.',
        bestFor: 'Kreator, Desainer, Penulis, Developer',
        features: ["Perlindungan seumur hidup + 70 tahun", "Hak eksklusif untuk menggandakan & distribusi", "Pencatatan sebagai bukti hukum yang kuat", "Melindungi konten website, buku, lagu, software"],
        detailedContent: {
          longDescription: "Hak Cipta memberikan perlindungan hukum atas karya-karya intelektual orisinal. Berbeda dengan merek, hak cipta melindungi ekspresi dari sebuah ide, bukan idenya itu sendiri. Perlindungan ini timbul secara otomatis saat karya tersebut diwujudkan dalam bentuk nyata. Namun, melakukan pencatatan resmi ke DJKI sangat disarankan karena akan berfungsi sebagai bukti kepemilikan yang kuat jika terjadi sengketa di kemudian hari.",
          useCases: [
            { title: "Konten Website & Blog", description: "Melindungi artikel, foto, dan desain grafis yang Anda publikasikan." },
            { title: "Desain Grafis & Fotografi", description: "Mengamankan karya visual dari penggunaan tanpa izin." },
            { title: "Buku, Musik, & Film", description: "Memberikan hak eksklusif atas distribusi dan penggandaan karya." },
            { title: "Kode Program (Software)", description: "Melindungi source code dari program komputer atau aplikasi." },
          ],
          requirements: ["Contoh Ciptaan (file karya)", "Identitas Pencipta dan Pemegang Hak Cipta", "Surat Pernyataan Keaslian Ciptaan", "Judul dan Uraian Singkat Ciptaan"]
        }
      }
    ]
  },
  {
    slug: 'pembuatan-kontrak',
    category: 'Kontrak Bisnis',
    title: 'Pembuatan Kontrak',
    shortDescription: 'Buat berbagai jenis kontrak bisnis, perjanjian kerja, dan dokumen hukum lainnya yang disesuaikan kebutuhan Anda.',
    longDescription: 'Kontrak yang kuat adalah benteng pertahanan bisnis Anda. Tim kami membantu Anda merancang draf kontrak yang jelas, adil, dan mengikat secara hukum, melindungi Anda dari potensi sengketa di masa depan. Kami melayani berbagai kebutuhan, mulai dari kontrak internal hingga perjanjian dengan pihak ketiga.',
    icon: React.createElement(Icon, { className: "w-8 h-8" }, React.createElement("path", { d: "M15.5 2H8.6c-.4 0-.8.2-1.1.5l-5 5c-.3.3-.5.7-.5 1.1v10.8c0 .8.7 1.5 1.5 1.5h12.9c.8 0 1.5-.7 1.5-1.5V3.5c0-.8-.7-1.5-1.5-1.5z" }), React.createElement("path", { d: "M12.5 2v4.5h4.5" }), React.createElement("path", { d: "m8.5 14 2 2 4-4" })),
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1200&auto=format&fit=crop',
    features: [],
    processSteps: [
        { title: "Analisis Kebutuhan", description: "Kami mendiskusikan tujuan dan ruang lingkup perjanjian yang ingin Anda buat untuk memahami semua aspek penting." },
        { title: "Penyusunan Draf Awal", description: "Tim hukum kami akan menyusun draf kontrak pertama yang mencakup semua klausul perlindungan yang relevan." },
        { title: "Review & Revisi", description: "Anda dapat meninjau draf tersebut dan kami akan melakukan revisi berdasarkan masukan Anda hingga mencapai kesepakatan final." },
        { title: "Finalisasi Dokumen", description: "Anda menerima dokumen kontrak final yang siap untuk ditandatangani oleh semua pihak terkait." }
    ],
    heroSubtitle: 'Lindungi bisnis Anda dari sengketa di masa depan dengan perjanjian yang jelas, adil, dan mengikat secara hukum, dirancang khusus untuk kebutuhan Anda.',
    benefitsTitle: 'Mengapa Kontrak Profesional Penting?',
    benefitsSubtitle: 'Perjanjian yang disusun dengan baik adalah investasi dalam keamanan dan kelancaran bisnis.',
    benefits: [
       {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "m15 12-4 4-2-2" }), React.createElement("path", { d: "M13.5 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5Z" }), React.createElement("path", { d: "M14 2v6h6" })),
        title: 'Kejelasan & Kepastian Hukum',
        description: 'Hindari ambiguitas. Kontrak yang baik memberikan kerangka kerja yang jelas bagi semua pihak yang terlibat.'
      },
      {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })),
        title: 'Minimalisir Risiko Sengketa',
        description: 'Klausul yang komprehensif melindungi hak dan kewajiban Anda, mengurangi potensi konflik dan kerugian finansial.'
      },
      {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), React.createElement("circle", { cx: "9", cy: "7", r: "4" }), React.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" })),
        title: 'Fondasi Kerjasama Profesional',
        description: 'Memulai hubungan bisnis dengan kontrak yang solid menunjukkan profesionalisme dan membangun kepercayaan sejak awal.'
      }
    ],
    serviceOptionsTitle: 'Jenis Kontrak yang Kami Tangani',
    serviceOptionsSubtitle: 'Kami menyediakan bantuan untuk berbagai jenis perjanjian sesuai kebutuhan spesifik bisnis Anda.',
    serviceOptions: [
      {
        slug: 'kontrak-internal',
        title: 'Kontrak Internal',
        description: 'Mengatur hubungan di dalam perusahaan Anda untuk memastikan kelancaran operasional dan kepatuhan.',
        bestFor: 'Manajemen SDM & Operasional',
        features: ["Kontrak Kerja Karyawan (PKWT/PKWTT)", "Perjanjian Kerahasiaan (NDA)", "Peraturan Perusahaan", "Surat Peringatan & PHK"],
        detailedContent: {
            longDescription: "Kontrak internal adalah dokumen hukum yang mengatur hubungan antara perusahaan dengan para pemangku kepentingan di dalamnya, terutama karyawan. Dokumen-dokumen ini penting untuk menciptakan lingkungan kerja yang terstruktur, adil, dan sesuai dengan peraturan ketenagakerjaan yang berlaku. Dengan kontrak internal yang jelas, Anda dapat meminimalisir risiko sengketa industrial dan memastikan semua pihak memahami hak serta kewajibannya masing-masing.",
            useCases: [
                { title: "Perekrutan Karyawan Baru", description: "Menyusun Perjanjian Kerja Waktu Tertentu (PKWT) atau Waktu Tidak Tertentu (PKWTT) yang sah." },
                { title: "Melindungi Informasi Rahasia", description: "Membuat Non-Disclosure Agreement (NDA) untuk karyawan yang memiliki akses ke data sensitif." },
                { title: "Menetapkan Standar Perusahaan", description: "Merancang Peraturan Perusahaan sebagai pedoman kerja bagi seluruh staf." },
            ],
            requirements: ["Data lengkap perusahaan", "Data lengkap karyawan", "Rincian posisi, jabatan, dan deskripsi pekerjaan", "Detail mengenai gaji, tunjangan, dan fasilitas lainnya"]
        }
      },
      {
        slug: 'kontrak-komersial',
        title: 'Kontrak Komersial',
        description: 'Mengamankan transaksi dan kerjasama Anda dengan pihak eksternal untuk mendorong pertumbuhan bisnis.',
        bestFor: 'Transaksi & Kemitraan',
        features: ["Perjanjian Kerjasama Bisnis", "Perjanjian Jual-Beli", "Kontrak Supplier/Distributor", "Perjanjian Utang-Piutang"],
        isPopular: true,
        detailedContent: {
            longDescription: "Kontrak komersial adalah pilar dari setiap transaksi dan kerjasama bisnis dengan pihak luar. Perjanjian ini mendefinisikan secara rinci ruang lingkup kerjasama, hak dan kewajiban, skema pembayaran, durasi, dan mekanisme penyelesaian sengketa. Memiliki kontrak komersial yang disusun secara profesional adalah langkah krusial untuk melindungi bisnis Anda dari wanprestasi, kesalahpahaman, dan potensi kerugian finansial dalam hubungan dengan klien, pemasok, atau mitra.",
            useCases: [
                { title: "Menjalin Kemitraan Strategis", description: "Membuat Perjanjian Kerjasama (MoU) untuk proyek bersama." },
                { title: "Transaksi Jual Beli", description: "Mengatur syarat dan ketentuan dalam penjualan produk atau jasa dalam jumlah besar." },
                { title: "Mengamankan Pasokan", description: "Menyusun kontrak dengan supplier untuk memastikan ketersediaan bahan baku." },
            ],
            requirements: ["Data lengkap para pihak yang terlibat", "Deskripsi detail objek perjanjian (barang/jasa)", "Nilai transaksi dan skema pembayaran", "Jangka waktu perjanjian"],
            images: [
              "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1579532582937-16c141df3087?q=80&w=1200&auto=format&fit=crop"
            ]
        }
      },
      {
        slug: 'kontrak-digital-lisensi',
        title: 'Kontrak Digital & Lisensi',
        description: 'Melindungi aset digital dan mengatur penggunaan produk atau layanan Anda di dunia online.',
        bestFor: 'Bisnis Digital & Kreatif',
        features: ["Syarat & Ketentuan (Terms of Service)", "Kebijakan Privasi", "Perjanjian Lisensi Software/Konten", "Perjanjian Influencer"],
        detailedContent: {
            longDescription: "Di era digital, perlindungan hukum tidak hanya berlaku di dunia fisik. Kontrak digital dan perjanjian lisensi sangat penting untuk mengatur bagaimana pengguna berinteraksi dengan platform online Anda, bagaimana data pribadi mereka dikelola, dan bagaimana aset digital Anda (seperti software atau konten) dapat digunakan oleh pihak lain. Dokumen ini adalah garda terdepan dalam melindungi bisnis digital Anda dari penyalahgunaan dan memastikan kepatuhan terhadap regulasi privasi data.",
            useCases: [
                { title: "Peluncuran Website/Aplikasi", description: "Menyusun Syarat & Ketentuan serta Kebijakan Privasi yang komprehensif." },
                { title: "Penjualan Software/Konten", description: "Membuat perjanjian lisensi yang mengatur hak dan batasan penggunaan." },
                { title: "Kampanye Pemasaran", description: "Mengikat kerjasama dengan influencer melalui kontrak yang jelas." },
            ],
            requirements: ["Deskripsi alur layanan pada platform digital Anda", "Jenis data pengguna yang dikumpulkan dan diproses", "Model bisnis (misal: langganan, sekali beli)", "Detail hak dan batasan yang diberikan dalam lisensi"]
        }
      },
      {
        slug: 'konsultasi-hukum-bisnis',
        title: 'Konsultasi Hukum Bisnis',
        description: 'Dapatkan nasihat hukum strategis dari para ahli untuk membantu pengambilan keputusan dan mitigasi risiko bisnis Anda.',
        bestFor: 'Pengambilan Keputusan Strategis',
        features: ["Sesi privat dengan konsultan", "Analisis risiko hukum", "Rekomendasi langkah strategis", "Cocok untuk negosiasi & sengketa"],
        isPopular: true,
        detailedContent: {
            longDescription: "Layanan Konsultasi Hukum Bisnis dirancang untuk memberikan Anda akses langsung ke keahlian para profesional hukum berpengalaman. Baik Anda sedang menghadapi negosiasi yang rumit, mempertimbangkan langkah ekspansi, atau menghadapi potensi sengketa, sesi konsultasi ini akan memberikan kejelasan dan panduan strategis. Kami akan membantu Anda memahami implikasi hukum dari setiap keputusan, mengidentifikasi potensi risiko, dan merumuskan langkah-langkah mitigasi yang efektif untuk melindungi kepentingan bisnis Anda.",
            useCases: [
                { title: "Negosiasi Kontrak Penting", description: "Mendapatkan saran hukum sebelum menandatangani perjanjian besar dengan klien atau investor." },
                { title: "Menghadapi Sengketa Bisnis", description: "Memahami posisi hukum Anda dan opsi penyelesaian sengketa yang tersedia." },
                { title: "Perencanaan Ekspansi Usaha", description: "Menganalisis aspek legalitas dalam membuka cabang baru atau meluncurkan produk baru." },
            ],
            requirements: ["Ringkasan singkat mengenai permasalahan", "Dokumen-dokumen relevan (jika ada)", "Daftar pertanyaan spesifik yang ingin dibahas", "Jadwal yang diinginkan untuk sesi konsultasi"]
        }
      }
    ]
  },
  {
    slug: 'legal-advisor-on-demand',
    category: 'Konsultasi Hukum',
    title: 'Legal Advisor On-Demand',
    shortDescription: 'Akses langsung ke jaringan pengacara dan konsultan hukum berpengalaman kapan pun Anda membutuhkannya.',
    longDescription: 'Dapatkan jawaban cepat dan saran ahli dari konsultan hukum berpengalaman kapan pun Anda membutuhkannya. Layanan ini dirancang untuk menjawab pertanyaan mendesak dan memberikan panduan strategis untuk pengambilan keputusan bisnis sehari-hari, langsung melalui sesi konsultasi privat.',
    icon: React.createElement(Icon, { className: "w-8 h-8" }, React.createElement("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }), React.createElement("circle", { cx: "9", cy: "7", r: "4" }), React.createElement("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }), React.createElement("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })),
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto=format&fit=crop',
    features: [],
    processSteps: [
        { title: "Pilih Jadwal", description: "Pilih slot waktu yang tersedia pada kalender konsultan kami melalui platform." },
        { title: "Sampaikan Pertanyaan", description: "Anda bisa menuliskan pokok pertanyaan Anda sebelum sesi agar konsultasi berjalan lebih efektif." },
        { title: "Sesi Konsultasi", description: "Terhubung langsung dengan konsultan hukum kami melalui media yang Anda pilih (video, telepon, atau chat)." },
        { title: "Rangkuman & Rekomendasi", description: "Setelah sesi, Anda akan mendapatkan rangkuman poin-poin penting dan rekomendasi langkah selanjutnya." }
    ],
    heroSubtitle: 'Dapatkan jawaban cepat dan nasihat ahli dari konsultan hukum berpengalaman kapan pun Anda membutuhkannya, langsung melalui sesi konsultasi privat.',
    benefitsTitle: 'Keuntungan Konsultasi Langsung',
    benefitsSubtitle: 'Akses keahlian hukum profesional tepat saat Anda paling membutuhkannya.',
     benefits: [
       {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })),
        title: 'Jawaban Cepat & Tepat',
        description: 'Tidak perlu menunggu berhari-hari. Dapatkan jawaban atas pertanyaan hukum mendesak Anda secara real-time dari para ahli.'
      },
      {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M12 16.5V9.5" }), React.createElement("circle", { cx: "12", cy: "7.5", r: ".5" }), React.createElement("circle", { cx: "12", cy: "12", r: "10" })),
        title: 'Pengambilan Keputusan Strategis',
        description: 'Dapatkan perspektif hukum sebelum mengambil langkah bisnis penting, dari negosiasi kontrak hingga rencana ekspansi.'
      },
      {
        icon: React.createElement(Icon, null, React.createElement("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" }), React.createElement("path", { d: "M12 12.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" }), React.createElement("path", { d: "M12.5 17h-1v-2h1v2z" })),
        title: 'Efisiensi Biaya',
        description: 'Akses keahlian hukum tingkat atas tanpa biaya retainer bulanan yang mahal. Bayar hanya saat Anda butuh.'
      }
    ],
    serviceOptionsTitle: 'Pilih Metode Konsultasi Anda',
    serviceOptionsSubtitle: 'Kami menyediakan berbagai cara untuk terhubung dengan konsultan hukum sesuai kenyamanan Anda.',
    serviceOptions: [
      {
        slug: 'live-chat-konsultasi',
        title: 'Live Chat Konsultasi',
        description: 'Dapatkan jawaban cepat untuk pertanyaan hukum spesifik Anda melalui chat langsung dengan konsultan hukum profesional.',
        bestFor: 'Pertanyaan Cepat & Klarifikasi',
        features: ["Respon real-time", "Sesi chat privat & rahasia", "Transkrip percakapan tersedia", "Ideal untuk pertanyaan mendesak"],
        isPopular: true,
        detailedContent: {
            longDescription: "Layanan Live Chat Konsultasi menghubungkan Anda secara langsung dengan konsultan hukum profesional untuk menjawab pertanyaan spesifik Anda secara real-time. Ini adalah solusi sempurna ketika Anda memerlukan klarifikasi cepat tentang suatu masalah hukum, ingin memahami implikasi dari suatu klausul, atau membutuhkan panduan untuk langkah selanjutnya tanpa perlu menunggu jadwal konsultasi video atau telepon. Sesi ini bersifat privat, rahasia, dan Anda akan mendapatkan transkrip percakapan untuk referensi di kemudian hari.",
            useCases: [
                { title: "Klarifikasi Klausul Kontrak", description: "Menanyakan arti atau implikasi dari pasal tertentu dalam dokumen yang Anda terima." },
                { title: "Pertanyaan Seputar Izin Usaha", description: "Memastikan apakah jenis usaha Anda memerlukan izin tambahan atau tidak." },
                { title: "Masalah Ketenagakerjaan", description: "Konsultasi singkat mengenai hak dan kewajiban karyawan atau perusahaan." },
            ],
            requirements: ["Koneksi internet yang stabil", "Pertanyaan yang spesifik dan jelas", "Dokumen relevan yang bisa di-upload (jika diperlukan)"]
        }
      },
       {
        slug: 'konsultasi-video',
        title: 'Konsultasi Video',
        description: 'Sesi privat tatap muka secara virtual untuk diskusi mendalam mengenai masalah hukum yang kompleks.',
        bestFor: 'Diskusi Kasus & Negosiasi',
        features: ["Interaksi langsung", "Cocok untuk masalah rumit", "Penjadwalan fleksibel", "Sesi 30 atau 60 menit"],
        detailedContent: {
            longDescription: "Konsultasi video menawarkan interaksi tatap muka dengan konsultan hukum kami dari kenyamanan rumah atau kantor Anda. Metode ini sangat ideal untuk membahas permasalahan yang memerlukan pemahaman mendalam, analisis dokumen secara bersamaan (screen sharing), dan membangun hubungan kepercayaan dengan konsultan. Ini adalah pilihan terbaik untuk mendapatkan nasihat hukum yang komprehensif dan personal.",
            useCases: [
                { title: "Diskusi Strategi Sengketa", description: "Membahas langkah-langkah yang akan diambil untuk menghadapi sengketa bisnis." },
                { title: "Review Kontrak Kompleks", description: "Menelaah pasal demi pasal dalam perjanjian penting secara langsung dengan ahli." },
                { title: "Perencanaan Struktur Perusahaan", description: "Mendiskusikan implikasi hukum dari restrukturisasi atau pendanaan." },
            ],
            requirements: ["Koneksi internet yang stabil", "Perangkat dengan kamera dan mikrofon (laptop/smartphone)", "Dokumen relevan yang sudah disiapkan (jika ada)", "Pokok-pokok pertanyaan yang ingin didiskusikan"]
        }
      },
      {
        slug: 'konsultasi-telepon',
        title: 'Konsultasi Telepon',
        description: 'Solusi praktis dan cepat untuk mendapatkan nasihat hukum tanpa perlu video call.',
        bestFor: 'Pertanyaan Mendesak',
        features: ["Cepat & efisien", "Tidak perlu koneksi internet kencang", "Privasi terjaga", "Diskusi to-the-point"],
        detailedContent: {
            longDescription: "Ketika Anda membutuhkan jawaban cepat atas pertanyaan hukum yang spesifik tanpa kerumitan teknis, konsultasi telepon adalah solusinya. Ini adalah cara yang efisien untuk mendapatkan kejelasan tentang suatu isu, memverifikasi pemahaman Anda tentang suatu regulasi, atau mendapatkan panduan singkat untuk langkah selanjutnya. Cukup jadwalkan waktu, dan konsultan kami akan menghubungi Anda.",
            useCases: [
                { title: "Klarifikasi Aturan Ketenagakerjaan", description: "Menanyakan tentang aturan lembur atau prosedur PHK." },
                { title: "Pertanyaan Cepat tentang Izin Usaha", description: "Memastikan apakah jenis usaha Anda memerlukan izin tambahan." },
                { title: "Validasi Klausul Sederhana", description: "Meminta pendapat tentang satu atau dua pasal dalam sebuah kontrak." },
            ],
            requirements: ["Nomor telepon yang aktif dan dapat dihubungi", "Jaringan seluler yang stabil", "Daftar pertanyaan yang ingin diajukan"]
        }
      },
      {
        slug: 'review-dokumen',
        title: 'Review Dokumen',
        description: 'Minta ahli kami untuk meninjau draf kontrak, surat, atau dokumen legal lainnya dan dapatkan feedback tertulis.',
        bestFor: 'Analisis Kontrak & Surat',
        features: ["Analisis klausa per klausa", "Identifikasi potensi risiko", "Saran revisi yang konkret", "Hasil review tertulis"],
        detailedContent: {
            longDescription: "Sebelum menandatangani dokumen hukum apapun, sangat penting untuk memahaminya secara menyeluruh. Layanan Review Dokumen kami memungkinkan Anda untuk mengunggah draf kontrak, surat somasi, atau dokumen legal lainnya untuk ditinjau oleh tim ahli kami. Kami akan memberikan analisis tertulis yang menyoroti potensi risiko, klausul yang merugikan, dan memberikan saran revisi untuk melindungi kepentingan Anda.",
            useCases: [
                { title: "Menerima Draf Kontrak dari Klien", description: "Memastikan tidak ada pasal tersembunyi yang merugikan Anda." },
                { title: "Menyusun Perjanjian Sewa", description: "Memastikan semua aspek penting seperti durasi, harga, dan kewajiban telah tercakup." },
                { title: "Mendapat Surat Peringatan/Somasi", description: "Memahami implikasi hukumnya dan bagaimana cara meresponsnya dengan benar." },
            ],
            requirements: ["File dokumen yang akan direview (format PDF/Word)", "Konteks atau latar belakang singkat mengenai dokumen tersebut", "Poin-poin spesifik yang menjadi perhatian Anda (opsional)"]
        }
      },
    ]
  }
];