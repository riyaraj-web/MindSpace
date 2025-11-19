import { useState, useEffect } from 'react'

function HabitTracker() {
  const [habits, setHabits] = useState([])
  const [newHabit, setNewHabit] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('wellness')
  const [showAddForm, setShowAddForm] = useState(false)

  const categories = {
    wellness: { icon: '🧘', color: '#10b981', name: 'Wellness' },
    fitness: { icon: '💪', color: '#f59e0b', name: 'Fitness' },
    mindfulness: { icon: '🧠', color: '#8b5cf6', name: 'Mindfulness' },
    social: { icon: '👥', color: '#6366f1', name: 'Social' },
    creativity: { icon: '🎨', color: '#8b5cf6', name: 'Creativity' },
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
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</span>
        <h1 style={styles.title}>Habit Tracker</h1>
        <p style={styles.subtitle}>Build lasting routines and track your progress</p>
      </div>
      <div style={styles.content}>
      <div style={styles.habitsHeader}>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          style={styles.addButton}
        >
          + Add Habit
        </button>
      </div>

      {showAddForm && (
        <div style={styles.addForm}>
          <div style={styles.formRow}>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.select}
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
              onKeyDown={(e) => e.key === 'Enter' && addHabit()}
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
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)',
    padding: '2rem 1rem'
  },
  header: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    marginBottom: '3rem',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
    textAlign: 'center',
    maxWidth: '1400px',
    margin: '0 auto 3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  content: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  habitsHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '2rem'
  },
  addButton: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease'
  },
  addForm: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr auto',
    gap: '1rem',
    marginBottom: '1rem'
  },
  select: {
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    background: '#fff',
    cursor: 'pointer'
  }
}

export default HabitTracker