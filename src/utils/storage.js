// Local storage utilities for Mindspace app
export const storage = {
  // Mood tracking
  saveMood: (moodData) => {
    const moods = getMoods()
    moods.push({
      ...moodData,
      id: Date.now(),
      date: new Date().toISOString()
    })
    localStorage.setItem('mindspace_moods', JSON.stringify(moods))
  },

  getMoods: () => {
    const moods = localStorage.getItem('mindspace_moods')
    return moods ? JSON.parse(moods) : []
  },

  // Journal entries
  saveJournalEntry: (entry) => {
    const entries = getJournalEntries()
    entries.unshift({
      ...entry,
      id: Date.now(),
      date: new Date().toISOString()
    })
    localStorage.setItem('mindspace_journal', JSON.stringify(entries))
  },

  getJournalEntries: () => {
    const entries = localStorage.getItem('mindspace_journal')
    return entries ? JSON.parse(entries) : []
  },

  // Meditation sessions
  saveMeditationSession: (sessionData) => {
    const sessions = getMeditationHistory()
    sessions.push({
      ...sessionData,
      id: Date.now(),
      date: new Date().toISOString()
    })
    localStorage.setItem('mindspace_meditation', JSON.stringify(sessions))
  },

  getMeditationHistory: () => {
    const sessions = localStorage.getItem('mindspace_meditation')
    return sessions ? JSON.parse(sessions) : []
  }
}

// Export individual functions for convenience
export const { saveMood, getMoods, saveJournalEntry, getJournalEntries, saveMeditationSession, getMeditationHistory } = storage