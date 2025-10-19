import { useState, useEffect } from 'react'
import { saveMood } from '../utils/storage'
import { getMoodRecommendations } from '../utils/aiInsights'

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('')
  const [note, setNote] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [recommendations, setRecommendations] = useState([])


  const moods = [
    { emoji: '😊', label: 'Great', value: 5 },
    { emoji: '🙂', label: 'Good', value: 4 },
    { emoji: '😐', label: 'Okay', value: 3 },
    { emoji: '😔', label: 'Low', value: 2 },
    { emoji: '😢', label: 'Difficult', value: 1 }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    saveMood({ mood: selectedMood, note })
    
    // Show personalized recommendations
    const recs = getMoodRecommendations(selectedMood)
    setRecommendations(recs)
    setShowRecommendations(true)
    
    setSelectedMood('')
    setNote('')
  }

  return (
    <div className="page">
      <h2>How are you feeling today?</h2>
      
      <form onSubmit={handleSubmit} className="mood-form">
        <div className="mood-selector">
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              className={`mood-button ${selectedMood === mood.value ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>
        
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What's on your mind? (optional)"
          className="mood-note"
        />
        
        <button type="submit" disabled={!selectedMood} className="submit-btn">
          Log Mood
        </button>
      </form>

      {showRecommendations && (
        <div className="mood-recommendations">
          <h3>💡 Personalized Recommendations</h3>
          <p>Based on your current mood, here are some activities that might help:</p>
          <div className="recommendations-grid">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="rec-icon">{rec.icon}</div>
                <div className="rec-content">
                  <h4>{rec.activity}</h4>
                  <span className="rec-duration">{rec.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowRecommendations(false)}
            className="close-recommendations"
          >
            Got it, thanks!
          </button>
        </div>
      )}

    </div>
  )
}

export default MoodTracker