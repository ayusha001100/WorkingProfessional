import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Map, FileCode, UserCheck, MessageSquare, Users, Play, GraduationCap, Briefcase, UserSearch, Star, ChevronRight, X, Globe, Rocket, Laptop, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const features = [
    { icon: <Map size={24} />, title: 'Community + Weekly Sessions', desc: 'Learn together, stay consistent, ship faster.' },
    { icon: <FileCode size={24} />, title: 'Personalized Career Roadmap', desc: 'A short diagnostic builds your path for promotion or switch' },
    { icon: <UserCheck size={24} />, title: 'Proof-of-Work Projects', desc: 'Real-world projects that become portfolio proof.' },
    { icon: <MessageSquare size={24} />, title: 'Resume + LinkedIn Rebuild', desc: 'Position your experience for better roles—updated as you grow.' },
    { icon: <Users size={24} />, title: 'Interview Prep + 1:1 Mentorship', desc: 'Mock interviews, feedback, and expert guidance to close offers' },
];



export default function GsapHero() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const component = useRef(null);
    const titleLinesRef = useRef([]);
    const subRef = useRef(null);
    const marqueeRef = useRef(null);
    const btnContainerRef = useRef(null);
    const badgeRef = useRef(null);
    const [outcomeIndex, setOutcomeIndex] = useState(0);
    const [showSelectionModal, setShowSelectionModal] = useState(false);
    const [step, setStep] = useState(1);
    const [selectionData, setSelectionData] = useState({ type: '', ctc: '' });

    const outcomes = ["PROMOTION", "BETTER ROLE", "SALARY JUMP", "LEADERSHIP ROLE"];

    const selectionOptions = [
        {
            id: 'student',
            title: "Student",
            desc: "In college, building foundations.",
            icon: <GraduationCap size={24} />,
            color: 'var(--accent-primary)'
        },
        {
            id: 'fresher',
            title: "Fresher",
            desc: "Recent grad hunting for first break.",
            icon: <UserSearch size={24} />,
            color: '#00bcd4'
        },
        {
            id: 'professional',
            title: "Professional",
            desc: "Experienced, seeking growth.",
            icon: <Briefcase size={24} />,
            color: '#e91e63'
        }
    ];

    const goalOptions = [
        { id: 'maang', title: "Top Tech (MAANG)", desc: "Product-based giants", icon: <Globe size={24} />, color: '#4285F4' },
        { id: 'startup', title: "High-Growth Startup", desc: "Fast-paced & equity", icon: <Rocket size={24} />, color: '#FF5722' },
        { id: 'remote', title: "Global / Remote", desc: "USD/Euro jobs", icon: <Laptop size={24} />, color: '#00C853' },
        { id: 'leadership', title: "AI Leadership", desc: "Manager/Lead roles", icon: <TrendingUp size={24} />, color: '#673AB7' },
    ];

    const handleSelection = (type) => {
        setSelectionData(prev => ({ ...prev, type }));
        completeSelection(type);
    };



    const handleGoalSelection = (goal) => {
        setSelectionData(prev => ({ ...prev, goal }));
        // Logic for goal selection if needed
    };

    const completeSelection = (type, ctc = '') => {
        localStorage.setItem('userType', type);
        if (ctc) localStorage.setItem('userCtc', ctc);

        if (type === 'student' || type === 'fresher') {
            window.location.href = 'https://letsupgrade.in/';
        } else {
            navigate(user ? '/track' : '/login?redirect=/track');
        }
    };

    // Reset modal state when closed or opened
    useEffect(() => {
        if (!showSelectionModal) {
            // Wait for animation to finish then reset
            const timer = setTimeout(() => {
                setStep(1);
                setSelectionData({ type: '', ctc: '' });
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [showSelectionModal]);

    useEffect(() => {
        const interval = setInterval(() => {
            setOutcomeIndex((prev) => (prev + 1) % outcomes.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(badgeRef.current, {
                y: 20,
                opacity: 0,
                duration: 1,
                delay: 0.2
            })
                .from(titleLinesRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1
                }, "-=0.8")
                .from(subRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 1
                }, "-=0.8")
                .from(marqueeRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 1
                }, "-=0.8")
                .from(btnContainerRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 1
                }, "-=0.8");

            // Subtle breathing background - Professional & Clean
            gsap.to(".bg-blob", {
                scale: 1.1,
                opacity: 0.08,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    amount: 4,
                }
            });

        }, component);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={component} style={{
            position: 'relative', minHeight: '100vh', width: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '120px 5% 80px 5%', overflow: 'hidden',
            background: 'var(--bg-primary)'
        }}>
            {/* Premium Grid Background */}
            <div className="grid-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.4, zIndex: 0, pointerEvents: 'none' }} />

            {/* Dynamic Background Blobs */}
            <div className="bg-blob" style={{ position: 'absolute', top: '-20%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 60%)', opacity: 0.15, filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }} />
            <div className="bg-blob" style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 60%)', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />
            <div className="bg-blob" style={{ position: 'absolute', top: '40%', left: '30%', width: '400px', height: '400px', background: 'radial-gradient(circle, #9c27b0 0%, transparent 60%)', opacity: 0.08, filter: 'blur(90px)', borderRadius: '50%', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px' }}>
                <div
                    ref={badgeRef}
                    className="glass"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
                        padding: '0.6rem 1.4rem', borderRadius: '50px',
                        marginBottom: '2.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)',
                        fontWeight: 600, letterSpacing: '0.05em',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }} />
                    <span>Work. Grow. Lead.</span>
                </div>

                <h1 style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: '0.95', marginBottom: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                    <div ref={el => titleLinesRef.current[0] = el} style={{ overflow: 'hidden' }}>
                        GET YOUR NEXT
                    </div>
                    <div ref={el => titleLinesRef.current[1] = el} style={{ overflow: 'hidden', paddingBottom: '0.1em' }}>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={outcomeIndex}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{
                                    background: 'var(--accent-gradient)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitFillColor: 'transparent',
                                    color: 'transparent',
                                    display: 'inline-block',
                                    paddingRight: '0.1em'
                                }}
                            >
                                {outcomes[outcomeIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </h1>

                <p ref={subRef} style={{
                    fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                    color: 'var(--text-muted)',
                    maxWidth: '850px',
                    margin: '0 auto 3.5rem auto',
                    lineHeight: '1.6',
                    fontWeight: 400
                }}>
                    Even if you’re starting from scratch, you’ll use AI like it’s part of your job—because it is. A practical path with tools, workflows, and projects heavy. <p><span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Built for Non-Tech working professionals, No coding required.</span></p>
                </p>

                {/* Refined Feature Marquee - Slower & Cleaner */}
                <div ref={marqueeRef} style={{ width: '100%', overflow: 'hidden', marginBottom: '4rem', position: 'relative', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                    <motion.div
                        style={{ display: 'flex', gap: '1.5rem', width: 'max-content', padding: '1rem' }}
                        animate={{ x: [0, -1000] }}
                        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                    >
                        {[...features, ...features, ...features].map((item, idx) => (
                            <div key={idx} className="glass-card" style={{
                                width: '280px',
                                padding: '1.8rem',
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                opacity: 0.9,
                            }}>
                                <div style={{
                                    color: 'var(--text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '0.2rem'
                                }}>
                                    <div style={{ padding: '8px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '10px', color: 'var(--accent-primary)' }}>
                                        {React.cloneElement(item.icon, { size: 22 })}
                                    </div>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</h3>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div ref={btnContainerRef} style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setShowSelectionModal(true)}
                        className="btn-primary"
                        style={{
                            padding: '1.2rem 3rem',
                            fontSize: '1.1rem',
                            borderRadius: '16px',
                        }}
                    >
                        Get Started <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => window.location.href = 'https://pages.razorpay.com/pl_S7Hmm9y3KCV723/view'}
                        className="glass"
                        style={{
                            padding: '1.2rem 3rem',
                            fontSize: '1.1rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 87, 34, 0.2)',
                            background: 'rgba(255, 87, 34, 0.04)',
                            color: '#FF5722',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            transition: 'all 0.3s ease'
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

            {/* Selection Popup Modal - Premium Enhanced Design */}
            <AnimatePresence>
                {showSelectionModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.75)', zIndex: 9999,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backdropFilter: 'blur(12px)', padding: '1rem'
                        }}
                        onClick={() => setShowSelectionModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%', maxWidth: '750px',
                                background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                                borderRadius: '32px',
                                padding: '0',
                                position: 'relative',
                                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.5)',
                                color: '#1a1a1a',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Animated Background Gradient */}
                            <motion.div
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 20% 20%, rgba(255, 87, 34, 0.08) 0%, transparent 50%)',
                                        'radial-gradient(circle at 80% 80%, rgba(255, 87, 34, 0.08) 0%, transparent 50%)',
                                        'radial-gradient(circle at 20% 20%, rgba(255, 87, 34, 0.08) 0%, transparent 50%)',
                                    ]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    pointerEvents: 'none',
                                    zIndex: 0
                                }}
                            />

                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setShowSelectionModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.05)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    zIndex: 10,
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <X size={20} color="#666" />
                            </motion.button>

                            <div style={{ padding: '3rem', position: 'relative', zIndex: 1 }}>
                                {/* Header Section with Icon */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    style={{ marginBottom: '2.5rem' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1rem' }}>
                                        <motion.div
                                            animate={{
                                                boxShadow: [
                                                    '0 0 0 0 rgba(255, 87, 34, 0.4)',
                                                    '0 0 0 8px rgba(255, 87, 34, 0)',
                                                    '0 0 0 0 rgba(255, 87, 34, 0)'
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            style={{
                                                width: '56px', height: '56px',
                                                background: 'linear-gradient(135deg, #ff5722 0%, #ff7043 100%)',
                                                borderRadius: '16px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#ffffff',
                                                boxShadow: '0 8px 24px rgba(255, 87, 34, 0.3)'
                                            }}
                                        >
                                            <Briefcase size={28} />
                                        </motion.div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ff5722', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                                                Step 1 of 1
                                            </div>
                                            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
                                                Role Identification
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div style={{
                                        width: '100%',
                                        height: '4px',
                                        background: 'rgba(0,0,0,0.05)',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <motion.div
                                            initial={{ width: '0%' }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            style={{
                                                height: '100%',
                                                background: 'linear-gradient(90deg, #ff5722 0%, #ff7043 100%)',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, delay: 0.15 }}
                                >
                                    <h2 style={{
                                        fontSize: '2.2rem',
                                        fontWeight: 800,
                                        marginBottom: '0.6rem',
                                        color: '#111827',
                                        fontFamily: 'var(--font-heading)',
                                        lineHeight: '1.2'
                                    }}>
                                        Which describes you best?
                                    </h2>
                                    <p style={{
                                        color: '#6b7280',
                                        marginBottom: '2.5rem',
                                        fontSize: '1.05rem',
                                        lineHeight: '1.6'
                                    }}>
                                        Select your current career stage to get personalized recommendations.
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                        {selectionOptions.map((opt, idx) => (
                                            <motion.button
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + idx * 0.1 }}
                                                whileHover={{
                                                    scale: 1.02,
                                                    boxShadow: '0 12px 32px rgba(255, 87, 34, 0.15)',
                                                    borderColor: '#ff5722'
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSelection(opt.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1.5rem',
                                                    padding: '1.5rem',
                                                    background: '#ffffff',
                                                    border: '2px solid #e5e7eb',
                                                    borderRadius: '20px',
                                                    cursor: 'pointer',
                                                    textAlign: 'left',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    width: '100%',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {/* Hover Gradient Effect */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0, left: 0, right: 0, bottom: 0,
                                                        background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.03) 0%, rgba(255, 112, 67, 0.03) 100%)',
                                                        pointerEvents: 'none'
                                                    }}
                                                />

                                                <motion.div
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                    style={{
                                                        padding: '14px',
                                                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                                                        borderRadius: '14px',
                                                        color: opt.color || '#4b5563',
                                                        position: 'relative',
                                                        zIndex: 1
                                                    }}
                                                >
                                                    {React.cloneElement(opt.icon, { size: 24 })}
                                                </motion.div>

                                                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                                                    <h3 style={{
                                                        fontSize: '1.2rem',
                                                        fontWeight: 700,
                                                        color: '#1f2937',
                                                        marginBottom: '0.3rem',
                                                        letterSpacing: '-0.01em'
                                                    }}>
                                                        {opt.title}
                                                    </h3>
                                                    <p style={{
                                                        fontSize: '0.95rem',
                                                        color: '#6b7280',
                                                        lineHeight: '1.5'
                                                    }}>
                                                        {opt.desc}
                                                    </p>
                                                </div>

                                                <motion.div
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                    style={{ position: 'relative', zIndex: 1 }}
                                                >
                                                    <ChevronRight size={24} color="#9ca3af" />
                                                </motion.div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Footer Note */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    style={{
                                        marginTop: '2rem',
                                        padding: '1rem',
                                        background: 'rgba(255, 87, 34, 0.05)',
                                        borderRadius: '12px',
                                        borderLeft: '3px solid #ff5722'
                                    }}
                                >
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: '#6b7280',
                                        margin: 0,
                                        lineHeight: '1.5'
                                    }}>
                                        <strong style={{ color: '#1f2937' }}>💡 Pro Tip:</strong> Your selection helps us customize your learning journey and career roadmap.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Minimal Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3, y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}
            >
                <div style={{ width: '1px', height: '40px', background: 'var(--text-muted)' }} />
            </motion.div>
        </div>
    );
}

