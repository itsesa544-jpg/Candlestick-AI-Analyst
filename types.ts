export type TradingPlatform = 'Binance' | 'Quotex' | 'Exness' | 'General';
export type ChartTimeframe = '1m' | '5m' | '15m' | '1h' | '4h' | '1d';

export interface ChartAnalysis {
  prediction: 'Up' | 'Down' | 'Sideways';
  confidence: number;
  patterns: string[];
  analysis: string;
}
