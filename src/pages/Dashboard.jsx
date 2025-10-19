import { useState, useEffect } from 'react'
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
    <div className="page">
      <h2>Your Wellness Dashboard</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Mood Entries</h3>
          <div className="stat-number">{stats.totalMoods}</div>
          <p>Total logged</p>
        </div>
        
        <div className="stat-card">
          <h3>Average Mood</h3>
          <div className="stat-number">{stats.averageMood}/5</div>
          <p>Overall wellness</p>
        </div>
        
        <div className="stat-card">
          <h3>Meditation Sessions</h3>
          <div className="stat-number">{stats.totalMeditations}</div>
          <p>Completed</p>
        </div>
        
        <div className="stat-card">
          <h3>Journal Entries</h3>
          <div className="stat-number">{stats.totalJournalEntries}</div>
          <p>Written</p>
        </div>
      </div>

      {stats.recentMoods.length > 0 && (
        <div className="mood-trend">
          <h3>Recent Mood Trend</h3>
          <div className="mood-chart">
            {stats.recentMoods.map((mood, index) => (
              <div key={mood.id} className="mood-point">
                <div className="mood-emoji">{getMoodEmoji(mood.mood)}</div>
                <div className="mood-date">
                  {new Date(mood.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="mood-label">{getMoodLabel(mood.mood)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {insights.length > 0 && (
        <div className="ai-insights">
          <h3>🤖 AI Insights</h3>
          <div className="insights-grid">
            {insights.map((insight, index) => (
              <div key={index} className={`insight-card ${insight.type}`}>
                <div className="insight-icon">{insight.icon}</div>
                <div className="insight-content">
                  <h4>{insight.title}</h4>
                  <p>{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mood-analytics">
        <div className="analytics-header">
          <h3>📊 Mood Analytics</h3>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="time-range-select"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
        <MoodChart moods={getMoods()} timeRange={timeRange} />
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <a href="/mood" className="action-btn">
            🎯 Log Mood
          </a>
          <a href="/meditation" className="action-btn">
            🧘 Meditate
          </a>
          <a href="/journal" className="action-btn">
            📝 Write
          </a>
          <a href="/breathing" className="action-btn">
            🫁 Breathe
          </a>
          <a href="/habits" className="action-btn">
            🎯 Track Habits
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard