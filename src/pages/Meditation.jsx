import { useState } from 'react'
import { saveMeditationSession } from '../utils/storage'

function Meditation() {
  const [selectedSession, setSelectedSession] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const sessions = [
    { id: 1, title: 'Morning Mindfulness', duration: '10 min', description: 'Start your day with clarity' },
    { id: 2, title: 'Stress Relief', duration: '15 min', description: 'Release tension and anxiety' },
    { id: 3, title: 'Sleep Preparation', duration: '20 min', description: 'Prepare for restful sleep' },
    { id: 4, title: 'Breathing Exercise', duration: '5 min', description: 'Simple breathing techniques' }
  ]

  const startSession = (session) => {
    setSelectedSession(session)
    setIsPlaying(true)
  }

  const stopSession = () => {
    if (selectedSession) {
      saveMeditationSession({
        sessionId: selectedSession.id,
        title: selectedSession.title,
        duration: selectedSession.duration,
        completed: true
      })
    }
    setIsPlaying(false)
    setSelectedSession(null)
  }

  return (
    <div className="page">
      <h2>Guided Meditation</h2>
      
      {!selectedSession ? (
        <div className="meditation-sessions">
          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <h3>{session.title}</h3>
              <p className="duration">{session.duration}</p>
              <p className="description">{session.description}</p>
              <button 
                onClick={() => startSession(session)}
                className="start-btn"
              >
                Start Session
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="active-session">
          <h3>{selectedSession.title}</h3>
          <div className="session-player">
            <div className="timer">
              <span className="time">{selectedSession.duration}</span>
            </div>
            <div className="controls">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="play-pause-btn"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
              <button onClick={stopSession} className="stop-btn">
                ⏹️ Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Meditation