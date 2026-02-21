import React from 'react';
import {
    Zap,
    Target,
    TrendingUp,
    ShieldCheck,
    Rocket,
    BrainCircuit,
    Users,
    Briefcase
} from 'lucide-react';

export const modules = [
    {
        id: 1,
        title: "The Reality Check",
        status: "FREE",
        description: "Understand what Gen AI really is in 2026—not the hype, but the actual industry utility.",
        topics: [
            "What this role ACTUALLY requires in industry",
            "Skills that matter vs noise",
            "Common mistakes beginners make",
            "Career examples (Realistic vs Hype)"
        ],
        icon: <Target style={{ width: '40px', height: '40px' }} />,
        color: "#ff5722",
        locked: false,
        path: "/day1"
    },
    {
        id: 2,
        title: "Direction & Motivation",
        status: "FREE",
        description: "Map your journey from where you are to your dream CTC and role.",
        topics: [
            "Career paths: Entry → Mid → Senior",
            "Salary reality & growth ranges",
            "What top tier companies expect",
            "AI-generated Personal Roadmap"
        ],
        icon: <TrendingUp style={{ width: '40px', height: '40px' }} />,
        color: "#f48b36",
        locked: true,
        path: "/day2"
    },
    {
        id: 3,
        title: "Advanced Skill Building",
        status: "PAID",
        description: "Master the technical depth needed to build production-ready AI systems.",
        topics: [
            "High-end RAG architecture",
            "Vector database orchestration",
            "Multi-agent system design",
            "Cost & Performance optimization"
        ],
        icon: <Zap style={{ width: '40px', height: '40px' }} />,
        color: "#7c3aed",
        locked: true,
        skills: ["RAG", "Pinecone", "LangChain", "OpenAI API"],
        jobs: ["AI Engineer", "Platform Architect"]
    },
    {
        id: 4,
        title: "Interview & Portfolio Elite",
        status: "PAID",
        description: "Build a portfolio that recruiters can't ignore and clear high-stakes interviews.",
        topics: [
            "Real-world capstone projects",
            "Interview prep with AI mentors",
            "Personal brand building on LinkedIn",
            "Demo Day with hiring partners"
        ],
        icon: <Rocket style={{ width: '40px', height: '40px' }} />,
        color: "#ec4899",
        locked: true,
        skills: ["Personal Branding", "System Design"],
        jobs: ["Product Leader", "Founding Engineer"]
    },
    {
        id: 5,
        title: "Leadership & Future Proofing",
        status: "PAID",
        description: "Scale from a specialist to a leader who can manage AI teams and strategy.",
        topics: [
            "AI Product Management",
            "Ethics & Governance",
            "Team Orchestration",
            "Strategic ROI of Gen AI"
        ],
        icon: <ShieldCheck style={{ width: '40px', height: '40px' }} />,
        color: "#10b981",
        locked: true,
        skills: ["AI Strategy", "Ethics", "Leadership"],
        jobs: ["Head of AI", "Chief AI Officer"]
    }
];
