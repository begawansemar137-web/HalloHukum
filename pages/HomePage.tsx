import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import FAQSection from '../components/FAQSection';

const openHumiChat = () => {
  window.dispatchEvent(new CustomEvent('openHumiChat'));
};

const askHumi = (prompt: string) => {
  window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', { detail: { prompt } }));
};

const scheduleVideoCall = () => {
  window.dispatchEvent(new CustomEvent('scheduleVideoCall'));
};

const Check: React.FC = () => (
  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-600" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"></polyline>
  </Icon>
);

const Cross: React.FC = () => (
  <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-700" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </Icon>
);

const textLink = 'font-semibold text-brand-dark underline decoration-brand-accent decoration-2 underline-offset-4 hover:decoration-brand-dark';

// Hero answer: the parts appear one after another the first time the card is on screen.
// With prefers-reduced-motion the motion-safe classes don't apply, so everything is simply visible.
const AnswerCard: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPlay(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const part = (i: number) => ({
    className: `transition duration-500 ease-out ${play ? 'opacity-100 translate-y-0' : 'motion-safe:opacity-0 motion-safe:translate-y-2'}`,
    style: { transitionDelay: `${300 + i * 450}ms` },
  });

  return (
    <figure ref={ref} aria-label="Contoh jawaban HUMI" className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden">
      <div className="flex gap-3 p-5 bg-slate-50 border-b border-slate-200">
        <span aria-hidden="true" className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-300 text-slate-700 text-sm font-semibold flex items-center justify-center">R</span>
        <p className="text-slate-700">Saya jualan katering rumahan, omzet sekitar Rp15 juta per bulan. Apakah saya wajib punya NIB?</p>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-dark text-brand-accent text-sm font-bold flex items-center justify-center">H</span>
          <strong className="text-brand-dark">HUMI</strong>
          <span className="ml-auto text-xs text-slate-500 border border-slate-200 rounded-full px-2.5 py-0.5">Contoh jawaban</span>
        </div>
        <div {...part(0)}>
          <h3 className="text-sm font-semibold text-brand-dark">Ringkasan</h3>
          <p className="mt-1 text-slate-600 text-[15px] leading-relaxed">Ya, sebaiknya Anda mendaftarkan NIB melalui OSS. Untuk usaha mikro berisiko rendah, NIB berfungsi sebagai identitas sekaligus izin berusaha, dan pendaftarannya tidak dipungut biaya.</p>
        </div>
        <div {...part(1)}>
          <h3 className="text-sm font-semibold text-brand-dark">Yang belum kami ketahui</h3>
          <p className="mt-1 text-slate-600 text-[15px] leading-relaxed">Apakah produk dijual dalam kemasan berlabel. Jika ya, ada kewajiban tambahan seperti sertifikasi halal atau izin edar pangan.</p>
        </div>
        <div {...part(2)}>
          <h3 className="text-sm font-semibold text-brand-dark">Dasar hukum</h3>
          <p className="mt-1 text-slate-600 text-[15px] leading-relaxed">
            <span className="font-serif font-semibold text-brand-dark">PP No. 5 Tahun 2021</span> tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko{' '}
            <span className="inline-block align-middle text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">Berlaku</span>
          </p>
        </div>
        <div {...part(3)}>
          <p className="text-sm text-slate-500 border-t border-slate-100 pt-3">
            Jawaban ini informasi umum, bukan pendapat hukum.{' '}
            <Link to="/layanan/legal-advisor-on-demand" className={textLink}>Minta advokat memeriksa</Link>
          </p>
        </div>
      </div>
    </figure>
  );
};

const topics = [
  'Apakah usaha saya wajib punya NIB?',
  'Lebih baik PT, CV, atau PT Perorangan?',
  'Apa yang harus dicek di kontrak reseller?',
  'Bagaimana cara mendaftarkan merek?',
  'Pembeli online tidak membayar, apa langkah saya?',
  'Bagaimana menagih piutang yang macet?',
];

const steps = [
  { title: 'Tanya', text: 'Ceritakan situasi Anda ke HUMI dan dapatkan penjelasan beserta dasar hukumnya.' },
  { title: 'Pilih layanan', text: 'Tentukan yang Anda butuhkan: pendirian usaha, merek, kontrak, atau konsultasi.' },
  { title: 'Lengkapi data', text: 'Isi formulir dan unggah dokumen. Tim kami memeriksa kelengkapannya.' },
  { title: 'Pantau', text: 'Lihat perkembangan setiap permintaan di halaman Layanan Saya.' },
  { title: 'Selesai', text: 'Terima dokumen resmi, atau lanjutkan ke advokat bila kasusnya perlu pendampingan.' },
];

