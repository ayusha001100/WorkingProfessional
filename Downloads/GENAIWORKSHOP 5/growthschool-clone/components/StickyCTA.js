'use client';
import { motion } from 'framer-motion';

export default function StickyCTA() {
  return (
    <div className="sticky-footer-container">
      <div className="container footer-nav-wrapper">
        <div className="mini-logo">
          <div className="logo-circle">N</div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="pill-cta"
        >
          <div className="cta-content">
            <div className="cta-text">
              <span className="cta-title">Free Enrollment</span>
              <span className="cta-subtitle">Limited seats for the community</span>
            </div>
            <button className="join-btn">Join Now</button>
          </div>
        </motion.div>

        <div className="spacer"></div>
      </div>

      <style jsx>{`
        .sticky-footer-container {
          position: fixed;
          bottom: 30px;
          left: 0;
          right: 0;
          z-index: 100;
          pointer-events: none;
        }
        .footer-nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .mini-logo {
          pointer-events: auto;
        }
        .logo-circle {
          width: 40px;
          height: 40px;
          background: #333;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          font-family: var(--font-outfit);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .pill-cta {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          padding: 8px 12px 8px 32px;
          border-radius: 100px;
          pointer-events: auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          min-width: 450px;
        }
        .cta-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .cta-text {
          display: flex;
          flex-direction: column;
        }
        .cta-title {
          color: var(--primary);
          font-weight: 800;
          font-size: 1.2rem;
          font-family: var(--font-outfit);
          line-height: 1.2;
        }
        .cta-subtitle {
          color: #888;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .join-btn {
          background: var(--primary);
          color: #000;
          padding: 12px 32px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        .join-btn:hover {
          background: var(--primary-hover);
          transform: scale(1.05);
        }
        .spacer {
          width: 40px; /* To balance the logo on the left */
        }
        @media (max-width: 768px) {
          .pill-cta {
            min-width: auto;
            width: 100%;
            padding: 10px 20px;
          }
          .cta-subtitle {
            display: none;
          }
          .mini-logo, .spacer {
            display: none;
          }
          .footer-nav-wrapper {
            padding: 0 20px;
          }
          .sticky-footer-container {
            bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}
