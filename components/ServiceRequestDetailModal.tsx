

import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { ServiceRequest, Task, TaskPriority } from '../types';

interface ServiceRequestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
}

const statusStyles: { [key in ServiceRequest['status']]: { bg: string; text: string; } } = {
  'In Progress': { bg: 'bg-sky-100', text: 'text-sky-800' },
  Completed: { bg: 'bg-green-100', text: 'text-green-800' },
  Pending: { bg: 'bg-amber-100', text: 'text-amber-800' },
};

const priorityStyles: { [key in TaskPriority]: string } = {
    Tinggi: 'bg-red-100 text-red-800',
    Sedang: 'bg-amber-100 text-amber-800',
    Rendah: 'bg-slate-100 text-slate-800',
};

const ServiceRequestDetailModal: React.FC<ServiceRequestDetailModalProps> = ({ isOpen, onClose, request }) => {
  const [sortOrder, setSortOrder] = useState<'default' | 'priority' | 'dueDate'>('default');
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!request) {
      setSortedTasks([]);
      return;
    }

    let tasksToSort = [...request.tasks];

    if (sortOrder === 'priority') {
      const priorityMap: Record<TaskPriority, number> = { 'Tinggi': 1, 'Sedang': 2, 'Rendah': 3 };
      tasksToSort.sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]);
    } else if (sortOrder === 'dueDate') {
      tasksToSort.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    }
    
    setSortedTasks(tasksToSort);
  }, [sortOrder, request]);
  
  useEffect(() => {
    if (!isOpen) {
      // Reset sort order when modal closes, so it's fresh next time it opens
      setTimeout(() => setSortOrder('default'), 300); // Delay to match closing animation
    }
  }, [isOpen]);

  const handleSort = (type: 'priority' | 'dueDate') => {
    setSortOrder(prev => (prev === type ? 'default' : type));
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !request) return null;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-2xl m-4 rounded-2xl shadow-xl transform transition-all duration-300 animate-scaleUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10 flex justify-between items-start">
            <div>
              <h2 id="modal-title" className="text-2xl font-bold text-brand-dark">{request.serviceName}</h2>
              <p className="text-sm text-slate-500 mt-1">ID Permintaan: {request.id}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-brand-dark transition-colors" aria-label="Tutup modal">
              <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
            </button>
        </header>
        
        <div className="p-6 overflow-y-auto">
            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-lg">
                    <dt className="text-sm font-medium text-slate-500">Tanggal Permintaan</dt>
                    <dd className="text-sm font-semibold text-brand-dark mt-1">{formatDate(request.requestDate)}</dd>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                    <dt className="text-sm font-medium text-slate-500">Status</dt>
                    <dd className="mt-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[request.status].bg} ${statusStyles[request.status].text}`}>
                          {request.status}
                        </span>
                    </dd>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                    <dt className="text-sm font-medium text-slate-500">Tanggal Selesai</dt>
                    <dd className="text-sm font-semibold text-brand-dark mt-1">{request.completionDate ? formatDate(request.completionDate) : 'N/A'}</dd>
                </div>
            </div>

            {/* Problem Summary */}
            <div className="mb-6">
                <h3 className="text-lg font-bold text-brand-dark mb-2">Ringkasan Permintaan</h3>
                <p className="text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
                    {request.problemSummary}
                </p>
            </div>

            {/* Task List */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-brand-dark">Daftar Tugas</h3>
                    <div className="flex items-center gap-2 text-sm" role="group" aria-label="Opsi pengurutan tugas">
                        <span className="text-slate-500">Urutkan:</span>
                        <button 
                            onClick={() => handleSort('priority')}
                            className={`px-3 py-1 rounded-lg font-semibold transition-colors text-xs sm:text-sm ${sortOrder === 'priority' ? 'bg-brand-secondary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            aria-pressed={sortOrder === 'priority'}
                        >
                            Prioritas
                        </button>
                        <button 
                            onClick={() => handleSort('dueDate')}
                            className={`px-3 py-1 rounded-lg font-semibold transition-colors text-xs sm:text-sm ${sortOrder === 'dueDate' ? 'bg-brand-secondary text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                             aria-pressed={sortOrder === 'dueDate'}
                        >
                            Tenggat
                        </button>
                    </div>
                </div>
                <div className="space-y-3">
                    {sortedTasks.map(task => (
                      <div key={task.id} className={`p-3 border rounded-lg transition-colors ${
                          task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'
                      }`}>
                        <div className="flex items-center">
                            {task.completed ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-4 flex-shrink-0 text-green-500">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <Icon className="w-6 h-6 mr-4 flex-shrink-0 text-slate-300">
                                <circle cx="12" cy="12" r="10" />
                              </Icon>
                            )}
                            <div className="flex-grow">
                                <p className={`font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-brand-dark'}`}>
                                    {task.title}
                                </p>
                            </div>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
                                Prioritas {task.priority}
                            </span>
                        </div>
                        {task.dueDate && !task.completed && (
                            <div className="pl-10 mt-1 flex items-center text-sm text-slate-500">
                                <Icon className="w-4 h-4 mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>
                                <span>Tenggat: {formatDate(task.dueDate)}</span>
                            </div>
                        )}
                      </div>
                    ))}
                </div>
            </div>
        </div>
        <footer className="p-6 border-t border-slate-200 mt-auto bg-white rounded-b-2xl z-10 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-brand-dark text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Tutup
            </button>
        </footer>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleUp { animation: scaleUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ServiceRequestDetailModal;