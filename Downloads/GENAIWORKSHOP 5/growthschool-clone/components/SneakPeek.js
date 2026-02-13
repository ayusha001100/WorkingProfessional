'use client';
import { motion } from 'framer-motion';
import { Zap, MonitorPlay, Bot, MessageSquareCode } from 'lucide-react';

const features = [
  {
    icon: <Zap size={28} />,
    title: "Boost AI Productivity",
    desc: "Learn Proven AI Frameworks & Strategies For 10X Efficiency"
  },
  {
    icon: <MonitorPlay size={28} />,
    title: "Hands-On AI Training",
    desc: "Get hands-on experience with AI tools you'll actually use"
  },
  {
    icon: <Bot size={28} />,
    title: "Learn 15+ AI Tools",
    desc: "Unlock a powerful set of AI tools to streamline your tasks"
  },
  {
    icon: <MessageSquareCode size={28} />,
    title: "Build A Custom GPT Bot",
    desc: "Learn how to create your own GPT-powered bot to boost productivity"
  }
];

export default function SneakPeek() {
  return (
    <section className="sneak-peek-section">
      <div className="container">
        <div className="header">
          <h2 className="title">The AI Training <span className="highlight">10M+ Professionals</span> Can't Stop Recommending</h2>
          <p className="subtitle">Here's a sneak peek of what you'll get when you register for the workshop...</p>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="feature-card"
            >
              <div className="icon-wrapper">
                {item.icon}
              </div>
              <div className="content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sneak-peek-section {
          padding: 100px 0;
          background-color: #ffffff;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header {
          margin-bottom: 60px;
          text-align: left;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 16px;
          font-family: var(--font-outfit);
          letter-spacing: -1px;
          max-width: 800px;
          line-height: 1.2;
        }

        .highlight {
          color: #ffcc00; /* Brand Yellow */
        }

        .subtitle {
          font-size: 1.15rem;
          color: #64748B;
          font-weight: 500;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        .feature-card {
          background-color: #ffffff;
          border: 1px solid #f0f0f0;
          border-radius: 20px;
          padding: 40px;
          display: flex;
          flex-direction: column; 
          align-items: flex-start;
          gap: 24px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.02);
        }
        
        .feature-card::before {
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

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(255, 204, 0, 0.1);
          border-color: #ffcc00;
        }
        
        .feature-card:hover::before {
          opacity: 1;
        }

        .icon-wrapper {
          width: 56px;
          height: 56px;
          background: #FFF9CC;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffcc00;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .feature-card:hover .icon-wrapper {
          background: #ffcc00;
          color: #FFFFFF;
          transform: rotate(-8deg) scale(1.2) translateY(-4px);
          box-shadow: 0 15px 30px rgba(255, 204, 0, 0.3);
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1E293B;
          margin-bottom: 12px;
          font-family: var(--font-outfit);
        }

        .card-desc {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .sneak-peek-section {
            padding: 60px 0;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .title {
            font-size: 2rem;
          }

          .feature-card {
            padding: 32px;
          }
        }
      `}</style>
    </section>
  );
}
