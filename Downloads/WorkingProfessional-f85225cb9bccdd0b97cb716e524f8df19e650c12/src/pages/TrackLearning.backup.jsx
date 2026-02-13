import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock as LockIcon, Unlock, CheckCircle2, ChevronRight, Play, FileText, MessageSquare, Brain, HelpCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { TRACKS } from '../data/tracks';

export default function TrackLearning() {
    const { user, userData } = useAuth();
    const navigate = useNavigate();

    // Get track from user data. Fallback to a default if not found.
    const userTrackName = userData?.onboarding?.track || "AI Strategy & Leadership";
    const track = TRACKS[userTrackName] || TRACKS["AI Strategy & Leadership"];

    const [selectedModule, setSelectedModule] = useState(null);
    const [quizState, setQuizState] = useState('none'); // none, quiz1, quiz2, result
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizPassed, setQuizPassed] = useState(false);
    const [moduleProgress, setModuleProgress] = useState({
        "m1": { unlocked: true, completed: false },
        // rest are locked by default
    });

    const handleModuleClick = (module, isUnlocked) => {
        if (!isUnlocked) return;
        setSelectedModule(module);
        setQuizState('none');
    };

    const startQuiz = (type) => {
        const quiz = type === 'quiz1' ? selectedModule.quiz1 : selectedModule.quiz2;
        setCurrentQuiz(quiz);
        setQuizState(type);
        setSelectedAnswer(null);
    };

    const handleAnswerSubmit = () => {
        const isCorrect = selectedAnswer === currentQuiz.questions[0].answer;
        if (isCorrect) {
            setQuizPassed(true);
            setQuizState('result');
            // Unlock next module logic would go here
            unlockNextModule(selectedModule.id);
        } else {
            setQuizPassed(false);
            setQuizState('result');
        }
    };

    const unlockNextModule = (currentId) => {
        // Simple logic for demo: unlock m2 if m1 passed
        if (currentId === 'm1') {
            setModuleProgress(prev => ({
                ...prev,
                "m2": { unlocked: true, completed: false },
                "m1": { ...prev["m1"], completed: true }
            }));
        }
    };

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                {/* Header */}
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '0.5rem' }}>
                        {userTrackName}
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#666' }}>Follow your personalized roadmap to mastery.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '3rem', alignItems: 'start' }}>
                    {/* Left: Track Overview */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {track.levels.map((level, idx) => (
                            <div key={level.id} style={{
                                background: '#fff',
                                borderRadius: '24px',
                                padding: '1.5rem',
                                border: '1px solid #e1e4e8',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                            }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ff5722', textTransform: 'uppercase', marginBottom: '1.2rem', letterSpacing: '0.05em' }}>
                                    {level.title}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {level.modules.map(mod => {
                                        const isUnlocked = moduleProgress[mod.id]?.unlocked || !mod.locked;
                                        const isCompleted = moduleProgress[mod.id]?.completed;

                                        return (
                                            <div
                                                key={mod.id}
                                                onClick={() => handleModuleClick(mod, isUnlocked)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    padding: '1rem',
                                                    borderRadius: '16px',
                                                    background: selectedModule?.id === mod.id ? '#fff0e6' : (isUnlocked ? '#f8f9fa' : '#f0f2f5'),
                                                    border: `1px solid ${selectedModule?.id === mod.id ? '#ff5722' : 'transparent'}`,
                                                    cursor: isUnlocked ? 'pointer' : 'not-allowed',
                                                    opacity: isUnlocked ? 1 : 0.6,
                                                    transition: '0.3s'
                                                }}
                                            >
                                                <div style={{
                                                    width: '32px',
                                                    height: '32px',
                                                    borderRadius: '8px',
                                                    background: isCompleted ? '#ecfdf5' : (isUnlocked ? '#fff' : '#e1e4e8'),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: isCompleted ? '#10b981' : (isUnlocked ? '#ff5722' : '#94a3b8')
                                                }}>
                                                    {isCompleted ? <CheckCircle2 size={20} /> : (isUnlocked ? <Unlock size={18} /> : <LockIcon size={18} />)}
                                                </div>
                                                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: isUnlocked ? '#1a1a1a' : '#94a3b8' }}>{mod.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Module Content */}
                    <div style={{ minHeight: '600px' }}>
                        <AnimatePresence mode="wait">
                            {selectedModule ? (
                                <motion.div
                                    key={selectedModule.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    style={{
                                        background: '#fff',
                                        borderRadius: '32px',
                                        padding: '3rem',
                                        border: '1px solid #e1e4e8',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    {quizState === 'none' && (
                                        <>
                                            <div style={{ marginBottom: '2.5rem' }}>
                                                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>{selectedModule.title}</h2>
                                                <div style={{ padding: '1.5rem', background: '#fdf4ff', borderRadius: '20px', border: '1px solid #f5d0fe' }}>
                                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#a21caf', fontWeight: 800, marginBottom: '0.5rem' }}>
                                                        <Brain size={18} /> Why study this?
                                                    </h4>
                                                    <p style={{ color: '#701a75', lineHeight: 1.6, fontWeight: 500 }}>{selectedModule.why}</p>
                                                </div>
                                            </div>

                                            <div style={{ textAlign: 'center', padding: '3rem', background: '#f8f9fa', borderRadius: '24px', border: '2px dashed #e1e4e8' }}>
                                                <HelpCircle size={48} color="#ff5722" style={{ marginBottom: '1.5rem' }} />
                                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Test your initial knowledge</h3>
                                                <p style={{ color: '#666', marginBottom: '2rem' }}>Pass the initial quiz to jump straight to advanced insights and unlock the next module!</p>
                                                <button
                                                    onClick={() => startQuiz('quiz1')}
                                                    style={{
                                                        padding: '1rem 2.5rem',
                                                        borderRadius: '16px',
                                                        background: 'var(--accent-gradient)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.8rem'
                                                    }}
                                                >
                                                    Start Initial Quiz <ChevronRight size={20} />
                                                </button>
                                            </div>
                                        </>
                                    )}

                                    {(quizState === 'quiz1' || quizState === 'quiz2') && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{quizState === 'quiz1' ? 'Initial Knowledge Check' : 'Second Qualification Quiz'}</h3>
                                            <div style={{ padding: '2rem', background: '#f8f9fa', borderRadius: '24px' }}>
                                                <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem' }}>{currentQuiz.questions[0].question}</p>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                    {currentQuiz.questions[0].options.map((opt, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => setSelectedAnswer(i)}
                                                            style={{
                                                                padding: '1.2rem',
                                                                textAlign: 'left',
                                                                background: selectedAnswer === i ? '#fff0e6' : '#fff',
                                                                border: `2px solid ${selectedAnswer === i ? '#ff5722' : 'transparent'}`,
                                                                borderRadius: '16px',
                                                                fontWeight: 600,
                                                                fontSize: '1rem',
                                                                cursor: 'pointer',
                                                                transition: '0.2s'
                                                            }}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                disabled={selectedAnswer === null}
                                                onClick={handleAnswerSubmit}
                                                style={{
                                                    alignSelf: 'flex-end',
                                                    padding: '1rem 3rem',
                                                    borderRadius: '16px',
                                                    background: selectedAnswer === null ? '#cbd5e1' : 'var(--accent-gradient)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    fontWeight: 800,
                                                    cursor: selectedAnswer === null ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                Submit Answer
                                            </button>
                                        </div>
                                    )}

                                    {quizState === 'result' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                            <div style={{
                                                textAlign: 'center',
                                                padding: '3rem',
                                                background: quizPassed ? '#ecfdf5' : '#fff1f2',
                                                borderRadius: '32px',
                                                border: `2px solid ${quizPassed ? '#10b981' : '#f43f5e'}`
                                            }}>
                                                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: quizPassed ? '#047857' : '#be123c', marginBottom: '1rem' }}>
                                                    {quizPassed ? 'Terrific! You Passed.' : 'Not Quite There Yet.'}
                                                </h3>
                                                <p style={{ color: quizPassed ? '#065f46' : '#991b1b', fontSize: '1.1rem' }}>
                                                    {quizPassed
                                                        ? 'You\'ve skipped the basics and unlocked the next module!'
                                                        : 'Don\'t worry, study the insights below and pass the second quiz to move forward.'}
                                                </p>
                                            </div>

                                            {/* Advanced Content Sections */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                                {selectedModule.videoUrl && (
                                                    <div style={{ gridColumn: 'span 2', overflow: 'hidden', borderRadius: '24px', aspectRatio: '16/9', background: '#000' }}>
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={selectedModule.videoUrl}
                                                            title="Module Video"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        ></iframe>
                                                    </div>
                                                )}
                                                <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
                                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af', fontWeight: 800, marginBottom: '1rem' }}>
                                                        <FileText size={18} /> Deep Study
                                                    </h4>
                                                    <p style={{ fontSize: '0.95rem', color: '#1e3a8a' }}>{selectedModule.insights}</p>
                                                </div>
                                                <div style={{ padding: '1.5rem', background: '#fdf2f8', borderRadius: '20px', border: '1px solid #fbcfe8' }}>
                                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9d174d', fontWeight: 800, marginBottom: '1rem' }}>
                                                        <MessageSquare size={18} /> Interview Prep
                                                    </h4>
                                                    <ul style={{ fontSize: '0.9rem', color: '#831843', paddingLeft: '1.2rem' }}>
                                                        {selectedModule.interviewQuestions?.map((q, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{q}</li>)}
                                                    </ul>
                                                </div>
                                            </div>

                                            {!quizPassed && (
                                                <button
                                                    onClick={() => startQuiz('quiz2')}
                                                    style={{
                                                        padding: '1.2rem',
                                                        borderRadius: '16px',
                                                        background: '#1a1a1a',
                                                        color: '#fff',
                                                        border: 'none',
                                                        fontWeight: 800,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.8rem'
                                                    }}
                                                >
                                                    Ready for the Second Quiz? <ArrowRight size={20} />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <div style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#ccc',
                                    textAlign: 'center'
                                }}>
                                    <Play size={64} style={{ marginBottom: '2rem', opacity: 0.2 }} />
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Select a module to start learning</h2>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
