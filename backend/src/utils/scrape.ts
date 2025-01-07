import axios from "axios";
import { load } from "cheerio";
import { ScrapedResult, StockData } from "../types/interface.js";

async function scrapeStockData(): Promise<ScrapedResult> {
  try {
    const response = await axios.get(
      "https://www.moneycontrol.com/stocks/marketstats/nsegainer/index.php"
    );
    const $ = load(response.data);

    const topGainers: StockData[] = [];
    const topLosers: StockData[] = [];

    // Clean company name by removing extra text
    const cleanCompanyName = (name: string): string => {
      return name.replace(/WatchlistPortfolio/g, "").trim();
    };

    // Parse number string to float
    const parseNumber = (str: string): number => {
      return parseFloat(str.replace(/,/g, "")) || 0;
    };

    // Updated selector for top gainers with all fields
    $(".bsr_table.hist_tbl_hm tbody tr").each((index, element) => {
      const tds = $(element).find("td");
      if (tds.length >= 7) {
        const company = cleanCompanyName($(tds[0]).find("a").text().trim());
        const lastPrice = $(tds[1]).text().trim();
        const prevClose = $(tds[2]).text().trim();
        const high = $(tds[3]).text().trim();
        const low = $(tds[4]).text().trim();
        const change = $(tds[5]).text().trim();
        const percentGain = $(tds[6]).text().trim();

        if (company && lastPrice) {
          topGainers.push({
            company,
            high: parseNumber(high),
            low: parseNumber(low),
            lastPrice: parseNumber(lastPrice),
            prevClose: parseNumber(prevClose),
            change: parseNumber(change),
            percentGain: parseNumber(percentGain),
          });
        }
      }
    });

    // Get top losers with all fields
    const losersResponse = await axios.get(
      "https://www.moneycontrol.com/stocks/marketstats/nseloser/index.php"
    );
    const $losers = load(losersResponse.data);

    $losers(".bsr_table.hist_tbl_hm tbody tr").each((index, element) => {
      const tds = $(element).find("td");
      if (tds.length >= 7) {
        const company = cleanCompanyName($(tds[0]).find("a").text().trim());
        const lastPrice = $(tds[1]).text().trim();
        const prevClose = $(tds[2]).text().trim();
        const high = $(tds[3]).text().trim();
        const low = $(tds[4]).text().trim();
        const change = $(tds[5]).text().trim();
        const percentLoss = $(tds[6]).text().trim();

        if (company && lastPrice) {
          topLosers.push({
            company,
            high: parseNumber(high),
            low: parseNumber(low),
            lastPrice: parseNumber(lastPrice),
            prevClose: parseNumber(prevClose),
            change: parseNumber(change),
            percentLoss: parseNumber(percentLoss),
          });
        }
      }
    });

    const result = {
      topGainers: topGainers.slice(0, 5),
      topLosers: topLosers.slice(0, 5),
    };

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error scraping data:", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    throw error;
  }
}

export default scrapeStockData;
