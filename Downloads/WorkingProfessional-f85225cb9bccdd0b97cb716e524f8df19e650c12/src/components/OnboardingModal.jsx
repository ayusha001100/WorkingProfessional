import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Check, Send, Sparkles, User, Target, MessageSquare, Briefcase, Zap, BrainCircuit, Rocket, Map, MapPin, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ONBOARDING_DATA = {
    experience: ["0 (Student / Fresher)", "0–1 year", "1–3 years", "3–5 years", "5–8 years", "8–12 years", "12+ years"],
    domains: [
        "Marketing", "Sales / Business Development", "HR / People Ops", "Operations / Supply Chain",
        "Finance / Accounting", "Customer Success / Support", "Product / Program Management",
        "Data / Analytics", "Engineering / Tech", "Design", "Consulting",
        "Entrepreneurship / Founder", "Other"
    ],
    subDomains: {
        "Marketing": ["Performance Marketing (Ads/Growth)", "Social Media / Community", "Content / Copywriting", "SEO", "Email / CRM / Lifecycle", "Brand / Communications / PR", "Product Marketing", "Marketing Analytics / Ops", "Other"],
        "Sales / Business Development": ["Inside Sales", "Field Sales", "B2B Enterprise Sales", "SMB / Mid-market Sales", "Partnerships / Alliances", "Sales Ops", "Pre-sales / Solutions", "Account Management", "Other"],
        "HR / People Ops": ["Talent Acquisition / Recruiting", "HRBP", "Learning & Development (L&D)", "Performance / Rewards", "Employee Experience / Engagement", "Payroll / Compliance", "People Ops / HR Ops", "Other"],
        "Operations / Supply Chain": ["Business Operations", "Supply Chain / Logistics", "Procurement", "Process Improvement", "Project / Program Ops", "Quality / Compliance", "Ops Analytics", "Other"],
        "Finance / Accounting": ["Accounting", "FP&A", "Audit / Compliance", "Tax", "Treasury", "Financial Operations", "Business Finance / Partnering", "Other"],
        "Customer Success / Support": ["Customer Success Manager", "Technical Support", "Customer Support", "Onboarding / Implementation", "Renewals / Retention", "Support Ops", "Other"],
        "Product / Program Management": ["Product Management", "Program Management", "Project Management", "Product Ops", "Business Analyst", "Scrum Master", "Other"],
        "Data / Analytics": ["Data Analyst", "Business Analyst", "BI / Reporting", "Analytics Engineer", "Data Scientist", "Data Product / Insights", "Other"],
        "Engineering / Tech": ["Software Engineer", "QA / Testing", "DevOps / Cloud", "Cybersecurity", "Data Engineering", "AI/ML Engineer", "Tech Lead / Engineering Manager", "Other"],
        "Design": ["UI/UX Design", "Product Design", "Graphic / Visual Design", "UX Research", "Design Ops", "Other"],
        "Consulting": ["Strategy", "Operations Consulting", "HR Consulting", "Finance Consulting", "Tech Consulting", "Other"],
        "Entrepreneurship / Founder": ["Founder / Co-founder", "Business / Growth", "Product", "Ops", "Sales", "Other"],
        "Other": ["Other"]
    },
    industries: [
        "IT Services", "SaaS / Software Product", "E-commerce / D2C", "BFSI (Banking / FinTech / Insurance)",
        "Consulting / Professional Services", "Healthcare / Pharma", "Education / EdTech", "Manufacturing",
        "Retail", "Media / Entertainment", "Logistics / Mobility", "Government / Public Sector", "Other"
    ],
    companySizes: ["Solo / Freelancer", "1–10", "11–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"],
    goals: [
        "Promotion in my current company",
        "Job switch to a better role/company",
        "Move into a leadership role",
        "Improve job security & performance",
        "Explore AI and find the right direction"
    ],
    aiLevels: [
        "New to AI (starting from scratch)",
        "I use ChatGPT occasionally",
        "I use AI weekly for work tasks",
        "I use AI daily with clear workflows",
        "I build automations/prompts/workflows for others"
    ],
    ctc: ["₹0–3 LPA", "₹3–6 LPA", "₹6–10 LPA", "₹10–15 LPA", "₹15–25 LPA", "₹25–40 LPA", "₹40+ LPA", "Prefer not to say"],
    timeline: ["2–4 weeks", "1–2 months", "3 months", "6 months", "6–12 months"]
};

const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
];

