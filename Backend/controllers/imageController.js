 // Adjust path to your Firebase config
const { collection, addDoc, getDocs, getDoc, doc, deleteDoc, query, orderBy } = require("firebase/firestore");
const { db } = require("../config/db");
const { cloudinary_js_config } = require("../config/cloudinary");

const uploadImages = async (req, res) => {
    try {
        const images = req.files.map(file => ({
            mimeType: file.mimetype,
            originalName: file.originalname,
            imageURL: file.path,
            size: file.size,
            createdAt: new Date()
        }));

        const savedImages = [];

        for (const image of images) {
            const docRef = await addDoc(collection(db, "imageGallery"), image);
            savedImages.push({ id: docRef.id, ...image });
        }

        const urls = req.files.map(file => file.path);

        res.status(200).json({
            message: "Files uploaded successfully",
            success: true,
            files: req.files,
            urls,
            savedImages
        });
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({
            message: 'Image: Internal server error',
            success: false,
            error: err.message
        });
    }
};

const getAllImages = async (req, res) => {
    try {
        const q = query(collection(db, "imageGallery"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json({
            message: "Images",
            success: true,
            data
        });
    } catch (err) {
        console.error('Fetch error:', err);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: err.message
        });
    }
};

const getImageDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const docRef = doc(db, "imageGallery", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return res.status(404).json({
                message: "Image not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Image Details",
            success: true,
            data: { id: snapshot.id, ...snapshot.data() }
        });
    } catch (err) {
        console.error('Error fetching image by ID:', err);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: err.message
        });
    }
};
const deleteImageById = async (req, res) => {
    try {
        const { id } = req.params;

        const docRef = doc(db, "imageGallery", id);
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return res.status(404).json({
                message: "Image not found",
                success: false
            });
        }

        const imageData = snapshot.data();
        const publicId = imageData.public_id; // make sure this was stored at upload

        // 1. Delete from Firestore
        await deleteDoc(docRef);

        // 2. Delete from Cloudinary
        if (publicId) {
            await cloudinary_js_config.uploader.destroy(publicId);
        }

        res.status(200).json({
            message: "Image deleted successfully from Firestore and Cloudinary",
            success: true
        });

    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: err.message
        });
    }
};

module.exports = {
    uploadImages,
    getAllImages,
    getImageDetailById,
    deleteImageById
};
