import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, UserSearch, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SelectionPage() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSelection = (type) => {
        // You can save 'type' to local storage or context if needed
        localStorage.setItem('userType', type);
        navigate(user ? '/track' : '/login?redirect=/track');
    };

    const options = [
        {
            id: 'student',
            title: "Student",
            desc: "Currently in college, building foundations.",
            icon: <GraduationCap size={28} />,
            color: 'var(--accent-primary)'
        },
        {
            id: 'fresher',
            title: "Fresher",
            desc: "Recent graduate hunting for the first break.",
            icon: <UserSearch size={28} />,
            color: '#00bcd4' // localized cyan
        },
        {
            id: 'professional',
            title: "Working Professional",
            desc: "Experienced, looking for a role switch or growth.",
            icon: <Briefcase size={28} />,
            color: '#e91e63' // localized pink
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Cinematic Background */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'var(--accent-primary)', opacity: 0.04, filter: 'blur(120px)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', background: 'var(--accent-secondary)', opacity: 0.04, filter: 'blur(120px)', borderRadius: '50%' }} />

            <button
                onClick={() => navigate('/')}
                className="btn-secondary"
                style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <ArrowLeft size={18} /> Back
            </button>

            <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(255, 87, 34, 0.1)', color: 'var(--accent-primary)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}
                >
                    <Star size={14} fill="var(--accent-primary)" /> IDENTIFY YOURSELF
                </motion.div>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '1rem', fontWeight: 800 }}>Which one describes <span style={{ color: 'var(--accent-primary)' }}>you best?</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>We customize your learning path based on your current stage.</p>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px' }}>
                {options.map((opt, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -10, borderColor: opt.color }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleSelection(opt.id)}
                        className="glass-card"
                        style={{
                            flex: '1 1 300px',
                            maxWidth: '350px',
                            minWidth: '280px',
                            padding: '2.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            border: '1px solid var(--border-color)',
                            transition: 'border-color 0.3s'
                        }}
                    >
                        <div style={{
                            width: '60px', height: '60px',
                            background: `color-mix(in srgb, ${opt.color} 10%, transparent)`,
                            borderRadius: '16px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '1.5rem',
                            border: `1px solid color-mix(in srgb, ${opt.color} 30%, transparent)`,
                            color: opt.color
                        }}>
                            {opt.icon}
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: 700 }}>{opt.title}</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flex: 1, lineHeight: 1.6, fontSize: '0.95rem' }}>
                            {opt.desc}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: opt.color, fontSize: '0.9rem' }}>
                            Select <ChevronRight size={16} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
