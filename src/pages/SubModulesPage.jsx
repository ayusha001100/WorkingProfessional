import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, CheckCircle2, Lock as LockIcon, BookOpen, Code, Settings, Target,
    Lightbulb, Zap, PlayCircle, Image, Video, Film, Bot, Workflow,
    Users, MessageSquare, Eye, Sparkles, Layers, FileText, Rocket,
    X, Check, ArrowRight, Sun, Moon, User, Calendar, Link2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import { GEN_AI_COURSE } from '../data/genAiCourse';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';
import { SUB_MODULE_MCQS } from '../data/subModuleMCQs';

export default function SubModulesPage() {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const { userData, updateUserData } = useAuth();
    const { theme, toggleTheme } = useTheme();

    // Find the module by levelId
    const module = GEN_AI_COURSE.modules.find(m => m.id === levelId);
    const moduleIndex = GEN_AI_COURSE.modules.findIndex(m => m.id === levelId);

    // Sub-modules data based on level
    const getSubModules = () => {
        if (levelId === 'lvl1') {
            return [
                { id: 'lvl1_sub1', title: 'Introduction & AI Basics', icon: BookOpen, IconComponent: BookOpen },
                { id: 'lvl1_sub2', title: 'How GenAI Works (Technical)', icon: Code, IconComponent: Code },
                { id: 'lvl1_sub3', title: 'Key Concepts (Tokens & Limits)', icon: Settings, IconComponent: Settings },
                { id: 'lvl1_sub4', title: 'Capabilities & Limitations', icon: Target, IconComponent: Target },
                { id: 'lvl1_sub5', title: 'Prompt Engineering', icon: Lightbulb, IconComponent: Lightbulb },
                { id: 'lvl1_sub6', title: 'Model Settings', icon: Settings, IconComponent: Settings },
                { id: 'lvl1_sub7', title: 'Applications & Tools', icon: Zap, IconComponent: Zap },
                { id: 'lvl1_sub8', title: 'Practice & Takeaways', icon: PlayCircle, IconComponent: PlayCircle }
            ];
        } else if (levelId === 'lvl2') {
            return [
                { id: 'lvl2_sub1', title: 'LEVEL 2', icon: PlayCircle, IconComponent: PlayCircle },
                { id: 'lvl2_sub2', title: 'Why Visuals Matter at Work', icon: Eye, IconComponent: Eye },
                { id: 'lvl2_sub3', title: 'Intro to Visual GenAI', icon: Sparkles, IconComponent: Sparkles },
                { id: 'lvl2_sub4', title: 'Diffusion Models (Intuition)', icon: Layers, IconComponent: Layers },
                { id: 'lvl2_sub5', title: 'Visual Storytelling', icon: Film, IconComponent: Film },
                { id: 'lvl2_sub6', title: 'AI Tools Overview (Images)', icon: Image, IconComponent: Image },
                { id: 'lvl2_sub7', title: 'AI Tools Overview (Video)', icon: Video, IconComponent: Video },
                { id: 'lvl2_sub8', title: 'Hands-On Visual Creation', icon: Zap, IconComponent: Zap },
                { id: 'lvl2_sub9', title: 'Custom GPTs (AI Bots)', icon: Bot, IconComponent: Bot },
                { id: 'lvl2_sub10', title: 'Components of a Custom GPT', icon: Settings, IconComponent: Settings },
                { id: 'lvl2_sub11', title: 'Prompt Structure for Custom GPTs', icon: FileText, IconComponent: FileText },
                { id: 'lvl2_sub12', title: 'Agentic AI', icon: Rocket, IconComponent: Rocket },
                { id: 'lvl2_sub13', title: 'Agent Workflow Example', icon: Workflow, IconComponent: Workflow },
                { id: 'lvl2_sub14', title: 'AI Generalist Role', icon: Users, IconComponent: Users },
                { id: 'lvl2_sub15', title: '15 & 16. Q&A and Next Steps', icon: MessageSquare, IconComponent: MessageSquare }
            ];
        }
        return [];
    };

    const subModules = getSubModules();
    const userDomain = userData?.onboarding?.dreamRole || "Social Media Manager";

    // Initialize sub-module progress
    const [subModuleProgress, setSubModuleProgress] = useState(() => {
        const saved = userData?.progress?.subModuleProgress?.[levelId] || {};
        if (subModules.length > 0) {
            // Unlock first module
            const firstId = subModules[0].id;
            if (!saved[firstId]) {
                saved[firstId] = { unlocked: true, completed: false, quizCompleted: false };
            } else {
                saved[firstId].unlocked = true;
            }

            // LEVEL 2 SPECIAL: Unlock second module by default
            if (levelId === 'lvl2' && subModules[1]) {
                const secondId = subModules[1].id;
                if (!saved[secondId]) {
                    saved[secondId] = { unlocked: true, completed: false, quizCompleted: false };
                } else {
                    saved[secondId].unlocked = true;
                }
            }
        }
        return saved;
    });

    // Save progress to Firestore
    useEffect(() => {
        const syncProgress = async () => {
            if (userData?.uid && subModuleProgress) {
                try {
                    await updateUserData({
                        [`progress.subModuleProgress.${levelId}`]: subModuleProgress
                    });
                } catch (err) {
                    console.error("Failed to sync submodule progress:", err);
                }
            }
        };
        const timeout = setTimeout(syncProgress, 1000);
        return () => clearTimeout(timeout);
    }, [subModuleProgress, levelId, userData?.uid]);

    // Check if sub-module is unlocked
    const isSubModuleUnlocked = (index) => {
        if (index === 0) return true;

        // Level 2 module 1 and 2 will open together
        if (levelId === 'lvl2' && index === 1) return true;

        const previousSubModule = subModules[index - 1];
        const prevProgress = subModuleProgress[previousSubModule.id];
        if (!prevProgress?.completed) return false;

        const hasQuiz = SUB_MODULE_MCQS[levelId]?.[previousSubModule.id];
        if (hasQuiz && hasQuiz.length > 0) {
            return prevProgress?.quizCompleted || false;
        }
        return true;
    };

    const [selectedSubModule, setSelectedSubModule] = useState(null);
    const [showSubModuleContent, setShowSubModuleContent] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lock body scroll when content view is open
    useEffect(() => {
        if (showSubModuleContent) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [showSubModuleContent]);

    // Handle sub-module click
    const handleSubModuleClick = (subModule, index) => {
        if (!isSubModuleUnlocked(index)) return;
        navigate(`/level/${levelId}/submodule/${subModule.id}`);
    };

    // Calculate overall progress
    const completedCount = subModules.filter(sm => subModuleProgress[sm.id]?.completed).length;
    const progressPercentage = subModules.length > 0 ? Math.round((completedCount / subModules.length) * 100) : 0;

    if (!module) {
        return (
            <DashboardLayout>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <p>Module not found</p>
                    <button onClick={() => navigate('/track')}>Back to Dashboard</button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div style={{
                minHeight: '100vh',
                background: theme === 'light' ? '#fafafa' : 'var(--bg-primary)',
                padding: '2rem clamp(1rem, 4vw, 2.5rem)',
                width: '100%',
                maxWidth: '1400px',
                margin: '0 auto',
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}>
                {/* Header */}
                <div style={{ marginBottom: '3rem' }}>
                    <motion.button
                        onClick={() => navigate('/track')}
                        whileHover={{ x: -4 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem',
                            padding: '0.6rem 1.25rem', background: theme === 'light' ? '#ffffff' : '#1a1a1a',
                            border: theme === 'light' ? '1px solid #e2e8f0' : '1px solid #2a2a2a',
                            color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem',
                            fontWeight: 700, borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                    >
                        <ArrowLeft size={16} strokeWidth={2.5} />
                        Back to Journey
                    </motion.button>

                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#ff5722', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                                Level {(moduleIndex + 1).toString().padStart(2, '0')}
                            </div>
                            <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 950, color: 'var(--text-primary)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                                {module.title}
                            </h1>
                            {userDomain && (
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: '0.9rem', fontWeight: 600, color: '#64748b', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '12px', height: '2px', background: '#ff5722', borderRadius: '2px' }} />
                                    Tailored for {userDomain}s
                                </motion.div>
                            )}
                        </div>

                        <div style={{ textAlign: 'right', minWidth: '200px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    Your Progress
                                </span>
                                <span style={{ padding: '0.25rem 0.6rem', background: '#fff0e6', color: '#ff5722', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 800 }}>
                                    {progressPercentage}%
                                </span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{completedCount}</span> of {subModules.length} lessons unlocked
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', height: '8px', background: theme === 'light' ? '#f1f5f9' : '#1a1a1a', borderRadius: '10px', overflow: 'hidden', marginTop: '1.5rem' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 0.8, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg, #ff5722, #ff8a50)', borderRadius: '10px' }} />
                    </div>
                </div>

                {/* Sub-Modules Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {subModules.map((subModule, index) => {
                        const IconComponent = subModule.IconComponent;
                        const isUnlocked = isSubModuleUnlocked(index);
                        const isCompleted = subModuleProgress[subModule.id]?.completed || false;
                        const isCurrent = isUnlocked && !isCompleted;

                        return (
                            <motion.div
                                key={subModule.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={isUnlocked ? { y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' } : {}}
                                onClick={() => isUnlocked && handleSubModuleClick(subModule, index)}
                                style={{
                                    padding: '1.75rem',
                                    background: isCurrent ? (theme === 'light' ? '#fff9f5' : '#1a1412') : (theme === 'light' ? '#fff' : '#121212'),
                                    border: isCurrent ? '1.5px solid #ff5722' : (theme === 'light' ? '1px solid #e5e7eb' : '1px solid #2a2a2a'),
                                    borderRadius: '20px', cursor: isUnlocked ? 'pointer' : 'not-allowed',
                                    position: 'relative', opacity: isUnlocked ? 1 : 0.6
                                }}
                            >
                                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                                    {isCompleted ? <CheckCircle2 size={18} color="#10b981" /> : isUnlocked ? <PlayCircle size={18} color="#ff5722" /> : <LockIcon size={18} color="#ccc" />}
                                </div>
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: isCurrent ? '#ff5722' : '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <IconComponent size={24} color={isCurrent ? '#fff' : '#64748b'} />
                                </div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{subModule.title}</h3>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Lesson {index + 1} of {subModules.length}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
