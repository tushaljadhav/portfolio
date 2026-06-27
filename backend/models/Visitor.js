const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      default: '/'
    },
    location: {
      country: { type: String, default: 'Unknown' },
      region: { type: String, default: 'Unknown' },
      city: { type: String, default: 'Unknown' },
      timezone: { type: String, default: 'Unknown' },
    },
    userAgent: {
      type: String,
      default: '',
    },
    browser: {
      type: String,
      default: 'Unknown',
    },
    os: {
      type: String,
      default: 'Unknown',
    },
    device: {
      type: String,
      default: 'Desktop',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Visitor', visitorSchema);
