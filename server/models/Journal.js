const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  mood: {
    type: String,
    enum: ['very-sad', 'sad', 'neutral', 'happy', 'very-happy']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  isPrivate: {
    type: Boolean,
    default: true
  },
  gratitude: [{
    type: String,
    trim: true,
    maxlength: [200, 'Gratitude item cannot exceed 200 characters']
  }],
  goals: [{
    text: {
      type: String,
      trim: true,
      maxlength: [200, 'Goal cannot exceed 200 characters']
    },
    completed: {
      type: Boolean,
      default: false
    }
  }],
  wordCount: {
    type: Number,
    default: 0
  },
  readingTime: {
    type: Number, // in minutes
    default: 0
  }
}, {
  timestamps: true
});

// Calculate word count and reading time before saving
journalSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const words = this.content.trim().split(/\s+/).length;
    this.wordCount = words;
    this.readingTime = Math.ceil(words / 200); // Average reading speed
  }
  next();
});

// Index for efficient queries
journalSchema.index({ userId: 1, createdAt: -1 });
journalSchema.index({ userId: 1, tags: 1 });
journalSchema.index({ userId: 1, mood: 1 });

module.exports = mongoose.model('Journal', journalSchema);