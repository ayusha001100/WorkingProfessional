import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Trophy, Target,
    CheckCircle2, XCircle, ArrowLeft,
    TrendingUp, Calendar, Hash, Award,
    FileText, Zap, Gift, Share2, Briefcase, ChevronRight,
    Sparkles, ShieldAlert, Brain, Clock, Flame, BarChart3,
    Edit2, Check, X
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';

export default function Profile() {
    const { userData, updateUserData } = useAuth();
    const navigate = useNavigate();

    const [isEditingName, setIsEditingName] = useState(false);
    const [nameInput, setNameInput] = useState('');

    useEffect(() => {
        if (userData) {
            setNameInput(userData.name || userData.displayName || 'AI Explorer');
        }
    }, [userData]);

    const handleSaveName = () => {
        if (nameInput.trim()) {
            updateUserData({ name: nameInput, displayName: nameInput });
            setIsEditingName(false);
        }
    };

    // Derived statistics from real user data
    const completedSections = userData?.progress?.completedSections || [];
    const userXP = userData?.progress?.xp || 0;

    const stats = {
        mcqs: {
            total: userData?.stats?.mcqsTotal || 0,
            correct: userData?.stats?.mcqsCorrect || 0,
            wrong: userData?.stats?.mcqsWrong || 0
        },
        courses: {
            total: 12,
            completed: completedSections.length > 5 ? Math.floor(completedSections.length / 3) : 0
        },
        streak: userData?.stats?.streak || 0,
        consistency: userData?.stats?.consistency || "0%",
        certificates: userData?.stats?.certificates || 0,
        milestones: userData?.stats?.milestones || 0
    };

    const joinDate = userData?.createdAt?.seconds
        ? new Date(userData.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        : (userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2026');

    return (
        <DashboardLayout>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem 4rem' }}>

                {/* Header Section */}
                <div style={{
                    background: '#fff',
                    borderRadius: '32px',
                    padding: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3rem',
                    marginBottom: '3rem',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}>
                    <div style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '40px',
                        background: 'linear-gradient(135deg, #FF5722 0%, #ff8a50 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3.5rem',
                        fontWeight: 900,
                        color: '#fff',
                        boxShadow: '0 20px 40px rgba(255, 87, 34, 0.2)',
                        zIndex: 1
                    }}>
                        {userData?.name ? userData.name[0].toUpperCase() : (userData?.displayName ? userData.displayName[0].toUpperCase() : 'W')}
                    </div>

                    <div style={{ zIndex: 1, flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            {isEditingName ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={nameInput}
                                        onChange={(e) => setNameInput(e.target.value)}
                                        style={{
                                            fontSize: '2rem',
                                            fontWeight: 900,
                                            color: '#1a1a1a',
                                            padding: '0.2rem 0.5rem',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '12px',
                                            outline: 'none',
                                            width: '300px'
                                        }}
                                        autoFocus
                                    />
                                    <button
                                        onClick={handleSaveName}
                                        style={{
                                            background: '#10b981',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Check size={20} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsEditingName(false);
                                            setNameInput(userData?.name || userData?.displayName || 'AI Explorer');
                                        }}
                                        style={{
                                            background: '#ef4444',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1a1a1a', margin: 0 }}>
                                        {userData?.name || userData?.displayName || 'AI Explorer'}
                                    </h2>
                                    <button
                                        onClick={() => setIsEditingName(true)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#94a3b8',
                                            padding: '8px',
                                            borderRadius: '50%',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'}
                                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <Edit2 size={24} />
                                    </button>
                                </div>
                            )}
                        </div>
                        <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                            {userData?.profile?.targetRole || userData?.onboarding?.dreamRole || 'Set your target role'} • {userData?.location?.city ? `${userData.location.city}, ${userData.location.country || 'India'}` : (userData?.onboarding?.location || 'Set your location')}
                        </p>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
                                <Calendar size={18} color="#ff5722" strokeWidth={2.5} /> Joined {joinDate}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
                                <Briefcase size={18} color="#ff5722" strokeWidth={2.5} /> {userData?.onboarding?.track || 'Professional Track'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Learning Mirror (Stats Grid) */}
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ background: '#fff0e6', color: '#ff5722', padding: '10px', borderRadius: '15px' }}>
                            <Brain size={24} strokeWidth={2.5} />
                        </div>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1a1a1a', margin: 0 }}>Learning Mirror</h3>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        <StatCard
                            icon={<Target color="#ff5722" size={24} />}
                            label="MCQ Accuracy"
                            value={stats.mcqs.total > 0 ? Math.round((stats.mcqs.correct / stats.mcqs.total) * 100) + "%" : "0%"}
                            sub={`${stats.mcqs.correct} Right / ${stats.mcqs.wrong} Wrong`}
                        />
                        <StatCard icon={<Flame color="#ff4500" size={24} />} label="Learning Streak" value={stats.streak + " Days"} sub={`Personal Best: ${userData?.stats?.personalBest || stats.streak} Days`} />
                        <StatCard icon={<TrendingUp color="#22c55e" size={24} />} label="Consistency" value={stats.consistency} sub={userData?.stats?.communityRank ? `Top ${userData.stats.communityRank}% in Community` : 'Keep learning to rank!'} />
                        <StatCard icon={<Award color="#f59e0b" size={24} />} label="Certificates" value={stats.certificates} sub={stats.certificates === 0 ? "1 In Progress" : "Claim your latest"} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                    {/* Left Column: Activity & Roadmap */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <BarChart3 size={22} color="#ff5722" /> Learning Progress
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <ProgressItem
                                    label="GEN AI Foundations"
                                    percent={Math.min(100, Math.round((completedSections.length / 8) * 100))}
                                    color="#10b981"
                                />
                                <ProgressItem
                                    label="AI Career Mastery"
                                    percent={Math.min(100, Math.round((userXP / 1000) * 100))}
                                    color="#ff5722"
                                />
                                <ProgressItem
                                    label="Real-world Projects"
                                    percent={Math.min(100, Math.round((stats.mcqs.total / 50) * 100))}
                                    color="#6366f1"
                                />
                            </div>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <CheckCircle2 size={22} color="#ff5722" /> Roadmap Milestones
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <MilestoneBox title="Profile Analysis" status={userData?.onboardingCompleted ? "Completed" : "In Progress"} date={joinDate} />
                                <MilestoneBox title="Gen AI Mastery" status={completedSections.length >= 4 ? "Completed" : (completedSections.length > 0 ? "In Progress" : "Locked")} />
                                <MilestoneBox title="Domain Workflow" status={completedSections.length >= 8 ? "Completed" : (completedSections.length >= 4 ? "In Progress" : "Locked")} />
                                <MilestoneBox title="Expert Portfolio" status={userData?.stats?.certificates > 0 ? "Completed" : "Locked"} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Rewards & Assets */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #334155 100%)', borderRadius: '24px', padding: '2rem', color: '#fff' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Award size={22} color="#FFD700" /> Professional Badges
                            </h3>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                {(userData?.badges && userData.badges.length > 0) ? (
                                    userData.badges.map((badge, idx) => (
                                        <Badge key={idx} icon={badge.icon} label={badge.label} />
                                    ))
                                ) : (
                                    <>
                                        <Badge icon="🛡️" label="Safety First" />
                                        <Badge icon="⚡" label="Speed Learner" />
                                    </>
                                )}
                            </div>
                        </div>

                        <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #e2e8f0' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <FileText size={22} color="#ff5722" /> Career Assets
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <AssetLink icon={<FileText size={18} />} label="AI-Optimized Resume" sub="Last updated 2 days ago" path="/resume-builder" />
                                <AssetLink icon={<Award size={18} />} label="Certifications" sub="View & Download Certificates" path="/certificate" />
                                <AssetLink icon={<Clock size={18} />} label="Mock Interview History" sub={`${userData?.interviewHistory?.length || 0} Sessions completed`} path="/mock-interviews" />
                                <AssetLink icon={<Share2 size={18} />} label="Knowledge Network" sub="Refer colleagues for 500 XP" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatCard({ icon, label, value, sub }) {
    return (
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
            <div style={{ marginBottom: '1rem' }}>{icon}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '0.2rem' }}>{value}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>{sub}</div>
        </div>
    );
}

function ProgressItem({ label, percent, color }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontWeight: 800, fontSize: '0.9rem' }}>
                <span style={{ color: '#1a1a1a' }}>{label}</span>
                <span style={{ color: color }}>{percent}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ height: '100%', background: color, borderRadius: '10px' }}
                />
            </div>
        </div>
    );
}

function MilestoneBox({ title, status, date }) {
    const isCompleted = status === "Completed";
    const isLocked = status === "Locked";

    return (
        <div style={{
            padding: '1.2rem',
            borderRadius: '16px',
            background: isLocked ? '#f8fafc' : (isCompleted ? '#f0fdf4' : '#fff7ed'),
            border: `1px solid ${isLocked ? '#e2e8f0' : (isCompleted ? '#bcf0da' : '#ffedd5')}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
        }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isLocked ? '#94a3b8' : '#1a1a1a' }}>{title}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: isCompleted ? '#166534' : (isLocked ? '#94a3b8' : '#9a3412'), textTransform: 'uppercase' }}>{status}</div>
            {date && <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{date}</div>}
        </div>
    );
}

function Badge({ icon, label }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '8px 16px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <span style={{ fontSize: '1.2rem' }}>{icon}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{label}</span>
        </div>
    );
}

function AssetLink({ icon, label, sub, path = "#" }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => path !== "#" && navigate(path)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ color: '#ff5722' }}>{icon}</div>
                <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1e293b' }}>{label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{sub}</div>
                </div>
            </div>
            <ChevronRight size={18} color="#94a3b8" />
        </div>
    );
}
