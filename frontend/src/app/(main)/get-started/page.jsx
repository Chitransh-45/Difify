import React from 'react';
import Link from 'next/link';
import {
  FaFileAlt,
  FaImage,
  FaVideo,
  FaWaveSquare,
  FaFolder,
  FaFileExcel,
} from 'react-icons/fa';

const tools = [
  {
    title: 'Text',
    description: 'Quickly detect changes in text files.',
    icon: <FaFileAlt />,
    color: 'text-indigo-500',
    glow: 'shadow-indigo-200',
    link: '/user/compare-text',
  },
  {
    title: 'Images',
    description: 'Spot differences between images easily.',
    icon: <FaImage />,
    color: 'text-pink-500',
    glow: 'shadow-pink-200',
    link: '/user/compare-images',
  },
  {
    title: 'Videos',
    description: 'Compare videos frame by frame.',
    icon: <FaVideo />,
    color: 'text-red-500',
    glow: 'shadow-red-200',
    link: '/user/compare-videos',
  },
  {
    title: 'Audio',
    description: 'Visualize and compare audio files.',
    icon: <FaWaveSquare />,
    color: 'text-green-500',
    glow: 'shadow-green-200',
    link: '/user/compare-audio',
  },
  {
    title: 'Folders',
    description: 'Compare the contents of two folders.',
    icon: <FaFolder />,
    color: 'text-yellow-500',
    glow: 'shadow-yellow-200',
    link: '/user/compare-Folders',
  },
  {
    title: 'Excel',
    description: 'Find differences in Excel spreadsheets.',
    icon: <FaFileExcel />,
    color: 'text-emerald-500',
    glow: 'shadow-emerald-200',
    link: '/user/compare-excel',
  },
];

const CompareOptions = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-white to-blue-100 min-h-screen flex justify-center items-center px-4 py-20">
      <div className="max-w-7xl w-full text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-12 tracking-tight">
           You Can Compare
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {tools.map((tool, index) => (
            <Link
              key={index}
              href={tool.link}
              className={`block backdrop-blur-md bg-white/70 border border-white shadow-lg hover:shadow-xl ${tool.glow} p-8 rounded-3xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300`}
            >
              <div className={`text-4xl mb-5 ${tool.color}`}>{tool.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{tool.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareOptions;