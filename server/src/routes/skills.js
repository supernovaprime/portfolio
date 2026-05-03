const express = require('express');
const { body, validationResult } = require('express-validator');
const Skill = require('../models/Skill');
const { protect, admin, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      page = 1, 
      limit = 50,
      sort = 'order' 
    } = req.query;

    // Build query
    const query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'name':
        sortObj = { name: 1 };
        break;
      case 'level':
        sortObj = { level: -1 };
        break;
      default:
        sortObj = { category: 1, featured: -1, order: 1 };
    }

    // Execute query with pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const skills = await Skill.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum);

    const total = await Skill.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        skills,
        pagination: {
          current: pageNum,
          pages: Math.ceil(total / limitNum),
          total,
          limit: limitNum
        }
      }
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching skills'
    });
  }
});

// @route   GET /api/skills/categories
// @desc    Get skill categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Skill.distinct('category');
    
    res.status(200).json({
      success: true,
      data: {
        categories: categories.sort()
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories'
    });
  }
});

// @route   GET /api/skills/:id
// @desc    Get single skill
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        skill
      }
    });
  } catch (error) {
    console.error('Get skill error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid skill ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching skill'
    });
  }
});

// @route   POST /api/skills
// @desc    Create new skill
// @access  Private (Admin only)
router.post('/', protect, admin, [
  body('name').trim().isLength({ min: 1, max: 50 }).withMessage('Name must be between 1 and 50 characters'),
  body('category').isIn(['frontend', 'backend', 'tools', 'soft-skills', 'database', 'devops']).withMessage('Invalid category'),
  body('level').isInt({ min: 1, max: 5 }).withMessage('Level must be between 1 and 5'),
  body('description').optional().trim().isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters')
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

    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: {
        skill
      }
    });
  } catch (error) {
    console.error('Create skill error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Skill with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while creating skill'
    });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private (Admin only)
router.put('/:id', protect, admin, [
  body('name').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Name must be between 1 and 50 characters'),
  body('category').optional().isIn(['frontend', 'backend', 'tools', 'soft-skills', 'database', 'devops']).withMessage('Invalid category'),
  body('level').optional().isInt({ min: 1, max: 5 }).withMessage('Level must be between 1 and 5'),
  body('description').optional().trim().isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters')
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

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully',
      data: {
        skill
      }
    });
  } catch (error) {
    console.error('Update skill error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid skill ID'
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Skill with this name already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating skill'
    });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid skill ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting skill'
    });
  }
});

module.exports = router;
