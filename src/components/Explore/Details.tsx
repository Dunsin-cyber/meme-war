"use client";
import React from "react";
import { useClient } from "@/context";
import { SidebarDemo } from "@/components/Sidebar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Input } from "@chakra-ui/react";
import { createChart } from "lightweight-charts";

const Explore = () => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);

  const { setIsCreateModalOpen } = useClient();

  React.useEffect(() => {
    if (chartContainerRef.current) {
      const chartOptions = {
        autoSize: true,
        layout: {
          textColor: "white",
          background: { type: "solid", color: "black" },
        },
      };

      const chart = createChart(chartContainerRef.current, chartOptions);
      const areaSeries = chart.addAreaSeries({
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
      });

      areaSeries.setData([
        { time: "2018-12-22", value: 32.51 },
        { time: "2018-12-23", value: 31.11 },
        { time: "2018-12-24", value: 27.02 },
        { time: "2018-12-25", value: 27.32 },
        { time: "2018-12-26", value: 25.17 },
        { time: "2018-12-27", value: 28.89 },
        { time: "2018-12-28", value: 25.46 },
        { time: "2018-12-29", value: 23.92 },
        { time: "2018-12-30", value: 22.68 },
        { time: "2018-12-31", value: 22.67 },
      ]);

      const areaSeries_ = chart.addAreaSeries({
        lineColor: "#28A745", // A rich green for the line
        topColor: "#28A745", // Matches the line for consistency
        bottomColor: "rgba(40, 167, 69, 0.28)", // A soft transparent green for the gradient
      });

      areaSeries_.setData([
        { time: "2018-12-22", value: 32.51 },
        { time: "2018-12-23", value: 31.11 },
        { time: "2018-12-24", value: 27.02 },
        { time: "2018-12-25", value: 37.32 },
        { time: "2018-12-26", value: 35.17 },
        { time: "2018-12-27", value: 38.89 },
        { time: "2018-12-28", value: 25.46 },
        { time: "2018-12-29", value: 23.92 },
        { time: "2018-12-30", value: 22.68 },
        { time: "2018-12-31", value: 22.67 },
        { time: "2019-01-01", value: 35.46 },
        { time: "2019-01-02", value: 33.92 },
        { time: "2019-01-03", value: 32.68 },
        { time: "2019-01-04", value: 32.67 },
      ]);

      return () => {
        chart.remove(); // Cleanup chart instance on component unmount
      };
    }
  }, []);

  return (
    <SidebarDemo>
      <div className="bg-bgGradient mx-auto px-8 relative">
        <div className="flex pt-3 justify-between items-center  mx-auto ">
          <h2 className="font-extrabold">My Creations</h2>
          <Input maxW={"40%"} placeholder="search" />
          <button
            className="btn px-9"
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
          >
            create content
          </button>
          <ConnectButton />
        </div>

        <div>
          <span className="text-[#2962FF]">BONK</span> vs{" "}
          <span className="text-[#28A745]">USDT</span>
        </div>
        <div className="flex">
          <div className="mt-5 w-[70%] h-[70vh]" ref={chartContainerRef}></div>
          <div className="flex flex-col w-[25%] py-2 px-2 mx-auto  h-[300px] space-y-6 bg-primary50 rounded-xl">
            <div className="flex rounded-lg w-full justify-between px-5 pt-5">
              <h2 className="flex justify-center bg-slate-600 px-5 py-3 rounded-xl w-[50%] h-12">
                BUY
              </h2>
              <p className="flex justify-center bg-green-600 px-5 py-3 rounded-xl w-[50%] h-12">
                SELL
              </p>
            </div>
            <div>
              <Input width="full" placeholder="how much" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </SidebarDemo>
  );
};

export default Explore;