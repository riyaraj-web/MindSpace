const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Habit name is required'],
    trim: true,
    maxlength: [100, 'Habit name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  category: {
    type: String,
    required: true,
    enum: ['health', 'mindfulness', 'productivity', 'social', 'learning', 'fitness', 'nutrition', 'sleep', 'other']
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  targetCount: {
    type: Number,
    default: 1,
    min: [1, 'Target count must be at least 1']
  },
  unit: {
    type: String,
    default: 'times',
    maxlength: [20, 'Unit cannot exceed 20 characters']
  },
  reminderTime: {
    type: String,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)']
  },
  color: {
    type: String,
    default: '#8b5cf6',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format']
  },
  icon: {
    type: String,
    default: '✓'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  completions: [{
    date: {
      type: Date,
      required: true
    },
    count: {
      type: Number,
      default: 1,
      min: 0
    },
    note: {
      type: String,
      maxlength: [200, 'Note cannot exceed 200 characters']
    }
  }],
  streak: {
    current: {
      type: Number,
      default: 0
    },
    longest: {
      type: Number,
      default: 0
    },
    lastCompletedDate: {
      type: Date
    }
  },
  statistics: {
    totalCompletions: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averagePerWeek: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
habitSchema.index({ userId: 1, isActive: 1 });
habitSchema.index({ userId: 1, category: 1 });
habitSchema.index({ 'completions.date': 1 });

// Update statistics before saving
habitSchema.pre('save', function(next) {
  if (this.isModified('completions')) {
    this.statistics.totalCompletions = this.completions.reduce((sum, completion) => sum + completion.count, 0);
    
    // Calculate completion rate (simplified)
    const daysSinceStart = Math.ceil((Date.now() - this.startDate) / (1000 * 60 * 60 * 24));
    const expectedCompletions = daysSinceStart * (this.frequency === 'daily' ? 1 : this.frequency === 'weekly' ? 1/7 : 1/30);
    this.statistics.completionRate = Math.min(100, (this.statistics.totalCompletions / expectedCompletions) * 100);
  }
  next();
});

module.exports = mongoose.model('Habit', habitSchema);