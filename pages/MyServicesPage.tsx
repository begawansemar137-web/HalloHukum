
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { supabase } from '../lib/supabase';
import { ServiceRequest, Task } from '../types';
import ServiceRequestDetailModal from '../components/ServiceRequestDetailModal';

// --- New Notification Toast Component ---
const NotificationToast: React.FC<{ message: string; visible: boolean; onClose: () => void }> = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;
  
  return (
    <div className="fixed top-5 right-5 z-50 animate-fadeInDown">
      <div className="max-w-sm bg-white border border-slate-200 rounded-lg shadow-lg p-4 flex items-start">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-brand-secondary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></Icon>
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-brand-dark">Pembaruan Status!</p>
          <p className="mt-1 text-sm text-slate-600">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button onClick={onClose} className="inline-flex text-slate-400 hover:text-slate-500">
            <span className="sr-only">Close</span>
            <Icon className="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>
          </button>
        </div>
      </div>
    </div>
  );
};


const statusStyles: { [key in ServiceRequest['status']]: { bg: string; text: string; } } = {
  'In Progress': { bg: 'bg-sky-100', text: 'text-sky-800' },
  Completed: { bg: 'bg-green-100', text: 'text-green-800' },
  Pending: { bg: 'bg-amber-100', text: 'text-amber-800' },
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
};

const ServiceRequestCard: React.FC<{ request: ServiceRequest; onClick: () => void; }> = ({ request, onClick }) => {
  const completedTasks = request.tasks.filter(t => t.completed).length;
  const totalTasks = request.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAskHumi = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    const prompt = `Bagaimana status layanan saya untuk "${request.serviceName}"?`;
    window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', {
        detail: { prompt }
    }));
  };
  
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col h-full cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
      role="button"
      tabIndex={0}
      aria-label={`Lihat detail untuk layanan ${request.serviceName}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-grow pr-4">
            <h3 className="text-xl font-bold text-brand-dark">{request.serviceName}</h3>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2" title={request.problemSummary}>
              {request.problemSummary}
            </p>
        </div>
        <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[request.status].bg} ${statusStyles[request.status].text}`}>
          {request.status}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-slate-600">Progres</span>
          <span className="text-sm font-semibold text-brand-dark">{completedTasks} dari {totalTasks} tugas</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Progres layanan: ${completedTasks} dari ${totalTasks} tugas selesai`}>
          <div
            className="bg-brand-secondary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <ul className="mt-4 space-y-3 flex-grow">
        {request.tasks.slice(0, 2).map(task => ( // Show only first 2 tasks for brevity
          <li key={task.id} className="flex items-start">
            {task.completed ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-green-500">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            ) : (
              <Icon className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-slate-300">
                <circle cx="12" cy="12" r="10" />
              </Icon>
            )}
            <div className="flex-grow">
                <span className={`text-sm ${task.completed ? 'text-slate-500 line-through' : 'text-slate-700'}`}>
                  {task.title}
                </span>
                {task.dueDate && !task.completed && (
                  <div className="flex items-center text-xs text-slate-500 mt-1">
                    <Icon className="w-3 h-3 mr-1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>
                    <span>Tenggat: {formatDate(task.dueDate)}</span>
                  </div>
                )}
            </div>
          </li>
        ))}
        {request.tasks.length > 2 && <li className="text-sm text-slate-400 pl-8">...dan lainnya</li>}
      </ul>

      {request.status !== 'Completed' && (
        <div className="border-t border-slate-200 mt-4 pt-4">
            <button 
                onClick={handleAskHumi}
                className="w-full flex items-center justify-center gap-2 bg-brand-secondary/10 text-brand-secondary font-semibold py-2 px-4 rounded-lg hover:bg-brand-secondary/20 transition-colors text-sm"
            >
                <Icon className="w-4 h-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></Icon>
                Tanya HUMI tentang layanan ini
            </button>
        </div>
      )}
    </div>
  );
};


const MyServicesPage: React.FC = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data, error } = await supabase
        .from('service_requests')
        .select('id, service_name, status, problem_summary, requested_at, completed_at, service_tasks(id, title, completed, priority, due_date)')
        .order('requested_at', { ascending: false });
      if (cancelled) return;
      if (error) {
        console.error('Failed to load service requests:', error);
        return;
      }
      setServiceRequests(
        (data ?? []).map((r: any) => ({
          id: r.id,
          serviceName: r.service_name,
          status: r.status,
          problemSummary: r.problem_summary,
          requestDate: r.requested_at,
          completionDate: r.completed_at ?? undefined,
          tasks: (r.service_tasks ?? []).map((t: any) => ({
            id: t.id,
            title: t.title,
            completed: t.completed,
            priority: t.priority,
            dueDate: t.due_date ?? undefined,
          })),
        })),
      );
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
  };

  const handleCardClick = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the request to allow for the closing animation
    setTimeout(() => setSelectedRequest(null), 300);
  };

  const activeRequests = serviceRequests.filter(req => req.status === 'In Progress' || req.status === 'Pending');
  const completedRequests = serviceRequests.filter(req => req.status === 'Completed');

  return (
    <>
      <NotificationToast 
        message={notification.message}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
      <div className="min-h-screen bg-slate-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Layanan Saya</h1>
            <p className="mt-2 text-slate-500">Lacak progres semua permintaan layanan hukum Anda di sini.</p>
          </div>

          {/* Active Requests */}
          <section>
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Layanan Aktif</h2>
            {activeRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {activeRequests.map(req => (
                  <ServiceRequestCard key={req.id} request={req} onClick={() => handleCardClick(req)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-500">Anda tidak memiliki layanan yang sedang aktif.</p>
                 <Link to="/mulai" className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold py-2.5 px-6 bg-brand-accent text-brand-dark hover:bg-amber-300 transition-all">
                  Mulai Layanan Baru
                </Link>
              </div>
            )}
          </section>

          {/* Completed Requests */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Riwayat Layanan</h2>
            {completedRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {completedRequests.map(req => (
                  <ServiceRequestCard key={req.id} request={req} onClick={() => handleCardClick(req)} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-500">Belum ada layanan yang selesai.</p>
              </div>
            )}
          </section>
        </div>
      </div>
      <ServiceRequestDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
      />
      <style>{`
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.5s ease-out forwards; }
      `}</style>
    </>
  );
};

export default MyServicesPage;