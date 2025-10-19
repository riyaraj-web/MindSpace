const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Mood = require('../models/Mood');
const auth = require('../middleware/auth');

const router = express.Router();

// Create mood entry
router.post('/', auth, [
  body('mood').isIn(['very-sad', 'sad', 'neutral', 'happy', 'very-happy']).withMessage('Invalid mood value'),
  body('intensity').isInt({ min: 1, max: 10 }).withMessage('Intensity must be between 1-10'),
  body('note').optional().isLength({ max: 500 }).withMessage('Note cannot exceed 500 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('triggers').optional().isArray().withMessage('Triggers must be an array'),
  body('activities').optional().isArray().withMessage('Activities must be an array'),
  body('weather').optional().isIn(['sunny', 'cloudy', 'rainy', 'snowy', 'stormy']),
  body('sleep.hours').optional().isFloat({ min: 0, max: 24 }),
  body('sleep.quality').optional().isIn(['poor', 'fair', 'good', 'excellent'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const moodData = {
      userId: req.userId,
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : new Date()
    };

    const mood = new Mood(moodData);
    await mood.save();

    res.status(201).json({
      message: 'Mood entry created successfully',
      mood
    });
  } catch (error) {
    console.error('Mood creation error:', error);
    res.status(500).json({ message: 'Server error creating mood entry' });
  }
});

// Get mood entries with filtering and pagination
router.get('/', auth, [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1-100'),
  query('startDate').optional().isISO8601().withMessage('Invalid start date format'),
  query('endDate').optional().isISO8601().withMessage('Invalid end date format'),
  query('mood').optional().isIn(['very-sad', 'sad', 'neutral', 'happy', 'very-happy'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build query
    const query = { userId: req.userId };
    
    if (req.query.startDate || req.query.endDate) {
      query.date = {};
      if (req.query.startDate) query.date.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.date.$lte = new Date(req.query.endDate);
    }
    
    if (req.query.mood) {
      query.mood = req.query.mood;
    }

    const moods = await Mood.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Mood.countDocuments(query);

    res.json({
      moods,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Mood fetch error:', error);
    res.status(500).json({ message: 'Server error fetching mood entries' });
  }
});

// Get mood analytics
router.get('/analytics', auth, [
  query('period').optional().isIn(['week', 'month', 'quarter', 'year']).withMessage('Invalid period'),
  query('startDate').optional().isISO8601(),
  query('endDate').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const period = req.query.period || 'month';
    let startDate, endDate;

    if (req.query.startDate && req.query.endDate) {
      startDate = new Date(req.query.startDate);
      endDate = new Date(req.query.endDate);
    } else {
      endDate = new Date();
      switch (period) {
        case 'week':
          startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, endDate.getDate());
          break;
        case 'quarter':
          startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 3, endDate.getDate());
          break;
        case 'year':
          startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());
          break;
      }
    }

    const moods = await Mood.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // Calculate analytics
    const moodCounts = moods.reduce((acc, mood) => {
      acc[mood.mood] = (acc[mood.mood] || 0) + 1;
      return acc;
    }, {});

    const averageIntensity = moods.length > 0 
      ? moods.reduce((sum, mood) => sum + mood.intensity, 0) / moods.length 
      : 0;

    const moodTrend = moods.map(mood => ({
      date: mood.date,
      mood: mood.mood,
      intensity: mood.intensity,
      moodScore: mood.moodScore
    }));

    // Most common triggers and activities
    const allTriggers = moods.flatMap(mood => mood.triggers || []);
    const allActivities = moods.flatMap(mood => mood.activities || []);

    const triggerCounts = allTriggers.reduce((acc, trigger) => {
      acc[trigger] = (acc[trigger] || 0) + 1;
      return acc;
    }, {});

    const activityCounts = allActivities.reduce((acc, activity) => {
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {});

    const topTriggers = Object.entries(triggerCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([trigger, count]) => ({ trigger, count }));

    const topActivities = Object.entries(activityCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([activity, count]) => ({ activity, count }));

    res.json({
      period: {
        start: startDate,
        end: endDate,
        type: period
      },
      summary: {
        totalEntries: moods.length,
        averageIntensity: Math.round(averageIntensity * 100) / 100,
        moodDistribution: moodCounts,
        mostCommonMood: Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || null
      },
      trends: moodTrend,
      insights: {
        topTriggers,
        topActivities
      }
    });
  } catch (error) {
    console.error('Mood analytics error:', error);
    res.status(500).json({ message: 'Server error generating mood analytics' });
  }
});

// Update mood entry
router.put('/:id', auth, [
  body('mood').optional().isIn(['very-sad', 'sad', 'neutral', 'happy', 'very-happy']),
  body('intensity').optional().isInt({ min: 1, max: 10 }),
  body('note').optional().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const mood = await Mood.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    res.json({
      message: 'Mood entry updated successfully',
      mood
    });
  } catch (error) {
    console.error('Mood update error:', error);
    res.status(500).json({ message: 'Server error updating mood entry' });
  }
});

// Delete mood entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    res.json({ message: 'Mood entry deleted successfully' });
  } catch (error) {
    console.error('Mood deletion error:', error);
    res.status(500).json({ message: 'Server error deleting mood entry' });
  }
});

module.exports = router;