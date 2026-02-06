import CodeBlock from '../components/CodeBlock';
import LinkBlock from '../components/LinkBlock';
import chatgptIcon from '../assets/icons/chatgpt.png';
import geminiIcon from '../assets/icons/gemini.png';
import midjourneyIcon from '../assets/icons/midjourney.png';

export const day1Content = [
    {
        id: "intro-basics",
        title: "1. Introduction & AI Basics",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Why This Session Exists</h3>
                <p><strong>What this session is about:</strong> Explaining what AI actually is and how to use it correctly at work.</p>
                <p><strong>Why it is needed:</strong> AI tools are already in offices, but usage without understanding leads to wrong answers, blind trust, and mistakes.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>What you should gain:</strong>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                        <li>Understand how AI works (basics)</li>
                        <li>Ask AI better questions</li>
                        <li>Know when AI should NOT be used</li>
                    </ul>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Who This Session Is For</h3>
                <p>HR, Marketing, Sales, Operations, Finance, Managers, and Founders.</p>
                <p style={{ fontStyle: 'italic' }}>Note: No coding, maths, or technical background required. AI is treated as a work tool.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. What Is Artificial Intelligence (AI)?</h3>
                <p><strong>Definition:</strong> Machines doing tasks that normally require human intelligence.</p>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <li>Google Maps routes</li>
                    <li>Netflix recommendations</li>
                    <li>Face unlock</li>
                </ul>
                <p style={{ marginTop: '1rem' }}><strong>What AI is NOT:</strong> It does not think, feel, or look like a human. It works using patterns and data.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>D. What Is Generative AI?</h3>
                <p><strong>Definition:</strong> AI that creates new content instead of only analyzing data.</p>
                <p><strong>Can create:</strong> Text (emails), Images (posters), Code, Ideas.</p>
                <CodeBlock language="GENAI EXAMPLES" code={`ChatGPT writing an email
Canva AI creating a poster
AI suggesting content ideas`} />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>E. Traditional Software vs GenAI</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Traditional Software</th>
                                <th style={{ padding: '0.5rem' }}>Generative AI</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>Fixed rules</td>
                                <td style={{ padding: '0.5rem' }}>Learns from data</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>Same input → Same output</td>
                                <td style={{ padding: '0.5rem' }}>Same input → Different outputs</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>Key difference: Software follows rules; GenAI follows patterns.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>F. How GenAI Works (Big Picture)</h3>
                <p>User gives input (prompt) → AI processes → AI gives output.</p>
                <CodeBlock language="WORKFLOW EXAMPLE" code={`Input:
"Write an email asking for leave"

Output:
"A complete email draft"`} />
                <p style={{ marginTop: '1rem' }}><strong>Important truth:</strong> AI is guessing the next best word, not thinking.</p>
            </>
        )
    },
    {
        id: "how-genai-works",
        title: "2. How GenAI Works (Technical)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Machine Learning (ML)</h3>
                <p>How computers learn from examples instead of being programmed step-by-step.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Analogy:</strong> A child learns what a dog is by seeing many dogs. AI learns patterns by seeing many examples.
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Data → Patterns → Prediction</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    <li><strong>Data:</strong> Emails, Documents, Images.</li>
                    <li><strong>Patterns:</strong> Common words, sentence styles.</li>
                    <li><strong>Prediction:</strong> Predicting what comes next (e.g., email ending "Best regards").</li>
                </ul>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. Parameters / Weights</h3>
                <p>Internal numbers inside the model acting like "volume controls" or "importance sliders". They decide which patterns matter more.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>D. Neural Networks</h3>
                <p>System inspired by the human brain (Input Layer → Hidden Layers → Output Layer).</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/neural-networks-explainer/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>Neural Network Pipeline</a>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>E. Large Language Models (LLMs)</h3>
                <p><strong>Large:</strong> Huge text data. <strong>Language:</strong> Works with text. <strong>Model:</strong> Pattern prediction system.</p>
                <p style={{ fontStyle: 'italic' }}>Examples: ChatGPT, Gemini, Claude.</p>
            </>
        )
    },
    {
        id: "key-concepts",
        title: "3. Key Concepts (Tokens & Limits)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Tokens</h3>
                <p>Small pieces of text used by AI (not always full words).</p>
                <CodeBlock language="TOKENIZATION" code={`Sentence: "AI helps people work faster"
Tokens: [AI] [helps] [people] [work] [faster]`} />
                <p>Important because costs and limits depend on tokens.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://simulation-gen-ai.vercel.app/token-explainer" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>Tokenizer & Context Window</a>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Context Window</h3>
                <p>How much information AI can remember at one time (like short-term memory).</p>
                <p style={{ fontStyle: 'italic' }}>Limitation: In very long conversations, AI may forget older instructions.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. Hallucinations</h3>
                <p>When AI gives a confident but incorrect answer.</p>
                <CodeBlock language="HALLUCINATION EXAMPLES" code={`- Wrong dates
- Fake references
- Incorrect facts`} />
                <p style={{ color: '#ff5722', fontWeight: 600, marginTop: '1rem' }}>Rule: Always double-check important outputs.</p>
            </>
        )
    },
    {
        id: "capabilities-limitations",
        title: "4. Capabilities & Limitations",
        content: (
            <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>A. What AI Is Good At</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                            <li>Writing drafts</li>
                            <li>Rewriting content</li>
                            <li>Summarizing documents</li>
                            <li>Generating ideas</li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>B. What AI Is Bad At</h3>
                        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                            <li>Exact calculations</li>
                            <li>Legal decisions</li>
                            <li>Confidential data</li>
                            <li>Real-time info</li>
                        </ul>
                    </div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '2rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-workplace-guide/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>LLMs Are Good At vs Not Good At</a>
                </div>
            </>
        )
    },
    {
        id: "prompt-engineering",
        title: "5. Prompt Engineering",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. What Is a Prompt?</h3>
                <p>A prompt is what you ask AI to do.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-prompt-clarity/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>LLM Prompt Clarity</a>
                </div>
                <CodeBlock language="PROMPT COMPARISON" code={`Bad Prompt:
"Write email"

Good Prompt:
"Write a professional email asking my manager for 2 days leave, polite tone, short length."`} />

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Prompt Engineering</h3>
                <p>Asking AI clearly and correctly. Like giving instructions to a junior employee.</p>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-template-library/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>Reusable Prompt Templates</a>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>C. Prompt Structure (Important)</h3>
                <CodeBlock language="PROMPT FRAMEWORK" code={`1. Role: "You are an HR manager"
2. Context: "Company has 20 employees"
3. Task: "Write a job description"
4. Constraints: "Professional, short"
5. Output Format: "Email, bullet points"`} />
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/prompt-framework/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>Prompt Framework Builder</a>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-prompt-refiner/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>LLM Prompt Refiner</a>
                </div>
            </>
        )
    },
    {
        id: "model-settings",
        title: "6. Model Settings",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Temperature</h3>
                <p>Controls creativity level.</p>
                <CodeBlock language="TEMPERATURE SETTINGS" code={`Low Temp (0.1): "Resume writing" (Serious, Factual)
High Temp (0.8): "Marketing ideas" (Creative, Expressive)`} />
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-model-settings/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>Model Settings Explained Visually</a>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Max Tokens</h3>
                <p>Controls how long the AI response can be.</p>
                <CodeBlock language="MAX TOKENS" code={`Low value → short answer
High value → long explanation`} />
            </>
        )
    },
    {
        id: "applications-tools",
        title: "7. Applications & Tools",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Industry Applications</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>HR:</strong> JDs, Interview Qs, Policy summaries
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>Marketing:</strong> Ad copy, Content ideas, Captions
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>Sales:</strong> Follow-ups, Proposals
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>Operations:</strong> SOPs, Checklists, Meeting notes
                    </div>
                    <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                        <strong>Finance:</strong> Reports, Explaining numbers
                    </div>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-role-uses/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>LLM Role Uses</a>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-ops-finance-leadership/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>AI for Operations Teams</a>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. AI Tools</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li><strong>Chat:</strong> ChatGPT, Gemini (Writing & Thinking)</li>
                    <li><strong>Research:</strong> Perplexity (Sources)</li>
                    <li><strong>Docs:</strong> Notion AI, Google Docs AI</li>
                </ul>
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-tool-landscape/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>AI Tools: Who is best at what</a>
                </div>
            </>
        )
    },
    {
        id: "practice-takeaways",
        title: "8. Practice & Takeaways",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>A. Mini Practice (Hands-On)</h3>
                <CodeBlock language="HANDS ON" code={`1. Pick a real work task
2. Ask AI clearly
3. Improve the prompt
4. Compare outputs`} />
                <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
                    <strong>Interactive Visualization:</strong> <a href="https://ml-neural-networks.vercel.app/llm-prompt-exercise/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff5722' }}>Let's try this for real (3 minutes)</a>
                </div>
                <p style={{ fontStyle: 'italic', marginTop: '1rem' }}>Purpose: Reduce fear, build confidence.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>B. Final Takeaway</h3>
                <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                    <p style={{ margin: '0.5rem 0' }}>AI is a tool, not magic.</p>
                    <p style={{ margin: '0.5rem 0' }}>AI follows patterns, not truth.</p>
                    <p style={{ margin: '0.5rem 0' }}>Humans remain responsible.</p>
                    <p style={{ color: '#ff5722', fontWeight: 600, marginTop: '1.5rem', fontSize: '1.1rem' }}>"AI will not replace you. People who understand AI will."</p>
                </div>
            </>
        )
    }
];

