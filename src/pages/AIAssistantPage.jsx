import React, { useState } from 'react';
import { Bot, MessageCircle, TrendingUp, Lightbulb, Activity } from 'lucide-react';

const AIAssistantPage = () => {
  const [selectedPersonality, setSelectedPersonality] = useState('sage');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I'm Dr. Sage. I'm here to provide thoughtful guidance on your wellness journey. What's on your mind today?",
      sender: 'ai',
      time: '11:54 PM'
    }
  ]);

  const personalities = [
    { id: 'sage', name: 'Dr. Sage', emoji: '🧙‍♀️', description: 'Wise and thoughtful, provides deep insights' },
    { id: 'luna', name: 'Luna', emoji: '🌙', description: 'Gentle and supportive, like a caring friend' },
    { id: 'alex', name: 'Alex', emoji: '💪', description: 'Motivational and action-oriented' },
    { id: 'maya', name: 'Dr. Maya', emoji: '🌸', description: 'Professional and empathetic therapeutic approach' }
  ];

  const modes = [
    { id: 'chat', name: 'Chat', icon: <MessageCircle size={20} />, description: 'Have a conversation with your AI assistant' },
    { id: 'insights', name: 'Insights', icon: <TrendingUp size={20} />, description: 'Get AI-powered analysis of your wellness data' },
    { id: 'recommendations', name: 'Recommendations', icon: <Lightbulb size={20} />, description: 'Receive personalized wellness suggestions' },
    { id: 'exercises', name: 'Exercises', icon: <Activity size={20} />, description: 'Guided wellness exercises and activities' }
  ];

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      greeting: [
        "Hello! I'm here to support you on your wellness journey. What would you like to talk about?",
        "Hi there! It's wonderful to connect with you. How can I help you today?",
        "Welcome! I'm here to listen and provide guidance. What's on your mind?"
      ],
      advice: [
        "That's a great question. Based on what you've shared, I'd suggest taking small, manageable steps. What feels most achievable for you right now?",
        "I hear you. Sometimes the best approach is to start with self-compassion. How are you being kind to yourself today?",
        "Let's explore this together. What has worked well for you in similar situations before?"
      ],
      mood_low: [
        "I understand you're going through a difficult time. Your feelings are valid. Have you tried any of the breathing exercises or meditation features?",
        "It's okay to not be okay. Remember, you're not alone in this. What kind of support would feel most helpful right now?",
        "Thank you for sharing that with me. Sometimes just acknowledging our struggles is the first step. What's one small thing that might bring you comfort?"
      ],
      mood_good: [
        "That's wonderful to hear! What's contributing to this positive feeling?",
        "I'm so glad you're feeling good! It's great to reflect on what's working well. What are you grateful for today?",
        "Your positive energy is beautiful! How can we help you maintain this feeling?"
      ],
      default: [
        "That's really interesting. Tell me more about how you're feeling about that.",
        "I hear you. What emotions are coming up for you around this?",
        "Thank you for sharing. What would feel most supportive for you right now?",
        "I appreciate your openness. How does that sit with you?"
      ]
    };

    let category = 'default';
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      category = 'greeting';
    } else if (lowerMessage.includes('advice') || lowerMessage.includes('help') || lowerMessage.includes('suggest')) {
      category = 'advice';
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down') || lowerMessage.includes('anxious')) {
      category = 'mood_low';
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('wonderful')) {
      category = 'mood_good';
    }

    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    const userInput = inputMessage;
    setInputMessage('');

    // Generate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: generateAIResponse(userInput),
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000 + Math.random() * 500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Bot size={40} color="#fff" style={{ marginBottom: '1rem' }} />
        <h1 style={styles.title}>AI Wellness Assistant</h1>
        <p style={styles.subtitle}>
          Your personal AI companion for mental health support, insights, and guidance
        </p>
      </div>

      <div style={styles.content}>
        {/* Personality Selector */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Choose Your Assistant:</h3>
          <div style={styles.personalityGrid}>
            {personalities.map((personality) => (
              <button
                key={personality.id}
                style={{
                  ...styles.personalityCard,
                  ...(selectedPersonality === personality.id ? styles.personalityCardActive : {})
                }}
                onClick={() => setSelectedPersonality(personality.id)}
              >
                <div style={styles.personalityEmoji}>{personality.emoji}</div>
                <div style={styles.personalityName}>{personality.name}</div>
                <div style={styles.personalityDesc}>{personality.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selector */}
        <div style={styles.section}>
          <div style={styles.modesGrid}>
            {modes.map((mode) => (
              <button key={mode.id} style={styles.modeCard}>
                <div style={styles.modeIcon}>{mode.icon}</div>
                <div>
                  <div style={styles.modeName}>{mode.name}</div>
                  <div style={styles.modeDesc}>{mode.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={styles.chatCard}>
          <div style={styles.messagesArea}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.message,
                  ...(message.sender === 'ai' ? styles.messageAi : styles.messageUser)
                }}
              >
                {message.sender === 'ai' && (
                  <div style={styles.messageAvatar}>
                    {personalities.find(p => p.id === selectedPersonality)?.emoji}
                  </div>
                )}
                <div style={styles.messageContent}>
                  <div style={styles.messageText}>{message.text}</div>
                  <div style={styles.messageTime}>{message.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.inputArea}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Share your thoughts with Dr. Sage..."
              style={styles.textarea}
              rows="3"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <div style={styles.inputActions}>
              <button onClick={() => setMessages([messages[0]])} style={styles.clearButton}>
                🗑️ Clear
              </button>
              <button onClick={sendMessage} style={styles.sendButton}>
                ➤ Send
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={styles.disclaimer}>
          <span style={{ marginRight: '8px' }}>ℹ️</span>
          This AI assistant provides supportive guidance but is not a replacement for professional mental health care.
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)',
    padding: '2rem 1rem'
  },
  header: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto 2rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '0.75rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: 'rgba(255,255,255,0.95)'
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1rem'
  },
  personalityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  personalityCard: {
    background: '#fff',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  personalityCardActive: {
    border: '2px solid #6366f1',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
    transform: 'scale(1.02)'
  },
  personalityEmoji: {
    fontSize: '3rem',
    marginBottom: '0.75rem'
  },
  personalityName: {
    fontSize: '1.125rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  personalityDesc: {
    fontSize: '0.875rem',
    color: '#64748b'
  },
  modesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  modeCard: {
    background: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    textAlign: 'left'
  },
  modeIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  modeName: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '0.25rem'
  },
  modeDesc: {
    fontSize: '0.875rem',
    color: '#64748b'
  },
  chatCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '2rem'
  },
  messagesArea: {
    minHeight: '400px',
    maxHeight: '600px',
    overflowY: 'auto',
    marginBottom: '1.5rem',
    padding: '1rem'
  },
  message: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  messageAi: {
    justifyContent: 'flex-start'
  },
  messageUser: {
    justifyContent: 'flex-end'
  },
  messageAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    flexShrink: 0
  },
  messageContent: {
    maxWidth: '70%'
  },
  messageText: {
    background: '#f8fafc',
    padding: '1rem',
    borderRadius: '12px',
    fontSize: '1rem',
    color: '#2d3748',
    lineHeight: '1.6',
    marginBottom: '0.5rem'
  },
  messageTime: {
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  inputArea: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '1.5rem'
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '1rem',
    outline: 'none'
  },
  inputActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  },
  clearButton: {
    background: 'transparent',
    color: '#64748b',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  sendButton: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  disclaimer: {
    background: '#fff',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    fontSize: '0.875rem',
    color: '#64748b',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  }
};

export default AIAssistantPage;
