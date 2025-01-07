import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import toast, { Toaster } from "react-hot-toast";
import { MdRefresh } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";
import { useState } from "react";
import { StockData } from "../../types/interface";

const Stock = () => {
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const {
    data: queryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["stocks"],
    queryFn: () => {
      return axios({
        method: "GET",
        url: "https://money-stock.onrender.com/api/v1/fetchStockData",
        responseType: "json",
      });
    },
  });

  async function refetchHandler() {
    try {
      setIsRefetching(true);
      await axios({
        method: "PUT",
        url: "https://money-stock.onrender.com/api/v1/updateStockData",
      });
      await refetch();
      toast.success("Stock Data Refreshed Successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setIsRefetching(false);
    } catch (error) {
      console.error("Error refreshing stock data:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center gap-3 items-center w-full h-screen">
        <div
          className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        ></div>
        <span className="text-slate-200 text-lg font-semibold tracking-wider">
          Loading...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="text-red-400 text-lg font-semibold tracking-wider">
          {error.message}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="stock-container pt-10 pb-10 px-10 flex flex-col gap-4 w-full">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-teal-500 text-2xl md:text-3xl tracking-wider font-bold">
            Top Gainers
          </h2>

          <Button
            className="bg-slate-300 text-zinc-700 flex items-center gap-2 font-semibold tracking-wide hover:bg-teal-500 transition-colors duration-300"
            onClick={refetchHandler}
            disabled={isRefetching}
          >
            <MdRefresh color="#27272A" className="scale-125" />
            {isRefetching ? "Refetching..." : "Refetch"}
          </Button>
          <Toaster position="top-center" />
        </div>

        <Table className="mt-5">
          <TableCaption className="text-gray-400">
            A list of top gainers.
          </TableCaption>
          <TableHeader className="pointer-events-none">
            <TableRow>
              <TableHead className="text-gray-400 text-left">Company</TableHead>
              <TableHead className="text-gray-400">High</TableHead>
              <TableHead className="text-gray-400">Low</TableHead>
              <TableHead className="text-gray-400">Last Price</TableHead>
              <TableHead className="text-gray-400">Prev Close</TableHead>
              <TableHead className="text-gray-400">Change</TableHead>
              <TableHead className="text-gray-400">Percent Gain (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {queryData?.data.data.topGainers.map((gainer: StockData) => {
              return (
                <TableRow key={gainer.id} className="cursor-pointer">
                  <TableCell className="font-medium text-left text-slate-200">
                    {gainer.company}
                  </TableCell>
                  <TableCell>{gainer.high}</TableCell>
                  <TableCell>{gainer.low}</TableCell>
                  <TableCell>{gainer.lastPrice}</TableCell>
                  <TableCell>{gainer.prevClose}</TableCell>
                  <TableCell>{gainer.change}</TableCell>
                  <TableCell className="text-green-400">
                    {gainer.percentGain}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <h2 className="text-teal-500 mt-16 text-2xl md:text-3xl tracking-wider font-bold">
          Top Losers
        </h2>

        <Table className="mt-5">
          <TableCaption className="text-gray-400">
            A list of top losers.
          </TableCaption>
          <TableHeader className="pointer-events-none">
            <TableRow>
              <TableHead className="text-gray-400 text-left">Company</TableHead>
              <TableHead className="text-gray-400">High</TableHead>
              <TableHead className="text-gray-400">Low</TableHead>
              <TableHead className="text-gray-400">Last Price</TableHead>
              <TableHead className="text-gray-400">Prev Close</TableHead>
              <TableHead className="text-gray-400">Change</TableHead>
              <TableHead className="text-gray-400">Percent Loss (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-white">
            {queryData?.data.data.topLosers.map((loser: StockData) => {
              return (
                <TableRow key={loser.id} className="cursor-pointer">
                  <TableCell className="font-medium text-left text-slate-200">
                    {loser.company}
                  </TableCell>
                  <TableCell>{loser.high}</TableCell>
                  <TableCell>{loser.low}</TableCell>
                  <TableCell>{loser.lastPrice}</TableCell>
                  <TableCell>{loser.prevClose}</TableCell>
                  <TableCell>{loser.change}</TableCell>
                  <TableCell className="text-red-400">
                    {loser.percentLoss}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Stock;
