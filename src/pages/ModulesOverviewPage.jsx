import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lock as LockIcon, CheckCircle2, PlayCircle, ChevronRight, Rocket, BookOpen, Target, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

// Module data structure
const moduleData = [
    {
        id: 1,
        number: '01',
        title: 'Introduction & AI Basics',
        description: 'Understand what Gen AI really is and how it works',
        icon: BookOpen,
        color: '#3b82f6',
        estimatedTime: '45 min'
    },
    {
        id: 2,
        number: '02',
        title: 'How GenAI Works (Technical)',
        description: 'Deep dive into ML, Neural Networks, and LLMs',
        icon: Target,
        color: '#8b5cf6',
        estimatedTime: '60 min'
    },
    {
        id: 3,
        number: '03',
        title: 'Key Concepts (Tokens & Limits)',
        description: 'Master tokens, context windows, and hallucinations',
        icon: Zap,
        color: '#ec4899',
        estimatedTime: '40 min'
    },
    {
        id: 4,
        number: '04',
        title: 'Capabilities & Limitations',
        description: 'Learn what AI can and cannot do effectively',
        icon: Rocket,
        color: '#f59e0b',
        estimatedTime: '50 min'
    },
    {
        id: 5,
        number: '05',
        title: 'Prompt Engineering',
        description: 'Write effective prompts to get better results',
        icon: BookOpen,
        color: '#10b981',
        estimatedTime: '55 min'
    },
    {
        id: 6,
        number: '06',
        title: 'Model Settings',
        description: 'Understand temperature, tokens, and other parameters',
        icon: Target,
        color: '#06b6d4',
        estimatedTime: '40 min'
    },
    {
        id: 7,
        number: '07',
        title: 'Applications & Tools',
        description: 'Explore ChatGPT, Gemini, and other AI tools',
        icon: Zap,
        color: '#f43f5e',
        estimatedTime: '45 min'
    },
    {
        id: 8,
        number: '08',
        title: 'Practice & Takeaways',
        description: 'Hands-on exercises and key learnings',
        icon: Rocket,
        color: '#6366f1',
        estimatedTime: '50 min'
    }
];

export default function ModulesOverviewPage() {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { userData } = useAuth();
    const isDark = theme === 'dark';

    // Track which modules are unlocked
    const [unlockedModules, setUnlockedModules] = useState([1]);

    useEffect(() => {
        if (userData?.progress?.moduleProgress) {
            const unlocked = [1]; // Level 1 is always unlocked
            // check levels 2 to 8
            for (let i = 2; i <= 8; i++) {
                const lvlId = `lvl${i}`;
                if (userData.progress.moduleProgress[lvlId]?.unlocked) {
                    unlocked.push(i);
                }
            }
            setUnlockedModules(unlocked);
        }
    }, [userData]);

    const isModuleUnlocked = (moduleId) => {
        // Module ID 1 corresponds to lvl1, etc.
        return unlockedModules.includes(moduleId);
    };

    const handleModuleClick = (module) => {
        if (!isModuleUnlocked(module.id)) {
            return; // Don't navigate if locked
        }
        // Navigate to the learning page for this specific module
        navigate(`/level/${levelId}/learn`);
    };

    const styles = {
        container: {
            minHeight: '100vh',
            background: isDark ? '#0a0a0a' : '#f8fafc',
            paddingTop: '2rem',
            paddingBottom: '4rem',
        },
        header: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem 3rem',
            textAlign: 'center',
        },
        backButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: isDark ? '#1e293b' : '#fff',
            color: isDark ? '#f1f5f9' : '#1e293b',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'all 0.2s',
        },
        title: {
            fontSize: '3rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            lineHeight: 1.2,
        },
        subtitle: {
            fontSize: '1.25rem',
            color: isDark ? '#94a3b8' : '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
        },
        grid: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
        },
        moduleCard: (isUnlocked) => ({
            background: isDark ? '#1a1a1a' : '#fff',
            borderRadius: '20px',
            padding: '2rem',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            cursor: isUnlocked ? 'pointer' : 'not-allowed',
            opacity: isUnlocked ? 1 : 0.6,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
        }),
        moduleNumber: {
            fontSize: '4rem',
            fontWeight: '900',
            opacity: 0.05,
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            lineHeight: 1,
            fontFamily: 'serif',
        },
        iconContainer: (color, isUnlocked) => ({
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: isUnlocked ? `${color}15` : isDark ? '#2a2a2a' : '#f1f5f9',
            color: isUnlocked ? color : '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            position: 'relative',
            zIndex: 1,
        }),
        moduleTitle: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: isDark ? '#f1f5f9' : '#1e293b',
            marginBottom: '0.75rem',
            lineHeight: 1.3,
        },
        moduleDescription: {
            fontSize: '0.95rem',
            color: isDark ? '#94a3b8' : '#64748b',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
        },
        footer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '1rem',
            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
        },
        estimatedTime: {
            fontSize: '0.85rem',
            color: isDark ? '#64748b' : '#94a3b8',
            fontWeight: '600',
        },
        startButton: (color, isUnlocked) => ({
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            background: isUnlocked ? color : isDark ? '#2a2a2a' : '#e2e8f0',
            color: isUnlocked ? '#fff' : '#94a3b8',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: '700',
            border: 'none',
            cursor: isUnlocked ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
        }),
    };

    return (
        <DashboardLayout>
            <div style={styles.container}>
                <div style={styles.header}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/track')}
                        style={styles.backButton}
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </motion.button>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={styles.title}
                    >
                        Choose a Module to Start Learning
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={styles.subtitle}
                    >
                        Explore the roadmap and start learning at your own pace. Complete modules to unlock the next ones.
                    </motion.p>
                </div>

                <div style={styles.grid}>
                    {moduleData.map((module, index) => {
                        const isUnlocked = isModuleUnlocked(module.id);
                        const Icon = module.icon;

                        return (
                            <motion.div
                                key={module.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={isUnlocked ? { y: -4, boxShadow: isDark ? '0 20px 40px -10px rgba(0,0,0,0.5)' : '0 10px 30px -5px rgba(0,0,0,0.15)' } : {}}
                                onClick={() => handleModuleClick(module)}
                                style={styles.moduleCard(isUnlocked)}
                            >
                                <div style={styles.moduleNumber}>{module.number}</div>

                                <div style={styles.iconContainer(module.color, isUnlocked)}>
                                    {isUnlocked ? <Icon size={28} /> : <LockIcon size={24} />}
                                </div>

                                <h3 style={styles.moduleTitle}>{module.title}</h3>
                                <p style={styles.moduleDescription}>{module.description}</p>

                                <div style={styles.footer}>
                                    <span style={styles.estimatedTime}>
                                        {module.estimatedTime}
                                    </span>
                                    <button style={styles.startButton(module.color, isUnlocked)}>
                                        {isUnlocked ? (
                                            <>
                                                Start Module
                                                <ChevronRight size={16} />
                                            </>
                                        ) : (
                                            <>
                                                <LockIcon size={14} />
                                                Locked
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
