const express = require('express');
const { downloadResume, getResumeCount } = require('../controllers/resumeController');

const router = express.Router();

router.get('/download-resume', downloadResume);
router.get('/resume-count', getResumeCount);

module.exports = router;
