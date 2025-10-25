import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMoods, getMeditationHistory, getJournalEntries } from '../utils/storage'
import { generateMoodInsights } from '../utils/aiInsights'
import MoodChart from '../components/MoodChart'

function Dashboard() {
  const [stats, setStats] = useState({
    totalMoods: 0,
    averageMood: 0,
    totalMeditations: 0,
    totalJournalEntries: 0,
    recentMoods: []
  })
  const [insights, setInsights] = useState([])
  const [timeRange, setTimeRange] = useState(30)

  useEffect(() => {
    const moods = getMoods()
    const meditations = getMeditationHistory()
    const journalEntries = getJournalEntries()

    const totalMoods = moods.length
    const averageMood = totalMoods > 0 
      ? (moods.reduce((sum, mood) => sum + mood.mood, 0) / totalMoods).toFixed(1)
      : 0

    const recentMoods = moods.slice(-7).reverse() // Last 7 moods

    setStats({
      totalMoods,
      averageMood,
      totalMeditations: meditations.length,
      totalJournalEntries: journalEntries.length,
      recentMoods
    })

    // Generate AI insights
    const moodInsights = generateMoodInsights(moods)
    setInsights(moodInsights || [])
  }, [])

  const getMoodEmoji = (value) => {
    const moodMap = {
      5: '😊',
      4: '🙂',
      3: '😐',
      2: '😔',
      1: '😢'
    }
    return moodMap[value] || '😐'
  }

  const getMoodLabel = (value) => {
    const labelMap = {
      5: 'Great',
      4: 'Good',
      3: 'Okay',
      2: 'Low',
      1: 'Difficult'
    }
    return labelMap[value] || 'Unknown'
  }

  return (
    <div className="page fade-in">
      <div className="page-header">
        <h1>Your Wellness Dashboard</h1>
        <p>Track your mental health journey with personalized insights and analytics</p>
      </div>
      
      <div className="feature-grid">
        <div className="glass-card slide-up">
          <div style={{ textAlign: 'center' }}>
            <span className="feature-icon">🎯</span>
            <h3 className="feature-title">Mood Entries</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', margin: '1rem 0' }}>
              {stats.totalMoods}
            </div>
            <p className="feature-description">Total logged moods</p>
          </div>
        </div>
        
        <div className="glass-card slide-up" style={{ animationDelay: '0.1s' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="feature-icon">📊</span>
            <h3 className="feature-title">Average Mood</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', margin: '1rem 0' }}>
              {stats.averageMood}/5
            </div>
            <p className="feature-description">Overall wellness score</p>
          </div>
        </div>
        
        <div className="glass-card slide-up" style={{ animationDelay: '0.2s' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="feature-icon">🧘</span>
            <h3 className="feature-title">Meditation Sessions</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', margin: '1rem 0' }}>
              {stats.totalMeditations}
            </div>
            <p className="feature-description">Sessions completed</p>
          </div>
        </div>
        
        <div className="glass-card slide-up" style={{ animationDelay: '0.3s' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="feature-icon">📝</span>
            <h3 className="feature-title">Journal Entries</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', margin: '1rem 0' }}>
              {stats.totalJournalEntries}
            </div>
            <p className="feature-description">Thoughts captured</p>
          </div>
        </div>
      </div>

      {stats.recentMoods.length > 0 && (
        <div className="glass-card slide-up" style={{ marginTop: '2rem' }}>
          <h3 className="feature-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            📈 Recent Mood Trend
          </h3>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'end',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {stats.recentMoods.map((mood) => (
              <div key={mood.id} style={{ 
                textAlign: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                minWidth: '80px'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {getMoodEmoji(mood.mood)}
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '0.25rem' }}>
                  {new Date(mood.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {getMoodLabel(mood.mood)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {insights.length > 0 && (
        <div className="glass-card slide-up" style={{ marginTop: '2rem' }}>
          <h3 className="feature-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            🤖 AI Insights
          </h3>
          <div className="feature-grid">
            {insights.map((insight, insightIndex) => (
              <div key={insightIndex} className="glass-card" style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>
                    {insight.icon}
                  </span>
                  <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
                    {insight.title}
                  </h4>
                  <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
                    {insight.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="glass-card slide-up" style={{ marginTop: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h3 className="feature-title">📊 Mood Analytics</h3>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="modern-input"
            style={{ width: 'auto', minWidth: '150px' }}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
        <MoodChart moods={getMoods()} timeRange={timeRange} />
      </div>

      <div className="glass-card slide-up" style={{ marginTop: '2rem' }}>
        <h3 className="feature-title" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          ⚡ Quick Actions
        </h3>
        <div className="feature-grid">
          <Link to="/mood" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="feature-icon">🎯</span>
            <h4 className="feature-title">Log Mood</h4>
            <p className="feature-description">Track how you're feeling</p>
          </Link>
          <Link to="/meditation" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="feature-icon">🧘</span>
            <h4 className="feature-title">Meditate</h4>
            <p className="feature-description">Find your inner peace</p>
          </Link>
          <Link to="/journal" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="feature-icon">📝</span>
            <h4 className="feature-title">Write</h4>
            <p className="feature-description">Express your thoughts</p>
          </Link>
          <Link to="/breathing" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="feature-icon">🫁</span>
            <h4 className="feature-title">Breathe</h4>
            <p className="feature-description">Practice mindful breathing</p>
          </Link>
          <Link to="/habits" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="feature-icon">🎯</span>
            <h4 className="feature-title">Track Habits</h4>
            <p className="feature-description">Build healthy routines</p>
          </Link>
          <Link to="/ai-assistant" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span className="feature-icon">🤖</span>
            <h4 className="feature-title">AI Assistant</h4>
            <p className="feature-description">Get personalized support</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard