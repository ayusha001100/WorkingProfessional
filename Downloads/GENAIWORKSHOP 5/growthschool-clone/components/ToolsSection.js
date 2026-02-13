'use client';
import { motion } from 'framer-motion';
import {
  Mail, UserCheck, Search, FileText,
  Video, Rocket, Presentation, Table, Globe
} from 'lucide-react';

const tools = [
  { icon: Mail, title: 'Get AI to Reply to Your Emails' },
  { icon: UserCheck, title: 'Get an Assistant for Tasks' },
  { icon: Search, title: 'Summarize Anything on Web' },
  { icon: FileText, title: 'Uncover Insights from Docs' },
  { icon: Video, title: 'Create Content from Long Videos' },
  { icon: Rocket, title: 'Supercharge your Productivity' },
  { icon: Presentation, title: 'Create PPTs in Minutes' },
  { icon: Table, title: 'Become an Excel Pro' },
  { icon: Globe, title: 'Create Websites in Seconds' }
];

export default function ToolsSection() {
  return (
    <section className="tools-section">
      <div className="container">
        <div className="header">
          <span className="overline">TOOLS</span>
          <h2 className="title">Learn 15+ Essential AI Tools</h2>
        </div>

        <div className="tools-grid">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-20px' }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="tool-card"
              >
                <div className="icon-wrapper">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="card-title">{tool.title}</h3>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .tools-section {
          padding: 100px 0;
          background: linear-gradient(180deg, #FFFBF7 0%, #ffffff 100%);
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header {
          margin-bottom: 48px;
          text-align: left;
        }

        .overline {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--primary);
          font-weight: 700;
          text-transform: uppercase;
          display: block;
          margin-bottom: 10px;
        }

        .title {
          font-size: 2.15rem;
          font-weight: 800;
          color: #0F172A;
          font-family: var(--font-outfit);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .tool-card {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 20px;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(255, 204, 0, 0.04);
          min-height: 172px;
          position: relative;
          overflow: hidden;
        }

        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #ffcc00, #ffdb4d);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .tool-card:hover {
          border-color: #ffcc00;
          box-shadow: 0 20px 40px rgba(255, 204, 0, 0.1);
          transform: translateY(-8px);
        }

        .tool-card:hover::before {
          opacity: 1;
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          background: #FFF9CC;
          color: #ffcc00;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: iconFloat 3s ease-in-out infinite;
        }
        
        .tool-card:hover .icon-wrapper {
          background: #ffcc00;
          color: #fff;
          transform: rotate(-8deg) scale(1.2) translateY(-4px);
          animation: none;
          box-shadow: 0 15px 30px rgba(255, 204, 0, 0.3);
        }

        .tool-card:nth-child(1) .icon-wrapper { animation-delay: 0s; }
        .tool-card:nth-child(2) .icon-wrapper { animation-delay: 0.2s; }
        .tool-card:nth-child(3) .icon-wrapper { animation-delay: 0.4s; }
        .tool-card:nth-child(4) .icon-wrapper { animation-delay: 0.1s; }
        .tool-card:nth-child(5) .icon-wrapper { animation-delay: 0.3s; }
        .tool-card:nth-child(6) .icon-wrapper { animation-delay: 0.5s; }
        .tool-card:nth-child(7) .icon-wrapper { animation-delay: 0.15s; }
        .tool-card:nth-child(8) .icon-wrapper { animation-delay: 0.35s; }
        .tool-card:nth-child(9) .icon-wrapper { animation-delay: 0.25s; }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .card-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #1E293B;
          line-height: 1.45;
          margin: 0;
        }

        @media (max-width: 900px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 600px) {
          .tools-section {
            padding: 64px 0;
          }
          .tools-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .title {
            font-size: 1.75rem;
          }
          .tool-card {
            min-height: 150px;
            padding: 28px 20px;
          }
        }
      `}</style>
    </section>
  );
}
