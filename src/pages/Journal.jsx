import { useState, useEffect } from 'react'
import { saveJournalEntry, getJournalEntries } from '../utils/storage'
import { generateJournalPrompts } from '../utils/aiInsights'
import { BookOpen, Sparkles, Calendar, Clock } from 'lucide-react'

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
    <div style={styles.container}>
      <div style={styles.header}>
        <BookOpen size={40} color="#fff" style={{ marginBottom: '1rem' }} />
        <h1 style={styles.title}>Personal Journal</h1>
        <p style={styles.subtitle}>Express your thoughts, feelings, and experiences</p>
      </div>

      <div style={styles.content}>
        <div style={styles.promptCard}>
          <div style={styles.promptHeader}>
            <div style={styles.promptTitleRow}>
              <Sparkles size={20} color="#6366f1" />
              <h3 style={styles.promptTitle}>Writing Prompt</h3>
            </div>
            <button 
              onClick={() => setCurrentPrompt(generateJournalPrompts())}
              style={styles.newPromptButton}
            >
              New Prompt
            </button>
          </div>
          <div style={styles.promptText}>{currentPrompt}</div>
          <button 
            onClick={() => setShowPrompt(!showPrompt)}
            style={styles.usePromptButton}
          >
            {showPrompt ? 'Hide Prompt' : 'Use This Prompt'}
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder={showPrompt ? currentPrompt : "What's on your mind today? Write about your thoughts, feelings, or experiences..."}
            style={styles.textarea}
            rows="10"
          />
          <button 
            type="submit" 
            disabled={!entry.trim()} 
            style={{
              ...styles.submitButton,
              ...(entry.trim() ? {} : styles.submitButtonDisabled)
            }}
          >
            Save Entry
          </button>
        </form>

        <div style={styles.entriesSection}>
          <h3 style={styles.entriesTitle}>Previous Entries</h3>
          {entries.length === 0 ? (
            <div style={styles.noEntries}>
              <BookOpen size={48} color="#cbd5e1" />
              <p>No entries yet. Start writing to see your thoughts here.</p>
            </div>
          ) : (
            <div style={styles.entriesGrid}>
              {entries.map((entry) => (
                <div key={entry.id} style={styles.entryCard}>
                  <div style={styles.entryHeader}>
                    <div style={styles.entryDate}>
                      <Calendar size={14} style={{ marginRight: '6px' }} />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div style={styles.entryTime}>
                      <Clock size={14} style={{ marginRight: '6px' }} />
                      {new Date(entry.date).toLocaleTimeString()}
                    </div>
                  </div>
                  <div style={styles.entryContent}>{entry.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
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
    marginBottom: '2rem',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto 2rem'
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
    maxWidth: '900px',
    margin: '0 auto'
  },
  promptCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  promptHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  promptTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  promptTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#2d3748',
    margin: 0
  },
  newPromptButton: {
    background: 'transparent',
    color: '#6366f1',
    border: '2px solid #6366f1',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  promptText: {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: '1.7',
    marginBottom: '1rem',
    fontStyle: 'italic'
  },
  usePromptButton: {
    background: '#f1f5f9',
    color: '#475569',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  form: {
    marginBottom: '2rem'
  },
  textarea: {
    width: '100%',
    padding: '1.5rem',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '1rem',
    outline: 'none',
    lineHeight: '1.7',
    background: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '16px',
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  entriesSection: {
    marginTop: '3rem'
  },
  entriesTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1.5rem'
  },
  noEntries: {
    background: '#fff',
    borderRadius: '16px',
    padding: '3rem 2rem',
    textAlign: 'center',
    color: '#94a3b8',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  entriesGrid: {
    display: 'grid',
    gap: '1.5rem'
  },
  entryCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  entryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #e2e8f0'
  },
  entryDate: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#64748b'
  },
  entryTime: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.75rem',
    color: '#94a3b8'
  },
  entryContent: {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: '1.7'
  }
}

export default Journal
