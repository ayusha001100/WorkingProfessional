'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo-group">
          <Link href="/">
            <div className="logo-wrapper">
              <Image
                className="logo-image"
                src="/letsupgrade-logo.png"
                alt="LetsUpgrade Logo"
                width={160}
                height={35}
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </Link>

          <div className="divider"></div>

          <div className="experience-badge">
            <span className="number">6</span>
            <div className="text-content">
              <span>Years of experience in</span>
              <span>upskilling candidates</span>
            </div>
          </div>
        </div>

        {/* Apply Now Button */}
        <button
          className="apply-now-btn"
          onClick={() => {
            const event = new CustomEvent('openEnquiryModal');
            window.dispatchEvent(event);
          }}
        >
          Apply Now
        </button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 12px 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #f0f0f0;
        }
        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }
        
        .logo-group {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
        }

        .divider {
          width: 1px;
          height: 36px;
          background-color: #e0e0e0;
        }

        .experience-badge {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .number {
          font-family: var(--font-outfit);
          font-size: 3.5rem;
          font-weight: 900;
          color: #ffcc00; /* Yellow to match theme */
          line-height: 1;
          letter-spacing: -2px;
          text-shadow: 3px 3px 0px rgba(255, 204, 0, 0.2), 
                       0 0 20px rgba(255, 204, 0, 0.3);
        }

        .text-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0.8rem;
          color: #444;
          font-weight: 600;
          line-height: 1.3;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          font-family: var(--font-outfit);
        }

        .apply-now-btn {
          background-color: #ffcc00;
          color: #000;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-outfit);
          position: relative;
          overflow: hidden;
        }

        .apply-now-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: translateX(-150%) skewX(-15deg);
          animation: shimmer 2.5s infinite;
        }

        @keyframes shimmer {
          0% {
              transform: translateX(-100%) skewX(-15deg);
          }
          100% {
              transform: translateX(200%) skewX(-15deg);
          }
        }

        .apply-now-btn:hover {
          background-color: #e6b800;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 204, 0, 0.2);
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 20px;
          }
          :global(.logo-image) {
            width: 130px !important;
            height: auto !important;
          }
          .divider, .experience-badge {
            display: none;
          }
          /* Keep Apply Now visible or maybe smaller, user didn't specify, but safer to keep */
        }
      `}</style>
    </nav>
  );
}
