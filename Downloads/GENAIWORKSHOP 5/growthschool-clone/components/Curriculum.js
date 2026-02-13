'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Zap, Code2, ShieldCheck, Users, Star } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Where You Are Now',
    desc: 'Feeling stuck or starting out',
    icon: BookOpen,
    color: '#94A3B8',
    cardStyle: 'gray'
  },
  {
    step: '02',
    title: 'Learning Core Skills',
    desc: 'Mastering the basics',
    icon: Zap,
    color: '#3B82F6',
    cardStyle: 'gray'
  },
  {
    step: '03',
    title: 'Building Real Projects',
    desc: 'Creating portfolio assets',
    icon: Code2,
    color: '#8B5CF6',
    cardStyle: 'gray'
  },
  {
    step: '04',
    title: 'Gaining Confidence',
    desc: 'Mentorship & feedback',
    icon: ShieldCheck,
    color: '#22C55E',
    cardStyle: 'gray'
  },
  {
    step: '05',
    title: 'Interview Ready',
    desc: 'Mock interviews & prep',
    icon: Users,
    color: '#ffcc00',
    cardStyle: 'gray'
  },
  {
    step: '06',
    title: 'Industry-Ready Professional',
    desc: 'High-paying career',
    icon: Star,
    color: '#ffcc00',
    cardStyle: 'highlight'
  }
];

export default function Curriculum() {
  const trackRef = useRef(null);
  const lineInView = useInView(trackRef, { once: false, margin: '-20px' });

  return (
    <section className="curriculum-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Learning <span className="text-secondary">Tracks</span></h2>
          <p>Choose your path and start your journey towards tech excellence.</p>
        </div>

        <div ref={trackRef} className="steps-track">
          {/* Animated Line Context */}
          <div className="steps-line-container">
            <svg viewBox="0 0 1100 400" preserveAspectRatio="none" className="line-svg">
              {/* Defs for gradients */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffcc00" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#ffcc00" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ffcc00" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Straight diagonal line from bottom-left to top-right */}
              <motion.path
                d="M 80 320 L 1020 80"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "linear" }}
              />
            </svg>
          </div>

          {steps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === steps.length - 1;

            return (
              <motion.div
                key={index}
                className={`step-wrapper step-${index + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.15) }}
              >

                <div className={`icon-circle ${isLast ? 'icon-filled' : 'icon-outline'}`}>
                  <Icon size={isLast ? 32 : 24} strokeWidth={2.5} />
                </div>

                <div className="step-content">
                  <span className="step-label">STEP {item.step}</span>
                  <h3 className="step-heading">{item.title}</h3>
                  <p className="step-description">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .curriculum-section {
          padding: 100px 0;
          background: #ffffff;
          overflow: hidden;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .section-header h2 {
          font-size: 2.75rem;
          color: #0F172A;
          margin-bottom: 12px;
        }
        .text-secondary {
          color: #ffcc00;
        }
        .section-header p {
          font-size: 1.15rem;
          color: #64748B;
        }

        /* TRACK CONTAINER */
        .steps-track {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start; 
          padding: 40px 0;
        }

        /* SVG LINE */
        .steps-line-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }
        .line-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* INDIVIDUAL STEPS */
        .step-wrapper {
          position: relative;
          z-index: 1;
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* Removed staggered margins to keep steps horizontal */
        }

        /* ICONS */
        .icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFF9CC;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
          color: #ffcc00;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .step-wrapper:hover .icon-circle {
          transform: rotate(-8deg) scale(1.2) translateY(-4px);
          background: #ffcc00;
          color: white;
          box-shadow: 0 15px 30px rgba(255, 204, 0, 0.3);
        }

        /* Specific colors for icons - matching standard array or rainbow */
        /* These are now overridden by the generic .icon-outline above, which is fine as per instruction */
        /* Removed individual step icon-outline colors as they are now handled by the generic .icon-circle */

        .icon-filled {
          background: #ffcc00;
          color: #ffffff;
          width: 72px;
          height: 72px;
          box-shadow: 0 10px 25px rgba(255, 204, 0, 0.4);
        }

        /* SOFT GLOW BEHIND EACH STEP */
        /* Removed as per instruction */

        /* TEXT CONTENT */
        .step-content {
          padding: 0 8px;
        }
        .step-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .step-heading {
          font-size: 1rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.3;
          margin-bottom: 8px;
        }
        .step-description {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.5;
        }
        
        /* HIGHLIGHT CARD (STEP 6) - Removed as per instruction */
        
        @media (max-width: 1024px) {
           .steps-track {
             height: auto;
             flex-wrap: wrap;
             gap: 40px;
             justify-content: center;
             align-items: flex-start;
             padding: 0 20px;
           }
           .steps-line-container { display: none; }
           
           .step-wrapper {
             min-width: 160px;
             max-width: 200px;
             margin-bottom: 0 !important;
             flex-direction: column; /* Changed back to column for mobile */
             text-align: center; /* Changed back to center for mobile */
             gap: 0; /* Removed gap for mobile */
           }
           .icon-circle {
             margin-bottom: 24px; /* Restore margin for mobile */
           }
        }
      `}</style>
    </section>
  );
}
