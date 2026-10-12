import DOMPurify from 'dompurify';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/Icon';
import { ChatMessage, FilePart } from '../types';
import { Link } from 'react-router-dom';
import { getAdvisorResponse } from '../services/geminiService';
import { loadChat, saveChat } from '../services/chatHistory';

// Helper to convert file to base64 for Gemini API
const fileToGenerativePart = async (file: File): Promise<FilePart> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // remove the data:mime/type;base64, prefix
      resolve((reader.result as string).split(',')[1]);
    };
    reader.readAsDataURL(file);
  });
  return {
    mimeType: file.type,
    data: await base64EncodedDataPromise,
  };
};

const AdvisorChatPage: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [isAdvisorTyping, setIsAdvisorTyping] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const advisor = {
    name: 'Baskara Mahendra, S.H.',
    avatar: 'https://picsum.photos/id/433/200/200',
    title: 'Legal Advisor'
  };

  useEffect(() => {
    // Load this account's saved conversation
    if (!user) return;
    let cancelled = false;
    loadChat('advisor', user.id).then(saved => {
      if (!cancelled && saved.length > 0) setMessages(saved);
    });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  useEffect(() => {
    // Scroll to the bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAdvisorTyping]);

  useEffect(() => {
    // Show initial greeting only if there's no previous chat history
    if (messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages(prev => prev.length > 0 ? prev : [
          {
            id: 1,
            text: `Selamat siang, ${user?.name || 'Bapak/Ibu'}. Saya ${advisor.name}, konsultan hukum dari HalloHukum. Ada yang bisa saya bantu terkait masalah hukum Anda hari ini?`,
            sender: 'ai', // Using 'ai' for advisor for styling purposes
          }
        ]);
      }, 1000);
      return () => clearTimeout(timer);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  // Effect for auto-sizing textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ukuran file terlalu besar. Maksimal 5MB.');
        return;
      }
      setAttachedFile(file);
      if (file.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(file));
      } else {
        setFilePreview(null);
      }
    }
  };
  
  const removeAttachment = () => {
    setAttachedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };
  
  const submitMessage = async () => {
    const text = inputValue.trim();
    if (!text && !attachedFile) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: text,
      sender: 'user',
      attachment: attachedFile ? { name: attachedFile.name, type: attachedFile.type } : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    if (user) saveChat('advisor', user.id, userMessage);
    
    // Reset state for next message
    setInputValue('');
    setIsAdvisorTyping(true);
    const fileToSend = attachedFile;
    removeAttachment();

    try {
        const filePart = fileToSend ? await fileToGenerativePart(fileToSend) : undefined;
        
        const history = messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));
        
        const responseText = await getAdvisorResponse(text, history, filePart);
        
        const advisorResponse: ChatMessage = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'ai',
        };
        
        setMessages(prev => [...prev, advisorResponse]);
        if (user) saveChat('advisor', user.id, advisorResponse);

    } catch (error) {
        console.error("Error getting response from Advisor:", error);
        const errorMessage: ChatMessage = {
            id: Date.now() + 1,
            text: "Maaf, terjadi kendala teknis. Silakan coba beberapa saat lagi atau hubungi support.",
            sender: 'ai',
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsAdvisorTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage();
  };
  
  return (
    <div className="animate-floatIn flex flex-col flex-grow">
        <div className="container mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-8 flex-grow flex flex-col">
            <div className="max-w-3xl mx-auto bg-white sm:rounded-2xl shadow-2xl border-x sm:border border-slate-200 flex flex-col w-full flex-grow">
                {/* Chat Header */}
                <header className="flex items-center p-4 border-b border-slate-200 bg-slate-50 sm:rounded-t-2xl flex-shrink-0">
                    <img src={advisor.avatar} alt={advisor.name} className="h-12 w-12 rounded-full object-cover" />
                    <div className="ml-4">
                        <h1 className="font-bold text-lg text-brand-dark">{advisor.name}</h1>
                        <p className="text-xs text-green-600 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>Online</p>
                    </div>
                    <Link to="/my-services" className="ml-auto text-slate-500 hover:text-brand-dark" aria-label="Tutup obrolan">
                        <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
                    </Link>
                </header>

                {/* Message Area */}
                <div role="log" aria-live="polite" className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-100">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <img src={advisor.avatar} alt="Advisor" className="h-8 w-8 rounded-full flex-shrink-0" />}
                            <div className={`max-w-[75%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-dark text-white rounded-br-lg' : 'bg-white text-brand-dark rounded-bl-lg shadow-sm'}`}>
                                <p className="text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text.replace(/\n/g, '<br />')) }}></p>
                                {msg.attachment && (
                                    <div className="mt-2 p-2 bg-white/10 rounded-lg flex items-center gap-2">
                                        <Icon className="w-4 h-4 flex-shrink-0"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></Icon>
                                        <span className="text-xs truncate">{msg.attachment.name}</span>
                                    </div>
                                )}
                            </div>
                            {msg.sender === 'user' && user?.profilePicture && <img src={user.profilePicture} alt="User" className="h-8 w-8 rounded-full flex-shrink-0" />}
                        </div>
                    ))}
                    {isAdvisorTyping && (
                        <div className="flex items-end gap-3 justify-start">
                            <img src={advisor.avatar} alt="Advisor" className="h-8 w-8 rounded-full flex-shrink-0" />
                            <div className="max-w-[75%] p-3 rounded-2xl bg-white text-brand-dark rounded-bl-lg shadow-sm flex items-center space-x-2">
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <footer className="p-4 border-t border-slate-200 flex-shrink-0">
                     {attachedFile && (
                        <div className="mb-2 p-2 bg-slate-100 rounded-lg flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 overflow-hidden">
                                {filePreview ? (
                                    <img src={filePreview} alt="Preview" className="h-8 w-8 rounded object-cover flex-shrink-0" />
                                ) : (
                                    <Icon className="w-6 h-6 text-slate-500 flex-shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></Icon>
                                )}
                                <span className="text-slate-700 truncate">{attachedFile.name}</span>
                            </div>
                            <button onClick={removeAttachment} aria-label="Hapus lampiran" className="p-1 text-slate-500 hover:text-red-500 rounded-full">
                                <Icon className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
                            </button>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            aria-label="Unggah dokumen"
                            className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors bg-slate-200 text-slate-600 hover:bg-slate-300"
                        >
                            <Icon className="w-5 h-5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></Icon>
                        </button>
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ketik pesan Anda..."
                            aria-label="Pesan"
                            className="w-full bg-slate-100 border-transparent rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent resize-none overflow-y-auto"
                            style={{ maxHeight: '144px' }}
                        />
                        <button type="submit" aria-label="Kirim pesan" className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-dark text-white flex items-center justify-center transition-colors hover:bg-slate-700 disabled:bg-slate-400" disabled={(!inputValue.trim() && !attachedFile) || isAdvisorTyping}>
                            <Icon className="w-5 h-5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></Icon>
                        </button>
                    </form>
                </footer>
            </div>
        </div>
        <style>{`
            @keyframes floatIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-floatIn { animation: floatIn 0.7s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default AdvisorChatPage;