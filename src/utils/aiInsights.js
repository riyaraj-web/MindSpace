// AI-powered insights and recommendations
export const generateMoodInsights = (moods) => {
  if (moods.length < 3) return null

  const recent = moods.slice(-7)
  const avgMood = recent.reduce((sum, m) => sum + m.mood, 0) / recent.length
  const trend = recent.length > 1 ? recent[recent.length - 1].mood - recent[0].mood : 0
  
  const insights = []
  
  // Mood pattern analysis
  if (avgMood >= 4) {
    insights.push({
      type: 'positive',
      title: 'Great Mental State',
      message: 'Your mood has been consistently positive. Keep up the great work!',
      icon: '🌟'
    })
  } else if (avgMood <= 2.5) {
    insights.push({
      type: 'concern',
      title: 'Low Mood Pattern',
      message: 'Your mood has been lower recently. Consider talking to someone or trying meditation.',
      icon: '💙'
    })
  }

  // Trend analysis
  if (trend > 1) {
    insights.push({
      type: 'improvement',
      title: 'Upward Trend',
      message: 'Your mood is improving! Whatever you\'re doing is working.',
      icon: '📈'
    })
  } else if (trend < -1) {
    insights.push({
      type: 'warning',
      title: 'Declining Trend',
      message: 'Your mood has been declining. Consider self-care activities.',
      icon: '📉'
    })
  }

  // Weekly patterns
  const dayOfWeek = new Date().getDay()
  const weekdayMoods = recent.filter(m => {
    const day = new Date(m.date).getDay()
    return day >= 1 && day <= 5
  })
  const weekendMoods = recent.filter(m => {
    const day = new Date(m.date).getDay()
    return day === 0 || day === 6
  })

  if (weekdayMoods.length > 0 && weekendMoods.length > 0) {
    const weekdayAvg = weekdayMoods.reduce((sum, m) => sum + m.mood, 0) / weekdayMoods.length
    const weekendAvg = weekendMoods.reduce((sum, m) => sum + m.mood, 0) / weekendMoods.length
    
    if (weekendAvg - weekdayAvg > 0.5) {
      insights.push({
        type: 'pattern',
        title: 'Weekend Boost',
        message: 'You feel better on weekends. Consider bringing weekend activities into weekdays.',
        icon: '🎯'
      })
    }
  }

  return insights
}

export const generateJournalPrompts = () => {
  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a moment when you felt truly at peace.",
    "What challenge are you facing, and how might you overcome it?",
    "Write about someone who made you smile recently.",
    "What would you tell your younger self?",
    "Describe your ideal day from start to finish.",
    "What's something new you learned about yourself this week?",
    "How do you want to grow in the next month?",
    "What's a fear you'd like to overcome?",
    "Describe a place where you feel most comfortable."
  ]
  
  return prompts[Math.floor(Math.random() * prompts.length)]
}

export const getMoodRecommendations = (currentMood) => {
  const recommendations = {
    1: [
      { activity: 'Deep breathing exercise', duration: '5 min', icon: '🫁' },
      { activity: 'Call a friend or family member', duration: '15 min', icon: '📞' },
      { activity: 'Take a warm shower', duration: '10 min', icon: '🚿' },
      { activity: 'Listen to calming music', duration: '20 min', icon: '🎵' }
    ],
    2: [
      { activity: 'Go for a short walk', duration: '15 min', icon: '🚶' },
      { activity: 'Practice gratitude journaling', duration: '10 min', icon: '📝' },
      { activity: 'Do gentle stretching', duration: '10 min', icon: '🧘' },
      { activity: 'Watch something funny', duration: '20 min', icon: '😄' }
    ],
    3: [
      { activity: 'Organize your space', duration: '20 min', icon: '🏠' },
      { activity: 'Try a new recipe', duration: '30 min', icon: '👨‍🍳' },
      { activity: 'Read a few pages of a book', duration: '15 min', icon: '📚' },
      { activity: 'Do a puzzle or brain game', duration: '20 min', icon: '🧩' }
    ],
    4: [
      { activity: 'Plan something fun for tomorrow', duration: '10 min', icon: '📅' },
      { activity: 'Share your good mood with others', duration: '15 min', icon: '💬' },
      { activity: 'Try a new hobby', duration: '30 min', icon: '🎨' },
      { activity: 'Exercise or dance', duration: '25 min', icon: '💃' }
    ],
    5: [
      { activity: 'Help someone else', duration: '30 min', icon: '🤝' },
      { activity: 'Start a creative project', duration: '45 min', icon: '✨' },
      { activity: 'Plan a future adventure', duration: '20 min', icon: '🗺️' },
      { activity: 'Celebrate your wins', duration: '15 min', icon: '🎉' }
    ]
  }
  
  return recommendations[currentMood] || recommendations[3]
}