const faqs = [
  {
    question: 'Apakah jawaban HUMI bisa dijadikan pegangan hukum?',
    answer: 'Jawaban HUMI adalah informasi hukum umum yang menyebutkan sumber peraturan dan statusnya, bukan pendapat hukum resmi. Untuk keputusan penting atau kasus berisiko tinggi, kami sarankan meminta advokat memeriksa.',
  },
  {
    question: 'Bagaimana jika HUMI tidak menemukan dasar hukumnya?',
    answer: 'HUMI akan mengatakannya terus terang dan tidak akan mengarang nomor pasal atau judul peraturan. Anda bisa melanjutkan pertanyaan ke konsultan atau advokat.',
  },
  {
    question: 'Bagaimana proses pendirian PT melalui HalloHukum?',
    answer: 'Isi formulir online dan unggah dokumen yang diperlukan. Tim kami menangani akta notaris, pengesahan Kemenkumham, hingga NIB, dan setiap tahap bisa Anda pantau di halaman Layanan Saya.',
  },
  {
    question: 'Apakah dokumen saya aman?',
    answer: 'Dokumen hanya bisa diakses oleh Anda dan pihak yang Anda izinkan. Kami mengelola data dengan mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.',
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-brand-dark leading-[1.12] tracking-tight max-w-[18ch]">
                Urusan hukum usaha Anda, dijawab dengan dasar yang bisa diperiksa.
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                HalloHukum membantu pelaku UMKM mengurus legalitas usaha, merek, dan kontrak. Mulai dari satu pertanyaan ke HUMI, lalu lanjutkan ke layanan atau advokat bila perlu.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openHumiChat}
                  className="inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-colors"
                >
                  <Icon className="w-5 h-5" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                  Tanya HUMI gratis
                </button>
                <Link
                  to="/layanan"
                  className="inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 text-brand-dark ring-1 ring-inset ring-slate-300 hover:bg-white transition-colors"
                >
                  Lihat layanan
                </Link>
              </div>
              <p className="mt-5 text-sm text-slate-500 max-w-md">
                Jawaban AI bukan pendapat hukum resmi. Kasus berisiko tinggi kami teruskan ke advokat.
              </p>
            </div>
            <div className="lg:col-span-6">
              <AnswerCard />
            </div>
          </div>
        </div>
      </section>

      {/* Common questions: each one opens HUMI with the question filled in */}
      <section aria-labelledby="topics-title" className="bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 id="topics-title" className="text-base font-semibold text-brand-dark">Pertanyaan yang sering diajukan pelaku usaha</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <li key={topic}>
                <button
                  onClick={() => askHumi(topic)}
                  className="text-left text-sm text-slate-700 bg-brand-light border border-slate-200 rounded-full px-4 py-2 hover:border-brand-dark hover:text-brand-dark transition-colors"
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">Satu tempat untuk seluruh urusan hukum usaha</h2>
            <p className="mt-4 text-lg text-slate-600">Pakai yang Anda butuhkan saja. Semua permintaan tersimpan di satu akun, jadi Anda tidak perlu mengulang cerita dari awal.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-6 gap-5">
            {/* Contracts, with a marked clause as the example */}
            <article className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-brand-dark">Kontrak yang melindungi usaha Anda</h3>
                <p className="mt-3 text-slate-600">Buat perjanjian kerja sama, kontrak reseller, NDA, atau minta tim kami meninjau kontrak dari mitra sebelum Anda tanda tangan.</p>
                <Link to="/layanan/pembuatan-kontrak" className={`mt-5 inline-block ${textLink}`}>Layanan kontrak</Link>
              </div>
              <div aria-label="Contoh klausul yang ditandai" className="bg-[#FBFAF6] border border-slate-200 rounded-lg p-5 font-serif">
                <p className="font-sans text-xs text-slate-500">Perjanjian Distribusi, Pasal 7 ayat (2)</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-800">
                  Distributor wajib membayar seluruh tagihan dalam waktu 7 (tujuh) hari kalender sejak barang dikirim,{' '}
                  <mark className="bg-brand-accent/60 text-slate-900 px-0.5">dan Prinsipal berhak mengakhiri perjanjian ini secara sepihak tanpa pemberitahuan terlebih dahulu</mark>{' '}
                  apabila terjadi keterlambatan pembayaran.
                </p>
                <div className="mt-4 font-sans border-l-2 border-brand-accent pl-3">
                  <p className="text-sm font-semibold text-brand-dark">Perlu dicermati</p>
                  <p className="text-sm text-slate-600">Hak pemutusan sepihak hanya dimiliki satu pihak. Minta masa tenggang dan pemberitahuan tertulis.</p>
                </div>
              </div>
            </article>

            <article className="lg:col-span-2 bg-brand-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col">
              <h3 className="text-xl font-bold">Tanya HUMI kapan saja</h3>
              <p className="mt-3 text-slate-300">Asisten hukum berbahasa Indonesia. Setiap jawaban menyebutkan asumsi, sumber peraturan, dan statusnya. Bila sumbernya tidak cukup, HUMI akan mengatakannya.</p>
              <button onClick={openHumiChat} className="mt-auto pt-6 self-start font-semibold text-brand-accent hover:text-amber-300 transition-colors">
                Mulai bertanya
              </button>
            </article>

            <article className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-brand-dark">Legalitas usaha</h3>
              <p className="mt-3 text-slate-600">Pendirian PT, PT Perorangan, CV, persekutuan perdata, dan yayasan, sampai NIB terbit.</p>
              <Link to="/layanan/legalitas-usaha" className={`mt-5 inline-block ${textLink}`}>Dirikan usaha</Link>
            </article>

            <article className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-brand-dark">Merek dan hak cipta</h3>
              <p className="mt-3 text-slate-600">Daftarkan merek dagang dan hak cipta agar nama, logo, dan karya usaha Anda tidak dipakai pihak lain.</p>
              <Link to="/layanan/kekayaan-intelektual" className={`mt-5 inline-block ${textLink}`}>Lindungi merek</Link>
            </article>

            <article className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-brand-dark">Konsultasi dengan ahli hukum</h3>
              <p className="mt-3 text-slate-600">Bicara langsung lewat chat, telepon, atau video, atau minta dokumen Anda ditinjau.</p>
              <Link to="/layanan/legal-advisor-on-demand" className={`mt-5 inline-block ${textLink}`}>Pilih cara konsultasi</Link>
            </article>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-brand-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Dari pertanyaan pertama sampai dokumen di tangan</h2>
            <p className="mt-4 text-lg text-slate-300">Anda bisa berhenti di tahap mana pun. Banyak pertanyaan sudah terjawab di tahap pertama.</p>
          </div>
          <ol className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="flex md:block gap-4 md:border-t md:border-slate-700 md:pt-5">
                <span className="flex-shrink-0 text-2xl font-bold text-brand-accent tabular-nums" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="md:mt-3 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-slate-300">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">AI membantu. Untuk keputusan penting, manusia yang memverifikasi.</h2>
            <p className="mt-4 text-lg text-slate-600">Hukum terlalu penting untuk ditebak. Ini batas yang kami pegang, dan Anda berhak tahu sejak awal.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-semibold text-brand-dark">Yang selalu kami lakukan</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3"><Check />Menyebut sumber peraturan dan statusnya</li>
                <li className="flex gap-3"><Check />Mengatakan terus terang bila sumber tidak cukup</li>
                <li className="flex gap-3"><Check />Meneruskan kasus berisiko tinggi ke advokat</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark">Yang tidak akan dilakukan HUMI</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3"><Cross />Mengarang nomor pasal, judul peraturan, atau kutipan</li>
                <li className="flex gap-3"><Cross />Menjanjikan kemenangan perkara</li>
                <li className="flex gap-3"><Cross />Mengirim dokumen Anda ke pihak lain tanpa izin</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-brand-dark">Data Anda</h3>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex gap-3"><Check />Dikelola dengan mengacu pada UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi</li>
                <li className="flex gap-3"><Check />Dokumen hanya bisa dibuka oleh Anda dan pihak yang Anda izinkan</li>
              </ul>
              <Link to="/kebijakan-privasi" className={`mt-4 inline-block text-sm ${textLink}`}>Baca kebijakan privasi</Link>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      {/* Closing CTA */}
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-dark rounded-2xl px-6 py-10 sm:px-12 sm:py-14 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <h2 className="text-3xl font-bold text-white tracking-tight">Mulai dari pertanyaan yang sedang Anda pikirkan.</h2>
              <p className="mt-3 text-slate-300">Bertanya ke HUMI gratis. Untuk layanan berbayar, harga terlihat sebelum Anda memesan.</p>
            </div>
            <div className="lg:col-span-2 flex flex-col sm:flex-row lg:justify-end gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-colors"
              >
                Buat akun gratis
              </Link>
              <button
                onClick={scheduleVideoCall}
                className="inline-flex items-center justify-center rounded-lg text-base font-semibold py-3 px-6 text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 transition-colors"
              >
                Jadwalkan konsultasi video
              </button>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Lihat paket dan biaya di halaman <Link to="/harga" className="font-semibold text-brand-dark underline underline-offset-2">Harga</Link>.
          </p>
        </div>
      </section>
    </>
  );
};

export default HomePage;
