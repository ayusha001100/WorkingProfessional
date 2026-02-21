import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Download, Linkedin, Mail, BookOpen, Copy, Check, Award, Sparkles, Share2, ArrowLeft, Lock as LockIcon, ChevronRight, Zap, Truck } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GEN_AI_COURSE } from '../data/genAiCourse';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';
import PremiumPaywall from '../components/PremiumPaywall';
import HardcopyCheckout from '../components/HardcopyCheckout';

export default function CertificatePage() {
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const certificateRef = useRef(null);
    const [view, setView] = useState('overview'); // 'overview', 'detail', or 'checkout'
    const [selectedCert, setSelectedCert] = useState(null);
    const [showPaywall, setShowPaywall] = useState(false);

    const CERTIFICATES = [
        {
            id: 'beginner',
            title: 'Beginner AI Assistant',
            subtitle: 'Professional Recognition',
            type: 'Foundations',
            levelIds: ['lvl1', 'lvl2'],
            desc: 'Mastered the basics of AI task assistance and individual productivity.',
            unlockDesc: 'Complete Level 1 & 2 to unlock',
            accent: '#ff5722',
            icon: <Award size={32} />
        },
        {
            id: 'advanced',
            title: 'Advanced AI Leader',
            subtitle: 'Expert Recognition',
            type: 'Professional',
            levelIds: ['lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6', 'lvl7', 'lvl8', 'lvl9', 'lvl10', 'lvl11', 'lvl12'],
            desc: 'Demonstrated AI leadership, systems building, and strategic implementation.',
            unlockDesc: 'Complete all 12 Levels to unlock',
            accent: '#8a2be2',
            icon: <Sparkles size={32} />
        }
    ];

    const getModuleProgress = (ids) => {
        const idArray = Array.isArray(ids) ? ids : [ids];
        let totalPercent = 0;
        let allCompleted = true;

        idArray.forEach(id => {
            const subModules = SUB_MODULES_CONTENT[id] || {};
            const totalSubModules = Object.keys(subModules).length;
            const subModuleProgress = userData?.progress?.subModuleProgress?.[id] || {};
            const completedCount = Object.values(subModuleProgress).filter(sm => sm.completed).length;

            const isLevelCompleted = userData?.progress?.moduleProgress?.[id]?.completed || false;

            const allModules = GEN_AI_COURSE.modules;
            const currentIndex = allModules.findIndex(m => m.id === id);
            const nextModule = allModules[currentIndex + 1];
            const nextUnlocked = nextModule ? userData?.progress?.moduleProgress?.[nextModule.id]?.unlocked : false;

            const percent = totalSubModules > 0 ? Math.round((completedCount / totalSubModules) * 100) : 0;
            const isDone = isLevelCompleted || nextUnlocked || (percent >= 75 && totalSubModules > 0);

            totalPercent += percent;
            if (!isDone) allCompleted = false;
        });

        return {
            percent: Math.round(totalPercent / idArray.length),
            isCompleted: allCompleted
        };
    };

    const isUnlocked = (cert) => {
        return getModuleProgress(cert.levelIds).isCompleted;
    };

    const handleSelectCert = (cert) => {
        if (isUnlocked(cert)) {
            setSelectedCert(cert);
            setView('detail');
            window.scrollTo(0, 0);
        }
    };

    const handleDownload = async () => {
        if (certificateRef.current) {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 3,
                useCORS: true,
                backgroundColor: null
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.save(`GenAI_${selectedCert?.title}_Certificate.pdf`);
        }
    };

    const handleLinkedinShare = () => {
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank');
    };

    const studentName = userData?.name || user?.displayName || "AYUSH ARYAN";

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            color: '#0f172a',
            fontFamily: '"Outfit", sans-serif',
            position: 'relative',
            overflowX: 'hidden'
        }}>
            {/* Background Accents */}
            <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,87,34,0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(138,43,226,0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <button
                        onClick={() => {
                            if (view === 'checkout') setView('detail');
                            else if (view === 'detail') setView('overview');
                            else navigate('/track');
                        }}
                        style={{
                            background: '#fff',
                            color: '#64748b',
                            border: '1px solid #e2e8f0',
                            padding: '12px 24px',
                            borderRadius: '16px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.3s',
                            zIndex: 10,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.transform = 'translateX(-5px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                        <ArrowLeft size={18} /> {view === 'overview' ? 'Back to Dashboard' : view === 'checkout' ? 'Back to Certificate' : 'Back to Certification Hub'}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {view === 'overview' ? (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'rgba(255, 87, 34, 0.08)', color: '#ff5722', borderRadius: '100px', fontWeight: 800, fontSize: '0.85rem', marginBottom: '2rem' }}
                                >
                                    <Award size={18} /> YOUR CERTIFICATION HUB
                                </motion.div>
                                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.04em', color: '#0f172a' }}>
                                    Professional <span style={{ color: '#ff5722' }}>AI Credentials</span>
                                </h1>
                                <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                                    Your journey to AI mastery is documented here. Complete levels to unlock verifiable achievements.
                                </p>
                            </header>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
                                {CERTIFICATES.map((cert) => {
                                    const { percent, isCompleted } = getModuleProgress(cert.levelIds);
                                    const unlocked = isCompleted;

                                    return (
                                        <motion.div
                                            key={cert.id}
                                            whileHover={unlocked ? { y: -10, scale: 1.02 } : {}}
                                            onClick={() => handleSelectCert(cert)}
                                            style={{
                                                background: '#ffffff',
                                                borderRadius: '40px',
                                                padding: '3rem',
                                                border: unlocked ? `1px solid rgba(255,87,34,0.2)` : '1px solid #e2e8f0',
                                                position: 'relative',
                                                cursor: unlocked ? 'pointer' : 'default',
                                                transition: 'all 0.4s ease',
                                                overflow: 'hidden',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '2rem',
                                                boxShadow: unlocked ? '0 30px 60px rgba(255,87,34,0.06)' : '0 10px 30px rgba(0,0,0,0.02)'
                                            }}
                                        >
                                            {unlocked && <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '150px', height: '150px', background: cert.accent, opacity: 0.05, filter: 'blur(40px)', borderRadius: '50%' }} />}

                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{
                                                    width: '80px', height: '80px', borderRadius: '24px',
                                                    background: unlocked ? `linear-gradient(135deg, ${cert.accent} 0%, rgba(255,255,255,0) 100%)` : '#f1f5f9',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: unlocked ? '#fff' : '#94a3b8',
                                                    boxShadow: unlocked ? `0 15px 30px ${cert.accent}33` : 'none'
                                                }}>
                                                    {cert.icon}
                                                </div>
                                                {unlocked ? (
                                                    <div style={{ background: '#10b981', color: '#fff', padding: '6px 14px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <Check size={14} /> EARNED
                                                    </div>
                                                ) : (
                                                    <div style={{ background: '#f1f5f9', color: '#64748b', padding: '6px 14px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #e2e8f0' }}>
                                                        <LockIcon size={14} /> LOCKED
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.75rem', color: '#0f172a' }}>{cert.title}</h3>
                                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>
                                                    {unlocked ? cert.desc : cert.unlockDesc}
                                                </p>
                                            </div>

                                            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: unlocked ? cert.accent : '#94a3b8' }}>
                                                    <span>{unlocked ? 'Achievement Unlocked' : 'Course Progress'}</span>
                                                    <span>{percent}%</span>
                                                </div>
                                                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percent}%` }}
                                                        style={{
                                                            height: '100%',
                                                            background: unlocked ? cert.accent : '#cbd5e1',
                                                            borderRadius: '10px'
                                                        }}
                                                    />
                                                </div>
                                                {unlocked && (
                                                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, color: cert.accent }}>
                                                        View Certificate <ChevronRight size={18} />
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : view === 'detail' ? (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255, 87, 34, 0.08)', color: '#ff5722', borderRadius: '100px', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                                    <Sparkles size={16} /> {selectedCert?.subtitle}
                                </div>
                                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', color: '#0f172a' }}>Your Verified Achievement</h1>
                                <p style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 500 }}>Download, share, and showcase your AI expertise to the world.</p>
                            </header>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3.5rem', width: '100%', alignItems: 'start' }}>
                                <div style={{ position: 'relative' }}>
                                    <div
                                        ref={certificateRef}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            background: '#ffffff',
                                            boxShadow: '0 40px 80px rgba(0,0,0,0.15)',
                                            borderRadius: '12px',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <img
                                            src="/assets/certificate_template.png"
                                            style={{ width: '100%', display: 'block' }}
                                            alt="Certificate Template"
                                        />
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                            <div style={{ position: 'absolute', top: '44.3%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '85%' }}>
                                                <h2 style={{ fontSize: 'clamp(1rem, 3.4vw, 2.6rem)', fontWeight: 800, fontStyle: 'italic', color: '#1a1a1a', fontFamily: '"Playfair Display", serif', margin: 0 }}>
                                                    {studentName}
                                                </h2>
                                            </div>
                                            <div style={{ position: 'absolute', bottom: '12.5%', right: '5.2%', textAlign: 'center', width: '200px' }}>
                                                <p style={{ fontSize: 'clamp(0.6rem, 1.5vw, 1.1rem)', fontWeight: 500, color: '#1e293b', fontFamily: '"Outfit", sans-serif', margin: 0 }}>
                                                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
                                        <h3 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Ready to Share?</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <button onClick={handleDownload} style={{ background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)', color: '#fff', border: 'none', padding: '1.4rem', borderRadius: '18px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                                                <Download size={22} /> Download PDF
                                            </button>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <button onClick={handleLinkedinShare} style={{ background: '#0077b5', color: '#fff', border: 'none', padding: '1.2rem', borderRadius: '18px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                    <Linkedin size={20} /> LinkedIn
                                                </button>
                                                <button onClick={() => setView('checkout')} style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '18px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                    <Truck size={20} /> Hardcopy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem' }}>
                                            <Award size={24} color="#ff5722" />
                                            <h4 style={{ margin: 0, fontWeight: 800 }}>Verified Credential</h4>
                                        </div>
                                        <p style={{ color: '#64748b', margin: 0, fontSize: '0.95rem' }}>This is a permanent digital credential accessible from your profile.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <HardcopyCheckout
                            onBack={() => setView('detail')}
                            studentName={studentName}
                            userEmail={user?.email}
                            certificateTitle={selectedCert?.title}
                            certificateImage="/assets/certificate_template.png"
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
