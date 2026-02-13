'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo mb-8">
              <Image
                src="/letsupgrade-logo.png"
                alt="LetsUpgrade Logo"
                width={160}
                height={45}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <p className="brand-desc">
              Empowering 10M+ tech enthusiasts to learn, build, and grow together. Join the mission to upgrade the world.
            </p>
            <div className="social-links">
              <a href="#"><Instagram size={22} /></a>
              <a href="#"><Twitter size={22} /></a>
              <a href="#"><Linkedin size={22} /></a>
              <a href="#"><Facebook size={22} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Tracks</h4>
            <Link href="#">Web Development</Link>
            <Link href="#">Data Science</Link>
            <Link href="#">Cyber Security</Link>
            <Link href="#">Cloud Computing</Link>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <Link href="#">Help Center</Link>
            <Link href="#">Community Guild</Link>
            <Link href="#">Contact Us</Link>
            <Link href="#">Mentors</Link>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated 🚀</h4>
            <p>Get the latest workshop alerts and tech news.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Email address" />
              <button><Send size={20} /></button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 LetsUpgrade. All rights reserved.</p>
          <div className="legal-links">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Refund Policy</Link>
            <Link href="#">Terms of Use</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: var(--black);
          color: white;
          padding: 100px 0 40px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 2fr;
          gap: 80px;
          margin-bottom: 80px;
        }
        .logo {
          background: white;
          padding: 10px 14px;
          border-radius: 12px;
          display: inline-block;
          width: fit-content;
        }
        .brand-desc {
          color: #888;
          margin-top: 24px;
          margin-bottom: 32px;
          line-height: 1.7;
          max-width: 350px;
          font-size: 1.1rem;
        }
        .social-links {
          display: flex;
          gap: 20px;
        }
        .social-links a {
          color: #666;
          transition: all 0.3s ease;
        }
        .social-links a:hover {
          color: var(--primary);
          transform: translateY(-5px);
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-links h4, .footer-newsletter h4 {
          font-size: 1.2rem;
          margin-bottom: 32px;
          color: white;
          font-family: var(--font-outfit);
          letter-spacing: 1px;
        }
        .footer-links a {
          color: #888;
          transition: color 0.2s;
          font-size: 1.05rem;
        }
        .footer-links a:hover {
          color: var(--primary);
        }
        .footer-newsletter p {
          color: #888;
          margin-bottom: 24px;
          font-size: 1.05rem;
        }
        .newsletter-form {
          display: flex;
          background: #1a1a1a;
          padding: 6px;
          border-radius: 12px;
          border: 1px solid #333;
        }
        .newsletter-form input {
          background: transparent;
          border: none;
          padding: 12px 16px;
          color: white;
          flex-grow: 1;
          outline: none;
          font-size: 1rem;
        }
        .newsletter-form button {
          background: var(--primary);
          color: white;
          padding: 0 20px;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .newsletter-form button:hover {
          background: var(--primary-hover);
        }
        .footer-bottom {
          padding-top: 40px;
          border-top: 1px solid #222;
          display: flex;
          justify-content: space-between;
          color: #555;
          font-size: 1rem;
        }
        .legal-links {
          display: flex;
          gap: 32px;
        }
        .legal-links a:hover {
          color: white;
        }
        @media (max-width: 992px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }
        }
        @media (max-width: 576px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }
          .legal-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
