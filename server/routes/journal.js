const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

const router = express.Router();

// Create journal entry
router.post('/', auth, [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1-100 characters'),
  body('content').trim().isLength({ min: 1, max: 5000 }).withMessage('Content must be between 1-5000 characters'),
  body('mood').optional().isIn(['very-sad', 'sad', 'neutral', 'happy', 'very-happy']),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('isPrivate').optional().isBoolean(),
  body('gratitude').optional().isArray().withMessage('Gratitude must be an array'),
  body('goals').optional().isArray().withMessage('Goals must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const journalData = {
      userId: req.userId,
      ...req.body
    };

    const journal = new Journal(journalData);
    await journal.save();

    res.status(201).json({
      message: 'Journal entry created successfully',
      journal
    });
  } catch (error) {
    console.error('Journal creation error:', error);
    res.status(500).json({ message: 'Server error creating journal entry' });
  }
});

// Get journal entries with filtering and pagination
router.get('/', auth, [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().isString(),
  query('tag').optional().isString(),
  query('mood').optional().isIn(['very-sad', 'sad', 'neutral', 'happy', 'very-happy']),
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

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { userId: req.userId };
    
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    
    if (req.query.tag) {
      query.tags = { $in: [req.query.tag] };
    }
    
    if (req.query.mood) {
      query.mood = req.query.mood;
    }
    
    if (req.query.startDate || req.query.endDate) {
      query.createdAt = {};
      if (req.query.startDate) query.createdAt.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.createdAt.$lte = new Date(req.query.endDate);
    }

    const journals = await Journal.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('title content mood tags isPrivate wordCount readingTime createdAt updatedAt');

    const total = await Journal.countDocuments(query);

    res.json({
      journals,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Journal fetch error:', error);
    res.status(500).json({ message: 'Server error fetching journal entries' });
  }
});

// Get single journal entry
router.get('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({ journal });
  } catch (error) {
    console.error('Journal fetch error:', error);
    res.status(500).json({ message: 'Server error fetching journal entry' });
  }
});

// Get journal statistics
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const totalEntries = await Journal.countDocuments({ userId: req.userId });
    
    const wordCountStats = await Journal.aggregate([
      { $match: { userId: req.userId } },
      {
        $group: {
          _id: null,
          totalWords: { $sum: '$wordCount' },
          averageWords: { $avg: '$wordCount' },
          maxWords: { $max: '$wordCount' }
        }
      }
    ]);

    const moodDistribution = await Journal.aggregate([
      { $match: { userId: req.userId, mood: { $exists: true } } },
      {
        $group: {
          _id: '$mood',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentActivity = await Journal.aggregate([
      { $match: { userId: req.userId } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          count: { $sum: 1 },
          words: { $sum: '$wordCount' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: 30 }
    ]);

    const topTags = await Journal.aggregate([
      { $match: { userId: req.userId } },
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      overview: {
        totalEntries,
        totalWords: wordCountStats[0]?.totalWords || 0,
        averageWords: Math.round(wordCountStats[0]?.averageWords || 0),
        longestEntry: wordCountStats[0]?.maxWords || 0
      },
      moodDistribution: moodDistribution.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      recentActivity: recentActivity.map(item => ({
        date: new Date(item._id.year, item._id.month - 1, item._id.day),
        entries: item.count,
        words: item.words
      })),
      topTags: topTags.map(item => ({
        tag: item._id,
        count: item.count
      }))
    });
  } catch (error) {
    console.error('Journal stats error:', error);
    res.status(500).json({ message: 'Server error fetching journal statistics' });
  }
});

// Update journal entry
router.put('/:id', auth, [
  body('title').optional().trim().isLength({ min: 1, max: 100 }),
  body('content').optional().trim().isLength({ min: 1, max: 5000 }),
  body('mood').optional().isIn(['very-sad', 'sad', 'neutral', 'happy', 'very-happy']),
  body('tags').optional().isArray(),
  body('isPrivate').optional().isBoolean(),
  body('gratitude').optional().isArray(),
  body('goals').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({
      message: 'Journal entry updated successfully',
      journal
    });
  } catch (error) {
    console.error('Journal update error:', error);
    res.status(500).json({ message: 'Server error updating journal entry' });
  }
});

// Delete journal entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Journal deletion error:', error);
    res.status(500).json({ message: 'Server error deleting journal entry' });
  }
});

module.exports = router;