"use client";
import React from "react";
import { useClient } from "@/context";
import { SidebarDemo } from "@/components/Sidebar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Input, createListCollection } from "@chakra-ui/react";
import { createChart } from "lightweight-charts";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const Explore = () => {
  const chartContainerRef = React.useRef(null);
  const [active, setActive] = React.useState(true);
  const { setIsCreateModalOpen } = useClient();

  React.useEffect(() => {
    if (chartContainerRef.current) {
      const chartOptions:any = {
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
          <ConnectButton />
        </div>

        <div>
          <span className="text-[#2962FF]">BONK</span> vs{" "}
          <span className="text-[#28A745]">USDT</span>
        </div>
        <div className="flex flex-col md:flex-row">
          <div
            className="mt-5 w-full  md:w-[70%] h-[70vh]"
            ref={chartContainerRef}
          ></div>
          <div className="flex flex-col w-full  md:w-[25%] py-2 px-2 mx-auto  h-[300px] space-y-6 bg-primary50 rounded-xl">
            <div className="flex  justify-evenly my-3 w-full">
              <h2
                onClick={() => setActive(true)}
                className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105  w-[50%] justify-center space-x-2 cursor-pointer items-center ${
                  active && "bg-gray-700 "
                } `}
              >
                BUY
              </h2>
              <p
                onClick={() => setActive(false)}
                className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105   w-[50%] justify-center cursor-pointer items-center${
                  !active && " bg-gray-700 "
                } `}
              >
                SELL
              </p>
            </div>
            <div className="flex">
      
              <SelectRoot collection={frameworks}>
                <SelectLabel>Token</SelectLabel>
                <SelectTrigger>
                  <SelectValueText  placeholder="Select token"  />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                      {movie.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </div>
            <div>
              <Input width="full" placeholder="0.00" variant="outline" />
            </div>
          </div>
        </div>
      </div>
    </SidebarDemo>
  );
};



export default Explore;

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
