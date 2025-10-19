import { useState, useEffect, useRef } from 'react'
import { getMoods, getJournalEntries } from '../utils/storage'

function AICompanion() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [companionMood, setCompanionMood] = useState('friendly')
  const messagesEndRef = useRef(null)

  const companionPersonalities = {
    friendly: { emoji: '😊', name: 'Sage', color: '#4ade80' },
    wise: { emoji: '🧙‍♀️', name: 'Wisdom', color: '#8b5cf6' },
    playful: { emoji: '🌟', name: 'Spark', color: '#f59e0b' },
    calm: { emoji: '🕊️', name: 'Serenity', color: '#06b6d4' }
  }

  const currentPersonality = companionPersonalities[companionMood]

  useEffect(() => {
    if (messages.length === 0) {
      const userMoods = getMoods()
      const recentMood = userMoods[userMoods.length - 1]
      
      let greeting = "Hello! I'm your AI wellness companion. How are you feeling today?"
      
      if (recentMood) {
        const moodLabels = { 1: 'difficult', 2: 'low', 3: 'okay', 4: 'good', 5: 'great' }
        greeting = `Hi there! I see you've been feeling ${moodLabels[recentMood.mood]} recently. I'm here to support you. What's on your mind?`
      }

      setMessages([{
        id: 1,
        text: greeting,
        sender: 'ai',
        timestamp: new Date(),
        personality: companionMood
      }])
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const generateAIResponse = (userMessage) => {
    const userMoods = getMoods()
    const journalEntries = getJournalEntries()
    const recentMood = userMoods[userMoods.length - 1]

    // Context-aware responses based on user data
    const responses = {
      greeting: [
        "I'm here to listen and support you. What would you like to talk about?",
        "It's wonderful that you're taking time for your mental wellness. How can I help?",
        "I'm glad you're here. Your wellbeing matters. What's on your heart today?"
      ],
      mood_low: [
        "I understand you're going through a tough time. Remember, difficult feelings are temporary. What's one small thing that might bring you comfort right now?",
        "Your feelings are valid, and it's okay to not be okay sometimes. Have you tried any breathing exercises today?",
        "I'm here with you. Sometimes just acknowledging our struggles is the first step. What support do you need right now?"
      ],
      mood_good: [
        "I love hearing that you're feeling good! What's contributing to this positive energy?",
        "That's wonderful! When we feel good, it's great to reflect on what's working well. What are you grateful for today?",
        "Your positive energy is beautiful. How can we help maintain this feeling?"
      ],
      stress: [
        "Stress can feel overwhelming, but you have tools to manage it. Have you tried the breathing exercises in the app?",
        "Let's break this down together. What's the main source of your stress right now?",
        "Remember, you've handled difficult situations before. What strategies have helped you in the past?"
      ],
      gratitude: [
        "Gratitude is such a powerful practice! It's beautiful that you're focusing on the positive.",
        "Thank you for sharing that. Gratitude can really shift our perspective. What else are you appreciating today?",
        "I love how you're cultivating gratitude. It's one of the most effective ways to boost wellbeing."
      ],
      default: [
        "That's really interesting. Tell me more about how you're feeling about that.",
        "I hear you. It sounds like you're processing a lot right now. How does that sit with you?",
        "Thank you for sharing that with me. What emotions are coming up for you around this?",
        "I appreciate your openness. What would feel most supportive right now?"
      ]
    }

    // Simple keyword matching for response selection
    const lowerMessage = userMessage.toLowerCase()
    let responseCategory = 'default'

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      responseCategory = 'greeting'
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      responseCategory = 'mood_low'
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      responseCategory = 'mood_good'
    } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
      responseCategory = 'stress'
    } else if (lowerMessage.includes('grateful') || lowerMessage.includes('thankful') || lowerMessage.includes('appreciate')) {
      responseCategory = 'gratitude'
    }

    // Add context from recent mood
    if (recentMood && recentMood.mood <= 2 && responseCategory === 'default') {
      responseCategory = 'mood_low'
    }

    const categoryResponses = responses[responseCategory]
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
        personality: companionMood
      }

      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <button 
        className="ai-companion-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentPersonality.emoji}
      </button>

      {isOpen && (
        <div className="ai-companion-chat">
          <div className="chat-header">
            <div className="companion-info">
              <span className="companion-avatar">{currentPersonality.emoji}</span>
              <div>
                <h4>{currentPersonality.name}</h4>
                <span className="companion-status">Online • AI Companion</span>
              </div>
            </div>
            
            <div className="chat-controls">
              <select 
                value={companionMood} 
                onChange={(e) => setCompanionMood(e.target.value)}
                className="personality-select"
              >
                <option value="friendly">Friendly</option>
                <option value="wise">Wise</option>
                <option value="playful">Playful</option>
                <option value="calm">Calm</option>
              </select>
              <button onClick={() => setIsOpen(false)} className="close-chat">×</button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.sender === 'ai' && (
                  <span className="message-avatar">
                    {companionPersonalities[message.personality]?.emoji || currentPersonality.emoji}
                  </span>
                )}
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message ai typing">
                <span className="message-avatar">{currentPersonality.emoji}</span>
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

          <div className="chat-input">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Share your thoughts with ${currentPersonality.name}...`}
              className="message-input"
              rows="2"
            />
            <button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="send-button"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AICompanion