import { useState } from 'react'
import BreathingExercise from '../components/BreathingExercise'
import { Card } from '../design-system/components/Card/Card'
import { Button } from '../design-system/components/Button/Button'
import { Badge } from '../design-system/components/Badge/Badge'

function BreathingPage() {
  const [isActive, setIsActive] = useState(false)
  const [selectedTechnique, setSelectedTechnique] = useState('4-4-6')

  const techniques = {
    '4-4-6': {
      name: '4-4-6 Breathing',
      description: 'Inhale for 4, hold for 4, exhale for 6. Great for relaxation.',
      benefits: ['Reduces anxiety', 'Promotes relaxation', 'Improves focus'],
      gradient: 'from-emerald-500 to-teal-500'
    },
    '4-7-8': {
      name: '4-7-8 Breathing',
      description: 'Inhale for 4, hold for 7, exhale for 8. Perfect for sleep.',
      benefits: ['Helps with sleep', 'Reduces stress', 'Calms nervous system'],
      gradient: 'from-indigo-500 to-purple-500'
    },
    'box': {
      name: 'Box Breathing',
      description: 'Inhale, hold, exhale, hold - all for 4 counts each.',
      benefits: ['Improves concentration', 'Reduces stress', 'Enhances performance'],
      gradient: 'from-pink-500 to-rose-500'
    }
  }

  const handleComplete = () => {
    setIsActive(false)
    alert('Great job! You completed the breathing exercise. How do you feel?')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
            <div className="relative z-10 text-center text-white">
              <div className="text-6xl mb-4">🫁</div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Breathing Exercises</h1>
              <p className="text-lg md:text-xl opacity-90">Calm your mind with guided breathing techniques</p>
            </div>
          </div>

          {!isActive ? (
            <>
              {/* Technique Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(techniques).map(([key, technique]) => (
                  <Card 
                    key={key}
                    variant="elevated"
                    className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                      selectedTechnique === key 
                        ? 'ring-4 ring-indigo-500 shadow-2xl' 
                        : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedTechnique(key)}
                  >
                    <div className={`w-full h-2 rounded-t-2xl bg-gradient-to-r ${technique.gradient} mb-4 -mt-6 -mx-6`}></div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">{technique.name}</h3>
                    <p className="text-sm text-neutral-600 mb-4">{technique.description}</p>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-700 mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {technique.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {selectedTechnique === key && (
                      <Badge variant="success" className="mt-4">Selected</Badge>
                    )}
                  </Card>
                ))}
              </div>

              {/* How to Practice */}
              <Card variant="elevated">
                <h3 className="text-2xl font-bold text-neutral-800 mb-6">How to Practice</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      1
                    </div>
                    <div>
                      <p className="text-sm text-neutral-700">Find a comfortable position, sitting or lying down</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      2
                    </div>
                    <div>
                      <p className="text-sm text-neutral-700">Close your eyes or soften your gaze</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      3
                    </div>
                    <div>
                      <p className="text-sm text-neutral-700">Follow the visual guide and breathe naturally</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      4
                    </div>
                    <div>
                      <p className="text-sm text-neutral-700">Complete 8 full cycles for maximum benefit</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsActive(true)}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Start {techniques[selectedTechnique].name}
                </Button>
              </Card>

              {/* Pro Tips */}
              <Card variant="elevated">
                <h3 className="text-2xl font-bold text-neutral-800 mb-6">💡 Pro Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                    <span className="text-4xl mb-3">🌅</span>
                    <p className="text-sm text-neutral-700">Practice in the morning to start your day centered</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                    <span className="text-4xl mb-3">😰</span>
                    <p className="text-sm text-neutral-700">Use during stressful moments for instant calm</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                    <span className="text-4xl mb-3">🛏️</span>
                    <p className="text-sm text-neutral-700">Try before bed to improve sleep quality</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                    <span className="text-4xl mb-3">⏰</span>
                    <p className="text-sm text-neutral-700">Set reminders to practice regularly</p>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <BreathingExercise 
              isActive={isActive} 
              onComplete={handleComplete}
              technique={selectedTechnique}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BreathingPage