const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'tools', 'soft-skills', 'database', 'devops'],
    required: [true, 'Skill category is required']
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: [1, 'Skill level must be at least 1'],
    max: [5, 'Skill level cannot exceed 5']
  },
  icon: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add index for better query performance
skillSchema.index({ category: 1, featured: -1, order: 1 });
skillSchema.index({ level: -1 });

module.exports = mongoose.model('Skill', skillSchema);
