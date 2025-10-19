import { useState, useEffect } from 'react'
import { saveJournalEntry, getJournalEntries } from '../utils/storage'
import { generateJournalPrompts } from '../utils/aiInsights'

function Journal() {
  const [entry, setEntry] = useState('')
  const [entries, setEntries] = useState([])
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    setEntries(getJournalEntries())
    setCurrentPrompt(generateJournalPrompts())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (entry.trim()) {
      const newEntry = {
        content: entry
      }
      saveJournalEntry(newEntry)
      setEntries(getJournalEntries())
      setEntry('')
    }
  }

  return (
    <div className="page">
      <h2>📝 Personal Journal</h2>
      
      <div className="journal-prompt">
        <div className="prompt-header">
          <h3>✨ Writing Prompt</h3>
          <button 
            onClick={() => setCurrentPrompt(generateJournalPrompts())}
            className="new-prompt-btn"
          >
            New Prompt
          </button>
        </div>
        <div className="prompt-text">{currentPrompt}</div>
        <button 
          onClick={() => setShowPrompt(!showPrompt)}
          className="toggle-prompt-btn"
        >
          {showPrompt ? 'Hide Prompt' : 'Use This Prompt'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="journal-form">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder={showPrompt ? currentPrompt : "What's on your mind today? Write about your thoughts, feelings, or experiences..."}
          className="journal-textarea"
          rows="8"
        />
        <button type="submit" disabled={!entry.trim()} className="submit-btn">
          Save Entry
        </button>
      </form>
      
      <div className="journal-entries">
        <h3>Previous Entries</h3>
        {entries.length === 0 ? (
          <p className="no-entries">No entries yet. Start writing to see your thoughts here.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="journal-entry">
              <div className="entry-header">
                <span className="entry-date">{new Date(entry.date).toLocaleDateString()}</span>
                <span className="entry-time">{new Date(entry.date).toLocaleTimeString()}</span>
              </div>
              <div className="entry-content">{entry.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Journal