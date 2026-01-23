import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ArrowRight, Star, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { day1Content, day2Content } from '../data/content.jsx';
import { quizzes } from '../data/quizzes';
import DashboardLayout from '../components/DashboardLayout';
import Sidebar from '../components/Sidebar';
import MentorBot from '../components/MentorBot';
import { db, doc, updateDoc, arrayUnion, increment } from '../config/mockDb';

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
        <div className="premium-card" style={{ marginTop: '3rem', padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '6px 14px', background: 'rgba(255, 87, 34, 0.1)', color: 'var(--accent-primary)', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800 }}>
                    QUIZ: {currentQuestion + 1} / {questions.length}
                </div>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>{questions[currentQuestion].question}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {shuffledOptions.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => !showResult && setSelectedOption(idx)}
                        style={{
                            padding: '1.1rem', textAlign: 'left', borderRadius: '12px', border: '1px solid var(--border-color)',
                            background: selectedOption === idx ? 'rgba(255, 87, 34, 0.1)' : 'transparent',
                            color: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'space-between'
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
            await updateDoc(doc(db, 'users', user.uid), {
                'progress.completedSections': arrayUnion(sectionId),
                'stats.totalPoints': increment(pointsDelta)
            });
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
        <DashboardLayout>
            <div style={{ display: 'flex', gap: '4rem' }}>
                {/* Main Content Area */}
                <div style={{ flex: 1, maxWidth: '800px' }}>
                    {content.map((section, index) => {
                        const isDone = completedSections.includes(section.id);
                        const isLocked = index > 0 && !completedSections.includes(content[index - 1].id);

                        return (
                            <section key={section.id} id={section.id} style={{ marginBottom: '6rem', opacity: isLocked ? 0.3 : 1, filter: isLocked ? 'blur(8px)' : 'none', pointerEvents: isLocked ? 'none' : 'auto' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{section.title}</h2>
                                    {isDone && <CheckCircle2 color="#22c55e" size={32} />}
                                </div>
                                <div className="doc-content" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
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
                <aside style={{ width: '300px', position: 'sticky', top: '2rem', height: 'fit-content' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Module Progress</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {content.map((s, i) => (
                                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: completedSections.includes(s.id) ? 1 : 0.5 }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: completedSections.includes(s.id) ? '#22c55e' : 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {completedSections.includes(s.id) ? <CheckCircle2 size={14} color="#fff" /> : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-muted)' }} />}
                                    </div>
                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{s.title.substring(0, 20)}...</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            <AnimatePresence>
                {showWow && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>MASTERED! 🎯</div>
                            <p style={{ fontSize: '1.5rem' }}>You're growing stronger, {userData?.name?.split(' ')[0]}!</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <MentorBot />
        </DashboardLayout>
    );
}
