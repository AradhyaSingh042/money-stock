import scrapeStockData from "./utils/scrape.js";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
const app = express();

app.use(express.json());
app.use(
  cors({
    methods: ["GET", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
config();

const prisma = new PrismaClient();

app.put("/api/v1/refreshStockData", async (req, res) => {
  try {
    const stockData = await scrapeStockData();

    // Updating Top-gainers Data
    const topGainersData = stockData.topGainers.map((gainer) => {
      return prisma.topGainers.upsert({
        where: {
          company: gainer.company,
        },
        update: {
          ...gainer,
        },
        create: {
          ...gainer,
        },
      });
    });

    await Promise.all(topGainersData);

    // Updating Top-Losers Data
    const topLosersData = stockData.topLosers.map((loser) => {
      return prisma.topLosers.upsert({
        where: {
          company: loser.company,
        },
        update: {
          ...loser,
        },
        create: {
          ...loser,
        },
      });
    });
    await Promise.all(topLosersData);

    res.json({
      success: true,
      message: "Stock Data Refreshed Successfully",
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      message: "Service Unavailable: Unable to refresh stock data.",
    });
  }
});

app.get("/api/v1/fetchStockData", async (req, res) => {
  try {
    const topGainers = await prisma.topGainers.findMany();
    const topLosers = await prisma.topLosers.findMany();
    res.json({
      success: true,
      data: {
        topGainers,
        topLosers,
      },
      message: "Stock Data Fetched Successfully",
    });
  } catch (err) {
    res.status(503).json({
      success: false,
      message: "Service Unavailable: Unable to fetch stock data.",
    });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
