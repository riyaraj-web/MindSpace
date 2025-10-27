import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h2>Welcome to Your Mental Wellness Journey</h2>
        <p>Take care of your mind with our comprehensive mental health tools</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>🎯 Mood Tracking</h3>
          <p>Monitor your emotional patterns and identify triggers with intelligent insights</p>
        </div>
        
        <div className="feature-card">
          <h3>🧘 Guided Meditation</h3>
          <p>Find peace with our collection of mindfulness exercises and breathing techniques</p>
        </div>
        
        <div className="feature-card">
          <h3>📝 Personal Journal</h3>
          <p>Express your thoughts and reflect on your experiences with AI-powered prompts</p>
        </div>
        
        <div className="feature-card">
          <h3>📊 Wellness Dashboard</h3>
          <p>Track your progress and see your wellness journey with advanced analytics</p>
        </div>
        
        <div className="feature-card">
          <h3>🎯 Habit Tracking</h3>
          <p>Build healthy habits with streak tracking and personalized recommendations</p>
        </div>
        
        <div className="feature-card">
          <h3>🫁 Breathing Exercises</h3>
          <p>Practice mindful breathing with guided visual exercises and techniques</p>
        </div>
        
        <div className="feature-card">
          <h3>💪 Recovery Stories</h3>
          <p>Share and read inspiring stories of overcoming depression and mental health challenges</p>
        </div>
        
        <div className="feature-card">
          <h3>🤖 AI Assistant</h3>
          <p>Get personalized guidance, insights, and support from your intelligent wellness companion</p>
        </div>
      </div>
      
      <div className="cta-section">
        <Link to="/dashboard" className="cta-button">
          Start Your Wellness Journey
        </Link>
      </div>
    </div>
  )
}

export default Home