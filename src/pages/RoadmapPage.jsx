import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Download, Zap, ChevronRight, CheckCircle2,
    Layers, Cpu, Rocket, Terminal, Database, Trophy,
    Star, Calendar, Target, Briefcase, TrendingUp, Users, Sparkles, AlertTriangle, ShieldCheck,
    User, Globe, Building2, ArrowRight
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ROLE_DATA = {
    "Marketing": {
        roles: ["Growth Marketing Lead", "Product Marketing Manager", "AI Marketing Strategist", "Retention Head"],
        projects: [
            { name: "AI Content Engine", produce: "Automated content pipeline", proves: "Operational efficiency", help: "shortlist" },
            { name: "Predictive LTV Model", produce: "Customer churn prediction", proves: "Analytical depth", help: "promotion" },
            { name: "Personalized Ad Stack", produce: "Dynamic creative optimizer", proves: "Growth expertise", help: "leadership" }
        ]
    },
    "Engineering / Tech": {
        roles: ["Senior Software Engineer", "DevOps Engineer", "AI/ML Engineer", "Engineering Manager"],
        projects: [
            { name: "AI Code Assistant", produce: "Custom LLM for internal codebase", proves: "AI implementation", help: "promotion" },
            { name: "Automated Testing Suite", produce: "Self-healing test framework", proves: "Reliability engineering", help: "shortlist" },
            { name: "Cloud Cost Optimizer", produce: "AI-driven infra scaling", proves: "Business impact", help: "leadership" }
        ]
    },
    "Design": {
        roles: ["UX Lead", "Product Designer", "Design Systems Architect", "Creative Director"],
        projects: [
            { name: "AI UI Generator", produce: "Component auto-layout tool", proves: "Workflow innovation", help: "promotion" },
            { name: "User Research Synth", produce: "AI-powered interview analyzer", proves: "Unde-standing user needs", help: "shortlist" },
            { name: "Predictive Design System", produce: "Self-adapting UI components", proves: "Technical design", help: "leadership" }
        ]
    }
};

const DEFAULT_DATA = {
    roles: ["Senior Specialist", "Team Lead", "AI Transformation Lead", "Domain Expert"],
    projects: [
        { name: "AI Productivity Suite", produce: "Custom workflow automation", proves: "Efficiency gain", help: "promotion" },
        { name: "AI Integration Audit", produce: "Domain-specific AI gap report", proves: "Strategic thinking", help: "shortlist" },
        { name: "Automated Support Ops", produce: "AI response engine", proves: "Customer impact", help: "leadership" }
    ]
};

const CTC_BANDS = {
    "₹0–3 LPA": { realistic: "₹4–7 LPA", stretch: "₹8–12 LPA" },
    "₹3–6 LPA": { realistic: "₹7–10 LPA", stretch: "₹12–15 LPA" },
    "₹6–10 LPA": { realistic: "₹12–18 LPA", stretch: "₹20–25 LPA" },
    "₹10–15 LPA": { realistic: "₹18–25 LPA", stretch: "₹28–35 LPA" },
    "₹15–25 LPA": { realistic: "₹28–38 LPA", stretch: "₹40–50 LPA" },
    "₹25–40 LPA": { realistic: "₹45–60 LPA", stretch: "₹65–80 LPA" },
    "₹40+ LPA": { realistic: "₹60–80 LPA", stretch: "₹1 Cr+" },
};

