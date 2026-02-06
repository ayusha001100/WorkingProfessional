import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Download, Sparkles, Plus, Trash2, Briefcase,
    Gauge, GraduationCap, Code2, Type, Layout, Wand2,
    ChevronDown, Eye, AlignLeft, Settings
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

const TEMPLATES = [
    { id: 'standard', name: 'Standard' },
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' }
];

const FONTS = [
    { id: 'outfit', name: 'Outfit', family: "'Outfit', sans-serif" },
    { id: 'inter', name: 'Inter', family: "'Inter', sans-serif" },
    { id: 'playfair', name: 'Playfair', family: "'Playfair Display', serif" }
];

export default function ResumeBuilder() {
    const [resumeData, setResumeData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        experience: [],
        education: [],
        skills: [],
        template: 'modern',
        font: 'outfit'
    });

    const { userData, updateUserData } = useAuth();
    const [activeSection, setActiveSection] = useState('personal');
    const [atsStatus, setAtsStatus] = useState(null);
    const [isOptimizing, setIsOptimizing] = useState(false);

    // Initial load from userData with strict no-hardcoding policy
    React.useEffect(() => {
        if (userData?.resumeData) {
            // Check if legacy hardcoded data exists and reset if found
            if (userData.resumeData.name === 'PRITY PRAJAPATI') {
                setResumeData(prev => ({
                    ...prev,
                    name: userData.name || userData.displayName || '',
                    email: userData.email || '',
                    phone: userData.onboarding?.phone || '',
                    location: userData.onboarding?.city ? `${userData.onboarding.city}, ${userData.onboarding.state}` : '',
                    summary: '', experience: [], education: [], skills: []
                }));
            } else {
                setResumeData(userData.resumeData);
            }
        } else if (userData) {
            // Populate ONLY from verified profile data
            setResumeData(prev => ({
                ...prev,
                name: userData.name || userData.displayName || '',
                email: userData.email || '',
                phone: userData.onboarding?.phone || '',
                location: userData.onboarding?.city ? `${userData.onboarding.city}, ${userData.onboarding.state}` : '',
                summary: '', // No AI generated summary by default
                experience: [], // Completely empty
                education: [], // Completely empty
                skills: [] // Completely empty
            }));
        }
    }, [userData]);

    // Save on Change with Debounce
    React.useEffect(() => {
        // Only save if we have meaningful data (at least a name)
        if (resumeData.name && userData?.uid) {
            const timeout = setTimeout(() => {
                updateUserData({ resumeData });
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [resumeData, userData?.uid, updateUserData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    const aiOptimizeSummary = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            const optimized = `Seasoned ${resumeData.name.split(' ')[0]} with a track record of driving innovation in intelligence-led systems. Expertise in Python, React, and Large Language Models, with a focus on solving high-stakes architectural challenges and delivering high-impact business outcomes.`;
            setResumeData(prev => ({ ...prev, summary: optimized }));
            setIsOptimizing(false);
        }, 1500);
    };

    const [aiFeedback, setAiFeedback] = useState(null);
    const [showAIModal, setShowAIModal] = useState(false);

    // Dynamic ATS Calculation
    const calculateATS = () => {
        let score = 0;
        const data = resumeData;

        // 1. Personal Info (20 pts)
        if (data.name && data.name.length > 5) score += 5;
        if (data.email.includes('@')) score += 5;
        if (data.phone.length > 8) score += 5;
        if (data.location) score += 5;

        // 2. Summary (20 pts)
        if (data.summary.length > 50) score += 10;
        if (data.summary.length > 150) score += 10;

        // 3. Experience (30 pts)
        if (data.experience.length > 0) score += 15;
        if (data.experience.length > 1) score += 15;
        data.experience.forEach(exp => {
            if (exp.desc.length > 50) score += 5;
        });

        // 4. Skills (30 pts)
        score += Math.min(data.skills.length * 3, 30);

        return Math.min(score, 100);
    };

    const runATSCheck = () => {
        setAtsStatus('scanning');
        setTimeout(() => {
            setAtsStatus(calculateATS());
        }, 1800);
    };

    const runAIImprovement = () => {
        setIsOptimizing(true);
        setTimeout(() => {
            const feedback = [];
            if (resumeData.summary.length < 100) feedback.push("• Summary is too short. Try adding 2-3 sentences about your unique value.");
            if (resumeData.skills.length < 5) feedback.push("• Add more specific technical skills to improve keyword matching.");
            if (resumeData.experience.some(exp => exp.desc.length < 30)) feedback.push("• Some job descriptions are quite thin. Use action verbs (Managed, Developed) to describe impact.");
            if (!resumeData.skills.includes("AI") && !resumeData.skills.includes("LLM")) feedback.push("• Mention specific AI frameworks to stand out for modern roles.");

            setAiFeedback(feedback.length > 0 ? feedback : ["✨ Your resume looks ready for top-tier applications! No major improvements needed."]);
            setShowAIModal(true);
            setIsOptimizing(false);
        }, 2000);
    };

    const addListItem = (type) => {
        const newItem = type === 'experience'
            ? { id: Date.now(), role: '', company: '', duration: '', desc: '' }
            : { id: Date.now(), degree: '', school: '', year: '' };
        setResumeData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
    };

    const updateListItem = (id, type, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [type]: prev[type].map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const removeListItem = (id, type) => {
        setResumeData(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.id !== id)
        }));
    };

    const addSkill = (skill) => {
        if (skill && !resumeData.skills.includes(skill)) {
            setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
        }
    };

    const removeSkill = (skill) => {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    };

    const [isExporting, setIsExporting] = useState(false);

    const handleExportPDF = () => {
        setIsExporting(true);
        setTimeout(() => {
            window.print();
            setIsExporting(false);
        }, 1000);
    };

    const scrollToTemplates = () => {
        const selector = document.getElementById('template-selector');
        selector?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const currentFont = FONTS.find(f => f.id === resumeData.font)?.family || "'Outfit', sans-serif";

    return (
        <DashboardLayout>
            <div style={{
                padding: '32px 48px',
                background: '#f8f9fb',
                minHeight: 'calc(100vh - 80px)',
                fontFamily: "'Outfit', sans-serif"
            }}>
                <div style={{ display: 'flex', gap: '40px', alignItems: 'start', maxWidth: '1400px', margin: '0 auto' }}>

                    {/* Center Editor Panel */}
                    <div style={{ flex: 1, maxWidth: '780px' }}>

                        {/* Header Section */}
                        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h1 style={{ fontSize: '44px', fontWeight: 900, color: '#1a1a1a', margin: 0, letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                                    AI Resume <span style={{ color: '#FF5722' }}>Builder</span>
                                </h1>
                                <p style={{ color: '#666', fontSize: '18px', marginTop: '12px', fontWeight: 500 }}>
                                    Design, refine, and optimize your path to professional success.
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>

                                <motion.button
                                    onClick={handleExportPDF}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        height: '48px', padding: '0 28px', borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #FF5722 0%, #ff8a50 100%)',
                                        border: 'none', color: '#fff', fontWeight: 800, fontSize: '16px',
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        boxShadow: '0 10px 20px -5px rgba(255, 87, 34, 0.3)'
                                    }}
                                >
                                    {isExporting ? (
                                        <>Preparing...</>
                                    ) : (
                                        <>
                                            <Download size={20} /> Export PDF
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </header>

                        {/* Template Selector Card */}
                        <div id="template-selector" className="glass-card" style={{
                            padding: '32px', borderRadius: '24px', background: '#fff',
                            border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', marginBottom: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.04)'
                        }}>
                            <div>
                                <label style={{ fontSize: '14px', fontWeight: 800, color: '#94a3b8', marginBottom: '12px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Selected Template</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    {TEMPLATES.map(t => (
                                        <button
                                            key={t.id}
                                            onClick={() => setResumeData(prev => ({ ...prev, template: t.id }))}
                                            style={{
                                                padding: '12px 24px', borderRadius: '12px',
                                                background: resumeData.template === t.id ? '#FF5722' : '#f8fafc',
                                                border: 'none',
                                                color: resumeData.template === t.id ? '#fff' : '#64748b',
                                                fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            {t.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ width: '220px' }}>
                                <label style={{ fontSize: '14px', fontWeight: 800, color: '#94a3b8', marginBottom: '12px', display: 'block', textTransform: 'uppercase', letterSpacing: '1px' }}>Typography</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={resumeData.font}
                                        onChange={(e) => setResumeData(prev => ({ ...prev, font: e.target.value }))}
                                        style={{
                                            width: '100%', height: '48px', padding: '0 16px', borderRadius: '12px',
                                            background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1a1a1a',
                                            fontWeight: 600, fontSize: '16px', appearance: 'none', outline: 'none'
                                        }}
                                    >
                                        {FONTS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                    </select>
                                    <ChevronDown size={18} style={{ position: 'absolute', right: '16px', top: '15px', color: '#64748b', pointerEvents: 'none' }} />
                                </div>
                            </div>
                        </div>

                        {/* Resume Sections Navigation */}
                        <div style={{
                            display: 'flex', gap: '10px', marginBottom: '32px',
                            padding: '6px', background: '#fff', borderRadius: '16px', width: 'fit-content',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0'
                        }}>
                            {['personal', 'experience', 'education', 'skills'].map(section => (
                                <button
                                    key={section}
                                    onClick={() => setActiveSection(section)}
                                    style={{
                                        padding: '12px 28px', borderRadius: '12px',
                                        background: activeSection === section ? '#FF5722' : 'transparent',
                                        color: activeSection === section ? '#fff' : '#64748b',
                                        border: 'none', fontWeight: 700, fontSize: '16px',
                                        cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s',
                                        boxShadow: activeSection === section ? '0 8px 16px rgba(255, 87, 34, 0.2)' : 'none'
                                    }}
                                >
                                    {section}
                                </button>
                            ))}
                        </div>

                        {/* Form Section */}
                        <AnimatePresence mode="wait">
                            {activeSection === 'personal' && (
                                <motion.div
                                    key="personal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                                    style={{
                                        padding: '40px', borderRadius: '32px', background: '#fff',
                                        border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
                                    }}
                                >
                                    <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: '#1a1a1a' }}>
                                        <div style={{ padding: '10px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px' }}>
                                            <FileText size={24} color="#FF5722" />
                                        </div>
                                        Personal Information
                                    </h2>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        <div className="input-field">
                                            <label style={{ fontSize: '15px', fontWeight: 700, color: '#64748b', marginBottom: '10px', display: 'block' }}>Full Name</label>
                                            <input
                                                type="text" name="name" value={resumeData.name} onChange={handleInputChange}
                                                style={{
                                                    width: '100%', height: '52px', padding: '0 20px', borderRadius: '12px',
                                                    background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1a1a1a',
                                                    fontSize: '16px', fontWeight: 500, boxShadow: '0 2px 4px rgba(0,0,0,0.01)', outline: 'none'
                                                }}
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                            <div className="input-field">
                                                <label style={{ fontSize: '15px', fontWeight: 700, color: '#64748b', marginBottom: '10px', display: 'block' }}>Email Address</label>
                                                <input
                                                    type="email" name="email" value={resumeData.email} onChange={handleInputChange}
                                                    style={{
                                                        width: '100%', height: '52px', padding: '0 20px', borderRadius: '12px',
                                                        background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1a1a1a',
                                                        fontSize: '16px', fontWeight: 500, boxShadow: '0 2px 4px rgba(0,0,0,0.01)', outline: 'none'
                                                    }}
                                                />
                                            </div>
                                            <div className="input-field">
                                                <label style={{ fontSize: '15px', fontWeight: 700, color: '#64748b', marginBottom: '10px', display: 'block' }}>Phone Number</label>
                                                <input
                                                    type="text" name="phone" value={resumeData.phone} onChange={handleInputChange}
                                                    style={{
                                                        width: '100%', height: '52px', padding: '0 20px', borderRadius: '12px',
                                                        background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1a1a1a',
                                                        fontSize: '16px', fontWeight: 500, boxShadow: '0 2px 4px rgba(0,0,0,0.01)', outline: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="input-field">
                                            <label style={{ fontSize: '15px', fontWeight: 700, color: '#64748b', marginBottom: '10px', display: 'block' }}>Location</label>
                                            <input
                                                type="text" name="location" value={resumeData.location} onChange={handleInputChange}
                                                style={{
                                                    width: '100%', height: '52px', padding: '0 20px', borderRadius: '12px',
                                                    background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1a1a1a',
                                                    fontSize: '16px', fontWeight: 500, boxShadow: '0 2px 4px rgba(0,0,0,0.01)', outline: 'none'
                                                }}
                                            />
                                        </div>

                                        <div className="input-field">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                                <label style={{ fontSize: '15px', fontWeight: 700, color: '#64748b', display: 'block' }}>Professional Summary</label>
                                                <motion.button
                                                    onClick={aiOptimizeSummary}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    style={{
                                                        color: '#FF5722', background: 'rgba(255, 87, 34, 0.05)', border: '1px solid rgba(255, 87, 34, 0.2)',
                                                        fontSize: '13px', fontWeight: 800, cursor: 'pointer', padding: '6px 14px',
                                                        borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px'
                                                    }}
                                                >
                                                    <Wand2 size={14} /> {isOptimizing ? 'Rewriting...' : 'AI Optimize'}
                                                </motion.button>
                                            </div>
                                            <textarea
                                                name="summary" rows="5" value={resumeData.summary} onChange={handleInputChange}
                                                style={{
                                                    width: '100%', padding: '20px', borderRadius: '12px', background: '#f8fafc',
                                                    border: '1px solid #e2e8f0', color: '#1a1a1a', fontSize: '16px',
                                                    fontWeight: 500, lineHeight: 1.6, resize: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.01)', outline: 'none'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'experience' && (
                                <motion.div key="experience" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                    <div style={{
                                        padding: '40px', borderRadius: '32px', background: '#fff',
                                        border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                            <h2 style={{ fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px', color: '#1a1a1a' }}>
                                                <div style={{ padding: '10px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px' }}>
                                                    <Briefcase size={24} color="#FF5722" />
                                                </div>
                                                Work Experience
                                            </h2>
                                            <button onClick={() => addListItem('experience')} style={{ padding: '10px 20px', borderRadius: '12px', background: '#f8fafc', color: '#FF5722', border: '1px solid #e2e8f0', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>
                                                + Add Role
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                            {resumeData.experience.map(exp => (
                                                <div key={exp.id} style={{ padding: '24px', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', position: 'relative' }}>
                                                    <button onClick={() => removeListItem(exp.id, 'experience')} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={20} /></button>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                                        <input type="text" placeholder="Job Title" value={exp.role} onChange={(e) => updateListItem(exp.id, 'experience', 'role', e.target.value)} style={{ padding: '14px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', fontSize: '16px' }} />
                                                        <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateListItem(exp.id, 'experience', 'company', e.target.value)} style={{ padding: '14px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', fontSize: '16px' }} />
                                                    </div>
                                                    <textarea placeholder="Job Description" rows="3" value={exp.desc} onChange={(e) => updateListItem(exp.id, 'experience', 'desc', e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', fontSize: '16px', resize: 'none' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'education' && (
                                <motion.div key="education" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                    <div style={{
                                        padding: '40px', borderRadius: '32px', background: '#fff',
                                        border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                            <h2 style={{ fontSize: '22px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '12px', color: '#1a1a1a' }}>
                                                <div style={{ padding: '10px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px' }}>
                                                    <GraduationCap size={24} color="#FF5722" />
                                                </div>
                                                Education
                                            </h2>
                                            <button onClick={() => addListItem('education')} style={{ padding: '10px 20px', borderRadius: '12px', background: '#f8fafc', color: '#FF5722', border: '1px solid #e2e8f0', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>
                                                + Add Degree
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                            {resumeData.education.map(edu => (
                                                <div key={edu.id} style={{ padding: '24px', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', position: 'relative' }}>
                                                    <button onClick={() => removeListItem(edu.id, 'education')} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={20} /></button>
                                                    <input type="text" placeholder="Degree / Certificate" value={edu.degree} onChange={(e) => updateListItem(edu.id, 'education', 'degree', e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', fontSize: '16px', marginBottom: '16px' }} />
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                                                        <input type="text" placeholder="Institution" value={edu.school} onChange={(e) => updateListItem(edu.id, 'education', 'school', e.target.value)} style={{ padding: '14px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', fontSize: '16px' }} />
                                                        <input type="text" placeholder="Year Range" value={edu.year} onChange={(e) => updateListItem(edu.id, 'education', 'year', e.target.value)} style={{ padding: '14px', borderRadius: '10px', background: '#fff', border: '1px solid #e2e8f0', fontSize: '16px' }} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeSection === 'skills' && (
                                <motion.div key="skills" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                    <div style={{
                                        padding: '40px', borderRadius: '32px', background: '#fff',
                                        border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
                                    }}>
                                        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: '#1a1a1a' }}>
                                            <div style={{ padding: '10px', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px' }}>
                                                <Code2 size={24} color="#FF5722" />
                                            </div>
                                            Key Expertise
                                        </h2>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                                            {resumeData.skills.map(skill => (
                                                <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '50px', background: 'rgba(255, 87, 34, 0.1)', color: '#FF5722', fontWeight: 700, fontSize: '16px' }}>
                                                    {skill} <Trash2 size={16} onClick={() => removeSkill(skill)} style={{ cursor: 'pointer', opacity: 0.7 }} />
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <input
                                                type="text"
                                                placeholder="Add a core skill..."
                                                onKeyDown={(e) => { if (e.key === 'Enter') { addSkill(e.target.value); e.target.value = ''; } }}
                                                style={{ flex: 1, height: '52px', padding: '0 20px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '16px' }}
                                            />
                                            <button onClick={(e) => { const input = e.target.previousSibling; addSkill(input.value); input.value = ''; }} style={{ padding: '0 32px', borderRadius: '12px', background: '#FF5722', color: '#fff', border: 'none', fontWeight: 800, fontSize: '16px', cursor: 'pointer' }}>Add</button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Analysis Buttons */}
                        <div style={{ display: 'flex', gap: '20px', marginTop: '32px' }}>
                            <motion.button
                                onClick={runATSCheck}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                style={{ flex: 1, height: '64px', borderRadius: '20px', background: '#fff', color: '#FF5722', border: '2px solid rgba(255, 87, 34, 0.2)', fontWeight: 800, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                            >
                                <Gauge size={24} /> {atsStatus === 'scanning' ? 'Analysing...' : atsStatus ? `ATS Score: ${atsStatus}%` : 'Check Score'}
                            </motion.button>
                            <motion.button
                                onClick={runAIImprovement}
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                style={{ flex: 1.2, height: '64px', borderRadius: '20px', background: '#FF5722', color: '#fff', border: 'none', fontWeight: 800, fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 25px -5px rgba(255, 87, 34, 0.4)' }}
                            >
                                <Sparkles size={24} /> {isOptimizing ? 'Thinking...' : 'Improve with AI'}
                            </motion.button>
                        </div>
                    </div>

                    {/* Right Resume Preview Panel */}
                    <div style={{ position: 'sticky', top: '100px', width: '520px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#94a3b8' }}>
                            <Eye size={18} />
                            <span style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Live Paper Preview</span>
                        </div>

                        <div id="resume-preview-root" className="resume-preview" style={{
                            background: '#fff',
                            color: '#111',
                            minHeight: '730px',
                            // Removed fixed width for print compatibility
                            width: '100%',
                            padding: resumeData.template === 'modern' ? '0' : '48px',
                            borderRadius: '24px',
                            boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
                            textAlign: 'left',
                            fontFamily: currentFont,
                            overflow: 'hidden',
                            border: '1px solid #e2e8f0'
                        }}>
                            {/* MODERN TEMPLATE SPECIFIC UI */}
                            {resumeData.template === 'modern' && (
                                <div style={{
                                    minHeight: '220px',
                                    background: '#1a1a1a',
                                    color: '#fff',
                                    padding: '48px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(255, 87, 34, 0.15) 0%, transparent 70%)'
                                }}>
                                    <h2 style={{ fontSize: '38px', fontWeight: 900, margin: 0, letterSpacing: '-1px', textTransform: 'uppercase' }}>{resumeData.name}</h2>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px', fontSize: '13px', fontWeight: 600, opacity: 0.8, letterSpacing: '0.5px' }}>
                                        <span>{resumeData.email}</span>
                                        <span style={{ color: '#FF5722' }}>•</span>
                                        <span>{resumeData.phone}</span>
                                        <span style={{ color: '#FF5722' }}>•</span>
                                        <span>{resumeData.location}</span>
                                    </div>
                                </div>
                            )}

                            <div style={{ padding: resumeData.template === 'modern' ? '48px' : '0' }}>
                                {/* STANDARD / PROFESSIONAL HEADER */}
                                {resumeData.template !== 'modern' && (
                                    <div style={{ textAlign: resumeData.template === 'standard' ? 'center' : 'left', marginBottom: '40px' }}>
                                        <h2 style={{ fontSize: '32px', fontWeight: 900, margin: 0, color: resumeData.template === 'professional' ? '#2563eb' : '#1a1a1a', letterSpacing: '-0.5px' }}>{resumeData.name}</h2>
                                        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>
                                            {resumeData.email} | {resumeData.phone} | {resumeData.location}
                                        </p>
                                        <div style={{ height: '3px', background: resumeData.template === 'professional' ? '#2563eb' : '#1a1a1a', marginTop: '20px', width: '60px', marginLeft: resumeData.template === 'standard' ? 'auto' : '0', marginRight: resumeData.template === 'standard' ? 'auto' : '0' }} />
                                    </div>
                                )}

                                {/* SUMMARY */}
                                <section style={{ marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: '#FF5722', letterSpacing: '2px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        Profile Summary
                                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                                    </h3>
                                    <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#334155', fontWeight: 500 }}>{resumeData.summary}</p>
                                </section>

                                {/* EXPERIENCE */}
                                <section style={{ marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: '#FF5722', letterSpacing: '2px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        Professional Experience
                                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                                        {resumeData.experience.map(exp => (
                                            <div key={exp.id}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                                                    <h4 style={{ fontSize: '16px', fontWeight: 800, margin: 0, color: '#1a1a1a' }}>{exp.role || 'Role Title'}</h4>
                                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>{exp.duration}</span>
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: 700, color: resumeData.template === 'professional' ? '#2563eb' : '#64748b', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{exp.company}</div>
                                                <p style={{ fontSize: '14px', color: '#475569', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{exp.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* EDUCATION */}
                                <section style={{ marginBottom: '40px' }}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: '#FF5722', letterSpacing: '2px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        Education
                                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {resumeData.education.map(edu => (
                                            <div key={edu.id}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                                    <h4 style={{ fontSize: '15px', fontWeight: 800, margin: 0, color: '#1a1a1a' }}>{edu.degree || 'Degree'}</h4>
                                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>{edu.year}</span>
                                                </div>
                                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>{edu.school}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* SKILLS */}
                                <section>
                                    <h3 style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', color: '#FF5722', letterSpacing: '2px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        Expertise
                                        <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {resumeData.skills.map(skill => (
                                            <span key={skill} style={{ padding: '6px 12px', background: '#f8fafc', borderRadius: '6px', fontSize: '13px', fontWeight: 700, color: '#334155', border: '1px solid #e2e8f0' }}>{skill}</span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                {/* AI Improvement Modal */}
                <AnimatePresence>
                    {showAIModal && (
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                style={{ background: '#fff', borderRadius: '32px', padding: '40px', maxWidth: '500px', width: '100%', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
                            >
                                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#1a1a1a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Sparkles color="#FF5722" /> AI Career Insights
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                                    {aiFeedback.map((tip, i) => (
                                        <div key={i} style={{ padding: '16px', borderRadius: '16px', background: tip.startsWith('✨') ? 'rgba(76, 175, 80, 0.08)' : '#f8fafc', color: tip.startsWith('✨') ? '#2e7d32' : '#334155', fontWeight: 600, fontSize: '15px', lineHeight: 1.5 }}>
                                            {tip}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setShowAIModal(false)}
                                    style={{ width: '100%', height: '56px', borderRadius: '16px', background: '#FF5722', color: '#fff', border: 'none', fontWeight: 800, fontSize: '16px', cursor: 'pointer', boxShadow: '0 8px 20px rgba(255, 87, 34, 0.3)' }}
                                >
                                    Got it, thanks!
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <style>{`
                    @media print {
                        @page {
                            size: A4;
                            margin: 0;
                        }
                        
                        html, body {
                            width: 21cm;
                            height: 29.7cm;
                            margin: 0;
                            padding: 0;
                            background-color: white !important;
                            overflow: hidden; /* Prevent scrollbars in print preview */
                        }

                        /* Hide everything by default using visibility to preserve layout flow until we fix it */
                        body * {
                            visibility: hidden;
                        }

                        /* 
                         * KEY FIX: Use position: fixed. 
                         * This breaks the element out of the valid document flow and relative parents (like the 520px sidebar).
                         * This ensures it is positioned relative to the page viewport (A4 paper).
                         */
                        #resume-preview-root {
                            visibility: visible !important;
                            position: fixed !important;
                            left: 0 !important;
                            top: 0 !important;
                            width: 21cm !important;
                            min-height: 29.7cm !important;
                            margin: 0 !important;
                            padding: 0 !important; /* Ensure no internal padding affects width */
                            border: none !important;
                            border-radius: 0 !important;
                            box-shadow: none !important;
                            background: white !important;
                            z-index: 2147483647 !important;
                            overflow: visible !important;
                            transform: none !important;
                        }

                        /* Make children visible */
                        #resume-preview-root * {
                            visibility: visible !important;
                        }

                        /* Ensure high-quality print rendering */
                        #resume-preview-root {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }

                        /* Hide specific UI elements explicitly just in case */
                        header, nav, aside, .analysis-btns, .input-field, button {
                            display: none !important;
                        }
                    }
                `}</style>
            </div>
        </DashboardLayout >
    );
}
