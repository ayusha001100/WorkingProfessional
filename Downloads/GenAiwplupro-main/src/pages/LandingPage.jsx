import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star, PlayCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import GsapHero from '../components/GsapHero';
import OnboardingModal from '../components/OnboardingModal';

export default function LandingPage() {
    const navigate = useNavigate();
    const { user, userData, logout } = useAuth();
    const { theme } = useTheme();
    const [showOnboarding, setShowOnboarding] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const navItems = [
        { label: 'Curriculum', path: '/curriculum' },
        { label: 'Success Stories', path: '#' },
        { label: 'FAQ', path: '#' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {/* Navbar */}
            <nav className="glass" style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 5%', borderBottom: '1px solid var(--border-color)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '32px', height: '32px' }} />
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>LetsUpgrade</h2>
                </div>

                <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    {navItems.map(item => (
                        <a key={item.label} href={item.path} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem', transition: 'color 0.2s' }}>
                            {item.label}
                        </a>
                    ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <ThemeToggle />
                    {user ? (
                        <button onClick={() => navigate('/curriculum')} className="btn-primary">
                            My Dashboard <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button onClick={() => navigate('/login')} className="btn-primary">
                            Get Started <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <GsapHero />

            {/* Trust Ticker / Social Proof */}
            <section style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>Trusted by professionals from</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', opacity: 0.5, filter: 'grayscale(1)' }}>
                        {/* Logo placeholders would go here */}
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>GOOGLE</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>META</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>NVIDIA</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>MICROSOFT</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>OPENAI</div>
                    </div>
                </div>
            </section>

            {/* Value Prop Section */}
            <section style={{ padding: '8rem 5%' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem auto' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255, 87, 34, 0.1)', color: 'var(--accent-primary)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            <Sparkles size={16} /> WHY CHOOSE US
                        </div>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>The only program built for <span style={{ color: 'var(--accent-primary)' }}>real workplace impact.</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>We don't teach you theories. We teach you how to build, orchestrate, and lead AI systems that change business outcomes.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={<Zap size={32} />}
                            title="Personal Mentor-Led"
                            desc="Forget static videos. Our AI Mentor understands your background and tailors every lesson to your career goals."
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={32} />}
                            title="Proof of Skill"
                            desc="Build a production-ready portfolio that recruiters can actually test. No fake certifications here."
                        />
                        <FeatureCard
                            icon={<Star size={32} />}
                            title="Job-First Curriculum"
                            desc="Every module corresponds to a specific high-paying job role in the modern AI economy."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '8rem 5%', position: 'relative', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '600px', height: '600px', background: 'var(--accent-primary)', opacity: 0.1,
                    filter: 'blur(150px)', zIndex: 0
                }} />
                <div className="container glass-card" style={{ padding: '5rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Ready to unlock your <br /> <span style={{ color: 'var(--accent-primary)' }}>career upgrade?</span></h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                        Join 12,000+ professionals who have transformed their careers using our student-journey based platform.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                        <button onClick={() => navigate('/login')} className="btn-primary" style={{ padding: '1.2rem 3.5rem', fontSize: '1.1rem' }}>
                            Start Learning Now <ArrowRight size={20} />
                        </button>
                        <button className="btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <PlayCircle size={20} /> Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 5%', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '28px', height: '28px' }} />
                        <h3 style={{ fontSize: '1.1rem' }}>LetsUpgrade</h3>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2026 Gen AI Workshop. Built for the future of work.</p>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="premium-card glass" style={{ padding: '3rem' }}>
            <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>{desc}</p>
        </div>
    );
}
