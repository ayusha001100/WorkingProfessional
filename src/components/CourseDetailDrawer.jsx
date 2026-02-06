import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, Lock as LockIcon, CheckCircle2, Rocket, Briefcase, BookOpen, Settings, Zap, Target, Code, Lightbulb, PlayCircle, Image, Video, Film, Bot, Workflow, Users, MessageSquare, Eye, Sparkles, Layers, FileText, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';

export default function CourseDetailDrawer({ isOpen, onClose, module, index, isUnlocked, isCompleted, isCurrent, isPremium, userData, userDomain }) {
    const { theme } = useTheme();
    const navigate = useNavigate();

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    if (!module) return null;

    const contentVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 + (i * 0.05),
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
            }
        })
    };

    const drawerContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - covers entire viewport including header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: theme === 'light' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.3)',
                            zIndex: 1000,
                            backdropFilter: 'blur(6px)',
                            WebkitBackdropFilter: 'blur(6px)',
                            // Ensure it covers header (z-index 90)
                            pointerEvents: 'auto'
                        }}
                    />

                    {/* Modal */}
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1001,
                        pointerEvents: 'none',
                        padding: '1.5rem'
                    }}>
                        <motion.div
                            layoutId={module.id}
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                                mass: 0.8
                            }}
                            style={{
                                width: '560px',
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                background: theme === 'light' ? '#ffffff' : '#121212',
                                borderRadius: '24px',
                                boxShadow: theme === 'light'
                                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                                    : '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                                overflowY: 'auto',
                                border: theme === 'light' ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.06)',
                                pointerEvents: 'auto',
                                position: 'relative'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div style={{
                                padding: '1.5rem',
                                borderBottom: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                position: 'sticky',
                                top: 0,
                                background: theme === 'light' ? '#ffffff' : '#121212',
                                zIndex: 10
                            }}>
                                <motion.div
                                    custom={0}
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: isUnlocked ? (theme === 'light' ? '#fff0e6' : 'rgba(255, 87, 34, 0.1)') : (theme === 'light' ? '#f1f5f9' : '#1a1a1a'),
                                        color: isUnlocked ? '#ff5722' : '#94a3b8',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        {isCompleted ? <CheckCircle2 size={20} color="#10b981" /> : (isUnlocked ? <Rocket size={20} /> : <LockIcon size={18} />)}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Level {(index + 1).toString().padStart(2, '0')}
                                        </div>
                                        <motion.h2
                                            key={`drawer-title-${userDomain}`}
                                            initial={{ opacity: 0.95 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                            style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}
                                        >
                                            {module.shortTitle || module.title}
                                            {userDomain && userDomain !== 'Aspiring Pro' && userDomain !== 'Social Media Manager' && (
                                                <motion.span
                                                    key={`drawer-domain-${userDomain}`}
                                                    initial={{ opacity: 0, x: -4 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.15 }}
                                                    style={{
                                                        fontSize: '0.85em',
                                                        fontWeight: 500,
                                                        color: theme === 'light' ? '#64748b' : '#94a3b8',
                                                        marginLeft: '0.5rem'
                                                    }}
                                                >
                                                    {' '}for {userDomain}s
                                                </motion.span>
                                            )}
                                        </motion.h2>
                                    </div>
                                </motion.div>
                                <button
                                    onClick={onClose}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: theme === 'light' ? '#f1f5f9' : '#1a1a1a',
                                        color: 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = theme === 'light' ? '#e2e8f0' : '#2a2a2a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = theme === 'light' ? '#f1f5f9' : '#1a1a1a';
                                    }}
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '1.5rem' }}>
                                {/* Status Badge */}
                                <motion.div custom={1} variants={contentVariants} initial="hidden" animate="visible" style={{ marginBottom: '2rem' }}>
                                    {isCurrent ? (
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            background: '#10b981',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>
                                            <Rocket size={14} /> In Progress
                                        </div>
                                    ) : isPremium && !userData?.isPremium ? (
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            background: theme === 'light' ? '#1a1a1a' : '#334155',
                                            color: '#FFD700',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>
                                            <LockIcon size={14} /> Premium
                                        </div>
                                    ) : isCompleted ? (
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            background: '#10b981',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>
                                            <CheckCircle2 size={14} /> Completed
                                        </div>
                                    ) : (
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem 1rem',
                                            background: theme === 'light' ? '#f1f5f9' : '#1a1a1a',
                                            color: '#94a3b8',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>
                                            <LockIcon size={14} /> Locked
                                        </div>
                                    )}
                                </motion.div>

                                {/* Outcome */}
                                {module.outcome && (
                                    <motion.div custom={2} variants={contentVariants} initial="hidden" animate="visible" style={{ marginBottom: '2rem' }}>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                            Outcome
                                        </div>
                                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.6 }}>
                                            {module.outcome}
                                        </p>
                                    </motion.div>
                                )}

                                <motion.div
                                    custom={3}
                                    variants={contentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    style={{
                                        background: theme === 'light' ? '#f8f9fa' : '#1a1a1a',
                                        padding: '1.25rem',
                                        borderRadius: '12px',
                                        marginBottom: '2rem',
                                        border: theme === 'light' ? '1px solid #e5e7eb' : '1px solid #2a2a2a'
                                    }}
                                >
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                        You Become
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                        {module.youBecome.replace('[Role]', userDomain)}
                                    </p>
                                </motion.div>

                                {/* Sub-modules / Topic Mastery */}
                                <motion.div custom={4} variants={contentVariants} initial="hidden" animate="visible" style={{ marginBottom: '2rem' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                                        Topic Mastery
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {Object.values(SUB_MODULES_CONTENT[module.id] || {}).map((sm, smIdx) => {
                                            const smProgress = userData?.progress?.subModuleProgress?.[module.id]?.[sm.id];
                                            const smCompleted = smProgress?.completed;

                                            return (
                                                <div
                                                    key={sm.id}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        padding: '0.75rem 1rem',
                                                        background: theme === 'light' ? '#fff' : '#1e1e1e',
                                                        borderRadius: '10px',
                                                        border: theme === 'light'
                                                            ? `1px solid ${smCompleted ? '#10b98133' : '#f1f5f9'}`
                                                            : `1px solid ${smCompleted ? '#10b98133' : '#2a2a2a'}`,
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        background: smCompleted ? '#10b981' : (theme === 'light' ? '#f1f5f9' : '#2a2a2a'),
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#fff',
                                                        flexShrink: 0
                                                    }}>
                                                        {smCompleted ? (
                                                            <Check size={12} strokeWidth={4} />
                                                        ) : (
                                                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#94a3b8' }} />
                                                        )}
                                                    </div>
                                                    <span style={{
                                                        fontSize: '0.85rem',
                                                        fontWeight: 500,
                                                        color: smCompleted
                                                            ? (theme === 'light' ? '#059669' : '#10b981')
                                                            : (theme === 'light' ? '#4b5563' : '#94a3b8')
                                                    }}>
                                                        {sm.title.replace(/^\d+\.\s*/, '')}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>




                                {/* CTA */}
                                {isUnlocked && (
                                    <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible">
                                        <motion.button
                                            onClick={() => {
                                                navigate(`/level/${module.id}/learn`);
                                                onClose();
                                            }}
                                            whileHover={{ y: -1 }}
                                            whileTap={{ scale: 0.98 }}
                                            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                                            style={{
                                                width: '100%',
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: isCompleted ? '#10b981' : '#ff5722',
                                                color: '#fff',
                                                fontSize: '0.9rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                boxShadow: isCompleted ? '0 2px 8px rgba(16, 185, 129, 0.25)' : '0 2px 8px rgba(255, 87, 34, 0.25)'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = isCompleted ? '#059669' : '#ff6b3d';
                                                e.currentTarget.style.boxShadow = isCompleted ? '0 4px 12px rgba(16, 185, 129, 0.35)' : '0 4px 12px rgba(255, 87, 34, 0.35)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = isCompleted ? '#10b981' : '#ff5722';
                                                e.currentTarget.style.boxShadow = isCompleted ? '0 2px 8px rgba(16, 185, 129, 0.25)' : '0 2px 8px rgba(255, 87, 34, 0.25)';
                                            }}
                                        >
                                            {isCompleted ? 'Revisit Level' : 'Start Learning'}
                                            <motion.div
                                                whileHover={{ x: 3 }}
                                                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                                            >
                                                <ArrowRight size={16} />
                                            </motion.div>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    // Render via portal to document.body to ensure proper stacking
    return isOpen ? createPortal(drawerContent, document.body) : null;
}
