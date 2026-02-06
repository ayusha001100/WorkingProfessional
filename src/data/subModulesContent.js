export const SUB_MODULES_CONTENT = {
    lvl1: {
        'lvl1_sub1': {
            id: 'lvl1_sub1',
            title: '1. Introduction & AI Basics',
            sections: [
                {
                    title: 'A. Why This Session Exists',
                    content: [
                        {
                            text: '**What this session is about:** Explaining what AI actually is and how to use it correctly at work.'
                        },
                        {
                            text: '**Why it is needed:** AI tools are already in offices, but usage without understanding leads to wrong answers, blind trust, and mistakes.'
                        },
                        {
                            subtitle: 'What you should gain:'
                        },
                        {
                            list: [
                                'Understand how AI works (basics)',
                                'Ask AI better questions',
                                'Know when AI should NOT be used'
                            ]
                        }
                    ]
                },
                {
                    title: 'B. Who This Session Is For',
                    content: [
                        {
                            text: 'HR, Marketing, Sales, Operations, Finance, Managers, and Founders.'
                        },
                        {
                            note: 'No coding, maths, or technical background required. AI is treated as a work tool.'
                        }
                    ]
                },
                {
                    title: 'C. What Is Artificial Intelligence (AI)?',
                    content: [
                        {
                            text: 'Definition: Machines doing tasks that normally require human intelligence.'
                        },
                        {
                            list: [
                                'Google Maps routes',
                                'Netflix recommendations',
                                'Face unlock'
                            ]
                        },
                        {
                            text: '**What AI is NOT:** It does not think, feel, or look like a human. It works using patterns and data.'
                        }
                    ]
                },
                {
                    title: 'D. What Is Generative AI?',
                    content: [
                        {
                            text: 'Definition: AI that creates new content instead of only analyzing data.'
                        },
                        {
                            text: '**Can create:** Text (emails), Images (posters), Code, Ideas.'
                        },
                        {
                            example: {
                                title: 'GENAI EXAMPLES',
                                input: 'Examples of Generative AI:',
                                output: 'ChatGPT writing an email\nCanva AI creating a poster\nAI suggesting content ideas'
                            }
                        }
                    ]
                },
                {
                    title: 'E. Traditional Software vs GenAI',
                    content: [
                        {
                            table: {
                                headers: ['Traditional Software', 'Generative AI'],
                                rows: [
                                    ['Fixed rules', 'Learns from data'],
                                    ['Same input → Same output', 'Same input → Different outputs']
                                ]
                            }
                        },
                        {
                            note: 'Key difference: Software follows rules; GenAI follows patterns.'
                        }
                    ]
                },
                {
                    title: 'F. How GenAI Works (Big Picture)',
                    content: [
                        {
                            text: 'User gives input (prompt) → AI processes → AI gives output.'
                        },
                        {
                            example: {
                                title: 'WORKFLOW EXAMPLE',
                                input: 'Input:\n"Write an email asking for leave"',
                                output: 'Output:\n"A complete email draft"'
                            }
                        },
                        {
                            text: '**Important truth:** AI is guessing the next best word, not thinking.'
                        }
                    ]
                }
            ]
        },
        'lvl1_sub2': {
            id: 'lvl1_sub2',
            title: '2. How GenAI Works (Technical)',
            sections: [
                {
                    title: 'A. Machine Learning (ML)',
                    content: [
                        {
                            text: 'How computers learn from examples instead of being programmed step-by-step.'
                        },
                        {
                            note: 'Analogy: A child learns what a dog is by seeing many dogs. AI learns patterns by seeing many examples.'
                        }
                    ]
                },
                {
                    title: 'B. Data → Patterns → Prediction',
                    content: [
                        {
                            list: [
                                '**Data:** Emails, Documents, Images.',
                                '**Patterns:** Common words, sentence styles.',
                                '**Prediction:** Predicting what comes next (e.g., email ending "Best regards").'
                            ]
                        }
                    ]
                },
                {
                    title: 'C. Parameters / Weights',
                    content: [
                        {
                            text: 'Internal numbers inside the model acting like "volume controls" or "importance sliders". They decide which patterns matter more.'
                        }
                    ]
                },
                {
                    title: 'D. Neural Networks',
                    content: [
                        {
                            text: 'System inspired by the human brain (Input Layer → Hidden Layers → Output Layer).'
                        },
                        {
                            visualization: {
                                title: 'Neural Network Pipeline',
                                link: 'https://ml-neural-networks.vercel.app/neural-networks-explainer/'
                            }
                        }
                    ]
                },
                {
                    title: 'E. Large Language Models (LLMs)',
                    content: [
                        {
                            text: '**Large:** Huge text data. **Language:** Works with text. **Model:** Pattern prediction system.'
                        },
                        {
                            note: 'Examples: ChatGPT, Gemini, Claude.'
                        }
                    ]
                }
            ]
        },
        'lvl1_sub3': {
            id: 'lvl1_sub3',
            title: '3. Key Concepts (Tokens & Limits)',
            sections: [
                {
                    title: 'A. Tokens',
                    content: [
                        {
                            text: 'Small pieces of text used by AI (not always full words).'
                        },
                        {
                            example: {
                                title: 'TOKENIZATION',
                                input: 'Sentence: "AI helps people work faster"',
                                output: 'Tokens: [AI] [helps] [people] [work] [faster]'
                            }
                        },
                        {
                            text: 'Important because costs and limits depend on tokens.'
                        },
                        {
                            visualization: {
                                title: 'Tokenizer & Context Window',
                                link: 'https://simulation-gen-ai.vercel.app/token-explainer'
                            }
                        }
                    ]
                },
                {
                    title: 'B. Context Window',
                    content: [
                        {
                            text: 'How much information AI can remember at one time (like short-term memory).'
                        },
                        {
                            note: 'Limitation: In very long conversations, AI may forget older instructions.'
                        }
                    ]
                },
                {
                    title: 'C. Hallucinations',
                    content: [
                        {
                            text: 'When AI gives a confident but incorrect answer.'
                        },
                        {
                            example: {
                                title: 'HALLUCINATION EXAMPLES',
                                input: 'Common types of hallucinations:',
                                output: '- Wrong dates\n- Fake references\n- Incorrect facts'
                            }
                        },
                        {
                            quote: 'Rule: Always double-check important outputs.'
                        }
                    ]
                }
            ]
        },
        'lvl1_sub4': {
            id: 'lvl1_sub4',
            title: '4. Capabilities & Limitations',
            sections: [
                {
                    title: 'A. What AI Is Good At',
                    content: [
                        {
                            list: [
                                'Writing drafts',
                                'Rewriting content',
                                'Summarizing documents',
                                'Generating ideas'
                            ]
                        }
                    ]
                },
                {
                    title: 'B. What AI Is Bad At',
                    content: [
                        {
                            list: [
                                'Exact calculations',
                                'Legal decisions',
                                'Confidential data',
                                'Real-time info'
                            ]
                        },
                        {
                            visualization: {
                                title: 'LLMs Are Good At vs Not Good At',
                                link: 'https://ml-neural-networks.vercel.app/llm-workplace-guide/'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl1_sub5': {
            id: 'lvl1_sub5',
            title: '5. Prompt Engineering',
            sections: [
                {
                    title: 'A. What Is a Prompt?',
                    content: [
                        {
                            text: 'A prompt is what you ask AI to do.'
                        },
                        {
                            visualization: {
                                title: 'LLM Prompt Clarity',
                                link: 'https://ml-neural-networks.vercel.app/llm-prompt-clarity/'
                            }
                        },
                        {
                            example: {
                                title: 'PROMPT COMPARISON',
                                input: 'Bad Prompt:\n"Write email"',
                                output: 'Good Prompt:\n"Write a professional email asking my manager for 2 days leave, polite tone, short length."'
                            }
                        }
                    ]
                },
                {
                    title: 'B. Prompt Engineering',
                    content: [
                        {
                            text: 'Asking AI clearly and correctly. Like giving instructions to a junior employee.'
                        },
                        {
                            visualization: {
                                title: 'Reusable Prompt Templates',
                                link: 'https://ml-neural-networks.vercel.app/llm-template-library/'
                            }
                        }
                    ]
                },
                {
                    title: 'C. Prompt Structure (Important)',
                    content: [
                        {
                            example: {
                                title: 'PROMPT FRAMEWORK',
                                input: 'The 5 key elements:',
                                output: '1. Role: "You are an HR manager"\n2. Context: "Company has 20 employees"\n3. Task: "Write a job description"\n4. Constraints: "Professional, short"\n5. Output Format: "Email, bullet points"'
                            }
                        },
                        {
                            visualization: {
                                title: 'Prompt Framework Builder',
                                link: 'https://ml-neural-networks.vercel.app/prompt-framework/'
                            }
                        },
                        {
                            visualization: {
                                title: 'LLM Prompt Refiner',
                                link: 'https://ml-neural-networks.vercel.app/llm-prompt-refiner/'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl1_sub6': {
            id: 'lvl1_sub6',
            title: '6. Model Settings',
            sections: [
                {
                    title: 'A. Temperature',
                    content: [
                        {
                            text: 'Controls creativity level.'
                        },
                        {
                            example: {
                                title: 'TEMPERATURE SETTINGS',
                                input: 'Low Temp (0.1): "Resume writing" (Serious, Factual)',
                                output: 'High Temp (0.8): "Marketing ideas" (Creative, Expressive)'
                            }
                        },
                        {
                            visualization: {
                                title: 'Model Settings Explained Visually',
                                link: 'https://ml-neural-networks.vercel.app/llm-model-settings/'
                            }
                        }
                    ]
                },
                {
                    title: 'B. Max Tokens',
                    content: [
                        {
                            text: 'Controls how long the AI response can be.'
                        },
                        {
                            example: {
                                title: 'MAX TOKENS',
                                input: 'Low value → short answer',
                                output: 'High value → long explanation'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl1_sub7': {
            id: 'lvl1_sub7',
            title: '7. Applications & Tools',
            sections: [
                {
                    title: 'A. Industry Applications',
                    content: [
                        {
                            table: {
                                headers: ['Department', 'Use Cases'],
                                rows: [
                                    ['HR', 'JDs, Interview Qs, Policy summaries'],
                                    ['Marketing', 'Ad copy, Content ideas, Captions'],
                                    ['Sales', 'Follow-ups, Proposals'],
                                    ['Operations', 'SOPs, Checklists, Meeting notes'],
                                    ['Finance', 'Reports, Explaining numbers']
                                ]
                            }
                        },
                        {
                            visualization: {
                                title: 'LLM Role Uses',
                                link: 'https://ml-neural-networks.vercel.app/llm-role-uses/'
                            }
                        },
                        {
                            visualization: {
                                title: 'AI for Operations Teams',
                                link: 'https://ml-neural-networks.vercel.app/llm-ops-finance-leadership/'
                            }
                        }
                    ]
                },
                {
                    title: 'B. AI Tools',
                    content: [
                        {
                            list: [
                                '**Chat:** ChatGPT, Gemini (Writing & Thinking)',
                                '**Research:** Perplexity (Sources)',
                                '**Docs:** Notion AI, Google Docs AI'
                            ]
                        },
                        {
                            visualization: {
                                title: 'AI Tools: Who is best at what',
                                link: 'https://ml-neural-networks.vercel.app/llm-tool-landscape/'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl1_sub8': {
            id: 'lvl1_sub8',
            title: '8. Practice & Takeaways',
            sections: [
                {
                    title: 'A. Mini Practice (Hands-On)',
                    content: [
                        {
                            example: {
                                title: 'HANDS ON',
                                input: 'Steps to practice:',
                                output: '1. Pick a real work task\n2. Ask AI clearly\n3. Improve the prompt\n4. Compare outputs'
                            }
                        },
                        {
                            visualization: {
                                title: "Let's try this for real (3 minutes)",
                                link: 'https://ml-neural-networks.vercel.app/llm-prompt-exercise/'
                            }
                        },
                        {
                            note: 'Purpose: Reduce fear, build confidence.'
                        }
                    ]
                },
                {
                    title: 'B. Final Takeaway',
                    content: [
                        {
                            list: [
                                'AI is a tool, not magic.',
                                'AI follows patterns, not truth.',
                                'Humans remain responsible.'
                            ]
                        },
                        {
                            quote: '"AI will not replace you. People who understand AI will."'
                        }
                    ]
                }
            ]
        }
    },
    lvl2: {
        'lvl2_sub1': {
            id: 'lvl2_sub1',
            title: 'LEVEL 2',
            sections: [
                {
                    title: 'Session Title',
                    content: [
                        {
                            text: 'Applying GenAI at Work: Visuals, Bots, Agents & Career Edge'
                        }
                    ]
                },
                {
                    title: "What You'll Learn Today",
                    content: [
                        {
                            list: [
                                'Create professional visuals using AI',
                                'Understand AI bots (Custom GPTs)',
                                'Learn what AI agents really are',
                                'See real workflows used in companies',
                                'Understand the AI Generalist role'
                            ]
                        }
                    ]
                },
                {
                    title: 'Level 2 Agenda',
                    content: [
                        {
                            list: [
                                'Visual GenAI & storytelling',
                                'AI tools for images & video',
                                'Hands-on visual creation',
                                'Custom GPTs (AI bots)',
                                'Agentic AI & workflows',
                                'AI Generalist role',
                                'Q&A + next steps'
                            ]
                        }
                    ]
                }
            ]
        },
        'lvl2_sub2': {
            id: 'lvl2_sub2',
            title: 'Why Visuals Matter at Work',
            sections: [
                {
                    title: 'Why Visuals Are No Longer Optional',
                    content: [
                        {
                            list: [
                                'People skim before reading',
                                'Visuals improve understanding & recall',
                                'Leaders expect clarity, not long text'
                            ]
                        },
                        {
                            text: '**Used in:** Presentations, LinkedIn posts, Internal communication, Marketing campaigns.'
                        }
                    ]
                },
                {
                    title: 'Before AI vs After AI',
                    content: [
                        {
                            table: {
                                headers: ['Before', 'After'],
                                rows: [
                                    ['Dependency on designers', 'Anyone can create visuals'],
                                    ['Slow iterations', 'Faster execution'],
                                    ['High effort', 'Better communication']
                                ]
                            }
                        },
                        {
                            note: 'Example: HR creates a hiring visual in 10 minutes.'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub3': {
            id: 'lvl2_sub3',
            title: 'Intro to Visual GenAI',
            sections: [
                {
                    title: 'Definition',
                    content: [
                        {
                            text: 'Definition: AI that creates images or videos from text or images.'
                        }
                    ]
                },
                {
                    title: 'Modes',
                    content: [
                        {
                            list: [
                                'Text → Image',
                                'Image → Image',
                                'Text → Video'
                            ]
                        },
                        {
                            text: '**Where Visual GenAI Is Used:** LinkedIn creatives, Slide hero images, Event posters, Campaign banners.'
                        }
                    ]
                },
                {
                    title: 'Example',
                    content: [
                        {
                            example: {
                                title: 'IMAGE PROMPT',
                                input: 'Example Prompt:',
                                output: '"Create a modern LinkedIn visual for a leadership workshop"'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl2_sub4': {
            id: 'lvl2_sub4',
            title: 'Diffusion Models (Intuition)',
            sections: [
                {
                    title: 'How AI Generates Images',
                    content: [
                        {
                            text: 'Starts from random noise → Gradually removes noise → Guided by prompt instructions.'
                        },
                        {
                            note: 'Analogy: Clearing fog from a glass window.'
                        }
                    ]
                },
                {
                    title: 'Why Prompts Matter for Images',
                    content: [
                        {
                            text: 'Prompt controls: Style, Mood, Clarity.'
                        },
                        {
                            example: {
                                title: 'PROMPT STYLING',
                                input: 'Style example:',
                                output: '"Flat illustration, corporate style, blue palette, minimal icons"'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl2_sub5': {
            id: 'lvl2_sub5',
            title: 'Visual Storytelling',
            sections: [
                {
                    title: 'Why Story Matters',
                    content: [
                        {
                            text: '**Random visuals =** confusion.'
                        },
                        {
                            text: '**Story-based visuals =** clarity.'
                        }
                    ]
                },
                {
                    title: 'Simple Visual Story Framework',
                    content: [
                        {
                            text: 'Hook → Problem → Solution → Outcome'
                        },
                        {
                            example: {
                                title: 'LINKEDIN POST EXAMPLE',
                                input: 'Hook: "Hiring is broken"\nProblem: Too many resumes',
                                output: 'Solution: AI screening\nOutcome: Faster hiring'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl2_sub6': {
            id: 'lvl2_sub6',
            title: 'AI Tools Overview (Images)',
            sections: [
                {
                    title: 'Image Tool Landscape',
                    content: [
                        {
                            list: [
                                '**DALL·E:** Best for business visuals.',
                                '**Midjourney:** High aesthetics, artistic.',
                                '**Stable Diffusion:** Customizability.',
                                '**Canva AI:** Templates & team collaboration.'
                            ]
                        },
                        {
                            quote: 'Rule: Choose tool based on outcome, not hype.'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub7': {
            id: 'lvl2_sub7',
            title: 'AI Tools Overview (Video)',
            sections: [
                {
                    title: 'Video Generation Tools',
                    content: [
                        {
                            list: [
                                'Runway',
                                'Pika',
                                'Canva Video AI'
                            ]
                        },
                        {
                            text: '**Common Use-Cases:** Static poster → animated reel, Text → explainer video, Presentation → short video.'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub8': {
            id: 'lvl2_sub8',
            title: 'Hands-On Visual Creation',
            sections: [
                {
                    title: 'Instructions',
                    content: [
                        {
                            list: [
                                '1. Pick a real work use-case',
                                '2. Write a structured prompt',
                                '3. Generate and refine output'
                            ]
                        },
                        {
                            note: 'Time-Bound: 3–5 minutes.'
                        },
                        {
                            text: '**Before vs After:** Weak prompt → average output; Clear prompt → professional output.'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub9': {
            id: 'lvl2_sub9',
            title: 'Custom GPTs (AI Bots)',
            sections: [
                {
                    title: 'What is a Custom GPT?',
                    content: [
                        {
                            text: 'AI with fixed role and instructions.'
                        },
                        {
                            example: {
                                title: 'COMPARISON',
                                input: 'General chat: Generic help',
                                output: 'Custom GPT: Specialist help (e.g., "HR Policy Assistant")'
                            }
                        },
                        {
                            text: '**Examples:** HR policy assistant, Marketing copy assistant, Sales follow-up assistant.'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub10': {
            id: 'lvl2_sub10',
            title: 'Components of a Custom GPT',
            sections: [
                {
                    title: 'Core Components',
                    content: [
                        {
                            list: [
                                '**Instructions:** Role & behavior.',
                                '**Knowledge:** Documents, PDFs.',
                                '**Tools/Actions:** Web browsing, logic.',
                                '**Guardrails:** What it must NOT do (prevent incorrect advice).'
                            ]
                        },
                        {
                            quote: 'Example: Sales GPT refuses to promise discounts.'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub11': {
            id: 'lvl2_sub11',
            title: 'Prompt Structure for Custom GPTs',
            sections: [
                {
                    title: 'GPT Instruction Framework',
                    content: [
                        {
                            text: 'Role definition → Tone and style → Allowed tasks → Boundaries → Output format.'
                        },
                        {
                            example: {
                                title: 'GPT INSTRUCTION',
                                input: 'Example:',
                                output: '"You are an HR assistant. Always ask for missing details. Never guess policy information."'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl2_sub12': {
            id: 'lvl2_sub12',
            title: 'Agentic AI',
            sections: [
                {
                    title: 'What is an AI Agent?',
                    content: [
                        {
                            text: 'AI that can **Sense → Think → Act**.'
                        }
                    ]
                },
                {
                    title: 'Prompt vs Agent',
                    content: [
                        {
                            example: {
                                title: 'PROMPT VS AGENT',
                                input: 'Prompt: One response (Answering a question)',
                                output: 'Agent: Multi-step workflow (Intern following a checklist)'
                            }
                        }
                    ]
                }
            ]
        },
        'lvl2_sub13': {
            id: 'lvl2_sub13',
            title: 'Agent Workflow Example',
            sections: [
                {
                    title: 'Simple Agent Flow',
                    content: [
                        {
                            example: {
                                title: 'AUTOMATION FLOW',
                                input: '1. New row added in Google Sheet\n↓\n2. AI summarizes information',
                                output: '↓\n3. Sends summary to Slack or Email'
                            }
                        },
                        {
                            text: '**Tool mention:** make.com (logic-focused, not technical).'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub14': {
            id: 'lvl2_sub14',
            title: 'AI Generalist Role',
            sections: [
                {
                    title: 'The "AI Person" Inside a Team',
                    content: [
                        {
                            text: '**Key Skills:** Prompting, Visual AI, Custom GPTs, Agents & Workflows.'
                        }
                    ]
                },
                {
                    title: 'Executive AI Generalist',
                    content: [
                        {
                            text: 'Focus on: Business impact, ROI, Risk management.'
                        },
                        {
                            note: 'Outcome: Higher visibility, More influence, Career acceleration.'
                        }
                    ]
                }
            ]
        },
        'lvl2_sub15': {
            id: 'lvl2_sub15',
            title: '15 & 16. Q&A and Next Steps',
            sections: [
                {
                    title: 'Q&A Discussion',
                    content: [
                        {
                            text: 'Tool selection, Privacy, Career impact, Company adoption.'
                        }
                    ]
                },
                {
                    title: 'Today vs Next 12 Weeks',
                    content: [
                        {
                            list: [
                                '**Today:** Awareness & Confidence',
                                '**12 Weeks:** Real Capability & Leadership'
                            ]
                        },
                        {
                            visualization: {
                                title: 'Ask Me Anything: AI @ Work',
                                url: 'https://ml-neural-networks.vercel.app/llm-ama-qa/'
                            }
                        },
                        {
                            visualization: {
                                title: 'Today vs The Next 12 Weeks',
                                url: 'https://ml-neural-networks.vercel.app/llm-skill-journey/'
                            }
                        }
                    ]
                },
                {
                    title: 'Program Structure',
                    content: [
                        {
                            text: 'Foundations → Tools → Hands-on projects → Agents & automation.'
                        },
                        {
                            quote: '"Understanding AI is good.\nApplying AI is powerful.\nLeading with AI changes careers."'
                        }
                    ]
                }
            ]
        }
    }
};
