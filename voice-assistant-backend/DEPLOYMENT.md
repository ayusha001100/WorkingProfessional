# 🌐 Deployment Guide - AI Voice Assistant

## 📦 Deployment Options

### Option 1: Render (Backend) + Vercel (Frontend) - Recommended

#### Backend Deployment on Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: ai-voice-assistant-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: voice-assistant-backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   OPENAI_API_KEY=sk-your-actual-key
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-frontend.vercel.app
   PORT=3001
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL: `https://your-app.onrender.com`

#### Frontend Deployment on Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your repository
   - Select root directory

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Your app is live!

### Option 2: Railway (Full Stack)

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select repository
   - Add environment variables
   - Deploy

3. **Deploy Frontend**
   - Add new service
   - Deploy frontend
   - Link to backend

### Option 3: DigitalOcean App Platform

1. **Create Account**
   - Go to https://www.digitalocean.com

2. **Create App**
   - Apps → Create App
   - Connect GitHub
   - Configure both services

3. **Deploy**
   - Add environment variables
   - Deploy

## 🔒 Production Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=sk-your-production-key
PORT=3001
NODE_ENV=production
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🌍 Custom Domain Setup

### Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL automatically configured

### Render (Backend)
1. Go to Settings → Custom Domain
2. Add domain
3. Update DNS CNAME record
4. SSL automatically configured

## 🔐 Security Checklist

- [ ] API keys in environment variables only
- [ ] `.env` in `.gitignore`
- [ ] CORS configured for production domains
- [ ] Rate limiting enabled
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Helmet.js security headers active
- [ ] File upload limits set
- [ ] Error messages don't expose sensitive info

## 📊 Monitoring

### Render Dashboard
- View logs
- Monitor CPU/Memory
- Check request metrics
- Set up alerts

### Vercel Analytics
- Enable Web Analytics
- Monitor performance
- Track errors
- View deployment logs

## 💰 Cost Estimates

### Render (Backend)
- **Free Tier**: $0/month (spins down after inactivity)
- **Starter**: $7/month (always on)
- **Standard**: $25/month (more resources)

### Vercel (Frontend)
- **Hobby**: $0/month (personal projects)
- **Pro**: $20/month (commercial use)

### OpenAI API
- Pay-per-use based on tokens
- ~$3-5 per 100 conversations
- Set usage limits in OpenAI dashboard

## 🚀 Continuous Deployment

Both Render and Vercel support automatic deployments:

1. Push to GitHub
2. Automatic build triggered
3. Tests run (if configured)
4. Deploy to production
5. Rollback available if needed

## 🧪 Testing Production

```bash
# Test backend health
curl https://your-backend.onrender.com/health

# Test from frontend
# Open browser console and check network tab
```

## 📈 Scaling

### Backend Scaling (Render)
- Upgrade plan for more resources
- Enable autoscaling
- Add Redis for session storage
- Use CDN for audio files

### Frontend Scaling (Vercel)
- Automatic edge caching
- Global CDN included
- Serverless functions available

## 🔄 Updates

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push origin main
# Render auto-deploys
```

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push origin main
# Vercel auto-deploys
```

## 🆘 Troubleshooting

### Backend not responding
- Check Render logs
- Verify environment variables
- Check OpenAI API status
- Restart service

### CORS errors in production
- Update `ALLOWED_ORIGINS` in backend
- Redeploy backend
- Clear browser cache

### Slow cold starts (Render free tier)
- Upgrade to paid plan
- Use keep-alive service
- Accept 30s cold start delay

## 📱 Mobile Considerations

- HTTPS required for microphone access
- Test on actual devices
- Optimize audio quality vs. bandwidth
- Handle network interruptions

## ✅ Pre-Launch Checklist

- [ ] Test all features in production
- [ ] Verify microphone works on mobile
- [ ] Check CORS settings
- [ ] Test error handling
- [ ] Monitor API costs
- [ ] Set up usage alerts
- [ ] Backup environment variables
- [ ] Document API endpoints
- [ ] Test on multiple browsers
- [ ] Verify SSL certificates

## 🎉 You're Live!

Your AI Voice Assistant is now deployed and accessible worldwide!

Monitor usage, gather feedback, and iterate. Good luck! 🚀
