import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, CheckCircle2, Lock as LockIcon, BookOpen, Code, Settings, Target,
    Lightbulb, Zap, PlayCircle, Image, Video, Film, Bot, Workflow,
    Users, MessageSquare, Eye, Sparkles, Layers, FileText, Rocket,
    X, Check, ArrowRight, ChevronDown, ChevronRight, Info, Search,
    Cpu, Globe, Shield, Database, Brain, Sun, Moon,
    PanelLeftClose, PanelLeftOpen, Trophy, MapPin, Mic, Headphones,
    Calendar, ExternalLink, User
} from 'lucide-react';
import ReactJoyride, { STATUS } from 'react-joyride';
import confetti from 'canvas-confetti';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { GEN_AI_COURSE } from '../data/genAiCourse';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';
import { SUB_MODULE_MCQS } from '../data/subModuleMCQs';
import CompactAIAssistant from '../components/CompactAIAssistant';
import { CleanQuizBlock } from '../components/CleanQuizBlock';
import { generateCityLeaderboard } from '../utils/dynamicDataGenerator';

const Header = ({ isDarkMode, toggleTheme, userData, levelId }) => {
    const totalSubModules = Object.values(SUB_MODULES_CONTENT).reduce((acc, levels) =>
        acc + Object.keys(levels).length, 0);
    const completedSubModulesCount = Object.values(userData?.progress?.subModuleProgress || {}).reduce((acc, levelProgress) =>
        acc + Object.values(levelProgress).filter(sm => sm.completed).length, 0);
    const masteryPercent = totalSubModules > 0 ? Math.round((completedSubModulesCount / totalSubModules) * 100) : 0;

    const currentModule = GEN_AI_COURSE.modules.find(m => m.id === levelId);

    return (
        <div style={{
            height: '64px',
            background: isDarkMode ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem',
            position: 'sticky', top: 0, zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <motion.button
                    whileHover={{ x: -2 }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDarkMode ? '#94a3b8' : '#64748b', display: 'flex', alignItems: 'center' }}
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft size={20} />
                </motion.button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <img src={isDarkMode ? '/logo-dark.png' : '/logo.png'} alt="Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                    <span style={{
                        fontWeight: 900,
                        fontSize: '1.2rem',
                        letterSpacing: '-0.03em',
                        color: isDarkMode ? '#fff' : '#0f172a'
                    }}>
                        Lets<span style={{ color: '#ff5722' }}>Upgrade</span>
                    </span>
                </div>
                {currentModule && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: isDarkMode ? '#4b5563' : '#94a3b8',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '0.4rem 0.85rem',
                        background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        borderRadius: '12px',
                        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'}`
                    }}>
                        <span>Level {GEN_AI_COURSE.modules.indexOf(currentModule) + 1}</span>
                        <ChevronRight size={14} />
                        <span style={{ color: '#ff5722' }}>{currentModule.title}</span>
                    </div>
                )}

                {/* Global Mastery Analysis */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1.5rem', paddingLeft: '1.5rem', borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: isDarkMode ? '#4b5563' : '#94a3b8', letterSpacing: '0.05em' }}>JOURNEY MASTERY</div>
                    <div style={{ width: '80px', height: '5px', background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${masteryPercent}%` }} style={{ height: '100%', background: '#ff5722', borderRadius: '10px' }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#0f172a' }}>{masteryPercent}%</div>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    style={{
                        background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#fff',
                        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: '10px', width: '38px', height: '38px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        color: isDarkMode ? '#ff5722' : '#ff5722',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                    }}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
                <Link to="/profile" style={{ textDecoration: 'none', display: 'block' }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                            width: '38px', height: '38px', borderRadius: '10px',
                            background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#fff',
                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                        }}
                    >
                        <User size={18} color={isDarkMode ? '#fff' : '#1e293b'} />
                    </motion.div>
                </Link>
            </div>
        </div>
    );
};

export default function UnifiedLearningPage() {
    const { levelId } = useParams();
    const navigate = useNavigate();
    const { userData, setUserData, saveProgress, updateUserData, user } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [subModuleProgress, setSubModuleProgress] = useState(() => {
        const saved = userData?.progress?.subModuleProgress?.[levelId] || {};

        // LEVEL 2 SPECIAL: Unlock first two modules together by default
        if (levelId === 'lvl2') {
            const firstId = 'lvl2_sub1';
            const secondId = 'lvl2_sub2';
            if (!saved[firstId]) saved[firstId] = { unlocked: true, completed: false, quizCompleted: false };
            else saved[firstId].unlocked = true;

            if (!saved[secondId]) saved[secondId] = { unlocked: true, completed: false, quizCompleted: false };
            else saved[secondId].unlocked = true;
        }

        return saved;
    });
    const [showCertModal, setShowCertModal] = useState(false);

    const getSubModules = () => {
        return Object.values(SUB_MODULES_CONTENT[levelId] || {});
    };

    const subModules = getSubModules();

    const [activeSectionId, setActiveSectionId] = useState(() => {
        const sm = Object.values(SUB_MODULES_CONTENT[levelId] || {});
        return sm.length > 0 ? sm[0].id : null;
    });
    const [isFocusMode, setIsFocusMode] = useState(false);
    const scrollContainerRef = useRef(null);
    const sectionRefs = useRef({});
    const [isSessionDetailsOpen, setIsSessionDetailsOpen] = useState(true);
    const [isTopicsOpen, setIsTopicsOpen] = useState(true);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);
    const [isVoiceModeOpen, setIsVoiceModeOpen] = useState(false);
    const [voiceState, setVoiceState] = useState('listening'); // listening, processing, speaking

    // Tour Logic
    const [runTour, setRunTour] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [userRank, setUserRank] = useState(12);

    useEffect(() => {
        if (!userData) return;

        const city = userData?.location?.city || userData?.onboarding?.city || 'Mumbai';

        // Listen to top users from the same city
        const usersRef = collection(db, 'users');
        const q = query(
            usersRef,
            where('onboarding.city', '==', city),
            orderBy('progress.xp', 'desc'),
            limit(5)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const cityLeaderboard = [];
            snapshot.forEach((doc) => {
                const d = doc.data();
                cityLeaderboard.push({
                    uid: doc.id,
                    name: d.name || 'Anonymous',
                    points: d.progress?.xp || 0,
                    avatarSeed: d.name || 'User'
                });
            });

            setLeaderboard(cityLeaderboard.slice(0, 3));

            // For user rank, we'd ideally need a separate query or calculate from snapshot
            // For now, let's estimate or keep a placeholder if not in top 5
            const myRankIdx = cityLeaderboard.findIndex(u => u.uid === user?.uid);
            if (myRankIdx !== -1) {
                setUserRank(myRankIdx + 1);
            } else {
                setUserRank('10+'); // Placeholder
            }
        }, (error) => {
            console.error("Leaderboard error:", error);
            // Fallback to mock data if Firestore fails or index is missing
            const { leaderboard: leaderboardData, userRank: rank } = generateCityLeaderboard(userData);
            setLeaderboard(leaderboardData.slice(0, 3));
            setUserRank(rank);
        });

        return () => unsubscribe();
    }, [userData, user]);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenMainTour');
        if (!hasSeenTour) {
            setTimeout(() => setRunTour(true), 1500);
        }
    }, []);

    useEffect(() => {
        if (isVoiceModeOpen) {
            setVoiceState('listening');
            const t1 = setTimeout(() => {
                setVoiceState('processing');
                const t2 = setTimeout(() => {
                    setVoiceState('speaking');
                }, 2000);
                return () => clearTimeout(t2);
            }, 2500);
            return () => clearTimeout(t1);
        }
    }, [isVoiceModeOpen]);

    const handleTourCallback = (data) => {
        const { status } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
        if (finishedStatuses.includes(status)) {
            setRunTour(false);
            localStorage.setItem('hasSeenMainTour', 'true');

            // Auto-hide elements for focus mode
            setTimeout(() => {
                setIsLeftSidebarOpen(false);
                setIsFocusMode(true);
                setIsSessionDetailsOpen(false);
            }, 500);
        }
    };

    const tourSteps = [
        {
            target: '#tour-sidebar-nav',
            content: 'Navigate through your topics and lessons here.',
            placement: 'right',
            disableBeacon: true,
        },
        {
            target: '#tour-live-session',
            content: 'Join your live sessions and see class details.',
            placement: 'left',
        },
        {
            target: '#tour-leaderboard',
            content: 'Check your rank on the city leaderboard.',
            placement: 'left',
        },
        {
            target: '#tour-voice-assistant',
            content: 'Use your AI Voice Assistant to learn interactively.',
            placement: 'left',
        }
    ];

    const ecosystem = [
        {
            category: 'Text & Chat',
            tools: [
                { name: 'ChatGPT', logo: 'https://logo.clearbit.com/openai.com', url: 'https://chat.openai.com' },
                { name: 'Claude', logo: 'https://logo.clearbit.com/anthropic.com', url: 'https://claude.ai' },
                { name: 'Gemini', logo: 'https://www.gstatic.com/lamda/images/favicon_v1_150160c13ff2af1380d3.png', url: 'https://gemini.google.com' },
                { name: 'Jasper', logo: 'https://logo.clearbit.com/jasper.ai', url: 'https://www.jasper.ai' },
                { name: 'Notion AI', logo: 'https://logo.clearbit.com/notion.so', url: 'https://www.notion.so/product/ai' }
            ]
        },
        {
            category: 'Image Gen',
            tools: [
                { name: 'DALL·E', logo: 'https://openai.com/favicon.ico', url: 'https://openai.com/dall-e-3' },
                { name: 'Midjourney', logo: 'https://www.midjourney.com/favicon.ico', url: 'https://www.midjourney.com' },
                { name: 'Stable Diffusion', logo: 'https://stability.ai/favicon.ico', url: 'https://stability.ai' },
                { name: 'Adobe Firefly', logo: 'https://www.adobe.com/favicon.ico', url: 'https://www.adobe.com/products/firefly.html' }
            ]
        },
        {
            category: 'Video AI',
            tools: [
                { name: 'Runway', logo: 'https://logo.clearbit.com/runwayml.com', url: 'https://runwayml.com' },
                { name: 'Pika', logo: 'https://logo.clearbit.com/pika.art', url: 'https://pika.art' },
                { name: 'Synthesia', logo: 'https://logo.clearbit.com/synthesia.io', url: 'https://www.synthesia.io' },
                { name: 'HeyGen', logo: 'https://logo.clearbit.com/heygen.com', url: 'https://www.heygen.com' }
            ]
        }
    ];


    useEffect(() => {
        const handleScroll = () => {
            const container = scrollContainerRef.current;
            if (!container) return;

            let currentActive = activeSectionId;
            for (const sm of subModules) {
                const element = sectionRefs.current[sm.id];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 250) {
                        currentActive = sm.id;
                    }
                }
            }
            if (currentActive !== activeSectionId) setActiveSectionId(currentActive);
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [activeSectionId, subModules]);

    const scrollToSection = (id) => {
        const element = sectionRefs.current[id];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleAnswerQuiz = async (subModuleId, quizResult) => {
        let score = 0;
        let quizData = null;

        if (typeof quizResult === 'object') {
            score = quizResult.score || (quizResult.passed ? 100 : 0);
            quizData = {
                total: quizResult.total || 0,
                correct: quizResult.correct || 0
            };
        } else {
            score = quizResult;
            const mcqs = SUB_MODULE_MCQS[levelId]?.[subModuleId] || [];
            quizData = {
                total: mcqs.length,
                correct: Math.round((score / 100) * mcqs.length)
            };
        }

        const isPassed = score >= 60;
        if (!isPassed) return;

        const currentIndex = subModules.findIndex(sm => sm.id === subModuleId);
        const nextSubModule = subModules[currentIndex + 1];

        const updatedProgress = {
            ...subModuleProgress,
            [subModuleId]: {
                ...subModuleProgress[subModuleId],
                completed: true,
                quizCompleted: true,
                score: score
            }
        };

        if (nextSubModule) {
            updatedProgress[nextSubModule.id] = {
                ...updatedProgress[nextSubModule.id],
                unlocked: true
            };
        } else {
            // Level Completed
            try {
                await saveProgress(levelId, 'level', 150);

                // Update moduleProgress in userData to unlock next level
                const allModules = GEN_AI_COURSE.modules;
                const currentModuleIndex = allModules.findIndex(m => m.id === levelId);
                const nextModule = allModules[currentModuleIndex + 1];

                const updates = {
                    [`progress.moduleProgress.${levelId}.completed`]: true
                };

                if (nextModule) {
                    updates[`progress.moduleProgress.${nextModule.id}.unlocked`] = true;
                }

                await updateUserData(updates);

                // ONLY show cert modal if it's NOT lvl1
                if (levelId !== 'lvl1') {
                    setTimeout(() => {
                        setShowCertModal(true);
                        confetti({
                            particleCount: 200,
                            spread: 100,
                            origin: { y: 0.6 }
                        });
                    }, 1000);
                }
            } catch (err) {
                console.error("Error saving level completion:", err);
            }
        }

        setSubModuleProgress(updatedProgress);

        // Save to Firestore
        try {
            await saveProgress(subModuleId, 'submodule', 50, quizData); // Give 50 XP for passing quiz
            await updateUserData({
                [`progress.subModuleProgress.${levelId}`]: updatedProgress
            });
        } catch (error) {
            console.error("Error saving progress to Firestore:", error);
        }

        if (nextSubModule) {
            setTimeout(() => scrollToSection(nextSubModule.id), 500);
        }
    };

    const isUnlocked = (index) => {
        if (index === 0) return true;

        // LEVEL 2 SPECIAL: Unlock first two modules together
        if (levelId === 'lvl2' && index === 1) return true;

        const subModules = getSubModules();
        const prevModule = subModules[index - 1];
        const progress = subModuleProgress[prevModule?.id];

        if (!progress?.completed) return false;

        const hasQuiz = SUB_MODULE_MCQS[levelId]?.[prevModule.id];
        if (hasQuiz && hasQuiz.length > 0) {
            return progress?.quizCompleted || false;
        }
        return true;
    };

    const isDarkMode = theme === 'dark';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} userData={userData} levelId={levelId} />
            <motion.div
                initial={{ opacity: 0.96, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                style={{
                    display: 'flex', flex: 1,
                    background: isDarkMode ? '#0A0A0A' : '#FDFCFB',
                    color: isDarkMode ? '#e5e7eb' : '#1a1a1a',
                    fontFamily: '"Outfit", sans-serif', overflow: 'hidden',
                }}
            >
                {/* Left Sidebar */}
                <motion.aside
                    id="tour-sidebar-nav"
                    initial={{ width: 280, opacity: 1 }}
                    animate={{
                        width: isLeftSidebarOpen ? 300 : 0,
                        opacity: isLeftSidebarOpen ? 1 : 0,
                        padding: isLeftSidebarOpen ? '2rem 1.25rem' : 0
                    }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    style={{
                        height: '100%',
                        borderRight: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                        display: 'flex', flexDirection: 'column', gap: '2rem',
                        flexShrink: 0, overflowY: 'auto', background: isDarkMode ? '#0A0A0A' : '#FFF',
                        overflowX: 'hidden'
                    }}
                >
                    {/* Navigation Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
                        <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            color: isDarkMode ? '#4a5568' : '#94a3b8',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase'
                        }}>
                            Course Navigation
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsLeftSidebarOpen(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: isDarkMode ? '#718096' : '#a0aec0',
                                padding: '6px',
                                borderRadius: '8px',
                                display: 'flex'
                            }}
                        >
                            <PanelLeftClose size={16} />
                        </motion.button>
                    </div>

                    <div style={{ padding: '0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {subModules.map((sm, idx) => {
                                const unlocked = isUnlocked(idx);
                                const active = activeSectionId === sm.id;
                                const completed = subModuleProgress[sm.id]?.completed;
                                return (
                                    <motion.button
                                        key={sm.id}
                                        whileHover={unlocked ? { x: 4 } : {}}
                                        onClick={() => unlocked && scrollToSection(sm.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.850rem 1rem',
                                            borderRadius: '12px',
                                            background: active
                                                ? (isDarkMode ? 'rgba(255, 87, 34, 0.1)' : 'rgba(255, 87, 34, 0.05)')
                                                : 'transparent',
                                            border: active
                                                ? `1px solid ${isDarkMode ? 'rgba(255, 87, 34, 0.2)' : 'rgba(255, 87, 34, 0.1)'}`
                                                : '1px solid transparent',
                                            textAlign: 'left',
                                            cursor: unlocked ? 'pointer' : 'not-allowed', width: '100%',
                                            opacity: unlocked ? 1 : 0.4,
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{
                                            width: '24px', height: '24px',
                                            borderRadius: '6px',
                                            background: active ? '#ff5722' : (isDarkMode ? '#1a1a1a' : '#f1f5f9'),
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            color: active ? '#fff' : (isDarkMode ? '#4a5568' : '#94a3b8'),
                                            flexShrink: 0
                                        }}>
                                            {idx + 1}
                                        </div>
                                        <span style={{
                                            fontSize: '0.9rem',
                                            fontWeight: active ? 700 : 500,
                                            color: active ? (isDarkMode ? '#fff' : '#1e293b') : (isDarkMode ? '#a0aec0' : '#64748b'),
                                            flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                        }}>
                                            {sm.title}
                                        </span>
                                        {completed ? (
                                            <div style={{ background: '#10b981', borderRadius: '50%', padding: '2px', display: 'flex' }}>
                                                <Check size={10} color="#fff" strokeWidth={4} />
                                            </div>
                                        ) : !unlocked && <LockIcon size={12} color={isDarkMode ? '#4a5568' : '#cbd5e1'} />}

                                        {active && (
                                            <motion.div
                                                layoutId="active-pill"
                                                style={{
                                                    position: 'absolute',
                                                    left: 0, width: '3px', height: '18px',
                                                    background: '#ff5722', borderRadius: '0 4px 4px 0'
                                                }}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                </motion.aside>

                {/* Main Content */}
                <main ref={scrollContainerRef} style={{ flex: 1, height: '100%', overflowY: 'auto', scrollBehavior: 'smooth', padding: '4rem 6rem 12rem 6rem', position: 'relative', background: isDarkMode ? '#0A0A0A' : '#FDFCFB' }}>

                    {/* Expand Sidebar Button */}
                    <AnimatePresence>
                        {!isLeftSidebarOpen && (
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onClick={() => setIsLeftSidebarOpen(true)}
                                style={{
                                    position: 'fixed',
                                    top: '6rem',
                                    left: '2rem',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: isDarkMode ? '#1e293b' : '#fff',
                                    border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                                    zIndex: 10
                                }}
                            >
                                <PanelLeftOpen size={20} color="#ff5722" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        {subModules.map((sm, idx) => (
                            <SubModuleSection
                                key={sm.id}
                                id={sm.id}
                                index={idx}
                                subModule={sm}
                                unlocked={isUnlocked(idx)}
                                content={SUB_MODULES_CONTENT[levelId]?.[sm.id]}
                                mcqs={SUB_MODULE_MCQS[levelId]?.[sm.id]}
                                progress={subModuleProgress[sm.id]}
                                onPass={(score) => handleAnswerQuiz(sm.id, score)}
                                onNext={() => {
                                    const nextSubModule = subModules[idx + 1];
                                    if (nextSubModule) {
                                        scrollToSection(nextSubModule.id);
                                    } else if (levelId === 'lvl1') {
                                        window.scrollTo(0, 0);
                                        navigate('/level/lvl2/learn');
                                    }
                                }}
                                isLastModule={idx === subModules.length - 1}
                                levelId={levelId}
                                sectionRef={el => sectionRefs.current[sm.id] = el}
                                isDarkMode={isDarkMode}
                                headerId={idx === 0 ? 'tour-first-topic' : undefined}
                            />
                        ))}
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside style={{
                    width: '360px', height: '100%', borderLeft: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '2rem',
                    flexShrink: 0, overflowY: 'auto', background: isDarkMode ? '#0A0A0A' : '#FFF',
                }}>
                    {/* Live Session Details */}
                    <div id="tour-live-session" style={{ flexShrink: 0 }}>
                        <motion.div
                            onClick={() => setIsSessionDetailsOpen(!isSessionDetailsOpen)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                padding: '1rem',
                                background: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#f8fafc',
                                borderRadius: '16px',
                                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                <div style={{
                                    width: '32px', height: '32px',
                                    borderRadius: '8px',
                                    background: 'rgba(255, 87, 34, 0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#ff5722'
                                }}>
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: isDarkMode ? '#fff' : '#1e293b', margin: 0 }}>Live Session</h3>
                                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, fontWeight: 500 }}>Level 1 Fundamentals</p>
                                </div>
                            </div>
                            <motion.div
                                animate={{ rotate: isSessionDetailsOpen ? 180 : 0 }}
                                style={{ color: '#94a3b8' }}
                            >
                                <ChevronDown size={18} />
                            </motion.div>
                        </motion.div>

                        <AnimatePresence>
                            {isSessionDetailsOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '1.25rem' }}>
                                        {/* Class Card */}
                                        <div style={{
                                            padding: '1.25rem',
                                            borderRadius: '20px',
                                            background: isDarkMode ? 'rgba(255,255,255,0.02)' : '#fff',
                                            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                                                <div style={{
                                                    width: '44px', height: '44px', borderRadius: '12px', overflow: 'hidden',
                                                    background: '#f1f5f9', flexShrink: 0
                                                }}>
                                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Soham" alt="Mentor" style={{ width: '100%', height: '100%' }} />
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isDarkMode ? '#fff' : '#1e293b' }}>Soham Ganguly</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Technical lead at Google</div>
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: isDarkMode ? '#cbd5e1' : '#475569' }}>
                                                    <PlayCircle size={14} color="#ff5722" />
                                                    <span>7 PM to 10 PM</span>
                                                </div>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                    fontSize: '0.8rem', color: '#ff5722', fontWeight: 700,
                                                    padding: '0.75rem', background: 'rgba(255, 87, 34, 0.05)',
                                                    borderRadius: '10px', marginTop: '0.5rem', cursor: 'pointer'
                                                }}>
                                                    <Code size={14} />
                                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>luc.to/Genaiwpzoom</span>
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(255, 87, 34, 0.4)' }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => window.open("https://luc.to/Genaiwpzoom", "_blank")}
                                            style={{
                                                width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                                color: '#fff', border: 'none', borderRadius: '14px', fontWeight: 800, fontSize: '0.95rem',
                                                cursor: 'pointer', boxShadow: '0 8px 24px rgba(255, 87, 34, 0.25)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                                            }}
                                        >
                                            Join Now <ArrowRight size={18} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Premium AI Assistant Card */}
                    <motion.div
                        id="tour-voice-assistant"
                        whileHover={{ y: -5 }}
                        onClick={() => setIsVoiceModeOpen(true)}
                        style={{
                            padding: '1.5rem',
                            background: isDarkMode
                                ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)'
                                : 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
                            borderRadius: '24px',
                            border: `1px solid ${isDarkMode ? 'rgba(255, 87, 34, 0.2)' : 'rgba(255, 87, 34, 0.1)'}`,
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: isDarkMode ? '0 20px 40px rgba(0,0,0,0.3)' : '0 20px 40px rgba(255, 87, 34, 0.05)',
                            flexShrink: 0,
                            minHeight: '180px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Glow Effect */}
                        <div style={{
                            position: 'absolute', top: '-20%', right: '-20%',
                            width: '140px', height: '140px',
                            background: 'radial-gradient(circle, rgba(255, 87, 34, 0.15) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '14px',
                                    background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 8px 16px rgba(255, 87, 34, 0.3)'
                                }}>
                                    <Mic size={24} color="#fff" />
                                </div>
                                <div style={{
                                    padding: '4px 10px', borderRadius: '8px',
                                    background: 'rgba(255, 87, 34, 0.1)', color: '#ff5722',
                                    fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.05em'
                                }}>
                                    AI POWERED
                                </div>
                            </div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1e293b', marginBottom: '0.5rem' }}>
                                24x7 Assistant for you
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: isDarkMode ? '#94a3b8' : '#64748b', lineHeight: 1.5, margin: 0 }}>
                                This is your 24x7 assistant for your help.
                            </p>
                        </div>
                    </motion.div>

                    {/* City Rankings */}
                    <div id="tour-leaderboard" style={{ flexShrink: 0, paddingBottom: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1e293b', margin: 0, letterSpacing: '-0.02em' }}>
                                    {userData?.city || 'Mumbai'} Leaderboard
                                </h3>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, fontWeight: 500 }}>Global Skill Ranking</p>
                            </div>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '10px',
                                background: 'rgba(255, 215, 0, 0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#EAB308'
                            }}>
                                <Trophy size={20} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                            {leaderboard.filter(u => u.uid !== userData?.uid).slice(0, 3).map((item, idx) => (
                                <motion.div
                                    key={item.uid}
                                    whileHover={{ x: 5 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '0.85rem 1rem',
                                        background: isDarkMode ? 'rgba(255,255,255,0.02)' : '#fff',
                                        borderRadius: '16px',
                                        border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                width: '38px', height: '38px', borderRadius: '10px', overflow: 'hidden',
                                                background: '#f1f5f9', border: `1px solid ${isDarkMode ? '#333' : '#e2e8f0'}`
                                            }}>
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt={item.name} style={{ width: '100%', height: '100%' }} />
                                            </div>
                                            <div style={{
                                                position: 'absolute', bottom: -5, right: -5,
                                                width: '18px', height: '18px', borderRadius: '50%',
                                                background: idx === 0 ? '#EAB308' : idx === 1 ? '#94A3B8' : '#B45309',
                                                color: '#fff', fontSize: '0.6rem', fontWeight: 900,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: `2px solid ${isDarkMode ? '#0A0A0A' : '#fff'}`
                                            }}>
                                                {idx + 1}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isDarkMode ? '#fff' : '#1e293b' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Elite Learner</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1e293b' }}>{item.points}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700 }}>Pts</div>
                                    </div>
                                </motion.div>
                            ))}

                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '1rem',
                                padding: '1rem', borderRadius: '18px',
                                background: isDarkMode ? 'rgba(255,87,34,0.1)' : 'rgba(255,87,34,0.05)',
                                border: '1px solid rgba(255,87,34,0.15)',
                                marginTop: '1rem', position: 'relative'
                            }}>
                                <div style={{
                                    width: '42px', height: '42px', borderRadius: '12px',
                                    background: '#ff5722', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontWeight: 900, fontSize: '1rem',
                                    boxShadow: '0 4px 12px rgba(255,87,34,0.3)'
                                }}>
                                    {userRank}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1e293b' }}>{userData?.name || 'Learner'}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#ff5722', fontWeight: 700 }}>{userData?.progress?.xp || 0} Points • Rank {userRank}</div>
                                </div>
                                <div style={{
                                    position: 'absolute', top: -10, right: 15,
                                    background: '#ff5722', color: '#fff',
                                    padding: '2px 8px', borderRadius: '6px',
                                    fontSize: '0.65rem', fontWeight: 900
                                }}>
                                    YOU
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </motion.div>


            {/* AI Ecosystem FAB */}
            <motion.button
                id="tour-ecosystem-fab"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEcosystemOpen(true)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff5722 0%, #ff8a65 100%)',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(255, 87, 34, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 200
                }}
            >
                <Zap size={28} color="#fff" fill="white" />
            </motion.button>

            {/* AI Ecosystem Drawer */}
            <AnimatePresence>
                {isEcosystemOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEcosystemOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 210
                            }}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                width: '400px',
                                maxWidth: '90vw',
                                height: '100%',
                                background: isDarkMode ? '#0f172a' : '#fff',
                                boxShadow: '-10px 0 40px rgba(0,0,0,0.2)',
                                zIndex: 220,
                                padding: '2rem',
                                overflowY: 'auto',
                                borderLeft: `1px solid ${isDarkMode ? '#1e293b' : '#e2e8f0'}`
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(255, 87, 34, 0.1)' }}>
                                        <Zap size={24} color="#ff5722" />
                                    </div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1e293b', margin: 0 }}>AI Ecosystem</h2>
                                </div>
                                <button
                                    onClick={() => setIsEcosystemOpen(false)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: isDarkMode ? '#94a3b8' : '#64748b'
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                                {ecosystem.map((cat, idx) => (
                                    <div key={idx}>
                                        <h3 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
                                            {cat.category}
                                        </h3>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                                            {cat.tools.map(tool => (
                                                <motion.a
                                                    key={tool.name}
                                                    href={tool.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '1rem',
                                                        padding: '1rem',
                                                        background: isDarkMode ? '#1e293b' : '#fff',
                                                        borderRadius: '16px',
                                                        border: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`,
                                                        textDecoration: 'none',
                                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                                                    }}
                                                >
                                                    <img
                                                        src={tool.logo}
                                                        alt={tool.name}
                                                        style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'contain' }}
                                                        onError={(e) => {
                                                            e.target.src = `https://ui-avatars.com/api/?name=${tool.name}&background=random`;
                                                        }}
                                                    />
                                                    <div>
                                                        <div style={{ fontSize: '1rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#1e293b' }}>{tool.name}</div>
                                                        <div style={{ fontSize: '0.8rem', color: isDarkMode ? '#94a3b8' : '#64748b', marginTop: '0.1rem' }}>Explore Tool →</div>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>


            {/* Compact AI Assistant */}
            <CompactAIAssistant
                isOpen={isVoiceModeOpen}
                onClose={() => setIsVoiceModeOpen(false)}
                voiceState={voiceState}
                isDarkMode={isDarkMode}
            />

            <AnimatePresence>
                {showCertModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                            zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: isDarkMode ? '#1e293b' : '#fff',
                                padding: '3rem', borderRadius: '32px', textAlign: 'center',
                                maxWidth: '500px', width: '90%', position: 'relative',
                                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                            }}
                        >
                            <div style={{
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 2rem', boxShadow: '0 10px 20px rgba(253, 185, 49, 0.3)'
                            }}>
                                <Trophy size={40} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: isDarkMode ? '#fff' : '#1a1a1a' }}>Level Complete!</h2>
                            <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#94a3b8' : '#64748b', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                                You've mastered <strong>Level {levelId === 'lvl1' ? '1' : levelId.replace('lvl', '')}</strong>. Your professional certificate is ready.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                <button
                                    onClick={() => navigate('/certificate')}
                                    style={{
                                        background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                        color: '#fff', border: 'none', padding: '1.2rem', borderRadius: '16px',
                                        fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        boxShadow: '0 10px 20px rgba(255, 87, 34, 0.3)'
                                    }}
                                >
                                    View Certificate <ArrowRight size={20} />
                                </button>
                                <button
                                    onClick={() => setShowCertModal(false)}
                                    style={{
                                        background: 'transparent', color: isDarkMode ? '#94a3b8' : '#64748b',
                                        border: 'none', padding: '1rem', fontWeight: 600, cursor: 'pointer'
                                    }}
                                >
                                    Stay Here
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            <ReactJoyride
                steps={tourSteps}
                run={runTour}
                continuous
                showProgress
                showSkipButton
                callback={handleTourCallback}
                styles={{
                    options: {
                        primaryColor: '#ff5722',
                        textColor: '#333',
                        zIndex: 10000,
                    }
                }}
            />
        </div>
    );
}

