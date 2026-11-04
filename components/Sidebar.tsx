
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Home only matches itself; other sections also match their sub-pages.
  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`));

  const itemClass = (active: boolean) =>
    `relative flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
      active ? 'bg-white/10 text-white' : 'text-[#c8cbe8] hover:bg-white/5 hover:text-white'
    }`;
  // A bar on the left edge of the active item that grows in when it becomes active.
  const marker = (active: boolean) => (
    <span
      aria-hidden="true"
      className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#b9b0ff] origin-center transition-transform duration-300 ease-out motion-reduce:transition-none ${active ? 'scale-y-100' : 'scale-y-0'}`}
    />
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLogout = () => {
    onClose();
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Beranda', path: '/', icon: <Icon className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon> },
    { name: 'Layanan', path: '/layanan', icon: <Icon className="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></Icon> },
    { name: 'Harga', path: '/harga', icon: <Icon className="w-5 h-5"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></Icon> },
    { name: 'Blog', path: '/blog', icon: <Icon className="w-5 h-5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></Icon> },
    { name: 'FAQ', path: '/faq', icon: <Icon className="w-5 h-5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></Icon> },
    { name: 'Partner', path: '/partner', icon: <Icon className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon> },
    { name: 'Kontak', path: '/kontak', icon: <Icon className="w-5 h-5"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" /><polyline points="22 6 12 13 2 6" /></Icon> },
  ];

  const userNavItems = [
    { name: 'Profil Saya', path: '/profile', icon: <Icon className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon> },
    { name: 'Layanan Saya', path: '/my-services', icon: <Icon className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon> },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <aside
        id="sidebar-menu"
        className={`fixed top-0 left-0 h-full w-72 bg-hh-navy text-white z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
             <Link to="/" onClick={onClose} className="flex items-center space-x-2">
                <div className="bg-white p-2 rounded-lg">
                    <Icon className="text-hh-navy h-6 w-6">
                        <path d="M12 22V2M2 12H22M17 2H7L2 12L7 22H17L22 12L17 2Z" />
                        <path d="M2.5 12C2.5 17.5228 7.47715 22.5 13 22.5" />
                        <path d="M21.5 12C21.5 6.47715 16.5228 1.5 11 1.5" />
                    </Icon>
                </div>
                <span className="text-xl font-bold text-white">HalloHukum</span>
            </Link>
            <button onClick={onClose} aria-label="Tutup sidebar" className="p-2 text-[#c8cbe8] hover:text-white">
              <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-grow p-4 overflow-y-auto">
            {isAuthenticated && user && (
              <div className="mb-6 p-3 bg-white/5 rounded-lg">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <p className="text-xs text-[#c8cbe8] truncate">{user.email}</p>
              </div>
            )}

            <ul className="space-y-2">
              {navItems.map(item => (
                <li key={item.path}>
                  <Link to={item.path} onClick={onClose} aria-current={isActive(item.path) ? 'page' : undefined} className={itemClass(isActive(item.path))}>
                    {marker(isActive(item.path))}
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {isAuthenticated && (
              <>
                <div className="my-4 h-px bg-white/10"></div>
                <ul className="space-y-2">
                  {userNavItems.map(item => (
                    <li key={item.path}>
                      <Link to={item.path} onClick={onClose} aria-current={isActive(item.path) ? 'page' : undefined} className={itemClass(isActive(item.path))}>
                        {marker(isActive(item.path))}
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10 mt-auto">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 p-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 font-semibold transition-colors">
                <Icon className="w-5 h-5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></Icon>
                <span>Logout</span>
              </button>
            ) : (
              <Link to="/login" onClick={onClose} className="w-full flex items-center justify-center gap-3 p-3 rounded-full bg-white text-hh-indigo hover:bg-hh-indigo-soft font-medium transition-colors">
                <Icon className="w-5 h-5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></Icon>
                <span>Login / Daftar</span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
