import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Search, Briefcase, Target, Calendar, Zap, CheckCircle2, UserCheck, Upload, FileText, Building2, TrendingUp } from 'lucide-react';

const JOB_ROLES = [
    // Technology & Engineering
    "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "Mobile App Developer", "iOS Developer", "Android Developer", "React Native Developer",
    "DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Engineer", "Platform Engineer",
    "Data Engineer", "Machine Learning Engineer", "AI Engineer", "Data Scientist",
    "Blockchain Developer", "Web Developer", "Game Developer", "Embedded Systems Engineer",
    "QA Engineer", "Test Automation Engineer", "Security Engineer", "Network Engineer",
    "Database Administrator", "Systems Administrator", "IT Support Specialist",

    // Product & Design
    "Product Manager", "Associate Product Manager", "Technical Product Manager", "Product Owner",
    "UX Designer", "UI Designer", "Product Designer", "UX Researcher", "Interaction Designer",
    "Visual Designer", "Graphic Designer", "Motion Designer", "Brand Designer",
    "Design Lead", "Creative Director", "Art Director",

    // Data & Analytics
    "Data Analyst", "Business Analyst", "Business Intelligence Analyst", "Analytics Engineer",
    "Quantitative Analyst", "Research Scientist", "Decision Scientist", "Statistician",

    // Marketing & Growth
    "Digital Marketing Manager", "Marketing Manager", "Content Marketing Manager",
    "Growth Manager", "Performance Marketing Manager", "SEO Specialist", "SEM Specialist",
    "Social Media Manager", "Community Manager", "Brand Manager", "Product Marketing Manager",
    "Email Marketing Specialist", "Marketing Analyst", "Content Strategist", "Copywriter",

    // Sales & Business Development
    "Sales Executive", "Account Executive", "Business Development Manager",
    "Sales Development Representative", "Account Manager", "Key Account Manager",
    "Customer Success Manager", "Sales Manager", "Regional Sales Manager",

    // Operations & Strategy
    "Operations Manager", "Business Operations Manager", "Operations Analyst",
    "Supply Chain Manager", "Logistics Manager", "Project Manager", "Program Manager",
    "Strategy Consultant", "Management Consultant", "Business Consultant",

    // Finance & Accounting
    "Financial Analyst", "Investment Analyst", "Equity Research Analyst", "Accountant",
    "Tax Consultant", "Auditor", "Financial Planner", "Investment Banker",
    "Risk Analyst", "Compliance Officer", "Treasury Analyst", "Controller", "CFO",

    // Human Resources
    "HR Manager", "HR Business Partner", "Talent Acquisition Specialist", "Recruiter",
    "Technical Recruiter", "Learning & Development Manager", "Compensation Analyst",
    "Employee Relations Manager", "HR Generalist", "People Operations Manager",

    // Healthcare & Medical
    "Registered Nurse", "Physician", "Surgeon", "Pharmacist", "Physical Therapist",
    "Medical Assistant", "Healthcare Administrator", "Clinical Research Coordinator",
    "Medical Technologist", "Radiologist", "Dentist", "Veterinarian",

    // Education & Training
    "Teacher", "Professor", "Instructional Designer", "Corporate Trainer",
    "Education Consultant", "Academic Advisor", "Curriculum Developer",

    // Legal & Compliance
    "Lawyer", "Legal Counsel", "Paralegal", "Compliance Manager", "Contract Manager",
    "Legal Analyst", "Intellectual Property Attorney",

    // Customer Service & Support
    "Customer Service Representative", "Customer Support Specialist", "Technical Support Engineer",
    "Help Desk Analyst", "Client Relations Manager",

    // Media & Communications
    "Content Writer", "Journalist", "Public Relations Manager", "Communications Manager",
    "Social Media Coordinator", "Video Editor", "Photographer", "Producer",

    // Other Professional Roles
    "Management Trainee", "Intern", "Consultant", "Entrepreneur", "Freelancer"
];

const INTERVIEW_TYPES = [
    { id: 'phone', label: 'Phone Screen', icon: '📞' },
    { id: 'technical', label: 'Technical Round', icon: '💻' },
    { id: 'behavioral', label: 'Behavioral/HR', icon: '💬' },
    { id: 'final', label: 'Final Round', icon: '🎯' }
];

const INTERVIEW_TIMELINE = [
    "This Week",
    "Next Week",
    "2-4 Weeks",
    "Just Practicing"
];

const INTERVIEW_FOCUS = [
    { id: 'technical', label: 'Technical Skills', icon: '⚙️' },
    { id: 'behavioral', label: 'Behavioral', icon: '💬' },
    { id: 'both', label: 'Both', icon: '🎯' }
];

