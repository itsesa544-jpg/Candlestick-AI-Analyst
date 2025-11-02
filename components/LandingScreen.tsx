import React from 'react';
import { UploadIcon, CameraIcon } from './IconComponents';

interface LandingScreenProps {
  onStartStatic: () => void;
  onStartLive: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStartStatic, onStartLive }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold">
          AI<span className="text-cyan-600"> Trading</span> Analyst
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Leverage the power of Gemini to get real-time technical analysis of any trading chart.
          Upload a screenshot or use your camera for a live feed analysis.
        </p>
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center">
        <button
          onClick={onStartStatic}
          className="group flex flex-col items-center justify-center w-64 h-48 lg:w-72 lg:h-56 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-cyan-500 hover:bg-gray-50 transition-all duration-300 shadow-lg"
        >
          <div className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 group-hover:bg-cyan-500 rounded-full transition-colors duration-300">
            <UploadIcon className="w-10 h-10 lg:w-12 lg:h-12 text-cyan-600 group-hover:text-white" />
          </div>
          <h2 className="mt-4 text-xl lg:text-2xl font-semibold">Analyze Chart Image</h2>
          <p className="mt-1 text-sm text-gray-500">Upload a screenshot</p>
        </button>

        <button
          onClick={onStartLive}
          className="group flex flex-col items-center justify-center w-64 h-48 lg:w-72 lg:h-56 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-teal-500 hover:bg-gray-50 transition-all duration-300 shadow-lg"
        >
          <div className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 group-hover:bg-teal-500 rounded-full transition-colors duration-300">
            <CameraIcon className="w-10 h-10 lg:w-12 lg:h-12 text-teal-600 group-hover:text-white" />
          </div>
          <h2 className="mt-4 text-xl lg:text-2xl font-semibold">Live Camera Analysis</h2>
          <p className="mt-1 text-sm text-gray-500">Feature coming soon</p>
        </button>
      </div>
       <div className="absolute bottom-4 text-center text-xs text-gray-600">
          <p>
            <strong>Disclaimer:</strong> This is an AI-generated analysis and not financial advice. Trading involves substantial risk. Always do your own research.
          </p>
      </div>
    </div>
  );
};

export default LandingScreen;