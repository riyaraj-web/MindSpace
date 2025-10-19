import { useMemo } from 'react'

function MoodChart({ moods, timeRange = 30 }) {
  const chartData = useMemo(() => {
    if (!moods.length) return []
    
    const now = new Date()
    const cutoff = new Date(now.getTime() - (timeRange * 24 * 60 * 60 * 1000))
    
    const filteredMoods = moods
      .filter(mood => new Date(mood.date) >= cutoff)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    // Group by day and average
    const dailyMoods = {}
    filteredMoods.forEach(mood => {
      const day = new Date(mood.date).toDateString()
      if (!dailyMoods[day]) {
        dailyMoods[day] = { total: 0, count: 0, date: day }
      }
      dailyMoods[day].total += mood.mood
      dailyMoods[day].count += 1
    })
    
    return Object.values(dailyMoods).map(day => ({
      date: day.date,
      mood: day.total / day.count,
      count: day.count
    }))
  }, [moods, timeRange])

  const maxMood = 5
  const minMood = 1
  const chartHeight = 200
  const chartWidth = 400

  if (!chartData.length) {
    return (
      <div className="mood-chart-container">
        <div className="no-data">
          <p>No mood data available for the selected time range</p>
        </div>
      </div>
    )
  }

  const getYPosition = (mood) => {
    return chartHeight - ((mood - minMood) / (maxMood - minMood)) * chartHeight
  }

  const pathData = chartData.map((point, index) => {
    const x = (index / (chartData.length - 1)) * chartWidth
    const y = getYPosition(point.mood)
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  return (
    <div className="mood-chart-container">
      <h3>Mood Trend ({timeRange} days)</h3>
      <div className="chart-wrapper">
        <svg width={chartWidth} height={chartHeight} className="mood-chart-svg">
          {/* Grid lines */}
          {[1, 2, 3, 4, 5].map(mood => (
            <g key={mood}>
              <line
                x1="0"
                y1={getYPosition(mood)}
                x2={chartWidth}
                y2={getYPosition(mood)}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x="-10"
                y={getYPosition(mood) + 4}
                fontSize="12"
                fill="#718096"
                textAnchor="end"
              >
                {mood}
              </text>
            </g>
          ))}
          
          {/* Mood line */}
          <path
            d={pathData}
            fill="none"
            stroke="url(#moodGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Data points */}
          {chartData.map((point, index) => {
            const x = (index / (chartData.length - 1)) * chartWidth
            const y = getYPosition(point.mood)
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#667eea"
                className="mood-point"
              >
                <title>
                  {new Date(point.date).toLocaleDateString()}: {point.mood.toFixed(1)}
                </title>
              </circle>
            )
          })}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="moodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="chart-labels">
          <span className="label-start">
            {new Date(chartData[0].date).toLocaleDateString()}
          </span>
          <span className="label-end">
            {new Date(chartData[chartData.length - 1].date).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="chart-stats">
        <div className="stat">
          <span className="stat-label">Average:</span>
          <span className="stat-value">
            {(chartData.reduce((sum, d) => sum + d.mood, 0) / chartData.length).toFixed(1)}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Entries:</span>
          <span className="stat-value">{chartData.length}</span>
        </div>
      </div>
    </div>
  )
}

export default MoodChart