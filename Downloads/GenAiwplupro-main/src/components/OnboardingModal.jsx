import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, Send, Sparkles, User, Target, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db, doc, setDoc } from '../config/mockDb';

export default function OnboardingModal({ isOpen, onClose, onComplete }) {
    const { user, userData, setUserData } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        profession: '',
        designation: '',
        experience: '',
        ctc: '',
        dreamRole: '',
        dreamCompany: '',
        reason: '',
        blocker: ''
    });

    const [loading, setLoading] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        if (user && userData) {
            setFormData(prev => ({
                ...prev,
                name: userData.name || user.displayName || '',
                phone: userData.phone || ''
            }));
        }
    }, [user, userData]);

    const steps = [
        {
            id: 1,
            title: "Let's start with basics",
            icon: <User size={24} />,
            fields: [
                { name: 'name', label: 'What is your name?', placeholder: 'e.g. John Doe', type: 'text' },
                { name: 'phone', label: 'And your phone number?', placeholder: 'e.g. +91 9876543210', type: 'tel' }
            ]
        },
        {
            id: 2,
            title: "Current Professional Status",
            icon: <Target size={24} />,
            options: ['Student', 'Fresher', 'Working Professional'],
            field: 'profession'
        },
        {
            id: 3,
            title: "Detailed Career Info",
            icon: <Target size={24} />,
            condition: (data) => data.profession === 'Working Professional',
            fields: [
                { name: 'designation', label: 'What is your current designation?', placeholder: 'e.g. Software Engineer', type: 'text' },
                { name: 'experience', label: 'How many years of experience?', type: 'select', options: ['Fresher', '0-1 year', '1-3 years', '3+ years'] },
                { name: 'ctc', label: 'Current CTC (Optional)', placeholder: 'e.g. 8 LPA', type: 'text' }
            ]
        },
        {
            id: 4,
            title: "Your Future Goals",
            icon: <Sparkles size={24} />,
            fields: [
                { name: 'dreamRole', label: 'What is your dream job role?', placeholder: 'e.g. AI Product Manager', type: 'text' },
                { name: 'dreamCompany', label: 'Dream company?', placeholder: 'e.g. Google, NVIDIA, etc.', type: 'text' }
            ]
        },
        {
            id: 5,
            title: "Honest Conversation",
            icon: <MessageSquare size={24} />,
            fields: [
                { name: 'reason', label: 'Why do you want this upgrade?', placeholder: 'Career switch / Salary jump / Skill gap...', type: 'text' },
                { name: 'blocker', label: 'What do you think is stopping you right now?', placeholder: 'Be honest with us...', type: 'textarea' }
            ]
        }
    ];

    const currentStepData = steps.find(s => s.id === step);

    const handleNext = () => {
        if (step < steps.length) {
            if (step === 2 && formData.profession !== 'Working Professional') {
                setStep(4); // Skip professional details for students/freshers
            } else {
                setStep(step + 1);
            }
        } else {
            setShowSummary(true);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        const aiSummary = `You're a ${formData.profession === 'Working Professional' ? formData.designation : formData.profession} looking to transition into a ${formData.dreamRole || 'Gen AI expert'} role. ${formData.blocker ? `You mentioned that ${formData.blocker} is holding you back.` : ''} We've tailored this path specifically for your ${formData.experience || 'current'} experience level.`;

        const finalData = { ...formData, aiSummary };

        if (user) {
            await setDoc(doc(db, 'users', user.uid), {
                onboarding: finalData,
                name: finalData.name,
                phone: finalData.phone
            }, { merge: true });
            setUserData({ ...userData, onboarding: finalData });
        }

        setLoading(false);
        onComplete();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass"
                style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.85)'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="premium-card"
                    style={{ width: '90%', maxWidth: '500px', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
                >
                    {!showSummary ? (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '12px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                                    {currentStepData.icon}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{currentStepData.title}</h2>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Step {step} of {steps.length}</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {currentStepData.fields?.map(field => (
                                    <div key={field.name}>
                                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>
                                            {field.label}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                value={formData[field.name]}
                                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                                placeholder={field.placeholder}
                                                style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', minHeight: '100px', outline: 'none' }}
                                            />
                                        ) : field.type === 'select' ? (
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                                {field.options.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setFormData({ ...formData, [field.name]: opt })}
                                                        style={{
                                                            padding: '0.8rem', borderRadius: '10px',
                                                            background: formData[field.name] === opt ? 'rgba(255, 87, 34, 0.1)' : 'var(--bg-tertiary)',
                                                            border: formData[field.name] === opt ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                                                            color: formData[field.name] === opt ? 'var(--accent-primary)' : '#fff'
                                                        }}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <input
                                                type={field.type}
                                                value={formData[field.name]}
                                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                                placeholder={field.placeholder}
                                                style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#fff', outline: 'none' }}
                                            />
                                        )}
                                    </div>
                                ))}

                                {currentStepData.options?.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => {
                                            setFormData({ ...formData, [currentStepData.field]: opt });
                                            handleNext();
                                        }}
                                        style={{
                                            padding: '1.2rem', borderRadius: '16px', textAlign: 'left',
                                            background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                                            color: '#fff', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                        }}
                                    >
                                        {opt}
                                        <ChevronRight size={18} />
                                    </button>
                                ))}
                            </div>

                            {!currentStepData.options && (
                                <button
                                    onClick={handleNext}
                                    className="btn-primary"
                                    style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
                                >
                                    Next Step <ChevronRight size={18} />
                                </button>
                            )}
                        </>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
                            <div style={{ width: '80px', height: '80px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', color: 'var(--accent-primary)' }}>
                                <Sparkles size={40} />
                            </div>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Great, {formData.name.split(' ')[0]}!</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                                We've processed your profile using our AI mentor. Here's what we understand:
                            </p>
                            <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: '16px', textAlign: 'left', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
                                    <MessageSquare size={18} />
                                    <span style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>AI Mentor Summary</span>
                                </div>
                                <p style={{ fontSize: '1rem', color: '#fff', fontStyle: 'italic', lineHeight: '1.6' }}>
                                    "You're a {formData.profession} looking to transition into a {formData.dreamRole} role at {formData.dreamCompany}. Based on your {formData.experience} experience, jumping directly to high-end RAG architecture is achievable in 4 weeks, and this program is built exactly for that."
                                </p>
                            </div>
                            <button
                                onClick={handleComplete}
                                disabled={loading}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                {loading ? 'Setting up your path...' : "Let's Start Your Journey"}
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
