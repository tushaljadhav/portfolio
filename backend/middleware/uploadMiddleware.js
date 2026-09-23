const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure destination directories exist
function getUploadDir(subfolder = 'projects') {
  const sanitizedFolder = subfolder.replace(/[^a-zA-Z0-9_-]/g, '');
  const dir = path.join(__dirname, '..', 'uploads', sanitizedFolder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const subfolder = req.query.type || 'projects';
    const uploadPath = getUploadDir(subfolder);
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${baseName || 'upload'}-${uniqueSuffix}${ext}`);
  },
});

function fileFilter(req, file, cb) {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
  ];

  if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPG, PNG, WEBP, GIF, SVG, AVIF) are allowed.'), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max
  },
});

module.exports = {
  upload,
  getUploadDir,
};
