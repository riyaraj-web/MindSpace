import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMoods, getJournalEntries } from '../utils/storage';
import { generateMoodInsights, getMoodRecommendations } from '../utils/aiInsights';

const AIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('sage');
  const [currentMode, setCurrentMode] = useState('chat');
  const [insights, setInsights] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const messagesEndRef = useRef(null);

  const personalities = {
    sage: {
      name: 'Dr. Sage',
      emoji: '🧙‍♀️',
      color: '#8b5cf6',
      description: 'Wise and thoughtful, provides deep insights',
      greeting: "Hello, I'm Dr. Sage. I'm here to provide thoughtful guidance on your wellness journey. What's on your mind today?"
    },
    companion: {
      name: 'Luna',
      emoji: '🌙',
      color: '#6366f1',
      description: 'Gentle and supportive, like a caring friend',
      greeting: "Hi there! I'm Luna, your caring companion. I'm here to listen and support you through whatever you're experiencing."
    },
    coach: {
      name: 'Alex',
      emoji: '💪',
      color: '#10b981',
      description: 'Motivational and action-oriented',
      greeting: "Hey! I'm Alex, your wellness coach. Ready to tackle your goals and build some positive momentum together?"
    },
    therapist: {
      name: 'Dr. Maya',
      emoji: '🌸',
      color: '#8b5cf6',
      description: 'Professional and empathetic therapeutic approach',
      greeting: "Welcome. I'm Dr. Maya. This is a safe space where we can explore your thoughts and feelings together."
    }
  };

  const modes = [
    { id: 'chat', name: 'Chat', icon: '💬', description: 'Have a conversation with your AI assistant' },
    { id: 'insights', name: 'Insights', icon: '📊', description: 'Get AI-powered analysis of your wellness data' },
    { id: 'recommendations', name: 'Recommendations', icon: '💡', description: 'Receive personalized wellness suggestions' },
    { id: 'exercises', name: 'Exercises', icon: '🧘', description: 'Guided wellness exercises and activities' }
  ];

  useEffect(() => {
    initializeChat();
    loadInsights();
  }, [selectedPersonality]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = () => {
    const personality = personalities[selectedPersonality];
    const welcomeMessage = {
      id: Date.now(),
      text: personality.greeting,
      sender: 'ai',
      timestamp: new Date(),
      personality: selectedPersonality
    };
    setMessages([welcomeMessage]);
  };

  const loadInsights = () => {
    const moods = getMoods();
    const journals = getJournalEntries();
    
    if (moods.length > 0) {
      const moodInsights = generateMoodInsights(moods);
      setInsights(moodInsights);
      
      const recentMood = moods[moods.length - 1];
      const recs = getMoodRecommendations(recentMood.mood);
      setRecommendations(recs);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = (userMessage, personality) => {
    const moods = getMoods();
    const journals = getJournalEntries();
    const recentMood = moods[moods.length - 1];

    // Personality-based response patterns
    const responsePatterns = {
      sage: {
        greeting: [
          "That's a profound question. Let me share some wisdom...",
          "I sense there's deeper meaning in what you're sharing...",
          "From my experience, this situation often reflects..."
        ],
        supportive: [
          "Your journey shows remarkable strength and self-awareness.",
          "These challenges are opportunities for growth and understanding.",
          "Trust in your inner wisdom - it has guided you this far."
        ],
        analytical: [
          "Looking at the patterns in your data, I notice...",
          "There's an interesting connection between your recent experiences...",
          "The wisdom in your journey suggests..."
        ]
      },
      companion: {
        greeting: [
          "I'm so glad you shared that with me...",
          "Thank you for trusting me with your feelings...",
          "I'm here with you, and you're not alone in this..."
        ],
        supportive: [
          "You're being so brave by facing this.",
          "It's okay to feel this way - your emotions are valid.",
          "I believe in your strength, even when you don't feel strong."
        ],
        encouraging: [
          "You've overcome challenges before, and you can do this too.",
          "Every small step you take matters so much.",
          "I'm proud of you for reaching out and seeking support."
        ]
      },
      coach: {
        greeting: [
          "Alright, let's tackle this together!",
          "I love your commitment to growth!",
          "You're ready to make some positive changes - I can feel it!"
        ],
        motivational: [
          "You've got this! Let's break it down into actionable steps.",
          "Every champion faces setbacks - it's how we bounce back that counts.",
          "Your potential is unlimited. Let's unlock it together!"
        ],
        actionable: [
          "Here's what I suggest we focus on next...",
          "Let's create a game plan that works for you...",
          "Time to turn these insights into action!"
        ]
      },
      therapist: {
        greeting: [
          "Thank you for sharing that with me. How does it feel to express this?",
          "I hear you, and I want to understand more about your experience...",
          "That sounds like it's been really difficult for you..."
        ],
        reflective: [
          "What I'm hearing is... Does that resonate with you?",
          "It sounds like there might be some underlying feelings here...",
          "How do you think this connects to other areas of your life?"
        ],
        therapeutic: [
          "What would it look like if you were kinder to yourself about this?",
          "Sometimes our minds tell us stories that aren't entirely true...",
          "You have more strength and resources than you might realize right now."
        ]
      }
    };

    // Simple keyword matching for response selection
    const lowerMessage = userMessage.toLowerCase();
    let responseType = 'supportive';
    let responses = responsePatterns[personality][responseType];

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      responseType = 'greeting';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('advice')) {
      responseType = personality === 'coach' ? 'actionable' : 'analytical';
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      responseType = personality === 'therapist' ? 'therapeutic' : 'supportive';
    } else if (lowerMessage.includes('goal') || lowerMessage.includes('improve')) {
      responseType = personality === 'coach' ? 'motivational' : 'encouraging';
    }

    responses = responsePatterns[personality][responseType] || responsePatterns[personality]['supportive'];
    let baseResponse = responses[Math.floor(Math.random() * responses.length)];

    // Add contextual information based on user data
    if (recentMood && lowerMessage.includes('mood')) {
      const moodLabels = { 1: 'challenging', 2: 'low', 3: 'okay', 4: 'good', 5: 'great' };
      baseResponse += ` I see you've been feeling ${moodLabels[recentMood.mood]} recently. `;
    }

    // Add personality-specific follow-up
    const followUps = {
      sage: "What deeper insights do you think this experience is offering you?",
      companion: "How can I best support you right now?",
      coach: "What's one small step we could take to move forward?",
      therapist: "What emotions are coming up for you as we discuss this?"
    };

    if (Math.random() > 0.5) {
      baseResponse += " " + followUps[personality];
    }

    return baseResponse;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputMessage, selectedPersonality),
        sender: 'ai',
        timestamp: new Date(),
        personality: selectedPersonality
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    initializeChat();
  };

  const renderChatMode = () => (
    <div className="ai-chat-container">
      <div className="chat-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'ai' && (
              <div className="message-avatar">
                <span className="avatar-emoji">
                  {personalities[message.personality]?.emoji || personalities[selectedPersonality].emoji}
                </span>
              </div>
            )}
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai typing">
            <div className="message-avatar">
              <span className="avatar-emoji">{personalities[selectedPersonality].emoji}</span>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Share your thoughts with ${personalities[selectedPersonality].name}...`}
          className="chat-input"
          rows="3"
        />
        <div className="input-actions">
          <button onClick={clearChat} className="clear-btn">
            🗑️ Clear
          </button>
          <button 
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="send-btn"
          >
            {isTyping ? '⏳' : '➤'} Send
          </button>
        </div>
      </div>
    </div>
  );

  const renderInsightsMode = () => (
    <div className="ai-insights-container">
      <h3>📊 AI Wellness Insights</h3>
      
      {insights && insights.length > 0 ? (
        <div className="insights-grid">
          {insights.map((insight, index) => (
            <div key={index} className={`insight-card ${insight.type}`}>
              <div className="insight-header">
                <span className="insight-icon">{insight.icon}</span>
                <h4>{insight.title}</h4>
              </div>
              <p>{insight.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-insights">
          <span className="no-data-icon">📈</span>
          <h4>Building Your Insights</h4>
          <p>Keep logging your moods and journal entries to unlock personalized AI insights about your wellness patterns.</p>
        </div>
      )}

      <div className="insights-actions">
        <button onClick={loadInsights} className="refresh-btn">
          🔄 Refresh Insights
        </button>
      </div>
    </div>
  );

  const renderRecommendationsMode = () => (
    <div className="ai-recommendations-container">
      <h3>💡 Personalized Recommendations</h3>
      
      {recommendations.length > 0 ? (
        <div className="recommendations-grid">
          {recommendations.map((rec, index) => (
            <div key={index} className="recommendation-card">
              <div className="rec-icon">{rec.icon}</div>
              <div className="rec-content">
                <h4>{rec.activity}</h4>
                <div className="rec-duration">{rec.duration}</div>
                <p>Based on your current mood and patterns</p>
              </div>
              <button className="try-btn">Try Now</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-recommendations">
          <span className="no-data-icon">💡</span>
          <h4>Personalized Recommendations Coming</h4>
          <p>Log some moods to receive AI-powered activity recommendations tailored to your current state.</p>
        </div>
      )}
    </div>
  );

  const renderExercisesMode = () => (
    <div className="ai-exercises-container">
      <h3>🧘 Guided Wellness Exercises</h3>
      
      <div className="exercises-grid">
        <div className="exercise-card">
          <div className="exercise-icon">🧠</div>
          <h4>Cognitive Reframing</h4>
          <p>Transform negative thought patterns with AI guidance</p>
          <button className="start-exercise-btn">Start Exercise</button>
        </div>
        
        <div className="exercise-card">
          <div className="exercise-icon">❤️</div>
          <h4>Self-Compassion Practice</h4>
          <p>Learn to be kinder to yourself with guided exercises</p>
          <button className="start-exercise-btn">Start Exercise</button>
        </div>
        
        <div className="exercise-card">
          <div className="exercise-icon">🎯</div>
          <h4>Goal Setting Workshop</h4>
          <p>Create meaningful, achievable wellness goals</p>
          <button className="start-exercise-btn">Start Exercise</button>
        </div>
        
        <div className="exercise-card">
          <div className="exercise-icon">🌱</div>
          <h4>Growth Mindset Training</h4>
          <p>Develop resilience and adaptability</p>
          <button className="start-exercise-btn">Start Exercise</button>
        </div>
      </div>
    </div>
  );

  const currentPersonality = personalities[selectedPersonality];

  return (
    <div className="ai-assistant-page">
      <div className="ai-header">
        <div className="ai-title-section">
          <h1>🤖 AI Wellness Assistant</h1>
          <p>Your personal AI companion for mental health support, insights, and guidance</p>
        </div>
        
        <div className="personality-selector">
          <label>Choose Your Assistant:</label>
          <div className="personality-options">
            {Object.entries(personalities).map(([key, personality]) => (
              <button
                key={key}
                className={`personality-btn ${selectedPersonality === key ? 'active' : ''}`}
                onClick={() => setSelectedPersonality(key)}
                style={{ '--personality-color': personality.color }}
              >
                <span className="personality-emoji">{personality.emoji}</span>
                <div className="personality-info">
                  <span className="personality-name">{personality.name}</span>
                  <span className="personality-desc">{personality.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ai-modes">
        {modes.map(mode => (
          <button
            key={mode.id}
            className={`mode-btn ${currentMode === mode.id ? 'active' : ''}`}
            onClick={() => setCurrentMode(mode.id)}
          >
            <span className="mode-icon">{mode.icon}</span>
            <div className="mode-info">
              <span className="mode-name">{mode.name}</span>
              <span className="mode-desc">{mode.description}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="ai-content">
        {currentMode === 'chat' && renderChatMode()}
        {currentMode === 'insights' && renderInsightsMode()}
        {currentMode === 'recommendations' && renderRecommendationsMode()}
        {currentMode === 'exercises' && renderExercisesMode()}
      </div>

      <div className="ai-footer">
        <div className="current-assistant">
          <span className="assistant-emoji">{currentPersonality.emoji}</span>
          <span className="assistant-name">{currentPersonality.name}</span>
          <span className="assistant-status">Online</span>
        </div>
        
        <div className="ai-disclaimer">
          <span className="disclaimer-icon">ℹ️</span>
          <span className="disclaimer-text">
            This AI assistant provides supportive guidance but is not a replacement for professional mental health care.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;