export default function RoadmapPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const roadmapRef = useRef(null);
    const { user, userData, updateUserData } = useAuth();
    const { theme } = useTheme();
    const [formData, setFormData] = useState(location.state?.formData || null);
    const [loading, setLoading] = useState(true);
    const isDark = theme === 'dark';

    useEffect(() => {
        const loadRoadmapData = () => {
            if (!user) {
                if (!loading) navigate('/login');
                return;
            }

            // Sync with userData from AuthContext
            const savedData = userData?.onboarding || userData?.roadmapData;
            if (savedData && savedData.completed) {
                setFormData(savedData);
            } else if (userData?.onboardingCompleted && userData?.onboarding) {
                setFormData(userData.onboarding);
            } else if (location.state?.formData) {
                setFormData(location.state.formData);
            } else if (!fetching) {
                navigate('/welcome');
            }
            setLoading(false);
        };

        if (userData !== undefined) {
            loadRoadmapData();
        }
    }, [user?.uid]); // Only run when user ID changes or on mount

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading your roadmap...</div>;
    if (!formData) return null;

    const domainData = ROLE_DATA[formData?.domain] || DEFAULT_DATA;
    const compensation = CTC_BANDS[formData?.ctc];
    const isLeadershipGoal = formData?.goal === "Move into a leadership role";

    const downloadPDF = async () => {
        const element = roadmapRef.current;
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            compress: true
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const captureOptions = {
            scale: 2, // Reduced from 3 to 2 for smaller file size while maintaining decent quality
            useCORS: true,
            logging: false,
            backgroundColor: isDark ? '#0f172a' : '#f8fafc',
            windowWidth: 1000, // Lock width for consistent rendering
            onclone: (clonedDoc) => {
                const motionDivs = clonedDoc.querySelectorAll('div');
                motionDivs.forEach(d => {
                    d.style.opacity = '1';
                    d.style.transform = 'none';
                    d.style.transition = 'none';
                    d.style.animation = 'none';
                });
                const toIgnore = clonedDoc.querySelectorAll('[data-html2canvas-ignore="true"]');
                toIgnore.forEach(el => el.style.display = 'none');

                // Ensure the background is white/dark based on theme for clean PDF
                const contentBody = clonedDoc.querySelector('body');
                if (contentBody) contentBody.style.background = isDark ? '#0f172a' : '#f8fafc';
            }
        };

        // Capture the entire element
        const canvas = await html2canvas(element, captureOptions);

        // Calculate the height of one PDF page in canvas-pixels
        const pxPageHeight = (canvas.width * pdfHeight) / pdfWidth;
        const totalPages = Math.ceil(canvas.height / pxPageHeight);

        for (let i = 0; i < totalPages; i++) {
            if (i > 0) pdf.addPage();

            const pageCanvas = document.createElement('canvas');
            pageCanvas.width = canvas.width;
            pageCanvas.height = pxPageHeight;
            const ctx = pageCanvas.getContext('2d');

            // Fill background
            ctx.fillStyle = isDark ? '#0f172a' : '#f8fafc';
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

            // Draw the chunk
            ctx.drawImage(
                canvas,
                0, i * pxPageHeight, canvas.width, pxPageHeight,
                0, 0, canvas.width, pxPageHeight
            );

            // Use JPEG with 0.8 quality for better compression
            const pageData = pageCanvas.toDataURL('image/jpeg', 0.8);
            pdf.addImage(pageData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
        }

        pdf.save(`${(formData?.name || 'My').replace(/\s+/g, '_')}_AI_Career_Roadmap.pdf`);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: isDark ? '#0f172a' : '#f8fafc',
            fontFamily: "'Inter', sans-serif",
            padding: '2rem'
        }} ref={roadmapRef}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                {/* 1) Your Objective - ULTIMATE REDESIGN */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        background: '#ffffff',
                        borderRadius: '40px',
                        padding: '5rem 3rem',
                        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.04)',
                        position: 'relative',
                        overflow: 'hidden',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2.5rem'
                    }}
                >
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                            <div style={{
                                padding: '0.6rem 1.4rem',
                                background: 'linear-gradient(135deg, #1a1a1a 0%, #334155 100%)',
                                color: '#ffffff',
                                borderRadius: '100px',
                                fontSize: '0.8rem',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <Target size={14} strokeWidth={3} /> PERFORMANCE STRATEGY
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.05em' }}>DATE GENERATED</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1e293b' }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                            </div>
                        </div>

                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontSize: '2.5rem',
                            fontWeight: 900,
                            boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            {(formData?.name || 'U').split(' ')[0][0]}
                        </div>

                        <h1 style={{
                            fontSize: '4.2rem',
                            fontWeight: 900,
                            color: '#1e293b',
                            marginBottom: '1rem',
                            letterSpacing: '-0.05em',
                            lineHeight: 1,
                            maxWidth: '90%'
                        }}>
                            <span style={{ color: '#ff5722' }}>{(formData?.name || 'User').split(' ')[0]}'s</span> Career <br />
                            Transformation Roadmap
                        </h1>

                        <p style={{
                            fontSize: '1.4rem',
                            color: '#475569',
                            maxWidth: '800px',
                            lineHeight: 1.5,
                            fontWeight: 500,
                            marginBottom: '3rem'
                        }}>
                            Strategic path for an {formData?.experience || 'ambitious'} professional in <span style={{ fontWeight: 800, color: isDark ? '#f1f5f9' : '#0f172a' }}>{formData?.domain || 'Tech'}</span> to transition into <span style={{ fontWeight: 800, color: '#ff5722' }}>{formData?.goal || 'Leadership'}</span>.
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: '1rem',
                            borderTop: '1px solid #f1f5f9',
                            paddingTop: '2.5rem'
                        }}>
                            <ProfileMetric icon={<User size={16} />} label="EXPERIENCE" value={formData?.experience || 'N/A'} />
                            <ProfileMetric icon={<Globe size={16} />} label="DOMAIN" value={formData?.domain || 'N/A'} />
                            <ProfileMetric icon={<Building2 size={16} />} label="INDUSTRY" value={formData?.industry || 'N/A'} />
                            <ProfileMetric icon={<Calendar size={16} />} label="TIMELINE" value={formData?.timeline || 'N/A'} />
                            <ProfileMetric icon={<Zap size={16} />} label="AI LEVEL" value={formData?.aiLevel?.split('(')[0] || 'N/A'} />
                        </div>
                    </div>

                    {/* Background Pattern */}
                    <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.03, pointerEvents: 'none' }}>
                        <svg width="400" height="400" viewBox="0 0 100 100">
                            <defs>
                                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>
                </motion.div>

                {/* 4) Compensation Outlook */}
                {compensation && (
                    <Section title="Compensation Value Projection" icon={<TrendingUp size={24} />} isDark={isDark}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            <CompCard label="CURRENT BAND" value={formData?.ctc || 'N/A'} type="current" />
                            <CompCard label="REALISTIC TARGET" value={compensation.realistic} type="realistic" />
                            <CompCard label="STRETCH TARGET" value={compensation.stretch} type="stretch" />
                        </div>
                        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#94a3b8', textAlign: 'center', fontWeight: 500 }}>
                            Estimates based on current market dynamics for AI-integrated roles in major tech hubs.
                        </p>
                    </Section>
                )}
                {!compensation && formData?.ctc === "Prefer not to say" && (
                    <Section title="Compensation Outlook" icon={<TrendingUp size={24} />} isDark={isDark}>
                        <div style={{ textAlign: 'center', padding: '2rem', background: isDark ? '#1e293b' : '#f1f5f9', borderRadius: '20px' }}>
                            <p style={{ color: isDark ? '#94a3b8' : '#64748b' }}>Add your CTC in profile settings to see tailored ranges.</p>
                        </div>
                    </Section>
                )}

                {/* 2) Where You Are Today */}
                <Section title="Current Capability Diagnostic" icon={<TrendingUp size={24} />} isDark={isDark}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem' }}>
                        <div>
                            <div style={{
                                background: '#f8fafc',
                                padding: '2.5rem',
                                borderRadius: '24px',
                                border: '1px solid #f1f5f9',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                                    <span style={{ fontWeight: 900, fontSize: '0.9rem', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Readiness Score</span>
                                    <span style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>75<span style={{ fontSize: '1rem' }}>%</span></span>
                                </div>
                                <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '100px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg, #10b981, #3b82f6)' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <CheckItem text={`Professional background in ${formData?.domain || 'your domain'}`} checked={true} isDark={isDark} />
                                    <CheckItem text={`Targeting ${formData?.industry || 'industry'} vertical momentum`} checked={true} isDark={isDark} />
                                    <CheckItem text="AI-first workflow & portfolio integration" checked={false} isDark={isDark} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#10b981', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '12px', height: '2px', background: 'currentColor' }}></div> CORE STRENGTHS
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.8rem' }}>
                                    <StrengthItem text="Domain fundamentals: highly capable" />
                                    <StrengthItem text="Business context & strategic awareness: solid" />
                                    <StrengthItem text="Professional communication baseline: established" />
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, color: '#f59e0b', marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '12px', height: '2px', background: 'currentColor' }}></div> THE FINAL 30% (GAP ANALYSIS)
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.8rem' }}>
                                    <GapItem text="Deep integration of role-specific AI workflows" />
                                    <GapItem text="Portfolio of proof-of-work aligned to goals" />
                                    <GapItem text="Optimized executive-level LinkedIn positioning" />
                                    <GapItem text="Interview mastery & narrative construction" />
                                </ul>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* 3) Roles You Can Aim For Next */}
                <Section title="Strategic Role Alignments" icon={<Briefcase size={24} />} isDark={isDark}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        {domainData.roles.map((title, i) => (
                            <RoleCard key={i} title={title} isLeadership={isLeadershipGoal && i >= 2} isDark={isDark} />
                        ))}
                    </div>
                </Section>



                {/* 5) Your AI Path (12-week roadmap) - TIMELINE REDESIGN */}
                <Section title={`Execution Roadmap: 12-Week Sprint`} icon={<Calendar size={24} />} isDark={isDark}>
                    <div style={{ position: 'relative', paddingLeft: '40px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                        <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', background: '#f1f5f9' }} />

                        <Milestone
                            phase="PHASE 01"
                            title="Foundation + Strategic Tooling"
                            duration="Weeks 1–3"
                            color="#ff5722"
                            items={["AI fundamentals for high-level professionals", "Domain-specific prompting architectures", "Production-grade tool stack configuration"]}
                            isDark={isDark}
                        />
                        <Milestone
                            phase="PHASE 02"
                            title="Advanced Role Workflows"
                            duration="Weeks 4–6"
                            color="#3b82f6"
                            items={[`Workflow mapping for ${formData?.subDomain || 'your role'}`, "Agentic automation for repetitive tasks", "Data-driven AI decision frameworks"]}
                            isDark={isDark}
                        />
                        <Milestone
                            phase="PHASE 03"
                            title="Strategic Proof-of-Work"
                            duration="Weeks 7–9"
                            color="#8b5cf6"
                            items={["2 high-stakes portfolio projects", "Quantifying AI-driven impact metrics", "Optimized proof-of-work documentation"]}
                            isDark={isDark}
                        />
                        <Milestone
                            phase="PHASE 04"
                            title="Market Positioning & Execution"
                            duration="Weeks 10–12"
                            color="#10b981"
                            items={["High-impact executive profile overhaul", "Mastering the AI-first interview narrative", "Target role acquisition & negotiation"]}
                            isDark={isDark}
                            isLast={true}
                        />
                    </div>
                </Section>

                {/* 6) Proof-of-Work You'll Build */}
                <Section title="Strategic Proof-of-Work Assets" icon={<Zap size={24} />} isDark={isDark}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {domainData.projects.map((proj, i) => (
                            <ProjectCard key={i} project={proj} isDark={isDark} />
                        ))}
                    </div>
                </Section>

                {/* 7) Support System */}
                <Section title="Support System" icon={<ShieldCheck size={24} />} isDark={isDark}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        <SupportItem text="Community + weekly live sessions" isDark={isDark} />
                        <SupportItem text="Mentors + 1:1 guidance" isDark={isDark} />
                        <SupportItem text="Interview prep loops" isDark={isDark} />
                        <SupportItem text="Resume + LinkedIn updates throughout" isDark={isDark} />
                    </div>
                </Section>

                {/* 8) Your Summary - ULTIMATE CLOSING */}
                <Section title="Strategic Summary" icon={<Rocket size={24} />} isDark={isDark}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1a1a1a 0%, #334155 100%)',
                        padding: '4rem 3rem',
                        borderRadius: '32px',
                        textAlign: 'center',
                        color: '#ffffff',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>Ready for Launch.</h2>
                            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                                This roadmap translates your career goals into a structured, week-by-week execution plan. Your transformation begins now.
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '1.5rem',
                                marginBottom: '4rem',
                                padding: '2rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <SummaryItem label="GOAL" value={formData.goal} />
                                <SummaryItem label="DIRECTION" value={domainData.roles[0]} />
                                <SummaryItem label="AI SHIFT" value="Professional → Expert" />
                                <SummaryItem label="ASSETS" value="3 High-Impact Units" />
                            </div>

                            <motion.button
                                data-html2canvas-ignore="true"
                                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 87, 34, 0.4)' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/track')}
                                style={{
                                    padding: '1.4rem 4rem',
                                    borderRadius: '100px',
                                    background: '#ff5722',
                                    border: 'none',
                                    color: '#fff',
                                    fontWeight: 900,
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    boxShadow: '0 12px 24px rgba(255, 87, 34, 0.3)'
                                }}
                            >
                                Initiate Week 1 <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                            </motion.button>
                        </div>

                        {/* Summary Backdrop Pattern */}
                        <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,87,34,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
                    </div>
                </Section>
            </div>

            {/* Floating Action for PDF */}
            <motion.button
                data-html2canvas-ignore="true"
                animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        '0 10px 20px rgba(255, 87, 34, 0.2)',
                        '0 15px 30px rgba(255, 87, 34, 0.4)',
                        '0 10px 20px rgba(255, 87, 34, 0.2)'
                    ]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={downloadPDF}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#ff5722',
                    border: 'none',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(255, 87, 34, 0.3)',
                    zIndex: 100
                }}
            >
                <Download size={28} strokeWidth={2.5} />
            </motion.button>
        </div>
    );
}

