import React from "react";
import { Image, Upload, Eye, Trash2, FolderOpen, Camera, Sparkles, ArrowRight } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Drag & drop or browse to upload multiple images at once",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: Eye,
      title: "View Gallery",
      description: "Browse your images in a beautiful responsive grid layout",
      color: "bg-orange-50 text-orange-600"
    },
    {
      icon: Image,
      title: "Image Details",
      description: "View detailed information about each image including size and type",
      color: "bg-pink-50 text-pink-600"
    },
    {
      icon: Trash2,
      title: "Easy Management",
      description: "Delete unwanted images with confirmation dialogs",
      color: "bg-violet-50 text-violet-600"
    }
  ];

  const supportedFormats = [
    { name: "JPEG", ext: ".jpg, .jpeg" },
    { name: "PNG", ext: ".png" },
    { name: "GIF", ext: ".gif" },
    { name: "WebP", ext: ".webp" },
    { name: "SVG", ext: ".svg" },
    { name: "BMP", ext: ".bmp" }
  ];

  // Navigation functions
  const navigateToUpload = () => {
    window.location.href = '/upload';
  };

  const navigateToGallery = () => {
    window.location.href = '/gallery';
  };

  const navigateToAbout = () => {
    window.location.href = '/about';
  };

  const navigateToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center">
            {/* Main Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/25">
                  <Camera size={48} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles size={16} className="text-orange-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Image Gallery
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload, organize, and manage your image collection with our modern, 
              responsive gallery application. Built for all devices with a stunning interface.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button 
                onClick={navigateToUpload}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <Upload size={20} />
                Start Uploading
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={navigateToGallery}
                className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200 hover:border-orange-300 cursor-pointer"
              >
                <Eye size={20} className="text-orange-600" />
                View Gallery
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">6+</div>
                <div className="text-gray-600">Supported Formats</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
                <div className="text-gray-600">Upload Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
                <div className="text-gray-600">Responsive Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your image collection efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Formats Section */}
      <div className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Supported Image Formats
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Upload any of these popular image formats
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {supportedFormats.map((format, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center border border-orange-100 hover:border-orange-300 group hover:bg-gradient-to-br hover:from-orange-50 hover:to-amber-50"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:from-orange-200 group-hover:to-amber-200 transition-colors">
                  <Image size={24} className="text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{format.name}</h3>
                <p className="text-sm text-gray-500">{format.ext}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Images",
                description: "Drag and drop your images or click to browse and select multiple files",
                icon: FolderOpen,
                color: "from-emerald-500 to-teal-500"
              },
              {
                step: "2",
                title: "View Gallery",
                description: "Browse your uploaded images in a beautiful responsive grid layout",
                icon: Eye,
                color: "from-orange-500 to-amber-500"
              },
              {
                step: "3",
                title: "Manage Collection",
                description: "Click on any image to view details or delete unwanted images easily",
                icon: Image,
                color: "from-pink-500 to-violet-500"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={32} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-8 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                    <span className="text-sm font-bold text-gray-700">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-cyan-600/90"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-300 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-300 rounded-full blur-xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start building your image collection today with our powerful and intuitive gallery app
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={navigateToUpload}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-emerald-600 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <Upload size={20} />
              Upload Your First Image
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-teal-900/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                <Camera size={16} className="text-white" />
              </div>
              <span className="font-semibold text-lg">Image Gallery App</span>
            </div>
            <p className="text-gray-400 mb-6">
              Built with React & Modern Design Principles
            </p>
            
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button 
                onClick={() => window.location.href = '/'}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={navigateToUpload}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Upload
              </button>
              <button 
                onClick={navigateToGallery}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Gallery
              </button>
              <button 
                onClick={navigateToAbout}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                About
              </button>
              <button 
                onClick={navigateToContact}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Image Gallery App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;