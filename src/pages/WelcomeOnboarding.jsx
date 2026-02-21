import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, User, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function WelcomeOnboarding() {
    const { user, userData, updateUserData } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        state: '',
        city: '',
        role: '',
        experience: '',
        goal: '',
        obstacle: '',
        timeline: '',
        timeCommitment: '',
        learningStyle: '',
        outcome: '',
        domainOpenness: '',
        futureRole: '',
        dreamRole: '' // Added for dynamic dashboard header
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && userData) {
            const initialName = userData.name || user.displayName || '';
            setFormData(prev => {
                const nameToSet = initialName === 'Premium Warrior' ? '' : initialName;
                if (prev.name === nameToSet) return prev; // Avoid update if already set
                return {
                    ...prev,
                    name: nameToSet,
                };
            });
        }
    }, [user, userData]);

    // Define the full sequence of steps
    const steps = [
        // STEP 1: Identity Form
        {
            id: 1,
            type: 'form',
            title: "Who are we mentoring today?",
            subtitle: "Let's personalize your career dashboard.",
            fields: [
                { name: 'name', label: 'Full Name', placeholder: 'Enter your full name', type: 'text' },
                { name: 'dreamRole', label: 'Target Job Role', placeholder: 'e.g. Recruiter, Software Engineer, Product Manager', type: 'text' },
                { name: 'phone', label: 'WhatsApp Number (for job alerts)', placeholder: 'e.g. +91 98765 43210', type: 'tel' },
                { name: 'state', label: 'State', placeholder: 'Search or Select State...', type: 'text' },
                { name: 'city', label: 'City', placeholder: 'Select State first', type: 'text' }
            ]
        },
        // STEP 2: Welcome Intermission
        {
            id: 2,
            type: 'intermission',
        },
        // STEP 3-12: The 10 Professional Questions
        {
            id: 3,
            type: 'mcq',
            key: 'role',
            question: "What best describes your current role?",
            options: ["Individual contributor", "Team lead / Manager", "Specialist / Expert", "Founder / Business owner", "Freelancer / Consultant", "Returning after a break"]
        },
        {
            id: 4,
            type: 'mcq',
            key: 'experience',
            question: "How many years of experience do you have?",
            options: ["Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"]
        },
        {
            id: 5,
            type: 'mcq',
            key: 'goal',
            question: "What is your primary goal right now?",
            options: ["Promotion in my current role", "Switch to a new role/domain", "Increase my income", "Become a subject-matter expert", "Move into leadership", "Start something of my own", "Not sure (guide me)"]
        },
        {
            id: 6,
            type: 'mcq',
            key: 'obstacle',
            question: "What is holding you back the most right now?",
            options: ["Skill gaps", "Lack of direction", "Low confidence", "Poor interview performance", "Weak resume / portfolio", "No mentorship", "Time management"]
        },
        {
            id: 7,
            type: 'mcq',
            key: 'timeline',
            question: "How soon do you want to see results?",
            options: ["1–2 months", "3–4 months", "6 months", "12 months", "No fixed timeline"]
        },
        {
            id: 8,
            type: 'mcq',
            key: 'timeCommitment',
            question: "How much time can you realistically invest per week?",
            options: ["Less than 3 hours", "3–5 hours", "5–8 hours", "8–12 hours", "12+ hours"]
        },
        {
            id: 9,
            type: 'mcq',
            key: 'learningStyle',
            question: "What kind of learning do you prefer?",
            options: ["Hands-on & practical", "Theory & fundamentals", "Projects & case studies", "Mentorship-based", "Mixed"]
        },
        {
            id: 10,
            type: 'mcq',
            key: 'outcome',
            question: "What outcome would make this roadmap successful for you?",
            options: ["A better job", "A promotion", "Higher salary", "Stronger skills", "Career clarity", "Business readiness"]
        },
        {
            id: 11,
            type: 'mcq',
            key: 'domainOpenness',
            question: "Are you open to changing your domain?",
            options: ["Yes, fully open", "Maybe, if it’s worth it", "No, I want to grow in my current domain", "Not sure yet"]
        },
        {
            id: 12,
            type: 'mcq',
            key: 'futureRole',
            question: "Where do you want to see yourself in 1–2 years?",
            options: ["Senior professional", "Team lead / Manager", "Specialist / Expert", "Independent consultant", "Business owner", "Still exploring"]
        }
    ];

    const currentStepData = steps.find(s => s.id === step);

    const handleNext = () => {
        if (step < steps.length) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleAnswer = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        // Slight delay for visual feedback before auto-advancing
        setTimeout(() => {
            handleNext();
        }, 300);
    };

    const handleComplete = async () => {
        setLoading(true);

        const finalOnboarding = {
            ...formData,
            completedAt: new Date().toISOString()
        };

        if (user) {
            try {
                // Use updateUserData to persist to Firestore
                await updateUserData({
                    onboarding: finalOnboarding,
                    name: formData.name,
                    'onboarding.completed': true,
                    onboardingCompleted: true
                });
            } catch (error) {
                console.error("Error saving onboarding data:", error);
            }
        }

        // Fake roadmap generation delay
        setTimeout(() => {
            navigate('/track');
        }, 2500);
    };

    // --- RENDERERS ---

    const renderIntermission = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'left', padding: '0 1rem', width: '100%', maxWidth: '600px' }}
        >
            <div style={{ marginBottom: '3rem' }}>
                <img
                    src="/logo.png"
                    alt="LetsUpgrade"
                    style={{ height: '32px', objectFit: 'contain' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Welcome, <span style={{ color: '#ff5722' }}>{(formData.name || 'Learner').split(' ')[0]}</span>! 👋
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#1a1a1a', lineHeight: '1.6', marginBottom: '1.5rem', fontWeight: 500 }}>
                We want the time you spend here to actually lead somewhere. Not just learning — but real progress toward an internship, job, or clear next step.
            </p>
            <p style={{ fontSize: '1.25rem', color: '#4a5568', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                Spend the next minute answering a few simple questions. We'll use that to create a roadmap that tells you exactly what to focus on.
            </p>

            <button
                onClick={handleNext}
                style={{
                    padding: '1.2rem 2.5rem',
                    background: 'var(--accent-gradient)',
                    border: 'none',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    boxShadow: '0 10px 20px -5px rgba(255, 87, 34, 0.3)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(255, 87, 34, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(255, 87, 34, 0.3)';
                }}
            >
                Create My Roadmap <ChevronRight size={22} strokeWidth={3} />
            </button>
        </motion.div>
    );

    const renderForm = () => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', maxWidth: '600px' }}
        >
            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent-primary)', marginBottom: '1.2rem' }}>
                    <div style={{ padding: '0.6rem', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={22} color="var(--accent-primary)" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.9 }}>STEP 1</span>
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.6rem', letterSpacing: '-0.03em', color: '#1a1a1a' }}>
                    {currentStepData.title}
                </h2>
                <p style={{ color: '#666', fontSize: '1.05rem', fontWeight: 500, opacity: 0.9 }}>
                    {currentStepData.subtitle}
                </p>
            </div>
            {/* Progress Bar for Step 1 */}
            <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginBottom: '2.5rem', overflow: 'hidden' }}>
                <motion.div animate={{ width: '10%' }} style={{ height: '100%', background: 'var(--accent-gradient)', borderRadius: '2px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', marginBottom: '2rem' }}>
                {currentStepData.fields?.map(field => (
                    <div key={field.name}>
                        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 700, color: '#333' }}>{field.label}</label>
                        <input
                            type={field.type}
                            value={formData[field.name]}
                            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                            placeholder={field.placeholder}
                            style={{ width: '100%', background: '#f8f9fa', border: '1px solid #e1e4e8', borderRadius: '18px', padding: '1.2rem', color: '#1a1a1a', outline: 'none', fontSize: '1rem', transition: '0.3s' }}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleNext}
                style={{ width: '100%', padding: '1.2rem', background: 'var(--accent-gradient)', border: 'none', borderRadius: '16px', color: '#fff', fontSize: '1.05rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: '0.3s' }}
            >
                Continue <ChevronRight size={20} />
            </button>
        </motion.div>
    );

    const renderMCQ = () => (
        <motion.div
            key={currentStepData.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', maxWidth: '600px' }}
        >
            <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ff5722', display: 'block', marginBottom: '1rem' }}>
                    QUESTION {step - 2} OF {steps.length - 2}
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {currentStepData.question}
                </h2>
            </div>

            {/* Options Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {currentStepData.options.map((option, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, backgroundColor: '#fff5f2', borderColor: '#ff5722' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(currentStepData.key, option)}
                        style={{
                            padding: '1.5rem',
                            textAlign: 'left',
                            background: formData[currentStepData.key] === option ? '#fff5f2' : '#ffffff',
                            border: formData[currentStepData.key] === option ? '2px solid #ff5722' : '1px solid #e2e8f0',
                            borderRadius: '16px',
                            color: formData[currentStepData.key] === option ? '#ff5722' : '#1e293b',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.2s'
                        }}
                    >
                        {option}
                        {formData[currentStepData.key] === option && <Check size={20} />}
                    </motion.button>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setStep(step - 1)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>Back</button>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Select one option</span>
            </div>
        </motion.div>
    );

    const renderLoading = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center' }}
        >
            <div style={{ display: 'inline-block', width: '60px', height: '60px', border: '4px solid #f3f3f3', borderTop: '4px solid #ff5722', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <h2 style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 800, color: '#1a1a1a' }}>Creating your roadmap...</h2>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </motion.div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: '#ffffff',
            padding: '3rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <AnimatePresence mode="wait">
                {loading ? renderLoading() : (
                    currentStepData?.type === 'intermission' ? renderIntermission() :
                        currentStepData?.type === 'mcq' ? renderMCQ() :
                            renderForm()
                )}
            </AnimatePresence>
        </div>
    );
}
