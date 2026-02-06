# 🎙️ AI Voice Assistant - Complete Setup Guide

A production-ready AI Voice Assistant similar to ChatGPT voice mode with real-time speech recognition, intelligent responses, and natural voice output.

## ✨ Features

- 🎤 **Voice Input**: Record audio using browser microphone
- 🧠 **AI Intelligence**: Powered by OpenAI GPT-4 for smart responses
- 🗣️ **Natural Voice Output**: Text-to-speech with human-like voices
- 🌍 **Multi-language Support**: Speaks English, Hindi, Hinglish, and more
- 💬 **Conversation History**: Maintains context across messages
- 🔒 **Secure**: API keys protected on backend only
- ⚡ **Real-time**: Fast processing and response
- 📱 **Responsive**: Works on desktop and mobile browsers

## 🏗️ Project Structure

```
voice-assistant-backend/
├── server.js           # Main backend server
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
└── uploads/           # Temporary audio storage (auto-created)

src/components/
└── VoiceAssistant.jsx # React frontend component
```

## 🚀 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd voice-assistant-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Get your OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy and paste it into `.env`

### 4. Start Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:3001`

## 🎨 Frontend Setup

### 1. Add Environment Variable

Create or update `.env` in your React project root:

```env
VITE_API_URL=http://localhost:3001
```

### 2. Use the Component

Import and use in your app:

```jsx
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  return <VoiceAssistant />;
}
```

### 3. Start Frontend

```bash
npm run dev
```

## 🔧 API Endpoints

### Health Check
```
GET /health
```

### Speech to Text
```
POST /api/speech-to-text
Body: FormData with 'audio' file
Response: { text: string, success: boolean }
```

### Chat (Get AI Response)
```
POST /api/chat
Body: { message: string, sessionId?: string }
Response: { response: string, success: boolean }
```

### Text to Speech
```
POST /api/text-to-speech
Body: { text: string, voice?: string }
Response: Audio file (audio/mpeg)
```

### Full Voice Conversation (Recommended)
```
POST /api/voice-conversation
Body: FormData with 'audio', 'sessionId', 'voice'
Response: { 
  userMessage: string,
  aiResponse: string,
  audioData: base64,
  success: boolean 
}
```

### Clear History
```
POST /api/clear-history
Body: { sessionId?: string }
Response: { success: boolean }
```

## 🎭 Available Voices

Choose from OpenAI's TTS voices:
- `alloy` - Neutral and balanced
- `echo` - Clear and expressive
- `fable` - Warm and engaging
- `onyx` - Deep and authoritative
- `nova` - Energetic and friendly
- `shimmer` - Soft and calm

## 🔒 Security Features

✅ API key stored only on backend  
✅ Environment variables with `.env`  
✅ `.gitignore` protects sensitive files  
✅ Rate limiting (100 requests per 15 minutes)  
✅ CORS protection  
✅ Helmet.js security headers  
✅ File upload validation  
✅ File size limits (25MB)  

## 📱 Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari (iOS 14.5+)
- ✅ Mobile browsers with microphone access

**Note:** Users must grant microphone permissions.

## 🌐 Deployment

### Backend Deployment (Render)

1. Create account at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add your `OPENAI_API_KEY`
5. Deploy!

### Frontend Deployment (Vercel)

1. Create account at https://vercel.com
2. Import your repository
3. Add environment variable:
   - `VITE_API_URL` = your Render backend URL
4. Deploy!

### Environment Variables for Production

**Backend (.env):**
```env
OPENAI_API_KEY=sk-your-key
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend.onrender.com
```

## 🧪 Testing

### Test Backend
```bash
# Health check
curl http://localhost:3001/health

# Test with Postman or Thunder Client
POST http://localhost:3001/api/chat
{
  "message": "Hello, how are you?"
}
```

### Test Frontend
1. Open browser console (F12)
2. Click microphone button
3. Grant permissions
4. Speak
5. Check console for logs

## 🐛 Troubleshooting

### "Could not access microphone"
- Check browser permissions
- Use HTTPS in production (required for mic access)
- Try different browser

### "Failed to process audio"
- Check OpenAI API key is valid
- Ensure backend is running
- Check API credits/quota

### CORS errors
- Verify `ALLOWED_ORIGINS` in backend `.env`
- Check frontend `VITE_API_URL` is correct

### No audio playback
- Check browser audio permissions
- Verify speakers/headphones connected
- Check browser console for errors

## 💰 Cost Estimation

OpenAI API pricing (approximate):
- **Whisper (Speech-to-Text):** $0.006 per minute
- **GPT-4 Turbo:** $0.01 per 1K tokens
- **TTS:** $0.015 per 1K characters

Example: 100 voice conversations (~2 min each) ≈ $3-5

## 📚 Customization

### Change AI Personality

Edit `SYSTEM_PROMPT` in `server.js`:

```javascript
const SYSTEM_PROMPT = `You are a helpful coding assistant...`;
```

### Change Voice

In `VoiceAssistant.jsx`, modify:

```javascript
formData.append('voice', 'nova'); // Change to any available voice
```

### Adjust Response Length

In `server.js`:

```javascript
max_tokens: 150 // Increase for longer responses
```

## 🔄 Updates & Maintenance

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## 📄 License

MIT License - Feel free to use in your projects!

## 🆘 Support

For issues or questions:
1. Check this README
2. Review console logs
3. Check OpenAI API status
4. Verify environment variables

## 🎉 You're Ready!

Your AI Voice Assistant is now set up and ready to use. Enjoy building amazing voice-powered experiences!
