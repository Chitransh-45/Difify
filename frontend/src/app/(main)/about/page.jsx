import React from 'react';

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 p-6 overflow-hidden font-sans">
      {/* Decorative blurred shapes (same as home page) */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-200 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-pink-200 opacity-20 rounded-full filter blur-2xl z-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 max-w-2xl w-full mx-auto bg-white/80 rounded-xl shadow-lg p-8 border border-indigo-100">
        <div className="flex flex-col items-center mb-6">
          <svg width="56" height="56" fill="none" viewBox="0 0 56 56" className="mb-3">
            <rect x="12" y="20" width="32" height="16" rx="8" fill="#6366f1"/>
            <rect x="24" y="12" width="8" height="32" rx="4" fill="#a5b4fc"/>
            <circle cx="28" cy="28" r="8" fill="#fff"/>
          </svg>
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center">About DIFIFY</h1>
        </div>
        <p className="text-gray-700 mb-4 text-center">
          <span className="font-semibold">DIFIFY</span> is your all-in-one platform for comparing files and content with speed and accuracy. Our mission is to make file comparison effortless for everyone.
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li><span className="font-semibold">Text:</span> Instantly spot differences in text files.</li>
          <li><span className="font-semibold">Images:</span> Visually compare images side by side.</li>
          <li><span className="font-semibold">Videos:</span> Compare videos frame by frame.</li>
          <li><span className="font-semibold">Audio:</span> Visualize and compare audio waveforms.</li>
          <li><span className="font-semibold">Folders:</span> Check for changes in folder contents.</li>
          <li><span className="font-semibold">Excel:</span> Find differences in spreadsheets.</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Whether you're a developer, designer, student, or anyone who needs to compare files, DIFIFY makes it easy and efficient with a modern, user-friendly interface.
        </p>
        <p className="text-gray-700 text-center font-semibold">
          Get started today and experience the easiest way to compare your files!
        </p>
      </div>
    </div>
  );
};

export default About;