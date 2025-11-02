import React, { useState, useEffect } from 'react';
import CameraView from './components/CameraView';
import { AnalysisScreen } from './components/AnalysisScreen';
import { LandingScreen } from './components/LandingScreen';
import { ChartAnalysis, TradingPlatform, ChartTimeframe } from './types';
import { analyzeChart } from './services/geminiService';
import { fileToBase64 } from './utils/imageUtils';
import { translations, Language, Translation } from './translations';

type AppState = 'landing' | 'camera' | 'analyzing' | 'result';
type Theme = 'light' | 'dark';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ChartAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisParams, setAnalysisParams] = useState<{ platform: TradingPlatform; timeframe: ChartTimeframe }>({ platform: 'General', timeframe: '5m' });
  
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const t: Translation = translations[language];

  const handleAnalyze = async (
    file: File,
    platform: TradingPlatform,
    timeframe: ChartTimeframe
  ) => {
    setAppState('analyzing');
    setError(null);
    setAnalysisResult(null);
    setAnalysisParams({ platform, timeframe });

    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    try {
      const base64Image = await fileToBase64(file);
      const result = await analyzeChart(base64Image, file.type, platform, timeframe);
      setAnalysisResult(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setAppState('result');
    }
  };
  
  const handleBackToCamera = () => {
      if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
      }
      setAppState('camera');
      setImageUrl(null);
      setAnalysisResult(null);
      setError(null);
  }

  const handleBackToLanding = () => {
    setAppState('landing');
  }

  const commonProps = {
    t,
    theme,
    toggleTheme,
    language,
    setLanguage,
  };

  const renderContent = () => {
    switch (appState) {
      case 'landing':
        return <LandingScreen onStartStatic={() => setAppState('camera')} {...commonProps} />;
      case 'camera':
        return <CameraView onAnalyze={handleAnalyze} onBack={handleBackToLanding} {...commonProps} />;
      case 'analyzing':
      case 'result':
        if (!imageUrl) {
            handleBackToCamera(); // Should not happen, but as a safeguard
            return null;
        }
        return (
          <AnalysisScreen
            imageUrl={imageUrl}
            result={analysisResult}
            isLoading={appState === 'analyzing'}
            error={error}
            onReset={handleBackToCamera}
            platform={analysisParams.platform}
            timeframe={analysisParams.timeframe}
            t={t}
          />
        );
      default:
        return <LandingScreen onStartStatic={() => setAppState('camera')} {...commonProps} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;