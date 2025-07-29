const multer = require('multer'); // <-- Required for error handling

const {
  getAllImages,
  uploadImages,
  getImageDetailById,
  deleteImageById,
} = require('../controllers/imageController');

const { uploadMultiple } = require('../middleware/fileUploader');

const routes = require('express').Router();

// Multer error handler middleware
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File too large. Maximum size is 5MB per file.',
        success: false,
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        message: 'Too many files. Maximum is 10 files.',
        success: false,
      });
    }
  }
  if (err.message === 'Only image files are allowed!') {
    return res.status(400).json({
      message: 'Only image files are allowed!',
      success: false,
    });
  }
  next(err);
};

// Routes
routes.get('/', getAllImages);
routes.get('/:id', getImageDetailById);
routes.post('/upload-images', uploadMultiple, handleMulterErrors, uploadImages);
routes.delete('/:id', deleteImageById);

module.exports = routes;
