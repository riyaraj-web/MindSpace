import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMoods, getJournalEntries } from '../utils/storage'
import { generateMoodInsights } from '../utils/aiInsights'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Smile, Heart, TrendingUp, Calendar, BookOpen, Activity } from 'lucide-react'

function Dashboard() {
  const [stats, setStats] = useState({
    totalMoods: 0,
    averageMood: 0,
    totalJournalEntries: 0,
    recentMoods: [],
    streak: 0
  })
  const [insights, setInsights] = useState([])
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    const moods = getMoods()
    const journalEntries = getJournalEntries()

    const totalMoods = moods.length
    const averageMood = totalMoods > 0 
      ? (moods.reduce((sum, mood) => sum + mood.mood, 0) / totalMoods).toFixed(1)
      : 0

    const recentMoods = moods.slice(-7).reverse()

    let streak = 0
    const today = new Date().toDateString()
    if (moods.length > 0 && new Date(moods[moods.length - 1].date).toDateString() === today) {
      streak = 1
      for (let i = moods.length - 2; i >= 0; i--) {
        const prevDate = new Date(moods[i].date)
        const nextDate = new Date(moods[i + 1].date)
        const diffDays = Math.floor((nextDate - prevDate) / (1000 * 60 * 60 * 24))
        if (diffDays === 1) streak++
        else break
      }
    }

    setStats({
      totalMoods,
      averageMood,
      totalJournalEntries: journalEntries.length,
      recentMoods,
      streak
    })

    const moodInsights = generateMoodInsights(moods)
    setInsights(moodInsights || [])
  }, [])

  const chartData = stats.recentMoods.map(m => ({
    date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: m.mood
  }))

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>{greeting}, Welcome Back! 👋</h1>
          <p style={styles.subtitle}>Here's your wellness journey overview</p>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                <Smile size={32} color="#fff" />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statNumber}>{stats.averageMood || 0}</div>
                <div style={styles.statSubtext}>out of 5</div>
              </div>
            </div>
            <div style={styles.statFooter}>
              <span style={styles.statLabel}>Average Mood</span>
              <Link to="/mood" style={styles.statLink}>Log Mood →</Link>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                <Heart size={32} color="#fff" />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statNumber}>{stats.totalMoods}</div>
                <div style={styles.statSubtext}>entries</div>
              </div>
            </div>
            <div style={styles.statFooter}>
              <span style={styles.statLabel}>Total Entries</span>
              <span style={styles.statGrowth}>↑ 12%</span>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                <TrendingUp size={32} color="#fff" />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statNumber}>{stats.streak}</div>
                <div style={styles.statSubtext}>days</div>
              </div>
            </div>
            <div style={styles.statFooter}>
              <span style={styles.statLabel}>Day Streak 🔥</span>
              <span style={styles.statSubLabel}>Keep it going!</span>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statContent}>
              <div style={{ ...styles.iconBox, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                <Calendar size={32} color="#fff" />
              </div>
              <div style={styles.statInfo}>
                <div style={styles.statNumber}>{stats.recentMoods.length}</div>
                <div style={styles.statSubtext}>this week</div>
              </div>
            </div>
            <div style={styles.statFooter}>
              <span style={styles.statLabel}>Days Tracked</span>
              <Link to="/mood" style={styles.statLink}>Refresh →</Link>
            </div>
          </div>
        </div>

        {/* Mood Chart */}
        {chartData.length > 0 && (
          <div style={styles.chartCard}>
            <h2 style={styles.chartTitle}>📈 Mood Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis domain={[0, 5]} stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* AI Insights */}
        {insights.length > 0 && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🤖 AI Insights</h2>
            <div style={styles.insightsGrid}>
              {insights.map((insight, index) => (
                <div key={index} style={styles.insightCard}>
                  <div style={styles.insightIcon}>{insight.icon}</div>
                  <div style={styles.insightContent}>
                    <h4 style={styles.insightTitle}>{insight.title}</h4>
                    <p style={styles.insightMessage}>{insight.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>⚡ Quick Actions</h2>
          <div style={styles.actionsGrid}>
            <Link to="/mood" style={{ ...styles.actionCard, ...styles.actionPurple }}>
              <Activity size={32} color="#fff" />
              <span style={styles.actionLabel}>Log Mood</span>
              <span style={styles.actionSublabel}>Track feelings</span>
            </Link>

            <Link to="/journal" style={{ ...styles.actionCard, ...styles.actionTeal }}>
              <BookOpen size={32} color="#fff" />
              <span style={styles.actionLabel}>Journal</span>
              <span style={styles.actionSublabel}>Write thoughts</span>
            </Link>
          </div>
        </div>

        {/* Additional Stats */}
        <div style={styles.miniStatsGrid}>
          <div style={styles.miniStatCard}>
            <BookOpen size={24} color="#8b5cf6" />
            <div>
              <div style={styles.miniStatNumber}>{stats.totalJournalEntries}</div>
              <div style={styles.miniStatLabel}>Journal Entries</div>
            </div>
          </div>

          <div style={styles.miniStatCard}>
            <Activity size={24} color="#10b981" />
            <div>
              <div style={styles.miniStatNumber}>{stats.totalJournalEntries}</div>
              <div style={styles.miniStatLabel}>Total Entries</div>
            </div>
          </div>
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
  content: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    borderRadius: '24px',
    padding: '3rem 2rem',
    marginBottom: '2rem',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: 'rgba(255,255,255,0.95)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  statContent: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  iconBox: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  },
  statInfo: {
    textAlign: 'right'
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: '#2d3748',
    lineHeight: '1'
  },
  statSubtext: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    marginTop: '0.25rem'
  },
  statFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#475569'
  },
  statLink: {
    fontSize: '0.875rem',
    color: '#8b5cf6',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'color 0.3s ease'
  },
  statGrowth: {
    fontSize: '0.875rem',
    color: '#10b981',
    fontWeight: '600'
  },
  statSubLabel: {
    fontSize: '0.875rem',
    color: '#94a3b8'
  },
  chartCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '2rem'
  },
  chartTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1.5rem'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '1.5rem'
  },
  insightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem'
  },
  insightCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    display: 'flex',
    gap: '1rem'
  },
  insightIcon: {
    fontSize: '2rem'
  },
  insightContent: {
    flex: 1
  },
  insightTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '0.5rem'
  },
  insightMessage: {
    fontSize: '0.875rem',
    color: '#64748b',
    lineHeight: '1.6'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem'
  },
  actionCard: {
    borderRadius: '16px',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    cursor: 'pointer'
  },
  actionPurple: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
  },
  actionBlue: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
  },
  actionTeal: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #0d9488 100%)'
  },
  actionOrange: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
  },
  actionLabel: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#fff',
    marginTop: '1rem'
  },
  actionSublabel: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.8)',
    marginTop: '0.25rem'
  },
  miniStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  miniStatCard: {
    background: '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  miniStatNumber: {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#2d3748'
  },
  miniStatLabel: {
    fontSize: '0.875rem',
    color: '#64748b'
  }
}

export default Dashboard
