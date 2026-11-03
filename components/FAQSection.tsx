import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-hh-line py-5">
      <button
        className="w-full flex justify-between items-center text-left text-[17px] font-medium text-hh-ink hover:text-hh-indigo transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <Icon className={`w-5 h-5 text-hh-mute transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'transform rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </Icon>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-hh-ink-2 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
};


interface FAQSectionProps {
    faqs: {
        question: string;
        answer: string;
    }[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
    return (
        <section id="faq" className="py-16 sm:py-20 lg:py-28 bg-hh-soft border-y border-hh-line">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
                <h2 className="text-3xl sm:text-[2.6rem] font-normal leading-[1.1] tracking-[-0.02em] text-hh-ink">Pertanyaan umum</h2>
                <p className="mt-4 text-lg text-hh-ink-2">
                Jawaban singkat untuk hal yang paling sering ditanyakan.
                </p>
                <Link to="/faq" className="mt-6 inline-block font-medium text-hh-indigo hover:text-hh-indigo-press hover:underline underline-offset-4">
                    Lihat semua pertanyaan
                </Link>
            </div>
            <div className="lg:col-span-8 border-t border-hh-line">
                {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            </div>
            </div>
      </section>
    );
}

export default FAQSection;