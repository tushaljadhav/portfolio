const mongoose = require('mongoose');

const resumeDownloadSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: 'main-resume',
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ResumeDownload', resumeDownloadSchema);
