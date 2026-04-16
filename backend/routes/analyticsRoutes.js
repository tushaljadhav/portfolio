const express = require('express');
const { getAnalytics, getVisitors } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/analytics', getAnalytics);
router.get('/visitors', getVisitors);

module.exports = router;
