const express = require('express');
const { getAnalytics, getVisitors, getPublicStats } = require('../controllers/analyticsController');
const { requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/public-stats', getPublicStats);
router.get('/analytics', requireAdmin, getAnalytics);
router.get('/visitors', requireAdmin, getVisitors);

module.exports = router;
