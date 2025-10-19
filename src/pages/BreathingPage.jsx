import { useState } from 'react'
import BreathingExercise from '../components/BreathingExercise'

function BreathingPage() {
  const [isActive, setIsActive] = useState(false)
  const [selectedTechnique, setSelectedTechnique] = useState('4-4-6')

  const techniques = {
    '4-4-6': {
      name: '4-4-6 Breathing',
      description: 'Inhale for 4, hold for 4, exhale for 6. Great for relaxation.',
      benefits: ['Reduces anxiety', 'Promotes relaxation', 'Improves focus']
    },
    '4-7-8': {
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8. Perfect for sleep.',
      benefits: ['Helps with sleep', 'Reduces stress', 'Calms nervous system']
    },
    'box': {
      name: 'Box Breathing',
      description: 'Inhale, hold, exhale, hold - all for 4 counts each.',
      benefits: ['Improves concentration', 'Reduces stress', 'Enhances performance']
    }
  }

  const handleComplete = () => {
    setIsActive(false)
    alert('Great job! You completed the breathing exercise. How do you feel?')
  }

  return (
    <div className="page">
      <h2>🫁 Breathing Exercises</h2>
      
      {!isActive ? (
        <div className="breathing-selection">
          <div className="technique-cards">
            {Object.entries(techniques).map(([key, technique]) => (
              <div 
                key={key} 
                className={`technique-card ${selectedTechnique === key ? 'selected' : ''}`}
                onClick={() => setSelectedTechnique(key)}
              >
                <h3>{technique.name}</h3>
                <p className="technique-description">{technique.description}</p>
                <div className="benefits">
                  <h4>Benefits:</h4>
                  <ul>
                    {technique.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="breathing-intro">
            <h3>How to Practice</h3>
            <div className="instructions">
              <div className="instruction-step">
                <span className="step-number">1</span>
                <p>Find a comfortable position, sitting or lying down</p>
              </div>
              <div className="instruction-step">
                <span className="step-number">2</span>
                <p>Close your eyes or soften your gaze</p>
              </div>
              <div className="instruction-step">
                <span className="step-number">3</span>
                <p>Follow the visual guide and breathe naturally</p>
              </div>
              <div className="instruction-step">
                <span className="step-number">4</span>
                <p>Complete 8 full cycles for maximum benefit</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsActive(true)}
              className="start-breathing-btn"
            >
              Start {techniques[selectedTechnique].name}
            </button>
          </div>
        </div>
      ) : (
        <BreathingExercise 
          isActive={isActive} 
          onComplete={handleComplete}
          technique={selectedTechnique}
        />
      )}
      
      <div className="breathing-tips">
        <h3>💡 Pro Tips</h3>
        <div className="tips-grid">
          <div className="tip">
            <span className="tip-icon">🌅</span>
            <p>Practice in the morning to start your day centered</p>
          </div>
          <div className="tip">
            <span className="tip-icon">😰</span>
            <p>Use during stressful moments for instant calm</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🛏️</span>
            <p>Try before bed to improve sleep quality</p>
          </div>
          <div className="tip">
            <span className="tip-icon">⏰</span>
            <p>Set reminders to practice regularly</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreathingPage