import { useState, useEffect, useRef } from 'react'

function MoodBasedMusic({ currentMood, isPlaying, onToggle }) {
  const [currentTrack, setCurrentTrack] = useState(null)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef(null)

  // Mood-based music recommendations
  const musicLibrary = {
    1: { // Difficult
      tracks: [
        { id: 1, name: 'Healing Rain', artist: 'Nature Sounds', duration: '10:00', frequency: '528Hz', color: '#60a5fa' },
        { id: 2, name: 'Gentle Embrace', artist: 'Ambient Therapy', duration: '8:30', frequency: '432Hz', color: '#a78bfa' },
        { id: 3, name: 'Safe Harbor', artist: 'Calm Waters', duration: '12:00', frequency: '396Hz', color: '#34d399' }
      ],
      description: 'Healing frequencies to lift your spirits'
    },
    2: { // Low
      tracks: [
        { id: 4, name: 'Rising Dawn', artist: 'Hope Collective', duration: '9:15', frequency: '741Hz', color: '#fbbf24' },
        { id: 5, name: 'Gentle Strength', artist: 'Mindful Melodies', duration: '7:45', frequency: '528Hz', color: '#f87171' },
        { id: 6, name: 'Warm Light', artist: 'Comfort Zone', duration: '11:20', frequency: '639Hz', color: '#fb7185' }
      ],
      description: 'Uplifting tones to restore balance'
    },
    3: { // Okay
      tracks: [
        { id: 7, name: 'Steady Flow', artist: 'Balance Point', duration: '8:00', frequency: '528Hz', color: '#6366f1' },
        { id: 8, name: 'Neutral Ground', artist: 'Equilibrium', duration: '10:30', frequency: '432Hz', color: '#8b5cf6' },
        { id: 9, name: 'Center Point', artist: 'Harmony Hub', duration: '9:45', frequency: '741Hz', color: '#10b981' }
      ],
      description: 'Balanced frequencies for stability'
    },
    4: { // Good
      tracks: [
        { id: 10, name: 'Joyful Breeze', artist: 'Positive Vibes', duration: '6:30', frequency: '852Hz', color: '#f59e0b' },
        { id: 11, name: 'Bright Horizon', artist: 'Sunny Sounds', duration: '8:15', frequency: '963Hz', color: '#ef4444' },
        { id: 12, name: 'Happy Waves', artist: 'Cheerful Collective', duration: '7:00', frequency: '528Hz', color: '#6366f1' }
      ],
      description: 'Energizing frequencies to amplify positivity'
    },
    5: { // Great
      tracks: [
        { id: 13, name: 'Euphoric Heights', artist: 'Peak Performance', duration: '5:45', frequency: '963Hz', color: '#8b5cf6' },
        { id: 14, name: 'Celebration Song', artist: 'Victory Sounds', duration: '6:20', frequency: '852Hz', color: '#f59e0b' },
        { id: 15, name: 'Pure Bliss', artist: 'Transcendence', duration: '9:00', frequency: '1111Hz', color: '#8b5cf6' }
      ],
      description: 'High-frequency sounds to maintain peak state'
    }
  }

  const currentMoodMusic = musicLibrary[currentMood] || musicLibrary[3]

  useEffect(() => {
    if (currentMood && !currentTrack) {
      setCurrentTrack(currentMoodMusic.tracks[0])
    }
  }, [currentMood])

  const playTrack = (track) => {
    setIsLoading(true)
    setCurrentTrack(track)
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      onToggle(true)
    }, 1000)
  }

  const togglePlayback = () => {
    onToggle(!isPlaying)
  }

  if (!currentMood) {
    return (
      <div className="music-therapy-placeholder">
        <h3>🎵 Mood-Based Music Therapy</h3>
        <p>Log your mood first to get personalized healing frequencies</p>
      </div>
    )
  }

  return (
    <div className="music-therapy">
      <div className="music-header">
        <h3>🎵 Therapeutic Music</h3>
        <p>{currentMoodMusic.description}</p>
      </div>

      {currentTrack && (
        <div className="now-playing">
          <div className="track-visual" style={{ backgroundColor: currentTrack.color }}>
            <div className={`frequency-wave ${isPlaying ? 'playing' : ''}`}>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
              <div className="wave-bar"></div>
            </div>
          </div>
          
          <div className="track-info">
            <h4>{currentTrack.name}</h4>
            <p>{currentTrack.artist}</p>
            <div className="track-details">
              <span className="frequency">{currentTrack.frequency}</span>
              <span className="duration">{currentTrack.duration}</span>
            </div>
          </div>

          <div className="playback-controls">
            <button 
              onClick={togglePlayback} 
              className="play-btn"
              disabled={isLoading}
            >
              {isLoading ? '⏳' : isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <div className="volume-control">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="volume-slider"
              />
            </div>
          </div>
        </div>
      )}

      <div className="track-list">
        <h4>Recommended for your mood:</h4>
        <div className="tracks">
          {currentMoodMusic.tracks.map(track => (
            <div 
              key={track.id} 
              className={`track-item ${currentTrack?.id === track.id ? 'active' : ''}`}
              onClick={() => playTrack(track)}
            >
              <div className="track-color" style={{ backgroundColor: track.color }}></div>
              <div className="track-details">
                <span className="track-name">{track.name}</span>
                <span className="track-meta">{track.frequency} • {track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MoodBasedMusic