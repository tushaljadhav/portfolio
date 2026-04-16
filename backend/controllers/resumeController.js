const path = require('path');
const fs = require('fs');
const ResumeDownload = require('../models/ResumeDownload');

async function increaseResumeDownloadCount() {
  return ResumeDownload.findOneAndUpdate(
    { key: 'main-resume' },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );
}

async function downloadResume(req, res) {
  try {
    const configuredPath = process.env.RESUME_FILE_PATH || path.join(__dirname, '..', 'data', 'resume.txt');
    const resumePath = path.isAbsolute(configuredPath)
      ? configuredPath
      : path.join(__dirname, '..', configuredPath);

    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found. Update RESUME_FILE_PATH in .env.',
      });
    }

    await increaseResumeDownloadCount();

    return res.download(resumePath);
  } catch (error) {
    console.error('Resume download error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to download resume right now.',
    });
  }
}

async function getResumeCount(req, res) {
  try {
    const doc = await ResumeDownload.findOne({ key: 'main-resume' });

    return res.status(200).json({
      success: true,
      count: doc ? doc.count : 0,
    });
  } catch (error) {
    console.error('Resume count error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to fetch resume download count.',
    });
  }
}

module.exports = {
  downloadResume,
  getResumeCount,
};
