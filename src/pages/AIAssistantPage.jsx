import React, { useState } from 'react';
import { Bot, MessageCircle, TrendingUp, Lightbulb, Activity } from 'lucide-react';
import { Card } from '../design-system/components/Card/Card';
import { Button } from '../design-system/components/Button/Button';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
            <div className="relative z-10 text-center text-white">
              <Bot size={48} className="mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">AI Wellness Assistant</h1>
              <p className="text-lg md:text-xl opacity-90">Your personal AI companion for mental health support, insights, and guidance</p>
            </div>
          </div>

          {/* Personality Selector */}
          <div>
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">Choose Your Assistant:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {personalities.map((personality) => (
                <Card
                  key={personality.id}
                  variant="elevated"
                  className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 text-center ${
                    selectedPersonality === personality.id 
                      ? 'ring-4 ring-indigo-500 shadow-2xl' 
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedPersonality(personality.id)}
                >
                  <div className="text-5xl mb-3">{personality.emoji}</div>
                  <h4 className="text-lg font-bold text-neutral-800 mb-2">{personality.name}</h4>
                  <p className="text-sm text-neutral-600">{personality.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modes.map((mode) => (
              <Card 
                key={mode.id} 
                variant="elevated"
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                    {mode.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-neutral-800 mb-1">{mode.name}</h4>
                    <p className="text-xs text-neutral-600">{mode.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Chat Area */}
          <Card variant="elevated">
            <div className="min-h-[400px] max-h-[600px] overflow-y-auto mb-6 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                      {personalities.find(p => p.id === selectedPersonality)?.emoji}
                    </div>
                  )}
                  <div className="max-w-[70%]">
                    <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 rounded-2xl mb-2">
                      <p className="text-sm text-neutral-700 leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-neutral-500 px-2">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-6">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Share your thoughts with Dr. Sage..."
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-vertical mb-4"
                rows="3"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <div className="flex gap-4 justify-end">
                <Button 
                  onClick={() => setMessages([messages[0]])} 
                  variant="outline"
                  size="md"
                >
                  🗑️ Clear
                </Button>
                <Button 
                  onClick={sendMessage}
                  size="md"
                >
                  ➤ Send
                </Button>
              </div>
            </div>
          </Card>

          {/* Disclaimer */}
          <Card variant="elevated" className="flex items-center gap-3">
            <span className="text-2xl">ℹ️</span>
            <p className="text-sm text-neutral-600">
              This AI assistant provides supportive guidance but is not a replacement for professional mental health care.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
