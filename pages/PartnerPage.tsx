import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface LawFirmPartner {
  slug: string;
  name: string;
  city: string;
  founded_year: number | null;
  lawyer_count: number | null;
  practice_areas: string[];
  description: string;
  website: string | null;
  is_sample: boolean;
}

const emptyForm = {
  firm_name: '',
  contact_name: '',
  email: '',
  phone: '',
  city: '',
  lawyer_count: '',
  practice_areas: '',
  website: '',
  message: '',
};

const benefits = [
  {
    title: 'Klien UMKM yang sudah siap',
    body: 'Kami meneruskan perkara yang sudah dipilah HUMI dan tim kami, lengkap dengan ringkasan kebutuhan dan dokumen awal.',
  },
  {
    title: 'Profil di halaman partner',
    body: 'Firma Anda tampil dengan bidang keahlian, kota, dan deskripsi, sehingga calon klien tahu siapa yang akan menangani mereka.',
  },
  {
    title: 'Alur kerja yang tertata',
    body: 'Penugasan, komunikasi dengan klien, dan status pekerjaan tercatat di satu tempat, tanpa tumpukan pesan di banyak aplikasi.',
  },
];

const joinSteps = [
  { title: 'Kirim formulir', body: 'Isi data firma dan bidang keahlian Anda di formulir ini.' },
  { title: 'Verifikasi', body: 'Tim kami menghubungi Anda dalam 5 hari kerja untuk memeriksa izin praktik dan menjadwalkan perkenalan.' },
  { title: 'Profil tayang', body: 'Setelah perjanjian kemitraan ditandatangani, profil firma Anda muncul di halaman ini.' },
];

