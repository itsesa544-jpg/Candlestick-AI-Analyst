import React from 'react';
import { BackIcon } from './IconComponents';
import { Translation } from '../translations';

interface LiveAnalysisViewProps {
  onBack: () => void;
  t: Translation;
}

export const LiveAnalysisView: React.FC<LiveAnalysisViewProps> = ({ onBack, t }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 p-2 bg-white/75 dark:bg-gray-800/75 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-md"
        aria-label={t.goBackButton}
      >
        <BackIcon className="w-6 h-6" />
      </button>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-cyan-600 dark:text-cyan-400">{t.liveAnalysisTitle}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t.comingSoon}
        </p>
        <p className="text-gray-500 dark:text-gray-500">
          {t.comingSoonDescription}
        </p>
        <button
          onClick={onBack}
          className="mt-8 px-6 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700"
        >
          {t.goBackButton}
        </button>
      </div>
    </div>
  );
};

export default LiveAnalysisView;