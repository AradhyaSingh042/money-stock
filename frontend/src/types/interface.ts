export interface StockData {
  id: string;
  company: string;
  high: number;
  low: number;
  lastPrice: number;
  prevClose: number;
  change: number;
  percentGain?: number;
  percentLoss?: number;
}