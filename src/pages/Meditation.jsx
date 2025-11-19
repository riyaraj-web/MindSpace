import { useState } from 'react'
import { saveMeditationSession } from '../utils/storage'
import { Brain, Play, Pause, Square } from 'lucide-react'

function Meditation() {
  const [selectedSession, setSelectedSession] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const sessions = [
    {
      id: 1,
      title: 'Morning Mindfulness',
      duration: '10 min',
      description: 'Start your day with clarity and positive energy',
      icon: '🌅',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    {
      id: 2,
      title: 'Stress Relief',
      duration: '15 min',
      description: 'Release tension and find your inner calm',
      icon: '🧘',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    {
      id: 3,
      title: 'Sleep Preparation',
      duration: '20 min',
      description: 'Prepare your mind and body for restful sleep',
      icon: '🌙',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    },
    {
      id: 4,
      title: 'Breathing Exercise',
      duration: '5 min',
      description: 'Simple breathing techniques for instant calm',
      icon: '🫁',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #0d9488 100%)'
    },
    {
      id: 5,
      title: 'Body Scan',
      duration: '12 min',
      description: 'Connect with your body and release tension',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #be185d 100%)'
    },
    {
      id: 6,
      title: 'Focus & Concentration',
      duration: '8 min',
      description: 'Enhance mental clarity and productivity',
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    }
  ]

  const startSession = (session) => {
    setSelectedSession(session)
    setIsPlaying(true)
    saveMeditationSession({ sessionType: session.title, duration: session.duration })
  }

  const stopSession = () => {
    setSelectedSession(null)
    setIsPlaying(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <Brain size={48} color="#fff" style={{ marginBottom: '1rem' }} />
          <h1 style={styles.title}>Guided Meditation</h1>
          <p style={styles.subtitle}>Find peace and clarity through mindful practice</p>
        </div>

        {!selectedSession ? (
          <div style={styles.sessionsGrid}>
            {sessions.map((session) => (
              <div key={session.id} style={styles.sessionCard}>
                <div style={{ ...styles.sessionIcon, background: session.gradient }}>
                  <span style={{ fontSize: '2.5rem' }}>{session.icon}</span>
                </div>
                <h3 style={styles.sessionTitle}>{session.title}</h3>
                <p style={styles.sessionDuration}>{session.duration}</p>
                <p style={styles.sessionDescription}>{session.description}</p>
                <button 
                  onClick={() => startSession(session)}
                  style={styles.startButton}
                >
                  <Play size={16} style={{ marginRight: '8px' }} />
                  Start Session
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.playerCard}>
            <div style={{ ...styles.playerIcon, background: selectedSession.gradient }}>
              <span style={{ fontSize: '4rem' }}>{selectedSession.icon}</span>
            </div>
            <h2 style={styles.playerTitle}>{selectedSession.title}</h2>
            <p style={styles.playerDescription}>{selectedSession.description}</p>
            
            <div style={styles.timer}>
              <span style={styles.timerText}>{selectedSession.duration}</span>
            </div>
            
            <div style={styles.controls}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={styles.controlButton}
              >
                {isPlaying ? (
                  <>
                    <Pause size={20} style={{ marginRight: '8px' }} />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={20} style={{ marginRight: '8px' }} />
                    Play
                  </>
                )}
              </button>
              <button onClick={stopSession} style={styles.stopButton}>
                <Square size={20} style={{ marginRight: '8px' }} />
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)',
    padding: '2rem 1rem'
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    marginBottom: '3rem',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
    textAlign: 'center'
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
  sessionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem'
  },
  sessionCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2.5rem 2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
    cursor: 'pointer',
    border: '1px solid transparent'
  },
  sessionIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
  },
  sessionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  sessionDuration: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: '1rem'
  },
  sessionDescription: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '1.5rem'
  },
  startButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '0.875rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  playerCard: {
    maxWidth: '600px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '24px',
    padding: '3rem 2rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  playerIcon: {
    width: '120px',
    height: '120px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
  },
  playerTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  playerDescription: {
    fontSize: '1.125rem',
    color: '#64748b',
    marginBottom: '2rem'
  },
  timer: {
    background: '#f8fafc',
    borderRadius: '16px',
    padding: '2rem',
    marginBottom: '2rem'
  },
  timerText: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#6366f1'
  },
  controls: {
    display: 'flex',
    gap: '1rem'
  },
  controlButton: {
    flex: 1,
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  stopButton: {
    flex: 1,
    background: 'transparent',
    color: '#ef4444',
    border: '2px solid #ef4444',
    borderRadius: '12px',
    padding: '1rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default Meditation
