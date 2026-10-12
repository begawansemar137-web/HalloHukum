

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, Outlet, useLocation, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HumiWidget from './components/HumiWidget';
import VideoConsultationModal from './components/VideoConsultationModal';
import CallbackModal from './components/CallbackModal';
import BottomCarousel from './components/BottomCarousel';
import ProtectedRoute from './components/ProtectedRoute';
import RunningText from './components/RunningText'; // Import the new component
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import Sidebar from './components/Sidebar'; // Import the new Sidebar component

// Page Components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ServiceOnboardingPage from './pages/ServiceOnboardingPage';
import GetStartedPage from './pages/GetStartedPage';
import ServiceOptionDetailPage from './pages/ServiceOptionDetailPage';
import BlogPostPage from './pages/BlogPostPage';
import LegalitasUsahaPage from './pages/LegalitasUsahaPage';
import KekayaanIntelektualPage from './pages/KekayaanIntelektualPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerificationPendingPage from './pages/VerificationPendingPage'; // Import new page
import EmailVerificationPage from './pages/EmailVerificationPage'; // Import new page
import ProfilePage from './pages/ProfilePage';
import MyServicesPage from './pages/MyServicesPage'; // Import the new page
import AdvisorChatPage from './pages/AdvisorChatPage'; // Import the new page

// SEO Data
import { servicesData } from './data/servicesData';
import { blogData } from './data/blogData';

// Helper function to update meta tags
const updateMetaTags = (
  title: string,
  description: string,
  imageUrl?: string,
) => {
  const defaultImage = "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1200&auto.format&fit=crop";
  const finalImageUrl = imageUrl || defaultImage;
  const fullTitle = `${title} – HalloHukum`;
  const canonicalUrl = window.location.href;

  document.title = fullTitle;

  const setMeta = (selector: string, attribute: string, content: string) => {
    let element = document.querySelector(selector) as HTMLMetaElement;
    if (element) {
      element.setAttribute(attribute, content);
    }
  };

  const setLink = (selector: string, attribute: string, content: string) => {
    let element = document.querySelector(selector) as HTMLLinkElement;
    if(element){
        element.setAttribute(attribute, content);
    }
  };

  // Standard Meta
  setMeta('meta[name="description"]', 'content', description);
  setLink('link[rel="canonical"]', 'href', canonicalUrl);

  // Open Graph
  setMeta('meta[property="og:title"]', 'content', fullTitle);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:image"]', 'content', finalImageUrl);

  // Twitter
  setMeta('meta[name="twitter:title"]', 'content', fullTitle);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', finalImageUrl);
  setMeta('meta[name="twitter:url"]', 'content', canonicalUrl);
};

