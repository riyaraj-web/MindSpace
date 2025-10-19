import { useState, useEffect, useRef } from 'react'

function BreathingExercise({ isActive, onComplete }) {
  const [phase, setPhase] = useState('inhale') // inhale, hold, exhale, pause
  const [count, setCount] = useState(4)
  const [cycle, setCycle] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const totalCycles = 8

  const phases = {
    inhale: { duration: 4, next: 'hold', text: 'Breathe In', color: '#4ade80' },
    hold: { duration: 4, next: 'exhale', text: 'Hold', color: '#fbbf24' },
    exhale: { duration: 6, next: 'pause', text: 'Breathe Out', color: '#60a5fa' },
    pause: { duration: 2, next: 'inhale', text: 'Pause', color: '#a78bfa' }
  }

  useEffect(() => {
    if (isActive && !isRunning) {
      startExercise()
    } else if (!isActive && isRunning) {
      stopExercise()
    }
  }, [isActive])

  const startExercise = () => {
    setIsRunning(true)
    setPhase('inhale')
    setCount(4)
    setCycle(0)
  }

  const stopExercise = () => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            setPhase(currentPhase => {
              const nextPhase = phases[currentPhase].next
              if (currentPhase === 'pause') {
                setCycle(prevCycle => {
                  const newCycle = prevCycle + 1
                  if (newCycle >= totalCycles) {
                    setIsRunning(false)
                    onComplete?.()
                    return 0
                  }
                  return newCycle
                })
              }
              return nextPhase
            })
            return phases[phase]?.duration || 4
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, phase])

  if (!isActive) return null

  const currentPhase = phases[phase]
  const progress = ((totalCycles - cycle) / totalCycles) * 100

  return (
    <div className="breathing-exercise">
      <div className="breathing-container">
        <div 
          className="breathing-circle"
          style={{ 
            backgroundColor: currentPhase.color,
            transform: phase === 'inhale' ? 'scale(1.3)' : 'scale(1)',
            transition: `transform ${currentPhase.duration}s ease-in-out`
          }}
        >
          <div className="breathing-text">
            <div className="phase-text">{currentPhase.text}</div>
            <div className="count-text">{count}</div>
          </div>
        </div>
        
        <div className="breathing-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="cycle-text">
            Cycle {cycle + 1} of {totalCycles}
          </div>
        </div>

        <div className="breathing-instructions">
          <p>Follow the circle and breathe naturally</p>
          <button onClick={stopExercise} className="stop-breathing-btn">
            Stop Exercise
          </button>
        </div>
      </div>
    </div>
  )
}

export default BreathingExercise