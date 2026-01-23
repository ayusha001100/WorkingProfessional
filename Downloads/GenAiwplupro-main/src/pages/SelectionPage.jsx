import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SelectionPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative'
        }}>
            {/* Cinematic Background */}
            <div style={{ position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px', background: 'var(--accent-primary)', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '400px', height: '400px', background: 'var(--accent-secondary)', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%' }} />

            <button
                onClick={() => navigate('/')}
                className="btn-secondary"
                style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255, 87, 34, 0.1)', color: 'var(--accent-primary)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}
                >
                    <Star size={14} fill="var(--accent-primary)" /> SELECT YOUR PATH
                </motion.div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>How will you <br /> start your <span style={{ color: 'var(--accent-primary)' }}>Gen AI journey?</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Personalized growth or industry-scale mastery. Choose the path that fits your ambition.</p>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                {/* Free Path */}
                <motion.div
                    whileHover={{ y: -10 }}
                    onClick={() => navigate(user ? '/curriculum' : '/login?redirect=/curriculum')}
                    className="glass-card"
                    style={{ width: '350px', padding: '3rem', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                >
                    <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', border: '1px solid var(--border-color)' }}>
                        <Sparkles size={28} />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>The Explorer</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', flex: 1, lineHeight: 1.7 }}>
                        Build a solid foundation with our free mentor-led track. Understand the industry reality and map your profile.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#fff' }}>
                        Start for Free <ChevronRight size={18} />
                    </div>
                </motion.div>

                {/* Pro Path */}
                <motion.div
                    whileHover={{ y: -10 }}
                    onClick={() => window.location.href = 'https://luc.to/wpworkshoplink'}
                    className="glass-card"
                    style={{ width: '350px', padding: '3rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', border: '1px solid var(--accent-primary)', background: 'rgba(255, 87, 34, 0.03)' }}
                >
                    <div style={{ width: '60px', height: '60px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)' }}>
                        <Zap size={28} />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>The Pro Warrior</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', flex: 1, lineHeight: 1.7 }}>
                        Deep dive into high-stakes AI orchestration, RAG, and multi-agent systems. Built for professionals chasing elite roles.
                    </p>
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Join Pro Track <ArrowRight size={18} />
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