function SubModuleSection({ index, subModule, unlocked, content, mcqs, progress, onPass, onNext, isLastModule, levelId, sectionRef, isDarkMode, headerId }) {
    const [preQuizAttempted, setPreQuizAttempted] = useState(false);
    const [preQuizDecision, setPreQuizDecision] = useState(null); // null, 'read', 'exam'

    // Show Selection if: Unlocked, No Progress, No Decision yet, and we have questions
    const showSelection = unlocked && !progress && !preQuizAttempted && !preQuizDecision && mcqs && mcqs.length >= 5;

    // Show Pre-Assessment if: Decision is 'exam'
    const showPreQuiz = unlocked && !progress && !preQuizAttempted && preQuizDecision === 'exam';

    if (!unlocked) {
        return (
            <section ref={sectionRef} style={{ marginBottom: '10rem', position: 'relative' }}>
                <div style={{ opacity: 0.1, filter: 'blur(12px)', pointerEvents: 'none' }}>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '2.5rem' }}>{index + 1}. {subModule.title}</h1>
                    <p style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>Access to this module is restricted until you demonstrate mastery of the prior concepts.</p>
                </div>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 10 }}>
                    <div style={{
                        width: '90px', height: '90px', borderRadius: '30px', background: isDarkMode ? '#1a1a1a' : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto',
                        boxShadow: '0 30px 60px rgba(0,0,0,0.2)', border: `1px solid ${isDarkMode ? '#333' : '#eee'}`
                    }}>
                        <LockIcon size={36} color="#ff5722" />
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 0.75rem 0', color: isDarkMode ? '#fff' : '#1e293b' }}>Module Locked</h3>
                    <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: 500 }}>Unlock by completing the assessment below.</p>
                </div>
            </section>
        );
    }

    if (showSelection) {
        return (
            <section ref={sectionRef} style={{ marginBottom: '10rem', scrollMarginTop: '60px' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1a1a1a', margin: '0 0 1rem 0' }}>{index + 1}. {subModule.title}</h1>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        padding: '4rem', background: isDarkMode ? 'rgba(255,255,255,0.02)' : '#fff',
                        borderRadius: '32px', border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
                        textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.1)'
                    }}
                >
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '24px',
                        background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 2rem auto', boxShadow: '0 20px 40px rgba(255,87,34,0.2)'
                    }}>
                        <Brain size={40} color="#fff" />
                    </div>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem', color: isDarkMode ? '#fff' : '#1e293b' }}>Choose Your Path</h2>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '500px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                        Would you like to explore the core concepts first or prove your expertise to bypass this module?
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '600px', margin: '0 auto' }}>
                        <motion.button
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPreQuizDecision('read')}
                            style={{
                                padding: '2rem', borderRadius: '24px', background: isDarkMode ? 'rgba(255,255,255,0.03)' : '#f8fafc',
                                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
                                cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ color: '#ff5722', marginBottom: '1rem' }}><BookOpen size={32} /></div>
                            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.4rem', color: isDarkMode ? '#fff' : '#1e293b' }}>Read the Module</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Step-by-step learning</div>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPreQuizDecision('exam')}
                            style={{
                                padding: '2rem', borderRadius: '24px', background: 'rgba(255, 87, 34, 0.05)',
                                border: '1px solid rgba(255, 87, 34, 0.2)',
                                cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s'
                            }}
                        >
                            <div style={{ color: '#ff5722', marginBottom: '1rem' }}><Trophy size={32} /></div>
                            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.4rem', color: isDarkMode ? '#fff' : '#1e293b' }}>Bypass Module</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Take skill validation</div>
                        </motion.button>
                    </div>
                </motion.div>
            </section>
        );
    }

    if (showPreQuiz) {
        return (
            <section ref={sectionRef} style={{ marginBottom: '10rem', scrollMarginTop: '60px' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1a1a1a', margin: '0 0 1rem 0' }}>{index + 1}. {subModule.title}</h1>
                </div>
                <PreAssessmentBlock
                    mcqs={mcqs}
                    isDarkMode={isDarkMode}
                    onComplete={(result) => {
                        if (result.passed) {
                            onPass(result);
                        } else {
                            setPreQuizDecision('read'); // If failed, force to read
                        }
                        setPreQuizAttempted(true);
                    }}
                />
            </section>
        );
    }

    return (
        <motion.section
            ref={sectionRef}
            initial={{ opacity: 0.92 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ marginBottom: '10rem', scrollMarginTop: '60px' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3.5rem' }}>
                <motion.div
                    id={headerId}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.5rem 1rem', background: 'rgba(255, 87, 34, 0.1)',
                        borderRadius: '100px', color: '#ff5722', fontSize: '0.75rem',
                        fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.05em'
                    }}>
                        MODULE {index + 1}
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#0f172a',
                        margin: 0, lineHeight: 1.1, letterSpacing: '-0.04em'
                    }}>
                        {subModule.title}
                    </h1>
                </motion.div>

            </div>



            <article>
                {content?.sections.map((section, sIdx) => (
                    <div
                        key={sIdx}
                        style={{ marginBottom: '2.5rem' }}
                    >
                        <motion.h2
                            initial={{ opacity: 0.25, filter: 'blur(8px)', x: -10 }}
                            whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                            viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                            transition={{ duration: 0.4 }}
                            style={{ fontSize: '1.15rem', fontWeight: 700, color: isDarkMode ? '#fff' : '#1a1a1a', marginBottom: '1rem' }}
                        >
                            {section.title}
                        </motion.h2>
                        {section.content.map((block, bIdx) => <ContentBlock key={bIdx} block={block} isDarkMode={isDarkMode} />)}
                    </div>
                ))}
            </article>

            {(!mcqs || mcqs.length === 0) && !progress?.completed && (
                <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onPass(100)}
                        style={{
                            padding: '1.25rem 2.5rem',
                            background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '20px',
                            fontWeight: 900,
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 15px 30px rgba(255, 87, 34, 0.25)',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Mark Lesson as Complete <CheckCircle2 size={22} />
                    </motion.button>
                </div>
            )}

            {mcqs && mcqs.length > 0 && (
                !progress?.quizCompleted ? (
                    <div style={{ marginTop: '3rem', padding: '2rem', background: isDarkMode ? '#1a1a1a' : '#fff', borderRadius: '20px', border: `1px solid ${isDarkMode ? '#222' : '#eee'}`, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#ff5722' }} />
                        <CleanQuizBlock mcqs={mcqs} onPass={onPass} isDarkMode={isDarkMode} />
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} style={{ marginTop: '6rem', padding: '2rem 2.5rem', background: isDarkMode ? 'rgba(16,185,129,0.05)' : '#F0FDF4', borderRadius: '20px', border: `1px solid ${isDarkMode ? 'rgba(16,185,129,0.1)' : '#DCFCE7'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <CheckCircle2 size={24} color="#10b981" />
                            <div>
                                <h4 style={{ margin: 0, color: isDarkMode ? '#fff' : '#166534', fontSize: '1.1rem', fontWeight: 800 }}>Section Completed!</h4>
                                <p style={{ margin: '0.2rem 0 0 0', color: isDarkMode ? '#888' : '#15803d', fontSize: '0.9rem' }}>Module synthesis recorded at {progress.score}% accuracy.</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ background: isDarkMode ? '#333' : '#333' }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.08 }}
                            onClick={onNext}
                            style={{ padding: '0.75rem 1.5rem', background: isDarkMode ? '#222' : '#1a1a1a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                        >
                            {isLastModule && levelId === 'lvl1' ? 'Go to Level 2' : 'Go to Next Module'} <ArrowRight size={16} />
                        </motion.button>
                    </motion.div>
                )
            )}

            {(!mcqs || mcqs.length === 0) && progress?.completed && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} style={{ marginTop: '6rem', padding: '2rem 2.5rem', background: isDarkMode ? 'rgba(16,185,129,0.05)' : '#F0FDF4', borderRadius: '20px', border: `1px solid ${isDarkMode ? 'rgba(16,185,129,0.1)' : '#DCFCE7'}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <CheckCircle2 size={24} color="#10b981" />
                        <div>
                            <h4 style={{ margin: 0, color: isDarkMode ? '#fff' : '#166534', fontSize: '1.1rem', fontWeight: 800 }}>Lesson Mastery!</h4>
                            <p style={{ margin: '0.2rem 0 0 0', color: isDarkMode ? '#888' : '#15803d', fontSize: '0.9rem' }}>You have successfully reviewed this section.</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.section>
    );
}

function ContentBlock({ block, isDarkMode }) {
    const renderContent = () => {
        if (block.subtitle) return (
            <div style={{ margin: '2rem 0 1rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '8px', height: '32px', background: 'linear-gradient(to bottom, #ff5722, #ff8a50)', borderRadius: '4px' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1e293b', margin: 0, letterSpacing: '-0.03em' }}>{block.subtitle}</h3>
            </div>
        );

        if (block.text) {
            if (block.text.trim().startsWith('Definition:')) {
                return (
                    <div style={{
                        margin: '1.5rem 0', padding: '1.5rem',
                        background: isDarkMode ? 'rgba(59,130,246,0.05)' : 'rgba(59,130,246,0.03)',
                        borderRadius: '24px', border: `1px solid ${isDarkMode ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.1)'}`,
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
                            background: '#3b82f6'
                        }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '24px', height: '24px', borderRadius: '6px',
                                background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Info size={14} color="#fff" />
                            </div>
                            <span style={{ color: '#3b82f6', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 900 }}>Module Concept</span>
                        </div>
                        <p style={{ margin: 0, lineHeight: 1.6, fontSize: '1rem', fontWeight: 600, color: isDarkMode ? '#e2e8f0' : '#1e293b' }}>
                            {block.text.replace('Definition:', '').trim()}
                        </p>
                    </div>
                );
            }

            const parts = block.text.split(/(\*\*.*?\*\*|###.*?\n|##.*?\n|Why it is needed:|What this session is about:)/);
            return (
                <div style={{
                    fontSize: '1rem',
                    lineHeight: 1.65,
                    color: isDarkMode ? 'var(--text-secondary)' : '#334155',
                    marginBottom: '1.5rem',
                    fontWeight: 450,
                    letterSpacing: '-0.01em'
                }}>
                    {parts.map((part, i) => {
                        if (!part) return null;
                        if (part.startsWith('###') || part.startsWith('##') || part === 'Why it is needed:' || part === 'What this session is about:') {
                            const isSubLevel = part.startsWith('###');
                            return (
                                <h3 key={i} style={{
                                    margin: isSubLevel ? '2rem 0 0.75rem 0' : '2.5rem 0 1rem 0',
                                    color: 'var(--text-primary)',
                                    fontWeight: 900,
                                    fontSize: isSubLevel ? '1.25rem' : '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    letterSpacing: '-0.04em'
                                }}>
                                    <div style={{
                                        width: '8px',
                                        height: isSubLevel ? '24px' : '32px',
                                        borderRadius: '4px',
                                        background: '#ff5722',
                                        boxShadow: '0 0 15px rgba(255, 87, 34, 0.3)'
                                    }} />
                                    {part.replace(/^#+/, '').trim()}
                                </h3>
                            );
                        }
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                                <strong key={i} style={{
                                    color: 'var(--text-primary)',
                                    fontWeight: 800,
                                    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 87, 34, 0.03)',
                                    padding: '2px 8px',
                                    borderRadius: '6px',
                                    border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255, 87, 34, 0.05)'
                                }}>
                                    {part.slice(2, -2)}
                                </strong>
                            );
                        }
                        return <span key={i}>{part}</span>;
                    })}
                </div>
            );
        }

        if (block.list) return (
            <div style={{
                margin: '2rem 0',
                padding: '3rem',
                background: isDarkMode ? 'rgba(255,255,255,0.01)' : '#fff',
                borderRadius: '32px',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                boxShadow: isDarkMode ? '0 20px 50px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.02)',
                position: 'relative'
            }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#ff5722', marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Target size={16} /> Key Learning Objectives:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {block.list.map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, marginTop: '2px'
                            }}>
                                <Check size={16} strokeWidth={3} />
                            </div>
                            <span style={{ fontSize: '1rem', color: isDarkMode ? 'var(--text-secondary)' : '#334155', fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        );

        if (block.visualization) return (
            <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                style={{
                    padding: '2rem', margin: '2.5rem 0', borderRadius: '24px',
                    background: isDarkMode ? 'linear-gradient(135deg, #111 0%, #050505 100%)' : '#f8fafc',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 87, 34, 0.25)' : 'rgba(0,0,0,0.05)'}`,
                    position: 'relative', overflow: 'hidden',
                    boxShadow: isDarkMode ? '0 30px 60px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.04)'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '6px 16px', borderRadius: '100px', background: 'rgba(255, 87, 34, 0.15)', color: '#ff5722', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.1em' }}>INTERACTIVE LAB</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1.25rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>{block.visualization.title}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ff5722', fontWeight: 800, fontSize: '1.1rem' }}>
                            <span>Launch Tool</span>
                            <ArrowRight size={20} />
                        </div>
                    </div>
                    <div style={{
                        width: '100px', height: '100px', borderRadius: '30px',
                        background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 20px 40px rgba(255, 87, 34, 0.3)', flexShrink: 0
                    }}>
                        <Bot size={45} color="#fff" />
                    </div>
                </div>
                <a href={block.visualization.link} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5 }} />
            </motion.div>
        );

        if (block.example) return (
            <div style={{
                margin: '2rem 0', borderRadius: '20px', overflow: 'hidden',
                background: '#0a0a0b', border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.3)'
            }}>
                <div style={{
                    padding: '1rem 2rem', background: '#141415',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{block.example.title}</span>
                </div>
                <div style={{ padding: '3rem', fontFamily: '"JetBrains Mono", monospace', fontSize: '1.05rem' }}>
                    {block.example.input && (
                        <div style={{ marginBottom: '2.5rem' }}>
                            <div style={{ color: '#444', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 900, letterSpacing: '0.05em' }}>PROMPT</div>
                            <div style={{ color: '#fff', lineHeight: 1.7, background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid #444' }}>{block.example.input}</div>
                        </div>
                    )}
                    {block.example.output && (
                        <div>
                            <div style={{ color: 'rgba(16, 185, 129, 0.4)', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 900, letterSpacing: '0.05em' }}>AI RESPONSE</div>
                            <div style={{ color: '#10b981', lineHeight: 1.7, background: 'rgba(16, 185, 129, 0.03)', padding: '1.5rem', borderRadius: '12px', borderLeft: '3px solid #10b981' }}>{block.example.output}</div>
                        </div>
                    )}
                </div>
            </div>
        );

        if (block.note) return (
            <div style={{
                margin: '2rem 0', padding: '1.25rem 2rem',
                background: isDarkMode ? 'rgba(255, 160, 0, 0.08)' : 'rgba(255,160,0,0.05)',
                borderRadius: '24px',
                border: `1px solid ${isDarkMode ? 'rgba(255, 160, 0, 0.2)' : '#ffa000'}`,
                display: 'flex', gap: '1.5rem', alignItems: 'center'
            }}>
                <Lightbulb size={28} color="#ffa000" />
                <p style={{ margin: 0, color: isDarkMode ? '#ffb333' : '#92400e', fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.6 }}>{block.note}</p>
            </div>
        );

        if (block.table) return (
            <div style={{ overflowX: 'auto', margin: '2rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: isDarkMode ? 'rgba(255,255,255,0.02)' : '#fff', borderRadius: '12px', overflow: 'hidden' }}>
                    <thead>
                        <tr style={{ background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc' }}>
                            {block.table.headers.map((header, i) => (
                                <th key={i} style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: isDarkMode ? '#fff' : '#1e293b', borderBottom: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}` }}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {block.table.rows.map((row, i) => (
                            <tr key={i} style={{ borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : '#e2e8f0'}` }}>
                                {row.map((cell, j) => (
                                    <td key={j} style={{ padding: '1rem', color: isDarkMode ? '#94a3b8' : '#475569' }}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

        if (block.quote) return (
            <div style={{ margin: '3rem 0', textAlign: 'center', position: 'relative' }}>
                <span style={{
                    position: 'absolute', top: '-4.5rem', left: '50%', transform: 'translateX(-50%)',
                    fontSize: '10rem', color: 'rgba(255, 87, 34, 0.1)', fontFamily: 'serif', lineHeight: 1
                }}>"</span>
                <p style={{ fontSize: '2.8rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.1, position: 'relative', zIndex: 1, letterSpacing: '-0.05em', maxWidth: '800px', margin: '0 auto' }}>{block.quote}</p>
                <div style={{ width: '60px', height: '4px', background: '#ff5722', margin: '3rem auto 0', borderRadius: '2px' }} />
            </div>
        );

        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0.25, filter: 'blur(8px)', y: 10 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {renderContent()}
        </motion.div>
    );
}


function PreAssessmentBlock({ mcqs, onComplete, isDarkMode }) {
    const questions = mcqs ? mcqs.slice(0, 5) : [];
    const [currentStep, setCurrentStep] = useState(0);
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFinished, setIsFinished] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [timerActive, setTimerActive] = useState(false); // Track if timer has started

    if (questions.length === 0) return null;

    const q = questions[currentStep];

    const handleSubmit = (autoSubmit = false) => {
        if (submitted && !autoSubmit) return;
        if (selectedOption === null && !autoSubmit) return;
        const isCorrect = selectedOption === q.correctAnswer;

        const newStats = {
            correct: stats.correct + (isCorrect ? 1 : 0),
            incorrect: stats.incorrect + (isCorrect ? 0 : 1)
        };
        setStats(newStats);
        setSubmitted(true);

        setTimeout(() => {
            if (currentStep < questions.length - 1) {
                setCurrentStep(prev => prev + 1);
                setSelectedOption(null);
                setSubmitted(false);
                setTimeLeft(10);
            } else {
                setIsFinished(true);
            }
        }, 1000);
    };

    useEffect(() => {
        // Only run timer if it's active OR if we're past the first question (which auto-activates)
        const shouldRun = timerActive || currentStep > 0;

        if (isFinished || submitted || !shouldRun) return;

        if (timeLeft === 0) {
            handleSubmit(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isFinished, submitted, timerActive, currentStep]);

    // Activate timer on first interaction if sticking to Q1 logic
    const handleOptionSelect = (idx) => {
        if (!submitted) {
            setSelectedOption(idx);
            if (currentStep === 0 && !timerActive) {
                setTimerActive(true);
            }
        }
    };

    if (isFinished) {
        const passed = stats.incorrect === 0;
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '6rem 2rem', textAlign: 'center', minHeight: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>{passed ? '🏆' : '📚'}</div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', color: isDarkMode ? '#fff' : '#1e293b' }}>
                    {passed ? 'Outstanding Mastery!' : 'Knowledge Gap Detected'}
                </h3>
                <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
                    {passed
                        ? 'You have successfully demonstrated proficiency in this topic. You have bypassed this module.'
                        : 'Your responses indicate opportunities for growth. To ensure comprehensive understanding, please proceed through the full learning module.'}
                </p>
                <button
                    onClick={() => onComplete({ passed, correct: stats.correct, total: questions.length })}
                    style={{
                        padding: '1.25rem 3rem',
                        background: passed ? '#10b981' : '#ff5722',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '16px',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                >
                    {passed ? 'Complete & Skip Module' : 'Start Learning Module'}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', minHeight: '600px' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 87, 34, 0.1)', color: '#ff5722',
                        fontWeight: 900, borderRadius: '100px', fontSize: '0.75rem', letterSpacing: '0.05em'
                    }}>
                        VALIDATION
                    </div>

                    {/* Circular Timer - Matching CleanQuizBlock but smaller */}
                    <div style={{
                        position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <svg width="36" height="36" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#e2e8f0'} strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke={timeLeft <= 3 ? '#ef4444' : '#ff5722'}
                                strokeWidth="8"
                                strokeDasharray="283"
                                animate={{ strokeDashoffset: 283 - (283 * timeLeft / 10) }}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                        <span style={{ position: 'absolute', fontWeight: 900, fontSize: '0.7rem', color: timeLeft <= 3 ? '#ef4444' : 'inherit' }}>{timeLeft}</span>
                    </div>
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: isDarkMode ? '#fff' : '#1e293b', margin: 0 }}>
                    Question {currentStep + 1} <span style={{ color: '#94a3b8', fontWeight: 500 }}>/ {questions.length}</span>
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.4 }}>
                    Answer <strong>all 5</strong> correctly to bypass.
                </p>
            </div>

            <div style={{ background: isDarkMode ? '#1a1a1a' : '#fff', padding: '2rem', borderRadius: '20px', border: `1px solid ${isDarkMode ? '#333' : '#f1f5f9'}`, boxShadow: '0 4px 20px rgba(0,0,0,0.02)', maxWidth: '600px', margin: '0 auto' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: isDarkMode ? '#e2e8f0' : '#334155', lineHeight: 1.4 }}>{q.question}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {q.options.map((opt, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            style={{
                                padding: '1rem', // Reduced padding
                                border: selectedOption === idx ? '2px solid #ff5722' : (isDarkMode ? '1px solid #333' : '1px solid #e2e8f0'),
                                background: selectedOption === idx ? 'rgba(255, 87, 34, 0.05)' : (isDarkMode ? '#111' : '#f8fafc'),
                                borderRadius: '12px', // Slightly smaller radius
                                cursor: submitted ? 'default' : 'pointer',
                                opacity: submitted && selectedOption !== idx ? 0.5 : 1,
                                fontSize: '0.95rem', // Smaller font
                                color: isDarkMode ? '#fff' : '#334155',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>

                <button
                    disabled={selectedOption === null || submitted}
                    onClick={handleSubmit}
                    style={{
                        marginTop: '2.5rem', width: '100%', padding: '1.25rem',
                        background: selectedOption === null ? (isDarkMode ? '#333' : '#e2e8f0') : 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                        color: selectedOption === null ? '#888' : '#fff', border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '1.1rem', cursor: selectedOption === null ? 'not-allowed' : 'pointer',
                        boxShadow: selectedOption !== null ? '0 10px 20px rgba(255,87,34,0.2)' : 'none'
                    }}
                >
                    {submitted ? 'Processing...' : 'Submit Answer'}
                </button>
            </div>
        </motion.div>
    );
}
