import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ChevronRight, ChevronDown, Check, Sparkles, Rocket, Target, Briefcase, Brain, Globe, CheckCircle2, MapPin, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const COUNTRY_CODES = [
    // Asia
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },

    // Europe
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },

    // Americas
    { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },

    // Africa
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },

    // Oceania
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+679', country: 'Fiji', flag: '🇫🇯' }
];

const STATE_CITY_DATA = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Kadapa", "Anantapur"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Gandhidham", "Anand"],
    "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Palampur", "Baddi", "Nahan", "Paonta Sahib", "Sundarnagar"],
    "Jharkhand": ["Jamshedpur", "Dhanbad", "Ranchi", "Bokaro Steel City", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar"],
    "Karnataka": ["Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Davanagere", "Ballari", "Vijayapura", "Shivamogga"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha", "Palakkad", "Kannur", "Kottayam", "Kasaragod"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivli", "Vasai-Virar", "Aurangabad", "Navi Mumbai", "Solapur", "Kolhapur", "Amravati", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Nanded"],
    "Manipur": ["Imphal", "Thoubal", "Kakching", "Ukhrul", "Churachandpur", "Bishnupur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip"],
    "Nagaland": ["Dimapur", "Kohima", "Mokokchung", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Abohar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam", "Rangpo"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukudi"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
    "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailasahar", "Bishalgarh", "Teliamura", "Khowai", "Belonia"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Noida", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Ayodhya"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur"],
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
    "Delhi": ["New Delhi", "Delhi", "Noida (NCR)", "Gurugram (NCR)", "Faridabad (NCR)", "Ghaziabad (NCR)"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur", "Sopore"],
    "Ladakh": ["Leh", "Kargil"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Andrott"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};

const SUB_DOMAINS = {
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
};

const QUESTIONS = [
    {
        id: 'name',
        question: "Welcome to the AI Career Accelerator. I'm your mentor and coach. What's your name?",
        type: 'text',
        placeholder: "Type your name here..."
    },
    {
        id: 'experience',
        question: "1️⃣ Years of work experience",
        type: 'select',
        options: ["0 (Student / Fresher)", "0–1 year", "1–3 years", "3–5 years", "5–8 years", "8–12 years", "12+ years"]
    },
    {
        id: 'domain',
        question: "2️⃣ Your primary domain",
        type: 'select',
        options: [
            "Marketing", "Sales / Business Development", "HR / People Ops", "Operations / Supply Chain",
            "Finance / Accounting", "Customer Success / Support", "Product / Program Management",
            "Data / Analytics", "Engineering / Tech", "Design", "Consulting",
            "Entrepreneurship / Founder", "Other"
        ]
    },
    {
        id: 'subDomain',
        question: "3️⃣ What best describes what you do day-to-day?",
        type: 'select',
        options: (data) => SUB_DOMAINS[data.domain] || ["Other"]
    },
    {
        id: 'industry',
        question: "4️⃣ Your industry",
        type: 'select',
        options: [
            "IT Services", "SaaS / Software Product", "E-commerce / D2C", "BFSI (Banking / FinTech / Insurance)",
            "Consulting / Professional Services", "Healthcare / Pharma", "Education / EdTech", "Manufacturing",
            "Retail", "Media / Entertainment", "Logistics / Mobility", "Government / Public Sector", "Other"
        ]
    },
    {
        id: 'companySize',
        question: "5️⃣ Company size",
        type: 'select',
        options: ["Solo / Freelancer", "1–10", "11–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"]
    },
    {
        id: 'goal',
        question: "6️⃣ Your primary goal right now",
        type: 'select',
        options: [
            "Promotion in my current company",
            "Job switch to a better role/company",
            "Move into a leadership role",
            "Improve job security & performance",
            "Explore AI and find the right direction"
        ]
    },
    {
        id: 'aiLevel',
        question: "7️⃣ Your AI starting level",
        type: 'select',
        options: [
            "New to AI (starting from scratch)",
            "I use ChatGPT occasionally",
            "I use AI weekly for work tasks",
            "I use AI daily with clear workflows",
            "I build automations/prompts/workflows for others"
        ]
    },
    {
        id: 'ctc',
        question: "8️⃣ Current CTC (optional)",
        type: 'select',
        options: ["₹0–3 LPA", "₹3–6 LPA", "₹6–10 LPA", "₹10–15 LPA", "₹15–25 LPA", "₹25–40 LPA", "₹40+ LPA", "Prefer not to say"]
    },
    {
        id: 'timeline',
        question: "9️⃣ Target timeline for your next outcome",
        type: 'select',
        options: ["2–4 weeks", "1–2 months", "3 months", "6 months", "6–12 months"]
    },
    {
        id: 'dreamRole',
        question: "🔟 What role are you targeting next?",
        type: 'select',
        options: (data) => SUB_DOMAINS[data.domain] || ["Other"],
        condition: (data) => data.goal !== "Explore AI and find the right direction"
    },
    {
        id: 'final',
        question: "Perfect! I've analyzed your profile and I'm ready to create your personalized career roadmap. Let's unlock your potential!",
        type: 'action',
        label: "Generate My Roadmap"
    }
];

export default function ChatOnboarding() {
    const { user, userData, setUserData, updateUserData } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: QUESTIONS[0].question }
    ]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [formData, setFormData] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const messagesContainerRef = useRef(null);

    // Welcome Modal State
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);
    const [welcomeName, setWelcomeName] = useState(user?.displayName || '');
    const [welcomePhone, setWelcomePhone] = useState('');
    const [welcomeState, setWelcomeState] = useState('');
    const [welcomeCity, setWelcomeCity] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

    // Loading animation state
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationStage, setGenerationStage] = useState(0);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            const scrollHeight = messagesContainerRef.current.scrollHeight;
            messagesContainerRef.current.scrollTo({
                top: scrollHeight,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        // Only scroll if modal is closed
        if (!showWelcomeModal) {
            const timeoutId = setTimeout(scrollToBottom, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [messages, isTyping, showWelcomeModal]);

    const handleWelcomeSubmit = () => {
        if (!welcomeName.trim()) return;

        // Save name and skip to second question
        setFormData({
            ...formData,
            name: welcomeName,
            phone: `${countryCode} ${welcomePhone}`,
            state: welcomeState,
            city: welcomeCity
        });

        // Initialize chat with personalized welcome and the first real question (Index 1: Role)
        const nextQ = QUESTIONS[1];
        setMessages([
            {
                id: 1,
                type: 'bot',
                text: `Welcome, ${welcomeName}! I'm your AI Career Mentor. Let's build your personalized roadmap.`
            },
            {
                id: 2,
                type: 'bot',
                text: nextQ.question
            }
        ]);
        setCurrentQuestionIndex(1);
        setShowWelcomeModal(false);
    };

    const handleSend = (value) => {
        const currentQuestion = QUESTIONS[currentQuestionIndex];
        const val = value || inputValue;
        if (!val && currentQuestion.type !== 'action') return;

        // Add user message
        const newMessages = [...messages, { id: Date.now(), type: 'user', text: val }];
        setMessages(newMessages);
        setInputValue('');

        // Update form data
        const newFormData = { ...formData, [currentQuestion.id]: val };
        setFormData(newFormData);

        // Find next question
        getNextQuestion(currentQuestionIndex, newFormData, newMessages);
    };

    const getNextQuestion = (index, data, currentMessages) => {
        setIsTyping(true);
        setTimeout(() => {
            let nextIndex = index + 1;
            while (nextIndex < QUESTIONS.length) {
                const nextQ = QUESTIONS[nextIndex];
                if (!nextQ.condition || nextQ.condition(data)) {
                    break;
                }
                nextIndex++;
            }

            if (nextIndex < QUESTIONS.length) {
                setMessages([...currentMessages, { id: Date.now() + 1, type: 'bot', text: QUESTIONS[nextIndex].question }]);
                setCurrentQuestionIndex(nextIndex);
            } else {
                // Should not happen as last question is always shown
            }
            setIsTyping(false);
        }, 1000);
    };



    const handleComplete = async () => {
        setIsTyping(true);
        setIsGenerating(true);

        const finalOnboarding = {
            ...formData,
            track: "AI Career Accelerator",
            completedAt: new Date().toISOString(),
            completed: true
        };

        if (user) {
            try {
                await updateUserData({
                    onboarding: finalOnboarding,
                    displayName: formData.name || user.displayName,
                    onboardingCompleted: true
                });
            } catch (error) {
                console.error("Error saving onboarding data:", error);
            }
        }

        // Multi-stage roadmap generation (10 seconds total)
        // Stage 0: Analyzing profile (2s)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGenerationStage(1);

        // Stage 1: Identifying goals (2s)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGenerationStage(2);

        // Stage 2: Mapping learning path (2s)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGenerationStage(3);

        // Stage 3: Optimizing timeline (2s)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGenerationStage(4);

        // Stage 4: Finalizing roadmap (2s)
        await new Promise(resolve => setTimeout(resolve, 2000));

        navigate('/roadmap', { state: { formData: finalOnboarding } });
    };

    const currentQuestion = QUESTIONS[currentQuestionIndex];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8f9ff 0%, #fff5f0 50%, #fef3f8 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '2rem 1rem',
            fontFamily: "'Inter', sans-serif",
            position: 'relative',
            overflowY: 'auto',
            overflowX: 'hidden'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255,87,34,0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(80px)',
                animation: 'float 8s ease-in-out infinite',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(138,43,226,0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(100px)',
                animation: 'float 10s ease-in-out infinite reverse',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(120px)',
                animation: 'float 12s ease-in-out infinite',
                pointerEvents: 'none'
            }} />

            {/* Main Chat Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: 'min(850px, 95%)',
                    minHeight: 'min(700px, 90vh)',
                    height: 'auto',
                    maxHeight: '90vh',
                    background: '#ffffff',
                    borderRadius: '24px',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                    margin: '2rem auto'
                }}
            >


                {showWelcomeModal ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '3rem 2.5rem',
                            overflowY: 'auto',
                            background: '#ffffff'
                        }}
                    >
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: '0 10px 25px rgba(255, 87, 34, 0.3)'
                        }}>
                            <Sparkles color="white" size={32} />
                        </div>

                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1a1a1a', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                            Complete Your Profile
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '2.5rem', lineHeight: 1.5, fontWeight: 500 }}>
                            Let's personalize your experience. Please confirm your details below.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem', width: '100%', maxWidth: '440px' }}>
                            <div style={{ textAlign: 'left' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.6rem', display: 'block' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={welcomeName}
                                        onChange={(e) => setWelcomeName(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '1.2rem 1.2rem 1.2rem 3.2rem',
                                            borderRadius: '16px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            background: '#f8fafc',
                                            transition: 'all 0.2s',
                                            color: '#1e293b'
                                        }}
                                        onFocus={(e) => { e.target.style.borderColor = '#ff5722'; e.target.style.background = '#fff'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; }}
                                    />
                                </div>
                            </div>

                            <div style={{ textAlign: 'left' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.6rem', display: 'block' }}>Phone Number</label>
                                <div style={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: '16px',
                                    border: '1px solid #e2e8f0',
                                    background: '#f8fafc',
                                    transition: 'all 0.2s',
                                    overflow: 'visible'
                                }}>
                                    <div
                                        style={{ position: 'relative', width: '110px', cursor: 'pointer', zIndex: 100 }}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <div style={{
                                            width: '100%',
                                            padding: '1.2rem 0.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '4px'
                                        }}>
                                            <span>{COUNTRY_CODES.find(c => c.code === countryCode)?.flag}</span>
                                            <span style={{ fontWeight: 600 }}>{countryCode}</span>
                                        </div>

                                        <div style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '0.8rem' }}>
                                            {isDropdownOpen ? '▲' : '▼'}
                                        </div>

                                        {isDropdownOpen && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                width: '280px',
                                                maxHeight: '250px',
                                                overflowY: 'auto',
                                                background: '#ffffff',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                zIndex: 1000,
                                                marginTop: '4px'
                                            }}>
                                                {COUNTRY_CODES.map((c) => (
                                                    <div
                                                        key={c.code + c.country}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setCountryCode(c.code);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        style={{
                                                            padding: '0.75rem 1rem',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            transition: 'background 0.2s',
                                                            fontSize: '0.9rem',
                                                            color: '#1e293b',
                                                            borderBottom: '1px solid #f1f5f9'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                                    >
                                                        <span style={{ fontSize: '1.2rem' }}>{c.flag}</span>
                                                        <span style={{ fontWeight: 600, width: '40px' }}>{c.code}</span>
                                                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{c.country}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }}></div>

                                    <input
                                        type="tel"
                                        placeholder="Phone number"
                                        value={welcomePhone}
                                        onChange={(e) => setWelcomePhone(e.target.value.replace(/\D/g, ''))}
                                        maxLength={15}
                                        style={{
                                            flex: 1,
                                            padding: '1.2rem',
                                            border: 'none',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            background: 'transparent',
                                            color: '#1e293b'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ textAlign: 'left' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.6rem', display: 'block' }}>State</label>
                                    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}>
                                        <MapPin size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                                        <div style={{
                                            width: '100%',
                                            padding: '1.2rem 2.8rem',
                                            borderRadius: '16px',
                                            border: '1px solid #e2e8f0',
                                            fontSize: '0.95rem',
                                            background: '#f8fafc',
                                            color: welcomeState ? '#1e293b' : '#94a3b8',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {welcomeState || "Select State"}
                                        </div>
                                        {isStateDropdownOpen && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                left: 0,
                                                width: '100%',
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                background: '#ffffff',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                                zIndex: 100,
                                                marginTop: '4px'
                                            }}>
                                                {Object.keys(STATE_CITY_DATA).map((state) => (
                                                    <div key={state} onClick={(e) => { e.stopPropagation(); setWelcomeState(state); setWelcomeCity(''); setIsStateDropdownOpen(false); }}
                                                        style={{ padding: '0.75rem 1rem', cursor: 'pointer', fontSize: '0.9rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                                        {state}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.6rem', display: 'block' }}>City</label>
                                    <div style={{ position: 'relative', cursor: welcomeState ? 'pointer' : 'not-allowed', opacity: welcomeState ? 1 : 0.6 }} onClick={() => welcomeState && setIsCityDropdownOpen(!isCityDropdownOpen)}>
                                        <Building2 size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} />
                                        <div style={{
                                            width: '100%', padding: '1.2rem 2.8rem', borderRadius: '16px', border: '1px solid #e2e8f0', fontSize: '0.95rem',
                                            background: '#f8fafc', color: welcomeCity ? '#1e293b' : '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                        }}>
                                            {welcomeCity || "Select City"}
                                        </div>
                                        {isCityDropdownOpen && welcomeState && (
                                            <div style={{
                                                position: 'absolute', top: '100%', left: 0, width: '100%', maxHeight: '200px', overflowY: 'auto',
                                                background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 100, marginTop: '4px'
                                            }}>
                                                {(STATE_CITY_DATA[welcomeState] || []).map((city) => (
                                                    <div key={city} onClick={(e) => { e.stopPropagation(); setWelcomeCity(city); setIsCityDropdownOpen(false); }}
                                                        style={{ padding: '0.75rem 1rem', cursor: 'pointer', fontSize: '0.9rem', color: '#1e293b', borderBottom: '1px solid #f1f5f9' }}
                                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                                        {city}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleWelcomeSubmit}
                            disabled={!welcomeName.trim()}
                            style={{
                                width: '100%', maxWidth: '440px', padding: '1.2rem', borderRadius: '16px',
                                background: welcomeName.trim() ? 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)' : '#cbd5e1',
                                color: '#fff', border: 'none', fontSize: '1.1rem', fontWeight: 800,
                                cursor: welcomeName.trim() ? 'pointer' : 'not-allowed',
                                boxShadow: welcomeName.trim() ? '0 10px 25px rgba(255, 87, 34, 0.2)' : 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem'
                            }}
                        >
                            Get Started with Roadmap <ChevronRight size={22} />
                        </motion.button>
                    </motion.div>
                ) : (
                    <>
                        {/* Premium Header */}
                        <div style={{
                            padding: '1.5rem 2rem',
                            background: 'linear-gradient(135deg, rgba(255,87,34,0.05) 0%, rgba(138,43,226,0.03) 100%)',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            position: 'relative',
                            zIndex: 10
                        }}>
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#fff',
                                    boxShadow: '0 8px 24px rgba(255, 87, 34, 0.25), 0 2px 8px rgba(255, 87, 34, 0.15)'
                                }}
                            >
                                <Bot size={26} />
                            </motion.div>
                            <div style={{ flex: 1 }}>
                                <h1 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: 900,
                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    margin: 0,
                                    letterSpacing: '-0.02em'
                                }}>
                                    Career Accelerator Coach
                                </h1>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#ff5722',
                                    margin: 0,
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    <span style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#4ade80',
                                        borderRadius: '50%',
                                        boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)',
                                        animation: 'pulse 2s ease-in-out infinite'
                                    }} />
                                    Expert Mentor Online
                                </p>
                            </div>

                            {/* Question Counter */}
                            {currentQuestionIndex > 0 && currentQuestionIndex < QUESTIONS.length - 1 && (
                                <div style={{
                                    background: 'rgba(255, 87, 34, 0.1)',
                                    color: '#ff5722',
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    whiteSpace: 'nowrap'
                                }}>
                                    Question {currentQuestionIndex} / {QUESTIONS.length - 2}
                                </div>
                            )}
                        </div>

                        {/* Chat Messages Area */}
                        <div
                            ref={messagesContainerRef}
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: '1.5rem 1.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                scrollBehavior: 'smooth'
                            }}
                        >
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        style={{
                                            alignSelf: msg.type === 'bot' ? 'flex-start' : 'flex-end',
                                            maxWidth: '85%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: msg.type === 'bot' ? 'flex-start' : 'flex-end'
                                        }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            style={{
                                                padding: '1rem 1.5rem',
                                                borderRadius: msg.type === 'bot' ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
                                                background: msg.type === 'bot'
                                                    ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,255,0.9) 100%)'
                                                    : 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                                color: msg.type === 'bot' ? '#1a1a1a' : '#fff',
                                                backdropFilter: msg.type === 'bot' ? 'blur(10px)' : 'none',
                                                border: msg.type === 'bot' ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                                                boxShadow: msg.type === 'bot'
                                                    ? '0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)'
                                                    : '0 8px 24px rgba(255, 87, 34, 0.3), 0 2px 8px rgba(255, 87, 34, 0.15)',
                                                fontSize: '0.95rem',
                                                lineHeight: 1.5,
                                                fontWeight: 500,
                                                whiteSpace: 'pre-wrap',
                                                position: 'relative'
                                            }}
                                        >
                                            {msg.text}
                                        </motion.div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            alignSelf: 'flex-start',
                                            padding: '1.2rem 1.8rem',
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,255,0.9) 100%)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '24px',
                                            border: '1px solid rgba(0, 0, 0, 0.08)',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {[0, 1, 2].map(i => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ y: [0, -8, 0] }}
                                                    transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "easeInOut" }}
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                                        borderRadius: '50%',
                                                        boxShadow: '0 2px 6px rgba(255, 87, 34, 0.3)'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>

                        {/* Premium Input Area */}
                        <div style={{
                            padding: '1.5rem 2rem 2rem',
                            background: '#f8f9fc',
                            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {/* Options Grid */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: '0.8rem',
                                width: '100%'
                            }}>
                                {currentQuestion.type === 'select' && !isTyping && (
                                    (typeof currentQuestion.options === 'function' ? currentQuestion.options(formData) : currentQuestion.options).map((opt, index) => (
                                        <motion.button
                                            key={opt}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{
                                                scale: 1.05,
                                                background: 'linear-gradient(135deg, rgba(255,87,34,0.12) 0%, rgba(255,138,80,0.08) 100%)',
                                                borderColor: 'rgba(255, 87, 34, 0.3)',
                                                boxShadow: '0 8px 24px rgba(255, 87, 34, 0.15), 0 2px 8px rgba(255, 87, 34, 0.08)'
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSend(opt)}
                                            style={{
                                                padding: '1rem 1.5rem',
                                                borderRadius: '16px',
                                                background: '#ffffff',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(0, 0, 0, 0.08)',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '0.95rem',
                                                color: '#2d3748',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)',
                                                textAlign: 'center',
                                                flex: '1 1 200px'
                                            }}
                                        >
                                            {opt}
                                        </motion.button>
                                    ))
                                )}

                                {currentQuestion.type === 'action' && !isTyping && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: '0 20px 40px rgba(255, 87, 34, 0.3), 0 8px 16px rgba(255, 87, 34, 0.2)'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleComplete}
                                        style={{
                                            gridColumn: '1 / -1',
                                            padding: '1.5rem 3rem',
                                            borderRadius: '20px',
                                            background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                            color: '#fff',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: 800,
                                            fontSize: '1.15rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.8rem',
                                            boxShadow: '0 12px 32px rgba(255, 87, 34, 0.25), 0 4px 12px rgba(255, 87, 34, 0.15)',
                                            margin: '0 auto',
                                            maxWidth: '400px'
                                        }}
                                    >
                                        {currentQuestion.label} <Rocket size={22} />
                                    </motion.button>
                                )}
                            </div>

                            {currentQuestion.type === 'text' && !isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        maxWidth: '100%',
                                        width: '100%'
                                    }}
                                >
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder={currentQuestion.placeholder}
                                        autoFocus
                                        style={{
                                            flex: 1,
                                            padding: '1.3rem 1.8rem',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(0, 0, 0, 0.1)',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(10px)',
                                            fontSize: '1rem',
                                            color: '#1a1a1a',
                                            outline: 'none',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(255, 87, 34, 0.4)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                                            e.target.style.boxShadow = '0 8px 24px rgba(255, 87, 34, 0.12), 0 2px 8px rgba(255, 87, 34, 0.08)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)';
                                        }}
                                    />
                                    <motion.button
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: '0 12px 32px rgba(255, 87, 34, 0.3), 0 4px 12px rgba(255, 87, 34, 0.2)'
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleSend()}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '20px',
                                            background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)',
                                            border: 'none',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 8px 24px rgba(255, 87, 34, 0.25), 0 2px 8px rgba(255, 87, 34, 0.15)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <Send size={24} />
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </>
                )}
            </motion.div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                input::placeholder {
                    color: rgba(0, 0, 0, 0.35);
                }
                /* Custom Scrollbar */
                div::-webkit-scrollbar {
                    width: 8px;
                }
                div::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.03);
                    border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                    background: rgba(255, 87, 34, 0.3);
                    border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 87, 34, 0.5);
                }
                /* Mobile Responsive */
                @media (max-width: 768px) {
                    div[style*="gridTemplateColumns"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>

            {/* ULTRA-PREMIUM Cinematic Loading Experience */}
            <AnimatePresence>
                {isGenerating && (
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
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10000,
                            padding: '2rem',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Animated Particle Background */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [Math.random() * window.innerHeight, -100],
                                    x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2
                                }}
                                style={{
                                    position: 'absolute',
                                    width: '4px',
                                    height: '4px',
                                    borderRadius: '50%',
                                    background: `rgba(255, ${87 + Math.random() * 50}, ${34 + Math.random() * 50}, 0.6)`,
                                    boxShadow: '0 0 10px rgba(255, 87, 34, 0.4)'
                                }}
                            />
                        ))}

                        {/* Pulsing Rings */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={`ring-${i}`}
                                animate={{
                                    scale: [1, 2.5, 1],
                                    opacity: [0.3, 0, 0.3]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 1
                                }}
                                style={{
                                    position: 'absolute',
                                    width: '400px',
                                    height: '400px',
                                    borderRadius: '50%',
                                    border: '2px solid rgba(255, 87, 34, 0.3)',
                                    pointerEvents: 'none'
                                }}
                            />
                        ))}

                        <motion.div
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            style={{
                                background: '#ffffff',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                borderRadius: '32px',
                                padding: '4rem 3.5rem',
                                maxWidth: '550px',
                                width: '100%',
                                textAlign: 'center',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Animated Gradient Overlay */}
                            <motion.div
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 20% 50%, rgba(255,87,34,0.15) 0%, transparent 50%)',
                                        'radial-gradient(circle at 80% 50%, rgba(255,87,34,0.15) 0%, transparent 50%)',
                                        'radial-gradient(circle at 50% 80%, rgba(255,87,34,0.15) 0%, transparent 50%)',
                                        'radial-gradient(circle at 20% 50%, rgba(255,87,34,0.15) 0%, transparent 50%)'
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 0
                                }}
                            />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                {/* 3D Rotating Rocket */}
                                <motion.div
                                    animate={{
                                        y: [0, -20, 0],
                                        rotateY: [0, 360],
                                        rotateZ: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                        rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                                        rotateZ: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    style={{
                                        width: '110px',
                                        height: '110px',
                                        margin: '0 auto 2.5rem',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #ff5722 0%, #ff8a50 50%, #ff5722 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 20px 60px rgba(255, 87, 34, 0.6), 0 0 40px rgba(255, 87, 34, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.2)',
                                        position: 'relative',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {/* Glow effect */}
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            background: 'radial-gradient(circle, rgba(255,87,34,0.4) 0%, transparent 70%)',
                                            filter: 'blur(20px)'
                                        }}
                                    />
                                    <Rocket size={50} color="white" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
                                </motion.div>

                                {/* Cinematic Title */}
                                <motion.h2
                                    key={generationStage}
                                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.5, type: "spring" }}
                                    style={{
                                        fontSize: '2rem',
                                        fontWeight: 900,
                                        background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        marginBottom: '1rem',
                                        lineHeight: 1.2,
                                        letterSpacing: '-0.02em'
                                    }}
                                >
                                    {generationStage === 0 && '🧠 Analyzing Your Profile'}
                                    {generationStage === 1 && '🎯 Identifying Your Goals'}
                                    {generationStage === 2 && '🗺️ Mapping Learning Path'}
                                    {generationStage === 3 && '⚡ Optimizing Timeline'}
                                    {generationStage === 4 && '✨ Finalizing Roadmap'}
                                </motion.h2>

                                {/* Subtitle with typing effect */}
                                <motion.p
                                    key={`desc-${generationStage}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                    style={{
                                        fontSize: '1.05rem',
                                        color: '#4a5568',
                                        marginBottom: '3rem',
                                        lineHeight: 1.6,
                                        fontWeight: 500
                                    }}
                                >
                                    {generationStage === 0 && 'Processing your experience and background...'}
                                    {generationStage === 1 && 'Understanding your career aspirations...'}
                                    {generationStage === 2 && 'Creating personalized learning modules...'}
                                    {generationStage === 3 && 'Adjusting based on your availability...'}
                                    {generationStage === 4 && 'Preparing your custom roadmap...'}
                                </motion.p>

                                {/* Premium Progress Bar */}
                                <div style={{
                                    width: '100%',
                                    height: '12px',
                                    background: '#f1f5f9',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    marginBottom: '2.5rem',
                                    border: 'none',
                                    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
                                }}>
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(generationStage + 1) * 20}%` }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        style={{
                                            height: '100%',
                                            background: 'linear-gradient(90deg, #ff5722 0%, #ff8a50 50%, #ffb74d 100%)',
                                            borderRadius: '20px',
                                            boxShadow: '0 0 20px rgba(255, 87, 34, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            animate={{ x: ['-100%', '200%'] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '50%',
                                                height: '100%',
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Animated Stage Icons */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '1rem',
                                    marginBottom: '2.5rem'
                                }}>
                                    {[Brain, Target, Rocket, Sparkles, CheckCircle2].map((Icon, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0.7, opacity: 0.2 }}
                                            animate={{
                                                scale: generationStage >= index ? [1, 1.2, 1] : 0.7,
                                                opacity: generationStage >= index ? 1 : 0.2,
                                                rotateY: generationStage >= index ? [0, 360] : 0
                                            }}
                                            transition={{
                                                scale: { duration: 0.5 },
                                                opacity: { duration: 0.3 },
                                                rotateY: { duration: 0.6, ease: "easeOut" }
                                            }}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '14px',
                                                background: generationStage >= index
                                                    ? 'linear-gradient(135deg, #ff5722 0%, #ff8a50 100%)'
                                                    : '#f1f5f9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: generationStage >= index ? 'white' : '#94a3b8',
                                                boxShadow: generationStage >= index
                                                    ? '0 10px 30px rgba(255, 87, 34, 0.5)'
                                                    : 'none',
                                                border: '1px solid ' + (generationStage >= index ? 'rgba(255, 87, 34, 0.2)' : 'rgba(0,0,0,0.05)'),
                                                transformStyle: 'preserve-3d'
                                            }}
                                        >
                                            <Icon size={24} />
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Large Percentage with Glow */}
                                <motion.div
                                    key={`percent-${generationStage}`}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4, type: "spring", bounce: 0.5 }}
                                    style={{
                                        fontSize: '4rem',
                                        fontWeight: 900,
                                        background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        marginBottom: '0.5rem',
                                        letterSpacing: '-0.03em'
                                    }}
                                >
                                    {(generationStage + 1) * 20}%
                                </motion.div>

                                <motion.p
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    style={{
                                        fontSize: '0.95rem',
                                        color: '#64748b',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Creating Your Premium Journey
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
