import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
    ArrowLeft, CheckCircle2, ChevronRight, Menu, X,
    PlayCircle, BookOpen, Clock, Lightbulb,
    Share2, Bookmark, Sun, Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { GEN_AI_COURSE } from '../data/genAiCourse';
import { SUB_MODULES_CONTENT } from '../data/subModulesContent';
import { SUB_MODULE_MCQS } from '../data/subModuleMCQs';

export default function LearningPlayerPage() {
    const { levelId, subModuleId } = useParams();
    const navigate = useNavigate();
    const { userData, setUserData } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Content Loading Logic
    const module = GEN_AI_COURSE.modules.find(m => m.id === levelId);
    const subModules = levelId === 'lvl1' ? [
        { id: 'lvl1_sub1', title: 'Introduction & AI Basics' },
        { id: 'lvl1_sub2', title: 'How GenAI Works (Technical)' },
        { id: 'lvl1_sub3', title: 'Key Concepts (Tokens & Limits)' },
        { id: 'lvl1_sub4', title: 'Capabilities & Limitations' },
        { id: 'lvl1_sub5', title: 'Prompt Engineering' },
        { id: 'lvl1_sub6', title: 'Model Settings' },
        { id: 'lvl1_sub7', title: 'Applications & Tools' },
        { id: 'lvl1_sub8', title: 'Practice & Takeaways' }
    ] : [
        { id: 'lvl2_sub1', title: 'LEVEL 2' },
        { id: 'lvl2_sub2', title: 'Why Visuals Matter at Work' },
        { id: 'lvl2_sub3', title: 'Intro to Visual GenAI' },
        { id: 'lvl2_sub4', title: 'Diffusion Models (Intuition)' },
        { id: 'lvl2_sub5', title: 'Visual Storytelling' },
        { id: 'lvl2_sub6', title: 'AI Tools Overview (Images)' },
        { id: 'lvl2_sub7', title: 'AI Tools Overview (Video)' },
        { id: 'lvl2_sub8', title: 'Hands-On Visual Creation' },
        { id: 'lvl2_sub9', title: 'Custom GPTs (AI Bots)' },
        { id: 'lvl2_sub10', title: 'Components of a Custom GPT' },
        { id: 'lvl2_sub11', title: 'Prompt Structure for Custom GPTs' },
        { id: 'lvl2_sub12', title: 'Agentic AI' },
        { id: 'lvl2_sub13', title: 'Agent Workflow Example' },
        { id: 'lvl2_sub14', title: 'AI Generalist Role' },
        { id: 'lvl2_sub15', title: '15 & 16. Q&A and Next Steps' }
    ];

    const currentSubModule = subModules.find(sm => sm.id === subModuleId);
    const content = SUB_MODULES_CONTENT[levelId]?.[subModuleId];
    const currentIndex = subModules.findIndex(sm => sm.id === subModuleId);
    const nextSubModule = subModules[currentIndex + 1];

    // Progress State
    const [progress, setProgress] = useState(userData?.progress?.subModuleProgress?.[levelId]?.[subModuleId] || {});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [subModuleId]);

    const handleMarkComplete = () => {
        if (!setUserData) return;

        const updatedProgress = {
            ...userData?.progress?.subModuleProgress?.[levelId],
            [subModuleId]: {
                ...userData?.progress?.subModuleProgress?.[levelId]?.[subModuleId],
                completed: true,
                unlocked: true
            }
        };

        // Unlock next
        if (nextSubModule) {
            updatedProgress[nextSubModule.id] = {
                ...updatedProgress[nextSubModule.id],
                unlocked: true
            };
        }

        setUserData(prev => ({
            ...prev,
            progress: {
                ...prev.progress,
                subModuleProgress: {
                    ...prev.progress.subModuleProgress,
                    [levelId]: updatedProgress
                }
            }
        }));

        if (nextSubModule) {
            navigate(`/level/${levelId}/submodule/${nextSubModule.id}`);
        } else {
            navigate(`/level/${levelId}/submodules`);
        }
    };

    if (!currentSubModule || !content) {
        return <div style={{ padding: '4rem', textAlign: 'center' }}>Module Content Not Found...</div>;
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: theme === 'light' ? '#FDFCFB' : '#050505',
            color: theme === 'light' ? '#1a1a1a' : '#efefef',
            fontFamily: '"Inter", sans-serif',
            transition: 'background 0.3s ease'
        }}>
            {/* Minimal Top Bar */}
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    height: '64px',
                    background: theme === 'light' ? 'rgba(253, 252, 251, 0.8)' : 'rgba(5, 5, 5, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: `1px solid ${theme === 'light' ? '#EEEBE5' : '#1a1a1a'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem',
                    zIndex: 1000
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button
                        onClick={() => navigate(`/level/${levelId}/submodules`)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'transparent', border: 'none', cursor: 'pointer',
                            color: theme === 'light' ? '#666' : '#999',
                            fontWeight: 600, fontSize: '0.9rem'
                        }}
                    >
                        <ArrowLeft size={18} />
                        <span className="hide-mobile">Back to Modules</span>
                    </button>
                    <div style={{ width: '1px', height: '20px', background: theme === 'light' ? '#EEEBE5' : '#1a1a1a' }} />
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.02em', color: '#ff5722' }}>
                        MODULE {currentIndex + 1} OF {subModules.length}
                    </div>
                </div>

                <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '2px', background: 'transparent' }}>
                    <motion.div
                        style={{
                            height: '100%',
                            background: '#ff5722',
                            scaleX,
                            transformOrigin: '0%'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666' }}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: theme === 'light' ? '#000' : '#fff' }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Sidebar Navigator */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.aside
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        style={{
                            position: 'fixed', right: 0, top: 64, bottom: 0,
                            width: '320px', background: theme === 'light' ? '#fff' : '#0a0a0a',
                            borderLeft: `1px solid ${theme === 'light' ? '#EEEBE5' : '#1a1a1a'}`,
                            zIndex: 999, padding: '2rem', overflowY: 'auto'
                        }}
                    >
                        <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#ff5722', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
                            Course Content
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {subModules.map((sm, idx) => (
                                <Link
                                    key={sm.id}
                                    to={`/level/${levelId}/submodule/${sm.id}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        padding: '0.75rem 1rem', borderRadius: '8px',
                                        fontSize: '0.9rem', fontWeight: sm.id === subModuleId ? 700 : 500,
                                        color: sm.id === subModuleId ? '#ff5722' : (theme === 'light' ? '#444' : '#bbb'),
                                        background: sm.id === subModuleId ? (theme === 'light' ? '#FFF9F5' : '#1a1412') : 'transparent',
                                        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem'
                                    }}
                                >
                                    <span style={{ opacity: 0.5, fontSize: '0.75rem' }}>{(idx + 1).toString().padStart(2, '0')}</span>
                                    {sm.title}
                                </Link>
                            ))}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main style={{
                paddingTop: '64px',
                paddingBottom: '8rem',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative'
            }}>
                {/* Sticky TOC - Visible on Desktop */}
                {!isMobile && (
                    <aside style={{
                        position: 'fixed',
                        left: 'max(2rem, calc(50% - 640px))',
                        top: '120px',
                        width: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        zIndex: 10
                    }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ff5722', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                            On this page
                        </div>
                        {content.sections.map((section, idx) => (
                            <a
                                key={idx}
                                href={`#section-${idx}`}
                                style={{
                                    fontSize: '0.85rem',
                                    color: theme === 'light' ? '#666' : '#999',
                                    textDecoration: 'none',
                                    fontWeight: 500,
                                    lineHeight: 1.4,
                                    transition: 'color 0.2s',
                                    borderLeft: '2px solid transparent',
                                    paddingLeft: '0.75rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = '#ff5722';
                                    e.target.style.borderLeftColor = 'rgba(255,87,34,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = (theme === 'light' ? '#666' : '#999');
                                    e.target.style.borderLeftColor = 'transparent';
                                }}
                            >
                                {section.title}
                            </a>
                        ))}
                    </aside>
                )}

                <div style={{
                    width: '100%',
                    maxWidth: '840px',
                    padding: isMobile ? '2rem 1.5rem' : '4rem 2rem 0 2rem'
                }}>
                    {/* Header Section */}
                    <div style={{ marginBottom: '5rem' }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                                fontWeight: 950,
                                lineHeight: 1.1,
                                letterSpacing: '-0.04em',
                                marginBottom: '1.5rem',
                                color: theme === 'light' ? '#000' : '#fff'
                            }}
                        >
                            {currentSubModule.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                fontSize: '1.25rem',
                                color: theme === 'light' ? '#666' : '#888',
                                fontWeight: 500,
                                fontStyle: 'italic',
                                lineHeight: 1.5
                            }}
                        >
                            Session Insight: Moving from understanding basics to mastering practical applications.
                        </motion.p>
                    </div>

                    {/* Content Blocks */}
                    <article className="learning-content">
                        {content.sections.map((section, sIdx) => (
                            <section key={sIdx} id={`section-${sIdx}`} style={{ marginBottom: '8rem', scrollMarginTop: '100px' }}>
                                <h2 style={{
                                    fontSize: '2rem',
                                    fontWeight: 800,
                                    marginBottom: '2.5rem',
                                    marginTop: '4rem',
                                    letterSpacing: '-0.03em',
                                    color: theme === 'light' ? '#000' : '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <span style={{ fontSize: '1.25rem', opacity: 0.3, fontWeight: 400 }}>{String.fromCharCode(65 + sIdx)}.</span>
                                    {section.title}
                                </h2>

                                {section.content.map((block, bIdx) => {
                                    if (block.subtitle) return (
                                        <h3 key={bIdx} style={{
                                            fontSize: '1.25rem', fontWeight: 700,
                                            marginTop: '3.5rem', marginBottom: '1.25rem',
                                            color: theme === 'light' ? '#1f2937' : '#e5e7eb'
                                        }}>
                                            {block.subtitle}
                                        </h3>
                                    );

                                    if (block.text) return (
                                        <p key={bIdx} style={{
                                            fontSize: '1.15rem', lineHeight: 1.8,
                                            marginBottom: '2rem', color: theme === 'light' ? '#374151' : '#D1D5DB'
                                        }}>
                                            {block.text}
                                        </p>
                                    );

                                    if (block.list) return (
                                        <ul key={bIdx} style={{ paddingLeft: '0', listStyle: 'none', marginBottom: '2.5rem' }}>
                                            {block.list.map((item, iIdx) => (
                                                <li key={iIdx} style={{
                                                    fontSize: '1.1rem', padding: '1.25rem 1.5rem',
                                                    background: theme === 'light' ? '#fff' : '#0d0d0d',
                                                    borderRadius: '16px', marginBottom: '0.75rem', display: 'flex',
                                                    gap: '1.25rem', alignItems: 'center',
                                                    border: `1px solid ${theme === 'light' ? '#EEEBE5' : '#1a1a1a'}`
                                                }}>
                                                    <div style={{
                                                        minWidth: '24px', height: '24px', borderRadius: '50%',
                                                        background: '#ff5722', color: '#fff', fontSize: '0.65rem',
                                                        fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                    }}>
                                                        {iIdx + 1}
                                                    </div>
                                                    <span style={{ lineHeight: 1.5 }}>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    );

                                    if (block.comparison) return (
                                        <div key={bIdx} style={{
                                            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                                            gap: '1rem', margin: '3rem 0'
                                        }}>
                                            <div style={{ padding: '2rem', background: theme === 'light' ? '#F9FAFB' : '#0a0a0a', borderRadius: '24px', border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#1a1a1a'}` }}>
                                                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.25rem', color: '#666', textTransform: 'uppercase' }}>{block.comparison.left.title}</h4>
                                                <ul style={{ padding: 0, listStyle: 'none' }}>
                                                    {block.comparison.left.items.map((it, i) => (
                                                        <li key={i} style={{ marginBottom: '0.75rem', fontSize: '1rem', display: 'flex', gap: '0.75rem', color: '#666' }}>
                                                            <span style={{ color: '#ef4444' }}>✕</span> {it}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div style={{ padding: '2rem', background: theme === 'light' ? '#FFF9F5' : '#1a1412', borderRadius: '24px', border: '1px solid #ff5722' }}>
                                                <h4 style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '1.25rem', color: '#ff5722', textTransform: 'uppercase' }}>{block.comparison.right.title}</h4>
                                                <ul style={{ padding: 0, listStyle: 'none' }}>
                                                    {block.comparison.right.items.map((it, i) => (
                                                        <li key={i} style={{ marginBottom: '0.75rem', fontSize: '1rem', display: 'flex', gap: '0.75rem' }}>
                                                            <span style={{ color: '#10b981' }}>✓</span> {it}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    );

                                    if (block.note) return (
                                        <div key={bIdx} style={{
                                            padding: '2rem', background: theme === 'light' ? '#FFF9F5' : '#1a1412',
                                            borderLeft: '4px solid #ff5722', borderRadius: '0 24px 24px 0', margin: '4rem 0'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: 900, color: '#ff5722', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                                <Lightbulb size={20} /> Pro Insight
                                            </div>
                                            <p style={{ margin: 0, lineHeight: 1.6, fontStyle: 'italic', fontSize: '1.1rem' }}>{block.note}</p>
                                        </div>
                                    );

                                    if (block.example) return (
                                        <div key={bIdx} style={{
                                            padding: '2.5rem', background: theme === 'light' ? '#F3F4F6' : '#0d0d0d',
                                            borderRadius: '24px', margin: '4rem 0', border: `1px solid ${theme === 'light' ? '#E5E7EB' : '#1a1a1a'}`
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5722' }} />
                                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Interactive Workshop Case</div>
                                            </div>

                                            {block.example.input && (
                                                <div style={{ marginBottom: '2rem' }}>
                                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ff5722', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Input Scenario</span>
                                                    <div style={{ fontSize: '1.1rem', color: theme === 'light' ? '#1a1a1a' : '#fff', background: theme === 'light' ? '#fff' : '#1a1a1a', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,87,34,0.1)' }}>
                                                        "{block.example.input}"
                                                    </div>
                                                </div>
                                            )}

                                            {block.example.output && (
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase' }}>Optimized Output</span>
                                                    <div style={{ fontSize: '1.1rem', color: theme === 'light' ? '#374151' : '#ccc', fontStyle: 'italic', lineHeight: 1.8 }}>
                                                        {block.example.output}
                                                    </div>
                                                </div>
                                            )}

                                            {block.example.text && <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.8, color: '#666' }}>{block.example.text}</p>}
                                            {block.example.breakdown && <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#ff5722' }}>{block.example.breakdown}</div>}
                                        </div>
                                    );

                                    if (block.quote) return (
                                        <blockquote key={bIdx} style={{ margin: '6rem 0', padding: '0 3rem', borderLeft: '0', textAlign: 'center' }}>
                                            <p style={{ fontSize: '1.85rem', fontWeight: 800, fontStyle: 'italic', color: '#ff5722', lineHeight: 1.4, margin: 0, letterSpacing: '-0.02em' }}>
                                                "{block.quote}"
                                            </p>
                                        </blockquote>
                                    );

                                    return null;
                                })}
                            </section>
                        ))}
                    </article>

                    {/* Progress & Bottom Actions */}
                    <div style={{
                        marginTop: '10rem',
                        paddingTop: '5rem',
                        borderTop: `1px solid ${theme === 'light' ? '#EEEBE5' : '#1a1a1a'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2.5rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>Lesson Complete</h3>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>You've finished Module {currentIndex + 1} of {subModules.length}. Way to go!</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1.25rem', width: '100%', maxWidth: '540px' }}>
                            <button
                                onClick={handleMarkComplete}
                                style={{
                                    flex: 1, padding: '1.5rem', background: '#ff5722', color: '#fff',
                                    border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '1.1rem',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                                    boxShadow: '0 10px 25px rgba(255, 87, 34, 0.25)'
                                }}
                            >
                                {nextSubModule ? (
                                    <>Mark Complete & Next <ChevronRight size={22} /></>
                                ) : (
                                    <>Complete Level <CheckCircle2 size={22} /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
