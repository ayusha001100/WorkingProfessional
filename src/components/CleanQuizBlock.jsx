import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Timer, Star, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Clean, Minimal MCQ Component
 * Matches the reference design with compact layout and reduced visual noise
 */
export function CleanQuizBlock({ mcqs, onPass, isDarkMode }) {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
    const [submitted, setSubmitted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const timerRef = useRef(null);

    // Timer Logic
    useEffect(() => {
        if (quizStarted && !isFinished && !submitted) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        handleAutoSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [quizStarted, currentStep, isFinished, submitted]);

    const handleAutoSubmit = () => {
        if (submitted) return;
        // If no option selected, marks as incorrect. If selected, submits it.
        handleSubmit(selectedOption);
    };

    if (!mcqs || mcqs.length === 0) return null;

    const q = mcqs[currentStep];
    if (!q) return null;

    const handleSubmit = (overrideOption = null) => {
        if (submitted) return;

        const finalOption = overrideOption !== null ? overrideOption : selectedOption;

        // Clear timer immediately on submit
        if (timerRef.current) clearInterval(timerRef.current);

        const isCorrect = finalOption === q.correctAnswer;
        const newCorrectCount = stats.correct + (isCorrect ? 1 : 0);

        setStats(prev => ({
            correct: newCorrectCount,
            incorrect: prev.incorrect + (isCorrect ? 0 : 1)
        }));
        setSubmitted(true);

        setTimeout(() => {
            if (currentStep < mcqs.length - 1) {
                setCurrentStep(prev => prev + 1);
                setSelectedOption(null);
                setSubmitted(false);
                setTimeLeft(10); // Reset timer
            } else {
                setIsFinished(true);
                const finalScore = Math.round((newCorrectCount / mcqs.length) * 100);
                if (finalScore >= 60) {
                    onPass({
                        score: finalScore,
                        correct: newCorrectCount,
                        total: mcqs.length
                    });
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#ff5722', '#ff8a50', '#ffd700', '#ffffff']
                    });
                }
            }
        }, 1200);
    };

    if (isFinished) {
        const finalScore = Math.round((stats.correct / mcqs.length) * 100);
        const isPassed = finalScore >= 60;

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
                    borderRadius: '32px',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : '#fee2e2'}`,
                    maxWidth: '650px',
                    margin: '0 auto',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isDarkMode ? '0 25px 50px -12px rgba(0,0,0,0.5)' : '0 20px 40px -15px rgba(255, 87, 34, 0.1)'
                }}
            >
                {isPassed ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <motion.div
                                    key={s}
                                    initial={{ scale: 0, rotate: -30 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.1 * s, type: 'spring' }}
                                >
                                    <Star size={32} fill="#FFD700" color="#FFD700" />
                                </motion.div>
                            ))}
                        </div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            style={{
                                fontSize: '4rem',
                                fontWeight: 900,
                                marginBottom: '1rem',
                                background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 50%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '-0.05em',
                                lineHeight: 1
                            }}
                        >
                            BRILLIANT!
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                color: isDarkMode ? '#f1f5f9' : '#1e293b',
                                marginBottom: '0.5rem'
                            }}
                        >
                            Section Mastered Successfully
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            style={{
                                color: isDarkMode ? '#94a3b8' : '#64748b',
                                fontWeight: 500,
                                fontSize: '1.1rem'
                            }}
                        >
                            Keep that momentum going!
                        </motion.p>
                    </>
                ) : (
                    <>
                        <div style={{
                            width: '100px', height: '100px', borderRadius: '50%',
                            background: 'rgba(239,68,68,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            border: '3px solid #ef4444',
                            fontSize: '3rem'
                        }}>
                            📚
                        </div>
                        <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: isDarkMode ? '#fff' : '#1a1a1a', marginBottom: '0.5rem' }}>Almost there!</h3>
                        <p style={{ fontSize: '1.1rem', color: isDarkMode ? '#888' : '#666', marginBottom: '2rem' }}>You scored <strong style={{ color: '#ef4444' }}>{finalScore}%</strong>. Need 60% to master this section.</p>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setCurrentStep(0);
                                setSelectedOption(null);
                                setStats({ correct: 0, incorrect: 0 });
                                setSubmitted(false);
                                setIsFinished(false);
                                setTimeLeft(10);
                            }}
                            style={{ padding: '1rem 2.5rem', background: '#ff5722', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '1.1rem' }}
                        >
                            Try Again
                        </motion.button>
                    </>
                )}
            </motion.div>
        );
    }

    if (!quizStarted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    background: isDarkMode ? 'rgba(255,255,255,0.02)' : '#ffffff',
                    borderRadius: '24px',
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    maxWidth: '600px',
                    margin: '3rem auto'
                }}
            >
                <div style={{
                    width: '80px', height: '80px', borderRadius: '24px',
                    background: 'rgba(255, 87, 34, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#ff5722', margin: '0 auto 2rem'
                }}>
                    <Rocket size={40} />
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: isDarkMode ? '#fff' : '#1e293b', marginBottom: '1rem' }}>
                    Ready for Self-Assessment?
                </h2>
                <p style={{ color: isDarkMode ? '#94a3b8' : '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                    This phase ensures you've mastered the concepts before moving forward. <br />
                    <span style={{ color: '#ff5722', fontWeight: 700 }}>10 seconds per question.</span>
                </p>
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(255, 87, 34, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setQuizStarted(true);
                        setTimeLeft(10);
                    }}
                    style={{
                        padding: '1.2rem 3rem',
                        background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '16px',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        margin: '0 auto'
                    }}
                >
                    Start Self-Assessment <ArrowRight size={20} />
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        padding: '0.5rem 1.25rem',
                        background: 'rgba(255, 87, 34, 0.1)',
                        borderRadius: '100px',
                        color: '#ff5722',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        letterSpacing: '0.05em'
                    }}>
                        STEP {currentStep + 1} OF {mcqs.length}
                    </div>

                    {/* Circular Timer UI */}
                    <div style={{ position: 'relative', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="44" height="44" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} strokeWidth="8" />
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
                        <span style={{ position: 'absolute', fontWeight: 900, fontSize: '0.85rem', color: timeLeft <= 3 ? '#ef4444' : 'inherit' }}>{timeLeft}</span>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    fontSize: '0.85rem',
                    fontWeight: 600
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                        {stats.correct} Correct
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                >
                    {/* Question */}
                    <h2 style={{
                        fontSize: '1.35rem',
                        fontWeight: 700,
                        color: isDarkMode ? '#fff' : '#1a1a1a',
                        marginBottom: '1.75rem',
                        lineHeight: 1.4,
                        letterSpacing: '-0.01em'
                    }}>
                        {q.question}
                    </h2>

                    {/* Options */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                        {q.options.map((opt, oIdx) => {
                            const isSelected = selectedOption === oIdx;
                            const isCorrect = oIdx === q.correctAnswer;

                            let borderColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
                            let background = isDarkMode ? 'rgba(255,255,255,0.02)' : '#fff';
                            let textColor = isDarkMode ? '#e2e8f0' : '#334155';

                            if (isSelected && !submitted) {
                                borderColor = '#ff5722';
                                background = isDarkMode ? 'rgba(255,87,34,0.06)' : 'rgba(255,87,34,0.04)';
                            }

                            if (submitted) {
                                if (isCorrect) {
                                    borderColor = '#10b981';
                                    background = isDarkMode ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.04)';
                                    textColor = '#10b981';
                                } else if (isSelected && !isCorrect) {
                                    borderColor = '#ef4444';
                                    background = isDarkMode ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.04)';
                                    textColor = '#ef4444';
                                }
                            }

                            return (
                                <motion.button
                                    key={oIdx}
                                    whileHover={!submitted ? { x: 2, borderColor: '#ff5722' } : {}}
                                    onClick={() => !submitted && setSelectedOption(oIdx)}
                                    style={{
                                        padding: '0.875rem 1.125rem',
                                        background,
                                        border: `1.5px solid ${borderColor}`,
                                        borderRadius: '10px',
                                        color: textColor,
                                        textAlign: 'left',
                                        fontSize: '0.95rem',
                                        fontWeight: 500,
                                        cursor: submitted ? 'default' : 'pointer',
                                        transition: 'all 0.15s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        lineHeight: 1.5
                                    }}
                                >
                                    <span>{opt}</span>
                                    {submitted && isCorrect && <CheckCircle2 size={16} color="#10b981" strokeWidth={2.5} />}
                                    {submitted && isSelected && !isCorrect && <AlertCircle size={16} color="#ef4444" strokeWidth={2.5} />}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={!(selectedOption === null || submitted) ? { y: -1 } : {}}
                        whileTap={!(selectedOption === null || submitted) ? { scale: 0.98 } : {}}
                        onClick={() => handleSubmit()}
                        disabled={selectedOption === null || submitted}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: selectedOption === null ? (isDarkMode ? '#2a2a2a' : '#e5e7eb') : '#ff5722',
                            color: selectedOption === null ? '#888' : '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: selectedOption === null ? 'not-allowed' : 'pointer',
                            transition: 'all 0.15s ease',
                            opacity: submitted ? 0.5 : 1
                        }}
                    >
                        {submitted ? 'Processing...' : 'Submit Answer'}
                    </motion.button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
