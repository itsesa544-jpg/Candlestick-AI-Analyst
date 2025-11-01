import React, { useRef, useState, useCallback, ChangeEvent } from 'react';
import Webcam from 'react-webcam';
import { ChartTimeframe, TradingPlatform } from '../types';
import { CameraIcon, UploadIcon } from './IconComponents';

interface CameraViewProps {
  onAnalyze: (
    file: File,
    platform: TradingPlatform,
    timeframe: ChartTimeframe
  ) => void;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user', // Default to front camera, more common for desktop
};

export const CameraView: React.FC<CameraViewProps> = ({ onAnalyze }) => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [platform, setPlatform] = useState<TradingPlatform>('General');
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('5m');
  const [error, setError] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const blob = await fetch(imageSrc).then((res) => res.blob());
      const file = new File([blob], 'capture.jpeg', { type: 'image/jpeg' });
      onAnalyze(file, platform, timeframe);
    }
  }, [webcamRef, onAnalyze, platform, timeframe]);

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

  const handleCameraAction = () => {
    if (isCameraOn) {
      capture();
    } else {
      setError(null);
      setIsCameraOn(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6">
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold">
            AI<span className="text-cyan-400"> Trading</span> Analyst
            </h1>
            <p className="mt-4 text-md text-gray-300">
            Get instant technical analysis of any trading chart. Select the platform and timeframe, then upload a screenshot or use your camera to capture a chart.
            </p>
        </div>

        <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700 w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-center text-cyan-300">1. Chart Settings</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-300">Platform</label>
                    <select id="platform" value={platform} onChange={(e) => setPlatform(e.target.value as TradingPlatform)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                        <option>General</option>
                        <option>Binance</option>
                        <option>Quotex</option>
                        <option>Exness</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="timeframe" className="block text-sm font-medium text-gray-300">Timeframe</label>
                    <select id="timeframe" value={timeframe} onChange={(e) => setTimeframe(e.target.value as ChartTimeframe)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
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

        <div className="mt-6 w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-center text-cyan-300">2. Provide Chart Image</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Camera Capture */}
                <div className="flex flex-col items-center p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center">
                        {isCameraOn ? (
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                                className="w-full h-full object-cover"
                                onUserMediaError={(err) => {
                                  console.error(err);
                                  setError('Could not access camera. Please check permissions.');
                                  setIsCameraOn(false);
                                }}
                            />
                        ) : (
                            <div className="text-center text-gray-400 p-4">
                                <CameraIcon className="w-16 h-16 mx-auto opacity-50" />
                                <p className="mt-2 text-sm">Click "Start Camera" to activate your webcam.</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleCameraAction}
                        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
                        aria-label={isCameraOn ? "Capture image" : "Start camera"}
                    >
                        <CameraIcon className="w-6 h-6"/>
                        <span>{isCameraOn ? 'Capture' : 'Start Camera'}</span>
                    </button>
                </div>
                
                {/* File Upload */}
                <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                     <p className="text-center text-gray-400 mb-4">Or upload an image file</p>
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
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 max-w-3xl">
          <p>
            <strong>Disclaimer:</strong> This is an AI-generated analysis and not financial advice. Trading involves substantial risk. Always do your own research.
          </p>
        </div>
    </div>
  );
};

export default CameraView;