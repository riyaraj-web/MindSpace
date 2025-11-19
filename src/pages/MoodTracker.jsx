import { useState } from 'react'
import { saveMood } from '../utils/storage'
import { getMoodRecommendations } from '../utils/aiInsights'
import { Heart, Smile, Meh, Frown, CloudRain } from 'lucide-react'

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('')
  const [note, setNote] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  const moods = [
    { icon: <Smile size={48} />, label: 'Great', value: 5, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
    { icon: <Smile size={48} />, label: 'Good', value: 4, color: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
    { icon: <Meh size={48} />, label: 'Okay', value: 3, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' },
    { icon: <Frown size={48} />, label: 'Low', value: 2, color: '#f97316', gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' },
    { icon: <CloudRain size={48} />, label: 'Difficult', value: 1, color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    saveMood({ mood: selectedMood, note })
    
    const recs = getMoodRecommendations(selectedMood)
    setRecommendations(recs)
    setShowRecommendations(true)
    
    setSelectedMood('')
    setNote('')
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Heart size={40} color="#fff" style={{ marginBottom: '1rem' }} />
        <h1 style={styles.title}>How are you feeling today?</h1>
        <p style={styles.subtitle}>Track your emotional wellbeing and discover patterns</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.moodGrid}>
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              style={{
                ...styles.moodButton,
                ...(selectedMood === mood.value ? { ...styles.moodButtonSelected, background: mood.gradient } : {})
              }}
              onClick={() => setSelectedMood(mood.value)}
            >
              <div style={styles.moodIcon}>{mood.icon}</div>
              <span style={styles.moodLabel}>{mood.label}</span>
            </button>
          ))}
        </div>
        
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What's on your mind? (optional)"
          style={styles.textarea}
          rows="4"
        />
        
        <button 
          type="submit" 
          disabled={!selectedMood} 
          style={{
            ...styles.submitButton,
            ...(selectedMood ? {} : styles.submitButtonDisabled)
          }}
        >
          Log Mood
        </button>
      </form>

      {showRecommendations && (
        <div style={styles.recommendationsCard}>
          <h3 style={styles.recommendationsTitle}>💡 Personalized Recommendations</h3>
          <p style={styles.recommendationsSubtitle}>Based on your current mood, here are some activities that might help:</p>
          <div style={styles.recommendationsGrid}>
            {recommendations.map((rec, index) => (
              <div key={index} style={styles.recommendationItem}>
                <div style={styles.recIcon}>{rec.icon}</div>
                <div style={styles.recContent}>
                  <h4 style={styles.recTitle}>{rec.activity}</h4>
                  <span style={styles.recDuration}>{rec.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowRecommendations(false)}
            style={styles.closeButton}
          >
            Got it, thanks!
          </button>
        </div>
      )}
    </div>
  )
}

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
    maxWidth: '800px',
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
  form: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  moodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  moodButton: {
    background: '#fff',
    border: '3px solid #e2e8f0',
    borderRadius: '20px',
    padding: '2rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#64748b'
  },
  moodButtonSelected: {
    border: '3px solid transparent',
    transform: 'scale(1.05)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    color: '#fff'
  },
  moodIcon: {
    marginBottom: '0.5rem'
  },
  moodLabel: {
    fontSize: '1rem',
    fontWeight: '600'
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '1.5rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  recommendationsCard: {
    maxWidth: '800px',
    margin: '2rem auto 0',
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  recommendationsTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  recommendationsSubtitle: {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '1.5rem'
  },
  recommendationsGrid: {
    display: 'grid',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  recommendationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    background: '#f8fafc',
    borderRadius: '12px'
  },
  recIcon: {
    fontSize: '2rem'
  },
  recContent: {
    flex: 1
  },
  recTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '0.25rem'
  },
  recDuration: {
    fontSize: '0.875rem',
    color: '#64748b'
  },
  closeButton: {
    width: '100%',
    background: 'transparent',
    color: '#6366f1',
    border: '2px solid #6366f1',
    borderRadius: '12px',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  }
}

export default MoodTracker
