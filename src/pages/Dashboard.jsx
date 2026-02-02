import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMoods, getJournalEntries } from '../utils/storage';
import { generateMoodInsights } from '../utils/aiInsights';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Smile, Heart, TrendingUp, Calendar, BookOpen, Activity } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../design-system/components/Card/Card';
import { Badge } from '../design-system/components/Badge/Badge';

function Dashboard() {
  const [stats, setStats] = useState({
    totalMoods: 0,
    averageMood: 0,
    totalJournalEntries: 0,
    recentMoods: [],
    streak: 0
  });
  const [insights, setInsights] = useState([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const moods = getMoods();
    const journalEntries = getJournalEntries();

    const totalMoods = moods.length;
    const averageMood = totalMoods > 0 
      ? (moods.reduce((sum, mood) => sum + mood.mood, 0) / totalMoods).toFixed(1)
      : 0;

    const recentMoods = moods.slice(-7).reverse();

    let streak = 0;
    const today = new Date().toDateString();
    if (moods.length > 0 && new Date(moods[moods.length - 1].date).toDateString() === today) {
      streak = 1;
      for (let i = moods.length - 2; i >= 0; i--) {
        const prevDate = new Date(moods[i].date);
        const nextDate = new Date(moods[i + 1].date);
        const diffDays = Math.floor((nextDate - prevDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) streak++;
        else break;
      }
    }

    setStats({
      totalMoods,
      averageMood,
      totalJournalEntries: journalEntries.length,
      recentMoods,
      streak
    });

    const moodInsights = generateMoodInsights(moods);
    setInsights(moodInsights || []);
  }, []);

  const chartData = stats.recentMoods.map(m => ({
    date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: m.mood
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <Card variant="gradient" className="text-center bg-gradient-to-br from-indigo-500 to-primary-600 text-white shadow-primary">
          <CardHeader>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              {greeting}, Welcome Back! 👋
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              Here's your wellness journey overview
            </p>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-primary-600 rounded-2xl shadow-primary">
                <Smile className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-neutral-800">{stats.averageMood || 0}</div>
                <div className="text-sm text-neutral-500">out of 5</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-neutral-700">Average Mood</span>
              <Link to="/mood" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Log Mood →
              </Link>
            </div>
          </Card>

          <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-primary-600 rounded-2xl shadow-primary">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-neutral-800">{stats.totalMoods}</div>
                <div className="text-sm text-neutral-500">entries</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-neutral-700">Total Entries</span>
              <Badge variant="success">↑ 12%</Badge>
            </div>
          </Card>

          <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-primary-600 rounded-2xl shadow-primary">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-neutral-800">{stats.streak}</div>
                <div className="text-sm text-neutral-500">days</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-neutral-700">Day Streak 🔥</span>
              <span className="text-sm text-neutral-500">Keep it going!</span>
            </div>
          </Card>

          <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-primary-600 rounded-2xl shadow-primary">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-neutral-800">{stats.recentMoods.length}</div>
                <div className="text-sm text-neutral-500">this week</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-neutral-700">Days Tracked</span>
              <Link to="/mood" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Refresh →
              </Link>
            </div>
          </Card>
        </div>

        {/* Mood Chart */}
        {chartData.length > 0 && (
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>📈 Mood Trend</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        )}

        {/* AI Insights */}
        {insights.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">🤖 AI Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight, index) => (
                <Card key={index} variant="elevated" className="hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-4">
                    <div className="text-4xl flex-shrink-0">{insight.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-neutral-800 mb-2">{insight.title}</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">{insight.message}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">⚡ Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/mood" 
              className="group relative overflow-hidden bg-gradient-to-br from-primary-600 to-indigo-600 text-white rounded-2xl p-8 shadow-primary hover:shadow-primaryHover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <Activity className="w-12 h-12 mb-4" />
                <span className="text-xl font-bold mb-1">Log Mood</span>
                <span className="text-sm opacity-90">Track feelings</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>

            <Link 
              to="/journal" 
              className="group relative overflow-hidden bg-gradient-to-br from-primary-600 to-teal-600 text-white rounded-2xl p-8 shadow-primary hover:shadow-primaryHover transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <BookOpen className="w-12 h-12 mb-4" />
                <span className="text-xl font-bold mb-1">Journal</span>
                <span className="text-sm opacity-90">Write thoughts</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated" className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <div>
              <div className="text-3xl font-bold text-neutral-800">{stats.totalJournalEntries}</div>
              <div className="text-sm text-neutral-600">Journal Entries</div>
            </div>
          </Card>

          <Card variant="elevated" className="flex items-center gap-4">
            <Activity className="w-8 h-8 text-success flex-shrink-0" />
            <div>
              <div className="text-3xl font-bold text-neutral-800">{stats.totalMoods}</div>
              <div className="text-sm text-neutral-600">Total Entries</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
