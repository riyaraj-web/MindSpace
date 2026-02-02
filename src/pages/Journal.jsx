import { useState, useEffect } from 'react'
import { saveJournalEntry, getJournalEntries } from '../utils/storage'
import { generateJournalPrompts } from '../utils/aiInsights'
import { BookOpen, Sparkles, Calendar, Clock } from 'lucide-react'
import { Card } from '../design-system/components/Card/Card'
import { Button } from '../design-system/components/Button/Button'
import { Badge } from '../design-system/components/Badge/Badge'

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
            <div className="relative z-10 text-center text-white">
              <BookOpen size={48} className="mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Personal Journal</h1>
              <p className="text-lg md:text-xl opacity-90">Express your thoughts, feelings, and experiences</p>
            </div>
          </div>

          {/* Writing Prompt Card */}
          <Card variant="elevated">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-indigo-600" />
                <h3 className="text-lg font-bold text-neutral-800">Writing Prompt</h3>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPrompt(generateJournalPrompts())}
              >
                New Prompt
              </Button>
            </div>
            <p className="text-neutral-600 italic mb-4 leading-relaxed">{currentPrompt}</p>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowPrompt(!showPrompt)}
            >
              {showPrompt ? 'Hide Prompt' : 'Use This Prompt'}
            </Button>
          </Card>

          {/* Journal Entry Form */}
          <Card variant="elevated">
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder={showPrompt ? currentPrompt : "What's on your mind today? Write about your thoughts, feelings, or experiences..."}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-vertical min-h-[200px]"
                rows="10"
              />
              <Button 
                type="submit" 
                disabled={!entry.trim()} 
                size="lg"
                className="w-full"
              >
                Save Entry
              </Button>
            </form>
          </Card>

          {/* Previous Entries */}
          <div>
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">Previous Entries</h3>
            {entries.length === 0 ? (
              <Card variant="elevated" className="text-center py-16">
                <BookOpen size={48} className="mx-auto mb-4 text-neutral-300" />
                <p className="text-neutral-500">No entries yet. Start writing to see your thoughts here.</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry.id} variant="elevated" className="hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200">
                      <div className="flex items-center gap-2 text-sm font-semibold text-neutral-600">
                        <Calendar size={14} />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Clock size={14} />
                        {new Date(entry.date).toLocaleTimeString()}
                      </div>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{entry.content}</p>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Journal
