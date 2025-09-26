const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadAndDistribute } = require('../controllers/uploadController');
const protect = require('../middleware/auth');   // ✅ import protect

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ max 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.csv', '.xlsx', '.xls'];
    const ext = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error('Only CSV/XLSX files allowed!'), false);
    }
    cb(null, true);
  }
});

// ✅ Only logged-in users can upload CSV/XLSX
router.post('/csv', protect, upload.single('file'), uploadAndDistribute);

module.exports = router;
