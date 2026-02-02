const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Habit = require('../models/Habit');
const auth = require('../middleware/auth');

const router = express.Router();

// Create habit
router.post('/', auth, [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1-100 characters'),
  body('description').optional().trim().isLength({ max: 300 }),
  body('category').isIn(['health', 'mindfulness', 'productivity', 'social', 'learning', 'fitness', 'nutrition', 'sleep', 'other']),
  body('frequency').optional().isIn(['daily', 'weekly', 'monthly']),
  body('targetCount').optional().isInt({ min: 1 }),
  body('unit').optional().isLength({ max: 20 }),
  body('reminderTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('color').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  body('icon').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const habitData = {
      userId: req.userId,
      ...req.body
    };

    const habit = new Habit(habitData);
    await habit.save();

    res.status(201).json({
      message: 'Habit created successfully',
      habit
    });
  } catch (error) {
    console.error('Habit creation error:', error);
    res.status(500).json({ message: 'Server error creating habit' });
  }
});

// Get habits
router.get('/', auth, [
  query('category').optional().isIn(['health', 'mindfulness', 'productivity', 'social', 'learning', 'fitness', 'nutrition', 'sleep', 'other']),
  query('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const query = { userId: req.userId };
    
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }

    const habits = await Habit.find(query).sort({ createdAt: -1 });

    res.json({ habits });
  } catch (error) {
    console.error('Habits fetch error:', error);
    res.status(500).json({ message: 'Server error fetching habits' });
  }
});

// Get single habit with completions
router.get('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json({ habit });
  } catch (error) {
    console.error('Habit fetch error:', error);
    res.status(500).json({ message: 'Server error fetching habit' });
  }
});

// Mark habit as completed
router.post('/:id/complete', auth, [
  body('date').optional().isISO8601(),
  body('count').optional().isInt({ min: 1 }),
  body('note').optional().isLength({ max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.userId,
      isActive: true
    });

    if (!habit) {
      return res.status(404).json({ message: 'Active habit not found' });
    }

    const completionDate = req.body.date ? new Date(req.body.date) : new Date();
    const count = req.body.count || 1;
    const note = req.body.note || '';

    // Check if already completed today
    const today = new Date(completionDate);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingCompletion = habit.completions.find(completion => {
      const compDate = new Date(completion.date);
      return compDate >= today && compDate < tomorrow;
    });

    if (existingCompletion) {
      // Update existing completion
      existingCompletion.count += count;
      if (note) existingCompletion.note = note;
    } else {
      // Add new completion
      habit.completions.push({
        date: completionDate,
        count,
        note
      });

      // Update streak
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (!habit.streak.lastCompletedDate || 
          new Date(habit.streak.lastCompletedDate).toDateString() === yesterday.toDateString()) {
        habit.streak.current += 1;
        if (habit.streak.current > habit.streak.longest) {
          habit.streak.longest = habit.streak.current;
        }
      } else if (new Date(habit.streak.lastCompletedDate).toDateString() !== today.toDateString()) {
        habit.streak.current = 1;
      }
      
      habit.streak.lastCompletedDate = completionDate;
    }

    await habit.save();

    res.json({
      message: 'Habit marked as completed',
      habit,
      completion: existingCompletion || habit.completions[habit.completions.length - 1]
    });
  } catch (error) {
    console.error('Habit completion error:', error);
    res.status(500).json({ message: 'Server error marking habit as completed' });
  }
});

// Get habit analytics
router.get('/:id/analytics', auth, [
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

    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
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

    // Filter completions within date range
    const completionsInRange = habit.completions.filter(completion => {
      const compDate = new Date(completion.date);
      return compDate >= startDate && compDate <= endDate;
    });

    // Calculate analytics
    const totalCompletions = completionsInRange.reduce((sum, comp) => sum + comp.count, 0);
    const completionDays = completionsInRange.length;
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const completionRate = totalDays > 0 ? (completionDays / totalDays) * 100 : 0;

    // Daily completion data for charts
    const dailyData = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const completion = completionsInRange.find(comp => 
        new Date(comp.date).toISOString().split('T')[0] === dateStr
      );
      
      dailyData.push({
        date: new Date(currentDate),
        completed: !!completion,
        count: completion ? completion.count : 0,
        note: completion ? completion.note : null
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.json({
      habit: {
        id: habit._id,
        name: habit.name,
        category: habit.category,
        frequency: habit.frequency,
        targetCount: habit.targetCount
      },
      period: {
        start: startDate,
        end: endDate,
        type: period
      },
      analytics: {
        totalCompletions,
        completionDays,
        totalDays,
        completionRate: Math.round(completionRate * 100) / 100,
        currentStreak: habit.streak.current,
        longestStreak: habit.streak.longest,
        averagePerDay: totalDays > 0 ? Math.round((totalCompletions / totalDays) * 100) / 100 : 0
      },
      dailyData
    });
  } catch (error) {
    console.error('Habit analytics error:', error);
    res.status(500).json({ message: 'Server error generating habit analytics' });
  }
});

// Update habit
router.put('/:id', auth, [
  body('name').optional().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().trim().isLength({ max: 300 }),
  body('category').optional().isIn(['health', 'mindfulness', 'productivity', 'social', 'learning', 'fitness', 'nutrition', 'sleep', 'other']),
  body('frequency').optional().isIn(['daily', 'weekly', 'monthly']),
  body('targetCount').optional().isInt({ min: 1 }),
  body('unit').optional().isLength({ max: 20 }),
  body('reminderTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('color').optional().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  body('icon').optional().isString(),
  body('isActive').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json({
      message: 'Habit updated successfully',
      habit
    });
  } catch (error) {
    console.error('Habit update error:', error);
    res.status(500).json({ message: 'Server error updating habit' });
  }
});

// Delete habit
router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Habit deletion error:', error);
    res.status(500).json({ message: 'Server error deleting habit' });
  }
});

module.exports = router;