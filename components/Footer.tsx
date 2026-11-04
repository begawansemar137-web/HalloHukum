import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const linkGroups = [
  {
    title: 'Layanan',
    links: [
      { name: 'Legalitas Usaha', to: '/layanan/legalitas-usaha' },
      { name: 'Bantuan Hukum', to: '/layanan/legal-advisor-on-demand' },
      { name: 'Kontrak Bisnis', to: '/layanan/pembuatan-kontrak' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { name: 'About Us', to: '/about-us' },
      { name: 'Karir', to: '#' },
      { name: 'Blog', to: '/blog' },
      { name: 'FAQ', to: '/faq' },
      { name: 'Partner', to: '/partner' },
      { name: 'Hubungi Kami', to: '/kontak' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Syarat & Ketentuan', to: '/syarat-ketentuan' },
      { name: 'Kebijakan Privasi', to: '/kebijakan-privasi' },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-hh-ink text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Brand Info */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2.5" aria-label="HalloHukum Homepage">
              <div className="bg-white p-1.5 rounded-md">
                <Icon className="w-5 h-5 text-hh-ink">
                  <path d="M12 22V2M2 12H22M17 2H7L2 12L7 22H17L22 12L17 2Z" />
                  <path d="M2.5 12C2.5 17.5228 7.47715 22.5 13 22.5" />
                  <path d="M21.5 12C21.5 6.47715 16.5228 1.5 11 1.5" />
                </Icon>
              </div>
              <span className="text-lg font-semibold tracking-[-0.01em]">HalloHukum</span>
            </Link>
            <p className="mt-5 max-w-xs font-serif text-[15px] leading-relaxed text-white/70">
              Memberdayakan UMKM Indonesia dengan solusi hukum yang mudah dan terpercaya.
            </p>
          </div>

          {/* Links */}
          <nav className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-5" aria-label="Tautan footer">
            {linkGroups.map(group => (
              <div key={group.title}>
                <h3 className="text-[13px] font-medium text-white">{group.title}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                  {group.links.map(link => (
                    <li key={link.name}>
                      <Link to={link.to} className="transition-colors hover:text-white">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-[13px] font-medium text-white">Newsletter</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">Info dan edukasi hukum terbaru, langsung ke email Anda.</p>
            <form className="mt-4 flex max-w-sm items-center rounded-full bg-white/5 p-1 ring-1 ring-inset ring-white/15 focus-within:ring-white/40">
              <label htmlFor="newsletter-email" className="sr-only">Alamat email untuk newsletter</label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Email Anda"
                className="min-w-0 flex-grow bg-transparent px-3 py-1.5 text-sm text-white placeholder-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-full bg-hh-indigo px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#4434d4] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} HalloHukum. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Ikuti kami di Facebook" className="transition-colors hover:text-white"><Icon className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></Icon></a>
            <a href="#" aria-label="Ikuti kami di Twitter" className="transition-colors hover:text-white"><Icon className="w-4 h-4"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></Icon></a>
            <a href="#" aria-label="Ikuti kami di Instagram" className="transition-colors hover:text-white"><Icon className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></Icon></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
