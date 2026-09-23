const express = require('express');
const { requireAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/upload', requireAdmin, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload failed.',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded.',
      });
    }

    const subfolder = req.query.type || 'projects';
    const sanitizedFolder = subfolder.replace(/[^a-zA-Z0-9_-]/g, '');
    const relativeUrl = `/uploads/${sanitizedFolder}/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully.',
      url: relativeUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  });
});

module.exports = router;
