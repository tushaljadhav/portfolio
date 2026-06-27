const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    percentage: {
      type: Number,
      default: 80,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: true,
      default: 'Frontend Development', // categories: Frontend Development, Backend Development, Database Management, Tools & Workflow, API & Integration
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillSchema);
