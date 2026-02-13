'use client';
import { motion } from 'framer-motion';

export default function WorkshopGuarantee() {
  const steps = [
    {
      step: "STEP 1",
      text: "Register and attend for free"
    },
    {
      step: "STEP 2",
      text: "Dive into hands-on, practical learning"
    },
    {
      step: "STEP 3",
      text: "Walk away with real, actionable value"
    }
  ];

  return (
    <section className="guarantee-section">
      <div className="container">
        <div className="header">
          <h2 className="title">A Workshop Worth Your Time. Guaranteed</h2>
          <p className="subtitle">No strings attached — just pure learning</p>
        </div>

        <div className="steps-grid">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.1 }}
              className="step-card"
            >
              <div className="step-label">{item.step}</div>
              <p className="step-text">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .guarantee-section {
          padding: 80px 0;
          background-color: #ffffff;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .header {
          margin-bottom: 50px;
          text-align: left;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 12px;
          font-family: var(--font-outfit);
          letter-spacing: -1px;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #64748B;
          font-weight: 500;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .step-card {
          background-color: #FFFDF0; /* Light Yellow background */
          border: 1px solid #FFF9CC; /* Yellow border */
          border-radius: 16px;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          transition: all 0.3s ease;
          height: 100%;
        }

        .step-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(255, 204, 0, 0.2);
          border-color: #ffcc00;
        }

        .step-card:hover .step-label {
          background: #ffcc00;
          color: white;
          transform: rotate(-3deg) scale(1.1);
        }

        .step-label {
          background: #FFF9CC;
          color: #997a00;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .step-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1E293B;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .guarantee-section {
            padding: 60px 0;
          }
          
          .steps-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .title {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
