'use client';
import React, { useState } from 'react';
import JSZip from 'jszip';

const CompareFolders = () => {
  const [oldFolderContents, setOldFolderContents] = useState([]);
  const [newFolderContents, setNewFolderContents] = useState([]);
  const [differences, setDifferences] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleFolderUpload = async (event, setFolderContents) => {
    const file = event.target.files[0];
    if (file) {
      const zip = new JSZip();
      const contents = [];
      const data = await zip.loadAsync(file);
      for (const fileName in data.files) {
        const file = data.files[fileName];
        contents.push({
          name: fileName,
          size: file._data.uncompressedSize,
          isDirectory: file.dir,
        });
      }
      setFolderContents(contents);
      setShowComparison(false);
    }
  };

  const handleCompareClick = () => {
    if (oldFolderContents.length && newFolderContents.length) {
      const oldFiles = oldFolderContents.reduce((acc, file) => {
        acc[file.name] = file;
        return acc;
      }, {});
      const newFiles = newFolderContents.reduce((acc, file) => {
        acc[file.name] = file;
        return acc;
      }, {});

      const allFileNames = new Set([...Object.keys(oldFiles), ...Object.keys(newFiles)]);

      const diffs = Array.from(allFileNames).map((fileName) => {
        const oldFile = oldFiles[fileName];
        const newFile = newFiles[fileName];
        if (!oldFile) {
          return { name: fileName, status: 'Added', size: newFile.size };
        }
        if (!newFile) {
          return { name: fileName, status: 'Removed', size: oldFile.size };
        }
        if (oldFile.size !== newFile.size) {
          return { name: fileName, status: 'Modified', size: newFile.size };
        }
        return { name: fileName, status: 'Unchanged', size: oldFile.size };
      });

      setDifferences(diffs);
      setShowComparison(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 py-16 px-6 flex justify-center">
      <div className="max-w-6xl w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
        {/* Header */}
        <div className="text-center mb-14">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            aria-hidden="true"
            className="mx-auto mb-4 text-indigo-600 stroke-current"
            strokeWidth="1"
          >
            <rect x="8" y="16" width="40" height="28" rx="6" fill="#6366f1" />
            <rect x="12" y="20" width="32" height="8" rx="2" fill="#a5b4fc" />
            <rect x="12" y="32" width="24" height="4" rx="2" fill="#fff" />
            <rect x="12" y="38" width="16" height="4" rx="2" fill="#fff" />
          </svg>
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
            Compare Folders
          </h1>
          <p className="max-w-xl mx-auto mt-3 text-gray-600 text-lg leading-relaxed">
            Upload two zipped folders to compare their contents and view differences.
          </p>
        </div>

        {/* Upload Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {[
            { label: 'Old Folder', color: 'red-500', setter: setOldFolderContents },
            { label: 'New Folder', color: 'green-500', setter: setNewFolderContents },
          ].map(({ label, color, setter }) => (
            <div
              key={label}
              className={`bg-white rounded-3xl border border-gray-200 shadow-lg p-8 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:scale-[1.03]`}
            >
              <div className={`text-5xl mb-5 text-${color}`}>
                <svg
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="2" y="6" width="20" height="12" rx="3" fill={color === 'red-500' ? '#ef4444' : '#34d399'} />
                  <rect x="6" y={color === 'red-500' ? 9 : 13} width="12" height="3" rx="1.5" fill="#fff" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">{`Upload ${label} (.zip)`}</h2>
              <input
                type="file"
                accept=".zip"
                onChange={(e) => handleFolderUpload(e, setter)}
                className="w-full text-gray-700 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer transition focus:outline-none focus:ring-4 focus:ring-indigo-400"
              />
              {setter === setOldFolderContents && oldFolderContents.length > 0 && (
                <p className="mt-4 text-green-600 font-medium select-none">✔ Old folder loaded</p>
              )}
              {setter === setNewFolderContents && newFolderContents.length > 0 && (
                <p className="mt-4 text-green-600 font-medium select-none">✔ New folder loaded</p>
              )}
            </div>
          ))}
        </div>

        {/* Compare Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleCompareClick}
            disabled={!oldFolderContents.length || !newFolderContents.length}
            className="px-12 py-4 rounded-full bg-indigo-600 text-white text-lg font-semibold shadow-lg transition hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            Compare Folders
          </button>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
            <div className="flex items-center mb-8">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-4 text-indigo-600"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" fill="#3b82f6" />
                <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h2 className="text-3xl font-bold text-indigo-700">Folder Differences</h2>
            </div>

            {differences.length > 0 ? (
              <table className="w-full border-collapse table-auto rounded-xl overflow-hidden text-left">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="border border-gray-300 px-6 py-4 text-indigo-700 font-semibold tracking-wide">
                      File Name
                    </th>
                    <th className="border border-gray-300 px-6 py-4 text-indigo-700 font-semibold tracking-wide">
                      Status
                    </th>
                    <th className="border border-gray-300 px-6 py-4 text-indigo-700 font-semibold tracking-wide text-right">
                      Size (bytes)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {differences.map(({ name, status, size }, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-gray-50 hover:bg-indigo-50 transition"
                    >
                      <td className="border border-gray-300 px-6 py-4 text-gray-800 break-words">{name}</td>
                      <td
                        className={`border border-gray-300 px-6 py-4 font-semibold max-w-[130px] text-center rounded-md ${
                          status === 'Added'
                            ? 'text-green-800 bg-green-100'
                            : status === 'Removed'
                            ? 'text-red-800 bg-red-100'
                            : status === 'Modified'
                            ? 'text-yellow-900 bg-yellow-100'
                            : 'text-gray-700 bg-gray-100'
                        }`}
                      >
                        {status}
                      </td>
                      <td className="border border-gray-300 px-6 py-4 text-right text-gray-700 font-mono">{size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 text-lg">No differences found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareFolders;
