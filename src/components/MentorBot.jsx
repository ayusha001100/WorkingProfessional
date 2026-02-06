import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MentorBot() {
    const { userData } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'mentor', text: `Hey ${userData?.name?.split(' ')[0] || 'there'}! I'm your AI Mentor. Looking for a reality check or career advice today?` }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Mock Mentor Response Tone
        setTimeout(() => {
            let mentorResponse = "";
            const query = input.toLowerCase();

            if (query.includes('job') || query.includes('career')) {
                mentorResponse = "In the real industry, companies don't just want prompt engineers—they want problem solved. Focus on the RAG architecture in Module 3. That's what gets you the ₹20L+ roles.";
            } else if (query.includes('locked') || query.includes('pay')) {
                mentorResponse = "I get it, you're wondering if it's worth it. Look, Module 1 & 2 are free because I want you to see the value first. The paid modules are where the hands-on building happens. No BS, just skills.";
            } else if (query.includes('hard') || query.includes('difficult')) {
                mentorResponse = "I won't lie to you—this part is tough. But if you finish it, your profile changes completely. Don't quit now.";
            } else {
                mentorResponse = "That's a valid point. Think about it this way: the gap between where you are and your dream role is just a series of projects away. Ready to tackle the next one?";
            }

            setMessages(prev => [...prev, { role: 'mentor', text: mentorResponse }]);
        }, 1000);
    };

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="animate-float"
                style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: 'var(--accent-gradient)', border: 'none',
                    boxShadow: '0 10px 30px rgba(255, 87, 34, 0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    cursor: 'pointer'
                }}
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="premium-card glass"
                        style={{
                            position: 'absolute', bottom: '80px', right: 0,
                            width: '350px', height: '500px', display: 'flex', flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem' }}>AI Career Mentor</h3>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Honest. Personal. Direct.</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {messages.map((msg, i) => (
                                <div key={i} style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%',
                                    padding: '1rem',
                                    borderRadius: msg.role === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
                                    background: msg.role === 'user' ? 'var(--accent-gradient)' : 'var(--bg-tertiary)',
                                    color: '#fff',
                                    fontSize: '0.9rem',
                                    border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
                                    boxShadow: msg.role === 'user' ? '0 4px 15px rgba(255, 87, 34, 0.2)' : 'none'
                                }}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask your mentor..."
                                style={{ flex: 1, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.75rem 1rem', color: '#fff', outline: 'none', fontSize: '0.9rem' }}
                            />
                            <button
                                onClick={handleSend}
                                style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'var(--accent-gradient)', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
