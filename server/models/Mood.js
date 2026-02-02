const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: [true, 'Mood is required'],
    enum: ['very-sad', 'sad', 'neutral', 'happy', 'very-happy']
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  note: {
    type: String,
    maxlength: [500, 'Note cannot exceed 500 characters'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  triggers: [{
    type: String,
    trim: true
  }],
  activities: [{
    type: String,
    trim: true
  }],
  weather: {
    type: String,
    enum: ['sunny', 'cloudy', 'rainy', 'snowy', 'stormy']
  },
  sleep: {
    hours: {
      type: Number,
      min: 0,
      max: 24
    },
    quality: {
      type: String,
      enum: ['poor', 'fair', 'good', 'excellent']
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
moodSchema.index({ userId: 1, date: -1 });
moodSchema.index({ userId: 1, mood: 1 });

// Virtual for mood score calculation
moodSchema.virtual('moodScore').get(function() {
  const moodValues = {
    'very-sad': 1,
    'sad': 2,
    'neutral': 3,
    'happy': 4,
    'very-happy': 5
  };
  return moodValues[this.mood] * 2; // Scale to 1-10
});

module.exports = mongoose.model('Mood', moodSchema);