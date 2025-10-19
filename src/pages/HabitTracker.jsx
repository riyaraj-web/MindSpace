import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

function HabitTracker() {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('wellness')
  const [showAddForm, setShowAddForm] = useState(false)

  const categories = {
    wellness: { icon: '🧘', color: '#10b981', name: 'Wellness' },
    fitness: { icon: '💪', color: '#f59e0b', name: 'Fitness' },
    mindfulness: { icon: '🧠', color: '#8b5cf6', name: 'Mindfulness' },
    social: { icon: '👥', color: '#06b6d4', name: 'Social' },
    creativity: { icon: '🎨', color: '#ec4899', name: 'Creativity' },
    learning: { icon: '📚', color: '#3b82f6', name: 'Learning' }
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
    <div className="page">
      <div className="habits-header">
        <h2>🎯 Habit Tracker</h2>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="add-habit-btn"
        >
          + Add Habit
        </button>
      </div>

      {showAddForm && (
        <div className="add-habit-form">
          <div className="form-row">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
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
              className="habit-input"
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            />
            
            <button onClick={() => addHabit()} className="save-habit-btn">
              Save
            </button>
          </div>

          <div className="quick-add">
            <h4>Quick Add:</h4>
            <div className="predefined-habits">
              {predefinedHabits[selectedCategory].map((habit, index) => (
                <button
                  key={index}
                  onClick={() => addHabit(habit)}
                  className="predefined-habit-btn"
                >
                  {habit}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="habits-grid">
        {habits.map(habit => {
          const category = categories[habit.category]
          const completedToday = isCompletedToday(habit)
          const weeklyProgress = getWeeklyProgress(habit)
          
          return (
            <div key={habit.id} className="habit-card">
              <div className="habit-header">
                <div className="habit-info">
                  <span 
                    className="habit-category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </span>
                  <h3>{habit.name}</h3>
                </div>
                <button 
                  onClick={() => deleteHabit(habit.id)}
                  className="delete-habit-btn"
                >
                  ×
                </button>
              </div>

              <div className="habit-stats">
                <div className="stat">
                  <span className="stat-number">{habit.streak}</span>
                  <span className="stat-label">Current Streak</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{habit.bestStreak}</span>
                  <span className="stat-label">Best Streak</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{getCompletionRate(habit)}%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>

              <div className="weekly-progress">
                <h4>This Week</h4>
                <div className="week-dots">
                  {weeklyProgress.map((day, index) => (
                    <div
                      key={index}
                      className={`day-dot ${day.completed ? 'completed' : ''}`}
                      title={day.date.toLocaleDateString()}
                    >
                      {day.date.toLocaleDateString('en-US', { weekday: 'short' })[0]}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => toggleHabitCompletion(habit.id)}
                className={`complete-habit-btn ${completedToday ? 'completed' : ''}`}
              >
                {completedToday ? '✓ Completed Today' : 'Mark Complete'}
              </button>
            </div>
          )
        })}
      </div>

      {habits.length === 0 && (
        <div className="no-habits">
          <h3>🌱 Start Building Healthy Habits</h3>
          <p>Add your first habit to begin tracking your progress!</p>
        </div>
      )}
    </div>
  )
}

export default HabitTracker