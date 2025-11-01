import React from 'react';
import { ChartAnalysis, TradingPlatform, ChartTimeframe } from '../types';
import { BackIcon, ArrowDownIcon, ArrowUpIcon, MinusIcon } from './IconComponents';

interface AnalysisScreenProps {
  imageUrl: string;
  result: ChartAnalysis | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
  platform: TradingPlatform;
  timeframe: ChartTimeframe;
}

const PredictionIcon: React.FC<{ prediction: 'Up' | 'Down' | 'Sideways' }> = ({ prediction }) => {
  switch (prediction) {
    case 'Up':
      return <ArrowUpIcon className="w-12 h-12 text-green-400" />;
    case 'Down':
      return <ArrowDownIcon className="w-12 h-12 text-red-400" />;
    case 'Sideways':
      return <MinusIcon className="w-12 h-12 text-yellow-400" />;
    default:
      return null;
  }
};

const getPredictionColorClasses = (prediction: 'Up' | 'Down' | 'Sideways') => {
    switch (prediction) {
      case 'Up': return 'text-green-400 border-green-400/50 bg-green-500/10';
      case 'Down': return 'text-red-400 border-red-400/50 bg-red-500/10';
      case 'Sideways': return 'text-yellow-400 border-yellow-400/50 bg-yellow-500/10';
      default: return 'text-gray-400 border-gray-400/50 bg-gray-500/10';
    }
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ imageUrl, result, isLoading, error, onReset, platform, timeframe }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-900 text-white">
      {/* Image Panel */}
      <div className="w-full md:w-1/2 h-1/3 md:h-full relative bg-black">
        <img src={imageUrl} alt="Financial chart" className="w-full h-full object-contain" />
        <button
          onClick={onReset}
          className="absolute top-4 left-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition"
          aria-label="Go back"
        >
          <BackIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Analysis Panel */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-cyan-400">AI Analysis</h2>
            <div className="flex gap-2">
                <span className="bg-gray-700 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{platform}</span>
                <span className="bg-gray-700 text-cyan-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">{timeframe}</span>
            </div>
        </div>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
            <p className="mt-4 text-gray-300">Analyzing chart...</p>
            <p className="text-sm text-gray-400">This may take a moment.</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-xl font-semibold text-red-500">Analysis Failed</h3>
            <p className="text-gray-300 mt-2">{error}</p>
            <button
              onClick={onReset}
              className="mt-6 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700"
            >
              Try Again
            </button>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg border ${getPredictionColorClasses(result.prediction)}`}>
              <div className="flex items-center gap-4">
                <PredictionIcon prediction={result.prediction} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Prediction</h3>
                  <p className="text-4xl font-bold">{result.prediction}</p>
                </div>
                <div className="ml-auto text-right">
                  <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Confidence</h3>
                  <p className="text-4xl font-bold">{result.confidence}<span className="text-2xl opacity-70">%</span></p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Key Patterns Identified</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.patterns.length > 0 ? result.patterns.map((pattern, index) => (
                    <span key={index} className="bg-gray-700 text-cyan-300 text-sm font-medium px-3 py-1 rounded-full">{pattern}</span>
                )) : <p className="text-gray-400">No specific patterns identified.</p>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-400 uppercase tracking-wide">Detailed Analysis</h3>
              <p className="text-gray-300 mt-2 whitespace-pre-wrap font-mono text-sm leading-relaxed">{result.analysis}</p>
            </div>
            
            <div className="!mt-8 border-t border-yellow-500/30 pt-4 text-center">
              <p className="text-xs text-yellow-500">
                <strong>Disclaimer:</strong> This is an AI-generated analysis and not financial advice. Trading involves substantial risk. Always do your own research.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};