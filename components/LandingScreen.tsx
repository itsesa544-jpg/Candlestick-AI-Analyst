import React from 'react';
import { UploadIcon } from './IconComponents';

interface LandingScreenProps {
  onStartStatic: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStartStatic }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold">
          AI<span className="text-cyan-400"> Trading</span> Analyst
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Leverage the power of Gemini to get real-time technical analysis of any trading chart.
          Upload a screenshot of a chart, and our AI will provide insights on market direction, confidence levels, and key patterns.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onStartStatic}
          className="group flex flex-col items-center justify-center w-64 h-48 p-6 bg-gray-800 rounded-xl border-2 border-transparent hover:border-cyan-500 hover:bg-gray-700 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-20 h-20 bg-gray-700 group-hover:bg-cyan-600 rounded-full transition-colors duration-300">
            <UploadIcon className="w-10 h-10 text-cyan-300 group-hover:text-white" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">Analyze Chart Image</h2>
          <p className="mt-1 text-sm text-gray-400">Upload a screenshot</p>
        </button>
      </div>
       <div className="absolute bottom-4 text-center text-xs text-gray-500">
          <p>
            <strong>Disclaimer:</strong> This is an AI-generated analysis and not financial advice. Trading involves substantial risk. Always do your own research.
          </p>
      </div>
    </div>
  );
};

export default LandingScreen;