// --- REFINED HELPER COMPONENTS (CONSULTING STYLE) ---

const Section = ({ title, icon, children, isDark = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
            background: '#ffffff',
            borderRadius: '32px',
            padding: '4rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
            border: '1px solid #f1f5f9'
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '3rem' }}>
            <div style={{
                width: '48px', height: '48px',
                background: '#fff7f5',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#ff5722',
                border: '1px solid #ff572220'
            }}>{icon}</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1e293b', letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        {children}
    </motion.div>
);

const ProfileMetric = ({ icon, label, value }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {icon} {label}
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e293b' }}>{value}</div>
    </div>
);

const StrengthItem = ({ text }) => (
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', fontWeight: 600, color: '#334155' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} /> {text}
    </li>
);

const GapItem = ({ text }) => (
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.05rem', fontWeight: 600, color: '#334155' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} /> {text}
    </li>
);

const CheckItem = ({ text, checked }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{
            width: '24px', height: '24px',
            borderRadius: '50%',
            background: checked ? '#ecfdf5' : '#fffbeb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: checked ? '#10b981' : '#f59e0b',
            border: `1px solid ${checked ? '#10b98130' : '#f59e0b30'}`
        }}>
            {checked ? <CheckCircle2 size={14} strokeWidth={3} /> : <AlertTriangle size={14} strokeWidth={3} />}
        </div>
        <span style={{ fontSize: '1rem', color: '#475569', fontWeight: 600 }}>{text}</span>
    </div>
);

