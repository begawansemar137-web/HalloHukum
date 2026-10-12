import { supabase } from '../lib/supabase';
import React, { useState } from 'react';
import Icon from '../components/Icon';
import Map from '../components/Map';

// FIX: Defined props interface and used React.FC to correctly handle the 'children' prop type.
interface ContactInfoItemProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-brand-secondary/10 text-brand-secondary">
            {icon}
        </div>
        <div className="ml-4">
            <h3 className="text-lg font-semibold text-brand-dark">{title}</h3>
            <p className="text-slate-600">{children}</p>
        </div>
    </div>
);


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  // Coordinates for Jalan Jenderal Sudirman Kav. 52-53, Jakarta
  const officeLocation = { lat: -6.2253, lng: 106.8096 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('submitting');
    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });
    if (error) {
      console.error('Failed to send contact message:', error);
      setStatus('idle');
      return;
    }
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark tracking-tight">
            Hubungi Kami
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600">
            Punya pertanyaan atau butuh bantuan lebih lanjut? Tim kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui formulir di bawah ini atau detail kontak yang tersedia.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">Kirim Pesan kepada Kami</h2>
                    
                    {status === 'success' && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
                            <strong className="font-bold">Pesan Terkirim! </strong>
                            <span className="block sm:inline">Terima kasih telah menghubungi kami. Kami akan segera merespons.</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Alamat Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Pesan Anda</label>
                            <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className="mt-1 block w-full bg-slate-50 border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full flex items-center justify-center bg-brand-dark text-white font-semibold py-3 rounded-lg transition-colors hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed" disabled={status === 'submitting'}>
                                {status === 'submitting' ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mengirim...
                                    </>
                                ) : 'Kirim Pesan'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contact Details & Map */}
                <div className="space-y-8">
                    <ContactInfoItem icon={<Icon><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></Icon>} title="Alamat Kantor">
                        Jalan Jenderal Sudirman Kav. 52-53,<br/>
                        Jakarta Selatan, DKI Jakarta, Indonesia 12190
                    </ContactInfoItem>
                     <ContactInfoItem icon={<Icon><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6Z"></path><polyline points="22,6 12,13 2,6"></polyline></Icon>} title="Alamat Email">
                        <a href="mailto:support@hallohukum.com" className="text-brand-secondary hover:underline">support@hallohukum.com</a>
                    </ContactInfoItem>
                     <ContactInfoItem icon={<Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></Icon>} title="Nomor Telepon">
                        <a href="tel:+62215151234" className="text-brand-secondary hover:underline">(021) 515-1234</a>
                    </ContactInfoItem>
                    <div className="mt-8">
                       <Map lat={officeLocation.lat} lng={officeLocation.lng} />
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;