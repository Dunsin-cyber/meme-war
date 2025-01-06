"use client"
import React from "react";
import { SidebarDemo } from "@/components/Sidebar";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { formatEther } from "viem";
import { FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useGetAMemeDetail } from "@/hooks";
import {toast} from "react-hot-toast";
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
import { Card, Col, Row, Statistic, Divider, Flex, Tag as AntdTag, CountdownProps, Button } from "antd";


const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onFinish: CountdownProps["onFinish"] = () => {
  console.log("finished!");
};



function MemeWar({ id }: { id: string }) {
    const [loading, setLoading] = React.useState(false)  
    const { data, isLoading } = useGetAMemeDetail(+id);
      console.log("DETAIL", data);


      const handleGetTweets = async(tweet1:string, tweet2:string) => {
        try {
            setLoading(true)
            const gettweets = await fetch(`/api/tweets?tweet1=${tweet1}&tweet2=${tweet2}`);
            const data = await gettweets.json();
            console.log("tweets",data)

        }catch(err) {
            console.log(err)
            toast.error("Failed to fetch tweet details")
        }finally {
            setLoading(false)
        }
      }


      React.useEffect(() => {
            if(data && data[11] === false) {
                handleGetTweets(
                    "1874600716381151643",
                //   data[6],
                  "1874585227932180522"
                );
            }
      },[data])

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
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Duration
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag color="red.400">21 days</Tag>
                  </div>
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
              <div className="flex justify-center mt-3 text-2xl">
                <div className="flex gap-7 z-[100] items-center">
                  vote here ▶
                  <a href={data[6]} target="_blank" rel="meme war Twitter">
                    <FaXTwitter />
                  </a>
                </div>
              </div>

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
              {data[11]  ? (
                <div className="space-y-6 mx-auto">
                  <p className="font-bold text-primary100">
                    Token Price is 20TBNBn
                  </p>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="20 TBNB"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Countdown
                        title="Time left"
                        value={deadline}
                        onFinish={onFinish}
                      />
                    </Col>
                    {/* <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Idle"
                          value={9.3}
                          precision={2}
                          valueStyle={{ color: "#cf1322" }}
                          prefix={<ArrowDownOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col> */}
                  </Row>
                  <div className="flex space-x-3">
                    <p>Your token HYU is </p>
                    {/* <AntdTag icon={<CheckCircleOutlined />} color="success">
                      winning
                    </AntdTag> */}
                    <AntdTag
                      icon={<ExclamationCircleOutlined />}
                      color="warning"
                    >
                      loosing
                    </AntdTag>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 mx-auto">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Active"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Idle"
                          value={9.3}
                          precision={2}
                          valueStyle={{ color: "#cf1322" }}
                          prefix={<ArrowDownOutlined />}
                          suffix="%"
                        />
                      </Card>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Countdown
                        title="Time left"
                        value={deadline}
                        onFinish={onFinish}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Distance from Target"
                        value={93}
                        suffix="/ 100"
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </div>
            <Button loading={false} disabled>
              Claim Victory
            </Button>
          </div>
        </div>
      )}
    </SidebarDemo>
  );
}

export default MemeWar;



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
