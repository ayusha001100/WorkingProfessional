import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import OpenAI from 'openai';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// JSON DB path
const DB_PATH = path.join(__dirname, 'db.json');

// Helper to read DB
const readDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        const initialData = { users: {}, sessions: {} };
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('DB Read Error:', error);
        return { users: {}, sessions: {} };
    }
};

// Helper to write DB
const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('DB Write Error:', error);
    }
};

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // For local dev
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: true,
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000, // Increased for dev
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Configure multer
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 25 * 1024 * 1024 }
});

// Ensure directories exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// --- Auth & User Endpoints ---

app.post('/api/auth/google-mock', (req, res) => {
    const { email, displayName, photoURL, uid } = req.body;
    const db = readDB();

    if (!db.users[uid]) {
        db.users[uid] = {
            uid,
            email,
            name: displayName || '',
            photoURL,
            createdAt: new Date().toISOString(),
            progress: { completedSections: [], completedQuizzes: [] },
            stats: { totalPoints: 0, totalCorrect: 0, totalIncorrect: 0 },
            onboardingCompleted: false,
            role: 'user'
        };
        writeDB(db);
    }

    res.json({ success: true, user: db.users[uid] });
});

app.get('/api/users/:uid', (req, res) => {
    const db = readDB();
    const user = db.users[req.params.uid];
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.put('/api/users/:uid', (req, res) => {
    const db = readDB();
    if (db.users[req.params.uid]) {
        db.users[req.params.uid] = { ...db.users[req.params.uid], ...req.body };
        writeDB(db);
        res.json({ success: true, user: db.users[req.params.uid] });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.post('/api/users/:uid/progress', (req, res) => {
    const { sectionId, type, points = 0 } = req.body;
    const db = readDB();
    const user = db.users[req.params.uid];

    if (user) {
        if (!user.progress) user.progress = { completedSections: [], completedQuizzes: [] };
        if (!user.stats) user.stats = { totalPoints: 0, totalCorrect: 0, totalIncorrect: 0 };

        if (type === 'section' && !user.progress.completedSections.includes(sectionId)) {
            user.progress.completedSections.push(sectionId);
        } else if (type === 'quiz' && !user.progress.completedQuizzes.includes(sectionId)) {
            user.progress.completedQuizzes.push(sectionId);
        }

        user.stats.totalPoints += points;
        writeDB(db);
        res.json({ success: true, user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.get('/api/leaderboard', (req, res) => {
    const db = readDB();
    const users = Object.values(db.users);

    // Default mock users if DB is empty or small
    const mockUsers = [
        { name: 'Arjun Mehta', stats: { totalPoints: 1450 } },
        { name: 'Priya Sharma', stats: { totalPoints: 1320 } },
        { name: 'Rohan Gupta', stats: { totalPoints: 1280 } }
    ];

    const allUsers = [...users, ...mockUsers]
        .map(u => ({
            name: u.name,
            points: u.stats?.totalPoints || 0,
            uid: u.uid || Math.random().toString()
        }))
        .sort((a, b) => b.points - a.points);

    res.json({ success: true, leaderboard: allUsers.slice(0, 10) });
});

app.get('/api/jobs', (req, res) => {
    const jobs = [
        {
            id: 1,
            title: "Gen AI Product Manager",
            company: "Adobe",
            location: "Remote / Bangalore",
            salary: "₹45L - ₹65L",
            matchScore: 85,
            missingSkills: ["Native RAG Architecture", "Enterprise Agent Design"],
            type: "Full-time"
        },
        {
            id: 2,
            title: "Senior AI Solutions Architect",
            company: "Hugging Face",
            location: "Remote",
            salary: "$180k - $240k",
            matchScore: 62,
            missingSkills: ["Model Distillation", "GPU Orchestration"],
            type: "Full-time"
        },
        {
            id: 3,
            title: "AI Business Analyst",
            company: "Zomato",
            location: "Gurgaon",
            salary: "₹25L - ₹35L",
            matchScore: 92,
            missingSkills: ["None"],
            type: "Full-time"
        },
        {
            id: 4,
            title: "Prompt Engineer",
            company: "OpenAI",
            location: "San Francisco",
            salary: "$250k - $400k",
            matchScore: 78,
            missingSkills: ["Python", "ControlNet"],
            type: "Full-time"
        }
    ];
    res.json({ success: true, jobs });
});

app.get('/api/news', (req, res) => {
    const news = [
        {
            id: 1,
            title: "OpenAI announces GPT-5 Preview: What Product Managers need to know",
            category: "TRENDING",
            source: "AI Daily",
            time: "2h ago",
            whyItMatters: "This model introduces 'Native Agentic Flow', meaning PMs need to stop thinking about chats and start thinking about multi-step system orchestration.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Prompt Engineering is dead? No, it's just becoming 'Logic Engineering'.",
            category: "CAREER DEPTH",
            source: "The AI Career",
            time: "5h ago",
            whyItMatters: "Simple prompts are being replaced by RAG pipelines. If you only know 'how to chat', you're becoming obsolete. Learn the logic behind the prompt.",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4638ef80b?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "NVIDIA's new Blackwell chips: The hardware ROI for non-tech leaders.",
            category: "FOR EXECUTIVES",
            source: "TechROI",
            time: "1d ago",
            whyItMatters: "As a leader, you need to understand how compute costs affect your product's margin. This explains the pricing shifts we're seeing.",
            image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=800&auto=format&fit=crop"
        }
    ];
    res.json({ success: true, news });
});

// --- AI & Voice Endpoints (Original) ---

const SYSTEM_PROMPT = `You are a friendly, intelligent AI voice assistant.
Keep your answers concise since they will be spoken aloud.`;

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message, sessionId = 'default', history = [] } = req.body;
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: message }],
            temperature: 0.7,
            max_tokens: 150
        });
        res.json({ response: completion.choices[0].message.content, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Text-to-Speech
app.post('/api/text-to-speech', async (req, res) => {
    try {
        const { text, voice = 'alloy' } = req.body;
        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice,
            input: text
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        res.set({ 'Content-Type': 'audio/mpeg', 'Content-Length': buffer.length });
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Speech-to-Text
app.post('/api/speech-to-text', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No audio file' });
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(req.file.path),
            model: 'whisper-1'
        });
        fs.unlinkSync(req.file.path);
        res.json({ text: transcription.text, success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 AI Backend running on port ${PORT}`);
});
