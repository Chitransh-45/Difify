'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const tools = [
  {
    title: 'Text',
    description: 'Quickly detect changes in text files.',
    icon: (
      <div className="text-indigo-600 text-3xl mb-3">📝</div>
    ),
    link: '/user/compare-text'
  },
  {
    title: 'Images',
    description: 'Spot differences between images easily.',
    icon: (
      <div className="text-pink-500 text-3xl mb-3">🖼️</div>
    ),
    link: '/user/compare-images'
  },
  {
    title: 'Videos',
    description: 'Compare videos frame by frame.',
    icon: (
      <div className="text-red-500 text-3xl mb-3">🎞️</div>
    ),
    link: '/user/compare-videos'
  },
  {
    title: 'Audio',
    description: 'Visualize and compare audio files.',
    icon: (
      <div className="text-green-500 text-3xl mb-3">🎧</div>
    ),
    link: '/user/compare-audio'
  },
  {
    title: 'Folders',
    description: 'Compare the contents of two folders.',
    icon: (
      <div className="text-yellow-500 text-3xl mb-3">📁</div>
    ),
    link: '/user/compare-Folders'
  },
  {
    title: 'Excel',
    description: 'Find differences in Excel spreadsheets.',
    icon: (
      <div className="text-emerald-500 text-3xl mb-3">📊</div>
    ),
    link: '/user/compare-excel'
  }
];

const Home = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 overflow-hidden text-gray-800">
      {/* Blurred background blobs */}
      <div className="absolute -top-32 -left-32 w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] bg-blue-300 opacity-30 rounded-full blur-3xl z-0" />

      <div className="relative z-10 px-6 pt-12 pb-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-sm">
            Compare Anything Instantly
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
            DIFIFY helps you spot differences in text, images, videos, audio, Excel files, and folders — quickly and accurately.
          </p>
          <button
            onClick={() => router.push('/get-started')}
            className="mt-6 px-8 py-3 bg-indigo-600 text-white font-medium rounded-full shadow hover:scale-105 hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
        </section>

        {/* Tools Grid */}
        <section className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-indigo-100 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-indigo-700 text-center mb-10">
            What You Can Compare
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.link}
                className="group p-6 bg-white rounded-xl border border-indigo-100 hover:border-indigo-200 hover:shadow-lg transition transform hover:-translate-y-1 hover:bg-indigo-50"
              >
                <div className="flex flex-col items-center text-center">
                  {tool.icon}
                  <h3 className="text-lg font-semibold text-indigo-700 group-hover:text-indigo-800">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {tool.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-20">
          <h2 className="text-2xl font-bold text-indigo-700">
            Ready to see the difference?
          </h2>
          <p className="text-gray-600 mt-2">
            Sign up now and start comparing in seconds.
          </p>
          <Link
            href="/signup"
            className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 hover:scale-105 transition"
          >
            Sign Up Free
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-gray-500 border-t border-indigo-100 pt-6">
          © {new Date().getFullYear()} DIFIFY. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
