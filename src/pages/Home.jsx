import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>Welcome to Mindspace</h1>
        <p>Your comprehensive mental wellness companion designed to support your journey to better mental health</p>
      </div>
      
      <div className="feature-grid">
        <div className="feature-card slide-up">
          <span className="feature-icon">🎯</span>
          <h3 className="feature-title">Mood Tracking</h3>
          <p className="feature-description">Monitor your emotional patterns and identify triggers with intelligent insights and beautiful visualizations</p>
          <Link to="/mood" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Track Mood
          </Link>
        </div>
        
        <div className="feature-card slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="feature-icon">🧘</span>
          <h3 className="feature-title">Guided Meditation</h3>
          <p className="feature-description">Find peace with our collection of mindfulness exercises and breathing techniques</p>
          <Link to="/meditation" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Start Meditation
          </Link>
        </div>
        
        <div className="feature-card slide-up" style={{ animationDelay: '0.2s' }}>
          <span className="feature-icon">📝</span>
          <h3 className="feature-title">Personal Journal</h3>
          <p className="feature-description">Express your thoughts and reflect on your experiences with AI-powered prompts</p>
          <Link to="/journal" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Write Entry
          </Link>
        </div>
        
        <div className="feature-card slide-up" style={{ animationDelay: '0.3s' }}>
          <span className="feature-icon">📊</span>
          <h3 className="feature-title">Wellness Dashboard</h3>
          <p className="feature-description">Track your progress and see your wellness journey with advanced analytics</p>
          <Link to="/dashboard" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            View Dashboard
          </Link>
        </div>
        
        <div className="feature-card slide-up" style={{ animationDelay: '0.4s' }}>
          <span className="feature-icon">🎯</span>
          <h3 className="feature-title">Habit Tracking</h3>
          <p className="feature-description">Build healthy habits with streak tracking and personalized recommendations</p>
          <Link to="/habits" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Track Habits
          </Link>
        </div>
        
        <div className="feature-card slide-up" style={{ animationDelay: '0.5s' }}>
          <span className="feature-icon">🫁</span>
          <h3 className="feature-title">Breathing Exercises</h3>
          <p className="feature-description">Practice mindful breathing with guided visual exercises and techniques</p>
          <Link to="/breathing" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Start Breathing
          </Link>
        </div>
        
        <div className="feature-card slide-up" style={{ animationDelay: '0.6s' }}>
          <span className="feature-icon">💪</span>
          <h3 className="feature-title">Recovery Stories</h3>
          <p className="feature-description">Share and read inspiring stories of overcoming mental health challenges</p>
          <Link to="/recovery-stories" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Read Stories
          </Link>
        </div>
        
        <div className="feature-card slide-up" style={{ animationDelay: '0.7s' }}>
          <span className="feature-icon">🤖</span>
          <h3 className="feature-title">AI Assistant</h3>
          <p className="feature-description">Get personalized guidance, insights, and support from your intelligent wellness companion</p>
          <Link to="/ai-assistant" className="modern-button" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
            Chat with AI
          </Link>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <Link to="/dashboard" className="modern-button" style={{ 
          fontSize: '1.2rem', 
          padding: '1.5rem 3rem',
          textDecoration: 'none',
          display: 'inline-block',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
          boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
        }}>
          🚀 Start Your Wellness Journey
        </Link>
      </div>
    </div>
  )
}

export default Home