const RoleCard = ({ title, isLeadership }) => (
    <div style={{
        padding: '2rem',
        background: '#f8fafc',
        borderRadius: '24px',
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        transition: 'all 0.3s ease'
    }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1e293b' }}>{title}</h3>
            <span style={{
                background: isLeadership ? '#f5f3ff' : '#ecfdf5',
                color: isLeadership ? '#8b5cf6' : '#10b981',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.7rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>{isLeadership ? 'Stretch' : 'Target'}</span>
        </div>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500, display: 'flex', gap: '8px' }}>
                <span style={{ color: '#ff5722' }}>•</span> Gap: Advanced AI Workflows
            </div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500, display: 'flex', gap: '8px' }}>
                <span style={{ color: '#ff5722' }}>•</span> Fit: Strategic Alignment
            </div>
        </div>
    </div>
);

const CompCard = ({ label, value, type }) => {
    const colors = {
        current: { bg: '#f8fafc', text: '#64748b', val: '#1e293b' },
        realistic: { bg: '#fff7f5', text: '#ff5722', val: '#ff5722' },
        stretch: { bg: '#f5f3ff', text: '#8b5cf6', val: '#8b5cf6' }
    };
    const style = colors[type];
    return (
        <div style={{ padding: '2.5rem', background: style.bg, borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.02)' }}>
            <div style={{ fontSize: '0.75rem', color: style.text, fontWeight: 900, marginBottom: '0.8rem', letterSpacing: '0.1em' }}>{label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: style.val, letterSpacing: '-0.02em' }}>{value}</div>
        </div>
    );
};

