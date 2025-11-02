import React from 'react';
import { ChartAnalysis, TradingPlatform, ChartTimeframe } from '../types';
import { BackIcon, ArrowDownIcon, ArrowUpIcon, MinusIcon } from './IconComponents';
import { Translation } from '../translations';

interface AnalysisScreenProps {
  imageUrl: string;
  result: ChartAnalysis | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
  platform: TradingPlatform;
  timeframe: ChartTimeframe;
  t: Translation;
}

const PredictionIcon: React.FC<{ prediction: 'Up' | 'Down' | 'Sideways' }> = ({ prediction }) => {
  switch (prediction) {
    case 'Up':
      return <ArrowUpIcon className="w-12 h-12 text-green-500" />;
    case 'Down':
      return <ArrowDownIcon className="w-12 h-12 text-red-500" />;
    case 'Sideways':
      return <MinusIcon className="w-12 h-12 text-yellow-500" />;
    default:
      return null;
  }
};

const getPredictionColorClasses = (prediction: 'Up' | 'Down' | 'Sideways') => {
    switch (prediction) {
      case 'Up': return 'text-green-700 dark:text-green-300 border-green-500/50 bg-green-500/10 dark:bg-green-500/20';
      case 'Down': return 'text-red-700 dark:text-red-300 border-red-500/50 bg-red-500/10 dark:bg-red-500/20';
      case 'Sideways': return 'text-yellow-700 dark:text-yellow-300 border-yellow-500/50 bg-yellow-500/10 dark:bg-yellow-500/20';
      default: return 'text-gray-600 dark:text-gray-300 border-gray-500/50 bg-gray-500/10 dark:bg-gray-500/20';
    }
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ imageUrl, result, isLoading, error, onReset, platform, timeframe, t }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Image Panel */}
      <div className="w-full md:w-1/2 h-1/3 md:h-full relative bg-gray-800 dark:bg-black">
        <img src={imageUrl} alt="Financial chart" className="w-full h-full object-contain" />
        <button
          onClick={onReset}
          className="absolute top-4 left-4 p-2 bg-white/50 dark:bg-gray-800/50 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-md"
          aria-label={t.goBackButton}
        >
          <BackIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Analysis Panel */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col p-6 lg:p-8 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-cyan-600 dark:text-cyan-400">{t.analysisTitle}</h2>
            <div className="flex gap-2">
                <span className="bg-gray-200 dark:bg-gray-700 text-cyan-800 dark:text-cyan-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{platform}</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-cyan-800 dark:text-cyan-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{timeframe}</span>
            </div>
        </div>
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 dark:border-cyan-400"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t.analyzingText}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{t.analyzingSubtext}</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-xl font-semibold text-red-500 dark:text-red-400">{t.analysisFailedTitle}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
            <button
              onClick={onReset}
              className="mt-6 px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700"
            >
              {t.tryAgainButton}
            </button>
          </div>
        )}

        {result && !isLoading && (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg border ${getPredictionColorClasses(result.prediction)}`}>
              <div className="flex items-center gap-4">
                <PredictionIcon prediction={result.prediction} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.predictionLabel}</h3>
                  <p className="text-4xl font-bold">{result.prediction}</p>
                </div>
                <div className="ml-auto text-right">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.confidenceLabel}</h3>
                  <p className="text-4xl font-bold">{result.confidence}<span className="text-2xl opacity-70">%</span></p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.patternsLabel}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.patterns.length > 0 ? result.patterns.map((pattern, index) => (
                    <span key={index} className="bg-gray-200 dark:bg-gray-700 text-cyan-800 dark:text-cyan-200 text-sm font-medium px-3 py-1 rounded-full">{pattern}</span>
                )) : <p className="text-gray-500 dark:text-gray-400">{t.noPatternsFound}</p>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t.analysisLabel}</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed">{result.analysis}</p>
            </div>
            
            <div className="!mt-8 border-t border-yellow-600/30 pt-4 text-center">
              <p className="text-xs text-yellow-700 dark:text-yellow-500">
                <strong>Disclaimer:</strong> {t.disclaimer}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};