import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const RecoveryStoriesWorking = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [showShareForm, setShowShareForm] = useState(false);
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
    { id: 'trauma', name: 'Trauma', icon: '💔', color: '#ef4444' }
  ];

  const timeframes = [
    '1-3 months', '3-6 months', '6-12 months', '1-2 years', '2-5 years', '5+ years'
  ];

  const commonTags = [
    'therapy', 'medication', 'exercise', 'meditation', 'support-group', 
    'family-support', 'lifestyle-change', 'mindfulness', 'journaling'
  ];

  useEffect(() => {
    // Load sample stories
    const sampleStories = [
      {
        id: 1,
        title: "Finding Light After Two Years of Darkness",
        author: "Sarah M.",
        category: "depression",
        timeframe: "2-5 years",
        story: "I spent two years feeling like I was drowning. Every day was a struggle just to get out of bed. What changed everything was starting small - just 5 minutes of walking outside each day.",
        strategies: [
          "Started with 5-minute daily walks",
          "Found a therapist who understood me",
          "Joined a support group"
        ],
        tags: ["therapy", "exercise", "support-group"],
        likes: 47,
        helpful: 23,
        date: new Date('2024-01-15')
      }
    ];
    setStories(sampleStories);
  }, []);

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

    setStories([story, ...stories]);
    
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

      <div className="stories-grid">
        {stories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-header">
              <div className="story-category" style={{ backgroundColor: '#8b5cf6' }}>
                🌧️ Depression
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
              <button className="action-btn like-btn">
                ❤️ {story.likes}
              </button>
              <button className="action-btn helpful-btn">
                🙏 Helpful ({story.helpful})
              </button>
              <div className="story-date">
                {story.date.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

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
                <label>Your Story *</label>
                <textarea
                  value={newStory.story}
                  onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                  placeholder="Share your journey... What was your lowest point? What helped you turn things around?"
                  rows="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>Strategies That Helped</label>
                <div className="strategy-input">
                  <input
                    type="text"
                    value={newStory.currentStrategy}
                    onChange={(e) => setNewStory({ ...newStory, currentStrategy: e.target.value })}
                    placeholder="e.g., Daily 10-minute walks, Therapy sessions..."
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
                <label>Tags</label>
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
    </div>
  );
};

export default RecoveryStoriesWorking;