const express = require('express');
const { body, validationResult } = require('express-validator');
const Experience = require('../models/Experience');
const { protect, admin, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/experiences
// @desc    Get all experiences
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      type, 
      current, 
      page = 1, 
      limit = 20,
      sort = 'startDate' 
    } = req.query;

    // Build query
    const query = {};
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (current === 'true') {
      query.current = true;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'company':
        sortObj = { company: 1 };
        break;
      case 'title':
        sortObj = { title: 1 };
        break;
      default:
        sortObj = { current: -1, startDate: -1, order: 1 };
    }

    // Execute query with pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const experiences = await Experience.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const total = await Experience.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        experiences,
        pagination: {
          current: pageNum,
          pages: Math.ceil(total / limitNum),
          total,
          limit: limitNum
        }
      }
    });
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching experiences'
    });
  }
});

// @route   GET /api/experiences/types
// @desc    Get experience types
// @access  Public
router.get('/types', async (req, res) => {
  try {
    const types = await Experience.distinct('type');
    
    res.status(200).json({
      success: true,
      data: {
        types: types.sort()
      }
    });
  } catch (error) {
    console.error('Get types error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching types'
    });
  }
});

// @route   GET /api/experiences/:id
// @desc    Get single experience
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Get experience error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching experience'
    });
  }
});

// @route   POST /api/experiences
// @desc    Create new experience
// @access  Private (Admin only)
router.post('/', protect, admin, [
  body('type').isIn(['work', 'education', 'certification']).withMessage('Invalid type'),
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('company').trim().isLength({ min: 1, max: 100 }).withMessage('Company must be between 1 and 100 characters'),
  body('description').trim().isLength({ min: 1, max: 1000 }).withMessage('Description must be between 1 and 1000 characters'),
  body('startDate').isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
  body('current').optional().isBoolean().withMessage('Current must be a boolean')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors.array()
      });
    }

    // Validate that if current is true, endDate should not be provided
    if (req.body.current && req.body.endDate) {
      return res.status(400).json({
        success: false,
        message: 'Current experiences cannot have an end date'
      });
    }

    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating experience'
    });
  }
});

// @route   PUT /api/experiences/:id
// @desc    Update experience
// @access  Private (Admin only)
router.put('/:id', protect, admin, [
  body('type').optional().isIn(['work', 'education', 'certification']).withMessage('Invalid type'),
  body('title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters'),
  body('company').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Company must be between 1 and 100 characters'),
  body('description').optional().trim().isLength({ min: 1, max: 1000 }).withMessage('Description must be between 1 and 1000 characters'),
  body('startDate').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('endDate').optional().isISO8601().withMessage('End date must be a valid date'),
  body('current').optional().isBoolean().withMessage('Current must be a boolean')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: errors.array()
      });
    }

    // Validate that if current is true, endDate should not be provided
    if (req.body.current && req.body.endDate) {
      return res.status(400).json({
        success: false,
        message: 'Current experiences cannot have an end date'
      });
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error('Update experience error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating experience'
    });
  }
});

// @route   DELETE /api/experiences/:id
// @desc    Delete experience
// @access  Private (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid experience ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting experience'
    });
  }
});

module.exports = router;
