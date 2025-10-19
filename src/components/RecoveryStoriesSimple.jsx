import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const RecoveryStoriesSimple = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);
  const [showShareForm, setShowShareForm] = useState(false);

  // Sample stories data
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
      date: "2024-01-15"
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
      date: "2024-02-03"
    }
  ];

  useEffect(() => {
    setStories(sampleStories);
  }, []);

  const categories = [
    { id: 'all', name: 'All Stories', icon: '📚' },
    { id: 'depression', name: 'Depression', icon: '🌧️' },
    { id: 'anxiety', name: 'Anxiety', icon: '😰' },
    { id: 'trauma', name: 'Trauma', icon: '💔' }
  ];

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
              className="category-btn"
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="stories-grid">
        {stories.map(story => (
          <div key={story.id} className="story-card">
            <div className="story-header">
              <div className="story-category">
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
                {story.date}
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
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Story sharing form will be here!</p>
              <button 
                onClick={() => setShowShareForm(false)}
                className="submit-story-btn"
              >
                Close for now
              </button>
            </div>
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
            </ul>
          </div>
          
          <div className="resource-card">
            <h4>🏥 Professional Help</h4>
            <p>Finding the right support:</p>
            <ul>
              <li>Psychology Today therapist finder</li>
              <li>NAMI (National Alliance on Mental Illness)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecoveryStoriesSimple;