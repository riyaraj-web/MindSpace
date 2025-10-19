import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

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
    { id: 'all', name: 'All Stories', icon: '📚', color: '#6366f1' },
    { id: 'depression', name: 'Depression', icon: '🌧️', color: '#8b5cf6' },
    { id: 'anxiety', name: 'Anxiety', icon: '😰', color: '#f59e0b' },
    { id: 'trauma', name: 'Trauma', icon: '💔', color: '#ef4444' },
    { id: 'addiction', name: 'Addiction', icon: '⛓️', color: '#10b981' },
    { id: 'grief', name: 'Grief', icon: '🕊️', color: '#6b7280' },
    { id: 'relationships', name: 'Relationships', icon: '💕', color: '#ec4899' },
    { id: 'work-stress', name: 'Work Stress', icon: '💼', color: '#14b8a6' },
    { id: 'self-esteem', name: 'Self-Esteem', icon: '🪞', color: '#f97316' }
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
    <div className="recovery-stories-container">
      <div className="stories-header">
        <div className="header-content">
          <h1>💪 Recovery Stories</h1>
          <p>Real stories from real people who've overcome mental health challenges. Share your journey to inspire others and find hope in shared experiences.</p>
        </div>
        
        <button 
          className="share-story-btn"
          onClick={() => setShowShareForm(true)}
        >
          ✍️ Share Your Story
        </button>
      </div>

      <div className="stories-filters">
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              style={{ '--category-color': category.color }}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="sort-controls">
          <label>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Liked</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      <div className="stories-grid">
        {filteredStories.map(story => {
          const categoryInfo = getCategoryInfo(story.category);
          return (
            <div key={story.id} className="story-card">
              <div className="story-header">
                <div className="story-category" style={{ backgroundColor: categoryInfo.color }}>
                  {categoryInfo.icon} {categoryInfo.name}
                </div>
                <div className="story-timeframe">{story.timeframe}</div>
              </div>

              <h3 className="story-title">{story.title}</h3>
              <div className="story-author">by {story.author}</div>

              <div className="story-content">
                <p>{story.story}</p>
              </div>

              <div className="story-strategies">
                <h4>What helped me:</h4>
                <ul>
                  {story.strategies.map((strategy, index) => (
                    <li key={index}>{strategy}</li>
                  ))}
                </ul>
              </div>

              <div className="story-tags">
                {story.tags.map(tag => (
                  <span key={tag} className="story-tag">#{tag}</span>
                ))}
              </div>

              <div className="story-actions">
                <button 
                  className="action-btn like-btn"
                  onClick={() => likeStory(story.id)}
                >
                  ❤️ {story.likes}
                </button>
                <button 
                  className="action-btn helpful-btn"
                  onClick={() => markHelpful(story.id)}
                >
                  🙏 Helpful ({story.helpful})
                </button>
                <div className="story-date">
                  {story.date.toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredStories.length === 0 && (
        <div className="no-stories">
          <h3>No stories found</h3>
          <p>Be the first to share your recovery journey in this category!</p>
        </div>
      )}

      {showShareForm && (
        <div className="share-form-overlay">
          <div className="share-form-container">
            <div className="form-header">
              <h2>Share Your Recovery Story</h2>
              <button 
                className="close-form-btn"
                onClick={() => setShowShareForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitStory} className="share-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Story Title *</label>
                  <input
                    type="text"
                    value={newStory.title}
                    onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                    placeholder="Give your story an inspiring title..."
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={newStory.category}
                    onChange={(e) => setNewStory({ ...newStory, category: e.target.value })}
                    required
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Recovery Timeframe *</label>
                  <select
                    value={newStory.timeframe}
                    onChange={(e) => setNewStory({ ...newStory, timeframe: e.target.value })}
                    required
                  >
                    <option value="">Select timeframe...</option>
                    {timeframes.map(timeframe => (
                      <option key={timeframe} value={timeframe}>{timeframe}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Your Story * (Share your journey, challenges, and breakthrough moments)</label>
                <textarea
                  value={newStory.story}
                  onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                  placeholder="Share your journey... What was your lowest point? What helped you turn things around? What would you tell someone going through the same thing?"
                  rows="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>Strategies That Helped (Add specific things that made a difference)</label>
                <div className="strategy-input">
                  <input
                    type="text"
                    value={newStory.currentStrategy}
                    onChange={(e) => setNewStory({ ...newStory, currentStrategy: e.target.value })}
                    placeholder="e.g., Daily 10-minute walks, Therapy sessions, Meditation..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStrategy())}
                  />
                  <button type="button" onClick={addStrategy} className="add-strategy-btn">
                    Add
                  </button>
                </div>
                
                <div className="strategies-list">
                  {newStory.strategies.map((strategy, index) => (
                    <div key={index} className="strategy-item">
                      <span>✓ {strategy}</span>
                      <button 
                        type="button" 
                        onClick={() => removeStrategy(index)}
                        className="remove-strategy-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Tags (Select relevant tags to help others find your story)</label>
                <div className="tags-selection">
                  {commonTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      className={`tag-btn ${newStory.tags.includes(tag) ? 'selected' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newStory.isAnonymous}
                    onChange={(e) => setNewStory({ ...newStory, isAnonymous: e.target.checked })}
                  />
                  Share anonymously
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => setShowShareForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-story-btn">
                  Share My Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="recovery-resources">
        <h3>🌟 Additional Resources</h3>
        <div className="resources-grid">
          <div className="resource-card">
            <h4>🆘 Crisis Support</h4>
            <p>If you're in crisis, please reach out:</p>
            <ul>
              <li>National Suicide Prevention Lifeline: 988</li>
              <li>Crisis Text Line: Text HOME to 741741</li>
              <li>International Association for Suicide Prevention</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>🏥 Professional Help</h4>
            <p>Finding the right support:</p>
            <ul>
              <li>Psychology Today therapist finder</li>
              <li>NAMI (National Alliance on Mental Illness)</li>
              <li>Your healthcare provider</li>
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>🤝 Support Communities</h4>
            <p>Connect with others:</p>
            <ul>
              <li>NAMI Support Groups</li>
              <li>Depression and Bipolar Support Alliance</li>
              <li>Online communities and forums</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryStories;