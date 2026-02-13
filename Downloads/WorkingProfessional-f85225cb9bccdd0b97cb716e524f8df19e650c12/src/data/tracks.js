export const OUTCOMES = [
    {
        id: "ai_orchestrator",
        title: "AI Orchestrator",
        description: "Transition into AI-driven product management or leadership.",
        icon: "🎯",
        track: "AI Strategy & Leadership"
    },
    {
        id: "growth_hacker",
        title: "High-Growth Leap",
        description: "Secure a 50%+ hike and a role at a top-tier tech firm using AI efficiency.",
        icon: "🚀",
        track: "AI-Driven Professional Growth"
    },
    {
        id: "domain_pioneer",
        title: "Domain Pioneer",
        description: "Apply AI to your specific niche (FinTech, HealthTech) to lead innovation.",
        icon: "💡",
        track: "Applied AI for Industry Experts"
    },
    {
        id: "global_nomad",
        title: "Global AI Nomad",
        description: "Secure remote AI engineering or consulting roles for US/European companies.",
        icon: "🌍",
        track: "Global AI Consulting & Engineering"
    },
    {
        id: "founder",
        title: "0 to 1 Founder",
        description: "Build and launch your own AI-powered startup from scratch.",
        icon: "🏗️",
        track: "AI Entrepreneurship"
    }
];

