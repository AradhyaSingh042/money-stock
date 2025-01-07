export interface StockData {
  company: string;
  high: number;
  low: number;
  lastPrice: number;
  prevClose: number;
  change: number;
  percentGain?: number;
  percentLoss?: number;
}

export interface ScrapedResult {
  topGainers: StockData[];
  topLosers: StockData[];
}
