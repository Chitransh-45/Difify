'use client';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const CompareExcel = () => {
  const [oldExcelData, setOldExcelData] = useState(null);
  const [newExcelData, setNewExcelData] = useState(null);
  const [differences, setDifferences] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [viewOption, setViewOption] = useState('table'); // Options: 'table', 'text', 'details'

  const handleFileUpload = (event, setExcelData) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setExcelData({ data: sheetData, fileName: file.name, fileSize: file.size });
        setShowComparison(false); // Reset comparison when a new file is uploaded
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleCompareClick = () => {
    if (oldExcelData && newExcelData) {
      const diffs = findDifferences(oldExcelData.data, newExcelData.data);
      setDifferences(diffs);
      setShowComparison(true);
    }
  };

  const findDifferences = (oldData, newData) => {
    const differences = [];
    const maxLength = Math.max(oldData.length, newData.length);

    for (let i = 0; i < maxLength; i++) {
      const oldRow = oldData[i] || {};
      const newRow = newData[i] || {};
      const rowDifferences = {};

      Object.keys({ ...oldRow, ...newRow }).forEach((key) => {
        if (oldRow[key] !== newRow[key]) {
          rowDifferences[key] = { old: oldRow[key] || '', new: newRow[key] || '' };
        }
      });

      if (Object.keys(rowDifferences).length > 0) {
        differences.push({ row: i + 1, differences: rowDifferences });
      }
    }

    return differences;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 p-6 overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-200 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-pink-200 opacity-20 rounded-full filter blur-2xl z-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          {/* Excel Icon Header */}
          <svg width="56" height="56" fill="none" viewBox="0 0 56 56" className="mb-3">
            <rect x="8" y="12" width="40" height="32" rx="6" fill="#22c55e"/>
            <rect x="16" y="20" width="24" height="4" rx="2" fill="#fff"/>
            <rect x="16" y="28" width="16" height="4" rx="2" fill="#fff"/>
            <rect x="16" y="36" width="20" height="4" rx="2" fill="#fff"/>
          </svg>
          <h1 className="text-3xl font-extrabold text-green-700 text-center tracking-tight">Compare Excel Files</h1>
          <p className="text-gray-600 mt-2 text-center max-w-xl">
            Upload two Excel files to compare their contents and see the differences.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/80 rounded-xl shadow-lg p-4 border border-green-100">
            <div className="flex items-center mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20" className="mr-2">
                <rect x="2" y="4" width="16" height="12" rx="2" fill="#f87171"/>
                <rect x="5" y="7" width="10" height="2" rx="1" fill="#fff"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Upload Old Excel File</h2>
            </div>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileUpload(e, setOldExcelData)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
          <div className="bg-white/80 rounded-xl shadow-lg p-4 border border-green-100">
            <div className="flex items-center mb-2">
              <svg width="22" height="22" fill="none" viewBox="0 0 20 20" className="mr-2">
                <rect x="2" y="4" width="16" height="12" rx="2" fill="#34d399"/>
                <rect x="5" y="11" width="10" height="2" rx="1" fill="#fff"/>
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Upload New Excel File</h2>
            </div>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileUpload(e, setNewExcelData)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>
        </div>
        <div className="text-center mb-8">
          <button
            onClick={handleCompareClick}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            disabled={!oldExcelData || !newExcelData}
          >
            Compare Excel Files
          </button>
        </div>
        {showComparison && (
          <div className="bg-white/90 p-6 rounded-xl shadow-xl border border-green-100">
            <div className="mb-4 flex items-center">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="mr-2">
                <circle cx="12" cy="12" r="10" fill="#22c55e"/>
                <path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <label className="block text-lg font-semibold mb-0">View Options:</label>
              <select
                value={viewOption}
                onChange={(e) => setViewOption(e.target.value)}
                className="ml-4 p-2 border rounded-md"
              >
                <option value="table">Table</option>
                <option value="text">Text</option>
                <option value="details">File Details</option>
              </select>
            </div>
            {viewOption === 'table' && (
              <>
                <h2 className="text-lg font-semibold mb-4">Differences (Table View)</h2>
                {differences.length > 0 ? (
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Row</th>
                        <th className="border border-gray-300 px-4 py-2">Column</th>
                        <th className="border border-gray-300 px-4 py-2">Old Value</th>
                        <th className="border border-gray-300 px-4 py-2">New Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {differences.map((diff, index) =>
                        Object.keys(diff.differences).map((key) => (
                          <tr key={`${index}-${key}`}>
                            <td className="border border-gray-300 px-4 py-2">{diff.row}</td>
                            <td className="border border-gray-300 px-4 py-2">{key}</td>
                            <td
                              className={`border border-gray-300 px-4 py-2 ${
                                diff.differences[key].old === '' ? 'bg-red-100' : 'bg-yellow-100'
                              }`}
                            >
                              {diff.differences[key].old || 'N/A'}
                            </td>
                            <td
                              className={`border border-gray-300 px-4 py-2 ${
                                diff.differences[key].new === '' ? 'bg-red-100' : 'bg-green-100'
                              }`}
                            >
                              {diff.differences[key].new || 'N/A'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500">No differences found.</p>
                )}
              </>
            )}
            {viewOption === 'text' && (
              <>
                <h2 className="text-lg font-semibold mb-4">Differences (Text View)</h2>
                {differences.length > 0 ? (
                  <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                    {JSON.stringify(differences, null, 2)}
                  </pre>
                ) : (
                  <p className="text-gray-500">No differences found.</p>
                )}
              </>
            )}
            {viewOption === 'details' && (
              <>
                <h2 className="text-lg font-semibold mb-4">File Details</h2>
                <div className="mb-4">
                  <h3 className="font-semibold">Old File:</h3>
                  <p>Name: {oldExcelData?.fileName}</p>
                  <p>Size: {(oldExcelData?.fileSize / 1024).toFixed(2)} KB</p>
                </div>
                <div>
                  <h3 className="font-semibold">New File:</h3>
                  <p>Name: {newExcelData?.fileName}</p>
                  <p>Size: {(newExcelData?.fileSize / 1024).toFixed(2)} KB</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareExcel;