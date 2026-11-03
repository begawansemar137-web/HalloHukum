

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useAuth } from '../contexts/AuthContext';
import { servicesData } from '../data/servicesData';

// FIX: Define a type for navigation items to make the 'isOverview' property optional,
// resolving TypeScript errors when mapping over the 'serviceNavItems' array.
interface ServiceNavItem {
  name: string;
  path: string;
  isOverview?: boolean;
}

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [showVerificationBanner, setShowVerificationBanner] = useState(true);
  const [isResending, setIsResending] = useState(false);
  const [isLogoAnimating, setIsLogoAnimating] = useState(true);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  const serviceNavItems: ServiceNavItem[] = [
    { name: 'Ringkasan Layanan', path: '/layanan', isOverview: true },
    ...servicesData.map(service => ({
      name: service.title,
      path: `/layanan/${service.slug}`,
    }))
  ];

  const navItems = [
    { name: 'About Us', path: '/about-us' },
    { name: 'Harga', path: '/harga' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Hubungi Kami', path: '/kontak' },
  ];

  const primaryNavItem = { name: 'Mulai Sekarang', path: '/mulai' };

  const handleRequestCallback = () => {
    window.dispatchEvent(new CustomEvent('requestCallback'));
  };
  
  const handleScheduleVideoCall = () => {
    window.dispatchEvent(new CustomEvent('scheduleVideoCall'));
  };
  
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail();
    } catch (error) {
      console.error("Failed to resend verification email:", error);
    } finally {
      setTimeout(() => setIsResending(false), 2000);
    }
  };

  useEffect(() => {
    // Animate logo on initial load
    const logoAnimationTimer = setTimeout(() => {
      setIsLogoAnimating(false);
    }, 1000); // Duration of the spin animation

    // Handle clicks outside of dropdown menus
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setIsServicesMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup function
    return () => {
      clearTimeout(logoAnimationTimer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-40 w-full">
       {isAuthenticated && user && !user.isEmailVerified && showVerificationBanner && (
        <div className="bg-amber-100 border-b-2 border-amber-300 text-amber-800 px-4 py-2">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <p>
              <span className="font-bold">Verifikasi Diperlukan:</span> Akun Anda belum diverifikasi. Silakan periksa email Anda.
            </p>
            <div className="flex items-center gap-4">
               <button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="font-semibold hover:underline disabled:opacity-50 disabled:cursor-wait"
                >
                  {isResending ? 'Mengirim...' : 'Kirim Ulang'}
                </button>
              <button onClick={() => setShowVerificationBanner(false)} aria-label="Tutup notifikasi verifikasi">
                 <Icon className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-b border-hh-line">
        <div className="flex items-center justify-between gap-6 h-16 lg:h-[72px]">
          <Link to="/" className="flex items-center space-x-2" aria-label="HalloHukum Homepage">
             <div className="bg-hh-navy p-2 rounded-lg">
                <Icon className={`text-brand-accent ${isLogoAnimating ? 'animate-spin-once' : ''}`}>
                    <path d="M12 22V2M2 12H22M17 2H7L2 12L7 22H17L22 12L17 2Z" />
                    <path d="M2.5 12C2.5 17.5228 7.47715 22.5 13 22.5" />
                    <path d="M21.5 12C21.5 6.47715 16.5228 1.5 11 1.5" />
                </Icon>
             </div>
            <span className="text-xl sm:text-2xl font-bold tracking-[-0.01em] text-hh-ink">HalloHukum</span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center" aria-label="Navigasi utama">
              <ul className="flex items-center gap-4 xl:gap-7 whitespace-nowrap text-sm xl:text-[15px]">
                {/* Services Dropdown */}
                <li className="relative" ref={servicesMenuRef}>
                  <button 
                    onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                    className="flex items-center gap-1 text-hh-ink-2 hover:text-hh-indigo font-medium transition-colors"
                    aria-haspopup="true"
                    aria-expanded={isServicesMenuOpen}
                  >
                    Layanan
                    <Icon className={`w-4 h-4 text-hh-mute transition-transform ${isServicesMenuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></Icon>
                  </button>
                  {isServicesMenuOpen && (
                    <div className="absolute left-0 mt-2 w-64 origin-top-left bg-white rounded-xl shadow-hh-2 ring-1 ring-hh-line focus:outline-none animate-scaleUp">
                      <div className="py-2">
                        {serviceNavItems.map(item => (
                          <React.Fragment key={item.name}>
                            <Link 
                              to={item.path} 
                              className={`block px-4 py-2 text-sm ${item.isOverview ? 'font-semibold text-hh-ink' : 'text-hh-ink-2'} hover:bg-hh-soft hover:text-hh-indigo`}
                              onClick={() => setIsServicesMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                            {item.isOverview && <div className="h-px bg-hh-line my-1 mx-2" />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      to={item.path} 
                      className="text-hh-ink-2 hover:text-hh-indigo font-medium transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                 {isAuthenticated && (
                    <li>
                        <Link to={primaryNavItem.path} className="font-medium text-hh-indigo hover:text-hh-indigo-press transition-colors">
                            {primaryNavItem.name}
                        </Link>
                    </li>
                 )}
              </ul>
            </nav>

            <div className="hidden lg:block h-6 w-px bg-hh-line"></div>
            
            <div className="flex items-center gap-2">
              {isAuthenticated && user ? (
                 <div className="relative" ref={userMenuRef}>
                    <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center gap-2 p-1.5 rounded-full hover:bg-hh-soft transition-colors">
                       <div className="h-9 w-9 rounded-full bg-hh-indigo text-white flex items-center justify-center font-bold overflow-hidden">
                          {user.profilePicture ? (
                            <img src={user.profilePicture} alt="Foto profil pengguna" className="h-full w-full object-cover" />
                          ) : (
                            <span>{user.name.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                       <span className="font-semibold text-sm text-hh-ink hidden lg:inline">{user.name}</span>
                       <Icon className={`w-4 h-4 text-hh-mute transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></Icon>
                    </button>
                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-hh-2 ring-1 ring-hh-line focus:outline-none animate-scaleUp">
                            <div className="py-1">
                                <div className="px-4 py-3 border-b border-hh-line">
                                    <p className="text-sm font-semibold text-hh-ink truncate">Masuk sebagai</p>
                                    <p className="text-sm text-hh-mute truncate">{user.email}</p>
                                </div>
                                <Link to="/profile" className="block px-4 py-2 text-sm text-hh-ink-2 hover:bg-hh-soft hover:text-hh-indigo" onClick={() => setIsUserMenuOpen(false)}>Profil Saya</Link>
                                <Link to="/my-services" className="block px-4 py-2 text-sm text-hh-ink-2 hover:bg-hh-soft hover:text-hh-indigo" onClick={() => setIsUserMenuOpen(false)}>Layanan Saya</Link>
                                <a href="#" className="block px-4 py-2 text-sm text-hh-ink-2 hover:bg-hh-soft hover:text-hh-indigo" onClick={e => {e.preventDefault(); handleLogout();}}>Logout</a>
                            </div>
                        </div>
                    )}
                 </div>
              ) : (
                <>
                  <button onClick={handleRequestCallback} className="hidden xl:block whitespace-nowrap rounded-full text-sm font-medium py-2 px-4 text-hh-ink-2 hover:text-hh-indigo transition-colors">
                    Minta Dihubungi
                  </button>
                  <button onClick={handleScheduleVideoCall} className="whitespace-nowrap rounded-full text-sm font-medium py-2 px-4 bg-hh-indigo text-white hover:bg-[#4434d4] active:bg-hh-indigo-press transition-colors">
                    Jadwalkan Konsultasi
                  </button>
                  <Link to="/login" className="whitespace-nowrap rounded-full text-sm font-medium py-2 px-4 text-hh-indigo ring-1 ring-inset ring-hh-indigo/40 hover:ring-hh-indigo transition">
                    Login/Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <button
            className="lg:hidden z-50"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar-menu"
          >
             <Icon className="text-hh-ink w-7 h-7">
                {isSidebarOpen ? (
                   <>
                     <line x1="18" y1="6" x2="6" y2="18"></line>
                     <line x1="6" y1="6" x2="18" y2="18"></line>
                   </>
                ) : (
                   <>
                     <line x1="3" y1="12" x2="21" y2="12"></line>
                     <line x1="3" y1="6" x2="21" y2="6"></line>
                     <line x1="3" y1="18" x2="21" y2="18"></line>
                   </>
                )}
             </Icon>
          </button>
        </div>
      </div>
      
       <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scaleUp { animation: scaleUp 0.1s ease-out forwards; }
        
        @keyframes spin-once {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-once {
            animation: spin-once 1s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;
