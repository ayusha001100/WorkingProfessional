import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Trash2, Loader } from 'lucide-react';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [error, setError] = useState(null);
    const [sessionId] = useState(() => `session_${Date.now()}`);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(new Audio());

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    // Start recording
    const startRecording = async () => {
        try {
            setError(null);
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: 'audio/webm'
            });

            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await processAudio(audioBlob);

                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsListening(true);

        } catch (err) {
            console.error('Error accessing microphone:', err);
            setError('Could not access microphone. Please check permissions.');
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsListening(false);
        }
    };

    // Process audio and get AI response
    const processAudio = async (audioBlob) => {
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            formData.append('sessionId', sessionId);
            formData.append('voice', 'alloy'); // Choose voice: alloy, echo, fable, onyx, nova, shimmer

            const response = await fetch(`${API_BASE_URL}/api/voice-conversation`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to process audio');
            }

            const data = await response.json();

            // Add to conversation
            setConversation(prev => [
                ...prev,
                { role: 'user', content: data.userMessage },
                { role: 'assistant', content: data.aiResponse }
            ]);

            // Play AI response
            await playAudioResponse(data.audioData);

        } catch (err) {
            console.error('Error processing audio:', err);
            setError('Failed to process your message. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Play audio response
    const playAudioResponse = async (base64Audio) => {
        try {
            setIsSpeaking(true);

            const audioBlob = base64ToBlob(base64Audio, 'audio/mpeg');
            const audioUrl = URL.createObjectURL(audioBlob);

            audioRef.current.src = audioUrl;

            audioRef.current.onended = () => {
                setIsSpeaking(false);
                URL.revokeObjectURL(audioUrl);
            };

            await audioRef.current.play();

        } catch (err) {
            console.error('Error playing audio:', err);
            setIsSpeaking(false);
        }
    };

    // Convert base64 to blob
    const base64ToBlob = (base64, mimeType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    // Clear conversation
    const clearConversation = async () => {
        try {
            await fetch(`${API_BASE_URL}/api/clear-history`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId })
            });

            setConversation([]);
            setError(null);
        } catch (err) {
            console.error('Error clearing conversation:', err);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    const getStatus = () => {
        if (isListening) return 'Listening...';
        if (isProcessing) return 'Processing...';
        if (isSpeaking) return 'Speaking...';
        return 'Tap to speak';
    };

    const getStatusColor = () => {
        if (isListening) return '#10b981';
        if (isProcessing) return '#8b5cf6';
        if (isSpeaking) return '#ff5722';
        return '#64748b';
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.3)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: '#1e293b',
                        margin: '0 0 0.5rem 0'
                    }}>
                        AI Voice Assistant
                    </h1>
                    <p style={{
                        fontSize: '1rem',
                        color: '#64748b',
                        margin: 0
                    }}>
                        Speak naturally, I'll understand
                    </p>
                </div>

                {/* Voice Button */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        onTouchStart={startRecording}
                        onTouchEnd={stopRecording}
                        disabled={isProcessing || isSpeaking}
                        style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            border: 'none',
                            background: getStatusColor(),
                            color: '#fff',
                            cursor: isProcessing || isSpeaking ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 20px 50px -10px ${getStatusColor()}80`,
                            transition: 'all 0.3s',
                            position: 'relative',
                            opacity: isProcessing || isSpeaking ? 0.7 : 1
                        }}
                    >
                        {isProcessing ? (
                            <Loader size={60} className="animate-spin" />
                        ) : isSpeaking ? (
                            <Volume2 size={60} />
                        ) : isListening ? (
                            <Mic size={60} />
                        ) : (
                            <MicOff size={60} />
                        )}

                        {/* Pulsing ring */}
                        {(isListening || isSpeaking) && (
                            <motion.div
                                animate={{
                                    scale: [1, 1.3],
                                    opacity: [0.5, 0]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                                style={{
                                    position: 'absolute',
                                    inset: -10,
                                    borderRadius: '50%',
                                    border: `3px solid ${getStatusColor()}`,
                                    pointerEvents: 'none'
                                }}
                            />
                        )}
                    </motion.button>

                    <div style={{ textAlign: 'center' }}>
                        <p style={{
                            fontSize: '1.125rem',
                            fontWeight: '700',
                            color: getStatusColor(),
                            margin: '0 0 0.25rem 0'
                        }}>
                            {getStatus()}
                        </p>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#94a3b8',
                            margin: 0
                        }}>
                            {isListening ? 'Release to send' : 'Hold to speak'}
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            style={{
                                padding: '1rem',
                                background: '#fee2e2',
                                border: '1px solid #fca5a5',
                                borderRadius: '12px',
                                color: '#dc2626',
                                fontSize: '0.875rem',
                                marginBottom: '1rem',
                                textAlign: 'center'
                            }}
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Conversation History */}
                {conversation.length > 0 && (
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: '700',
                                color: '#1e293b',
                                margin: 0
                            }}>
                                Conversation
                            </h3>
                            <button
                                onClick={clearConversation}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#64748b',
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.875rem',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
                                onMouseLeave={(e) => e.target.style.background = 'transparent'}
                            >
                                <Trash2 size={16} />
                                Clear
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {conversation.map((msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '12px',
                                        background: msg.role === 'user' ? '#e0e7ff' : '#fff',
                                        border: msg.role === 'user' ? '1px solid #c7d2fe' : '1px solid #e2e8f0',
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%'
                                    }}
                                >
                                    <p style={{
                                        fontSize: '0.875rem',
                                        color: '#1e293b',
                                        margin: 0,
                                        lineHeight: 1.5
                                    }}>
                                        {msg.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Instructions */}
                {conversation.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: '#64748b',
                        fontSize: '0.875rem'
                    }}>
                        <p style={{ margin: '0 0 0.5rem 0' }}>
                            🎤 Hold the button and speak
                        </p>
                        <p style={{ margin: '0 0 0.5rem 0' }}>
                            🌍 Speak in any language
                        </p>
                        <p style={{ margin: 0 }}>
                            🤖 AI will respond naturally
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceAssistant;
