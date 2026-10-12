import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-3">
            <Link to="/" className="flex items-center space-x-2" aria-label="HalloHukum Homepage">
                <div className="bg-white p-2 rounded-lg">
                    <Icon className="text-brand-dark">
                        <path d="M12 22V2M2 12H22M17 2H7L2 12L7 22H17L22 12L17 2Z" />
                        <path d="M2.5 12C2.5 17.5228 7.47715 22.5 13 22.5" />
                        <path d="M21.5 12C21.5 6.47715 16.5228 1.5 11 1.5" />
                    </Icon>
                </div>
                <span className="text-2xl font-bold text-white">HalloHukum</span>
            </Link>
            <p className="mt-4 text-slate-400 text-sm">Memberdayakan UMKM Indonesia dengan solusi hukum yang mudah dan terpercaya.</p>
          </div>
          
          {/* Links Wrapper */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-white">Layanan</h3>
                <ul className="mt-4 space-y-2 text-slate-400">
                  <li><Link to="/layanan/legalitas-usaha" className="hover:text-white">Legalitas Usaha</Link></li>
                  <li><Link to="/layanan/legal-advisor-on-demand" className="hover:text-white">Bantuan Hukum</Link></li>
                  <li><Link to="/layanan/pembuatan-kontrak" className="hover:text-white">Kontrak Bisnis</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white">Perusahaan</h3>
                <ul className="mt-4 space-y-2 text-slate-400">
                  <li><Link to="/about-us" className="hover:text-white">About Us</Link></li>
                  <li><Link to="#" className="hover:text-white">Karir</Link></li>
                  <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                  <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link to="/kontak" className="hover:text-white">Hubungi Kami</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white">Legal</h3>
                <ul className="mt-4 space-y-2 text-slate-400">
                  <li><Link to="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
                  <li><Link to="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
             <h3 className="font-semibold text-white">Langganan Newsletter</h3>
             <p className="mt-4 text-slate-400">Dapatkan info & edukasi hukum terbaru langsung ke email Anda.</p>
             <form className="mt-4 flex w-full">
                <label htmlFor="newsletter-email" className="sr-only">Alamat email untuk newsletter</label>
                <input type="email" id="newsletter-email" placeholder="Email Anda" className="min-w-0 flex-grow rounded-l-md px-3 py-2 text-sm text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-secondary" />
                <button type="submit" aria-label="Berlangganan newsletter" className="flex-shrink-0 bg-brand-secondary rounded-r-md px-3 text-white hover:bg-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 focus:ring-offset-brand-dark">
                  <Icon className="w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></Icon>
                </button>
             </form>
           </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} HalloHukum. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
               <a href="#" aria-label="Ikuti kami di Facebook" className="hover:text-white"><Icon><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></Icon></a>
               <a href="#" aria-label="Ikuti kami di Twitter" className="hover:text-white"><Icon><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></Icon></a>
               <a href="#" aria-label="Ikuti kami di Instagram" className="hover:text-white"><Icon><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></Icon></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;