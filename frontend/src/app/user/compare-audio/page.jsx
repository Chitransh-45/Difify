"use client";
import SplitText from "@/components/Textsplit";
import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";

export default function AudioDiffChecker() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const wavesurfer1Ref = useRef(null);
  const wavesurfer2Ref = useRef(null);

  useEffect(() => {
    if (!wavesurfer1Ref.current) {
      wavesurfer1Ref.current = WaveSurfer.create({
        container: "#waveform1",
        waveColor: "#4CAF50",
        progressColor: "#2E7D32",
        barWidth: 3,
        barRadius: 2,
        cursorWidth: 1,
        cursorColor: "#FF0000",
        responsive: true,
        plugins: [RegionsPlugin.create()],
      });
    }

    if (!wavesurfer2Ref.current) {
      wavesurfer2Ref.current = WaveSurfer.create({
        container: "#waveform2",
        waveColor: "#2196F3",
        progressColor: "#0D47A1",
        barWidth: 3,
        barRadius: 2,
        cursorWidth: 1,
        cursorColor: "#FF0000",
        responsive: true,
        plugins: [RegionsPlugin.create()],
      });
    }
  }, []);

  const handleFileUpload = (event, setFile, wavesurfer) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      wavesurfer.load(url);
    }
  };

  const syncPlayPause = () => {
    if (wavesurfer1Ref.current.isPlaying()) {
      wavesurfer1Ref.current.pause();
      wavesurfer2Ref.current.pause();
    } else {
      wavesurfer1Ref.current.play();
      wavesurfer2Ref.current.play();
    }
  };

  const extractAudioData = async (file) => {
    return new Promise((resolve) => {
      const context = new AudioContext();
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const audioBuffer = await context.decodeAudioData(arrayBuffer);
        const rawData = audioBuffer.getChannelData(0);
        resolve(rawData);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const compareAudio = async () => {
    if (!file1 || !file2) {
      alert("Please upload both audio files.");
      return;
    }

    const audioData1 = await extractAudioData(file1);
    const audioData2 = await extractAudioData(file2);

    const sampleRate = 44100;
    const segmentSize = 0.1 * sampleRate;
    let differences = [];

    for (let i = 0; i < Math.min(audioData1.length, audioData2.length); i += segmentSize) {
      const segment1 = audioData1.slice(i, i + segmentSize);
      const segment2 = audioData2.slice(i, i + segmentSize);

      const diff = segment1.map((value, index) => Math.abs(value - (segment2[index] || 0)));
      const averageDiff = diff.reduce((acc, val) => acc + val, 0) / diff.length;

      if (averageDiff > 0.01) differences.push(i / sampleRate);
    }

    if (differences.length === 0) {
      alert("No significant differences found.");
      return;
    }

    const regionPlugin1 = wavesurfer1Ref.current.registerPlugin(RegionsPlugin.create());
    const regionPlugin2 = wavesurfer2Ref.current.registerPlugin(RegionsPlugin.create());

    differences.forEach((time) => {
      regionPlugin1.addRegion({ start: time, end: time + 0.2, color: "rgba(255, 0, 0, 0.5)" });
      regionPlugin2.addRegion({ start: time, end: time + 0.2, color: "rgba(255, 0, 0, 0.5)" });
    });

    alert("Differences highlighted in red.");
  };

  const handleReset = () => {
    setFile1(null);
    setFile2(null);
    if (wavesurfer1Ref.current) wavesurfer1Ref.current.empty();
    if (wavesurfer2Ref.current) wavesurfer2Ref.current.empty();
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-blue-100 p-6 overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-300 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-blue-200 opacity-30 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] bg-pink-200 opacity-20 rounded-full filter blur-2xl z-0 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <svg width="56" height="56" fill="none" viewBox="0 0 56 56" className="mb-3">
            <rect x="12" y="20" width="32" height="16" rx="8" fill="#6366f1" />
            <rect x="24" y="12" width="8" height="32" rx="4" fill="#a5b4fc" />
            <circle cx="28" cy="28" r="8" fill="#fff" />
          </svg>
          <SplitText className="text-3xl font-extrabold text-indigo-700 text-center tracking-tight">
            Compare Audio Files
          </SplitText>
          <p className="text-gray-600 mt-2 text-center max-w-xl">
            Upload two audio files to visually compare their waveforms and highlight differences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {[{ label: "Old", color: "red", setFile: setFile1, ref: wavesurfer1Ref, waveformId: "waveform1", bg: "bg-gray-200" },
            { label: "New", color: "green", setFile: setFile2, ref: wavesurfer2Ref, waveformId: "waveform2", bg: "bg-gray-300" }
          ].map(({ label, color, setFile, ref, waveformId, bg }, i) => (
            <div key={i} className="bg-white/90 rounded-xl shadow-xl p-5 border border-indigo-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <span className={`inline-block px-3 py-1 text-xs font-medium bg-${color}-100 text-${color}-700 rounded-full mb-2`}>
                {label} File
              </span>
              <input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileUpload(e, setFile, ref.current)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div id={waveformId} className={`w-full h-24 ${bg} mt-4 rounded animate-fade-in`}></div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <button
            className="px-5 py-2 rounded-full font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md hover:shadow-lg"
            onClick={syncPlayPause}
          >
            Play/Pause Both
          </button>
          <button
            className="ml-4 px-5 py-2 rounded-full font-medium bg-red-600 hover:bg-red-700 text-white transition shadow-md hover:shadow-lg"
            onClick={compareAudio}
          >
            Compare Audio
          </button>
          <button
            className="ml-4 px-5 py-2 rounded-full font-medium bg-gray-600 hover:bg-gray-700 text-white transition shadow-md hover:shadow-lg"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
