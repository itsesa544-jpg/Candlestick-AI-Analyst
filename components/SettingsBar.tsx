import React from 'react';
import { MoonIcon, SunIcon } from './IconComponents';
import { Language } from '../translations';

interface SettingsBarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const SettingsBar: React.FC<SettingsBarProps> = ({ theme, toggleTheme, language, setLanguage }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
      <button
        onClick={toggleLanguage}
        className="w-10 h-10 flex items-center justify-center bg-white/75 dark:bg-gray-800/75 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-md"
        aria-label="Toggle language"
      >
        <span className="font-bold text-sm">{language === 'en' ? 'BN' : 'EN'}</span>
      </button>
      <button
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center bg-white/75 dark:bg-gray-800/75 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition shadow-md"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};