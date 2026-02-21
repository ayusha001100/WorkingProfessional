import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, Sparkles, CheckCircle2, Lock as LockIcon, ChevronRight, Target, Brain, Download, Share2, Rocket, Clock, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function IntelligentRoadmap({ userDomain, experienceLevel, progress }) {
    const { theme } = useTheme();
    const [isAnalyzing, setIsAnalyzing] = useState(!sessionStorage.getItem('hasAnalysedRoadmap'));
    const [loadingStep, setLoadingStep] = useState(0);
    const [milestones, setMilestones] = useState([]);
    const [hoveredId, setHoveredId] = useState(null);

    const steps = [
        "Analyzing progress from yesterday...",
        "Updating your career trajectory...",
        "Identifying high-impact skills",
        "Refining your competitive edge..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsAnalyzing(false);
                        sessionStorage.setItem('hasAnalysedRoadmap', 'true');
                    }, 2000);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [userDomain, experienceLevel]);

    useEffect(() => {
        if (!isAnalyzing) {
            setMilestones([
                { id: 1, title: 'Profile Analysis', status: 'completed', description: 'AI assessment of current career standing.', eta: '30 mins', salaryBoost: 'Unlocked' },
                { id: 2, title: 'Core GEN AI Skills', status: progress > 10 ? 'completed' : 'in-progress', description: 'Mastering LLMs, Prompting & Automation.', eta: '4 days', salaryBoost: '₹5-8 LPA increase potential' },
                { id: 3, title: `${userDomain} AI Workflows`, status: progress > 50 ? 'completed' : (progress > 10 ? 'in-progress' : 'locked'), description: 'Applying AI to domain-specific tasks.', eta: '6 days', salaryBoost: 'Unlock senior leadership roles' },
                { id: 4, title: 'Expert Portfolio', status: progress > 90 ? 'completed' : (progress > 50 ? 'in-progress' : 'locked'), description: 'Showcasing high-impact AI projects.', eta: '5 days', salaryBoost: 'Top 1% bracket qualification' },
                { id: 5, title: 'Job Matching', status: 'locked', description: 'AI-driven placement in top-tier roles.', eta: 'Ongoing', salaryBoost: 'Direct referrals to Fortune 500' }
            ]);
        }
    }, [isAnalyzing, userDomain, progress]);

    return (
        <div style={{
            width: '340px',
            background: theme === 'light' ? '#fff' : '#121212',
            borderRadius: '32px',
            padding: '2.5rem',
            border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid #1f1f1f',
            height: 'fit-content',
            position: 'sticky',
            top: '100px',
            boxShadow: theme === 'light' ? '0 20px 40px rgba(0,0,0,0.03)' : '0 20px 40px rgba(0,0,0,0.3)',
            zIndex: 10
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ background: '#1a1a1a', color: '#fff', padding: '10px', borderRadius: '14px' }}>
                        <Orbit size={24} className="animate-spin-slow" />
                    </div>
                    {!isAnalyzing && (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ position: 'absolute', top: -4, right: -4, width: '12px', height: '12px', background: '#22c55e', borderRadius: '50%', border: '2px solid #fff' }}
                        />
                    )}
                </div>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>AI Career Co-Pilot</h3>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ff5722', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Sparkles size={12} /> Live Career Optimization
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isAnalyzing ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ padding: '2rem 0', textAlign: 'center' }}
                    >
                        <div style={{ width: '60px', height: '60px', border: '4px solid #f1f5f9', borderTopColor: '#ff5722', borderRadius: '50%', margin: '0 auto 2rem' }} className="animate-spin" />
                        <motion.p
                            key={loadingStep}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 700, fontStyle: 'italic' }}
                        >
                            {steps[loadingStep]}
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        {milestones.map((m, idx) => {
                            const isActive = m.status === 'in-progress';
                            return (
                                <motion.div
                                    key={m.id}
                                    onHoverStart={() => setHoveredId(m.id)}
                                    onHoverEnd={() => setHoveredId(null)}
                                    style={{ display: 'flex', gap: '1.2rem', position: 'relative', cursor: 'pointer' }}
                                >
                                    {idx !== milestones.length - 1 && (
                                        <div style={{
                                            position: 'absolute',
                                            left: '12px',
                                            top: '30px',
                                            bottom: '-20px',
                                            width: '2px',
                                            background: m.status === 'completed' ? '#ff5722' : '#f1f5f9'
                                        }} />
                                    )}

                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <div style={{
                                            width: '26px',
                                            height: '26px',
                                            borderRadius: '50%',
                                            background: m.status === 'completed' ? '#ff5722' : (m.status === 'in-progress' ? '#fff' : '#f8fafc'),
                                            border: `2px solid ${m.status === 'completed' ? '#ff5722' : (m.status === 'in-progress' ? '#ff5722' : '#e2e8f0')}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: m.status === 'completed' ? '#fff' : '#ff5722',
                                            boxShadow: isActive ? '0 0 15px rgba(255, 87, 34, 0.4)' : 'none'
                                        }}>
                                            {m.status === 'completed' ? <CheckCircle2 size={16} /> : (m.status === 'locked' ? <LockIcon size={12} color="#94a3b8" /> : (
                                                <motion.div
                                                    animate={{ scale: [1, 1.4, 1] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                    style={{ width: '8px', height: '8px', background: '#ff5722', borderRadius: '50%' }}
                                                />
                                            ))}
                                        </div>

                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                style={{ position: 'absolute', left: '-80px', top: '4px', background: '#ff5722', color: '#fff', fontSize: '0.6rem', fontWeight: 900, padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}
                                            >
                                                You are here
                                            </motion.div>
                                        )}
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                                            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: m.status === 'locked' ? '#94a3b8' : '#1e293b' }}>{m.title}</h4>
                                            {m.eta && m.status !== 'locked' && (
                                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                                                    <Clock size={10} /> {m.eta}
                                                </span>
                                            )}
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: 500, lineHeight: 1.4 }}>{m.description}</p>

                                        <AnimatePresence>
                                            {hoveredId === m.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    style={{ marginTop: '8px', overflow: 'hidden' }}
                                                >
                                                    <div style={{ background: '#fff9f6', border: '1px solid #ff572244', padding: '8px 12px', borderRadius: '12px' }}>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ff5722', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                            <Target size={12} /> {m.salaryBoost}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}

                        <div style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, #1a1a1a 0%, #334155 100%)', padding: '1.5rem', borderRadius: '20px', color: '#fff' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ff5722', marginBottom: '8px', textTransform: 'uppercase' }}>Next Recommended Action</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Complete Prompt Engineering Mastery to increase job match score by +18%</div>
                            <button style={{ width: '100%', background: '#ff5722', border: 'none', color: '#fff', padding: '0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                START NOW <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
