const express = require('express');
const { submitContactForm, getContacts, deleteContact, clearAllContacts } = require('../controllers/contactController');
const { requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/contact', submitContactForm);
router.get('/contacts', requireAdmin, getContacts);
router.delete('/contacts/:id', requireAdmin, deleteContact);
router.delete('/contacts-all', requireAdmin, clearAllContacts);

module.exports = router;
