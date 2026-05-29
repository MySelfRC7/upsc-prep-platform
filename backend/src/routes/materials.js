const express = require('express');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../middleware/auth');
const materialController = require('../controllers/materialController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/materials');
    if (!require('fs').existsSync(uploadDir)) {
      require('fs').mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'material-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Only allow PDF files
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

// Upload material
router.post('/upload', verifyToken, upload.single('file'), materialController.uploadMaterial);

// Get all materials
router.get('/', verifyToken, materialController.getMaterials);

// Get material by ID
router.get('/:id', verifyToken, materialController.getMaterialById);

// Delete material
router.delete('/:id', verifyToken, materialController.deleteMaterial);

// Get subjects and topics
router.get('/subjects/all', verifyToken, materialController.getSubjects);

module.exports = router;