const Milestone = ({ phase, title, duration, color, items, isLast }) => (
    <div style={{ position: 'relative', paddingBottom: isLast ? '0' : '4rem' }}>
        <div style={{
            position: 'absolute', left: '-35px', top: '4px',
            width: '12px', height: '12px',
            borderRadius: '50%', background: color,
            boxShadow: `0 0 0 6px #fff, 0 0 0 8px ${color}20`,
            zIndex: 2
        }} />
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: color, letterSpacing: '0.1em' }}>{phase}</span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#cbd5e1' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>{duration}</span>
        </div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.8rem' }}>{title}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {items.map((item, i) => (
                <div key={i} style={{
                    padding: '1.5rem', background: '#f8fafc', borderRadius: '20px',
                    fontSize: '0.9rem', color: '#475569', fontWeight: 600,
                    border: '1px solid #f1f5f9',
                    lineHeight: 1.5
                }}>
                    {item}
                </div>
            ))}
        </div>
    </div>
);

const ProjectCard = ({ project }) => (
    <div style={{
        padding: '2.5rem', background: '#f8fafc', borderRadius: '32px',
        border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '1.2rem'
    }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e293b', lineHeight: 1.3 }}>{project.name}</h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Output: <span style={{ color: '#1e293b', fontWeight: 700 }}>{project.produce}</span></p>
        <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ border: '1px solid #ff572230', color: '#ff5722', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900 }}>{project.help.toUpperCase()}</span>
            <span style={{ background: '#e2e8f0', color: '#475569', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 900 }}>PROVES: {project.proves.toUpperCase()}</span>
        </div>
    </div>
);

