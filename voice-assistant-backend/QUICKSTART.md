# 🚀 Quick Start Guide - AI Voice Assistant

## ⚡ 5-Minute Setup

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd voice-assistant-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your OpenAI API key
# Get key from: https://platform.openai.com/api-keys
nano .env  # or use any text editor

# Start backend
npm run dev
```

✅ Backend running on http://localhost:3001

### Step 2: Frontend Setup (1 minute)

```bash
# In your main project directory
# Add environment variable
echo "VITE_API_URL=http://localhost:3001" >> .env

# Start frontend (if not already running)
npm run dev
```

✅ Frontend running on http://localhost:5173

### Step 3: Test It! (2 minutes)

1. Open http://localhost:5173 in your browser
2. Import the VoiceAssistant component in your app
3. Click the microphone button
4. Grant microphone permissions
5. Hold and speak
6. Release to hear AI response

## 🎯 Integration Example

```jsx
// In your App.jsx or any page
import VoiceAssistant from './components/VoiceAssistant';

function App() {
  return (
    <div>
      <VoiceAssistant />
    </div>
  );
}

export default App;
```

## 🔑 Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Paste in `.env` file:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

## ✅ Checklist

- [ ] Backend dependencies installed
- [ ] OpenAI API key added to `.env`
- [ ] Backend server running (port 3001)
- [ ] Frontend environment variable set
- [ ] Frontend server running
- [ ] Microphone permissions granted
- [ ] Test conversation successful

## 🎉 That's It!

You now have a fully functional AI Voice Assistant!

## 📞 Quick Commands

```bash
# Start backend
cd voice-assistant-backend && npm run dev

# Start frontend (in another terminal)
npm run dev

# Check backend health
curl http://localhost:3001/health
```

## 🐛 Common Issues

**"Cannot find module"**
→ Run `npm install` in backend directory

**"API key not valid"**
→ Check your OpenAI API key in `.env`

**"Microphone access denied"**
→ Grant permissions in browser settings

**CORS error**
→ Ensure backend is running on port 3001

## 🚀 Next Steps

- Customize AI personality in `server.js`
- Change voice in `VoiceAssistant.jsx`
- Add custom styling
- Deploy to production

Happy coding! 🎤✨
