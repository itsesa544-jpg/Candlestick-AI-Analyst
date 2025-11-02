import React, { useRef, useState, ChangeEvent } from 'react';
import { ChartTimeframe, TradingPlatform } from '../types';
import { BackIcon, UploadIcon } from './IconComponents';

interface CameraViewProps {
  onAnalyze: (
    file: File,
    platform: TradingPlatform,
    timeframe: ChartTimeframe
  ) => void;
  onBack: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onAnalyze, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [platform, setPlatform] = useState<TradingPlatform>('General');
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('5m');
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }
      setError(null);
      onAnalyze(file, platform, timeframe);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4 sm:p-6 relative">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white bg-opacity-75 rounded-full text-gray-700 hover:bg-gray-200 transition z-10 shadow-md"
          aria-label="Go back"
        >
          <BackIcon className="w-6 h-6" />
        </button>
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold">
            AI<span className="text-cyan-600"> Trading</span> Analyst
            </h1>
            <p className="mt-4 text-md text-gray-600">
            Get instant technical analysis. Select the platform and timeframe, then upload a screenshot of a chart.
            </p>
        </div>

        <div className="mt-8 p-6 bg-white/75 rounded-xl border border-gray-200 w-full max-w-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-cyan-700">1. Chart Settings</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
                    <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value as TradingPlatform)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                        <option>General</option>
                        <option>Binance</option>
                        <option>Quotex</option>
                        <option>Exness</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">Timeframe</label>
                    <select id="timeframe" value={timeframe} onChange={(e) => setTimeframe(e.target.value as ChartTimeframe)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                        <option>1m</option>
                        <option>5m</option>
                        <option>15m</option>
                        <option>1h</option>
                        <option>4h</option>
                        <option>1d</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="mt-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4 text-center text-cyan-700">2. Upload Chart Image</h2>
            <div className="flex flex-col items-center justify-center h-full p-6 bg-white/75 rounded-xl border border-gray-200 shadow-lg">
                <p className="text-center text-gray-500 mb-4">Select an image file from your device.</p>
                <button
                    onClick={triggerFileUpload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition"
                    aria-label="Upload image"
                >
                    <UploadIcon className="w-6 h-6"/>
                    <span>Upload Image</span>
                </button>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-600 max-w-3xl">
          <p>
            <strong>Disclaimer:</strong> This is an AI-generated analysis and not financial advice. Trading involves substantial risk. Always do your own research.
          </p>
        </div>
    </div>
  );
};

export default CameraView;