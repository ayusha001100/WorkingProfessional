import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, Mail, Globe, User } from 'lucide-react';
import { gsap } from 'gsap';

export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xMove = (clientX - window.innerWidth / 2) / 50;
            const yMove = (clientY - window.innerHeight / 2) / 50;

            gsap.to(".signup-card", {
                rotateY: xMove / 1.5,
                rotateX: -yMove / 1.5,
                duration: 0.8,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.92 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div style={{
            minHeight: '100vh', width: '100vw', background: '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', position: 'relative', perspective: '1500px',
            fontFamily: "'Inter', sans-serif", padding: '2rem'
        }}>
            {/* Clean White Background - No Blobs */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, background: '#ffffff' }}></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="signup-card"
                style={{
                    width: '100%', maxWidth: '480px', zIndex: 10,
                    padding: '3.5rem 3rem', borderRadius: '50px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(25px) saturate(160%)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    boxShadow: '0 45px 100px -25px rgba(0,0,0,0.1)',
                    position: 'relative', transformStyle: 'preserve-3d'
                }}
            >
                <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <motion.div variants={itemVariants} style={{ display: 'inline-flex', padding: '1rem', background: '#fff', borderRadius: '25px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.01)', marginBottom: '1.2rem' }}>
                        <ShieldCheck color="var(--accent-primary)" style={{ opacity: 0.9 }} size={30} />
                    </motion.div>
                    <motion.h2 variants={itemVariants} style={{ fontSize: '2rem', fontWeight: 950, letterSpacing: '-0.04em', color: '#1a1a1a', lineHeight: 1.1 }}>
                        Create your <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mastery Account</span>
                    </motion.h2>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: '#ef4444', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 600, background: '#fee2e2', padding: '0.5rem 1rem', borderRadius: '12px' }}
                        >
                            {error}
                        </motion.p>
                    )}
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ y: -3, boxShadow: '0 15px 35px rgba(0,0,0,0.06)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '1.25rem', background: '#fff',
                            color: '#000', fontSize: '1rem', borderRadius: '22px',
                            border: '1px solid rgba(0,0,0,0.08)', fontWeight: 700, gap: '12px',
                            cursor: 'pointer', transition: 'all 0.3s'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        Join with Google
                    </motion.button>
                </div>

                <motion.footer variants={itemVariants} style={{ marginTop: '3.5rem', textAlign: 'center' }}>
                    <p style={{ color: '#777', fontSize: '1rem' }}>
                        Already a member? <span
                            onClick={() => navigate('/login')}
                            style={{ color: 'var(--accent-primary)', fontWeight: 800, cursor: 'pointer', marginLeft: '5px' }}
                        >Login here</span>
                    </p>
                </motion.footer>
            </motion.div>
        </div>
    );
}
