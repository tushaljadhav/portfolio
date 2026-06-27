const express = require('express');
const { adminLogin, adminLogout, getAdminDashboardPage } = require('../controllers/adminController');

const router = express.Router();

router.post('/api/admin-login', adminLogin);
router.post('/api/admin-logout', adminLogout);
router.get('/admin-secret-123', getAdminDashboardPage);

module.exports = router;
