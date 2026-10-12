import type { RelatedContentItem } from '../types';

export const relatedContentData: { [key: string]: RelatedContentItem[] } = {
  'legalitas-usaha': [
    {
      type: 'blog',
      title: 'PT vs CV: Mana yang Lebih Cocok untuk Bisnis Anda?',
      description: 'Kenali perbedaan, keuntungan, dan kerugian antara PT dan CV untuk membuat keputusan yang tepat.',
      link: '/blog/pt-vs-cv-mana-yang-cocok'
    },
    {
      type: 'faq',
      title: 'Bagaimana proses pendirian PT melalui HalloHukum?',
      description: 'Prosesnya mudah. Anda hanya perlu mengisi formulir online, mengunggah dokumen, dan tim kami akan menangani sisanya.'
    },
    {
      type: 'blog',
      title: 'Panduan Lengkap Mengurus NIB (Nomor Induk Berusaha)',
      description: 'NIB adalah "KTP" bagi bisnis Anda. Ikuti panduan langkah demi langkah untuk mengurusnya.',
      link: '/blog/panduan-lengkap-mengurus-nib'
    }
  ],
  'kekayaan-intelektual': [
    {
      type: 'blog',
      title: 'Pentingnya Mendaftarkan Merek Dagang untuk Bisnis Anda',
      description: 'Pahami mengapa mendaftarkan merek dagang sejak dini adalah langkah krusial untuk melindungi identitas bisnis Anda.',
      link: '/blog/pentingnya-mendaftarkan-merek-dagang'
    },
    {
      type: 'faq',
      title: 'Apa perbedaan mendasar antara Merek Dagang dan Hak Cipta?',
      description: 'Merek Dagang melindungi identitas komersial (nama/logo), sementara Hak Cipta melindungi karya orisinal (tulisan/desain).'
    }
  ],
  'pembuatan-kontrak': [
    {
      type: 'blog',
      title: '5 Kesalahan Umum UMKM dalam Membuat Kontrak Kerja',
      description: 'Hindari potensi sengketa dengan mengenali kesalahan-kesalahan umum yang sering terjadi saat menyusun kontrak.',
      link: '/blog/5-kesalahan-umum-umkm-dalam-kontrak-kerja'
    },
    {
      type: 'faq',
      title: 'Bisakah saya meminta review untuk draf kontrak dari pihak lain?',
      description: 'Tentu saja. Salah satu fitur layanan kami adalah me-review dan memberikan masukan terhadap draf kontrak yang Anda terima.'
    }
  ],
  'legal-advisor-on-demand': [
    {
      type: 'faq',
      title: 'Kapan sebaiknya saya menggunakan layanan Legal Advisor On-Demand?',
      description: 'Gunakan layanan ini saat Anda membutuhkan jawaban hukum yang cepat, nasihat strategis, atau pemahaman mendalam tentang dokumen legal.',
    },
    {
      type: 'faq',
      title: 'Apakah konsultasi dengan HUMI AI cukup?',
      description: 'HUMI AI sangat baik untuk informasi awal. Untuk nasihat yang spesifik dan mengikat secara hukum, konsultasi dengan advisor manusia sangat direkomendasikan.'
    }
  ]
};