const PageMetaUpdater: React.FC = () => {
    const location = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
      const { pathname } = location;
      const defaultSeo = {
        title: 'Solusi Legal Terpercaya untuk UMKM Indonesia',
        description: 'Akses mudah, cepat, dan terjangkau untuk semua kebutuhan legalitas bisnis Anda. Dari pendirian usaha hingga konsultasi hukum, HalloHukum siap mendampingi.',
        image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1200&auto.format&fit=crop"
      };

      const seoData: { [key: string]: { title: string; description: string; image?: string } } = {
          '/': defaultSeo,
          '/about-us': {
              title: 'Tentang HalloHukum | Misi Kami untuk UMKM Indonesia',
              description: 'Kenali tim, visi, dan misi HalloHukum. Kami adalah partner legal-tech yang berdedikasi untuk memberdayakan UMKM di seluruh Indonesia.',
              image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto.format&fit=crop'
          },
          '/layanan': {
              title: 'Layanan Hukum UMKM | Legalitas, Kontrak & Kekayaan Intelektual',
              description: 'Jelajahi layanan hukum terintegrasi dari HalloHukum, mencakup pendirian PT/CV, pembuatan kontrak, hingga pendaftaran merek dagang.',
              image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=1200&auto.format&fit=crop'
          },
          '/harga': {
              title: 'Harga & Paket Layanan Hukum | Biaya Transparan',
              description: 'Temukan paket layanan hukum dengan harga transparan dan terjangkau. Pilih solusi legal terbaik yang sesuai dengan anggaran bisnis UMKM Anda.',
              image: 'https://images.unsplash.com/photo-1554224155-16954405a255?q=80&w=1200&auto.format&fit=crop'
          },
          '/blog': {
              title: 'Blog Hukum Bisnis | Tips & Panduan Legal untuk UMKM',
              description: 'Dapatkan wawasan, tips, dan panduan hukum praktis terbaru yang relevan untuk membantu pertumbuhan dan keamanan bisnis UMKM Anda.',
              image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1200&auto.format&fit=crop'
          },
          '/faq': {
              title: 'FAQ | Pertanyaan Umum tentang Layanan HalloHukum',
              description: 'Temukan jawaban cepat untuk pertanyaan yang sering diajukan mengenai legalitas usaha, kontrak, harga, dan proses layanan kami.',
              image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto.format&fit=crop'
          },
          '/kontak': {
              title: 'Hubungi HalloHukum | Kontak & Alamat Kantor',
              description: 'Hubungi tim HalloHukum untuk konsultasi atau pertanyaan. Temukan alamat kantor kami di Jakarta, email, dan nomor telepon untuk bantuan lebih lanjut.',
              image: 'https://images.unsplash.com/photo-1587560699334-cc4ff6349094?q=80&w=1200&auto.format&fit=crop'
          },
          '/syarat-ketentuan': {
              title: 'Syarat & Ketentuan Penggunaan Layanan',
              description: 'Pahami syarat dan ketentuan yang berlaku saat menggunakan platform dan layanan hukum dari HalloHukum.',
              image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1200&auto.format&fit=crop'
          },
          '/kebijakan-privasi': {
              title: 'Kebijakan Privasi | Perlindungan Data Anda',
              description: 'Kami menghargai privasi Anda. Pelajari bagaimana HalloHukum mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.',
              image: 'https://images.unsplash.com/photo-1558021211-6d140f9de831?q=80&w=1200&auto.format&fit=crop'
          },
          '/mulai': {
              title: 'Mulai Layanan Hukum Anda',
              description: 'Siap melindungi bisnis Anda? Mulai proses layanan hukum Anda dengan HalloHukum. Pilih layanan yang Anda butuhkan dan ikuti langkah mudahnya.',
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto.format&fit=crop'
          },
          '/login': {
              title: 'Login ke Akun HalloHukum',
              description: 'Masuk ke akun HalloHukum Anda untuk mengakses layanan dan memantau progres permintaan Anda.',
              image: 'https://images.unsplash.com/photo-1529539795054-3c162a4d8298?q=80&w=1200&auto.format&fit=crop'
          },
          '/signup': {
              title: 'Buat Akun Baru HalloHukum',
              description: 'Daftar untuk akun HalloHukum gratis dan mulailah perjalanan legal bisnis Anda dengan mudah.',
              image: 'https://images.unsplash.com/photo-1529539795054-3c162a4d8298?q=80&w=1200&auto.format&fit=crop'
          },
          '/verify-email': {
              title: 'Verifikasi Alamat Email Anda',
              description: 'Satu langkah lagi! Periksa email Anda untuk tautan verifikasi untuk mengaktifkan akun HalloHukum Anda.',
              image: 'https://images.unsplash.com/photo-1582463879553-150a58d09855?q=80&w=1200&auto.format&fit=crop'
          },
          '/profile': {
              title: 'Profil Pengguna',
              description: 'Kelola informasi profil dan pengaturan akun HalloHukum Anda.',
              image: 'https://images.unsplash.com/photo-1579532582937-16c141df3087?q=80&w=1200&auto.format&fit=crop'
          },
           '/my-services': {
              title: 'Layanan Saya',
              description: 'Lacak progres semua permintaan layanan hukum aktif dan lihat riwayat layanan Anda.',
              image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto.format&fit=crop'
          },
           '/advisor-chat': {
              title: 'Live Chat dengan Konsultan Hukum',
              description: 'Dapatkan jawaban cepat dan saran ahli dari konsultan hukum berpengalaman melalui sesi chat privat.',
              image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1200&auto.format&fit=crop'
          },
      };
      
      let pageSeo: { title: string; description: string; image?: string; } = defaultSeo;

      if (seoData[pathname]) {
        pageSeo = seoData[pathname];
      } else {
          const serviceOptionDetailRegex = /^\/layanan\/(.+?)\/(.+)$/;
          const blogPostRegex = /^\/blog\/(.+)$/;
          const serviceDetailRegex = /^\/layanan\/(.+)$/;
          const serviceOnboardingRegex = /^\/mulai-layanan\/(.+)$/;
          const emailVerificationRegex = /^\/verify-email\/(.+)$/;

          const serviceOptionDetailMatch = pathname.match(serviceOptionDetailRegex);
          if (serviceOptionDetailMatch) {
              const [_, serviceSlug, optionSlug] = serviceOptionDetailMatch;
              const service = servicesData.find(s => s.slug === serviceSlug);
              const option = service?.serviceOptions.find(o => o.slug === optionSlug);
              if (option) {
                  pageSeo = { title: option.title, description: option.description, image: service?.image };
              }
          } else if (pathname.match(blogPostRegex)) {
              const slug = pathname.split('/')[2];
              const post = blogData.find(p => p.slug === slug);
              if (post) {
                  pageSeo = { title: post.title, description: post.excerpt, image: post.image };
              }
          } else if (pathname.match(serviceDetailRegex)) {
              const slug = pathname.split('/')[2];
              const service = servicesData.find(s => s.slug === slug);
              if (service) {
                  pageSeo = { title: service.title, description: service.shortDescription, image: service.image };
              }
          } else if (pathname.match(serviceOnboardingRegex)) {
              const slug = pathname.split('/')[2];
              const service = servicesData.find(s => s.slug === slug);
              if (service) {
                  pageSeo = { title: `Mulai Layanan: ${service.title}`, description: service.shortDescription, image: service.image };
              }
          } else if (pathname.match(emailVerificationRegex)) {
              pageSeo = { title: 'Memverifikasi Email Anda', description: 'Proses verifikasi email untuk akun HalloHukum Anda.' };
          }
      }

      updateMetaTags(pageSeo.title, pageSeo.description, pageSeo.image);
    }, [location]);

    return null;
};

