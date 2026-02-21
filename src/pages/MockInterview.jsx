import React, { useState, useEffect, useRef } from 'react';
import {
    Mic, MicOff, Video, VideoOff, PhoneOff, Settings, FileText,
    MoreVertical, ChevronLeft, ChevronRight, User, Bot,
    PlayCircle, PauseCircle, RefreshCw, Upload, CheckCircle2,
    Activity, Volume2, ArrowLeft, Briefcase, Calendar, Target, Lock as LockIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import InterviewPrepModal from '../components/InterviewPrepModal';
import { generateInterviewerPrompt, generateInitialGreeting } from '../utils/interviewerPrompt';
import { useAuth } from '../context/AuthContext';

// --- Styles & Constants ---
const THEME = {
    primary: '#ff5722',
    bg: '#f8fafc',
    surface: '#ffffff',
    textMain: '#1e293b',
    textSub: '#64748b',
    border: '#e2e8f0',
    danger: '#ef4444',
    success: '#22c55e',
    shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
};

const STYLES = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'grid',
        gridTemplateColumns: '280px 1fr 350px', // Settings | Video/Main | Transcript
        gap: '1.5rem',
        padding: '1.5rem',
        background: THEME.bg,
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box',
        overflow: 'hidden'
    },
    card: {
        background: THEME.surface,
        borderRadius: '16px',
        border: `1px solid ${THEME.border}`,
        boxShadow: THEME.shadow,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    glassOverlay: {
        background: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(10px)',
    }
};

// --- Helper Components ---

const StatusBadge = ({ status }) => {
    const config = {
        idle: { color: 'gray', text: 'Standby' },
        connecting: { color: 'orange', text: 'Connecting...' },
        active: { color: 'green', text: 'Live Interview' },
        paused: { color: 'gray', text: 'Paused' }
    }[status] || { color: 'gray', text: 'Offline' };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(0,0,0,0.05)', borderRadius: '20px' }}>
            <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: config.color, display: 'block' }} className={status === 'active' ? 'animate-pulse' : ''} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: THEME.textMain }}>{config.text}</span>
        </div>
    );
};

const VideoFeed = ({ isActive, type }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (isActive && type === 'user') {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then(stream => {
                    if (videoRef.current) videoRef.current.srcObject = stream;
                })
                .catch(err => console.error("Camera access denied:", err));
        } else if (videoRef.current) {
            const stream = videoRef.current.srcObject;
            if (stream) stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }, [isActive, type]);

    return (
        <div style={{
            flex: 1,
            background: '#000',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            border: `1px solid ${THEME.border}`
        }}>
            {type === 'user' ? (
                isActive ? (
                    <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#666' }}>
                        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
                            <VideoOff size={32} />
                        </div>
                        <span style={{ fontSize: '0.9rem' }}>Camera Off</span>
                    </div>
                )
            ) : (
                // AI Avatar Placeholder
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '120px', height: '120px', borderRadius: '50%',
                            background: 'url("https://api.dicebear.com/7.x/bottts/svg?seed=Felix")',
                            backgroundSize: 'cover',
                            zIndex: 2,
                            position: 'relative',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }} />
                        {/* Audio Waveform Animation (Simulated) */}
                        {isActive && (
                            <>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, border: `2px solid ${THEME.primary}`, borderRadius: '50%', zIndex: 1 }}
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                                    style={{ position: 'absolute', top: -10, left: -10, right: -10, bottom: -10, border: `1px solid ${THEME.primary}`, borderRadius: '50%', zIndex: 0 }}
                                />
                            </>
                        )}
                    </div>
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: '20px', color: '#fff', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', backdropFilter: 'blur(4px)' }}>
                        <Activity size={14} color={THEME.primary} />
                        AI Interviewer
                    </div>
                </div>
            )}
            {type === 'user' && (
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(0,0,0,0.6)', padding: '6px 14px', borderRadius: '20px', color: '#fff', fontSize: '0.8rem', backdropFilter: 'blur(4px)' }}>
                    You
                </div>
            )}
        </div>
    );
};

