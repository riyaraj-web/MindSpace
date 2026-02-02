import { useState, useEffect } from 'react'
import { Card } from '../design-system/components/Card/Card'
import { Button } from '../design-system/components/Button/Button'
import { Badge } from '../design-system/components/Badge/Badge'

function HabitTracker() {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('wellness')
  const [showAddForm, setShowAddForm] = useState(false)

  const categories = {
    wellness: { icon: '🧘', color: 'from-emerald-500 to-teal-500', name: 'Wellness' },
    fitness: { icon: '💪', color: 'from-orange-500 to-amber-500', name: 'Fitness' },
    mindfulness: { icon: '🧠', color: 'from-purple-500 to-indigo-500', name: 'Mindfulness' },
    social: { icon: '👥', color: 'from-blue-500 to-cyan-500', name: 'Social' },
    creativity: { icon: '🎨', color: 'from-pink-500 to-rose-500', name: 'Creativity' },
    learning: { icon: '📚', color: 'from-indigo-500 to-blue-500', name: 'Learning' }
  }

  const predefinedHabits = {
    wellness: ['Drink 8 glasses of water', 'Take vitamins', 'Get 8 hours sleep', 'Eat vegetables'],
    fitness: ['10 minute walk', '20 push-ups', 'Stretch for 5 minutes', 'Take stairs'],
    mindfulness: ['5 minute meditation', 'Practice gratitude', 'Deep breathing', 'Mindful eating'],
    social: ['Call a friend', 'Compliment someone', 'Help a neighbor', 'Family time'],
    creativity: ['Write for 10 minutes', 'Draw/sketch', 'Play music', 'Try new recipe'],
    learning: ['Read 10 pages', 'Learn new word', 'Watch educational video', 'Practice skill']
  }

  useEffect(() => {
    loadHabits()
  }, [])

  const loadHabits = () => {
    const savedHabits = localStorage.getItem('mindspace_habits')
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits))
    } else {
      // Initialize with some default habits
      const defaultHabits = [
        createHabit('Daily meditation', 'mindfulness'),
        createHabit('Drink water', 'wellness'),
        createHabit('Exercise', 'fitness')
      ]
      setHabits(defaultHabits)
      saveHabits(defaultHabits)
    }
  }

  const saveHabits = (habitsToSave) => {
    localStorage.setItem('mindspace_habits', JSON.stringify(habitsToSave))
  }

  const createHabit = (name, category) => ({
    id: Date.now() + Math.random(),
    name,
    category,
    createdAt: new Date().toISOString(),
    completions: [],
    streak: 0,
    bestStreak: 0
  })

  const addHabit = (habitName = newHabit) => {
    if (!habitName.trim()) return

    const habit = createHabit(habitName, selectedCategory)
    const updatedHabits = [...habits, habit]
    setHabits(updatedHabits)
    saveHabits(updatedHabits)
    setNewHabit('')
    setShowAddForm(false)
  }

  const toggleHabitCompletion = (habitId) => {
    const today = new Date().toDateString()
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const isCompletedToday = habit.completions.some(date => 
          new Date(date).toDateString() === today
        )

        let newCompletions
        if (isCompletedToday) {
          // Remove today's completion
          newCompletions = habit.completions.filter(date => 
            new Date(date).toDateString() !== today
          )
        } else {
          // Add today's completion
          newCompletions = [...habit.completions, new Date().toISOString()]
        }

        // Calculate streak
        const streak = calculateStreak(newCompletions)
        const bestStreak = Math.max(habit.bestStreak, streak)

        return {
          ...habit,
          completions: newCompletions,
          streak,
          bestStreak
        }
      }
      return habit
    })

    setHabits(updatedHabits)
    saveHabits(updatedHabits)
  }

  const calculateStreak = (completions) => {
    if (completions.length === 0) return 0

    const sortedDates = completions
      .map(date => new Date(date).toDateString())
      .sort((a, b) => new Date(b) - new Date(a))

    let streak = 0
    let currentDate = new Date()

    for (let i = 0; i < sortedDates.length; i++) {
      const completionDate = new Date(sortedDates[i])
      const daysDiff = Math.floor((currentDate - completionDate) / (1000 * 60 * 60 * 24))

      if (daysDiff === streak) {
        streak++
      } else if (daysDiff === streak + 1 && streak === 0) {
        // Allow for today not being completed yet
        streak++
      } else {
        break
      }
      
      currentDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000)
    }

    return streak
  }

  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId)
    setHabits(updatedHabits)
    saveHabits(updatedHabits)
  }

  const getCompletionRate = (habit) => {
    const daysActive = Math.max(1, Math.floor((new Date() - new Date(habit.createdAt)) / (1000 * 60 * 60 * 24)) + 1)
    return Math.round((habit.completions.length / daysActive) * 100)
  }

  const isCompletedToday = (habit) => {
    const today = new Date().toDateString()
    return habit.completions.some(date => new Date(date).toDateString() === today)
  }

  const getWeeklyProgress = (habit) => {
    const today = new Date()
    const weekStart = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)
    
    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart.getTime() + i * 24 * 60 * 60 * 1000)
      const isCompleted = habit.completions.some(date => 
        new Date(date).toDateString() === day.toDateString()
      )
      weekDays.push({ date: day, completed: isCompleted })
    }
    
    return weekDays
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
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">🎯 Habit Tracker</h1>
              <p className="text-lg md:text-xl opacity-90">Build lasting routines and track your progress</p>
            </div>
          </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          size="lg"
          className="shadow-lg"
        >
          + Add Habit
        </Button>
      </div>

      {showAddForm && (
        <Card variant="elevated" className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
              >
                {Object.entries(categories).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
              
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter habit name..."
                className="px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors md:col-span-1"
                onKeyDown={(e) => e.key === 'Enter' && addHabit()}
              />
              
              <Button onClick={() => addHabit()} size="lg">
                Save Habit
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-700 mb-3">Quick Add:</h4>
              <div className="flex flex-wrap gap-2">
                {predefinedHabits[selectedCategory].map((habit, index) => (
                  <button
                    key={index}
                    onClick={() => addHabit(habit)}
                    className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-200"
                  >
                    {habit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {habits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map(habit => {
            const category = categories[habit.category]
            const completedToday = isCompletedToday(habit)
            const weeklyProgress = getWeeklyProgress(habit)
            
            return (
              <Card key={habit.id} variant="elevated" className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">{habit.name}</h3>
                      <Badge variant="default" className="mt-1">{category.name}</Badge>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteHabit(habit.id)}
                    className="text-neutral-400 hover:text-red-500 text-2xl leading-none transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-extrabold text-indigo-600">{habit.streak}</div>
                    <div className="text-xs text-neutral-600 font-medium">Current</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-extrabold text-purple-600">{habit.bestStreak}</div>
                    <div className="text-xs text-neutral-600 font-medium">Best</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-extrabold text-pink-600">{getCompletionRate(habit)}%</div>
                    <div className="text-xs text-neutral-600 font-medium">Success</div>
                  </div>
                </div>

                {/* Weekly Progress */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-700 mb-2">This Week</h4>
                  <div className="flex gap-2 justify-between">
                    {weeklyProgress.map((day, index) => (
                      <div
                        key={index}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                          day.completed 
                            ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md' 
                            : 'bg-neutral-100 text-neutral-400'
                        }`}
                        title={day.date.toLocaleDateString()}
                      >
                        {day.date.toLocaleDateString('en-US', { weekday: 'short' })[0]}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete Button */}
                <Button
                  onClick={() => toggleHabitCompletion(habit.id)}
                  variant={completedToday ? "default" : "outline"}
                  size="lg"
                  className={`w-full ${completedToday ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' : ''}`}
                >
                  {completedToday ? '✓ Completed Today' : 'Mark Complete'}
                </Button>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card variant="elevated" className="text-center py-16">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold text-neutral-800 mb-2">Start Building Healthy Habits</h3>
          <p className="text-neutral-600">Add your first habit to begin tracking your progress!</p>
        </Card>
      )}
        </div>
      </div>
    </div>
  )
}
export default HabitTracker