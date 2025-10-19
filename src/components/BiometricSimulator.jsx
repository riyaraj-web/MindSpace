import { useState, useEffect } from 'react'

function BiometricSimulator() {
  const [isConnected, setIsConnected] = useState(false)
  const [heartRate, setHeartRate] = useState(72)
  const [stressLevel, setStressLevel] = useState(3)
  const [sleepQuality, setSleepQuality] = useState(85)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  // Simulate real-time biometric data
  useEffect(() => {
    let interval
    if (isMonitoring) {
      interval = setInterval(() => {
        // Simulate heart rate variability
        setHeartRate(prev => {
          const variation = (Math.random() - 0.5) * 10
          return Math.max(60, Math.min(100, prev + variation))
        })

        // Simulate stress level changes
        setStressLevel(prev => {
          const change = (Math.random() - 0.5) * 2
          return Math.max(1, Math.min(10, prev + change))
        })

        // Update sleep quality more slowly
        if (Math.random() < 0.1) {
          setSleepQuality(prev => {
            const change = (Math.random() - 0.5) * 10
            return Math.max(0, Math.min(100, prev + change))
          })
        }
      }, 2000)
    }

    return () => clearInterval(interval)
  }, [isMonitoring])

  // Generate recommendations based on biometric data
  useEffect(() => {
    const newRecommendations = []

    if (heartRate > 90) {
      newRecommendations.push({
        type: 'warning',
        icon: '💓',
        title: 'Elevated Heart Rate',
        message: 'Consider taking a few deep breaths or trying a breathing exercise.',
        action: 'Start Breathing Exercise'
      })
    }

    if (stressLevel > 7) {
      newRecommendations.push({
        type: 'alert',
        icon: '😰',
        title: 'High Stress Detected',
        message: 'Your stress levels are elevated. Try meditation or journaling.',
        action: 'Open Meditation'
      })
    }

    if (sleepQuality < 70) {
      newRecommendations.push({
        type: 'info',
        icon: '😴',
        title: 'Poor Sleep Quality',
        message: 'Your sleep quality could be better. Consider a bedtime routine.',
        action: 'Sleep Tips'
      })
    }

    if (heartRate < 70 && stressLevel < 4) {
      newRecommendations.push({
        type: 'positive',
        icon: '✨',
        title: 'Great Vitals!',
        message: 'Your biometrics look excellent. Keep up the good work!',
        action: 'Log Mood'
      })
    }

    setRecommendations(newRecommendations)
  }, [heartRate, stressLevel, sleepQuality])

  const connectDevice = () => {
    setIsConnected(true)
    setIsMonitoring(true)
    // Simulate connection delay
    setTimeout(() => {
      alert('Biometric device connected! (Simulated)')
    }, 1000)
  }

  const disconnectDevice = () => {
    setIsConnected(false)
    setIsMonitoring(false)
  }

  const getHeartRateColor = () => {
    if (heartRate < 70) return '#10b981'
    if (heartRate < 85) return '#f59e0b'
    return '#ef4444'
  }

  const getStressColor = () => {
    if (stressLevel < 4) return '#10b981'
    if (stressLevel < 7) return '#f59e0b'
    return '#ef4444'
  }

  const getSleepColor = () => {
    if (sleepQuality > 80) return '#10b981'
    if (sleepQuality > 60) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="biometric-simulator">
      <div className="biometric-header">
        <h3>📱 Biometric Integration</h3>
        <div className="connection-status">
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></div>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {!isConnected ? (
        <div className="connection-panel">
          <div className="device-options">
            <h4>Connect Your Device</h4>
            <div className="device-list">
              <button onClick={connectDevice} className="device-btn">
                <span className="device-icon">⌚</span>
                <div className="device-info">
                  <span className="device-name">Apple Watch</span>
                  <span className="device-status">Available</span>
                </div>
              </button>
              
              <button onClick={connectDevice} className="device-btn">
                <span className="device-icon">📱</span>
                <div className="device-info">
                  <span className="device-name">Fitbit</span>
                  <span className="device-status">Available</span>
                </div>
              </button>
              
              <button onClick={connectDevice} className="device-btn">
                <span className="device-icon">💍</span>
                <div className="device-info">
                  <span className="device-name">Oura Ring</span>
                  <span className="device-status">Available</span>
                </div>
              </button>
            </div>
            <p className="simulation-note">
              * This is a simulation for demonstration purposes
            </p>
          </div>
        </div>
      ) : (
        <div className="biometric-data">
          <div className="vitals-grid">
            <div className="vital-card">
              <div className="vital-icon" style={{ color: getHeartRateColor() }}>💓</div>
              <div className="vital-info">
                <span className="vital-value">{Math.round(heartRate)}</span>
                <span className="vital-unit">BPM</span>
                <span className="vital-label">Heart Rate</span>
              </div>
              <div className="vital-trend">
                {heartRate > 80 ? '↗️' : heartRate < 70 ? '↘️' : '➡️'}
              </div>
            </div>

            <div className="vital-card">
              <div className="vital-icon" style={{ color: getStressColor() }}>😰</div>
              <div className="vital-info">
                <span className="vital-value">{stressLevel.toFixed(1)}</span>
                <span className="vital-unit">/10</span>
                <span className="vital-label">Stress Level</span>
              </div>
              <div className="vital-trend">
                {stressLevel > 6 ? '⚠️' : stressLevel < 4 ? '✅' : '⚡'}
              </div>
            </div>

            <div className="vital-card">
              <div className="vital-icon" style={{ color: getSleepColor() }}>😴</div>
              <div className="vital-info">
                <span className="vital-value">{Math.round(sleepQuality)}</span>
                <span className="vital-unit">%</span>
                <span className="vital-label">Sleep Quality</span>
              </div>
              <div className="vital-trend">
                {sleepQuality > 80 ? '🌟' : sleepQuality < 60 ? '😪' : '💤'}
              </div>
            </div>
          </div>

          {recommendations.length > 0 && (
            <div className="biometric-recommendations">
              <h4>🤖 AI Health Insights</h4>
              <div className="recommendations-list">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`recommendation ${rec.type}`}>
                    <span className="rec-icon">{rec.icon}</span>
                    <div className="rec-content">
                      <h5>{rec.title}</h5>
                      <p>{rec.message}</p>
                      <button className="rec-action-btn">{rec.action}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="biometric-controls">
            <button 
              onClick={() => setIsMonitoring(!isMonitoring)}
              className={`monitor-btn ${isMonitoring ? 'monitoring' : ''}`}
            >
              {isMonitoring ? '⏸️ Pause Monitoring' : '▶️ Start Monitoring'}
            </button>
            
            <button onClick={disconnectDevice} className="disconnect-btn">
              🔌 Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BiometricSimulator