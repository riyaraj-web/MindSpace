const express = require('express');
const { body, validationResult, query } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

// In-memory storage for meditation sessions (in production, use MongoDB)
const meditationSessions = new Map();

// Create meditation session
router.post('/sessions', auth, [
  body('type').isIn(['breathing', 'mindfulness', 'body-scan', 'loving-kindness', 'guided', 'music']).withMessage('Invalid meditation type'),
  body('duration').isInt({ min: 1, max: 3600 }).withMessage('Duration must be between 1-3600 seconds'),
  body('title').optional().trim().isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const sessionData = {
      id: Date.now().toString(),
      userId: req.userId,
      type: req.body.type,
      duration: req.body.duration,
      title: req.body.title || `${req.body.type} meditation`,
      description: req.body.description || '',
      startTime: new Date(),
      status: 'active',
      progress: 0
    };

    meditationSessions.set(sessionData.id, sessionData);

    res.status(201).json({
      message: 'Meditation session started',
      session: sessionData
    });
  } catch (error) {
    console.error('Meditation session creation error:', error);
    res.status(500).json({ message: 'Server error starting meditation session' });
  }
});

// Get meditation session
router.get('/sessions/:id', auth, async (req, res) => {
  try {
    const session = meditationSessions.get(req.params.id);
    
    if (!session || session.userId !== req.userId) {
      return res.status(404).json({ message: 'Meditation session not found' });
    }

    res.json({ session });
  } catch (error) {
    console.error('Meditation session fetch error:', error);
    res.status(500).json({ message: 'Server error fetching meditation session' });
  }
});

// Update meditation session progress
router.put('/sessions/:id/progress', auth, [
  body('progress').isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0-100'),
  body('currentTime').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const session = meditationSessions.get(req.params.id);
    
    if (!session || session.userId !== req.userId) {
      return res.status(404).json({ message: 'Meditation session not found' });
    }

    session.progress = req.body.progress;
    if (req.body.currentTime !== undefined) {
      session.currentTime = req.body.currentTime;
    }
    
    if (req.body.progress >= 100) {
      session.status = 'completed';
      session.endTime = new Date();
      session.actualDuration = Math.floor((session.endTime - session.startTime) / 1000);
    }

    meditationSessions.set(req.params.id, session);

    res.json({
      message: 'Session progress updated',
      session
    });
  } catch (error) {
    console.error('Meditation progress update error:', error);
    res.status(500).json({ message: 'Server error updating meditation progress' });
  }
});