const initials = (name: string) =>
  name
    .replace(/&/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');

const PartnerCard: React.FC<{ partner: LawFirmPartner }> = ({ partner }) => (
  <article className="flex flex-col rounded-xl border border-hh-line bg-white p-6 sm:p-8 shadow-hh-1">
    <div className="flex items-start gap-4">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-hh-navy font-serif text-xl text-white" aria-hidden="true">
        {initials(partner.name)}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-serif text-xl text-hh-ink">{partner.name}</h3>
          {partner.is_sample && (
            <span className="rounded-full bg-hh-cream px-2.5 py-0.5 text-xs font-medium text-hh-ink-2" title="Profil contoh, bukan firma sungguhan">
              Contoh
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-hh-mute">{partner.city}</p>
      </div>
    </div>

    <dl className="mt-6 grid grid-cols-2 divide-x divide-hh-line border-y border-hh-line py-4 text-center">
      <div>
        <dt className="text-xs text-hh-mute">Berdiri</dt>
        <dd className="hh-tnum mt-1 text-lg font-semibold text-hh-ink">{partner.founded_year ?? '–'}</dd>
      </div>
      <div>
        <dt className="text-xs text-hh-mute">Advokat</dt>
        <dd className="hh-tnum mt-1 text-lg font-semibold text-hh-ink">{partner.lawyer_count ?? '–'}</dd>
      </div>
    </dl>

    <p className="mt-6 flex-1 leading-relaxed text-hh-ink-2">{partner.description}</p>

    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Bidang keahlian">
      {partner.practice_areas.map(area => (
        <li key={area} className="rounded-full bg-hh-indigo-soft px-3 py-1 text-xs font-medium text-hh-indigo-press">
          {area}
        </li>
      ))}
    </ul>

    {partner.website && !partner.is_sample && (
      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="mt-6 text-sm font-medium text-hh-indigo hover:text-hh-indigo-press">
        Kunjungi situs firma
      </a>
    )}
  </article>
);

const inputClass =
  'mt-1 block w-full rounded-lg border border-hh-line bg-white px-4 py-2.5 text-sm text-hh-ink focus:border-hh-indigo focus:outline-none focus:ring-2 focus:ring-hh-indigo/30';

const PartnerPage: React.FC = () => {
  const [partners, setPartners] = useState<LawFirmPartner[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('law_firm_partners')
      .select('slug,name,city,founded_year,lawyer_count,practice_areas,description,website,is_sample')
      .eq('published', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('Failed to load partners:', error);
          setLoadState('error');
          return;
        }
        setPartners(data ?? []);
        setLoadState('ready');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const lawyerCount = parseInt(formData.lawyer_count, 10);
    const { error } = await supabase.from('partner_applications').insert({
      firm_name: formData.firm_name.trim(),
      contact_name: formData.contact_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      lawyer_count: Number.isNaN(lawyerCount) ? null : lawyerCount,
      practice_areas: formData.practice_areas.trim(),
      website: formData.website.trim() || null,
      message: formData.message.trim() || null,
    });
    if (error) {
      console.error('Failed to send partner application:', error);
      setStatus('error');
      return;
    }
    setStatus('success');
    setFormData(emptyForm);
  };

  const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const hasSamples = partners.some(p => p.is_sample);

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-hh-ink">
              Partner Hallo Hukum
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-hh-ink-2">
              Firma hukum yang menangani perkara klien HalloHukum, dari pendirian usaha dan perlindungan merek sampai sengketa di pengadilan. Setiap partner kami verifikasi izin praktik dan rekam jejaknya.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToId('gabung')}
                className="rounded-full bg-hh-indigo px-6 py-3 text-sm font-semibold text-white shadow-hh-1 transition-colors hover:bg-hh-indigo-press focus:outline-none focus-visible:ring-2 focus-visible:ring-hh-indigo focus-visible:ring-offset-2"
              >
                Gabung dengan HalloHukum
              </button>
              <button
                type="button"
                onClick={() => scrollToId('daftar-partner')}
                className="rounded-full border border-hh-line bg-white px-6 py-3 text-sm font-semibold text-hh-ink transition-colors hover:border-hh-indigo hover:text-hh-indigo"
              >
                Lihat partner
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="daftar-partner" className="scroll-mt-24 bg-hh-soft py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-hh-ink">Firma partner</h2>
            {hasSamples && (
              <p className="max-w-md text-sm text-hh-mute">
                Profil bertanda Contoh adalah ilustrasi. Profil ini akan diganti dengan firma partner yang sudah bergabung.
              </p>
            )}
          </div>

          {loadState === 'loading' && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Memuat daftar partner">
              {[0, 1, 2].map(i => (
                <div key={i} className="h-96 animate-pulse rounded-xl border border-hh-line bg-white" />
              ))}
            </div>
          )}

          {loadState === 'error' && (
            <div className="mt-10 rounded-xl border border-hh-line bg-white p-8 text-hh-ink-2" role="alert">
              Daftar partner tidak dapat dimuat. Periksa koneksi internet Anda, lalu muat ulang halaman ini.
            </div>
          )}

          {loadState === 'ready' && partners.length === 0 && (
            <div className="mt-10 rounded-xl border border-hh-line bg-white p-8 text-hh-ink-2">
              Belum ada firma partner yang tampil.{' '}
              <button type="button" onClick={() => scrollToId('gabung')} className="font-medium text-hh-indigo hover:text-hh-indigo-press">
                Jadilah partner pertama
              </button>
              .
            </div>
          )}

          {loadState === 'ready' && partners.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {partners.map(partner => (
                <PartnerCard key={partner.slug} partner={partner} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-2xl text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-hh-ink">
            Yang didapat firma partner
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-hh-line">
            {benefits.map(benefit => (
              <div key={benefit.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <h3 className="text-lg font-semibold text-hh-ink">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-hh-ink-2">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gabung" className="scroll-mt-24 bg-hh-navy py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-white">Gabung dengan HalloHukum</h2>
            <p className="mt-4 leading-relaxed text-white/75">
              Terbuka untuk firma hukum dan kantor advokat di seluruh Indonesia yang advokatnya memiliki izin praktik dari organisasi advokat yang diakui.
            </p>
            <ol className="mt-10 space-y-6">
              {joinSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="hh-tnum flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/30 text-sm text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl bg-white p-6 sm:p-8 shadow-hh-3 lg:col-span-3">
            {status === 'success' ? (
              <div role="status">
                <h3 className="font-serif text-2xl text-hh-ink">Pendaftaran terkirim</h3>
                <p className="mt-3 leading-relaxed text-hh-ink-2">
                  Terima kasih. Tim kemitraan kami akan menghubungi Anda melalui email atau telepon dalam 5 hari kerja.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-medium text-hh-indigo hover:text-hh-indigo-press"
                >
                  Daftarkan firma lain
                </button>
              </div>
            ) : (
              <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
                <div className="sm:col-span-2">
                  <label htmlFor="firm_name" className="block text-sm font-medium text-hh-ink">Nama firma hukum</label>
                  <input id="firm_name" name="firm_name" type="text" required maxLength={150} value={formData.firm_name} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="contact_name" className="block text-sm font-medium text-hh-ink">Nama penanggung jawab</label>
                  <input id="contact_name" name="contact_name" type="text" required maxLength={120} autoComplete="name" value={formData.contact_name} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-hh-ink">Email</label>
                  <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" value={formData.email} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-hh-ink">Nomor telepon</label>
                  <input id="phone" name="phone" type="tel" required minLength={6} maxLength={30} autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-hh-ink">Kota</label>
                  <input id="city" name="city" type="text" required maxLength={80} value={formData.city} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="lawyer_count" className="block text-sm font-medium text-hh-ink">Jumlah advokat <span className="font-normal text-hh-mute">(opsional)</span></label>
                  <input id="lawyer_count" name="lawyer_count" type="number" min={1} max={5000} value={formData.lawyer_count} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-hh-ink">Situs web <span className="font-normal text-hh-mute">(opsional)</span></label>
                  <input id="website" name="website" type="url" maxLength={300} placeholder="https://" value={formData.website} onChange={handleChange} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="practice_areas" className="block text-sm font-medium text-hh-ink">Bidang keahlian</label>
                  <input id="practice_areas" name="practice_areas" type="text" required minLength={2} maxLength={500} placeholder="Korporasi, merek, ketenagakerjaan" value={formData.practice_areas} onChange={handleChange} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-hh-ink">Pesan <span className="font-normal text-hh-mute">(opsional)</span></label>
                  <textarea id="message" name="message" rows={4} maxLength={3000} value={formData.message} onChange={handleChange} className={inputClass} />
                </div>

                {status === 'error' && (
                  <p className="sm:col-span-2 rounded-lg bg-hh-ruby/10 px-4 py-3 text-sm text-hh-ruby" role="alert">
                    Pendaftaran belum terkirim. Periksa kembali isian Anda dan koneksi internet, lalu kirim ulang.
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full rounded-full bg-hh-indigo px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-hh-indigo-press disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === 'submitting' ? 'Mengirim pendaftaran...' : 'Kirim pendaftaran'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnerPage;
