import React, { useRef, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Download, Linkedin, Mail, BookOpen, Copy, Check, Award, Sparkles, Share2, ArrowLeft, Lock as LockIcon, ChevronRight, Zap } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { GEN_AI_COURSE } from '../data/genAiCourse';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';

export default function CertificatePage() {
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const certificateRef = useRef(null);
    const [view, setView] = useState('overview'); // 'overview' or 'detail'
    const [selectedCert, setSelectedCert] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const CERTIFICATES = [
        {
            id: 'beginner',
            title: 'Beginner AI Assistant',
            subtitle: 'Professional Recognition',
            type: 'Foundations',
            levelId: 'lvl1',
            desc: 'Mastered the basics of AI task assistance and individual productivity.',
            unlockDesc: 'Complete Level 1 to unlock',
            accent: '#ff5722',
            icon: <Award size={32} />
        },
        {
            id: 'advanced',
            title: 'Advanced AI Leader',
            subtitle: 'Expert Recognition',
            type: 'Professional',
            levelId: 'lvl12',
            desc: 'Demonstrated AI leadership, systems building, and strategic implementation.',
            unlockDesc: 'Complete all 12 Levels to unlock',
            accent: '#8a2be2',
            icon: <Sparkles size={32} />
        }
    ];

    const getModuleProgress = (levelId) => {
        const subModules = SUB_MODULES_CONTENT[levelId] || {};
        const totalSubModules = Object.keys(subModules).length;
        const subModuleProgress = userData?.progress?.subModuleProgress?.[levelId] || {};
        const completedCount = Object.values(subModuleProgress).filter(sm => sm.completed).length;

        const isLevelCompleted = userData?.progress?.moduleProgress?.[levelId]?.completed || false;

        // Also check if NEXT level is unlocked, which means this one MUST be done
        const allModules = GEN_AI_COURSE.modules;
        const currentIndex = allModules.findIndex(m => m.id === levelId);
        const nextModule = allModules[currentIndex + 1];
        const nextUnlocked = nextModule ? userData?.progress?.moduleProgress?.[nextModule.id]?.unlocked : false;

        const percent = totalSubModules > 0 ? Math.round((completedCount / totalSubModules) * 100) : 0;

        return {
            percent,
            isCompleted: isLevelCompleted || nextUnlocked || (percent >= 75 && totalSubModules > 0)
        };
    };

    const isUnlocked = (cert) => {
        return getModuleProgress(cert.levelId).isCompleted;
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

    const studentName = userData?.name || user?.displayName || "AYUSH ARYAN";
    const dateStr = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8fafc',
            color: '#0f172a',
            fontFamily: '"Outfit", sans-serif',
            position: 'relative',
            overflowX: 'hidden'
        }}>
            {/* Background Accents - Subtler for light mode */}
            <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,87,34,0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(138,43,226,0.03) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <button
                        onClick={() => view === 'overview' ? navigate('/track') : setView('overview')}
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
                        <ArrowLeft size={18} /> {view === 'overview' ? 'Back to Dashboard' : 'Back to Certification Hub'}
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
                                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-0.04em', color: '#0f172a' }}>
                                    Professional <span style={{ color: '#ff5722' }}>AI Credentials</span>
                                </h1>
                                <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                                    Your journey to AI mastery is documented here. Complete levels to unlock verifiable achievements.
                                </p>
                            </header>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
                                {CERTIFICATES.map((cert) => {
                                    const { percent, isCompleted } = getModuleProgress(cert.levelId);
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
                                            {/* Card Glow */}
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
                    ) : (
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

                                {/* Certificate Container */}
                                <div style={{ position: 'relative' }}>
                                    <div
                                        ref={certificateRef}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            aspectRatio: '1.414 / 1',
                                            background: '#fff',
                                            borderRadius: '4px',
                                            boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
                                            overflow: 'hidden',
                                            color: '#1a1a1a'
                                        }}
                                    >
                                        {/* Main Border Design */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '20px', left: '20px', right: '20px', bottom: '20px',
                                            border: '2px solid #e5e7eb',
                                            pointerEvents: 'none'
                                        }} />

                                        {/* Certificate Design (Screenshot Replica) */}
                                        <div style={{ height: '100%', padding: '4rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                                            {/* Header */}
                                            <div style={{ marginBottom: '2.5rem' }}>
                                                <h4 style={{
                                                    margin: 0,
                                                    fontSize: '0.9rem',
                                                    letterSpacing: '0.4em',
                                                    color: '#64748b',
                                                    fontWeight: 700,
                                                    textTransform: 'uppercase'
                                                }}>
                                                    Certificate of Participation
                                                </h4>
                                            </div>

                                            {/* Salutation */}
                                            <p style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', color: '#64748b', fontStyle: 'italic', fontFamily: '"Playfair Display", serif' }}>
                                                This is to certify that
                                            </p>

                                            {/* Name */}
                                            <h1 style={{
                                                margin: '0 0 1.5rem 0',
                                                fontSize: '3.5rem',
                                                fontWeight: 900,
                                                color: '#1a1a1a',
                                                fontFamily: '"Outfit", sans-serif',
                                                letterSpacing: '-0.02em',
                                                textTransform: 'uppercase'
                                            }}>
                                                {studentName}
                                            </h1>

                                            {/* Description */}
                                            <div style={{ maxWidth: '80%', margin: '0 auto 3rem auto' }}>
                                                <p style={{
                                                    fontSize: '1.2rem',
                                                    lineHeight: 1.6,
                                                    color: '#334155',
                                                    margin: 0
                                                }}>
                                                    has participated in the <strong>{selectedCert.id === 'beginner' ? 'Generative AI Foundation Masterclass' : 'Advanced Generative AI Leadership Masterclass'}</strong>, conducted jointly by <strong>LetsUpgrade</strong> and <strong>ITM Skills University</strong>, powered by <strong>LISA AI</strong>.
                                                </p>
                                            </div>

                                            {/* Logos */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '4rem',
                                                marginTop: 'auto',
                                                marginBottom: '3rem'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <img src="/logo.png" alt="LetsUpgrade" style={{ height: '45px', objectFit: 'contain' }} />
                                                    <div style={{ borderLeft: '1px solid #e2e8f0', height: '30px' }} />
                                                    <span style={{ fontWeight: 900, fontSize: '1.1rem' }}>Lets<span style={{ color: '#ff5722' }}>Upgrade</span></span>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div style={{ textAlign: 'left' }}>
                                                        <div style={{ fontWeight: 800, fontSize: '0.8rem', lineHeight: 1 }}>ITM SKILLS</div>
                                                        <div style={{ fontWeight: 500, fontSize: '0.7rem', color: '#64748b' }}>UNIVERSITY</div>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <Zap size={24} color="#ff5722" fill="#ff5722" />
                                                    <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.1em' }}>LISA AI</span>
                                                </div>
                                            </div>

                                            {/* Date and ID */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 2rem' }}>
                                                <div style={{ textAlign: 'left' }}>
                                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Date</div>
                                                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1a1a1a' }}>{dateStr}</div>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Certificate ID</div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a', fontFamily: 'monospace' }}>LU-2026-{(Math.random() * 10000).toFixed(0).padStart(4, '0')}</div>
                                                </div>
                                            </div>

                                            {/* Footer decorative line */}
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '8px',
                                                background: selectedCert.accent
                                            }} />
                                        </div>
                                    </div>

                                    {/* Particle Effect Overlay */}
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', pointerEvents: 'none', zIndex: -1 }}>
                                        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '10px', height: '10px', background: '#ff5722', borderRadius: '50%', opacity: 0.1 }} />
                                        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '15px', height: '15px', background: '#8a2be2', borderRadius: '50%', opacity: 0.05 }} />
                                        <div style={{ position: 'absolute', top: '60%', right: '15%', width: '8px', height: '8px', background: '#FFD700', borderRadius: '50%', opacity: 0.2 }} />
                                    </div>
                                </div>

                                {/* Achievement Details Sidebar */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                                    {/* Share Card */}
                                    <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                                        <h3 style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Ready to Share?</h3>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            <button
                                                onClick={handleDownload}
                                                style={{
                                                    background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                                    color: '#fff', border: 'none', padding: '1.4rem', borderRadius: '18px',
                                                    fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                                                    boxShadow: '0 15px 30px rgba(255, 87, 34, 0.3)',
                                                    transition: 'all 0.3s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <Download size={22} /> Download high-res PDF
                                            </button>

                                            <div style={{ height: '1px', background: '#f1f5f9', margin: '0.5rem 0' }} />

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                <button style={{ background: '#0077b5', color: '#fff', border: 'none', padding: '1.2rem', borderRadius: '18px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                    <Linkedin size={20} /> LinkedIn
                                                </button>
                                                <button style={{ background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', padding: '1.2rem', borderRadius: '18px', fontWeight: 800, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                    <Share2 size={20} /> Socials
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Verification Card */}
                                    <div style={{ background: '#f8fafc', padding: '2.5rem', borderRadius: '32px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            <div style={{ background: '#ff5722', padding: '8px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(255, 87, 34, 0.2)' }}>
                                                <Award size={24} color="#fff" />
                                            </div>
                                            <h4 style={{ color: '#0f172a', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Verified Credential</h4>
                                        </div>
                                        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                                            This is a permanent, verifiable digital credential. You can always access this from your Learning Mirror profile.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
