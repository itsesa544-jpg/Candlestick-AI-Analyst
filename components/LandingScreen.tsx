import React from 'react';
import { UploadIcon } from './IconComponents';
import { Translation, Language } from '../translations';
import { SettingsBar } from './SettingsBar';

interface LandingScreenProps {
  onStartStatic: () => void;
  t: Translation;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onStartStatic, t, theme, toggleTheme, language, setLanguage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 relative">
      <SettingsBar theme={theme} toggleTheme={toggleTheme} language={language} setLanguage={setLanguage} />
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t.mainTitle.replace(t.mainTitleHighlight, '')}<span className="text-cyan-600">{t.mainTitleHighlight}</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onStartStatic}
          className="group flex flex-col items-center justify-center w-64 h-48 lg:w-72 lg:h-56 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg"
        >
          <div className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 dark:bg-gray-700 group-hover:bg-cyan-500 rounded-full transition-colors duration-300">
            <UploadIcon className="w-10 h-10 lg:w-12 lg:h-12 text-cyan-600 dark:text-cyan-400 group-hover:text-white" />
          </div>
          <h2 className="mt-4 text-xl lg:text-2xl font-semibold">{t.analyzeButton}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.analyzeButtonSubtext}</p>
        </button>
      </div>
       <div className="absolute bottom-4 text-center text-xs text-gray-600 dark:text-gray-400">
          <p>
            <strong>Disclaimer:</strong> {t.disclaimer}
          </p>
      </div>
    </div>
  );
};

export default LandingScreen;