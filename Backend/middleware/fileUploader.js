
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        public_id: (req, file) => {
            const timestamp = Date.now();
            const originalName = file.originalname.split('.')[0];
            return `${originalName}_${timestamp}`;
        },
        transformation: [
            { width: 1000, height: 1000, crop: 'limit' },
            { quality: 'auto' }
        ]
    }
});

// Configure Multer
const cloudinaryFileUploader = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Export middleware functions
const uploadMultiple = cloudinaryFileUploader.array('images', 10);
const uploadSingle = cloudinaryFileUploader.single('image');

module.exports = {
    cloudinaryFileUploader,
    uploadMultiple,
    uploadSingle,
    cloudinary
};
