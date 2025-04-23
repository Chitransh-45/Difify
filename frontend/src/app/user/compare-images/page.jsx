'use client';
import React, { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const CompareImages = () => {
    const [oldImage, setOldImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [showComparison, setShowComparison] = useState(false);

    const handleOldImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setOldImage(URL.createObjectURL(file));
            setShowComparison(false); // Reset comparison when a new image is uploaded
        }
    };

    const handleNewImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewImage(URL.createObjectURL(file));
            setShowComparison(false); // Reset comparison when a new image is uploaded
        }
    };

    const handleCompareClick = () => {
        if (oldImage && newImage) {
            setShowComparison(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Compare Images</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Upload Old Image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleOldImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Upload New Image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewImageUpload}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
            </div>
            <div className="text-center mb-6">
                <button
                    onClick={handleCompareClick}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!oldImage || !newImage}
                >
                    Compare Images
                </button>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Image Differences</h2>
                {showComparison ? (
                    <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={oldImage} alt="Old Image" />}
                        itemTwo={<ReactCompareSliderImage src={newImage} alt="New Image" />}
                    />
                ) : (
                    <p className="text-gray-500">Please upload both images and click "Compare Images" to view the differences.</p>
                )}
            </div>
        </div>
    );
};

export default CompareImages;