import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star, PlayCircle, ChevronRight, Map, FileCode, UserCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import GsapHero from '../components/GsapHero';
import TestimonialsTicker from '../components/TestimonialsTicker';
import OnboardingModal from '../components/OnboardingModal';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const sectionsRef = useRef([]);

    useEffect(() => {
        sectionsRef.current.forEach((section, index) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }, []);



    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* Navbar */}
            <nav className="glass" style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1.2rem 5%', borderBottom: '1px solid var(--border-color)',
                background: 'var(--navbar-glass)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '32px', height: '32px' }} />
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>LetsUpgrade</h2>
                </div>



                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <ThemeToggle />
                    {user ? (
                        <button onClick={() => navigate('/track')} className="btn-glass-primary">
                            My Dashboard <ArrowRight size={18} />
                        </button>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <button onClick={() => navigate('/login')} className="btn-glass-primary" style={{ padding: '0.8rem 2rem', borderRadius: '12px' }}>
                                Get Started <ChevronRight size={18} />
                            </button>
                            <button
                                onClick={() => window.location.href = 'https://pages.razorpay.com/pl_S7Hmm9y3KCV723/view'}
                                className="glass"
                                style={{
                                    padding: '0.7rem 1.4rem',
                                    borderRadius: '12px',
                                    background: 'rgba(255, 87, 34, 0.06)',
                                    color: '#FF5722',
                                    border: '1px solid rgba(255, 87, 34, 0.2)',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 87, 34, 0.12)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 87, 34, 0.06)'}
                            >
                                Upgrade to Pro
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <GsapHero />

            {/* Social Proof */}
            <TestimonialsTicker />

            {/* Transformation Journey Section */}
            <section style={{ padding: '8rem 0', overflow: 'hidden' }}>
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%' }}>
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.2rem',
                                background: 'rgba(255, 87, 34, 0.1)', color: 'var(--accent-primary)',
                                borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '2rem',
                                letterSpacing: '0.1em', border: '1px solid rgba(255, 87, 34, 0.2)'
                            }}
                        >
                            <Sparkles size={14} /> THE BLUEPRINT
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1', fontWeight: 800 }}
                        >
                            From Beginner to <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Industry Leader</span>
                        </motion.h2>
                    </div>

                    <JourneyMap />
                </div>
            </section>

            {/* CTA Section */}
            <section
                ref={el => sectionsRef.current[1] = el}
                style={{ padding: '8rem 5%', position: 'relative', overflow: 'hidden' }}
            >
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '800px', height: '800px', background: 'var(--accent-primary)', opacity: 0.1,
                    filter: 'blur(180px)', zIndex: 0, borderRadius: '50%'
                }} />

                <div className="glass-card" style={{
                    padding: '6rem 4rem',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '1100px',
                    margin: '0 auto',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '40px'
                }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                        Ready to unlock your <br />
                        <span style={{ color: 'var(--accent-primary)' }}>career upgrade?</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', marginBottom: '3.5rem', maxWidth: '700px', margin: '0 auto 3.5rem auto', lineHeight: '1.6' }}>
                        Join 12,000+ professionals who have transformed their careers using our student-journey based platform.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/login')} className="btn-glass-primary" style={{ padding: '1.4rem 4rem', fontSize: '1.1rem', borderRadius: '16px' }}>
                            Start Learning Now <ArrowRight size={22} />
                        </button>
                        <button
                            onClick={() => window.location.href = 'https://pages.razorpay.com/pl_S7Hmm9y3KCV723/view'}
                            className="glass"
                            style={{
                                padding: '1.4rem 3rem',
                                fontSize: '1.1rem',
                                borderRadius: '16px',
                                background: 'rgba(255, 87, 34, 0.04)',
                                color: '#FF5722',
                                border: '1px solid rgba(255, 87, 34, 0.2)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 87, 34, 0.08)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 87, 34, 0.04)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            Upgrade to Pro <Star size={20} color="#FF5722" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '5rem 5% 3rem 5%', borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '32px', height: '32px' }} />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>LetsUpgrade</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '3rem' }}>
                        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a>
                        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Terms of Service</a>
                        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact</a>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', width: '100%', textAlign: 'center', marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                        © 2026 Gen AI Workshop. Built with passion for the future of work.
                    </p>
                </div>
            </footer>
        </div>
    );
}

function JourneyMap() {
    const steps = [
        { title: "Where You Are Now", subtitle: "Feeling stuck or starting out", icon: <Map size={24} />, color: "#94a3b8" },
        { title: "Learning Core Skills", subtitle: "Mastering the basics", icon: <Zap size={24} />, color: "#3b82f6" },
        { title: "Building Real Projects", subtitle: "Creating portfolio assets", icon: <FileCode size={24} />, color: "#8b5cf6" },
        { title: "Gaining Confidence", subtitle: "Mentorship & feedback", icon: <ShieldCheck size={24} />, color: "#10b981" },
        { title: "Interview Ready", subtitle: "Mock interviews & prep", icon: <UserCheck size={24} />, color: "#f59e0b" },
        { title: "Industry-Ready Professional", subtitle: "High-paying career", icon: <Star size={28} />, color: "#ff5722", highlight: true }
    ];

    return (
        <div style={{ position: 'relative', padding: '2rem 5%', maxWidth: '100%' }}>
            {/* SVG Connecting Path */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" viewBox="0 0 1200 500" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                    <motion.path
                        d="M 50 400 C 350 400, 650 150, 1150 80"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#ff5722" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                position: 'relative',
                zIndex: 1,
                alignItems: 'start'
            }}>
                {steps.map((step, index) => (
                    <JourneyCard key={index} step={step} index={index} total={steps.length} />
                ))}
            </div>
        </div>
    );
}

function JourneyCard({ step, index, total }) {
    // Flow-based offset using marginTop to expand the container height naturally
    const desktopOffsets = [280, 220, 160, 100, 40, 0];
    const offset = desktopOffsets[index] || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.5,
                duration: 0.8,
                type: "spring",
                stiffness: 80
            }}
            style={{
                marginTop: `${offset}px`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                position: 'relative'
            }}
        >
            {/* Step Marker */}
            <div style={{
                width: step.highlight ? '90px' : '70px',
                height: step.highlight ? '90px' : '70px',
                borderRadius: '50%',
                background: step.highlight ? 'linear-gradient(135deg, #ff5722 0%, #ff8a65 100%)' : 'var(--bg-secondary)',
                border: step.highlight ? 'none' : `3px solid ${step.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step.highlight ? '#fff' : step.color,
                boxShadow: step.highlight ? '0 20px 40px rgba(255,87,34,0.3)' : '0 10px 20px rgba(0,0,0,0.05)',
                marginBottom: '1.5rem',
                zIndex: 2,
                position: 'relative',
                transition: 'all 0.3s ease'
            }}>
                {step.highlight && (
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid #ff5722' }}
                    />
                )}
                {step.icon}
            </div>

            {/* Card Content */}
            <div className="glass-card" style={{
                padding: '1.5rem 1rem',
                borderRadius: '24px',
                width: '100%',
                minHeight: '160px',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                border: step.highlight ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.1)',
                background: step.highlight ? 'rgba(255, 87, 34, 0.03)' : 'rgba(255,255,255,0.02)'
            }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: step.highlight ? '#ff5722' : 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Step 0{index + 1}
                </div>
                <h3 style={{ fontSize: step.highlight ? '1.3rem' : '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.8rem', lineHeight: '1.2' }}>
                    {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {step.subtitle}
                </p>
            </div>
        </motion.div>
    );
}

