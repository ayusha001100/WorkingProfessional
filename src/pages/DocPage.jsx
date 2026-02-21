import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight, Star, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { day1Content, day2Content } from '../data/content.jsx';
import { quizzes } from '../data/quizzes';
import DashboardLayout from '../components/DashboardLayout';
import Sidebar from '../components/Sidebar';
import MentorBot from '../components/MentorBot';

const QuizComponent = ({ sectionId, onComplete }) => {
    const questions = quizzes[sectionId] || [];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        if (questions[currentQuestion]) {
            const optionsWithOriginalIndex = questions[currentQuestion].options.map((opt, idx) => ({
                text: opt,
                isCorrect: idx === questions[currentQuestion].answer
            }));
            for (let i = optionsWithOriginalIndex.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsWithOriginalIndex[i], optionsWithOriginalIndex[j]] = [optionsWithOriginalIndex[j], optionsWithOriginalIndex[i]];
            }
            setShuffledOptions(optionsWithOriginalIndex);
        }
    }, [currentQuestion, sectionId]);

    if (questions.length === 0) return null;

    const handleAnswer = () => {
        const correct = shuffledOptions[selectedOption].isCorrect;
        if (correct) {
            setIsCorrect(true);
            setCorrectCount(c => c + 1);
            setShowResult(true);
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(q => q + 1);
                    setSelectedOption(null);
                    setShowResult(false);
                    setIsCorrect(null);
                } else {
                    onComplete(correctCount + 1, incorrectCount);
                }
            }, 1000);
        } else {
            setIsCorrect(false);
            setIncorrectCount(c => c + 1);
            setShowResult(true);
            setTimeout(() => {
                setShowResult(false);
                setIsCorrect(null);
                setSelectedOption(null);
            }, 1000);
        }
    };

    return (
        <div style={{
            marginTop: '3rem',
            padding: '2.5rem',
            background: 'var(--bg-secondary)', // Theme aware background
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '6px 14px', background: 'rgba(255, 87, 34, 0.1)', color: 'var(--accent-primary)', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800 }}>
                    QUIZ: {currentQuestion + 1} / {questions.length}
                </div>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>{questions[currentQuestion].question}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {shuffledOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => !showResult && setSelectedOption(idx)}
                        style={{
                            padding: '1.1rem', textAlign: 'left', borderRadius: '12px', border: '1px solid var(--border-color)',
                            background: selectedOption === idx ? 'rgba(255, 87, 34, 0.1)' : 'var(--bg-primary)',
                            color: selectedOption === idx ? 'var(--accent-primary)' : 'var(--text-primary)',
                            fontWeight: selectedOption === idx ? 600 : 400,
                            cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                            transition: 'all 0.2s'
                        }}
                    >
                        {option.text}
                    </button>
                ))}
            </div>
            <button
                onClick={handleAnswer}
                disabled={selectedOption === null || showResult}
                className="btn-primary"
                style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
            >
                {showResult ? (isCorrect ? 'Correct!' : 'Try Again') : 'Submit Answer'}
            </button>
        </div>
    );
};

export default function DocPage({ day }) {
    const navigate = useNavigate();
    const { user, userData } = useAuth();
    const content = day === 'day1' ? day1Content : day2Content;
    const [activeId, setActiveId] = useState(null);
    const [showWow, setShowWow] = useState(false);
    const completedSections = userData?.progress?.completedSections || [];

    useEffect(() => {
        if (!activeId && content.length > 0) {
            const nextSection = content.find(s => !completedSections.includes(s.id));
            setActiveId(nextSection?.id || content[0].id);
        }
    }, [userData]);

    const handleSectionComplete = async (sectionId, correct, incorrect) => {
        const pointsDelta = correct - incorrect;
        if (user) {
            await saveProgress(sectionId, 'section', pointsDelta);
        }
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        setShowWow(true);
        setTimeout(() => {
            setShowWow(false);
            const currentIndex = content.findIndex(s => s.id === sectionId);
            if (currentIndex < content.length - 1) setActiveId(content[currentIndex + 1].id);
        }, 2000);
    };

    return (
        <DashboardLayout showSidebar={false}>
            <div className="doc-page-container">
                {/* Main Content Area */}
                <div className="doc-content-wrapper">
                    {content.map((section, index) => {
                        const isDone = completedSections.includes(section.id);
                        const isLocked = index > 0 && !completedSections.includes(content[index - 1].id);

                        return (
                            <section
                                key={section.id}
                                id={section.id}
                                className="doc-section"
                                style={{
                                    opacity: isLocked ? 0.3 : 1,
                                    filter: isLocked ? 'blur(8px)' : 'none',
                                    pointerEvents: isLocked ? 'none' : 'auto'
                                }}
                            >
                                <div className="doc-section-header">
                                    <h2 className="doc-section-title">{section.title}</h2>
                                    {isDone && <CheckCircle2 color="#22c55e" size={28} />}
                                </div>
                                <div className="doc-content">
                                    {section.content}
                                </div>
                                {!isDone && !isLocked && (
                                    <QuizComponent sectionId={section.id} onComplete={(c, i) => handleSectionComplete(section.id, c, i)} />
                                )}
                            </section>
                        );
                    })}
                </div>

                {/* Right Sidebar - Sticky Progress */}
                <aside className="doc-sidebar">
                    <div className="doc-progress-card">
                        <h3 className="doc-progress-title">Module Progress</h3>
                        <div className="doc-progress-list">
                            {content.map((s, i) => (
                                <div key={s.id} className="doc-progress-item" style={{ opacity: completedSections.includes(s.id) ? 1 : 0.5 }}>
                                    <div className="doc-progress-indicator" style={{ background: completedSections.includes(s.id) ? '#22c55e' : 'var(--bg-tertiary)' }}>
                                        {completedSections.includes(s.id) ? <CheckCircle2 size={14} color="#fff" /> : <div className="doc-progress-dot" />}
                                    </div>
                                    <span className="doc-progress-text">{s.title.substring(0, 20)}...</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            <AnimatePresence>
                {showWow && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        className="doc-completion-overlay"
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="doc-completion-content"
                        >
                            <div className="doc-completion-title">
                                MASTERED! 🎯
                            </div>
                            <p className="doc-completion-message">
                                You're growing stronger, <span style={{ color: '#ec4899' }}>{userData?.name?.split(' ')[0]}</span>!
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <MentorBot />
        </DashboardLayout>
    );
}
