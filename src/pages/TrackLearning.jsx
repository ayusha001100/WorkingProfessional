import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, FileText, MessageSquare, Brain, HelpCircle, ArrowRight, Target, TrendingUp, Award, Shield, Rocket, Zap, Star, Youtube, List, Check, Sparkles, AlertCircle, BarChart3, Flame, ShieldCheck, Activity, UserPlus, Briefcase, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import DashboardLayout from '../components/DashboardLayout';
import { TRACKS } from '../data/tracks';
import { GEN_AI_COURSE } from '../data/genAiCourse';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';
import IntelligentRoadmap from '../components/IntelligentRoadmap';
import PremiumPaywall from '../components/PremiumPaywall';
import CourseDetailDrawer from '../components/CourseDetailDrawer';

export default function TrackLearning() {
    const { user, userData, setUserData } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const userDomain = userData?.onboarding?.dreamRole || "Social Media Manager";
    const [domainChangeKey, setDomainChangeKey] = useState(0);
    const [isDomainTransitioning, setIsDomainTransitioning] = useState(false);

    // Track previous domain to detect changes
    const prevDomainRef = useRef(userDomain);

    // Detect domain changes and trigger smooth transition
    useEffect(() => {
        if (prevDomainRef.current !== userDomain && prevDomainRef.current) {
            setIsDomainTransitioning(true);
            setDomainChangeKey(prev => prev + 1);
            // Reset transition state after animation
            setTimeout(() => setIsDomainTransitioning(false), 350);
        }
        prevDomainRef.current = userDomain;
    }, [userDomain]);

    const [careerSignal, setCareerSignal] = useState(0);
    const [showSignalToast, setShowSignalToast] = useState(!localStorage.getItem('hasSeenSignalToast'));
    const careerSignals = [
        "3 recruiters from top AI firms viewed similar profiles today",
        `${userDomain}s using Gen AI earn 27% more than peers`,
        "Your skill gap vs Adobe Senior Roles was updated 10m ago",
        "New high-paying roles found for your profile with Gen AI mastery",
        "Learning streak active: You are in the top 5% of Mumbai learners"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCareerSignal(prev => (prev + 1) % careerSignals.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const [selectedModule, setSelectedModule] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [moduleProgress, setModuleProgress] = useState({
        "lvl1": { unlocked: true, completed: false },
    });

    useEffect(() => {
        if (userData?.progress?.moduleProgress) {
            setModuleProgress(userData.progress.moduleProgress);
        }
    }, [userData]);

    const allItems = GEN_AI_COURSE.modules;

    // Check if module is unlocked based on previous completion
    const isModuleUnlocked = (index) => {
        if (index === 0) return true;
        const prevModule = allItems[index - 1];
        return moduleProgress[prevModule?.id]?.completed === true;
    };

    const currentModuleId = Object.keys(moduleProgress)
        .filter(id => moduleProgress[id].unlocked && !moduleProgress[id].completed)
        .sort((a, b) => {
            const indexA = allItems.findIndex(i => i.id === a);
            const indexB = allItems.findIndex(i => i.id === b);
            return indexA - indexB;
        })[0] || 'lvl1';

    const currentIndex = allItems.findIndex(item => item.id === currentModuleId);

    // Properly analyze Journey (Levels) and Mastery (Sub-modules)
    // Simplified calculation: Every level is 10% of progress
    const completedLevelsCount = Object.values(userData?.progress?.moduleProgress || {})
        .filter(m => m.completed).length;

    // Find current level for partial progress
    const currentModule = allItems.find(m => {
        const p = userData?.progress?.moduleProgress?.[m.id];
        return p?.unlocked && !p?.completed;
    }) || allItems[completedLevelsCount]; // Fallback to next locked one if all unlocked

    let currentLevelPartial = 0;
    if (currentModule) {
        const levelSubModules = SUB_MODULES_CONTENT[currentModule.id] || {};
        const totalSM = Object.keys(levelSubModules).length;
        const subModuleProgress = userData?.progress?.subModuleProgress?.[currentModule.id] || {};
        const completedSMCount = Object.values(subModuleProgress).filter(sm => sm.completed).length;
        if (totalSM > 0) {
            currentLevelPartial = (completedSMCount / totalSM) * 10;
        }
    }

    const journeyPercent = Math.min(100, Math.round((completedLevelsCount / allItems.length) * 100));
    const masteryPercent = Math.min(100, Math.round((completedLevelsCount * 10) + currentLevelPartial));

    const [isPaywallOpen, setIsPaywallOpen] = useState(false);
    const [selectedPaymentModule, setSelectedPaymentModule] = useState(null);

    const handleModuleClick = (module, index) => {
        console.log('Module clicked:', {
            id: module.id,
            index,
            isPremium: module.isPremium,
            userIsPremium: userData?.isPremium,
            level: index + 1
        });

        // Check if module is premium (Level 3+) and user doesn't have access
        // Show paywall if user is not premium.
        // Even if user IS premium, they must follow sequential unlocking, so we check this first.
        if (index >= 2 && !userData?.isPremium) {
            console.log('Showing paywall for premium module');
            setSelectedPaymentModule({ module, index });
            setIsPaywallOpen(true);
            return;
        }

        // Check if module is unlocked (Level 2 unlocks after Level 1 completion)
        if (!isModuleUnlocked(index)) {
            console.log('Module not unlocked');
            return; // Don't open if previous module not completed
        }

        console.log('Opening module drawer');
        setSelectedModule({ module, index });
        setIsDrawerOpen(true);
    };

    const handleRazorpayPayment = () => {
        if (typeof window.Razorpay === 'undefined') {
            alert('Razorpay SDK not loaded. Please refresh the page.');
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_1DP5mmOlF5G5ag', // Replace with your Razorpay key
            amount: 2990000, // 29,900 INR in paise
            currency: 'INR',
            name: 'LetsUpgrade',
            description: 'AI-First Professional Course - Level 3+',
            handler: function (response) {
                // Handle successful payment
                console.log('Payment successful:', response);

                // DO NOT auto-update isPremium. This key is controlled solely via Firestore admin.
                // setUserData(prev => ({ ...prev, isPremium: true }));

                setIsPaywallOpen(false);
                setSelectedPaymentModule(null);
                alert('Payment received! Your access to Premium Levels (3-12) will be activated shortly by our team.');
            },
            prefill: {
                name: userData?.name || '',
                email: user?.email || '',
                contact: userData?.mobile || ''
            },
            theme: {
                color: '#FF5722'
            },
            modal: {
                ondismiss: function () {
                    console.log('Payment cancelled');
                }
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <DashboardLayout headerExtras={
            <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                {/* Journey Mastery Progress */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '1rem',
                        paddingLeft: '2rem',
                        borderLeft: theme === 'light' ? '2px solid rgba(0,0,0,0.06)' : '2px solid rgba(255,255,255,0.06)',
                        flexShrink: 0
                    }}
                >
                    <span style={{
                        fontWeight: 600,
                        color: theme === 'light' ? '#64748b' : '#94a3b8',
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap'
                    }}>
                        Journey Mastery
                    </span>
                    <div style={{
                        width: '100px',
                        height: '4px',
                        background: theme === 'light' ? '#e5e7eb' : '#2a2a2a',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${masteryPercent}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            style={{
                                height: '100%',
                                background: '#3b82f6',
                                borderRadius: '10px'
                            }}
                        />
                    </div>
                    <span style={{
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        fontSize: '0.7rem',
                        minWidth: '36px',
                        fontVariantNumeric: 'tabular-nums'
                    }}>
                        {masteryPercent}%
                    </span>
                </motion.div>
            </div>
        }>
            <div style={{
                minHeight: '100vh',
                background: theme === 'light' ? '#fafafa' : 'var(--bg-primary)',
                padding: '2rem clamp(1rem, 4vw, 2.5rem)',
                width: '100%',
                maxWidth: '1800px', // Increased from 1400px
                margin: '0 auto',
                boxSizing: 'border-box',
                overflowX: 'hidden'
            }}>
                {/* Dismissible Signal Toast */}
                <AnimatePresence>
                    {showSignalToast && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={{
                                position: 'fixed',
                                bottom: '2rem', // Moved to bottom to avoid header overlap
                                right: '2rem',
                                background: theme === 'light' ? '#ffffff' : '#1a1a1a',
                                padding: '0.75rem 1rem',
                                borderRadius: '12px',
                                border: theme === 'light' ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                zIndex: 200,
                                // Toast should be above header (90) but below modals (1000+)
                                maxWidth: '400px'
                            }}
                        >
                            <div style={{ background: '#ff5722', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 900 }}>SIGNAL</div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', flex: 1 }}>
                                {careerSignals[careerSignal]}
                            </span>
                            <button
                                onClick={() => {
                                    setShowSignalToast(false);
                                    localStorage.setItem('hasSeenSignalToast', 'true');
                                }}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0
                                }}
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Career Milestone Cards - 3 Columns with Path Flow */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1600px', // Increased from 1200px
                    margin: '0 auto',
                    paddingTop: '2rem',
                    position: 'relative',
                    width: '100%',
                    boxSizing: 'border-box'
                }}
                    className="course-grid"
                >
                    {/* Subtle Path Indicator - Vertical Flow (Desktop only) */}

                    <style>{`
                        @media (max-width: 1023px) {
                            .path-indicator {
                                display: none !important;
                            }
                            .course-grid {
                                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
                            }
                        }
                        @media (max-width: 639px) {
                            .course-grid {
                                grid-template-columns: 1fr !important;
                            }
                        }
                        @keyframes subtleGlow {
                            0%, 100% {
                                opacity: 0.1;
                            }
                            50% {
                                opacity: 0.2;
                            }
                        }
                        .active-card-glow {
                            animation: subtleGlow 3s ease-in-out infinite;
                        }
                    `}</style>
                    {allItems.map((item, index) => {
                        const isUnlocked = isModuleUnlocked(index);
                        const isCompleted = moduleProgress[item.id]?.completed;
                        const isCurrent = (index === currentIndex);
                        const isPremium = item.isPremium;
                        const isUpcoming = !isUnlocked;
                        const isFinalMilestone = index === 11; // Level 12
                        const levelNumber = index + 1;

                        // Identify if this is the start of a new phase
                        const isNewPhase = index === 0 || item.phase !== allItems[index - 1].phase;

                        // Transformation sentence - emotional hook
                        const transformation = item.after || item.outcome || item.youBecome;

                        return (
                            <React.Fragment key={item.id}>
                                {isNewPhase && (
                                    <div style={{
                                        gridColumn: '1 / -1',
                                        marginTop: index === 0 ? '0' : '3.5rem',
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1.5rem',
                                        width: '100%'
                                    }}>
                                        <h2 style={{
                                            fontSize: '0.85rem',
                                            fontWeight: 900,
                                            color: theme === 'light' ? '#334155' : '#cbd5e1',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.15em',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            margin: 0,
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {item.phase}
                                        </h2>
                                        <div style={{
                                            flex: 1,
                                            height: '1px',
                                            background: theme === 'light'
                                                ? 'linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)'
                                                : 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
                                        }} />
                                    </div>
                                )}
                                <div
                                    style={{
                                        position: 'relative',
                                        zIndex: isFinalMilestone ? 2 : 1
                                    }}
                                >

                                    {/* Subtle Glow Pulse for Active Card */}
                                    {isCurrent && (
                                        <motion.div
                                            className="active-card-glow"
                                            style={{
                                                position: 'absolute',
                                                inset: '-4px',
                                                borderRadius: '22px',
                                                background: theme === 'light'
                                                    ? 'radial-gradient(circle, rgba(255, 87, 34, 0.08) 0%, transparent 70%)'
                                                    : 'radial-gradient(circle, rgba(255, 87, 34, 0.15) 0%, transparent 70%)',
                                                zIndex: -1,
                                                pointerEvents: 'none'
                                            }}
                                            animate={{
                                                opacity: [0.1, 0.2, 0.1]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: 'easeInOut'
                                            }}
                                        />
                                    )}
                                    <motion.div
                                        layoutId={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.04,
                                            ease: [0.4, 0, 0.2, 1]
                                        }}
                                        whileHover={(isUnlocked || isFinalMilestone) ? {
                                            y: -3,
                                            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                                        } : {
                                            y: -2,
                                            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                                        }}
                                        onClick={() => {
                                            if (isFinalMilestone) {
                                                navigate('/certification');
                                            } else {
                                                handleModuleClick(item, index);
                                            }
                                        }}
                                        style={{
                                            position: 'relative',
                                            background: theme === 'light'
                                                ? (isCurrent ? '#ffffff' : '#ffffff')
                                                : (isCurrent ? '#161616' : '#121212'),
                                            borderRadius: '20px',
                                            padding: '2rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            height: '100%',
                                            minHeight: '340px',
                                            boxShadow: isCurrent
                                                ? (theme === 'light'
                                                    ? '0 12px 30px rgba(255, 87, 34, 0.08), 0 0 0 1px rgba(255, 87, 34, 0.2)'
                                                    : '0 12px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 87, 34, 0.25)')
                                                : (theme === 'light'
                                                    ? '0 4px 12px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.02)'
                                                    : '0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)'),
                                            opacity: isUpcoming && !isFinalMilestone ? 0.7 : 1,
                                            border: 'none',
                                            overflow: 'visible'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (isUnlocked || isFinalMilestone) {
                                                e.currentTarget.style.boxShadow = isCurrent
                                                    ? (theme === 'light'
                                                        ? '0 20px 48px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 87, 34, 0.15)'
                                                        : '0 20px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 87, 34, 0.2)')
                                                    : isFinalMilestone
                                                        ? (theme === 'light'
                                                            ? '0 12px 40px rgba(255, 87, 34, 0.2)'
                                                            : '0 12px 40px rgba(255, 87, 34, 0.4)')
                                                        : (theme === 'light'
                                                            ? '0 12px 40px rgba(0, 0, 0, 0.12)'
                                                            : '0 12px 40px rgba(0, 0, 0, 0.5)');
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = isCurrent
                                                ? (theme === 'light'
                                                    ? '0 16px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 87, 34, 0.1)'
                                                    : '0 16px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 87, 34, 0.15)')
                                                : isFinalMilestone
                                                    ? (theme === 'light'
                                                        ? '0 8px 32px rgba(255, 87, 34, 0.15)'
                                                        : '0 8px 32px rgba(255, 87, 34, 0.3)')
                                                    : (theme === 'light'
                                                        ? '0 2px 12px rgba(0, 0, 0, 0.06)'
                                                        : '0 2px 12px rgba(0, 0, 0, 0.2)');
                                        }}
                                    >
                                        {/* Floating START Badge */}
                                        {index === 0 && !isCompleted && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-12px',
                                                left: '2rem',
                                                padding: '4px 14px',
                                                background: '#ff5722',
                                                color: '#fff',
                                                borderRadius: '8px',
                                                fontSize: '0.7rem',
                                                fontWeight: 900,
                                                boxShadow: '0 8px 16px rgba(255, 87, 34, 0.3)',
                                                zIndex: 10,
                                                letterSpacing: '0.05em',
                                                textTransform: 'uppercase'
                                            }}>
                                                START
                                            </div>
                                        )}

                                        {/* 1. TOP BAR - Status + Level (Grouped) */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginBottom: '1.75rem',
                                            paddingBottom: '1rem',
                                            borderBottom: theme === 'light' ? '1px solid #f3f4f6' : '1px solid #2a2a2a'
                                        }}>
                                            {/* Left: Status */}
                                            <div>
                                                {isCompleted ? (
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 800,
                                                        color: '#10b981',
                                                        letterSpacing: '0.08em',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        COMPLETED
                                                    </span>
                                                ) : isFinalMilestone ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <Award size={14} color="#ff5722" />
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff5722', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                                            FINAL MILESTONE
                                                        </span>
                                                    </div>
                                                ) : isCurrent ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5722', boxShadow: '0 0 8px rgba(255, 87, 34, 0.5)' }} />
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff5722', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                                            IN PROGRESS
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span style={{
                                                        fontSize: '0.75rem',
                                                        fontWeight: 800,
                                                        color: theme === 'light' ? '#cbd5e1' : '#4b5563',
                                                        letterSpacing: '0.08em',
                                                        textTransform: 'uppercase'
                                                    }}>
                                                        UPCOMING
                                                    </span>
                                                )}
                                            </div>

                                            {/* Right: Level Number */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: theme === 'light' ? '#cbd5e1' : '#4b5563', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                                    LEVEL
                                                </span>
                                                <div style={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 900,
                                                    color: theme === 'light' ? '#cbd5e1' : '#4b5563',
                                                    letterSpacing: '0.05em',
                                                    fontVariantNumeric: 'tabular-nums',
                                                    lineHeight: 1,
                                                    opacity: 0.8
                                                }}>
                                                    {String(levelNumber).padStart(2, '0')}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2. IDENTITY ZONE - Large, confident title */}
                                        <motion.h3
                                            key={`${item.id}-${domainChangeKey}`}
                                            initial={isDomainTransitioning ? { opacity: 0.95 } : false}
                                            animate={{
                                                opacity: 1,
                                                backgroundColor: isDomainTransitioning && isCurrent
                                                    ? (theme === 'light' ? 'rgba(255, 87, 34, 0.02)' : 'rgba(255, 87, 34, 0.05)')
                                                    : 'transparent'
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: 'easeOut',
                                                backgroundColor: { duration: 0.6 }
                                            }}
                                            style={{
                                                margin: '0 0 0.75rem 0',
                                                fontSize: isFinalMilestone ? '1.6rem' : (isCurrent ? '1.5rem' : '1.35rem'),
                                                fontWeight: 800,
                                                color: theme === 'light' ? '#111827' : '#f9fafb',
                                                lineHeight: 1.2,
                                                letterSpacing: '-0.02em',
                                                padding: isDomainTransitioning && isCurrent ? '0.25rem 0.5rem' : '0',
                                                borderRadius: isDomainTransitioning && isCurrent ? '6px' : '0',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div style={{ display: 'block' }}>{item.title}</div>
                                            {userDomain && userDomain !== 'Aspiring Pro' && userDomain !== 'Social Media Manager' && !isFinalMilestone && (
                                                <motion.div
                                                    key={`domain-${userDomain}-${domainChangeKey}`}
                                                    initial={isDomainTransitioning ? { opacity: 0, x: -4 } : false}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: 0.15 }}
                                                    style={{
                                                        fontSize: '0.65em',
                                                        fontWeight: 600,
                                                        color: theme === 'light' ? '#64748b' : '#94a3b8',
                                                        marginTop: '0.35rem'
                                                    }}
                                                >
                                                    for {userDomain}s
                                                </motion.div>
                                            )}
                                        </motion.h3>





                                        {/* You Become Quote Box */}
                                        {!isFinalMilestone && item.youBecome && (
                                            <div style={{
                                                marginBottom: '1.5rem',
                                                padding: '1.25rem 1.5rem',
                                                background: theme === 'light' ? '#fff7f2' : 'rgba(255, 87, 34, 0.05)',
                                                borderRadius: '16px',
                                                border: theme === 'light' ? '1px solid #ffe5d6' : '1px solid rgba(255, 87, 34, 0.1)',
                                                position: 'relative'
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '0.95rem',
                                                    color: theme === 'light' ? '#1e293b' : '#f1f5f9',
                                                    lineHeight: 1.4,
                                                    fontWeight: 700,
                                                    fontStyle: 'italic',
                                                    textAlign: 'center'
                                                }}>
                                                    {item.youBecome}
                                                </p>
                                            </div>
                                        )}

                                        {/* What People Say Section */}
                                        {!isFinalMilestone && item.outcome && (
                                            <div style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    fontWeight: 800,
                                                    color: theme === 'light' ? '#94a3b8' : '#64748b',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em',
                                                    marginBottom: '0.5rem',
                                                    display: 'block'
                                                }}>
                                                    WHAT PEOPLE SAY
                                                </span>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '0.9rem',
                                                    color: theme === 'light' ? '#334155' : '#cbd5e1',
                                                    lineHeight: 1.5,
                                                    fontWeight: 600
                                                }}>
                                                    {item.outcome}
                                                </p>
                                            </div>
                                        )}

                                        {/* Final Milestone Special Content */}
                                        {isFinalMilestone && (
                                            <div style={{
                                                marginBottom: '1rem',
                                                padding: '0.875rem',
                                                background: theme === 'light' ? '#fff7f2' : 'rgba(255, 87, 34, 0.08)',
                                                borderRadius: '10px',
                                                border: theme === 'light' ? '1px solid #ffe5d6' : '1px solid rgba(255, 87, 34, 0.15)'
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    fontSize: '0.9rem',
                                                    color: theme === 'light' ? '#111827' : '#f9fafb',
                                                    lineHeight: 1.6,
                                                    fontWeight: 500
                                                }}>
                                                    This is where your journey turns into a credential.
                                                </p>
                                            </div>
                                        )}

                                        <div style={{
                                            marginTop: 'auto',
                                            paddingTop: '1.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderTop: theme === 'light' ? '1px solid #f1f5f9' : '1px solid #2a2a2a'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '8px',
                                                    background: isCompleted ? '#10b981' : (isCurrent ? '#ff5722' : (theme === 'light' ? '#f8fafc' : '#1a1a1a')),
                                                    border: isCompleted || isCurrent ? 'none' : `1px solid ${theme === 'light' ? '#e2e8f0' : '#333'}`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#fff',
                                                    boxShadow: (isCompleted || isCurrent) ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
                                                }}>
                                                    {isCompleted ? <Check size={16} strokeWidth={3} /> : (isCurrent ? <Rocket size={14} /> : <Rocket size={14} color={theme === 'light' ? '#94a3b8' : '#4b5563'} />)}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{
                                                        fontSize: '0.85rem',
                                                        fontWeight: 700,
                                                        color: isCompleted ? '#10b981' : (isCurrent ? '#ff5722' : (theme === 'light' ? '#94a3b8' : '#64748b')),
                                                        lineHeight: 1.2
                                                    }}>
                                                        {isCompleted ? 'Revisit Anytime' : (isCurrent ? 'Continue Learning' : (index >= 2 && !userData?.isPremium ? 'Premium Lock' : 'Get Started'))}
                                                    </span>
                                                    {isCompleted && (
                                                        <span style={{
                                                            fontSize: '0.65rem',
                                                            color: '#10b981',
                                                            fontWeight: 600,
                                                            opacity: 0.9,
                                                            letterSpacing: '0.02em'
                                                        }}>
                                                            {Object.keys(SUB_MODULES_CONTENT[item.id] || {}).length}/{Object.keys(SUB_MODULES_CONTENT[item.id] || {}).length} Mastered
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {(isUnlocked || isFinalMilestone) && (
                                                <motion.div
                                                    animate={isCurrent ? {
                                                        x: [0, 4, 0],
                                                        transition: { duration: 2, repeat: Infinity }
                                                    } : {}}
                                                    style={{ color: isCompleted ? '#10b981' : (isCurrent ? '#ff5722' : '#cbd5e1') }}
                                                >
                                                    <ArrowRight size={20} />
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Course Detail Drawer */}
                {
                    selectedModule && (
                        <CourseDetailDrawer
                            isOpen={isDrawerOpen}
                            onClose={() => {
                                setIsDrawerOpen(false);
                                setTimeout(() => setSelectedModule(null), 300);
                            }}
                            module={selectedModule.module}
                            index={selectedModule.index}
                            isUnlocked={moduleProgress[selectedModule.module.id]?.unlocked || selectedModule.index === 0}
                            isCompleted={moduleProgress[selectedModule.module.id]?.completed}
                            isCurrent={selectedModule.index === currentIndex}
                            isPremium={selectedModule.module.isPremium}
                            userData={userData}
                            userDomain={userDomain}
                        />
                    )
                }

                <PremiumPaywall
                    isOpen={isPaywallOpen}
                    onClose={() => {
                        setIsPaywallOpen(false);
                        setSelectedPaymentModule(null);
                    }}
                    module={selectedPaymentModule?.module}
                    price={selectedPaymentModule?.module?.price || 29900}
                    onPayment={handleRazorpayPayment}
                />
            </div>
        </DashboardLayout>
    );
}
