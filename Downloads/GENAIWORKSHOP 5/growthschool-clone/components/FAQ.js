'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How do I join a workshop at LetsUpgrade?",
    answer: "Pick a program from our explorer and click 'Register Now'. You'll receive joining details by email and WhatsApp."
  },
  {
    question: "Are the certificates from LetsUpgrade recognized?",
    answer: "Yes! Our certificates are co-branded with our industry partners and are widely recognized by top tech companies for verified skill-building."
  },
  {
    question: "Do I need any prior experience?",
    answer: "We have programs for all levels. Check the 'Prerequisites' section of each track to see if it fits your current skill level."
  },
  {
    question: "Is there a community to help me out?",
    answer: "Absolutely! Once you join, you get access to our thriving Discord community with 10M+ members where experts and peers help each other."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>FREQUENTLY ASKED <span className="text-secondary">QUESTIONS</span></h2>
          <p>We've answered the most common ones here.</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`icon ${openIndex === index ? 'rotate' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="faq-answer"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          background-color: #ffffff;
        }
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }
        .section-header h2 {
          font-size: 3.5rem;
          letter-spacing: -2px;
          color: #111;
          margin-bottom: 6px;
        }
        .text-secondary {
          color: var(--primary);
        }
        .section-header p {
          font-size: 1.2rem;
          color: #888;
          margin-top: 0;
        }
        .faq-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .faq-item {
          background: #fafafa;
          margin-bottom: 20px;
          border-radius: 20px;
          border: 1px solid #efefef;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .faq-item:hover {
          border-color: var(--primary);
          background: #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 28px 48px 28px 32px;
          font-size: 1.15rem;
          font-weight: 700;
          text-align: center;
          color: #111;
          transition: all 0.2s;
          position: relative;
        }
        .faq-question span {
          flex: 0 0 auto;
          line-height: 1.4;
          text-align: center;
        }
        .faq-question .icon {
          position: absolute;
          right: 24px;
        }
        .faq-question.active {
          color: var(--primary);
        }
        .icon {
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: #999;
        }
        .faq-question.active .icon {
          color: var(--primary);
        }
        .icon.rotate {
          transform: rotate(180deg);
        }
        .faq-answer {
          padding: 0 32px 28px 32px;
          overflow: hidden;
          text-align: center;
          display: block;
        }
        .faq-answer p {
          margin: 0;
          padding-top: 6px;
          color: #475569;
          line-height: 1.7;
          font-size: 1rem;
          text-align: center;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
          white-space: normal;
        }
        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2.5rem;
          }
          .faq-question {
            padding: 24px 44px 24px 24px;
            font-size: 1.1rem;
          }
          .faq-question .icon {
            right: 16px;
          }
        }
      `}</style>
    </section>
  );
}
