const path = require('path');
const fs = require('fs');
const ResumeDownload = require('../models/ResumeDownload');

function resolveResumePath() {
  const backendRoot = path.join(__dirname, '..');
  const configuredPath = (process.env.RESUME_FILE_PATH || '').trim();

  const candidates = [];

  if (configuredPath) {
    candidates.push(
      configuredPath,
      path.isAbsolute(configuredPath) ? configuredPath : path.join(backendRoot, configuredPath),
      path.isAbsolute(configuredPath)
        ? configuredPath
        : path.join(backendRoot, 'data', path.basename(configuredPath))
    );
  }

  // Fallback files inside backend/data for production safety.
  candidates.push(
    path.join(backendRoot, 'data', 'TUSHAL_RESUME (6).pdf'),
    path.join(backendRoot, 'data', 'resume.txt')
  );

  for (const filePath of candidates) {
    if (!filePath) continue;
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return filePath;
    }
  }

  return null;
}

async function increaseResumeDownloadCount() {
  return ResumeDownload.findOneAndUpdate(
    { key: 'main-resume' },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
  );
}

async function downloadResume(req, res) {
  try {
    const resumePath = resolveResumePath();

    if (!resumePath) {
      return res.status(404).json({
        success: false,
        message: 'Resume file not found. Update RESUME_FILE_PATH in .env.',
      });
    }

    try {
      await increaseResumeDownloadCount();
    } catch (countError) {
      // Resume delivery should still succeed even if analytics write fails.
      console.error('Resume count update error:', countError.message);
    }

    return res.download(resumePath, path.basename(resumePath));
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
