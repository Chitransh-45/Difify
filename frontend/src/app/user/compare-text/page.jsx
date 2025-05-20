'use client';
import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';
import DiffViewer from 'react-diff-viewer';

const CompareText = () => {
  const [oldCode, setOldCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [showComparison, setShowComparison] = useState(false);

  const handleCompareClick = () => {
    if (oldCode && newCode) {
      setShowComparison(true);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setOldCode('');
    setNewCode('');
    setShowComparison(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-blue-200 p-8 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-purple-400 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-[-140px] right-[-140px] w-[380px] h-[380px] bg-blue-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[220px] h-[220px] bg-pink-300 opacity-25 rounded-full filter blur-2xl z-0 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <svg
            width="56"
            height="56"
            fill="none"
            viewBox="0 0 48 48"
            className="mb-4"
            aria-hidden="true"
          >
            <rect x="6" y="10" width="36" height="28" rx="6" fill="#8b5cf6" />
            <rect x="12" y="16" width="24" height="5" rx="3" fill="#fff" />
            <rect x="12" y="26" width="16" height="5" rx="3" fill="#fff" />
          </svg>
          <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow-lg">
            Compare Text
          </h1>
          <p className="mt-2 text-lg text-purple-700 max-w-xl text-center">
            Paste or type your old and new text/code below to visually compare differences.
          </p>
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
          {/* Old Text */}
          <section className="flex flex-col">
            <div className="flex items-center mb-3 space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-red-400 text-white">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="16" height="12" rx="3" fill="currentColor" />
                  <rect x="5" y="7" width="10" height="3" rx="2" fill="#fff" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-purple-900">Old Text</h2>
            </div>
            <Editor
              height="240px"
              defaultLanguage="javascript"
              value={oldCode}
              theme="vs-dark"
              onChange={(value) => setOldCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
              }}
              className="rounded-lg border border-purple-300 shadow-md"
            />
          </section>

          {/* New Text */}
          <section className="flex flex-col">
            <div className="flex items-center mb-3 space-x-3">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-green-400 text-white">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="16" height="12" rx="3" fill="currentColor" />
                  <rect x="5" y="11" width="10" height="3" rx="2" fill="#fff" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-purple-900">New Text</h2>
            </div>
            <Editor
              height="240px"
              defaultLanguage="javascript"
              value={newCode}
              theme="vs-dark"
              onChange={(value) => setNewCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                wordWrap: 'on',
              }}
              className="rounded-lg border border-purple-300 shadow-md"
            />
          </section>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mb-10">
          <button
            onClick={handleCompareClick}
            disabled={!oldCode || !newCode}
            className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            Compare
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Reset
          </button>
        </div>

        {/* Comparison Result */}
        {showComparison && (
          <section className="bg-white rounded-xl shadow-xl p-6 max-w-full overflow-auto border border-purple-300">
            <div className="flex items-center mb-4 space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-400 text-white shadow">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" fill="currentColor" />
                  <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-700">Comparison Result</h2>
            </div>
            <DiffViewer
              oldValue={oldCode}
              newValue={newCode}
              splitView={true}
              hideLineNumbers={false}
              styles={{
                diffContainer: {
                  fontFamily: "'Fira Mono', monospace",
                  fontSize: 14,
                },
                codeFoldGutter: {
                  backgroundColor: '#ede9fe',
                },
              }}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default CompareText;
  