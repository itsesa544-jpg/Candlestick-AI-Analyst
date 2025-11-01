import React from 'react';
import { BackIcon } from './IconComponents';

interface LiveAnalysisViewProps {
  onBack: () => void;
}

export const LiveAnalysisView: React.FC<LiveAnalysisViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition"
        aria-label="Go back"
      >
        <BackIcon className="w-6 h-6" />
      </button>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cyan-400">Live Analysis</h1>
        <p className="mt-4 text-lg text-gray-300">
          This feature is coming soon!
        </p>
        <p className="text-gray-400">
          It will provide real-time chart analysis directly from your camera feed.
        </p>
        <button
          onClick={onBack}
          className="mt-8 px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LiveAnalysisView;
