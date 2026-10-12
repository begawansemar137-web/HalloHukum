
import React from 'react';
import Icon from './Icon';

interface HumiPromptProps {
  title: string;
  promptText: string;
}

const HumiPrompt: React.FC<HumiPromptProps> = ({ title, promptText }) => {
  const openHumiChat = () => {
    window.dispatchEvent(new CustomEvent('openHumiChatWithPrompt', {
        detail: { prompt: promptText }
    }));
  };

  return (
    <div className="bg-sky-50 border-l-4 border-brand-secondary p-4 my-8 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0">
           <Icon className="h-6 w-6 text-brand-secondary" aria-hidden="true">
             <path d="M12 20.94c1.5 0 2.75 1.25 2.75 2.75S13.5 26.44 12 26.44 9.25 25.19 9.25 23.69s1.25-2.75 2.75-2.75zM12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" clipRule="evenodd" fill="currentColor"/>
           </Icon>
        </div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-brand-secondary">{title}</p>
          <p className="mt-1 text-sm text-slate-700">
            Contoh pertanyaan: <em>"{promptText}"</em>
          </p>
          <button
            onClick={openHumiChat}
            className="mt-3 text-sm font-semibold text-brand-secondary hover:text-sky-600"
          >
            Tanya Sekarang &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HumiPrompt;