// Complete meditation session
router.post('/sessions/:id/complete', auth, [
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1-5'),
  body('notes').optional().trim().isLength({ max: 500 }),
  body('mood').optional().isIn(['very-sad', 'sad', 'neutral', 'happy', 'very-happy'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const session = meditationSessions.get(req.params.id);
    
    if (!session || session.userId !== req.userId) {
      return res.status(404).json({ message: 'Meditation session not found' });
    }

    session.status = 'completed';
    session.endTime = new Date();
    session.actualDuration = Math.floor((session.endTime - session.startTime) / 1000);
    session.rating = req.body.rating;
    session.notes = req.body.notes;
    session.mood = req.body.mood;
    session.progress = 100;

    meditationSessions.set(req.params.id, session);

    // In production, save to database here
    // const completedSession = new MeditationSession(session);
    // await completedSession.save();

    res.json({
      message: 'Meditation session completed',
      session
    });
  } catch (error) {
    console.error('Meditation completion error:', error);
    res.status(500).json({ message: 'Server error completing meditation session' });
  }
});

// Get user's meditation history
router.get('/history', auth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('type').optional().isIn(['breathing', 'mindfulness', 'body-scan', 'loving-kindness', 'guided', 'music']),
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

    // Filter sessions for current user
    const userSessions = Array.from(meditationSessions.values())
      .filter(session => session.userId === req.userId && session.status === 'completed');

    // Apply filters
    let filteredSessions = userSessions;
    
    if (req.query.type) {
      filteredSessions = filteredSessions.filter(session => session.type === req.query.type);
    }
    
    if (req.query.startDate || req.query.endDate) {
      const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(0);
      const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();
      
      filteredSessions = filteredSessions.filter(session => {
        const sessionDate = new Date(session.startTime);
        return sessionDate >= startDate && sessionDate <= endDate;
      });
    }

    // Sort by start time (newest first)
    filteredSessions.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const paginatedSessions = filteredSessions.slice(skip, skip + limit);

    res.json({
      sessions: paginatedSessions,
      pagination: {
        current: page,
        pages: Math.ceil(filteredSessions.length / limit),
        total: filteredSessions.length,
        hasNext: skip + limit < filteredSessions.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Meditation history fetch error:', error);
    res.status(500).json({ message: 'Server error fetching meditation history' });
  }
});

// Get meditation statistics
router.get('/stats', auth, [
  query('period').optional().isIn(['week', 'month', 'quarter', 'year']),
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

    // Filter completed sessions for current user within date range
    const userSessions = Array.from(meditationSessions.values())
      .filter(session => {
        if (session.userId !== req.userId || session.status !== 'completed') return false;
        const sessionDate = new Date(session.startTime);
        return sessionDate >= startDate && sessionDate <= endDate;
      });

    // Calculate statistics
    const totalSessions = userSessions.length;
    const totalMinutes = userSessions.reduce((sum, session) => sum + Math.floor(session.actualDuration / 60), 0);
    const averageSessionLength = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;
    
    const typeDistribution = userSessions.reduce((acc, session) => {
      acc[session.type] = (acc[session.type] || 0) + 1;
      return acc;
    }, {});

    const averageRating = userSessions.filter(s => s.rating).length > 0
      ? userSessions.filter(s => s.rating).reduce((sum, s) => sum + s.rating, 0) / userSessions.filter(s => s.rating).length
      : 0;

    // Daily meditation data for charts
    const dailyData = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const daySessions = userSessions.filter(session => 
        new Date(session.startTime).toISOString().split('T')[0] === dateStr
      );
      
      dailyData.push({
        date: new Date(currentDate),
        sessions: daySessions.length,
        minutes: daySessions.reduce((sum, session) => sum + Math.floor(session.actualDuration / 60), 0)
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate streak
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const sortedDailyData = [...dailyData].reverse();
    for (const day of sortedDailyData) {
      if (day.sessions > 0) {
        tempStreak++;
        if (currentStreak === 0) currentStreak = tempStreak;
      } else {
        if (tempStreak > longestStreak) longestStreak = tempStreak;
        tempStreak = 0;
        currentStreak = 0;
      }
    }
    if (tempStreak > longestStreak) longestStreak = tempStreak;

    res.json({
      period: {
        start: startDate,
        end: endDate,
        type: period
      },
      summary: {
        totalSessions,
        totalMinutes,
        averageSessionLength,
        averageRating: Math.round(averageRating * 100) / 100,
        currentStreak,
        longestStreak
      },
      typeDistribution,
      dailyData
    });
  } catch (error) {
    console.error('Meditation stats error:', error);
    res.status(500).json({ message: 'Server error generating meditation statistics' });
  }
});

// Get meditation recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    // Get user's recent sessions to provide personalized recommendations
    const userSessions = Array.from(meditationSessions.values())
      .filter(session => session.userId === req.userId && session.status === 'completed')
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
      .slice(0, 10);

    const recommendations = [];

    // Basic recommendations based on meditation history
    if (userSessions.length === 0) {
      recommendations.push(
        {
          type: 'breathing',
          title: 'Start with Breathing',
          description: 'Perfect for beginners. Focus on your breath to calm your mind.',
          duration: 300, // 5 minutes
          difficulty: 'beginner'
        },
        {
          type: 'mindfulness',
          title: 'Mindfulness Basics',
          description: 'Learn to observe your thoughts without judgment.',
          duration: 600, // 10 minutes
          difficulty: 'beginner'
        }
      );
    } else {
      // Analyze user preferences
      const typeFrequency = userSessions.reduce((acc, session) => {
        acc[session.type] = (acc[session.type] || 0) + 1;
        return acc;
      }, {});

      const favoriteType = Object.entries(typeFrequency).sort(([,a], [,b]) => b - a)[0]?.[0];
      const averageDuration = userSessions.reduce((sum, s) => sum + s.actualDuration, 0) / userSessions.length;

      // Recommend similar sessions
      if (favoriteType) {
        recommendations.push({
          type: favoriteType,
          title: `More ${favoriteType} meditation`,
          description: `Continue with your favorite ${favoriteType} practice.`,
          duration: Math.round(averageDuration),
          difficulty: 'intermediate'
        });
      }

      // Recommend trying new types
      const allTypes = ['breathing', 'mindfulness', 'body-scan', 'loving-kindness', 'guided', 'music'];
      const untriedTypes = allTypes.filter(type => !typeFrequency[type]);
      
      if (untriedTypes.length > 0) {
        const newType = untriedTypes[Math.floor(Math.random() * untriedTypes.length)];
        recommendations.push({
          type: newType,
          title: `Try ${newType} meditation`,
          description: `Explore a new meditation style to expand your practice.`,
          duration: Math.min(averageDuration, 900), // Cap at 15 minutes for new types
          difficulty: 'beginner'
        });
      }
    }

    // Time-based recommendations
    const currentHour = new Date().getHours();
    if (currentHour < 10) {
      recommendations.push({
        type: 'mindfulness',
        title: 'Morning Mindfulness',
        description: 'Start your day with clarity and intention.',
        duration: 600,
        difficulty: 'beginner'
      });
    } else if (currentHour > 18) {
      recommendations.push({
        type: 'body-scan',
        title: 'Evening Relaxation',
        description: 'Unwind and release the tension from your day.',
        duration: 900,
        difficulty: 'intermediate'
      });
    }

    res.json({
      recommendations: recommendations.slice(0, 5) // Limit to 5 recommendations
    });
  } catch (error) {
    console.error('Meditation recommendations error:', error);
    res.status(500).json({ message: 'Server error generating recommendations' });
  }
});

module.exports = router;