const CITIES_BY_STATE = {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Navi Mumbai", "Kolhapur", "Nanded", "Sangli", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Jalna"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davangere", "Bellary", "Bijapur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Tiruppur", "Thoothukudi"],
    "Delhi": ["New Delhi", "North Delhi", "North West Delhi", "West Delhi", "South West Delhi", "South Delhi", "South East Delhi", "Central Delhi", "North East Delhi", "Shahdara", "East Delhi"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Noida", "Gorakhpur", "Bareilly", "Aligarh", "Moradabad", "Saharanpur"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Navsari"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar"],
    // Fallback for other states - we can add more as needed. For now, empty list logic handles it.
};

export default function OnboardingModal({ isOpen, onClose, onComplete }) {
    const { user, userData, setUserData } = useAuth();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        yearsExperience: '',
        domain: '',
        subDomain: '',
        industry: '',
        companySize: '',
        goal: '',
        aiLevel: '',
        ctc: '',
        targetTimeline: '',
        targetRole: '',
    });

    const [loading, setLoading] = useState(false);
    const [searchCompany, setSearchCompany] = useState('');
    const [showAIInsights, setShowAIInsights] = useState(false);
    const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
    const [showDreamRoleDropdown, setShowDreamRoleDropdown] = useState(false);
    const [showDreamCompanyDropdown, setShowDreamCompanyDropdown] = useState(false);
    const [showDomainDropdown, setShowDomainDropdown] = useState(false);
    const [showStateDropdown, setShowStateDropdown] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    useEffect(() => {
        if (user && userData) {
            setFormData(prev => ({
                ...prev,
                name: userData.name || user.displayName || '',
            }));
        }

        // Pre-fill profession from localStorage based on GsapHero selection
        const savedUserType = localStorage.getItem('userType');
        if (savedUserType) {
            let profession = '';
            if (savedUserType === 'student') profession = 'Student';
            else if (savedUserType === 'fresher') profession = 'Fresher (0 exp)';
            else if (savedUserType === 'professional') profession = 'Working Professional';

            setFormData(prev => ({ ...prev, profession }));
        }
    }, [user, userData]);

    const steps = [
        {
            id: 1,
            title: "Years of work experience",
            icon: <Briefcase size={22} />,
            subtitle: "Select your career stage.",
            field: 'yearsExperience',
            options: ONBOARDING_DATA.experience
        },
        {
            id: 2,
            title: "Your primary domain",
            icon: <Target size={22} />,
            subtitle: "Which area do you specialize in?",
            field: 'domain',
            options: ONBOARDING_DATA.domains
        },
        {
            id: 3,
            title: "What best describes what you do day-to-day?",
            icon: <MessageSquare size={22} />,
            subtitle: `Specific roles within ${formData.domain}`,
            field: 'subDomain',
            options: ONBOARDING_DATA.subDomains[formData.domain] || ["Other"]
        },
        {
            id: 4,
            title: "Your industry",
            icon: <Rocket size={22} />,
            subtitle: "Which sector does your company belong to?",
            field: 'industry',
            options: ONBOARDING_DATA.industries
        },
        {
            id: 5,
            title: "Company size",
            icon: <Users size={22} />,
            subtitle: "How many people work at your company?",
            field: 'companySize',
            options: ONBOARDING_DATA.companySizes
        },
        {
            id: 6,
            title: "Your primary goal right now",
            icon: <Zap size={22} />,
            subtitle: "What are you looking to achieve?",
            field: 'goal',
            options: ONBOARDING_DATA.goals
        },
        {
            id: 7,
            title: "Your AI starting level",
            icon: <BrainCircuit size={22} />,
            subtitle: "How comfortable are you with AI tools?",
            field: 'aiLevel',
            options: ONBOARDING_DATA.aiLevels
        },
        {
            id: 8,
            title: "Current CTC (optional)",
            icon: <Sparkles size={22} />,
            subtitle: "This helps us tailor salary jump strategy.",
            field: 'ctc',
            options: ONBOARDING_DATA.ctc
        },
        {
            id: 9,
            title: "Target timeline for your next outcome",
            icon: <MapPin size={22} />,
            subtitle: "When do you want to see results?",
            field: 'targetTimeline',
            options: ONBOARDING_DATA.timeline
        },
        {
            id: 10,
            title: "What role are you targeting next?",
            icon: <Map size={22} />,
            subtitle: "The next milestone in your career.",
            field: 'targetRole',
            // Simplified logic: Show same roles as subDomain + "Other"
            options: [...(ONBOARDING_DATA.subDomains[formData.domain] || []), "Other"],
            shouldShow: formData.goal !== "Explore AI and find the right direction"
        }
    ];

    // Filter steps based on conditional logic
    const visibleSteps = steps.filter(s => s.shouldShow !== false);
    const currentStepIndex = visibleSteps.findIndex(s => s.id === step);
    const currentStepData = visibleSteps[currentStepIndex] || visibleSteps[0];

    const handleNext = () => {
        const nextStepIndex = currentStepIndex + 1;
        if (nextStepIndex < visibleSteps.length) {
            setStep(visibleSteps[nextStepIndex].id);
        } else {
            generateAIInsights();
        }
    };

    const generateAIInsights = () => {
        setShowAIInsights(true);
    };

    const handleComplete = async () => {
        setLoading(true);

        const realityCheckSummary = `Your transition from ${formData.subDomain} in ${formData.industry} to ${formData.targetRole || 'your goal'} will be powered by AI. At your ${formData.aiLevel} level, we'll focus on high-impact workflows to achieve your goal of ${formData.goal} within ${formData.targetTimeline}.`;

        const finalOnboarding = {
            ...formData,
            realityCheckSummary,
            completedAt: new Date().toISOString()
        };

        if (user) {
            setUserData(prev => {
                const newData = {
                    ...prev,
                    onboarding: finalOnboarding,
                    onboardingCompleted: true,
                    role: 'professional'
                };
                localStorage.setItem('mock_user_data', JSON.stringify(newData));
                return newData;
            });
        }

        setLoading(false);
        onComplete();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 2000,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)',
                        padding: '1.5rem', perspective: '1000px'
                    }}
                >
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(200,200,200,0.2) 100%)', pointerEvents: 'none' }}
                    />

                    <motion.div
                        layout // Gracefully handles height changes
                        initial={{ opacity: 0, y: 40, scale: 0.95, rotateX: 5 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, rotateX: -2 }}
                        transition={{
                            layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                            opacity: { duration: 0.4 },
                            y: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                            scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                        }}
                        className="glass-card"
                        style={{
                            width: '100%', maxWidth: '520px',
                            padding: '3rem 2.8rem',
                            position: 'relative',
                            borderRadius: '40px',
                            background: '#ffffff',
                            border: '1px solid rgba(0,0,0,0.08)',
                            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.08)',
                            transformStyle: 'preserve-3d',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Background Decorative Gradient - Lighter for white theme */}
                        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '200px', height: '200px', background: 'var(--accent-primary)', opacity: 0.03, filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={showAIInsights ? 'insights' : step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                style={{ position: 'relative', zIndex: 2 }}
                            >
                                {!showAIInsights ? (
                                    <>
                                        {/* Header Section */}
                                        <div style={{ marginBottom: '2.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent-primary)', marginBottom: '1.2rem' }}>
                                                <div style={{ padding: '0.6rem', background: 'rgba(255, 87, 34, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {React.cloneElement(currentStepData.icon, { color: 'var(--accent-primary)' })}
                                                </div>
                                                <span style={{ fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.9 }}>Step {currentStepIndex + 1} of {visibleSteps.length}</span>
                                            </div>
                                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.6rem', letterSpacing: '-0.03em', color: '#1a1a1a' }}>
                                                {currentStepData.title}
                                            </h2>
                                            <p style={{ color: '#666', fontSize: '1.05rem', fontWeight: 500, opacity: 0.9 }}>
                                                {currentStepData.subtitle}
                                            </p>
                                        </div>

                                        {/* Progress bar */}
                                        <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginBottom: '2.5rem', overflow: 'hidden' }}>
                                            <motion.div
                                                animate={{ width: `${((currentStepIndex + 1) / visibleSteps.length) * 100}%` }}
                                                style={{ height: '100%', background: 'var(--accent-gradient)', borderRadius: '2px' }}
                                            />
                                        </div>

                                        {/* Form Fields */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                                            {currentStepData.fields?.map(field => (
                                                <div key={field.name} style={{
                                                    textAlign: 'left', position: 'relative',
                                                    zIndex: (field.name === 'designation' && showDesignationDropdown) ||
                                                        (field.name === 'dreamRole' && showDreamRoleDropdown) ||
                                                        (field.name === 'dreamCompany' && showDreamCompanyDropdown) ||
                                                        (field.name === 'domain' && showDomainDropdown) ||
                                                        (field.name === 'domain' && showDomainDropdown) ||
                                                        (field.name === 'state' && showStateDropdown) ||
                                                        (field.name === 'city' && showCityDropdown) ? 50 : 1
                                                }}>
                                                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 700, color: '#333', opacity: 0.9 }}>{field.label}</label>
                                                    <div style={{ position: 'relative' }}>
                                                        {field.name === 'state' ? (
                                                            <div style={{ position: 'relative' }}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <Map size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)', opacity: 0.8 }} />
                                                                    <input
                                                                        type="text"
                                                                        value={formData.state}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, state: e.target.value });
                                                                            setShowStateDropdown(true);
                                                                        }}
                                                                        onFocus={() => setShowStateDropdown(true)}
                                                                        placeholder="Search or Select State..."
                                                                        style={{
                                                                            width: '100%', background: '#f8f9fa',
                                                                            border: '1px solid #e1e4e8', borderRadius: '18px',
                                                                            padding: '1.2rem 1.2rem 1.2rem 3rem', color: '#1a1a1a',
                                                                            outline: 'none', fontSize: '1rem',
                                                                            transition: 'all 0.3s ease'
                                                                        }}
                                                                    />
                                                                    {showStateDropdown && (
                                                                        <div className="custom-scrollbar" style={{
                                                                            position: 'absolute', top: '110%', left: 0, width: '100%',
                                                                            maxHeight: '220px', overflowY: 'auto',
                                                                            background: '#fff', border: '1px solid #e1e4e8',
                                                                            borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                                            zIndex: 50, padding: '0.5rem'
                                                                        }}>
                                                                            {INDIAN_STATES.filter(d => d.toLowerCase().includes((formData.state || '').toLowerCase())).map((state, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, state: state });
                                                                                        setShowStateDropdown(false);
                                                                                    }}
                                                                                    style={{
                                                                                        padding: '0.8rem 1rem', borderRadius: '12px',
                                                                                        cursor: 'pointer', fontSize: '0.95rem',
                                                                                        color: '#333', transition: '0.2s',
                                                                                        background: 'transparent'
                                                                                    }}
                                                                                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                                >
                                                                                    {state}
                                                                                </div>
                                                                            ))}
                                                                            {INDIAN_STATES.filter(d => d.toLowerCase().includes((formData.state || '').toLowerCase())).length === 0 && (
                                                                                <div style={{ padding: '1rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                                                                                    No state found.
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {showStateDropdown && (
                                                                    <div
                                                                        style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                                                                        onClick={() => setShowStateDropdown(false)}
                                                                    />
                                                                )}
                                                            </div>
                                                        ) : field.name === 'city' ? (
                                                            <div style={{ position: 'relative', opacity: formData.state ? 1 : 0.6, pointerEvents: formData.state ? 'all' : 'none' }}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <MapPin size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)', opacity: 0.8 }} />
                                                                    <input
                                                                        type="text"
                                                                        value={formData.city}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, city: e.target.value });
                                                                            setShowCityDropdown(true);
                                                                        }}
                                                                        onFocus={() => setShowCityDropdown(true)}
                                                                        placeholder={formData.state ? "Search or Select City..." : "Select State first"}
                                                                        disabled={!formData.state}
                                                                        style={{
                                                                            width: '100%', background: '#f8f9fa',
                                                                            border: '1px solid #e1e4e8', borderRadius: '18px',
                                                                            padding: '1.2rem 1.2rem 1.2rem 3rem', color: '#1a1a1a',
                                                                            outline: 'none', fontSize: '1rem',
                                                                            transition: 'all 0.3s ease'
                                                                        }}
                                                                    />
                                                                    {showCityDropdown && formData.state && (
                                                                        <div className="custom-scrollbar" style={{
                                                                            position: 'absolute', top: '110%', left: 0, width: '100%',
                                                                            maxHeight: '220px', overflowY: 'auto',
                                                                            background: '#fff', border: '1px solid #e1e4e8',
                                                                            borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                                            zIndex: 50, padding: '0.5rem'
                                                                        }}>
                                                                            {(CITIES_BY_STATE[formData.state] || []).filter(c => c.toLowerCase().includes((formData.city || '').toLowerCase())).map((city, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, city: city });
                                                                                        setShowCityDropdown(false);
                                                                                    }}
                                                                                    style={{
                                                                                        padding: '0.8rem 1rem', borderRadius: '12px',
                                                                                        cursor: 'pointer', fontSize: '0.95rem',
                                                                                        color: '#333', transition: '0.2s',
                                                                                        background: 'transparent'
                                                                                    }}
                                                                                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                                >
                                                                                    {city}
                                                                                </div>
                                                                            ))}
                                                                            {(CITIES_BY_STATE[formData.state] || []).length === 0 && (
                                                                                <div style={{ padding: '1rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                                                                                    No cities found for {formData.state}. <br /> <span style={{ fontSize: '0.8rem' }}>Type to enter custom city.</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {showCityDropdown && (
                                                                    <div
                                                                        style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                                                                        onClick={() => setShowCityDropdown(false)}
                                                                    />
                                                                )}
                                                            </div>
                                                        ) : field.name === 'designation' ? (
                                                            <div style={{ position: 'relative' }}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <Briefcase size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)', opacity: 0.8 }} />
                                                                    <input
                                                                        type="text"
                                                                        value={formData.designation}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, designation: e.target.value });
                                                                            setShowDesignationDropdown(true);
                                                                        }}
                                                                        onFocus={() => setShowDesignationDropdown(true)}
                                                                        placeholder="Search or type designation..."
                                                                        style={{
                                                                            width: '100%', background: '#f8f9fa',
                                                                            border: '1px solid #e1e4e8', borderRadius: '18px',
                                                                            padding: '1.2rem 1.2rem 1.2rem 3rem', color: '#1a1a1a',
                                                                            outline: 'none', fontSize: '1rem',
                                                                            transition: 'all 0.3s ease'
                                                                        }}
                                                                    />
                                                                    {showDesignationDropdown && (
                                                                        <div className="custom-scrollbar" style={{
                                                                            position: 'absolute', top: '110%', left: 0, width: '100%',
                                                                            maxHeight: '220px', overflowY: 'auto',
                                                                            background: '#fff', border: '1px solid #e1e4e8',
                                                                            borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                                            zIndex: 50, padding: '0.5rem'
                                                                        }}>
                                                                            {TOP_DESIGNATIONS.filter(d => d.toLowerCase().includes((formData.designation || '').toLowerCase())).map((role, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, designation: role });
                                                                                        setShowDesignationDropdown(false);
                                                                                    }}
                                                                                    style={{
                                                                                        padding: '0.8rem 1rem', borderRadius: '12px',
                                                                                        cursor: 'pointer', fontSize: '0.95rem',
                                                                                        color: '#333', transition: '0.2s',
                                                                                        background: 'transparent'
                                                                                    }}
                                                                                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                                >
                                                                                    {role}
                                                                                </div>
                                                                            ))}
                                                                            {TOP_DESIGNATIONS.filter(d => d.toLowerCase().includes((formData.designation || '').toLowerCase())).length === 0 && (
                                                                                <div style={{ padding: '1rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                                                                                    Type to add custom role...
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {showDesignationDropdown && (
                                                                    <div
                                                                        style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                                                                        onClick={() => setShowDesignationDropdown(false)}
                                                                    />
                                                                )}
                                                            </div>
                                                        ) : field.name === 'domain' ? (
                                                            <div style={{ position: 'relative' }}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <Target size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)', opacity: 0.8 }} />
                                                                    <input
                                                                        type="text"
                                                                        value={formData.domain}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, domain: e.target.value });
                                                                            setShowDomainDropdown(true);
                                                                        }}
                                                                        onFocus={() => setShowDomainDropdown(true)}
                                                                        placeholder="Search or type domain..."
                                                                        style={{
                                                                            width: '100%', background: '#f8f9fa',
                                                                            border: '1px solid #e1e4e8', borderRadius: '18px',
                                                                            padding: '1.2rem 1.2rem 1.2rem 3rem', color: '#1a1a1a',
                                                                            outline: 'none', fontSize: '1rem',
                                                                            transition: 'all 0.3s ease'
                                                                        }}
                                                                    />
                                                                    {showDomainDropdown && (
                                                                        <div className="custom-scrollbar" style={{
                                                                            position: 'absolute', top: '110%', left: 0, width: '100%',
                                                                            maxHeight: '220px', overflowY: 'auto',
                                                                            background: '#fff', border: '1px solid #e1e4e8',
                                                                            borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                                            zIndex: 50, padding: '0.5rem'
                                                                        }}>
                                                                            {TOP_DOMAINS.filter(d => d.toLowerCase().includes((formData.domain || '').toLowerCase())).map((domain, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, domain: domain });
                                                                                        setShowDomainDropdown(false);
                                                                                    }}
                                                                                    style={{
                                                                                        padding: '0.8rem 1rem', borderRadius: '12px',
                                                                                        cursor: 'pointer', fontSize: '0.95rem',
                                                                                        color: '#333', transition: '0.2s',
                                                                                        background: 'transparent'
                                                                                    }}
                                                                                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                                >
                                                                                    {domain}
                                                                                </div>
                                                                            ))}
                                                                            {TOP_DOMAINS.filter(d => d.toLowerCase().includes((formData.domain || '').toLowerCase())).length === 0 && (
                                                                                <div style={{ padding: '1rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                                                                                    Type to add custom domain...
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {showDomainDropdown && (
                                                                    <div
                                                                        style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                                                                        onClick={() => setShowDomainDropdown(false)}
                                                                    />
                                                                )}
                                                            </div>
                                                        ) : field.name === 'dreamRole' ? (
                                                            <div style={{ position: 'relative' }}>
                                                                <div style={{ position: 'relative' }}>
                                                                    <Briefcase size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-primary)', opacity: 0.8 }} />
                                                                    <input
                                                                        type="text"
                                                                        value={formData.dreamRole}
                                                                        onChange={(e) => {
                                                                            setFormData({ ...formData, dreamRole: e.target.value });
                                                                            setShowDreamRoleDropdown(true);
                                                                        }}
                                                                        onFocus={() => setShowDreamRoleDropdown(true)}
                                                                        placeholder="Search or type desired role..."
                                                                        style={{
                                                                            width: '100%', background: '#f8f9fa',
                                                                            border: '1px solid #e1e4e8', borderRadius: '18px',
                                                                            padding: '1.2rem 1.2rem 1.2rem 3rem', color: '#1a1a1a',
                                                                            outline: 'none', fontSize: '1rem',
                                                                            transition: 'all 0.3s ease'
                                                                        }}
                                                                    />
                                                                    {showDreamRoleDropdown && (
                                                                        <div className="custom-scrollbar" style={{
                                                                            position: 'absolute', top: '110%', left: 0, width: '100%',
                                                                            maxHeight: '220px', overflowY: 'auto',
                                                                            background: '#fff', border: '1px solid #e1e4e8',
                                                                            borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                                            zIndex: 50, padding: '0.5rem'
                                                                        }}>
                                                                            {TOP_DESIGNATIONS.filter(d => d.toLowerCase().includes((formData.dreamRole || '').toLowerCase())).map((role, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    onClick={() => {
                                                                                        setFormData({ ...formData, dreamRole: role });
                                                                                        setShowDreamRoleDropdown(false);
                                                                                    }}
                                                                                    style={{
                                                                                        padding: '0.8rem 1rem', borderRadius: '12px',
                                                                                        cursor: 'pointer', fontSize: '0.95rem',
                                                                                        color: '#333', transition: '0.2s',
                                                                                        background: 'transparent'
                                                                                    }}
                                                                                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                                >
                                                                                    {role}
                                                                                </div>
                                                                            ))}
                                                                            {TOP_DESIGNATIONS.filter(d => d.toLowerCase().includes((formData.dreamRole || '').toLowerCase())).length === 0 && (
                                                                                <div style={{ padding: '1rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                                                                                    Type to add custom role...
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {showDreamRoleDropdown && (
                                                                    <div
                                                                        style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                                                                        onClick={() => setShowDreamRoleDropdown(false)}
                                                                    />
                                                                )}
                                                            </div>
                                                        ) : field.name === 'dreamCompany' ? (
                                                            <div style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'relative',
                                                                    display: 'flex',
                                                                    flexWrap: 'wrap',
                                                                    alignItems: 'center',
                                                                    gap: '0.5rem',
                                                                    background: '#f8f9fa',
                                                                    border: '1px solid #e1e4e8',
                                                                    borderRadius: '18px',
                                                                    padding: '0.8rem 1.2rem',
                                                                    minHeight: '60px',
                                                                    transition: 'all 0.3s ease'
                                                                }}>
                                                                    <Zap size={18} style={{ color: 'var(--accent-primary)', opacity: 0.8, marginRight: '0.5rem' }} />

                                                                    {Array.isArray(formData.dreamCompany) && formData.dreamCompany.map((company, idx) => (
                                                                        <div key={idx} style={{
                                                                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                                                                            background: 'rgba(255, 87, 34, 0.1)', color: 'var(--accent-primary)',
                                                                            padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600
                                                                        }}>
                                                                            {company}
                                                                            <X size={14} style={{ cursor: 'pointer' }} onClick={() => {
                                                                                setFormData(prev => ({ ...prev, dreamCompany: prev.dreamCompany.filter(c => c !== company) }));
                                                                            }} />
                                                                        </div>
                                                                    ))}

                                                                    {(!Array.isArray(formData.dreamCompany) || formData.dreamCompany.length < 3) && (
                                                                        <input
                                                                            type="text"
                                                                            value={searchCompany}
                                                                            onChange={(e) => {
                                                                                setSearchCompany(e.target.value);
                                                                                setShowDreamCompanyDropdown(true);
                                                                            }}
                                                                            onFocus={() => setShowDreamCompanyDropdown(true)}
                                                                            placeholder={Array.isArray(formData.dreamCompany) && formData.dreamCompany.length > 0 ? "Add another..." : "Search top companies..."}
                                                                            style={{
                                                                                background: 'transparent', border: 'none', outline: 'none',
                                                                                fontSize: '1rem', color: '#1a1a1a', flex: 1, minWidth: '120px'
                                                                            }}
                                                                        />
                                                                    )}

                                                                    {showDreamCompanyDropdown && (
                                                                        <div className="custom-scrollbar" style={{
                                                                            position: 'absolute', top: '110%', left: 0, width: '100%',
                                                                            maxHeight: '220px', overflowY: 'auto',
                                                                            background: '#fff', border: '1px solid #e1e4e8',
                                                                            borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                                                            zIndex: 50, padding: '0.5rem'
                                                                        }}>
                                                                            {TOP_COMPANIES.filter(d => d.toLowerCase().includes(searchCompany.toLowerCase()) && (!Array.isArray(formData.dreamCompany) || !formData.dreamCompany.includes(d))).map((company, idx) => (
                                                                                <div
                                                                                    key={idx}
                                                                                    onClick={() => {
                                                                                        const currentCompanies = Array.isArray(formData.dreamCompany) ? formData.dreamCompany : [];
                                                                                        if (currentCompanies.length < 3) {
                                                                                            setFormData({ ...formData, dreamCompany: [...currentCompanies, company] });
                                                                                            setSearchCompany('');
                                                                                            // Keep dropdown open if less than 3 selected
                                                                                            if (currentCompanies.length + 1 < 3) {
                                                                                                // Keep open (re-focus input if needed logic here, mostly auto handled by state)
                                                                                            } else {
                                                                                                setShowDreamCompanyDropdown(false);
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                    style={{
                                                                                        padding: '0.8rem 1rem', borderRadius: '12px',
                                                                                        cursor: 'pointer', fontSize: '0.95rem',
                                                                                        color: '#333', transition: '0.2s',
                                                                                        background: 'transparent'
                                                                                    }}
                                                                                    onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                                                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                                                >
                                                                                    {company}
                                                                                </div>
                                                                            ))}
                                                                            {TOP_COMPANIES.filter(d => d.toLowerCase().includes(searchCompany.toLowerCase())).length === 0 && (
                                                                                <div style={{ padding: '1rem', textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                                                                                    No companies found.
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {showDreamCompanyDropdown && (
                                                                    <div
                                                                        style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                                                                        onClick={() => setShowDreamCompanyDropdown(false)}
                                                                    />
                                                                )}
                                                            </div>
                                                        ) : field.type === 'textarea' ? (
                                                            <textarea
                                                                value={formData[field.name]}
                                                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                                                placeholder={field.placeholder}
                                                                style={{
                                                                    width: '100%', background: '#f8f9fa',
                                                                    border: '1px solid #e1e4e8', borderRadius: '18px',
                                                                    padding: '1.2rem', color: '#1a1a1a',
                                                                    minHeight: '140px', outline: 'none', fontSize: '1rem',
                                                                    transition: 'all 0.3s ease',
                                                                    resize: 'none',
                                                                    fontFamily: 'inherit'
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.target.style.borderColor = 'var(--accent-primary)';
                                                                    e.target.style.background = '#fff';
                                                                    e.target.style.boxShadow = '0 0 0 4px rgba(255, 87, 34, 0.1)';
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.target.style.borderColor = '#e1e4e8';
                                                                    e.target.style.background = '#f8f9fa';
                                                                    e.target.style.boxShadow = 'none';
                                                                }}
                                                            />
                                                        ) : field.type === 'select' ? (
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                                                {field.options.map(opt => (
                                                                    <motion.button
                                                                        key={opt}
                                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        onClick={() => setFormData({ ...formData, [field.name]: opt })}
                                                                        style={{
                                                                            padding: '0.9rem 1.4rem', borderRadius: '16px',
                                                                            background: formData[field.name] === opt ? 'rgba(255, 87, 34, 0.1)' : '#f8f9fa',
                                                                            border: formData[field.name] === opt ? '2px solid var(--accent-primary)' : '1px solid #e1e4e8',
                                                                            color: formData[field.name] === opt ? 'var(--accent-primary)' : '#4a4a4a',
                                                                            fontWeight: 700, transition: 'all 0.2s', cursor: 'pointer',
                                                                            fontSize: '0.9rem'
                                                                        }}
                                                                    >
                                                                        {opt}
                                                                    </motion.button>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <input
                                                                type={field.type}
                                                                value={formData[field.name]}
                                                                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                                                                placeholder={field.placeholder}
                                                                style={{
                                                                    width: '100%', background: '#f8f9fa',
                                                                    border: '1px solid #e1e4e8', borderRadius: '18px',
                                                                    padding: '1.2rem 1.2rem 1.2rem 1.5rem', color: '#1a1a1a',
                                                                    outline: 'none', fontSize: '1rem',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                                onFocus={(e) => {
                                                                    e.target.style.borderColor = 'var(--accent-primary)';
                                                                    e.target.style.background = '#fff';
                                                                    e.target.style.boxShadow = '0 0 0 4px rgba(255, 87, 34, 0.1)';
                                                                }}
                                                                onBlur={(e) => {
                                                                    e.target.style.borderColor = '#e1e4e8';
                                                                    e.target.style.background = '#f8f9fa';
                                                                    e.target.style.boxShadow = 'none';
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {currentStepData.options?.map((opt, idx) => (
                                                <motion.button
                                                    key={opt}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    whileHover={{ scale: 1.02, x: 5, backgroundColor: 'rgba(255, 87, 34, 0.05)', borderColor: 'var(--accent-primary)' }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => {
                                                        setFormData({ ...formData, [currentStepData.field]: opt });
                                                        handleNext();
                                                    }}
                                                    style={{
                                                        padding: '1.4rem 1.8rem', borderRadius: '20px', textAlign: 'left',
                                                        background: '#f8f9fa', border: '1px solid #e1e4e8',
                                                        color: '#1a1a1a', fontSize: '1.05rem', display: 'flex',
                                                        justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <span style={{ fontWeight: 700 }}>{opt}</span>
                                                    <ChevronRight size={20} style={{ opacity: 0.3, color: '#1a1a1a' }} />
                                                </motion.button>
                                            ))}
                                        </div>

                                        {/* Navigation Section */}
                                        {!currentStepData.options && (
                                            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                                                {currentStepIndex > 0 && (
                                                    <button
                                                        onClick={() => setStep(visibleSteps[currentStepIndex - 1].id)}
                                                        style={{
                                                            flex: 1, padding: '1.2rem', borderRadius: '18px',
                                                            background: 'transparent', border: '1px solid #e1e4e8',
                                                            color: '#666', fontWeight: 700, cursor: 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => { e.target.style.background = '#f0f0f0'; e.target.style.color = '#333'; }}
                                                        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#666'; }}
                                                    >
                                                        Back
                                                    </button>
                                                )}
                                                <motion.button
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleNext}
                                                    className="btn-primary"
                                                    disabled={!formData[currentStepData.fields?.[0]?.name] && step === 1}
                                                    style={{
                                                        flex: currentStepIndex > 0 ? 2 : 1,
                                                        justifyContent: 'center',
                                                        padding: '1.2rem',
                                                        borderRadius: '18px',
                                                        fontSize: '1.1rem',
                                                        boxShadow: '0 8px 20px rgba(255, 87, 34, 0.3)'
                                                    }}
                                                >
                                                    Continue <ChevronRight size={20} />
                                                </motion.button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    /* AI Insights View */
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{
                                            width: '80px', height: '80px',
                                            background: 'var(--accent-gradient)',
                                            borderRadius: '24px', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', margin: '0 auto 2.5rem', color: '#fff',
                                            boxShadow: '0 20px 40px rgba(255, 87, 34, 0.3)'
                                        }}>
                                            <Sparkles size={40} />
                                        </div>

                                        <h2 style={{ fontSize: '2.4rem', fontWeight: 950, marginBottom: '1.2rem', letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1a1a1a' }}>
                                            Reality Check <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Complete</span>
                                        </h2>
                                        <p style={{ color: '#666', marginBottom: '3rem', fontSize: '1.1rem', fontWeight: 500, opacity: 0.9 }}>
                                            The AI has analyzed your profile. Here's your personalized career path.
                                        </p>

                                        <div style={{
                                            background: '#f8f9fa',
                                            padding: '2.5rem', borderRadius: '30px',
                                            border: '1px solid #e1e4e8',
                                            textAlign: 'left', marginBottom: '3.5rem',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-gradient)' }} />
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                                <div style={{ color: 'var(--accent-primary)' }}>
                                                    <BrainCircuit size={22} />
                                                </div>
                                                <span style={{ fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8, color: '#333' }}>Personalized AI Strategy</span>
                                            </div>
                                            <p style={{ fontSize: '1.15rem', color: '#1a1a1a', lineHeight: '1.7', fontWeight: 500, opacity: 0.9 }}>
                                                "Your transition strategy is set. From <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{formData.subDomain}</span> to <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{formData.targetRole || 'your goal'}</span>, we'll build your AI operating system. We'll focus on achieving your goal of <span style={{ fontWeight: 800 }}>{formData.goal}</span> within {formData.targetTimeline}."
                                            </p>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleComplete}
                                            disabled={loading}
                                            className="btn-primary"
                                            style={{
                                                width: '100%', justifyContent: 'center', padding: '1.4rem',
                                                fontSize: '1.2rem', borderRadius: '18px',
                                                boxShadow: '0 8px 25px rgba(255, 87, 34, 0.3)'
                                            }}
                                        >
                                            {loading ? 'Building Workspace...' : "Enter Control Center"}
                                        </motion.button>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
