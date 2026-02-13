'use client';
import { motion } from 'framer-motion';

const row1Brands = [
  { name: 'Infibeam Avenues', logo: '/logos/infibeam.svg' },
  { name: 'HDFC Ergo', logo: '/logos/hdfc.svg' },
  { name: 'Loginext', logo: '/logos/loginext.svg' },
  { name: 'Invest India', logo: '/logos/investindia.png' },
  { name: 'Accenture', logo: '/logos/accenture.png' },
  { name: 'Chainlink', logo: '/logos/chainlink.svg' },
  { name: 'IBM', logo: '/logos/ibm.svg' },
];

const row2Brands = [
  { name: 'PwC', logo: '/logos/pwc.svg' },
  { name: 'Worxogo', logo: '/logos/worxogo.svg' },
  { name: 'Volvo', logo: '/logos/volvo.svg' },
  { name: 'Ola', logo: '/logos/ola.svg' },
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Dell_Logo.png' },
  { name: 'Intellecap', logo: '/logos/intellecap.svg' },
  { name: 'Microsoft', logo: '/logos/microsoft.svg' },
  { name: 'Axis Bank', logo: '/logos/axisbank.svg' },
];

export default function SocialProof() {
  return (
    <section className="social-proof-section">
      <div className="container">
        <div className="brand-logos">

          {/* Row 1: Scrolling Left */}
          <div className="logo-track scroll-left">
            {[...row1Brands, ...row1Brands, ...row1Brands, ...row1Brands].map((brand, index) => (
              <div key={`row1-${index}`} className="logo-item">
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </div>
            ))}
          </div>

          {/* Row 2: Scrolling Right */}
          <div className="logo-track scroll-right">
            {[...row2Brands, ...row2Brands, ...row2Brands, ...row2Brands].map((brand, index) => (
              <div key={`row2-${index}`} className="logo-item">
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </div>
            ))}
          </div>

        </div>
      </div>

      <style jsx>{`
        .social-proof-section {
          padding: 40px 0;
          background: #fff;
          border-bottom: 1px solid #eee;
          overflow: hidden;
        }
        .container {
          width: 100%;
          max-width: 100%;
          padding: 0;
          overflow: hidden;
        }
        .brand-logos {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow: hidden;
          position: relative;
        }
        .brand-logos::before,
        .brand-logos::after {
          content: "";
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        .brand-logos::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .brand-logos::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .logo-track {
          display: flex;
          gap: 80px;
          width: max-content;
          padding: 10px 0;
        }
        .logo-track:hover {
          animation-play-state: paused;
        }
        
        .scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        .scroll-right {
          animation: scrollRight 30s linear infinite;
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 90px;
          flex-shrink: 0;
        }
        .brand-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: none;
          opacity: 1;
          transition: transform 0.3s ease;
        }
        .logo-item:hover .brand-logo {
          transform: scale(1.1);
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); } 
          100% { transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .logo-track {
            gap: 40px;
          }
          .scroll-left {
            animation: scrollLeft 20s linear infinite;
          }
          .scroll-right {
            animation: scrollRight 20s linear infinite;
          }
          .logo-item {
            width: 140px;
            height: 70px;
          }
        }
      `}</style>
    </section>
  );
}