export default function InterviewPrepModal({ isOpen, onClose, onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        resume: null,
        resumeName: '',
        role: '',
        interviewType: '',
        timeline: '',
        focus: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const totalSteps = 4;

    const filteredRoles = JOB_ROLES.filter(role =>
        role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete(formData);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        switch (currentStep) {
            case 1: return formData.resume !== null;
            case 2: return formData.role !== '';
            case 3: return formData.interviewType !== '' && formData.timeline !== '';
            case 4: return formData.focus !== '';
            default: return false;
        }
    };

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
        setIsDropdownOpen(false);
        setSearchQuery('');
    };

    const handleResumeUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData({ ...formData, resume: file, resumeName: file.name });
        } else {
            alert('Please upload a PDF file');
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                            style={{
                                width: '56px',
                                height: '56px',
                                background: 'rgba(255, 87, 34, 0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#ff5722'
                            }}
                        >
                            <FileText size={28} />
                        </motion.div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                            Upload Your Resume
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            Help our AI understand your background
                        </p>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleResumeUpload}
                            style={{ display: 'none' }}
                            id="resume-upload"
                        />
                        <label
                            htmlFor="resume-upload"
                            style={{
                                padding: '2rem',
                                border: `2px dashed ${formData.resume ? '#ff5722' : '#e5e7eb'}`,
                                borderRadius: '12px',
                                background: formData.resume ? 'rgba(255, 87, 34, 0.05)' : '#fafafa',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            <Upload size={32} color={formData.resume ? '#ff5722' : '#94a3b8'} />
                            <div>
                                <p style={{ fontSize: '0.95rem', fontWeight: 600, color: formData.resume ? '#ff5722' : '#1f2937', marginBottom: '0.25rem' }}>
                                    {formData.resume ? formData.resumeName : 'Click to upload'}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                    PDF only, max 10MB
                                </p>
                            </div>
                            {formData.resume && (
                                <CheckCircle2 size={20} color="#ff5722" />
                            )}
                        </label>
                    </div>
                );

            case 2:
                return (
                    <div style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                            style={{
                                width: '56px',
                                height: '56px',
                                background: 'rgba(255, 87, 34, 0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#ff5722'
                            }}
                        >
                            <Briefcase size={28} />
                        </motion.div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                            Select Your Role
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            What position are you interviewing for?
                        </p>

                        <div style={{ position: 'relative' }}>
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                type="button"
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    borderRadius: '10px',
                                    border: `1.5px solid ${formData.role ? '#ff5722' : '#e5e7eb'}`,
                                    background: formData.role ? 'rgba(255, 87, 34, 0.05)' : '#fff',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: formData.role ? 600 : 400,
                                    color: formData.role ? '#ff5722' : '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'all 0.2s',
                                    textAlign: 'left'
                                }}
                            >
                                <span>{formData.role || 'Select a role...'}</span>
                                <ChevronRight size={18} style={{ transform: isDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                            </motion.button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 0.5rem)',
                                            left: 0,
                                            right: 0,
                                            background: '#ffffff',
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                                            zIndex: 1000,
                                            maxHeight: '280px',
                                            overflow: 'hidden',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <div style={{ padding: '0.75rem', borderBottom: '1px solid #f1f5f9' }}>
                                            <div style={{ position: 'relative' }}>
                                                <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    autoFocus
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.5rem 0.5rem 0.5rem 2rem',
                                                        border: '1px solid #e5e7eb',
                                                        borderRadius: '8px',
                                                        fontSize: '0.85rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ overflowY: 'auto', maxHeight: '220px', padding: '0.5rem' }}>
                                            {filteredRoles.map((role) => (
                                                <div
                                                    key={role}
                                                    onClick={() => handleRoleSelect(role)}
                                                    style={{
                                                        padding: '0.625rem 0.75rem',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.875rem',
                                                        fontWeight: formData.role === role ? 600 : 400,
                                                        color: formData.role === role ? '#ff5722' : '#1f2937',
                                                        background: formData.role === role ? 'rgba(255, 87, 34, 0.08)' : 'transparent',
                                                        transition: 'all 0.15s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = formData.role === role ? 'rgba(255, 87, 34, 0.08)' : '#f8fafc'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = formData.role === role ? 'rgba(255, 87, 34, 0.08)' : 'transparent'}
                                                >
                                                    <span>{role}</span>
                                                    {formData.role === role && <CheckCircle2 size={16} />}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                            style={{
                                width: '56px',
                                height: '56px',
                                background: 'rgba(255, 87, 34, 0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#ff5722'
                            }}
                        >
                            <Calendar size={28} />
                        </motion.div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                            Interview Details
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            What type and when is your interview?
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                    Interview Type
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
                                    {INTERVIEW_TYPES.map((type) => (
                                        <div
                                            key={type.id}
                                            onClick={() => setFormData({ ...formData, interviewType: type.id })}
                                            style={{
                                                padding: '0.875rem',
                                                borderRadius: '10px',
                                                border: `1.5px solid ${formData.interviewType === type.id ? '#ff5722' : '#e5e7eb'}`,
                                                background: formData.interviewType === type.id ? 'rgba(255, 87, 34, 0.05)' : '#fff',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                textAlign: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                gap: '0.375rem'
                                            }}
                                        >
                                            <span style={{ fontSize: '1.5rem' }}>{type.icon}</span>
                                            <span style={{
                                                fontSize: '0.85rem',
                                                fontWeight: formData.interviewType === type.id ? 600 : 500,
                                                color: formData.interviewType === type.id ? '#ff5722' : '#475569'
                                            }}>
                                                {type.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>
                                    When is your interview?
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.625rem' }}>
                                    {INTERVIEW_TIMELINE.map((time) => (
                                        <div
                                            key={time}
                                            onClick={() => setFormData({ ...formData, timeline: time })}
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '10px',
                                                border: `1.5px solid ${formData.timeline === time ? '#ff5722' : '#e5e7eb'}`,
                                                background: formData.timeline === time ? 'rgba(255, 87, 34, 0.05)' : '#fff',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                fontSize: '0.85rem',
                                                fontWeight: formData.timeline === time ? 600 : 400,
                                                color: formData.timeline === time ? '#ff5722' : '#475569',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div style={{ textAlign: 'center' }}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                            style={{
                                width: '56px',
                                height: '56px',
                                background: 'rgba(255, 87, 34, 0.1)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: '#ff5722'
                            }}
                        >
                            <Target size={28} />
                        </motion.div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1a1a1a' }}>
                            Interview Focus
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
                            What would you like to practice?
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                            {INTERVIEW_FOCUS.map((option) => (
                                <div
                                    key={option.id}
                                    onClick={() => setFormData({ ...formData, focus: option.id })}
                                    style={{
                                        padding: '1.25rem 0.75rem',
                                        borderRadius: '12px',
                                        border: `1.5px solid ${formData.focus === option.id ? '#ff5722' : '#e5e7eb'}`,
                                        background: formData.focus === option.id ? 'rgba(255, 87, 34, 0.05)' : '#fff',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textAlign: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <div style={{ fontSize: '1.75rem' }}>{option.icon}</div>
                                    <div style={{
                                        fontSize: '0.85rem',
                                        fontWeight: formData.focus === option.id ? 600 : 500,
                                        color: formData.focus === option.id ? '#ff5722' : '#475569'
                                    }}>
                                        {option.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '1.5rem'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '520px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '1.75rem 2rem 1.25rem',
                        borderBottom: '1px solid #f1f5f9',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: '#ff5722',
                                marginBottom: '0.5rem',
                                letterSpacing: '-0.01em'
                            }}>
                                Interview Preparation
                            </h2>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.375rem',
                                background: 'rgba(255, 87, 34, 0.1)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px'
                            }}>
                                <div style={{
                                    width: '5px',
                                    height: '5px',
                                    borderRadius: '50%',
                                    background: '#ff5722'
                                }} />
                                <span style={{ fontSize: '0.8rem', color: '#ff5722', fontWeight: 600 }}>
                                    Step {currentStep} of {totalSteps}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(0,0,0,0.05)',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: '10px',
                                color: '#64748b',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#fee2e2';
                                e.currentTarget.style.color = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.05)';
                                e.currentTarget.style.color = '#64748b';
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ padding: '0 2rem' }}>
                        <div style={{
                            width: '100%',
                            height: '4px',
                            background: '#f1f5f9',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #ff5722, #ff7043)',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '2rem'
                    }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderStepContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: '1.25rem 2rem',
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        gap: '0.75rem',
                        justifyContent: 'space-between'
                    }}>
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            style={{
                                padding: '0.75rem 1.25rem',
                                borderRadius: '10px',
                                border: '1px solid #e5e7eb',
                                background: '#fff',
                                color: '#475569',
                                fontWeight: 500,
                                cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
                                opacity: currentStep === 1 ? 0.4 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s'
                            }}
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            style={{
                                padding: '0.75rem 1.75rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: canProceed() ? 'linear-gradient(135deg, #ff5722, #ff7043)' : '#e5e7eb',
                                color: '#fff',
                                fontWeight: 600,
                                cursor: canProceed() ? 'pointer' : 'not-allowed',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                boxShadow: canProceed() ? '0 4px 12px rgba(255, 87, 34, 0.25)' : 'none'
                            }}
                        >
                            {currentStep === totalSteps ? 'Start Interview' : 'Continue'}
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
