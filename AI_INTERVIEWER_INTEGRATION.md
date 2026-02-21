# AI Mock Interview System - Integration Guide

## Overview
This system generates dynamic, context-aware AI interviewer prompts based on user's preparation data (role, interview type, focus area, timeline).

## How It Works

### 1. **User Flow**
1. User clicks "Mock Interviews" in sidebar
2. Completes 4-step preparation modal:
   - Upload Resume
   - Select Role (100+ options)
   - Choose Interview Type & Timeline
   - Select Focus Area
3. System generates custom AI prompt
4. Interview begins with personalized greeting

### 2. **System Prompt Generation**
The `generateInterviewerPrompt()` function creates a comprehensive system prompt that includes:

- **Role-specific guidelines** (e.g., for Software Engineer: system design, APIs, databases)
- **Interview type context** (Phone Screen, Technical, Behavioral, Final Round)
- **Focus area** (Technical, Behavioral, or Both)
- **Strict behavioral rules** (act like real interviewer, not chatbot)
- **Question progression logic** (easy → hard, with follow-ups)
- **Answer evaluation criteria** (relevance, clarity, structure, confidence, depth)

### 3. **Current Implementation**
- System prompt is generated and logged to console
- Initial greeting is displayed in chat
- Ready for AI API integration

## Integration with AI APIs

### Option 1: OpenAI API

```javascript
// In MockInterview.jsx, add this function:

const sendMessageToAI = async (userMessage) => {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${YOUR_OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages.map(msg => ({
                        role: msg.role === 'ai' ? 'assistant' : 'user',
                        content: msg.text
                    })),
                    { role: 'user', content: userMessage }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI API Error:', error);
        return 'I apologize, but I encountered an error. Could you please repeat that?';
    }
};
```

### Option 2: Google Gemini API

```javascript
const sendMessageToAI = async (userMessage) => {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${YOUR_GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: systemPrompt }]
                    },
                    ...messages.map(msg => ({
                        role: msg.role === 'ai' ? 'model' : 'user',
                        parts: [{ text: msg.text }]
                    })),
                    {
                        role: 'user',
                        parts: [{ text: userMessage }]
                    }
                ]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('AI API Error:', error);
        return 'I apologize, but I encountered an error. Could you please repeat that?';
    }
};
```

### Option 3: Anthropic Claude API

```javascript
const sendMessageToAI = async (userMessage) => {
    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': YOUR_ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-opus-20240229',
                system: systemPrompt,
                messages: [
                    ...messages.map(msg => ({
                        role: msg.role === 'ai' ? 'assistant' : 'user',
                        content: msg.text
                    })),
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();
        return data.content[0].text;
    } catch (error) {
        console.error('AI API Error:', error);
        return 'I apologize, but I encountered an error. Could you please repeat that?';
    }
};
```

## Where to Add AI Integration

### In `MockInterview.jsx`:

1. **Add API key** (use environment variables):
```javascript
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
```

2. **Update handleStart function** to send user's speech to AI:
```javascript
const handleStart = () => {
    setInterviewState('active');
    startListening();
    
    // When user speaks, send to AI
    // This would be triggered after speech recognition captures text
};
```

3. **Add message handler**:
```javascript
const handleUserMessage = async (userText) => {
    // Add user message to chat
    const userMsg = { id: Date.now(), role: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    
    // Get AI response
    const aiResponse = await sendMessageToAI(userText);
    
    // Add AI response to chat
    const aiMsg = { id: Date.now() + 1, role: 'ai', text: aiResponse };
    setMessages(prev => [...prev, aiMsg]);
    
    // Optionally speak the response
    const utterance = new SpeechSynthesisUtterance(aiResponse);
    window.speechSynthesis.speak(utterance);
};
```

## Environment Variables Setup

Create a `.env` file in your project root:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## System Prompt Features

The generated system prompt ensures the AI:

✅ **Stays in character** as a professional interviewer
✅ **Asks role-specific questions** only
✅ **Follows interview flow** (easy → hard)
✅ **Provides follow-up questions** based on answers
✅ **Evaluates answers** for quality
✅ **Never breaks context** or acts like a chatbot
✅ **Maintains professional tone** throughout

## Role-Specific Coverage

The system includes specialized guidelines for:

- **Tech Roles**: Software Engineer, Developer, DevOps, etc.
- **Data Roles**: Data Scientist, Analyst, Engineer
- **Product Roles**: Product Manager, Product Owner
- **Design Roles**: UX/UI Designer, Product Designer
- **Marketing Roles**: Marketing Manager, Growth Manager
- **Sales Roles**: Sales Executive, Account Manager
- **HR Roles**: HR Manager, Recruiter
- **Finance Roles**: Financial Analyst, Accountant
- **Operations Roles**: Operations Manager, Project Manager

## Testing

1. Complete the prep modal with different roles
2. Check browser console for generated system prompt
3. Verify the prompt includes:
   - Correct role
   - Correct interview type
   - Correct focus area
   - Role-specific guidelines

## Next Steps

1. Choose your AI provider (OpenAI, Gemini, Claude)
2. Get API key
3. Add environment variable
4. Implement the `sendMessageToAI` function
5. Connect it to the speech recognition system
6. Test with different roles and interview types

## Notes

- The system prompt is automatically generated based on user selections
- No manual prompt writing needed
- Fully dynamic and context-aware
- Ready for production use with any AI API