// --- Audio Logic (Simulated for Web) ---
// Using Web Speech API where available

const useSpeechParams = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognition = useRef(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            recognition.current = new window.webkitSpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;

            recognition.current.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        setTranscript(prev => prev + ' ' + event.results[i][0].transcript);
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
            };

            recognition.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const startListening = () => {
        if (recognition.current) {
            try {
                recognition.current.start();
                setIsListening(true);
            } catch (e) {
                console.error("Speech recognition error", e);
            }
        }
    };

    const stopListening = () => {
        if (recognition.current) {
            recognition.current.stop();
            setIsListening(false);
        }
    };

    return { isListening, transcript, startListening, stopListening, setTranscript };
};


// --- Main Page Component ---

export default function MockInterview() {
    // State
    const { userData, updateUserData } = useAuth(); // Moved up for early return

    // Locked State for Non-Premium Users
    if (!userData?.isPremium) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                fontFamily: "'Inter', sans-serif"
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                        background: '#fff',
                        padding: '3rem',
                        borderRadius: '24px',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center',
                        maxWidth: '500px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                    }}
                >
                    <div style={{ width: '80px', height: '80px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <LockIcon size={40} color="#ff5722" />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '1rem' }}>Premium Feature</h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                        Unlimited AI Mock Interviews are available exclusively to Premium members. Upgrade to practice with our advanced AI interviewer.
                    </p>

                    <button
                        onClick={() => window.history.back()}
                        style={{
                            background: '#ff5722',
                            color: '#fff',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Go Back
                    </button>

                    <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#94a3b8' }}>
                        Access is activated manually after payment.
                    </div>
                </motion.div>
            </div>
        );
    }

    const [interviewState, setInterviewState] = useState('idle'); // idle, active, paused
    const [mediaState, setMediaState] = useState({ mic: false, camera: false });
    const [settings, setSettings] = useState({
        role: 'Software Engineer',
        level: 'Mid Level',
        tone: 'Professional'
    });
    const [messages, setMessages] = useState([]);
    const [showPrepModal, setShowPrepModal] = useState(true);
    const [prepData, setPrepData] = useState(null);
    const [systemPrompt, setSystemPrompt] = useState('');

    const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechParams();
    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Permissions check mock
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(() => setMediaState({ mic: true, camera: true }))
            .catch(() => setMediaState({ mic: false, camera: false }));
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, transcript]);

    const saveTranscript = async () => {
        if (!userData?.uid || messages.length === 0) return;

        try {
            const transcriptData = {
                sessionId: Date.now(),
                date: new Date().toISOString(),
                role: settings.role,
                messages: messages
            };

            const history = userData.interviewHistory || [];
            await updateUserData({
                interviewHistory: [...history, transcriptData]
            });
            console.log("Transcript saved locally");
        } catch (err) {
            console.error("Failed to save transcript:", err);
        }
    };

    const handleStart = () => {
        setInterviewState('active');
        startListening();
        // Speak initial greeting
        const utterance = new SpeechSynthesisUtterance("Hello! I'm ready to begin your mock interview.");
        window.speechSynthesis.speak(utterance);
    };

    const handleEnd = () => {
        setInterviewState('idle');
        stopListening();
        window.speechSynthesis.cancel();
        saveTranscript();
    };

    const toggleMic = () => {
        setMediaState(prev => {
            if (prev.mic) stopListening();
            else if (interviewState === 'active') startListening();
            return { ...prev, mic: !prev.mic };
        });
    };

    const toggleCam = () => setMediaState(prev => ({ ...prev, camera: !prev.camera }));

    const handlePrepComplete = (data) => {
        setPrepData(data);
        setSettings({
            role: data.role,
            level: 'Professional', // Default level
            tone: 'Professional'
        });

        // Generate AI system prompt based on prep data
        const prompt = generateInterviewerPrompt(data);
        setSystemPrompt(prompt);

        // Generate initial greeting
        const greeting = generateInitialGreeting(data);
        setMessages([
            { id: 1, role: 'ai', text: greeting }
        ]);

        setShowPrepModal(false);

        // Log system prompt for debugging (you can use this with your AI API)
        console.log('AI System Prompt:', prompt);
    };

    const handleCloseModal = () => {
        // Navigate back to curriculum if they close without completing
        navigate('/track');
    };

    return (
        <>
            <InterviewPrepModal
                isOpen={showPrepModal}
                onClose={handleCloseModal}
                onComplete={handlePrepComplete}
            />
            <div style={STYLES.container}>

                {/* 1. Context / Settings Panel (Left) */}
                <div style={STYLES.card}>
                    <div style={{ padding: '1.25rem', borderBottom: `1px solid ${THEME.border}`, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/track')}
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                            <ArrowLeft size={20} color={THEME.textSub} />
                        </motion.button>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: THEME.textMain }}>Context Settings</h3>
                    </div>

                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', flex: 1 }}>
                        {/* Resume Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: THEME.textSub }}>Resume</label>
                            <div style={{ padding: '1rem', border: `1px ${prepData?.resume ? 'solid' : 'dashed'} ${prepData?.resume ? THEME.primary : THEME.border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: prepData?.resume ? 'rgba(255, 87, 34, 0.05)' : '#f8fafc', transition: 'all 0.2s' }}>
                                {prepData?.resume ? (
                                    <>
                                        <CheckCircle2 size={16} color={THEME.primary} />
                                        <span style={{ fontSize: '0.85rem', color: THEME.primary, fontWeight: 600 }}>{prepData.resumeName}</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={16} color={THEME.textSub} />
                                        <span style={{ fontSize: '0.85rem', color: THEME.textSub }}>No resume uploaded</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Dropdowns */}
                        {[
                            { label: 'Role', value: prepData?.role || settings.role, icon: <User size={16} /> },
                            {
                                label: 'Interview Type', value: prepData?.interviewType ?
                                    (prepData.interviewType === 'phone' ? 'Phone Screen' :
                                        prepData.interviewType === 'technical' ? 'Technical Round' :
                                            prepData.interviewType === 'behavioral' ? 'Behavioral/HR' :
                                                prepData.interviewType === 'final' ? 'Final Round' : 'Not set')
                                    : 'Not set', icon: <Briefcase size={16} />
                            },
                            { label: 'Timeline', value: prepData?.timeline || 'Not set', icon: <Calendar size={16} /> },
                            {
                                label: 'Focus', value: prepData?.focus ?
                                    (prepData.focus === 'technical' ? 'Technical Skills' :
                                        prepData.focus === 'behavioral' ? 'Behavioral' :
                                            prepData.focus === 'both' ? 'Both' : 'Not set')
                                    : 'Not set', icon: <Target size={16} />
                            }
                        ].map((field, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: THEME.textSub }}>{field.label}</label>
                                <div style={{ padding: '0.75rem', border: `1px solid ${THEME.border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', boxShadow: 'sm' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ color: THEME.primary }}>{field.icon}</div>
                                        <span style={{ fontSize: '0.9rem', color: THEME.textMain }}>{field.value}</span>
                                    </div>
                                    <ChevronRight size={16} color={THEME.textSub} />
                                </div>
                            </div>
                        ))}

                        <div style={{ marginTop: 'auto', background: 'rgba(255, 87, 34, 0.05)', padding: '1rem', borderRadius: '12px', border: `1px solid rgba(255, 87, 34, 0.1)` }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: THEME.primary, marginBottom: '0.5rem' }}>Pro Tip</h4>
                            <p style={{ fontSize: '0.8rem', color: THEME.textSub, lineHeight: 1.5 }}>
                                Use the 'Detailed' answer mode to get deeper feedback.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Main Video Area (Center) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>

                    {/* Header bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem', minHeight: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: THEME.textMain }}>System Design Round</h2>
                            <StatusBadge status={interviewState} />
                        </div>
                        <div style={{ fontSize: '0.9rem', color: THEME.textSub, fontWeight: 500, fontFamily: 'monospace' }}>
                            00:14:32
                        </div>
                    </div>

                    {/* Video Grid */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <VideoFeed type="ai" isActive={interviewState === 'active'} />
                        <VideoFeed type="user" isActive={mediaState.camera} />
                    </div>

                    {/* Bottom Controls */}
                    <div style={{
                        background: THEME.surface,
                        padding: '0.8rem 2rem',
                        borderRadius: '24px',
                        border: `1px solid ${THEME.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2rem',
                        boxShadow: THEME.shadow,
                        marginBottom: '0.5rem'
                    }}>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleMic}
                            style={{
                                width: '50px', height: '50px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                                background: mediaState.mic ? '#f1f5f9' : '#fee2e2',
                                color: mediaState.mic ? '#1e293b' : '#ef4444',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            {mediaState.mic ? <Mic size={22} /> : <MicOff size={22} />}
                        </motion.button>

                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleCam}
                            style={{
                                width: '50px', height: '50px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                                background: mediaState.camera ? '#f1f5f9' : '#fee2e2',
                                color: mediaState.camera ? '#1e293b' : '#ef4444',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            {mediaState.camera ? <Video size={22} /> : <VideoOff size={22} />}
                        </motion.button>

                        {interviewState === 'active' ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleEnd}
                                style={{
                                    width: '70px', height: '50px', borderRadius: '25px', border: 'none', cursor: 'pointer',
                                    background: THEME.danger,
                                    color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                            >
                                <PhoneOff size={24} />
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleStart}
                                style={{
                                    width: '140px', height: '50px', borderRadius: '25px', border: 'none', cursor: 'pointer',
                                    background: `linear-gradient(135deg, ${THEME.primary} 0%, #ff7043 100%)`,
                                    color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    fontWeight: 600, fontSize: '1rem'
                                }}
                            >
                                <PlayCircle size={20} /> Start
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* 3. Transcript Panel (Right) */}
                <div style={STYLES.card}>
                    <div style={{ padding: '1.25rem', borderBottom: `1px solid ${THEME.border}`, background: '#f8fafc' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: THEME.textMain }}>Live Transcript</h3>
                    </div>

                    <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {messages.map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '90%',
                                }}
                            >
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: THEME.textSub,
                                    marginBottom: '4px',
                                    textAlign: msg.role === 'user' ? 'right' : 'left'
                                }}>
                                    {msg.role === 'user' ? 'You' : 'AI Interviewer'}
                                </div>
                                <div style={{
                                    padding: '0.85rem 1rem',
                                    borderRadius: '12px',
                                    background: msg.role === 'user' ? THEME.primary : '#f1f5f9',
                                    color: msg.role === 'user' ? '#fff' : THEME.textMain,
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    borderTopRightRadius: msg.role === 'user' ? '2px' : '12px',
                                    borderTopLeftRadius: msg.role === 'ai' ? '2px' : '12px',
                                }}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}

                        {isListening && transcript && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                style={{ alignSelf: 'flex-end', maxWidth: '90%' }}
                            >
                                <div style={{ fontSize: '0.75rem', color: THEME.textSub, marginBottom: '4px', textAlign: 'right' }}>You (Speaking...)</div>
                                <div style={{ padding: '0.85rem 1rem', borderRadius: '12px', background: 'rgba(255, 87, 34, 0.1)', color: THEME.primary, border: `1px dashed ${THEME.primary}` }}>
                                    {transcript}
                                </div>
                            </motion.div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div style={{ padding: '1rem', borderTop: `1px solid ${THEME.border}`, background: '#ffffff' }}>
                        <input
                            placeholder="Type to answer manually..."
                            style={{
                                width: '100%', padding: '0.85rem 1rem', borderRadius: '10px',
                                border: `1px solid ${THEME.border}`, outline: 'none', fontSize: '0.9rem',
                                background: '#f8fafc'
                            }}
                            disabled={interviewState !== 'active'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
