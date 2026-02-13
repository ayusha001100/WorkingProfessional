'use client';
import { motion } from 'framer-motion';
import { Code, Users, Briefcase, TrendingUp } from 'lucide-react';

const benefits = [
  {
    icon: <Code size={32} />,
    title: "Project-Based Learning",
    desc: "Don't just watch, do. Build real-world projects that you can add to your portfolio and resume."
  },
  {
    icon: <Users size={32} />,
    title: "Community Driven",
    desc: "Learn with thousands of others, participate in discussions, and grow your professional network."
  },
  {
    icon: <Briefcase size={32} />,
    title: "Job Readiness",
    desc: "Get industry-aligned training that prepares you for high-paying tech roles in top companies."
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Lifetime Career Support",
    desc: "Access to our exclusive career portal, placement drives, and career guidance sessions."
  }
];

export default function Benefits() {
  return (
    <section className="benefits-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2>Why start with <span className="text-secondary">LetsUpgrade</span>?</h2>
          <p>We provide everything you need to transition into a successful tech career.</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="benefit-card"
            >
              <div className="icon-wrapper">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .benefits-section {
          background-color: #fafafa;
        }
        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .section-header h2 {
          font-size: 3.5rem;
          margin-bottom: 24px;
          color: #111;
          letter-spacing: -2px;
        }
        .text-secondary {
          color: var(--primary);
        }
        .section-header p {
          font-size: 1.3rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .benefit-card {
          background: white;
          padding: 40px 44px;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid #f0f0f0;
          position: relative;
          overflow: hidden;
        }
        .benefit-card::before {
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
        .benefit-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .benefit-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(255, 204, 0, 0.1);
          border-color: #ffcc00;
        }
        .benefit-card:hover::before {
          opacity: 1;
        }
        .benefit-card:hover::after {
          transform: scaleX(1);
        }
        .icon-wrapper {
          width: 72px;
          height: 72px;
          background: #FFF9CC;
          color: #ffcc00;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .benefit-card:hover .icon-wrapper {
          background: #ffcc00;
          color: #FFFFFF;
          transform: rotate(-8deg) scale(1.2) translateY(-4px);
          box-shadow: 0 15px 30px rgba(255, 204, 0, 0.3);
        }
        .benefit-card h3 {
          font-size: 1.7rem;
          margin-bottom: 20px;
          color: #111;
        }
        .benefit-card p {
          color: #666;
          line-height: 1.7;
          font-size: 1.1rem;
        }
        @media (max-width: 768px) {
          .section-header h2 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
