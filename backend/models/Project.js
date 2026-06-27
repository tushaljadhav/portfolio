const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    },
    tags: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: '#',
    },
    liveUrl: {
      type: String,
      default: '#',
    },
    category: {
      type: String,
      default: 'Web Development',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
