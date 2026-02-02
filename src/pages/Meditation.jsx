import { useState } from 'react'
import { saveMeditationSession } from '../utils/storage'
import { Brain, Play, Pause, Square } from 'lucide-react'
import { Card } from '../design-system/components/Card/Card'
import { Button } from '../design-system/components/Button/Button'

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
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      id: 2,
      title: 'Stress Relief',
      duration: '15 min',
      description: 'Release tension and find your inner calm',
      icon: '🧘',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 3,
      title: 'Sleep Preparation',
      duration: '20 min',
      description: 'Prepare your mind and body for restful sleep',
      icon: '🌙',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 4,
      title: 'Breathing Exercise',
      duration: '5 min',
      description: 'Simple breathing techniques for instant calm',
      icon: '🫁',
      gradient: 'from-teal-500 to-emerald-600'
    },
    {
      id: 5,
      title: 'Body Scan',
      duration: '12 min',
      description: 'Connect with your body and release tension',
      icon: '✨',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      id: 6,
      title: 'Focus & Concentration',
      duration: '8 min',
      description: 'Enhance mental clarity and productivity',
      icon: '🎯',
      gradient: 'from-green-500 to-emerald-600'
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
              <Brain size={48} className="mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Guided Meditation</h1>
              <p className="text-lg md:text-xl opacity-90">Find peace and clarity through mindful practice</p>
            </div>
          </div>

          {!selectedSession ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <Card 
                  key={session.id} 
                  variant="elevated"
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => startSession(session)}
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${session.gradient} flex items-center justify-center text-4xl shadow-lg mx-auto mb-4`}>
                    {session.icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2 text-center">{session.title}</h3>
                  <p className="text-base font-semibold text-indigo-600 mb-3 text-center">{session.duration}</p>
                  <p className="text-sm text-neutral-600 mb-4 text-center leading-relaxed">{session.description}</p>
                  <Button 
                    size="lg"
                    className="w-full"
                  >
                    <Play size={16} className="mr-2" />
                    Start Session
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="elevated" className="max-w-2xl mx-auto">
              <div className="text-center">
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${selectedSession.gradient} flex items-center justify-center text-6xl shadow-xl mx-auto mb-6`}>
                  {selectedSession.icon}
                </div>
                <h2 className="text-3xl font-bold text-neutral-800 mb-3">{selectedSession.title}</h2>
                <p className="text-lg text-neutral-600 mb-8">{selectedSession.description}</p>
                
                <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 mb-8">
                  <span className="text-5xl font-bold text-indigo-600">{selectedSession.duration}</span>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    size="lg"
                    className="flex-1"
                  >
                    {isPlaying ? (
                      <>
                        <Pause size={20} className="mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={20} className="mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={stopSession} 
                    variant="outline"
                    size="lg"
                    className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                  >
                    <Square size={20} className="mr-2" />
                    Stop
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Meditation
