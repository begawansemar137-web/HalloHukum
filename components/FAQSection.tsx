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
    <div className="border-b border-slate-200 py-6">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-brand-dark"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <Icon className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'transform rotate-180' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </Icon>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-slate-600 pr-8">{answer}</p>
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
        <section id="faq" className="py-12 sm:py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">Pertanyaan Umum</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Temukan jawaban cepat untuk pertanyaan-pertanyaan yang paling sering diajukan.
                </p>
            </div>
            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
            <div className="text-center mt-12">
                    <Link to="/faq" className="font-semibold text-brand-secondary hover:text-sky-400 transition-colors">
                        Lihat Semua Pertanyaan &rarr;
                    </Link>
                </div>
            </div>
      </section>
    );
}

export default FAQSection;