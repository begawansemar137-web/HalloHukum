import React, { useEffect } from 'react';
import Icon from './Icon';
import type { ServiceOption } from '../types';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: ServiceOption | null;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ isOpen, onClose, option }) => {

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !option) return null;

  const { detailedContent } = option;

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
        <header className="p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10">
            <h2 id="modal-title" className="text-2xl font-bold text-brand-dark">{option.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{option.description}</p>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-brand-dark transition-colors" aria-label="Close modal">
              <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
            </button>
        </header>
        
        <div className="p-6 overflow-y-auto">
            <p className="text-slate-600 mb-8">{detailedContent.longDescription}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Use Cases */}
                <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-4">Ideal Untuk Kebutuhan:</h3>
                    <div className="space-y-4">
                        {detailedContent.useCases.map((useCase, index) => (
                            <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-start">
                                <Icon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1"><polyline points="20 6 9 17 4 12"></polyline></Icon>
                                <div>
                                    <h4 className="font-semibold text-brand-dark">{useCase.title}</h4>
                                    <p className="text-sm text-slate-500">{useCase.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Requirements */}
                <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-4">Persyaratan Diperlukan:</h3>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <ul className="space-y-3">
                            {detailedContent.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                    <Icon className="w-5 h-5 text-brand-secondary mr-3 flex-shrink-0 mt-1">
                                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                    </Icon>
                                    <span className="text-slate-600 text-sm">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
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

export default ServiceDetailModal;
