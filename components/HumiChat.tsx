import DOMPurify from 'dompurify';

import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import { ChatMessage, FilePart } from '../types';
import { getHumiResponse } from '../services/geminiService';
import { loadChat, saveChat } from '../services/chatHistory';
import { useAuth } from '../contexts/AuthContext';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import { Link } from 'react-router-dom';

interface HumiChatProps {
  onClose: () => void;
  onScheduleVideoCall: () => void;
  initialPrompt?: string;
}

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

const HumiChat: React.FC<HumiChatProps> = ({ onClose, onScheduleVideoCall, initialPrompt }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const savedHistory = localStorage.getItem('humiChatHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          return parsedHistory;
        }
      }
    } catch (error) {
      console.error("Failed to load chat history from localStorage", error);
      localStorage.removeItem('humiChatHistory'); // Clear corrupted data
    }
    
    // If no saved history or if it's corrupted, return the default greeting
    return [{
      id: Date.now(),
      text: "Selamat datang di HalloHukum! Saya HUMI, AI Legal Agent Anda. Ada yang bisa saya bantu terkait kebutuhan hukum UMKM Anda hari ini?",
      sender: 'ai',
    }];
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [suggestedServiceSlug, setSuggestedServiceSlug] = useState<string | null>(null);
  const [micPermission, setMicPermission] = useState<'granted' | 'prompt' | 'denied'>('prompt');
  
  // --- States for Text-to-Speech ---
  const [isTtsEnabled, setIsTtsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('humiTtsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);


  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialPromptHandledRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Effect to check and update mic permission
  useEffect(() => {
    if (!hasRecognitionSupport) return;
    
    (async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        setMicPermission(permissionStatus.state);
        permissionStatus.onchange = () => {
          setMicPermission(permissionStatus.state);
        };
      } catch (err) {
        console.warn("Could not query microphone permissions.", err);
        setMicPermission('prompt');
      }
    })();
  }, [hasRecognitionSupport]);


  // Effect to save chat history to localStorage whenever it changes
  // (anonymous visitors only; signed-in users are stored in the database)
  useEffect(() => {
    if (user) return;
    try {
      localStorage.setItem('humiChatHistory', JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history to localStorage", error);
    }
  }, [messages, user]);

  // Signed-in users: load their saved conversation, unless a new one already started
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    loadChat('humi', user.id).then(saved => {
      if (cancelled || saved.length === 0) return;
      setMessages(prev => (prev.length === 1 && prev[0].sender === 'ai' ? saved : prev));
    });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);
  
   // Effect to save TTS preference
  useEffect(() => {
    localStorage.setItem('humiTtsEnabled', JSON.stringify(isTtsEnabled));
  }, [isTtsEnabled]);

  // Effect for speech recognition transcript
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);
  
  // Effect to scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
   const speak = (text: string) => {
    if (!('speechSynthesis' in window) || !isTtsEnabled) return;
    
    window.speechSynthesis.cancel(); // Cancel any previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      stopListening();
      setIsSpeaking(true);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    utterance.onerror = (event) => {
      console.error('Speech synthesis error', event);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() && !attachedFile) return;

    const userMessageText = inputValue.trim();
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: userMessageText,
      sender: 'user',
      attachment: attachedFile ? { name: attachedFile.name, type: attachedFile.type } : undefined,
    };
    setMessages(prev => [...prev, userMessage]);
    if (user) saveChat('humi', user.id, userMessage);
    
    setInputValue('');
    setIsLoading(true);
    setSuggestedServiceSlug(null);
    const fileToSend = attachedFile;
    removeAttachment();
    stopListening();

    try {
        const filePart = fileToSend ? await fileToGenerativePart(fileToSend) : undefined;

        const history = messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));
        
        const aiResponse = await getHumiResponse(userMessageText, history, filePart);
        
        const humiMessage: ChatMessage = {
          id: Date.now() + 1,
          text: aiResponse.text,
          sender: 'ai',
        };

        setMessages(prev => [...prev, humiMessage]);
        if (user) saveChat('humi', user.id, humiMessage);
        
        speak(aiResponse.text);

        if (aiResponse.suggestedServiceSlug) {
            setSuggestedServiceSlug(aiResponse.suggestedServiceSlug);
        }

    } catch (error) {
        console.error("Error getting response from HUMI:", error);
        const errorMessage: ChatMessage = {
            id: Date.now() + 1,
            text: "Maaf, terjadi kendala saat menghubungi HUMI. Silakan coba beberapa saat lagi.",
            sender: 'ai',
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  // Effect to handle and automatically send an initial prompt
  useEffect(() => {
    if (!initialPrompt || initialPromptHandledRef.current) {
      return;
    }

    const isNewChatSession = messages.length === 1 && messages[0].sender === 'ai';

    if (isNewChatSession) {
      initialPromptHandledRef.current = true;
      setInputValue(initialPrompt);
      queueMicrotask(() => {
          handleSendMessage();
      });
    } else {
      setInputValue(initialPrompt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  // Effect for auto-sizing textarea
  useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
          textarea.style.height = 'auto'; // Reset height to shrink if text is deleted
          textarea.style.height = `${textarea.scrollHeight}px`;
      }
  }, [inputValue]);
  
  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Max size is 5MB.');
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
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setInputValue(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  const handleMicClick = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const micDisabled = !hasRecognitionSupport || micPermission === 'denied';

  const micTooltip = !hasRecognitionSupport
    ? 'Pengenalan suara tidak didukung di browser ini.'
    : micPermission === 'denied'
    ? 'Akses mikrofon diblokir. Izinkan di pengaturan browser Anda.'
    : isListening
    ? 'Berhenti merekam'
    : 'Mulai merekam suara';

  return (
    <div className="w-[calc(100vw-1.25rem)] h-[calc(100vh-2.5rem)] sm:w-96 sm:h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-dark text-white font-bold text-lg">H</div>
        <div className="ml-3">
          <h2 className="font-bold text-brand-dark">HUMI AI Legal Agent</h2>
          <p className="text-xs flex items-center">
            <span className={`w-2 h-2 rounded-full mr-1.5 ${isSpeaking ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></span>
            <span className={`${isSpeaking ? 'text-amber-600' : 'text-green-600'}`}>
              {isSpeaking ? 'Speaking...' : 'Online'}
            </span>
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setIsTtsEnabled(prev => !prev)}
              className="text-slate-500 hover:text-brand-dark"
              aria-label={isTtsEnabled ? 'Matikan suara' : 'Aktifkan suara'}
              title={isTtsEnabled ? 'Matikan suara' : 'Aktifkan suara'}
            >
                {isTtsEnabled ? (
                    <Icon className="w-6 h-6"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></Icon>
                ) : (
                    <Icon className="w-6 h-6"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></Icon>
                )}
            </button>
            <button onClick={onClose} className="text-slate-500 hover:text-brand-dark" aria-label="Tutup obrolan">
              <Icon className="w-6 h-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></Icon>
            </button>
        </div>
      </header>
      
      {/* Messages */}
      <div role="log" aria-live="polite" className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-100">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <div className="h-7 w-7 flex items-center justify-center rounded-full bg-brand-dark text-white font-bold text-sm flex-shrink-0">H</div>}
            <div className={`max-w-[75%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-dark text-white rounded-br-lg' : 'bg-white text-brand-dark rounded-bl-lg shadow-sm'}`}>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text.replace(/\n/g, '<br />')) }}></p>
              {msg.attachment && (
                 <div className="mt-2 p-2 bg-white/10 rounded-lg flex items-center gap-2">
                    <Icon className="w-4 h-4 flex-shrink-0"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></Icon>
                    <span className="text-xs truncate">{msg.attachment.name}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2.5 justify-start">
            <div className="h-7 w-7 flex items-center justify-center rounded-full bg-brand-dark text-white font-bold text-sm flex-shrink-0">H</div>
            <div className="max-w-[75%] p-3 rounded-2xl bg-white text-brand-dark rounded-bl-lg shadow-sm flex items-center space-x-2">
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
        {suggestedServiceSlug && (
             <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-sm text-center">
                <p className="text-sky-800 mb-2">HUMI menyarankan layanan yang mungkin cocok untuk Anda:</p>
                <Link to={`/layanan/${suggestedServiceSlug}`} onClick={onClose} className="font-bold text-brand-secondary hover:underline">
                    Lihat Layanan {suggestedServiceSlug.replace(/-/g, ' ')} &rarr;
                </Link>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <footer className="p-4 border-t border-slate-200">
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
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Lampirkan file"
            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors text-slate-600 hover:bg-slate-200"
          >
            <Icon className="w-5 h-5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></Icon>
          </button>
          <div className="relative flex-grow">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputValue}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? 'Mendengarkan...' : "Ketik pertanyaan Anda..."}
              aria-label="Pesan"
              className="w-full bg-slate-100 border-transparent rounded-2xl px-4 pr-12 py-2.5 text-sm focus:ring-2 focus:ring-brand-secondary focus:border-transparent resize-none overflow-y-auto"
              style={{ maxHeight: '120px' }}
            />
            <button
                type="button"
                onClick={handleMicClick}
                disabled={micDisabled}
                aria-label={isListening ? "Berhenti merekam" : "Mulai merekam suara"}
                title={micTooltip}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                } ${micDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isListening ? (
                  <Icon className="w-5 h-5"><rect x="6" y="6" width="12" height="12" /></Icon>
                ) : (
                  <Icon className="w-5 h-5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line></Icon>
                )}
            </button>
          </div>
          <button type="submit" aria-label="Kirim" className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center transition-colors hover:bg-slate-700 disabled:bg-slate-400" disabled={(!inputValue.trim() && !attachedFile) || isLoading}>
            <Icon className="w-5 h-5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></Icon>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default HumiChat;
