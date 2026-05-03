const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// @route   GET /api/users/profile
// @desc    Get user profile (public)
// @access  Public
router.get('/profile', async (req, res) => {
  try {
    // Get the first user (usually the portfolio owner)
    const user = await User.findOne({ role: 'admin' });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        profile: {
          name: user.name,
          bio: user.bio,
          avatar: user.avatar,
          socialLinks: user.socialLinks,
          contactInfo: user.contactInfo
        }
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private (Admin only)
router.put('/profile', protect, admin, async (req, res) => {
  try {
    const allowedFields = ['name', 'bio', 'socialLinks', 'contactInfo'];
    const updateData = {};
    
    // Only update allowed fields
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const user = await User.findOneAndUpdate(
      { role: 'admin' },
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        profile: {
          name: user.name,
          bio: user.bio,
          avatar: user.avatar,
          socialLinks: user.socialLinks,
          contactInfo: user.contactInfo
        }
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   POST /api/users/upload-avatar
// @desc    Upload profile avatar
// @access  Private (Admin only)
router.post('/upload-avatar', protect, admin, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Get the admin user
    const user = await User.findOne({ role: 'admin' });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }

    // Update user avatar
    user.avatar = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB.'
      });
    }
    if (error.message === 'Only image files are allowed!') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while uploading avatar'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private (Admin only)
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const User = require('../models/User');
    const Project = require('../models/Project');
    const Skill = require('../models/Skill');
    const Experience = require('../models/Experience');
    const Message = require('../models/Message');

    // Get counts
    const [
      userCount,
      projectCount,
      skillCount,
      experienceCount,
      messageCount,
      unreadMessageCount
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ status: 'unread' })
    ]);

    // Get project stats by category
    const projectStats = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Get skill stats by category
    const skillStats = await Skill.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Get experience stats by type
    const experienceStats = await Experience.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: userCount,
          projects: projectCount,
          skills: skillCount,
          experiences: experienceCount,
          messages: messageCount,
          unreadMessages: unreadMessageCount
        },
        stats: {
          projectsByCategory: projectStats.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          skillsByCategory: skillStats.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {}),
          experiencesByType: experienceStats.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
          }, {})
        }
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;
