import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ChevronRight, CheckCircle2, Sparkles, MessageSquare, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import OnboardingModal from '../components/OnboardingModal';
import MentorBot from '../components/MentorBot';
import { modules } from '../data/curriculum';

export default function CurriculumPage() {
    const navigate = useNavigate();
    const { user, userData } = useAuth();
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        if (user && userData && !userData.onboarding) {
            setShowOnboarding(true);
        }
    }, [user, userData]);

    const handleModuleClick = (module) => {
        if (module.locked) {
            // Show payment/lock explanation
            return;
        }
        navigate(module.path);
    };

    const completedSections = userData?.progress?.completedSections || [];

    return (
        <DashboardLayout>
            <div style={{ paddingBottom: '4rem' }}>
                {/* Profile Insight Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ background: 'var(--bg-tertiary)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border-color)', marginBottom: '3rem' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ padding: '10px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                            <Sparkles size={24} />
                        </div>
                        <h2 style={{ fontSize: '1.4rem' }}>Your Professional Path</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                                Based on your background as a <span style={{ color: '#fff', fontWeight: 600 }}>{userData?.onboarding?.designation || 'Specialist'}</span>,
                                we've analyzed your skill gap for the <span style={{ color: '#fff', fontWeight: 600 }}>{userData?.onboarding?.dreamRole || 'AI Leader'}</span> role.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Level</div>
                                    <div style={{ fontWeight: 700 }}>{userData?.onboarding?.experience || 'Beginner'}</div>
                                </div>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Target Role</div>
                                    <div style={{ fontWeight: 700 }}>{userData?.onboarding?.dreamRole || 'AI Pro'}</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ background: 'rgba(255, 87, 34, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px dotted var(--accent-primary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', color: 'var(--accent-primary)' }}>
                                <MessageSquare size={18} />
                                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>AI COUNSELOR SAYS</span>
                            </div>
                            <p style={{ fontSize: '0.9rem', color: '#fff', lineHeight: '1.6', fontStyle: 'italic' }}>
                                "Jumping directly to {userData?.onboarding?.dreamRole || 'Advanced AI'} might feel daunting, but your experience gives you a unique edge in domain-specific prompting. We'll focus on leveraging that."
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Modules Grid */}
                <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Learning Modules</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {modules.map((module, idx) => (
                        <motion.div
                            key={module.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => handleModuleClick(module)}
                            className="glass-card"
                            style={{
                                padding: '2rem',
                                cursor: module.locked ? 'default' : 'pointer',
                                opacity: 1,
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '380px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                <div style={{
                                    width: '60px', height: '60px', background: `${module.color}15`,
                                    borderRadius: '16px', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', color: module.color, border: `1px solid ${module.color}30`
                                }}>
                                    {module.icon}
                                </div>
                                <div style={{
                                    padding: '6px 12px', background: module.locked ? 'rgba(255,255,255,0.05)' : 'rgba(34, 197, 94, 0.1)',
                                    color: module.locked ? 'var(--text-secondary)' : '#22c55e', borderRadius: '50px',
                                    fontSize: '0.75rem', fontWeight: 800, border: '1px solid currentColor'
                                }}>
                                    {module.locked ? 'LOCKED' : 'FREE ACCESS'}
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{module.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>{module.description}</p>

                            <ul style={{ padding: 0, margin: '0 0 2rem 0', listStyle: 'none' }}>
                                {module.topics.map((topic, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                                        <CheckCircle2 size={14} color={module.color} />
                                        {topic}
                                    </li>
                                ))}
                            </ul>

                            {module.locked ? (
                                <div style={{ marginTop: 'auto' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', fontSize: '0.8rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>
                                            <Info size={14} />
                                            <span style={{ fontWeight: 700 }}>Locked Content</span>
                                        </div>
                                        <p style={{ color: 'var(--text-muted)' }}>Unlock to learn: {module.skills?.join(', ')}</p>
                                    </div>
                                    <button className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem', cursor: 'not-allowed' }}>
                                        <Lock size={16} /> Unlock for ₹399
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="btn-primary"
                                    style={{ width: '100%', marginTop: 'auto', justifyContent: 'center', background: `linear-gradient(135deg, ${module.color}, ${module.color}dd)` }}
                                >
                                    Enter Module <ChevronRight size={18} />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <MentorBot />
            <OnboardingModal
                isOpen={showOnboarding}
                onClose={() => setShowOnboarding(false)}
                onComplete={() => setShowOnboarding(false)}
            />
        </DashboardLayout>
    );
}
