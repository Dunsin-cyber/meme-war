"use client";
import React from "react";
import { useClient } from "@/context";
import { SidebarDemo } from "@/components/Sidebar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createListCollection } from "@chakra-ui/react";
import { createChart } from "lightweight-charts";
import { Table } from "@chakra-ui/react";
import {
  useGetAMemeDetail,
  useGetTokenDetails,
  useCalculatePrice,
} from "@/hooks/index";
import { toast } from "react-hot-toast";
import { formatEther, parseEther } from "viem";
import { bscTestnet } from "viem/chains";
import {
  useAccount,
  useWriteContract,
  useConnect,
  useWatchContractEvent,
} from "wagmi";
import bep20Abi from "@/hooks/bep-20.json";
import { config } from "@/utils/wagmi";
import { injected } from "wagmi/connectors";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/hook";
import { Select, Input, Button } from "antd";
import { watchContractEvent } from "viem/actions";

const Explore = () => {
  const chartContainerRef = React.useRef(null);
  const [active, setActive] = React.useState(true);
  const tokens = useAppSelector((state) => state.token);
  const router = useRouter();
  const { id } = router.query;
  const { address } = useAccount();
  const { data: data_, writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();
  const [selectedToken, setSelectedToken] = React.useState<`0x${string}`>();
  const [amount, setAmount] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);
  const { data: memeDetail } = useGetAMemeDetail(id);
  const [logsFetching, setLogsFetching] = React.useState(false);
  console.log("memeDetail", memeDetail);

  useGetTokenDetails(1, memeDetail && memeDetail[2]);
  useGetTokenDetails(2, memeDetail && memeDetail[3]);

  const BuyToken = async () => {
    try {
      setLoading(true);
      const foundToken = [tokens.token1, tokens.token2].find(
        (token) => token?.address === selectedToken
      );
      console.log("HELLO", parseEther((+amount * +foundToken.price).toString()))
      if (!amount || !selectedToken || (!amount && !selectedToken)) {
        return toast.error("please select token to buy and amount");
      } else if (!foundToken) {
        return toast.error("Could not find token");
      } else if (!address) {
        await connectAsync({
          chainId: bscTestnet.id,
          connector: injected(),
        });
      }
      const data = await writeContractAsync({
        chainId: bscTestnet.id,
        address: selectedToken, // tokenAddress, // change to receipient address
        functionName: "buyTokens",
        abi: bep20Abi.abi,
        args: [amount],
        chain: undefined,
        account: address,
                            // 30        // 0.001       
        value: parseEther((+amount * +foundToken.price).toString()),
      });
      toast.success("purchsed successfully");
      setAmount("");
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const GetTokenLogs = async () => {
    try {
      setLogsFetching(false);

      // const unwatch = watchContractEvent(config, {
      //   address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      //   abi:bep20Abi.abi,
      //   eventName: "Transfer",
      //   onLogs(logs: any) {
      //     console.log("New logs!", logs);
      //   },
      // });
      // unwatch();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLogsFetching(false);
    }
  };
  React.useEffect(() => {
    GetTokenLogs();
  }, []);

  React.useEffect(() => {
    if (chartContainerRef.current) {
      const chartOptions: any = {
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
          <span className="text-[#2962FF]">{tokens?.token1?.name}</span> vs{" "}
          <span className="text-[#28A745]">{tokens?.token2?.name}</span>
        </div>
        <div className="flex flex-col md:flex-row">
          <div
            className="mt-5 w-full  md:w-[70%] h-[70vh]"
            ref={chartContainerRef}
          ></div>

          {/* right hand side */}
          <div className="flex flex-col mx-auto w-full   md:w-[25%]">
            <div className="flex flex-col  py-2 px-2   h-[350px] space-y-6 bg-primary50 rounded-xl">
              <div className="flex  justify-evenly my-3 w-full">
                <h2
                  onClick={() => setActive(true)}
                  className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105  w-[50%] justify-center space-x-2 cursor-pointer items-center ${
                    active && "bg-gray-700 "
                  } `}
                >
                  BUY
                </h2>
                <button
                  disabled={true}
                  // onClick={() => setActive(false)}
                  className={`flex rounded-xl py-2 px-6 transition duration-300 ease-in-out transform hover:scale-105   w-[50%] justify-center cursor-pointer items-center${
                    !active && " bg-gray-700 "
                  } `}
                >
                  SELL
                </button>
              </div>
              <div className="flex w-full ">
                {tokens.token1 && tokens.token2 && (
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Select Token"
                    onChange={(token) => setSelectedToken(token)}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: tokens?.token1?.address,
                        label: tokens?.token1?.name,
                      },
                      {
                        value: tokens?.token2?.address,
                        label: tokens?.token2?.name,
                      },
                    ]}
                  />
                )}
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="0.00"
                  name="pointTarget"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              {/* submit button */}
              <div className="flex justify-center">
                <Button
                  loading={loading}
                  className="btn bg-gray-700 "
                  onClick={() => BuyToken()}
                >
                  Place Order
                </Button>
              </div>
            </div>

            {/* holders  */}
            <div className="mt-6">
              <h2 className="font-semibold text-secondary100">Holders</h2>
              <Table.Root size="sm" variant="outline">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Address</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">
                      Percentage
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {items.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell textAlign="end">{item.price}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
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

const items = [
  { id: 1, name: "oxcvchdui...", price: 999.99 },
  { id: 2, name: "hsyusgushs...", price: 49.99 },
  { id: 3, name: "ox23jejdjd...", price: 150.0 },
  { id: 4, name: "xcosjsis..", price: 799.99 },
  { id: 5, name: "0kslmsksks.", price: 199.99 },
];
