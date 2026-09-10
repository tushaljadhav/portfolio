const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    issuer: {
      type: String,
      required: true,
      trim: true,
    },
    issueDate: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String,
      default: 'images/certificates/connexa_hackathon_1st_prize.jpg',
    },
    credentialUrl: {
      type: String,
      default: '#',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Achievement', achievementSchema);
