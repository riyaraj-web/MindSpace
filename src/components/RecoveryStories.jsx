import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../design-system/components/Card/Card';
import { Button } from '../design-system/components/Button/Button';
import { Heart, ThumbsUp, X } from 'lucide-react';

const RecoveryStories = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [showShareForm, setShowShareForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [newStory, setNewStory] = useState({
    title: '',
    category: 'depression',
    timeframe: '',
    story: '',
    strategies: [],
    currentStrategy: '',
    isAnonymous: false,
    tags: []
  });

  const categories = [
    { id: 'all', name: 'All Stories', icon: '📚', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'depression', name: 'Depression', icon: '🌧️', gradient: 'from-purple-500 to-indigo-600' },
    { id: 'anxiety', name: 'Anxiety', icon: '�', gradient: 'from-amber-500 to-orange-600' },
    { id: 'trauma', name: 'Trauma', icon: '💔', gradient: 'from-red-500 to-pink-600' },
    { id: 'addiction', name: 'Addiction', icon: '⛓️', gradient: 'from-emerald-500 to-teal-600' },
    { id: 'grief', name: 'Grief', icon: '🕊️', gradient: 'from-neutral-500 to-neutral-600' },
    { id: 'relationships', name: 'Relationships', icon: '💕', gradient: 'from-pink-500 to-rose-600' },
    { id: 'work-stress', name: 'Work Stress', icon: '💼', gradient: 'from-blue-500 to-indigo-600' },
    { id: 'self-esteem', name: 'Self-Esteem', icon: '🪞', gradient: 'from-orange-500 to-amber-600' }
  ];

  const timeframes = [
    '1-3 months', '3-6 months', '6-12 months', '1-2 years', '2-5 years', '5+ years'
  ];

  const commonTags = [
    'therapy', 'medication', 'exercise', 'meditation', 'support-group', 
    'family-support', 'lifestyle-change', 'mindfulness', 'journaling', 
    'creative-expression', 'professional-help', 'self-care', 'routine'
  ];

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = () => {
    const savedStories = localStorage.getItem('recoveryStories');
    if (savedStories) {
      setStories(JSON.parse(savedStories));
    } else {
      // Load some sample stories for demonstration
      const sampleStories = [
        {
          id: 1,
          title: "Finding Light After Two Years of Darkness",
          author: "Sarah M.",
          category: "depression",
          timeframe: "2-5 years",
          story: "I spent two years feeling like I was drowning. Every day was a struggle just to get out of bed. What changed everything was starting small - just 5 minutes of walking outside each day. That tiny step led to bigger changes: therapy, medication, and rebuilding my support network. Today, I still have difficult days, but I have tools and hope.",
          strategies: [
            "Started with 5-minute daily walks",
            "Found a therapist who understood me",
            "Joined a support group",
            "Established a morning routine",
            "Practiced gratitude journaling"
          ],
          tags: ["therapy", "exercise", "support-group", "routine", "journaling"],
          likes: 47,
          helpful: 23,
          date: new Date('2024-01-15'),
          isAnonymous: false
        },
        {
          id: 2,
          title: "Overcoming Anxiety Through Mindfulness",
          author: "Anonymous",
          category: "anxiety",
          timeframe: "6-12 months",
          story: "Panic attacks controlled my life for months. I couldn't go to work, see friends, or even go grocery shopping. Learning mindfulness and breathing techniques was my turning point. It took practice, but now I can manage my anxiety and live fully again.",
          strategies: [
            "Daily meditation practice",
            "4-7-8 breathing technique",
            "Progressive muscle relaxation",
            "Cognitive behavioral therapy",
            "Gradual exposure therapy"
          ],
          tags: ["meditation", "mindfulness", "therapy", "professional-help"],
          likes: 32,
          helpful: 18,
          date: new Date('2024-02-03'),
          isAnonymous: true
        },
        {
          id: 3,
          title: "Healing from Trauma: My Journey to Self-Compassion",
          author: "Michael R.",
          category: "trauma",
          timeframe: "2-5 years",
          story: "After experiencing trauma, I blamed myself for everything. Therapy helped me understand that healing isn't linear. Some days are harder than others, but I've learned to be patient and kind with myself. Art therapy and EMDR were game-changers for me.",
          strategies: [
            "EMDR therapy sessions",
            "Art therapy for expression",
            "Self-compassion practices",
            "Trauma-informed yoga",
            "Building safe relationships"
          ],
          tags: ["therapy", "creative-expression", "self-care", "professional-help"],
          likes: 28,
          helpful: 15,
          date: new Date('2024-01-28'),
          isAnonymous: false
        }
      ];
      setStories(sampleStories);
      localStorage.setItem('recoveryStories', JSON.stringify(sampleStories));
    }
  };

  const handleSubmitStory = (e) => {
    e.preventDefault();
    
    const story = {
      id: Date.now(),
      ...newStory,
      author: newStory.isAnonymous ? 'Anonymous' : (user?.name || 'Anonymous'),
      likes: 0,
      helpful: 0,
      date: new Date(),
      strategies: newStory.strategies.filter(s => s.trim() !== '')
    };

    const updatedStories = [story, ...stories];
    setStories(updatedStories);
    localStorage.setItem('recoveryStories', JSON.stringify(updatedStories));
    
    // Reset form
    setNewStory({
      title: '',
      category: 'depression',
      timeframe: '',
      story: '',
      strategies: [],
      currentStrategy: '',
      isAnonymous: false,
      tags: []
    });
    setShowShareForm(false);
  };

  const addStrategy = () => {
    if (newStory.currentStrategy.trim()) {
      setNewStory({
        ...newStory,
        strategies: [...newStory.strategies, newStory.currentStrategy.trim()],
        currentStrategy: ''
      });
    }
  };

  const removeStrategy = (index) => {
    setNewStory({
      ...newStory,
      strategies: newStory.strategies.filter((_, i) => i !== index)
    });
  };

  const toggleTag = (tag) => {
    const updatedTags = newStory.tags.includes(tag)
      ? newStory.tags.filter(t => t !== tag)
      : [...newStory.tags, tag];
    
    setNewStory({ ...newStory, tags: updatedTags });
  };

  const likeStory = (storyId) => {
    const updatedStories = stories.map(story => 
      story.id === storyId 
        ? { ...story, likes: story.likes + 1 }
        : story
    );
    setStories(updatedStories);
    localStorage.setItem('recoveryStories', JSON.stringify(updatedStories));
  };

  const markHelpful = (storyId) => {
    const updatedStories = stories.map(story => 
      story.id === storyId 
        ? { ...story, helpful: story.helpful + 1 }
        : story
    );
    setStories(updatedStories);
    localStorage.setItem('recoveryStories', JSON.stringify(updatedStories));
  };

  const filteredStories = stories
    .filter(story => selectedCategory === 'all' || story.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'popular':
          return b.likes - a.likes;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
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
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
            <div className="relative z-10 text-center text-white">
              <div className="text-6xl mb-4">💪</div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Recovery Stories</h1>
              <p className="text-lg md:text-xl opacity-90">Real stories from real people who've overcome mental health challenges</p>
            </div>
          </div>

          {/* Share Story Button */}
          <div className="flex justify-end">
            <Button 
              onClick={() => setShowShareForm(true)}
              size="lg"
              className="shadow-lg"
            >
              ✍️ Share Your Story
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-br ${category.gradient} text-white shadow-lg scale-105`
                    : 'bg-white text-neutral-700 hover:shadow-md border-2 border-neutral-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <Card variant="elevated" className="flex items-center justify-between">
            <span className="font-semibold text-neutral-700">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Liked</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </Card>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStories.map(story => {
              const categoryInfo = getCategoryInfo(story.category);
              return (
                <Card key={story.id} variant="elevated" className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-lg bg-gradient-to-br ${categoryInfo.gradient} text-white text-sm font-semibold`}>
                      {categoryInfo.icon} {categoryInfo.name}
                    </div>
                    <span className="text-sm text-neutral-500">{story.timeframe}</span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-800 mb-2">{story.title}</h3>
                  <div className="text-sm text-neutral-500 mb-4">by {story.author}</div>

                  <p className="text-neutral-700 leading-relaxed mb-4">{story.story}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-neutral-700 mb-2">What helped me:</h4>
                    <ul className="space-y-1">
                      {story.strategies.map((strategy, index) => (
                        <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => likeStory(story.id)}
                        className="flex items-center gap-1 text-sm text-neutral-600 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-4 h-4" /> {story.likes}
                      </button>
                      <button 
                        onClick={() => markHelpful(story.id)}
                        className="flex items-center gap-1 text-sm text-neutral-600 hover:text-indigo-600 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" /> {story.helpful}
                      </button>
                    </div>
                    <span className="text-xs text-neutral-500">
                      {new Date(story.date).toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredStories.length === 0 && (
            <Card variant="elevated" className="text-center py-16">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">No stories found</h3>
              <p className="text-neutral-600">Be the first to share your recovery journey in this category!</p>
            </Card>
          )}

          {/* Resources */}
          <div>
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">🌟 Additional Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="elevated">
                <h4 className="text-lg font-bold text-neutral-800 mb-3">🆘 Crisis Support</h4>
                <p className="text-sm text-neutral-600 mb-3">If you're in crisis, please reach out:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• National Suicide Prevention Lifeline: 988</li>
                  <li>• Crisis Text Line: Text HOME to 741741</li>
                  <li>• International Association for Suicide Prevention</li>
                </ul>
              </Card>
              
              <Card variant="elevated">
                <h4 className="text-lg font-bold text-neutral-800 mb-3">🏥 Professional Help</h4>
                <p className="text-sm text-neutral-600 mb-3">Finding the right support:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• Psychology Today therapist finder</li>
                  <li>• NAMI (National Alliance on Mental Illness)</li>
                  <li>• Your healthcare provider</li>
                </ul>
              </Card>
              
              <Card variant="elevated">
                <h4 className="text-lg font-bold text-neutral-800 mb-3">🤝 Support Communities</h4>
                <p className="text-sm text-neutral-600 mb-3">Connect with others:</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• NAMI Support Groups</li>
                  <li>• Depression and Bipolar Support Alliance</li>
                  <li>• Online communities and forums</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Share Form Modal */}
      {showShareForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card variant="elevated" className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-800">Share Your Recovery Story</h2>
              <button 
                onClick={() => setShowShareForm(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitStory} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Story Title *</label>
                <input
                  type="text"
                  value={newStory.title}
                  onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                  placeholder="Give your story an inspiring title..."
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Category *</label>
                  <select
                    value={newStory.category}
                    onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Recovery Timeframe *</label>
                  <select
                    value={newStory.timeframe}
                    onChange={(e) => setNewStory({ ...newStory, timeframe: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select timeframe...</option>
                    {timeframes.map(timeframe => (
                      <option key={timeframe} value={timeframe}>{timeframe}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Your Story *</label>
                <textarea
                  value={newStory.story}
                  onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                  placeholder="Share your journey..."
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-vertical"
                  rows="6"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Strategies That Helped</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newStory.currentStrategy}
                    onChange={(e) => setNewStory({ ...newStory, currentStrategy: e.target.value })}
                    placeholder="e.g., Daily 10-minute walks..."
                    className="flex-1 px-4 py-2 border-2 border-neutral-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStrategy())}
                  />
                  <Button type="button" onClick={addStrategy}>Add</Button>
                </div>
                
                <div className="space-y-2">
                  {newStory.strategies.map((strategy, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <span className="text-sm text-neutral-700">✓ {strategy}</span>
                      <button 
                        type="button" 
                        onClick={() => removeStrategy(index)}
                        className="text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {commonTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        newStory.tags.includes(tag)
                          ? 'bg-indigo-500 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={newStory.isAnonymous}
                  onChange={(e) => setNewStory({ ...newStory, isAnonymous: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="anonymous" className="text-sm text-neutral-700">
                  Share anonymously
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setShowShareForm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Share My Story
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RecoveryStories;