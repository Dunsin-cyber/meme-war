"use client";
import React from "react";
import { SidebarDemo } from "@/components/Sidebar";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { formatEther, parseEther } from "viem";
import { FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useGetAMemeDetail } from "@/hooks";
import { toast } from "react-hot-toast";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  LikeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Card,
  Col,
  Row,
  Statistic,
  Divider,
  Flex,
  Tag as AntdTag,
  CountdownProps,
  Button,
  Badge,
} from "antd";
import {
  useAccount,
  useWriteContract,
  useConnect,
  useReadContract,
} from "wagmi";
import erc20Abi from "@/hooks/erc-20.json";
import { config } from "@/utils/wagmi";
import { injected } from "wagmi/connectors";
import { bscTestnet } from "viem/chains";
import abi from "@/hooks/abi.json";
import { contractAddress, useGetTokenDetails } from "@/hooks/index";
import { useAppSelector } from "@/redux/hook";

const { Countdown } = Statistic;

const onFinish: CountdownProps["onFinish"] = () => {
  console.log("finished!");
};

function CreatedWar({ id }: { id: string }) {
  const [ended, setEnded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { data, isLoading } = useGetAMemeDetail(+id);
  console.log("DETAIL", data);
  const [range, setRange] = React.useState(0);
  const [priceRange, setPriceRange] = React.useState(0);

  const { address, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();
  const [claiming, setClaiming] = React.useState(false);
  const tokens = useAppSelector((state) => state.token);

  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
    setEnded(true);
  };

  const knowIfEnded = () => {
    if (Number(data[10]) < Date.now()) {
      setEnded(true);
    }
  };
  const handleGetTweets = async (tweet1: string, tweet2: string) => {
    try {
      setLoading(true);
      const gettweets = await fetch(
        `/api/tweets?tweet1=${tweet1}&tweet2=${tweet2}`
      );
      const data = await gettweets.json();
      console.log("tweets", data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tweet details");
    } finally {
      setLoading(false);
    }
  };

  useGetTokenDetails(1, data && data[2]);
  useGetTokenDetails(2, data && data[3]);

  React.useEffect(() => {
    if (data && data[11] === false) {
      handleGetTweets(
        "1874600716381151643",
        //   data[6],
        "1874585227932180522"
      );
    }
  }, [data]);

  const calcStat = () => {
    const dd = ((Number(data[16]) - Number(data[17])) / Number(data[9])) * 100;
    console.log(dd);
    setRange(dd);
  };

  const calcPriceStat = () => {
    const dd =
      ((+tokens?.token1?.price - +tokens?.token2?.price) /
        (+tokens?.token1?.price + +tokens?.token2?.price)) *
      100;
    setPriceRange(dd);
  };

  React.useEffect(() => {
    if (data) {
      calcStat();
      knowIfEnded();
    }
       if (tokens.token1 && tokens.token2) {
        calcPriceStat();
       }
  }, [data, tokens]);

  const handleApprove = async () => {
    setLoading(true);
    try {
      if (!address) {
        await connectAsync({
          chainId: bscTestnet.id,
          connector: injected(),
        });
      }

      const approve = await writeContractAsync({
        chainId: bscTestnet.id,
        chain: undefined,
        account: address,
        address: data[2] /* content?.tokenAddress */,
        abi: erc20Abi,
        functionName: "approve",
        args: [contractAddress, parseEther("500000")],
      });
      toast.success("Approved!");

      // closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimVictory = async () => {
    try {
      setClaiming(true);
      if (!address) {
        await connectAsync({
          chainId: bscTestnet.id,
          connector: injected(),
        });
      }

      const approve = await writeContractAsync({
        chainId: bscTestnet.id,
        chain: undefined,
        account: address,
        address: contractAddress /* content?.tokenAddress */,
        abi: abi,
        functionName: "resolveMemeWar",
        args: [id, "votes"],
      });
      toast.success("Congratulations! Reward disbursed to your wallet!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setClaiming(false);
    }
  };

  const handleClaimTokenVictory = async() => {
    try {
      setClaiming(true);
      if (!address) {
        await connectAsync({
          chainId: bscTestnet.id,
          connector: injected(),
        });
      }

      const approve = await writeContractAsync({
        chainId: bscTestnet.id,
        chain: undefined,
        account: address,
        address: contractAddress /* content?.tokenAddress */,
        abi: abi,
        functionName: "resolveMemeTokenWar",
        args: [id],
      });
      toast.success("Congratulations! Reward disbursed to your wallet!");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setClaiming(false);
    }
  }

  // for memes,
  //get user's tweet and competitors tweet
  //compare it woth each other and also with the goal
  // show deadline to goal
  //show button to redeem win

  //for tokens
  //get the token price for both coins, compare it
  //show duration goal
  // show button to redeem win
  //
  return (
    <SidebarDemo>
      {data && (
        <div className="bg-bgGradient mx-auto px-8 py-5 relative">
          <h1 className="font-semibold">Join Battle NFT war ⚔️</h1>
          <div className="flex  py-6 flex-col md:flex-row">
            {/* FIRST MEME  */}
            <div className=" max-w-full md:max-w-[45%] mx-auto space-y-6">
              {/*  <p className="text-secondary100 text-2xl font-bold">
                  {" "}
                  Subzero Coin
                </p> */}
              <img src={data[4]} alt="meme" className="h-[300px] w-[300px]" />
              {/* description */}
              <p className="text-gray-400">{data[13]}</p>
              {/* stat */}
              <div className="flex flex-row justify-between gap-y-3">
                <div className=" flex-1 gap-y-3">
                  <Col span={12}>
                    <Countdown
                      title="Time left"
                      value={Number(data[10])}
                      onFinish={onFinish}
                    />
                  </Col>
                </div>

                <div className=" flex-1 gap-y-3">
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Vote Target
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag color="yellow.500">
                      {Number(data[9]).toLocaleString()}
                    </Tag>
                  </div>
                </div>
              </div>
              {/* creator info */}
              <div className="flex flex-row justify-between gap-y-3">
                <div className=" flex-1 gap-y-3">
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Created By
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag className="text-primary100">{data[0]}</Tag>
                  </div>
                </div>

                <div className=" flex-1 gap-y-3">
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Market Cap
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag color="green.700">---</Tag>
                  </div>
                </div>
              </div>
              {/* Social */}
              {data[13] && (
                <div className="flex justify-center">
                  <Button loading={loading} onClick={() => handleApprove()}>
                    Approve MemeWar
                  </Button>
                </div>
              )}
              {/* Infinte moving cards */}

              <div className="h-[10rem] rounded-md flex flex-col antialiased bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                  items={testimonials}
                  direction="right"
                  speed="slow"
                />
              </div>
            </div>
            <div className=" h-[100vh] w-[1px] bg-gray-700 mx-5" />
            {/* Your war */}

            {/* SECOND MEME */}
            <div className="max-w-full md:w-[45%] space-y-6 mx-auto">
              <p>Here is how your meme is doing...</p>
              {data[13] ? (
                <div>
                  {tokens.token1 && (
                    <div className="space-y-6 mx-auto">
                      <p className="font-bold text-primary100">
                        Token Price is {tokens?.token1?.price}TBNB
                      </p>
                      <Row gutter={16}>
                        {priceRange > 0 ? (
                          <Col span={12}>
                            <Card bordered={false}>
                              <Statistic
                                title={`${tokens?.token1?.price} TBnB`}
                                value={priceRange}
                                precision={2}
                                valueStyle={{ color: "#3f8600" }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                              />
                            </Card>
                          </Col>
                        ) : (
                          <Col span={12}>
                            <Card bordered={false}>
                              <Statistic
                                title={`${tokens?.token1?.price} TBnB`}
                                value={priceRange * -1}
                                precision={2}
                                valueStyle={{ color: "#cf1322" }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                              />
                            </Card>
                          </Col>
                        )}
                        <Col span={12}>
                          <Countdown
                            title="Time left"
                            value={Number(data[10])}
                            onFinish={onFinish}
                          />
                        </Col>
                        {/*  */}
                      </Row>
                      <div className="flex space-x-3">
                        <p>Your token {tokens?.token1?.symbol} is </p>
                        {priceRange > 0 ? (
                          <AntdTag
                            icon={<CheckCircleOutlined />}
                            color="success"
                          >
                            winning
                          </AntdTag>
                        ) : (
                          <AntdTag
                            icon={<ExclamationCircleOutlined />}
                            color="warning"
                          >
                            loosing
                          </AntdTag>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6 mx-auto">
                  <div className="flex space-x-4 justify-space-between ">
                    {range > 0 ? (
                      <Col span={12}>
                        <Card bordered={false}>
                          <Statistic
                            title="doing well"
                            value={range}
                            precision={2}
                            valueStyle={{ color: "#3f8600" }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                    ) : (
                      <Col span={12}>
                        <Card bordered={false}>
                          <Statistic
                            title="not good enough"
                            value={range * -1}
                            precision={2}
                            valueStyle={{ color: "#cf1322" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                          />
                        </Card>
                      </Col>
                    )}

                    <div className="flex space-y-3 flex-col text-wrap ">
                      <p>Name: {data[22]}</p>
                      <p className="text-wrap">{data[20]}</p>
                    </div>
                  </div>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Countdown
                        title="Time left"
                        value={Number(data[10])}
                        onFinish={onFinish}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Distance from Target"
                        value={data[16]}
                        suffix={`/ ${data[9]}`}
                      />
                    </Col>
                  </Row>
                  {ended && (
                    <Badge.Ribbon
                      text="Hippies"
                      color={`${
                        data[16] >= data[9] && data[16] > data[17]
                          ? `green`
                          : `red`
                      }`}
                    >
                      <Card
                        title={`${
                          data[16] >= data[9] && data[16] > data[17]
                            ? `${data[22]} WON THE BATTLE WITH ${data[16]} VOTES`
                            : `${data[22]} LOST THE BATTLE WITH ${data[16]} VOTES`
                        }`}
                        size="small"
                      >
                        voting has ended
                      </Card>
                    </Badge.Ribbon>
                  )}
                </div>
              )}
            </div>
            {data[13] ? (
              <Button
                onClick={() => handleClaimTokenVictory()}
                loading={claiming}
                disabled={
                  ended && +tokens?.token2?.price > +tokens?.token1?.price
                }
              >
                Claim Victory
              </Button>
            ) : (
              <Button
                onClick={() => handleClaimVictory()}
                loading={claiming}
                disabled={
                  !(
                    Number(data[16]) >= Number(data[9]) &&
                    Number(data[16]) > Number(data[17])
                  )
                }
              >
                Claim Victory
              </Button>
            )}
          </div>
        </div>
      )}
    </SidebarDemo>
  );
}

export default CreatedWar;

const testimonials = [
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Charles Dickens",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "William Shakespeare",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Jane Austen",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Herman Melville",
  },
];