export const TRACKS = {
    "AI Strategy & Leadership": {
        levels: [
            {
                id: "lvl1",
                title: "Level 1: AI-Ready Professional (Foundations)",
                modules: [
                    {
                        id: "m1",
                        title: "AI-Ready Professional",
                        why: "Before: \"AI is confusing. I don’t know what to trust.\"\nAfter: \"I understand AI basics and I can use it safely.\"\nYou become: someone who can speak AI + get clean outputs.\nProof: 20 prompts + 10 ways AI fits your job.",
                        content: "Mastering Gen AI begins with understanding the 'Engine' versus the 'UI'. In 2026, the utility isn't about knowing a specific tool, but understanding LLM architecture, context windows, and tokenization. You must learn to differentiate between deterministic and probabilistic outputs to use AI safely in business critical tasks.",

                        insights: "• AI is a tool of augmentation, not replacement.\n• Strategic utility beats brute-force prompting.\n• Context is the most valuable currency in 2026.",
                        interviewQuestions: [
                            "How do you ensure AI outputs are grounded in reality?",
                            "What is your framework for choosing between different LLM models for a specific task?"
                        ],
                        diagnosticQuiz: {
                            questions: [{
                                question: "What is the primary difference between a 'Context Window' and 'Tokenization'?",
                                options: [
                                    "Context window limits memory; Tokenization is how text is broken down.",
                                    "They are the same thing.",
                                    "Tokenization limits memory; Context window is for UI.",
                                    "Context window is the speed; Tokenization is the costs."
                                ],
                                answer: 0
                            }]
                        },
                        assessmentQuiz: {
                            questions: [{
                                question: "Which approach minimizes hallucinations in LLM outputs?",
                                options: [
                                    "Asking nicely",
                                    "System Prompting + Few-Shot Examples",
                                    "Using longer prompts with no structure",
                                    "Restarting the chat"
                                ],
                                answer: 1
                            }]
                        }
                    }
                ]
            },
            {
                id: "lvl2",
                title: "Level 2: Productivity Power User (Reliable Outputs)",
                modules: [
                    {
                        id: "m2",
                        title: "Productivity Power User",
                        why: "Before: \"Sometimes AI helps, sometimes it’s garbage.\"\nAfter: \"I have a repeatable system to produce quality.\"\nYou become: faster, more consistent, less dependent on mood.\nProof: role-based prompt pack + personal AI workflow SOP.",
                        content: "Elite productivity in the AI era comes from 'Process Extraction'. You will learn to map your current manual workflows and identify friction points where AI can provide 10x leverage. This module focuses on building a 'Library of Action'—a set of reusable, high-fidelity prompts and agents tailored to your vertical.",

                        insights: "• Mood-independent productivity via SOPs.\n• Prompt engineering is actually 'Requirement Engineering'.\n• Repeatability is the hallmark of a pro.",
                        interviewQuestions: [
                            "Describe a workflow you've automated and the specific ROI achieved.",
                            "How do you maintain quality control when using AI for bulk tasks?"
                        ],
                        diagnosticQuiz: {
                            questions: [{
                                question: "What is the core benefit of a 'System Operating Procedure' (SOP) in AI workflows?",
                                options: [
                                    "It makes AI slower",
                                    "It ensures consistent, high-quality results every time",
                                    "It's only for large teams",
                                    "It prevents the need for any prompts"
                                ],
                                answer: 1
                            }]
                        },
                        assessmentQuiz: {
                            questions: [{
                                question: "What is 'Role-Based Prompting'?",
                                options: [
                                    "Giving the AI a professional persona to narrow its probability space",
                                    "Asking the AI what its job is",
                                    "Hiring someone to prompt for you",
                                    "Using AI for acting roles"
                                ],
                                answer: 0
                            }]
                        }
                    }
                ]
            },
            {
                id: "lvl3",
                title: "Level 3: Context-Driven Performer (RAG + Company Knowledge)",
                modules: [
                    {
                        id: "m3",
                        title: "Context-Driven Performer",
                        why: "Before: \"AI gives generic answers.\"\nAfter: \"My AI answers using my documents and my context.\"\nYou become: the person who can build “company brain” assistants.\nProof: one RAG bot blueprint (SOP / policy / playbook bot).",
                        locked: true,
                        diagnosticQuiz: { questions: [{ question: "What is the main purpose of Retrieval-Augmented Generation (RAG)?", options: ["To make models faster", "To ground AI outputs in specific company data", "To generate better code", "To replace manual search completely"], answer: 1 }] },
                        assessmentQuiz: { questions: [{ question: "Which component is necessary for a basic RAG implementation?", options: ["A vector database", "A faster internet connection", "A new GPU", "More training data"], answer: 0 }] }
                    }
                ]
            },
            {
                id: "lvl4",
                title: "Level 4: Content & Communication Accelerator (GenAI Studio)",
                modules: [
                    {
                        id: "m4",
                        title: "Content & Communication Accelerator",
                        why: "Before: \"Content needs a designer, editor, video guy.\"\nAfter: \"I can create image/video/audio assets myself.\"\nYou become: a one-person content studio.\nProof: 10 creatives + 2 videos + 2 voiceovers (role-based).",
                        locked: true,
                        diagnosticQuiz: { questions: [{ question: "How does GenAI accelerate content creation workflows?", options: ["By replacing writers entirely", "By reducing the draft-to-final cycle time", "By only creating text", "By increasing costs"], answer: 1 }] },
                        assessmentQuiz: { questions: [{ question: "Which tool type is used for AI-driven visual asset generation?", options: ["Large Language Models", "Diffusion Models", "Regression Models", "Spreadsheets"], answer: 1 }] }
                    }
                ]
            },
            {
                id: "lvl5",
                title: "Level 5 — Stakeholder Influence Builder (AI Presentations)",
                modules: [
                    {
                        id: "m5",
                        title: "Stakeholder Influence Builder",
                        why: "Before: \"I have ideas, but I can’t pitch them well.\"\nAfter: \"I can turn ideas into decks that get approvals.\"\nYou become: someone who can influence stakeholders.\nProof: 10-slide impact deck (problem → plan → ROI).",
                        locked: true,
                        diagnosticQuiz: { questions: [{ question: "What is the key to creating impactful AI-assisted presentations?", options: ["Using more animations", "Focusing on ROI and strategic problem-solving", "Putting more text on slides", "Using the most expensive tools"], answer: 1 }] },
                        assessmentQuiz: { questions: [{ question: "An impact deck for stakeholders should primarily prove:", options: ["That you know AI buzzwords", "The technical complexity of the model", "The business value and time saved", "That you can use AI images"], answer: 2 }] }
                    }
                ]
            },
            {
                id: "lvl6",
                title: "Level 6 — Insights-Driven Operator (Dashboards + Decisions)",
                modules: [
                    {
                        id: "m6",
                        title: "Insights-Driven Operator",
                        why: "Before: \"We make decisions based on gut feeling.\"\nAfter: \"I track KPIs and generate insights that move action.\"\nYou become: the person leadership listens to.\nProof: one KPI dashboard + weekly insight report format.",
                        locked: true,
                        diagnosticQuiz: { questions: [{ question: "Why is tracking KPIs essential for AI-driven operations?", options: ["To make dashboards look good", "To validate AI effectiveness and guide decisions", "To meet company requirements only", "To use more data storage"], answer: 1 }] },
                        assessmentQuiz: { questions: [{ question: "An 'Insights-Driven' report differs from a standard report by:", options: ["Having more colors", "Providing actionable recommendations based on data", "Being longer", "Using AI to write everything"], answer: 1 }] }
                    }
                ]
            },
            {
                id: "lvl7",
                title: "Level 7 — Automation & Agent Practitioner (Workflows + Agents)",
                modules: [
                    {
                        id: "m7",
                        title: "Automation & Agent Practitioner",
                        why: "Before: \"My time gets wasted in follow-ups, reports, repetitive tasks.\"\nAfter: \"My workflows run automatically with minimal effort.\"\nYou become: the person who can build “company brain” assistants.\nProof: 2 automations + 1 agent plan that reduces repetitive work.",
                        locked: true,
                        diagnosticQuiz: { questions: [{ question: "What distinguishes an AI 'Agent' from a standard automation?", options: ["Agents can make autonomous decisions based on goals", "Automations are faster", "Agents always use APIs", "There is no difference"], answer: 0 }] },
                        assessmentQuiz: { questions: [{ question: "A primary use case for AI Agents in business is:", options: ["Creating decorative images", "Managing multi-step workflows like follow-ups", "Typing faster", "Gaming"], answer: 1 }] }
                    }
                ]
            },
            {
                id: "lvl8",
                title: "Level 8 — AI Specialist in Your Role (Capstone + Portfolio)",
                modules: [
                    {
                        id: "m8",
                        title: "AI Specialist / Capstone",
                        why: "Before: \"I know AI generally, but not how to apply it deeply.\"\nAfter: \"I use AI like a specialist in my function.\"\nYou become: AI-First [Marketing/Ops/Sales/Finance/Data/HR] Operator\nProof (Capstone Bundle):\n- 1 RAG assistant for your role\n- 1 automation/agent workflow\n- 1 dashboard\n- 1 pitch deck to present it",
                        locked: true,
                        diagnosticQuiz: { questions: [{ question: "What is the primary goal of the AI Specialist Capstone?", options: ["To memorize AI concepts", "To demonstrate deep application of AI in a specific role", "To build a social media profile", "To write a long essay"], answer: 1 }] },
                        assessmentQuiz: { questions: [{ question: "A successful Capstone portfolio should include:", options: ["Only AI-generated text", "A RAG assistant, an automation, and a business case", "A list of tools", "Many certificates"], answer: 1 }] }
                    }
                ]
            },
        ]
    }
};
