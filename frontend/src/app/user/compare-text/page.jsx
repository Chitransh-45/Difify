'use client';
import { Editor } from '@monaco-editor/react';
import React, { useState } from 'react';
import DiffViewer from 'react-diff-viewer';

const CompareText = () => {
  const [oldCode, setOldCode] = useState('');
  const [newCode, setNewCode] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Compare Code</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Old Code</h2>
          <Editor
            height="200px"
            defaultLanguage="javascript"
            value={oldCode}
            theme={'vs-dark'}
            onChange={(value) => setOldCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
            className="border rounded-md"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">New Code</h2>
          <Editor
            height="200px"
            defaultLanguage="javascript"
            value={newCode}
            onChange={(value) => setNewCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
            className="border rounded-md"
          />
        </div>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Code Differences</h2>
        <DiffViewer oldValue={oldCode} newValue={newCode} splitView={true} />
      </div>
    </div>
  );
};

export default CompareText;