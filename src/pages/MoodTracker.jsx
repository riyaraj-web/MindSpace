import { useState } from 'react';
import { saveMood } from '../utils/storage';
import { getMoodRecommendations } from '../utils/aiInsights';
import { Heart, Smile, Meh, Frown, CloudRain } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../design-system/components/Card/Card';
import { Button } from '../design-system/components/Button/Button';
import { Textarea } from '../design-system/components/Input/Input';

function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const moods = [
    { icon: Smile, label: 'Great', value: 5, gradient: 'from-green-400 to-emerald-500' },
    { icon: Smile, label: 'Good', value: 4, gradient: 'from-blue-400 to-indigo-500' },
    { icon: Meh, label: 'Okay', value: 3, gradient: 'from-yellow-400 to-orange-500' },
    { icon: Frown, label: 'Low', value: 2, gradient: 'from-orange-400 to-red-500' },
    { icon: CloudRain, label: 'Difficult', value: 1, gradient: 'from-red-400 to-pink-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMood({ mood: selectedMood, note });
    
    const recs = getMoodRecommendations(selectedMood);
    setRecommendations(recs);
    setShowRecommendations(true);
    
    setSelectedMood('');
    setNote('');
  };

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
              <Heart className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
                How are you feeling today?
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Track your emotional wellbeing and discover patterns
              </p>
            </div>
          </div>

          {/* Mood Selection Form */}
          <Card variant="elevated">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {moods.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.value;
                  
                  return (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`
                        relative p-6 rounded-2xl border-3 transition-all duration-300
                        flex flex-col items-center gap-3
                        ${isSelected 
                          ? `bg-gradient-to-br ${mood.gradient} text-white border-transparent shadow-xl scale-105` 
                          : 'bg-white border-neutral-200 text-neutral-600 hover:border-indigo-300 hover:shadow-md'
                        }
                      `}
                    >
                      <Icon className="w-12 h-12" />
                      <span className="font-semibold text-base">{mood.label}</span>
                    </button>
                  );
                })}
              </div>
              
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind? (optional)"
                rows={4}
                className="w-full"
              />
              
              <Button 
                type="submit" 
                disabled={!selectedMood}
                size="lg"
                className="w-full"
              >
                Log Mood
              </Button>
            </form>
          </Card>

          {/* Recommendations */}
          {showRecommendations && recommendations.length > 0 && (
            <Card variant="elevated" className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>💡 Personalized Recommendations</CardTitle>
                <p className="text-neutral-600 mt-2">
                  Based on your current mood, here are some activities that might help:
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl hover:shadow-md transition-all duration-200"
                    >
                      <div className="text-3xl flex-shrink-0">{rec.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-800">{rec.activity}</h4>
                        <span className="text-sm text-neutral-600">{rec.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setShowRecommendations(false)}
                  className="w-full mt-6"
                >
                  Got it, thanks!
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoodTracker;
