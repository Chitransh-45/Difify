'use client';
import React, { useState, useRef } from 'react';

const CompareVideos = () => {
  const [oldVideo, setOldVideo] = useState(null);
  const [newVideo, setNewVideo] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const oldVideoRef = useRef(null);
  const newVideoRef = useRef(null);

  const handleVideoUpload = (event, setVideo) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
      setShowComparison(false); // Reset comparison when a new video is uploaded
    }
  };

  const handleCompareClick = () => {
    if (oldVideo && newVideo) {
      setShowComparison(true);
      synchronizeVideos();
    }
  };

  const synchronizeVideos = () => {
    if (oldVideoRef.current && newVideoRef.current) {
      oldVideoRef.current.currentTime = 0;
      newVideoRef.current.currentTime = 0;
      oldVideoRef.current.play();
      newVideoRef.current.play();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Compare Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Upload Old Video</h2>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoUpload(e, setOldVideo)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Upload New Video</h2>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoUpload(e, setNewVideo)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>
      <div className="text-center mb-6">
        <button
          onClick={handleCompareClick}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!oldVideo || !newVideo}
        >
          Compare Videos
        </button>
      </div>
      {showComparison && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Old Video</h2>
            <video
              ref={oldVideoRef}
              src={oldVideo}
              controls
              className="w-full border rounded-md"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">New Video</h2>
            <video
              ref={newVideoRef}
              src={newVideo}
              controls
              className="w-full border rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareVideos;