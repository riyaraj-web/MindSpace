import { useState, useEffect } from 'react';
import { Heart, ThumbsUp, Calendar, User, Tag, X, Plus, Sparkles } from 'lucide-react';

const RecoveryStoriesWorking = () => {
  const [stories, setStories] = useState([]);
  const [showShareForm, setShowShareForm] = useState(false);

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

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerIcon}>
            <Sparkles size={40} color="#fff" />
          </div>
          <h1 style={styles.title}>Recovery Stories</h1>
          <p style={styles.subtitle}>
            Real stories from real people who've overcome mental health challenges. 
            Share your journey to inspire others and find hope in shared experiences.
          </p>
        </div>
        
        <button 
          style={styles.shareButton}
          onClick={() => setShowShareForm(true)}
        >
          <Plus size={20} style={{ marginRight: '8px' }} />
          Share Your Story
        </button>
      </div>

      <div style={styles.storiesGrid}>
        {stories.map(story => (
          <div key={story.id} style={styles.storyCard}>
            <div style={styles.cardHeader}>
              <div style={styles.categoryBadge}>
                <span style={{ marginRight: '6px' }}>🌧️</span>
                Depression
              </div>
              <div style={styles.timeframeBadge}>
                <Calendar size={14} style={{ marginRight: '4px' }} />
                {story.timeframe}
              </div>
            </div>

            <h3 style={styles.storyTitle}>{story.title}</h3>
            <div style={styles.storyAuthor}>
              <User size={14} style={{ marginRight: '6px' }} />
              {story.author}
            </div>

            <div style={styles.storyContent}>
              <p style={styles.storyText}>{story.story}</p>
            </div>

            <div style={styles.strategiesSection}>
              <h4 style={styles.strategiesTitle}>What helped me:</h4>
              <ul style={styles.strategiesList}>
                {story.strategies.map((strategy, index) => (
                  <li key={index} style={styles.strategyItem}>
                    <span style={styles.checkmark}>✓</span>
                    {strategy}
                  </li>
                ))}
              </ul>
            </div>

            <div style={styles.tagsContainer}>
              {story.tags.map(tag => (
                <span key={tag} style={styles.tag}>
                  <Tag size={12} style={{ marginRight: '4px' }} />
                  {tag}
                </span>
              ))}
            </div>

            <div style={styles.cardActions}>
              <button style={styles.actionButton}>
                <Heart size={16} style={{ marginRight: '6px' }} />
                {story.likes}
              </button>
              <button style={styles.actionButton}>
                <ThumbsUp size={16} style={{ marginRight: '6px' }} />
                Helpful ({story.helpful})
              </button>
              <div style={styles.dateText}>
                {story.date.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Story Modal */}
      {showShareForm && (
        <div style={styles.modalOverlay} onClick={() => setShowShareForm(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Share Your Recovery Story</h2>
              <button style={styles.closeButton} onClick={() => setShowShareForm(false)}>
                <X size={24} />
              </button>
            </div>
            <form style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Story Title</label>
                <input 
                  type="text" 
                  style={styles.input}
                  placeholder="Give your story a meaningful title"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Your Story</label>
                <textarea 
                  style={styles.textarea}
                  rows="6"
                  placeholder="Share your journey, challenges, and what helped you..."
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>What Helped You? (Optional)</label>
                <textarea 
                  style={styles.textarea}
                  rows="3"
                  placeholder="List strategies, treatments, or practices that made a difference"
                />
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <select style={styles.select}>
                    <option>Depression</option>
                    <option>Anxiety</option>
                    <option>PTSD</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Recovery Timeframe</label>
                  <select style={styles.select}>
                    <option>Less than 1 year</option>
                    <option>1-2 years</option>
                    <option>2-5 years</option>
                    <option>5+ years</option>
                  </select>
                </div>
              </div>
              
              <div style={styles.formActions}>
                <button 
                  type="button"
                  style={styles.cancelButton}
                  onClick={() => setShowShareForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={styles.submitButton}
                >
                  Share Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

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
    position: 'relative',
    overflow: 'hidden'
  },
  headerContent: {
    position: 'relative',
    zIndex: 1
  },
  headerIcon: {
    marginBottom: '1rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '0.75rem'
  },
  subtitle: {
    fontSize: '1.125rem',
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  },
  shareButton: {
    background: '#fff',
    color: '#6366f1',
    border: 'none',
    borderRadius: '12px',
    padding: '0.875rem 1.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'all 0.3s ease'
  },
  storiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  storyCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  categoryBadge: {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
  },
  timeframeBadge: {
    background: '#f1f5f9',
    color: '#64748b',
    padding: '0.5rem 0.875rem',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
  },
  storyTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.75rem',
    lineHeight: '1.3'
  },
  storyAuthor: {
    fontSize: '0.875rem',
    color: '#64748b',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center'
  },
  storyContent: {
    marginBottom: '1.5rem'
  },
  storyText: {
    fontSize: '1rem',
    color: '#475569',
    lineHeight: '1.7'
  },
  strategiesSection: {
    background: '#f8fafc',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: '1.5rem'
  },
  strategiesTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.75rem'
  },
  strategiesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  strategyItem: {
    fontSize: '0.875rem',
    color: '#475569',
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'flex-start',
    lineHeight: '1.6'
  },
  checkmark: {
    color: '#10b981',
    fontWeight: '700',
    marginRight: '0.5rem'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem'
  },
  tag: {
    background: '#f1f5f9',
    color: '#64748b',
    padding: '0.375rem 0.75rem',
    borderRadius: '8px',
    fontSize: '0.75rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e2e8f0'
  },
  actionButton: {
    background: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },
  dateText: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    marginLeft: 'auto'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '2rem'
  },
  modalContent: {
    background: '#fff',
    borderRadius: '24px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem 2rem 1rem',
    borderBottom: '1px solid #e2e8f0'
  },
  modalTitle: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e293b'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#64748b',
    padding: '0.5rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease'
  },
  form: {
    padding: '2rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    transition: 'all 0.3s ease'
  },
  select: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '1rem',
    background: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem'
  },
  cancelButton: {
    padding: '0.875rem 1.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    background: '#fff',
    color: '#64748b',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  submitButton: {
    padding: '0.875rem 1.75rem',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(90deg, #667eea 0%, #06b6d4 50%, #14b8a6 100%)',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
    transition: 'all 0.3s ease'
  }
};

export default RecoveryStoriesWorking;
