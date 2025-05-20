'use client';
import React, { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const CompareImages = () => {
  const [oldImage, setOldImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [viewMode, setViewMode] = useState('split');

  const handleOldImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOldImage(URL.createObjectURL(file));
      setShowComparison(false);
    }
  };

  const handleNewImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
      setShowComparison(false);
    }
  };

  const handleCompareClick = () => {
    if (oldImage && newImage) {
      setShowComparison(true);
    }
  };

  const handleReset = () => {
    setOldImage(null);
    setNewImage(null);
    setShowComparison(false);
    setViewMode('split');
  };

  const handleExportAsPng = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img1 = new Image();
    const img2 = new Image();

    img1.src = oldImage;
    img2.src = newImage;

    img1.onload = () => {
      canvas.width = img1.width;
      canvas.height = img1.height;
      context.drawImage(img1, 0, 0);

      img2.onload = () => {
        context.globalAlpha = 0.5;
        context.drawImage(img2, 0, 0);
        const link = document.createElement('a');
        link.download = 'comparison.png';
        link.href = canvas.toDataURL();
        link.click();
      };
    };
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 p-6 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-200 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-pink-200 opacity-20 rounded-full filter blur-2xl z-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          {/* Image/File Icon */}
          <svg width="56" height="56" fill="none" viewBox="0 0 56 56" className="mb-3">
            <rect x="8" y="12" width="40" height="32" rx="6" fill="#6366f1"/>
            <rect x="16" y="20" width="24" height="4" rx="2" fill="#fff"/>
            <rect x="16" y="28" width="16" height="4" rx="2" fill="#fff"/>
            <rect x="16" y="36" width="20" height="4" rx="2" fill="#fff"/>
          </svg>
          <h1 className="text-3xl font-extrabold text-indigo-700 text-center tracking-tight">Compare Images</h1>
          <p className="text-gray-600 mt-2 text-center max-w-xl">
            Upload two images to visually compare them side by side.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/80 rounded-xl shadow-lg p-4 border border-indigo-100">
            <div className="flex items-center mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20" className="mr-2">
                <rect x="2" y="4" width="16" height="12" rx="2" fill="#f87171"/>
                <rect x="5" y="7" width="10" height="2" rx="1" fill="#fff"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Old Image</h2>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleOldImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {oldImage && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Preview:</h3>
                <img
                  src={oldImage}
                  alt="Old Image Preview"
                  className="w-full h-auto border rounded-md"
                />
              </div>
            )}
          </div>
          <div className="bg-white/80 rounded-xl shadow-lg p-4 border border-indigo-100">
            <div className="flex items-center mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20" className="mr-2">
                <rect x="2" y="4" width="16" height="12" rx="2" fill="#34d399"/>
                <rect x="5" y="11" width="10" height="2" rx="1" fill="#fff"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">New Image</h2>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleNewImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {newImage && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Preview:</h3>
                <img
                  src={newImage}
                  alt="New Image Preview"
                  className="w-full h-auto border rounded-md"
                />
              </div>
            )}
          </div>
        </div>
        <div className="text-center mb-8">
          <button
            onClick={handleCompareClick}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            disabled={!oldImage || !newImage}
          >
            Compare Images
          </button>
          <button
            onClick={handleReset}
            className="ml-4 px-6 py-2 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700 transition"
          >
            Reset
          </button>
          <button
            onClick={handleExportAsPng}
            className="ml-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 transition"
            disabled={!oldImage || !newImage}
          >
            Export as PNG
          </button>
        </div>
        {showComparison && (
          <div className="bg-white/90 p-6 rounded-xl shadow-xl border border-indigo-100">
            <div className="mb-4 flex items-center">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                <circle cx="12" cy="12" r="10" fill="#60a5fa"/>
                <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <label className="block text-lg font-semibold mb-0">View Mode:</label>
              <select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="ml-4 p-2 border rounded-md"
              >
                <option value="split">Split</option>
                <option value="highlights">Highlights</option>
                <option value="sliders">Sliders</option>
                <option value="difference">Difference</option>
                <option value="fade">Fade</option>
                <option value="details">Find Details</option>
              </select>
            </div>
            {viewMode === 'split' && (
              <ReactCompareSlider
                itemOne={<ReactCompareSliderImage src={oldImage} alt="Old Image" />}
                itemTwo={<ReactCompareSliderImage src={newImage} alt="New Image" />}
              />
            )}
            {viewMode === 'fade' && (
              <div className="relative h-96">
                <img src={oldImage} alt="Old Image" className="absolute top-0 left-0 w-full h-full opacity-50 object-contain" />
                <img src={newImage} alt="New Image" className="absolute top-0 left-0 w-full h-full opacity-50 object-contain" />
              </div>
            )}
            {viewMode === 'difference' && (
              <p className="text-gray-500">Difference view is under development.</p>
            )}
            {viewMode === 'highlights' && (
              <p className="text-gray-500">Highlights view is under development.</p>
            )}
            {viewMode === 'details' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Image Details</h2>
                <p><strong>Old Image:</strong> {oldImage}</p>
                <p><strong>New Image:</strong> {newImage}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareImages;