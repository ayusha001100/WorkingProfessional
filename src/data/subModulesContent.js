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
                    title: 'The Shift from Basics to Mastery',
                    content: [
                        {
                            text: 'Welcome to Level 2. While Level 1 focused on understanding the "what" and "why" of Generative AI, Level 2 is about the **"how"**. We move from simple chat interactions to building assets, automating workflows, and understanding the architecture of AI agents.'
                        },
                        {
                            quote: '"The competitive advantage is no longer just using AI, but how deeply you integrate it into your specific domain."'
                        }
                    ]
                },
                {
                    title: "What You'll Master Today",
                    content: [
                        {
                            list: [
                                'Professional Visual Creation: From static images to dynamic video content.',
                                'AI Bots (Custom GPTs): Building specialized tools for your precise work needs.',
                                'Agentic AI: Moving beyond prompts to multi-step autonomous systems.',
                                'The AI Generalist Career Path: Positioning yourself as a leader in the AI era.',
                                'Real-World Automation: Integrating AI into your existing software stack.'
                            ]
                        }
                    ]
                },
                {
                    title: 'Level 2 Deep Dive Agenda',
                    content: [
                        {
                            list: [
                                'The Psychology of Visuals: Why text alone is failing in the attention economy.',
                                'Tool Stack Mastery: DALL-E 3, Midjourney v6, Runway Gen-2, and Pika Labs.',
                                'Persona Engineering: Crafting instructions that give Custom GPTs a "brain".',
                                'Sense-Think-Act Framework: Understanding the DNA of an AI Agent.',
                                'End-to-End Workflows: Case studies from HR, Marketing, and Operations.',
                                'The AI Generalist Roadmap: Your 12-week transformation plan.'
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
                    title: 'Competing in the Attention Economy',
                    content: [
                        {
                            text: 'In today\'s workplace, information overload is the default. Your peers and leaders are bombarded with emails, Slack messages, and reports.'
                        },
                        {
                            list: [
                                '**The 3-Second Rule:** People decide whether to engage with your content in under 3 seconds. Visuals grab that attention.',
                                '**Cognitive Load:** The brain processes images 60,000 times faster than text.',
                                '**Retention:** Users remember only 10% of what they hear, but 65% of what they see and hear.'
                            ]
                        }
                    ]
                },
                {
                    title: 'Practical Work Scenarios',
                    content: [
                        {
                            text: 'Visuals aren\'t just for designers. They are for anyone who needs to influence or explain:'
                        },
                        {
                            list: [
                                '**Strategic Roadmaps:** Turning a 10-page doc into a single, clear timeline.',
                                '**Internal Announcements:** Using a hero image to make an update feel "important".',
                                '**Client Presentations:** Moving away from bullet points to evocative storytelling visuals.',
                                '**Personal Branding:** Standing out on LinkedIn with consistent, high-quality imagery.'
                            ]
                        }
                    ]
                },
                {
                    title: 'The AI Revolution: Before vs After',
                    content: [
                        {
                            table: {
                                headers: ['Dimension', 'Traditional (Before AI)', 'Modern (With GenAI)'],
                                rows: [
                                    ['Dependency', 'Heavily dependent on designers/agencies', 'Empowered individuals create the core assets'],
                                    ['Speed', 'Days or weeks for a single iteration', 'Seconds to minutes for dozens of variations'],
                                    ['Cost', 'High per-asset cost, requiring budget approval', 'Near-zero marginal cost (software subscription)'],
                                    ['Expertise', 'Requires 5+ years of software mastery (PS/AI)', 'Requires clear intent and prompting skills'],
                                    ['Accessibility', 'Limited to creative teams', 'Accessible to HR, Sales, Ops, and Leadership']
                                ]
                            }
                        },
                        {
                            note: 'Case Study: An HR Manager previously spent $500 on a recruiting graphic; now they generate 5 variations in 2 minutes for free.'
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
                    title: 'Defining the Landscape',
                    content: [
                        {
                            text: 'Visual Generative AI is a subset of GenAI focused on creating or editing visual media (images, videos, 3D models) using natural language prompts.'
                        }
                    ]
                },
                {
                    title: 'The Core Modalitites',
                    content: [
                        {
                            list: [
                                '**Text-to-Image:** Defining a scene in words and getting a high-fidelity image.',
                                '**Image-to-Image:** Modifying an existing photo (e.g., "Make this photo look like a cinematic sketch").',
                                '**In-painting/Out-painting:** Adding or removing elements from an existing visual.',
                                '**Text-to-Video:** Generating short, cinematic clips from a single sentence description.'
                            ]
                        }
                    ]
                },
                {
                    title: 'Enterprise Use Cases',
                    content: [
                        {
                            table: {
                                headers: ['Category', 'Specific Examples'],
                                rows: [
                                    ['Marketing', 'Ad banners, Blog headers, Social media carousels'],
                                    ['Inside Sales', 'Custom visuals that mirror the client\'s industry'],
                                    ['Product', 'Mockups, Storyboards for features, UI inspirations'],
                                    ['HR & Culture', 'Event posters, Values-based visuals, Team stickers']
                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'From Prompt to Masterpiece',
                    content: [
                        {
                            example: {
                                title: 'ADVANCED VISUAL PROMPTING',
                                input: 'Simple: "A man in a suit working"',
                                output: 'Pro: "A 3D isometric flat-style illustration of a modern office professional, vibrant blue and orange palette, clean lines, high contrast, professional lighting, 8k resolution, cinematic look."'
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
                    title: 'Cracking the Code: How it Works',
                    content: [
                        {
                            text: 'Most modern image AI (Midjourney, DALL-E, Stable Diffusion) uses a technique called **Diffusion**. It is fundamentally different from how humans draw.'
                        }
                    ]
                },
                {
                    title: 'The 3-Step Process',
                    content: [
                        {
                            list: [
                                '**1. The Noise Layer:** The AI starts with a grid of random, colorful static (like a TV with no signal).',
                                '**2. The Prompt Guide:** Your prompt acts as a "magnetic field" that tells the AI where certain patterns should emerge.',
                                '**3. The Denoising Loop:** In iterative steps, the AI "clears the fog," identifying shapes and textures until a clear image is formed.'
                            ]
                        },
                        {
                            note: 'Intuition: Think of a sculptor finding a statue inside a block of marble. The "noise" is the marble, and your "prompt" is the blueprint for the sculpture.'
                        }
                    ]
                },
                {
                    title: 'Why Prompt Engineering for Images is Different',
                    content: [
                        {
                            text: 'Unlike text, image AI doesn\'t understand "logic" as well as it understands "look". You must describe:'
                        },
                        {
                            list: [
                                '**Subject:** What is in the image?',
                                '**Medium:** Is it a photo, a painting, a sketch, or a 3D renders?',
                                '**Style:** Is it Cyberpunk, Minimalism, or Impressionism?',
                                '**Lighting:** Is it Golden Hour, Studio Lighting, or Neon?',
                                '**Camera:** Is it a Wide Shot, Close-up, or Fisheye?'
                            ]
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
                    title: 'The Anti-Stock Photography Movement',
                    content: [
                        {
                            text: 'Generic stock photos (e.g., people shaking hands) are invisible to our brains. We have learned to ignore them. AI allows us to create **Custom Visual Narratives**.'
                        }
                    ]
                },
                {
                    title: 'The 4-Part Visual Framework',
                    content: [
                        {
                            list: [
                                '**1. The Hook:** A visual that represents the "Status Quo" or a "Shocking Truth".',
                                '**2. The Conflict:** A visual showing the pain point or the complexity of the current problem.',
                                '**3. The Transformation:** A visual bridge showing the "Solution" in action.',
                                '**4. The Reward:** the "After" state. Clarity, success, and outcome.'
                            ]
                        }
                    ]
                },
                {
                    title: 'Case Study: The "Broken Process" Slide',
                    content: [
                        {
                            example: {
                                title: 'STORYTELLING WITH AI',
                                input: 'Old Way: A bulleted list of 5 things wrong with the hiring process.',
                                output: 'New Way: A custom AI image of a "bureaucratic maze" with a person feeling lost, followed by an image of a "clear gold path" leading to the right talent.'
                            }
                        },
                        {
                            quote: '"Visual storytelling is about making the abstract feel concrete."'
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
                    title: 'Building Your Visual Toolbox',
                    content: [
                        {
                            text: 'Not all tools are created equal. Choosing the right tool for the job is a key skill of the AI Generalist.'
                        }
                    ]
                },
                {
                    title: 'Tool Comparison',
                    content: [
                        {
                            table: {
                                headers: ['Tool', 'Best For', 'Learning Curve'],
                                rows: [
                                    ['**DALL-E 3**', 'Precision, following complex text precisely, easy access (ChatGPT)', 'Beginner'],
                                    ['**Midjourney**', 'Absolute highest aesthetic quality, artistic control, cinematic feel', 'Intermediate'],
                                    ['**Stable Diffusion**', 'Maximum control, running locally, specialized "fine-tuning"', 'Expert'],
                                    ['**Canva Magic Media**', 'Quick layouts, non-creative types, templates integration', 'Beginner'],
                                    ['**Adobe Firefly**', 'Editing existing assets, commercial safety (licensed data)', 'Intermediate']
                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'The "Winner" Mentality',
                    content: [
                        {
                            text: 'Don\'t get married to one tool. Midjourney might be great for your LinkedIn banner, but DALL-E is better if you need a diagram with specific text on a whiteboard.'
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
                    title: 'The Next Frontier: Generative Video',
                    content: [
                        {
                            text: 'Video is the most engaging medium, but traditionally the hardest to produce. AI is changing the cost/time equation by 100x.'
                        }
                    ]
                },
                {
                    title: 'Key Technologies',
                    content: [
                        {
                            list: [
                                '**Runway (Gen-2):** The industry leader for cinematic realism and physics-aware video.',
                                '**Pika Labs:** Amazing for animation, stylistic consistency, and ease of use.',
                                '**Luma Dream Machine:** High-resolution realistic motion from text or images.'
                            ]
                        }
                    ]
                },
                {
                    title: 'Modern Video Workflows',
                    content: [
                        {
                            list: [
                                '**Animate Your Headshots:** Turn a static team photo into a subtle moving background.',
                                '**Explainer B-Roll:** Instead of buying stock footage, generate clips that match your script exactly.',
                                '**Product Cinematography:** Creating 2-second "eye candy" clips of products for social media ads.'
                            ]
                        },
                        {
                            note: 'Current Limitation: AI video is best for short clips (2-5 seconds) and atmospheric shots, not yet for long narrative films.'
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
                    title: 'Workshop: Your First AI Brand Asset',
                    content: [
                        {
                            text: 'Theory is nothing without application. Let\'s build something you can actually use tomorrow.'
                        }
                    ]
                },
                {
                    title: 'Step-by-Step Execution',
                    content: [
                        {
                            list: [
                                '**Phase 1 (The Why):** Define your goal. Are you announcing a new policy? Pitching a new client? Celebrate a team win?',
                                '**Phase 2 (The Prompt):** Use the "Subject-Style-Lighting" framework we learned.',
                                '**Phase 3 (The Generation):** Run at least 4 variations in DALL-E or Midjourney.',
                                '**Phase 4 (The Polish):** Use an "Upscaler" or background remover to make it look studio-grade.'
                            ]
                        }
                    ]
                },
                {
                    title: 'Example Task',
                    content: [
                        {
                            text: 'Task: Create a hero image for a deck titled "The Future of our Marketing Strategy 2026".'
                        },
                        {
                            example: {
                                title: 'PROMPT EXPERIMENT',
                                input: 'Attempt 1: "Marketing future 2026"',
                                output: 'Attempt 2: "A cinematic wide shot of a futuristic marketing control room, holograms showing growth trends, neon accents, soft lighting, hyper-realistic, 8k."'
                            }
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
                    title: 'Moving Beyond Generalists',
                    content: [
                        {
                            text: 'ChatGPT is a generalist—good at everything, master of nothing. A **Custom GPT** is a bespoke version of AI trained on **your** instructions and **your** knowledge.'
                        }
                    ]
                },
                {
                    title: 'Why Organizations are Building These',
                    content: [
                        {
                            list: [
                                '**Consistency:** Ensuring every employee gets the same answer about company policy.',
                                '**Privacy:** Using internal data that the public AI doesn\'t have access to.',
                                '**Efficiency:** Automating tasks that require specific, repeated steps (e.g., "Formatting this weekly report").'
                            ]
                        }
                    ]
                },
                {
                    title: 'Practical Work Examples',
                    content: [
                        {
                            table: {
                                headers: ['Role', 'Custom GPT Use-Case'],
                                rows: [
                                    ['HR Manager', 'L&D Curriculum Assistant (suggests courses based on role)'],
                                    ['Financial Analyst', 'Quarterly Report Summarizer (trained on specific balance sheet styles)'],
                                    ['Sales Leader', 'Objection Handler (trained on past winning sales calls)'],
                                    ['Ops Manager', 'Slack Policy Bot (answers questions about internal communication rules)']
                                ]
                            }
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
                    title: 'The Anatomy of a Specialized Bot',
                    content: [
                        {
                            text: 'Building a great bot is $10\%$ configuration and $90\%$ thinking. Here is how it\'s broken down:'
                        }
                    ]
                },
                {
                    title: 'The Four Pillars',
                    content: [
                        {
                            list: [
                                '**1. System Instructions (The Brain):** The "Persona" and "Rules" of the bot. This is where you define tone, logic, and limitations.',
                                '**2. Knowledge Files (The Memory):** You can upload PDFs, Excel files, or Text files. The bot will "search" these before answering.',
                                '**3. Capabilities (The Senses):** Does it need to browse the web? Generate images? Run Python code for data analysis?',
                                '**4. Actions (The Hands):** Can it talk to other apps like Gmail, Jira, or Salesforce? (Advanced feature).'
                            ]
                        }
                    ]
                },
                {
                    title: 'Design Philosophy: Guardrails',
                    content: [
                        {
                            text: 'A dangerous bot is one that "guesses". A professional bot is one that says "I don\'t know because it isn\'t in the knowledge files."'
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
                    title: 'Mastering "System Prompting"',
                    content: [
                        {
                            text: 'The instructions for a Custom GPT are longer and more structured than a regular prompt. You are essentially "coding with English".'
                        }
                    ]
                },
                {
                    title: 'The "CARE" Framework',
                    content: [
                        {
                            list: [
                                '**Context:** Who are you? (e.g., "You are an expert McKinsey consultant").',
                                '**Action:** What is your primary task? (e.g., "Audit these marketing plans for ROI").',
                                '**Rules:** What are the constraints? (e.g., "Always use metric system. Never mention competitors").',
                                '**Example:** What does a "good" output look like? (Provide a sample format).'
                            ]
                        }
                    ]
                },
                {
                    title: 'Example Instruction Set',
                    content: [
                        {
                            example: {
                                title: 'THE "POLICY BOT" INSTRUCTION',
                                input: 'Poor: "Help people with HR stuff."',
                                output: '"Role: You are the HR policy bot for ABC Corp.\nKnowledge: Use ONLY the uploaded EmployeeManual.pdf.\nRules: If a question is about salary, redirect to the CFO. Use a friendly but professional tone. Answer in bullet points."'
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
                    title: 'The Future is Autonomous',
                    content: [
                        {
                            text: 'If a **Prompt** is a "one-off conversation", an **Agent** is a "coworker with a goal". Agents don\'t just talk; they **execute**.'
                        }
                    ]
                },
                {
                    title: 'Sense → Think → Act',
                    content: [
                        {
                            text: 'The fundamental loop of an AI Agent:'
                        },
                        {
                            list: [
                                '**Sense:** Detect a change (e.g., "A new customer email has arrived").',
                                '**Think:** Evaluate against goals (e.g., "Is this a complaint or a lead?").',
                                '**Act:** Execute tools (e.g., "Draft a response AND create a ticket in Zendesk").'
                            ]
                        }
                    ]
                },
                {
                    title: 'Why it Matters for Your Career',
                    content: [
                        {
                            text: 'The task of the future isn\'t "Writing Emails" (Prompting). It is "Designing the System that handles emails" (Agentic Architecture).'
                        },
                        {
                            quote: '"The person who builds the agent is 10x more valuable than the person who just uses the chatbot."'
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
                    title: 'De-mystifying Automation',
                    content: [
                        {
                            text: 'Agents aren\'t magic; they are logical sequences. Let\'s look at a "Sales Research Agent" workflow.'
                        }
                    ]
                },
                {
                    title: 'The Sequential Workflow',
                    content: [
                        {
                            table: {
                                headers: ['Step', 'Action', 'Tool Used'],
                                rows: [
                                    ['1. Trigger', 'New lead signs up on website', 'Zapier / Webhook'],
                                    ['2. Research', 'Agent browses their LinkedIn and company website', 'Perplexity API'],
                                    ['3. Synthesis', 'Agent creates a "Personality Profile" of the lead', 'GPT-4o'],
                                    ['4. Action', 'Agent drafts a hyper-personalized email in Gmail DRAFTS', 'Custom GPT']
                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'The "Logic-First" Approach',
                    content: [
                        {
                            text: 'The best agents use **Low-Code** tools like Make.com or Zapier to connect the "Brain" (AI) to the "Body" (other apps).'
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
                    title: 'Becoming Invaluable',
                    content: [
                        {
                            text: 'Every company is currently desperate for someone who knows how to apply AI to business problems. This person is the **AI Generalist**.'
                        }
                    ]
                },
                {
                    title: 'The 4 Skill Pillars',
                    content: [
                        {
                            list: [
                                '**Prompt Engineering (Language):** Managing the LLMs.',
                                '**Visual AI (Media):** Creating high-fidelity assets.',
                                '**Bot Architecture (Specialization):** Building custom tools.',
                                '**Workflow Design (Automation):** connecting tools into agents.'
                            ]
                        }
                    ]
                },
                {
                    title: 'Visibility & Career Growth',
                    content: [
                        {
                            text: 'An AI Generalist follows the **"High Impact, Low Effort"** rule. They find the tasks that take for hours and turn them into 2-minute workflows, making themselves indispensable.'
                        },
                        {
                            note: 'Self-Check: Are you the one asking "Can AI do this?" or the one showing "Here is how AI is already doing this for us"?'
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
                    title: 'Synthesizing Your Learning',
                    content: [
                        {
                            text: 'You have moved from "Chatting with AI" to "Leading with AI". This is a lifetime shift in how you work.'
                        },
                        {
                            list: [
                                '**Reflection:** Which area (Visuals, Bots, or Agents) will you apply on Monday?',
                                '**Risk Management:** Always remember HR/Legal compliance before deploying agents.'
                            ]
                        }
                    ]
                },
                {
                    title: 'The 12-Week Transformation',
                    content: [
                        {
                            table: {
                                headers: ['Phase', 'Focus', 'Milestone'],
                                rows: [
                                    ['Weeks 1-2', 'Asset Creation', 'Complete visual branding for a project'],
                                    ['Weeks 3-6', 'Tool Specialization', 'Build 3 Custom GPTs for your team'],
                                    ['Weeks 7-10', 'Workflow Automation', 'Automate one repetitive multi-app task'],
                                    ['Weeks 11-12', 'Leadership', 'Present your "AI Roadmap" to your manager']
                                ]
                            }
                        }
                    ]
                },
                {
                    title: 'Final Parting Thought',
                    content: [
                        {
                            quote: '"The future doesn\'t belong to the ones who built the AI. It belongs to the ones who were brave enough to apply it first."'
                        }
                    ]
                }
            ]
        }
    }
};