const Layout: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);
  const [isHumiChatOpen, setIsHumiChatOpen] = useState(false);
  const [humiInitialPrompt, setHumiInitialPrompt] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  
  useEffect(() => {
    const scheduleCall = () => setIsVideoModalOpen(true);
    const requestCallback = () => setIsCallbackModalOpen(true);
    const openChat = () => setIsHumiChatOpen(true);
    const handleOpenChatWithPrompt = (event: CustomEvent) => {
      setHumiInitialPrompt(event.detail.prompt);
      setIsHumiChatOpen(true);
    };
    
    window.addEventListener('scheduleVideoCall', scheduleCall);
    window.addEventListener('requestCallback', requestCallback);
    window.addEventListener('openHumiChat', openChat);
    window.addEventListener('openHumiChatWithPrompt', handleOpenChatWithPrompt as EventListener);

    return () => {
      window.removeEventListener('scheduleVideoCall', scheduleCall);
      window.removeEventListener('requestCallback', requestCallback);
      window.removeEventListener('openHumiChat', openChat);
      window.removeEventListener('openHumiChatWithPrompt', handleOpenChatWithPrompt as EventListener);
    };
  }, []);
  
  const handleChatClose = () => {
    setIsHumiChatOpen(false);
    setHumiInitialPrompt(''); // Clear the prompt when chat closes
  };

  return (
    <div className="bg-brand-light font-sans text-brand-dark min-h-screen flex flex-col">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-grow">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <BottomCarousel />
      <RunningText />
      <Footer />
      <ErrorBoundary>
        <HumiWidget 
          isOpen={isHumiChatOpen}
          onOpen={() => setIsHumiChatOpen(true)}
          onClose={handleChatClose}
          onScheduleVideoCall={() => setIsVideoModalOpen(true)}
          initialPrompt={humiInitialPrompt}
        />
      </ErrorBoundary>
      <VideoConsultationModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      <CallbackModal isOpen={isCallbackModalOpen} onClose={() => setIsCallbackModalOpen(false)} />
    </div>
  );
};

// Wrapper components to pass URL params as props
const ServiceDetailPageWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ServiceDetailPage slug={slug!} />;
};

const ServiceOptionDetailPageWrapper: React.FC = () => {
  const { serviceSlug, optionSlug } = useParams<{ serviceSlug: string; optionSlug: string }>();
  return <ServiceOptionDetailPage serviceSlug={serviceSlug!} optionSlug={optionSlug!} />;
};

const BlogPostPageWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <BlogPostPage slug={slug!} />;
};

const ServiceOnboardingPageWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ServiceOnboardingPage slug={slug!} />;
};

const EmailVerificationPageWrapper: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  return <EmailVerificationPage token={token!} />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <PageMetaUpdater />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/layanan" element={<ServicesPage />} />
          <Route path="/layanan/legalitas-usaha" element={<LegalitasUsahaPage />} />
          <Route path="/layanan/kekayaan-intelektual" element={<KekayaanIntelektualPage />} />
          <Route path="/layanan/:slug" element={<ServiceDetailPageWrapper />} />
          <Route path="/layanan/:serviceSlug/:optionSlug" element={<ServiceOptionDetailPageWrapper />} />
          <Route path="/harga" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPageWrapper />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/syarat-ketentuan" element={<TermsPage />} />
          <Route path="/kebijakan-privasi" element={<PrivacyPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerificationPendingPage />} />
          <Route path="/verify-email/:token" element={<EmailVerificationPageWrapper />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/mulai" element={<GetStartedPage />} />
            <Route path="/mulai-layanan/:slug" element={<ServiceOnboardingPageWrapper />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-services" element={<MyServicesPage />} />
            <Route path="/advisor-chat" element={<AdvisorChatPage />} />
          </Route>

          <Route path="*" element={<HomePage />} /> {/* Fallback route */}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
