import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Headphones } from 'lucide-react';

export default function CompactAIAssistant({ isOpen, onClose, voiceState: externalVoiceState, isDarkMode }) {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [error, setError] = useState(null);
    const [sessionId] = useState(() => `session_${Date.now()}`);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(new Audio());

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    // Determine current voice state
    const voiceState = isListening ? 'listening' : isProcessing ? 'processing' : isSpeaking ? 'speaking' : 'idle';

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
            formData.append('voice', 'alloy');

            console.log('Sending audio to backend...');

            const response = await fetch(`${API_BASE_URL}/api/voice-conversation`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Backend error: ${response.status}`);
            }

            const data = await response.json();

            console.log('User said:', data.userMessage);
            console.log('AI responded:', data.aiResponse);

            // Play AI response
            await playAudioResponse(data.audioData);

        } catch (err) {
            console.error('Error processing audio:', err);
            setError(`Failed to process: ${err.message}`);
            setIsProcessing(false);
        }
    };

    // Play audio response
    const playAudioResponse = async (base64Audio) => {
        try {
            setIsProcessing(false);
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
            setError('Failed to play audio response');
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

    // Handle click on modal (start/stop recording)
    const handleModalClick = (e) => {
        // Don't trigger if clicking close button
        if (e.target.closest('button')) return;

        if (isListening) {
            stopRecording();
        } else if (!isProcessing && !isSpeaking) {
            startRecording();
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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleModalClick}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(20px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isProcessing || isSpeaking ? 'not-allowed' : 'pointer'
                    }}
                >
                    {/* Close Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#fff',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.2s',
                            zIndex: 1001
                        }}
                    >
                        <X size={22} />
                    </motion.button>

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            position: 'absolute',
                            top: '6rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'rgba(239, 68, 68, 0.9)',
                            color: '#fff',
                            padding: '1rem 2rem',
                            borderRadius: '12px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            maxWidth: '80%',
                            textAlign: 'center',
                            zIndex: 1001
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Animated Circle */}
                    <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                        {/* Outer Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.3],
                                opacity: [0.3, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                            style={{
                                position: 'absolute',
                                inset: -25,
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.3)',
                                pointerEvents: 'none'
                            }}
                        />

                        {/* Main Circle */}
                        <motion.div
                            animate={{
                                scale: voiceState === 'speaking' ? [1, 1.03, 1] : [1, 1.02, 1]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: voiceState === 'speaking' ? 1.2 : 2.5,
                                ease: "easeInOut"
                            }}
                            style={{
                                width: '180px',
                                height: '180px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.12)',
                                border: '2px solid rgba(255,255,255,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 20px 60px -10px rgba(0,0,0,0.5)',
                                backdropFilter: 'blur(10px)',
                                cursor: isProcessing || isSpeaking ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {voiceState === 'listening' && (
                                <Mic size={70} color="#fff" strokeWidth={1.5} />
                            )}
                            {voiceState === 'processing' && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        border: '3px solid rgba(255,255,255,0.2)',
                                        borderTopColor: '#fff',
                                        borderRadius: '50%'
                                    }}
                                />
                            )}
                            {voiceState === 'speaking' && (
                                <Headphones size={70} color="#fff" strokeWidth={1.5} />
                            )}
                        </motion.div>

                        {/* Waveform for Speaking */}
                        {voiceState === 'speaking' && (
                            <div style={{
                                position: 'absolute',
                                bottom: '-55px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                gap: '7px',
                                alignItems: 'flex-end'
                            }}>
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            height: ['18px', `${30 + Math.random() * 25}px`, '18px']
                                        }}
                                        transition={{
                                            duration: 0.7 + i * 0.1,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        style={{
                                            width: '4px',
                                            background: 'rgba(255,255,255,0.7)',
                                            borderRadius: '4px'
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Instruction Text */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-100px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: '#fff',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                        }}>
                            {voiceState === 'listening' && 'Listening... Click to stop'}
                            {voiceState === 'processing' && 'Processing your message...'}
                            {voiceState === 'speaking' && 'AI is speaking...'}
                            {voiceState === 'idle' && 'Click to speak'}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