const SummaryItem = ({ label, value }) => (
    <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{label}</div>
        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>{value}</div>
    </div>
);

const Chip = ({ label, icon, isDark }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.7rem 1.4rem',
        borderRadius: '100px',
        background: '#ffffff',
        color: '#475569',
        fontSize: '0.9rem',
        fontWeight: 700,
        border: '1px solid rgba(0,0,0,0.08)'
    }}>
        <span style={{ color: '#ff5722' }}>{icon}</span>
        {label}
    </div>
);

const SummaryRow = ({ label, value }) => (
    <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '500px' }}>
        <span style={{ color: '#94a3b8', fontWeight: 800, minWidth: '120px', textAlign: 'right', fontSize: '0.9rem', textTransform: 'uppercase' }}>{label}:</span>
        <span style={{ color: '#1e293b', fontWeight: 700, textAlign: 'left', fontSize: '1rem' }}>{value}</span>
    </div>
);

const ChipOld = ({ label, icon, isDark }) => (
    <motion.div
        whileHover={{ y: -2, background: isDark ? 'rgba(255,255,255,0.1)' : '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
        style={{
            display: 'flex',
            alignItems: 'center', gap: '0.6rem', padding: '0.7rem 1.4rem', borderRadius: '100px',
            background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
            color: isDark ? '#cbd5e1' : '#475569',
            fontSize: '0.9rem', fontWeight: 700, border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`, transition: 'all 0.3s ease'
        }}
    >
        <span style={{ color: '#ff5722', display: 'flex' }}>{icon}</span>
        {label}
    </motion.div>
);

const RoleCardOld = ({ title, isLeadership, isDark }) => (
    <div style={{ padding: '1.5rem', background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', borderRadius: '16px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#f1f5f9' : '#1e293b' }}>{title}</h3>
            <span style={{ background: isLeadership ? 'rgba(139,92,246,0.1)' : 'rgba(16,185,129,0.1)', color: isLeadership ? '#8b5cf6' : '#10b981', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>{isLeadership ? 'STRETCH' : 'REALISTIC'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b' }}>• Key gap: AI-first workflows</div>
            <div style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b' }}>• Why it fits: Aligned with goal</div>
        </div>
    </div>
);

const MilestoneOld = ({ title, color, items, isDark }) => (
    <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: `2px solid ${color}40` }}>
        <div style={{ position: 'absolute', left: '-9px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: color, border: `4px solid ${isDark ? '#0f172a' : '#f8fafc'}` }} />
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '1rem' }}>{title}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {items.map((item, i) => (
                <div key={i} style={{ padding: '1rem', background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', borderRadius: '12px', fontSize: '0.9rem', color: isDark ? '#cbd5e1' : '#475569' }}>
                    {item}
                </div>
            ))}
        </div>
    </div>
);

const ProjectCardOld = ({ project, isDark }) => (
    <div style={{ padding: '1.5rem', background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', borderRadius: '16px', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: isDark ? '#f1f5f9' : '#1e293b', marginBottom: '0.5rem' }}>{project.name}</h3>
        <p style={{ fontSize: '0.85rem', color: isDark ? '#94a3b8' : '#64748b', marginBottom: '1rem' }}>Produce: {project.produce}</p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ background: 'rgba(255,87,34,0.1)', color: '#ff5722', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>{project.help.toUpperCase()}</span>
            <span style={{ background: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0', color: isDark ? '#cbd5e1' : '#475569', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>PROVES: {project.proves.toUpperCase()}</span>
        </div>
    </div>
);

const SupportItem = ({ text, isDark }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.2rem', background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', borderRadius: '16px' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5722' }} />
        <span style={{ fontSize: '1rem', fontWeight: 600, color: isDark ? '#e2e8f0' : '#475569' }}>{text}</span>
    </div>
);

