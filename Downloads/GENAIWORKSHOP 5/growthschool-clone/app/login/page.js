'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const PRO_REDIRECT = 'https://pro.letsupgrade.in';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = PRO_REDIRECT;
  };

  const handleGoogleSignup = () => {
    window.location.href = PRO_REDIRECT;
  };

  return (
    <div className="login-container">
      {/* Left - Orange Panel */}
      <div className="login-right">
        <div className="illustration-card">
          {/* Abstract Grid Background */}
          <div className="grid-bg"></div>

          {/* EdTech / Learning Visualization */}
          <div className="feature-visualization">
            {/* Floating Badge 1 */}
            <div className="float-badge badge-top">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">Skill Unlocked</span>
            </div>

            {/* Main Progress Card */}
            <div className="glass-progress-card">
              <div className="card-header">
                <div className="course-icon">AI</div>
                <div className="course-info">
                  <h4>Gen AI Mastery</h4>
                  <span>In Progress</span>
                </div>
              </div>

              <div className="progress-circle">
                <div className="progress-value">85%</div>
                <svg className="progress-ring" width="120" height="120">
                  <circle className="progress-ring__circle-bg" stroke="#FFF" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" opacity="0.2" />
                  <circle className="progress-ring__circle" stroke="#FFF" strokeWidth="8" fill="transparent" r="52" cx="60" cy="60" />
                </svg>
              </div>

              <div className="mini-stats">
                <div className="stat">
                  <b>12</b> Modules
                </div>
                <div className="stat">
                  <b>4.8</b> Rating
                </div>
              </div>
            </div>

            {/* Floating Badge 2 */}
            <div className="float-badge badge-bottom">
              <span className="badge-icon">🏆</span>
              <span className="badge-text">Top 1% Mentor</span>
            </div>
          </div>

          <div className="illustration-text">
            <h3>Build Your Career</h3>
            <p>Master new skills with industry experts in live workshops.</p>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="login-left">
        <div className="logo-section">
          <Link href="/">
            <div className="logo-link">
              <div className="logo-box">
                <div className="arrow-icon">➔</div>
              </div>
              <span className="logo-text">LetsUpgrade</span>
            </div>
          </Link>
        </div>

        <div className="login-content">
          <div className="welcome-header">
            <h1 className="welcome-title">Claim Your Spot</h1>
            <p className="welcome-subtitle">Register for the FREE 3-Hour AI Workshop</p>
          </div>

          <button type="button" className="google-btn" onClick={handleGoogleSignup}>
            <img src="https://www.google.com/favicon.ico" alt="" className="google-icon" />
            Continue with Google
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <form onSubmit={handleSubmit} className="details-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                required 
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="Enter your phone number" 
                required 
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn" style={{ width: '100%' }}>
              Register Now <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </form>

          <p className="terms-text">
            By continuing, you agree to our <span className="highlight">Terms of Service</span> and <span className="highlight">Privacy Policy</span>.
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
            display: flex;
            min-height: 100vh;
            font-family: var(--font-outfit), sans-serif;
            background: #fff;
        }

        /* --- Left Side --- */
        .login-left {
            width: 50%;
            padding: 40px 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .logo-section {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo-link {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            cursor: pointer;
        }

        .logo-box {
            width: 32px;
            height: 32px;
            background: #FF6B00; /* Orange Logo Base */
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transform: skew(-10deg);
        }

        .arrow-icon {
            color: white;
            font-size: 14px;
            transform: rotate(-45deg) skew(10deg);
        }

        .logo-text {
            font-weight: 700;
            font-size: 1.2rem;
            color: #1E293B;
        }

        .login-content {
            max-width: 440px;
            width: 100%;
            margin: auto 0;
        }

        .welcome-header {
            margin-bottom: 32px;
        }

        .welcome-title {
            font-size: 2rem;
            font-weight: 800;
            color: #1E293B;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }

        .welcome-subtitle {
            color: #64748B;
            font-size: 1rem;
            font-weight: 500;
        }

        .google-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            width: 100%;
            padding: 14px 20px;
            border: 1px solid #E2E8F0;
            border-radius: 12px;
            background: #fff;
            color: #334155;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-bottom: 20px;
        }

        .google-btn:hover {
            background: #F8FAFC;
            border-color: #CBD5E1;
        }

        .google-icon {
            width: 20px;
            height: 20px;
        }

        .divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin-bottom: 20px;
            color: #94A3B8;
            font-size: 0.85rem;
        }

        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #E2E8F0;
        }

        .divider span {
            padding: 0 16px;
        }

        /* Form Styles */
        .details-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 24px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .form-group label {
            font-size: 0.95rem;
            font-weight: 700;
            color: #1E293B;
            margin-left: 2px;
        }

        .form-input {
            padding: 14px 16px;
            border: 1px solid #CBD5E1;
            border-radius: 12px;
            font-size: 1rem;
            color: #334155;
            transition: all 0.2s ease;
        }

        .form-input::placeholder { color: #94A3B8; }

        .form-input:focus {
            border-color: #FF6B00;
            outline: none;
            box-shadow: 0 0 0 4px rgba(255, 107, 0, 0.1);
        }

        .submit-btn {
            background: #FF6B00;
            color: white;
            padding: 16px;
            border-radius: 12px;
            border: none;
            font-weight: 700;
            cursor: pointer;
            font-size: 1.05rem;
            transition: all 0.2s ease;
            box-shadow: 0 10px 20px -5px rgba(255, 107, 0, 0.3);
            margin-top: 8px;
        }

        .submit-btn:hover {
            background: #E65A00;
            transform: translateY(-2px);
            box-shadow: 0 15px 25px -5px rgba(255, 107, 0, 0.4);
        }

        .google-login-btn {
            background: #fff;
            color: #334155;
            border: 1px solid #E2E8F0;
            padding: 14px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            width: 100%;
            margin-bottom: 24px;
        }

        .google-login-btn:hover {
            background: #F8FAFC;
            border-color: #CBD5E1;
            transform: translateY(-1px);
        }

        .google-icon {
            width: 20px;
            height: 20px;
        }

        .terms-text {
            font-size: 0.8rem;
            color: #94A3B8;
            line-height: 1.6;
            text-align: center;
        }

        .highlight {
            color: #FF6B00;
            font-weight: 600;
            cursor: pointer;
        }

        /* --- Right Side Updates --- */
        .login-right {
            width: 50%;
            background: linear-gradient(135deg, #FF6B00 0%, #FF8F00 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            position: relative;
            overflow: hidden;
        }

        .illustration-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 40px;
            padding: 40px;
            width: 100%;
            max-width: 480px;
            aspect-ratio: 4/5;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .grid-bg {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background-image: 
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.6;
            border-radius: 40px;
        }

        /* Feature Viz */
        .feature-visualization {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .glass-progress-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 24px;
            padding: 24px;
            width: 240px;
            display: flex;
            flex-direction: column;
            align-items: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            transform: rotate(-5deg);
            transition: transform 0.5s ease;
            z-index: 10;
        }

        .glass-progress-card:hover {
            transform: rotate(0deg) scale(1.05);
        }

        .card-header {
            display: flex;
            align-items: center;
            width: 100%;
            gap: 12px;
            margin-bottom: 20px;
        }

        .course-icon {
            width: 40px;
            height: 40px;
            background: #fff;
            color: #FF6B00;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 1.1rem;
        }

        .course-info h4 {
             font-size: 1rem; color: white; margin: 0; font-weight: 700;
        }
        .course-info span {
             font-size: 0.8rem; color: rgba(255,255,255,0.8);
        }

        .progress-circle {
            position: relative;
            width: 120px;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }

        .progress-value {
            font-size: 1.5rem;
            font-weight: 800;
            color: white;
            position: absolute;
        }

        .progress-ring__circle {
            stroke-dasharray: 326;
            stroke-dashoffset: 50; /* ~85% */
            transition: stroke-dashoffset 1s ease-in-out;
            transform: rotate(-90deg);
            transform-origin: 50% 50%;
            stroke-linecap: round;
        }

        .mini-stats {
            display: flex;
            justify-content: space-between;
            width: 100%;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-top: 12px;
        }
        .stat { color: white; font-size: 0.85rem; }

        /* Floating Badges */
        .float-badge {
            position: absolute;
            background: white;
            padding: 10px 16px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.15);
            animation: float 4s ease-in-out infinite;
        }
        .badge-text { font-weight: 700; color: #1E293B; font-size: 0.9rem; }
        
        .badge-top { top: 0px; right: 0px; animation-delay: 0s; }
        .badge-bottom { bottom: 20px; left: -20px; animation-delay: 2s; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .illustration-text {
            text-align: center;
            color: white;
            z-index: 10;
            margin-top: 20px;
        }
        
        /* ...dots... */
        .dots { display: flex; gap: 8px; justify-content: center; margin-top: 12px; }
        .dot { width: 8px; height: 8px; background: rgba(255,255,255,0.4); border-radius: 50%; }
        .dot.active { background: white; width: 24px; border-radius: 12px; }

        @media (max-width: 900px) {
            .login-right { display: none; }
            .login-left { width: 100%; padding: 32px; }
        }
            `}</style>
    </div>
  );
}
