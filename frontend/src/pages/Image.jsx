import React, { useEffect, useState } from 'react';
import { Upload, ArrowLeft, Calendar, HardDrive, FileType, X, FolderOpen, Image, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

function ImageGalleryApp() {
    const [imageList, setImageList] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [uploadAlert, setUploadAlert] = useState(null);
    const backendUrl = import.meta.env.BACKEND_URL;

    // Valid image types
    const validImageTypes = [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'image/bmp'
    ];

    const fetchImages = async () => {
        try {
            setLoading(true);
            const url = `${backendUrl}/api/images`;
            const result = await fetch(url);
            const { data } = await result.json();
            setImageList(data || []);
        } catch (err) {
            console.error('Error fetching images:', err);
            setError('Failed to load images. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchImageDetails = async (id) => {
        try {
            setDetailLoading(true);
            setError(null);
            
            const url = `${backendUrl}/api/images/${id}`;
            const result = await fetch(url);
            
            if (!result.ok) {
                throw new Error(`HTTP ${result.status}: ${result.statusText}`);
            }
            
            const response = await result.json();
            const data = response.data || response;
            setSelectedImage(data);
        } catch (err) {
            console.error('Error fetching image details:', err);
            setError(err.message);
        } finally {
            setDetailLoading(false);
        }
    };

    const validateFiles = (files) => {
        const validFiles = [];
        const invalidFiles = [];
        
        files.forEach(file => {
            if (validImageTypes.includes(file.type)) {
                validFiles.push(file);
            } else {
                invalidFiles.push(file);
            }
        });

        return { validFiles, invalidFiles };
    };

    const showUploadAlert = (message, type = 'success', duration = 3000) => {
        setUploadAlert({ message, type });
        setTimeout(() => setUploadAlert(null), duration);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragActive(false);
        
        const files = Array.from(e.dataTransfer?.files || e.target.files || []);
        if (files.length === 0) return;

        // Validate files
        const { validFiles, invalidFiles } = validateFiles(files);

        if (invalidFiles.length > 0) {
            const invalidNames = invalidFiles.map(f => f.name).join(', ');
            showUploadAlert(
                `Invalid files detected: ${invalidNames}. Only image files are allowed!`, 
                'error', 
                5000
            );
            
            if (validFiles.length === 0) return;
        }

        if (validFiles.length === 0) return;

        setLoading(true);
        const formData = new FormData();
        validFiles.forEach(file => {
            formData.append('images', file);
        });

        try {
            const options = {
                method: 'POST',
                body: formData
            };
            const url = `${backendUrl}/api/images/upload-images`;
            const result = await fetch(url, options);
            console.log(result)
            await fetchImages();
            setError(null);
            
            // Show success alert
            const uploadedCount = validFiles.length;
            showUploadAlert(
                `Successfully uploaded ${uploadedCount} image${uploadedCount > 1 ? 's' : ''}!`,
                'success'
            );
        } catch (err) {
            console.error('Error uploading images:', err);
            setError('Error uploading images. Please try again.');
            showUploadAlert('Error uploading images. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleImageClick = (image) => {
        fetchImageDetails(image.id);
    };

    const handleBackToGallery = () => {
        setSelectedImage(null);
        setError(null);
    };

    const handleFileSelect = (e) => {
        handleDrop(e);
    };

    const handleDeleteImage = async (imageId) => {
        try {
            setDeleteLoading(true);
            setError(null);
            
            const url = `${backendUrl}/api/images/${imageId}`;
            const result = await fetch(url, {
                method: 'DELETE'
            });
            
            if (!result.ok) {
                throw new Error(`HTTP ${result.status}: ${result.statusText}`);
            }
            
            await fetchImages();
            
            if (selectedImage && selectedImage.id === imageId) {
                setSelectedImage(null);
            }
            
            setShowDeleteConfirm(null);
            showUploadAlert('Image deleted successfully!', 'success');
        } catch (err) {
            console.error('Error deleting image:', err);
            setError('Failed to delete image. Please try again.');
            showUploadAlert('Failed to delete image. Please try again.', 'error');
        } finally {
            setDeleteLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return 'Unknown';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Upload Alert Component
    const UploadAlert = () => {
        if (!uploadAlert) return null;

        const alertStyles = {
            success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
            error: 'bg-red-50 border-red-200 text-red-800'
        };

        const iconStyles = {
            success: 'text-emerald-500',
            error: 'text-red-500'
        };

        const Icon = uploadAlert.type === 'success' ? CheckCircle : AlertTriangle;

        return (
            <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg max-w-sm ${alertStyles[uploadAlert.type]} animate-slide-in`}>
                <div className="flex items-center gap-3">
                    <Icon size={20} className={iconStyles[uploadAlert.type]} />
                    <p className="font-medium">{uploadAlert.message}</p>
                    <button
                        onClick={() => setUploadAlert(null)}
                        className="ml-auto hover:opacity-70"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>
        );
    };

    // Detail View
    if (selectedImage) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">
                <UploadAlert />
                
                <div className="max-w-5xl mx-auto">
                    {/* Delete Confirmation Modal */}
                    {showDeleteConfirm && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Trash2 size={32} className="text-red-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Image?</h3>
                                    <p className="text-gray-600 mb-6">
                                        Are you sure you want to delete "<span className="font-medium">{showDeleteConfirm.originalName}</span>"?
                                    </p>
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            onClick={() => setShowDeleteConfirm(null)}
                                            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
                                            disabled={deleteLoading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleDeleteImage(showDeleteConfirm.id)}
                                            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center gap-2 font-medium transition-colors"
                                            disabled={deleteLoading}
                                        >
                                            {deleteLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <Trash2 size={16} />
                                                    Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <button
                            onClick={handleBackToGallery}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition-colors"
                        >
                            <ArrowLeft size={18} className="text-blue-600" />
                            <span className="font-medium">Back to Gallery</span>
                        </button>

                        <button
                            onClick={() => setShowDeleteConfirm(selectedImage)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition-colors"
                        >
                            <Trash2 size={18} />
                            <span className="font-medium">Delete</span>
                        </button>
                    </div>

                    {detailLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                            <p className="text-gray-600">Loading image details...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                            <div className="text-red-600 mb-4">
                                <X size={48} className="mx-auto mb-2" />
                                <h3 className="text-lg font-semibold">Error Loading Image</h3>
                                <p className="text-sm mt-2">{error}</p>
                            </div>
                            <button
                                onClick={() => fetchImageDetails(selectedImage.id)}
                                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="p-4 sm:p-6">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
                                    {selectedImage?.originalName || 'Untitled Image'}
                                </h1>
                                
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={selectedImage?.imageURL}
                                        alt={selectedImage?.originalName || 'Image'}
                                        className="max-h-96 w-auto rounded-xl object-contain shadow-md"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <FileType className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Type</p>
                                            <p className="font-semibold text-gray-900">{selectedImage?.mimeType || 'Unknown'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <HardDrive className="text-green-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Size</p>
                                            <p className="font-semibold text-gray-900">{formatFileSize(selectedImage?.size)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Calendar className="text-purple-600" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Uploaded</p>
                                            <p className="font-semibold text-gray-900">{formatDate(selectedImage?.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Gallery View
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-2 sm:p-4">
            <UploadAlert />
            
            <div className="max-w-7xl mx-auto">
                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Trash2 size={32} className="text-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Image?</h3>
                                <p className="text-gray-600 mb-6">
                                    Are you sure you want to delete "<span className="font-medium">{showDeleteConfirm.originalName}</span>"?
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => setShowDeleteConfirm(null)}
                                        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
                                        disabled={deleteLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => handleDeleteImage(showDeleteConfirm.id)}
                                        className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center gap-2 font-medium transition-colors"
                                        disabled={deleteLoading}
                                    >
                                        {deleteLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 size={16} />
                                                Delete
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Image Gallery</h1>
                    <p className="text-gray-600">Upload and manage your image collection</p>
                </div>

                {/* Upload Zone */}
                <div className="mb-8">
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-300 ${
                            dragActive 
                                ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                                : 'border-gray-300 hover:border-blue-400 bg-white hover:bg-blue-50'
                        }`}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-upload"
                        />
                        
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                            dragActive ? 'bg-blue-100' : 'bg-blue-50'
                        }`}>
                            <Upload size={32} className={dragActive ? 'text-blue-600' : 'text-blue-500'} />
                        </div>
                        
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                            Drop images here or select files
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            Only image files are allowed (JPG, PNG, GIF, WebP, SVG, BMP), upto 5 MB
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <label 
                                htmlFor="file-upload" 
                                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl cursor-pointer transition-colors shadow-sm"
                            >
                                <FolderOpen size={20} />
                                Browse Files
                            </label>
                            
                            <span className="text-gray-500 text-sm">or drag & drop</span>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mr-4"></div>
                        <span className="text-gray-600 font-medium">Processing images...</span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <X size={24} className="text-red-500" />
                        </div>
                        <p className="text-red-700 font-medium">{error}</p>
                        <button
                            onClick={fetchImages}
                            className="mt-4 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Image Grid */}
                {imageList.length === 0 && !loading ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-sm">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Image size={40} className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No images yet</h3>
                            <p className="text-gray-500">Upload your first image to get started</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                        {imageList.map((image, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden relative transform hover:-translate-y-1"
                            >
                                {/* Delete Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDeleteConfirm(image);
                                    }}
                                    className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                                >
                                    <Trash2 size={14} />
                                </button>

                                <div 
                                    onClick={() => handleImageClick(image)}
                                    className="cursor-pointer"
                                >
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={image.imageURL}
                                            alt={image.originalName}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <p className="font-medium text-gray-900 truncate text-sm" title={image.originalName}>
                                            {image.originalName}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Click to view details
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes slide-in {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default ImageGalleryApp;