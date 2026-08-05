const path = require('path');
const fs = require('fs');
const ResumeDownload = require('../models/ResumeDownload');

function resolveResumePath() {
  const backendRoot = path.join(__dirname, '..');

  const configuredPath = (process.env.RESUME_FILE_PATH || '').trim();
  if (configuredPath) {
    const candidate = path.isAbsolute(configuredPath) ? configuredPath : path.join(backendRoot, configuredPath);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  const candidateNames = [
    'Tushal_Jadhav_Resume.pdf',
    'Tushal_Jadhav_Resume_Official.pdf',
    'resume.pdf',
    'Resume.pdf'
  ];

  for (const name of candidateNames) {
    const candidate = path.join(backendRoot, 'data', name);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  const dataDir = path.join(backendRoot, 'data');
  if (fs.existsSync(dataDir)) {
    const pdfFiles = fs.readdirSync(dataDir).filter((file) => file.toLowerCase().endsWith('.pdf'));
    if (pdfFiles.length > 0) {
      return path.join(dataDir, pdfFiles[0]);
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

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

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
