const express = require('express');
const { adminLogin, getAdminDashboardPage } = require('../controllers/adminController');

const router = express.Router();

router.post('/api/admin-login', adminLogin);
router.get('/admin-secret-123', getAdminDashboardPage);

module.exports = router;