export const day2Content = [
    {
        id: "level2-opening",
        title: "1. Level 2 Opening & Context",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Session Title</h3>
                <p>Applying GenAI at Work: Visuals, Bots, Agents & Career Edge</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>What This Day Is About</h3>
                <p><strong>Moving from:</strong> Just using AI</p>
                <p><strong>To:</strong> Designing AI-powered workflows</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>What You'll Learn Today</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li>Create professional visuals using AI</li>
                    <li>Understand AI bots (Custom GPTs)</li>
                    <li>Learn what AI agents really are</li>
                    <li>See real workflows used in companies</li>
                    <li>Understand the AI Generalist role</li>
                </ul>
            </>
        )
    },
    {
        id: "visual-genai",
        title: "2. Why Visuals Matter at Work",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Why Visuals Are No Longer Optional</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li>People skim before reading</li>
                    <li>Visuals improve understanding & recall</li>
                    <li>Leaders expect clarity, not long text</li>
                </ul>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Where Visuals Are Used</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li>Presentations</li>
                    <li>LinkedIn posts</li>
                    <li>Internal communication</li>
                    <li>Marketing campaigns</li>
                </ul>
            </>
        )
    },
    {
        id: "ai-bots",
        title: "3. Custom GPTs (AI Bots)",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>What Is a Custom GPT?</h3>
                <p>An AI with a fixed role and instructions.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Examples</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li>HR policy assistant</li>
                    <li>Marketing copy assistant</li>
                    <li>Sales follow-up assistant</li>
                </ul>
            </>
        )
    },
    {
        id: "agentic-ai",
        title: "4. Agentic AI",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>What Is an AI Agent?</h3>
                <p>AI that can: Sense → Think → Act</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Prompt vs Agent</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Prompt</th>
                                <th style={{ padding: '0.5rem' }}>Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>One-time response</td>
                                <td style={{ padding: '0.5rem' }}>Multi-step workflow</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '0.5rem' }}>Answering a question</td>
                                <td style={{ padding: '0.5rem' }}>Acting like an intern</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    },
    {
        id: "ai-generalist",
        title: "5. AI Generalist Role",
        content: (
            <>
                <h3 style={{ fontSize: '1.4rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Who Is the AI Generalist?</h3>
                <p>The AI person inside a team.</p>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Core Skills</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li>Prompting</li>
                    <li>Visual AI</li>
                    <li>Custom GPTs</li>
                    <li>Agents & workflows</li>
                </ul>

                <h3 style={{ fontSize: '1.4rem', marginTop: '2rem', marginBottom: '1rem' }}>Career Outcome</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}>
                    <li>Higher visibility</li>
                    <li>More influence</li>
                    <li>Faster growth</li>
                </ul>
            </>
        )
    }
];
