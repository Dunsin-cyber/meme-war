import React from "react";
import { SidebarDemo } from "@/components/Sidebar";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useGetAMemeDetail } from "@/hooks";
import {
  useAccount,
  useWriteContract,
  useConnect,
  // useReadContract,
} from "wagmi";
import { config } from "../../utils/wagmi";
import { injected } from "wagmi/connectors";
import contractAbi from "@/hooks/abi.json";
import { contractAddress } from "@/hooks";
import { Statistic, Col, CountdownProps, Checkbox } from "antd";
import { toast } from "react-hot-toast";
import { parseEther, formatEther } from "viem";
import { bscTestnet } from "wagmi/chains";
import { Badge, Card, Space } from "antd";

const { Countdown } = Statistic;

function MemeWarDetails({ id }: { id: string }) {
  const [ended, setEnded] = React.useState(false);
  const [voted, setVoted] = React.useState(false);
  const [voteIndex, setVoteIndex] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { data, isLoading } = useGetAMemeDetail(+id);
  const { address, chainId } = useAccount();
  console.log("DETAIL", data);

  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
    setEnded(true);
  };

  const knowIfEnded = () => {
    if (Number(data[10]) < Date.now()) {
      setEnded(true)
    }
  }

  React.useEffect(() => {
    if(data) {

      knowIfEnded();
    }
  }, [data])

  const { writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();

  const handleVote = async (index: number) => {
    try {
      setLoading(true);
      if (!address) {
        await connectAsync({
          connector: injected(),
        });
      }

      const data = await writeContractAsync({
        chainId: bscTestnet.id,
        address: contractAddress, // change to receipient address
        functionName: "voteForMeme",
        abi: contractAbi,
        args: [+id, index],
        chain: undefined,
        account: address,
      });
      setLoading(true);
      setVoted(true);
      setVoteIndex(index);
      toast.success("Vote Recorded");
    } catch (err) {
      toast.error("something  went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarDemo>
      {data && (
        <div className="bg-bgGradient mx-auto px-8 py-5 relative">
          <h1 className="font-semibold">Join Battle NFT war ⚔️</h1>
          <div className="flex  py-6 flex-col md:flex-row">
            {/* FIRST MEME  */}
            <div className=" max-w-full md:max-w-[45%] mx-auto space-y-6">
              <p className="text-secondary100 text-2xl font-bold">
                {" "}
                {data[22]}
              </p>
              <img src={data[4]} alt="meme" className="h-[300px] w-[300px]" />
              {/* description */}
              <p className="text-gray-400">{data[20]}</p>
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
                    Reward
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag color="green.100">
                      {formatEther(data[11]).toLocaleString()}TBnB
                    </Tag>
                  </div>
                </div>
              </div>
              {/* Social */}
              {ended ? (
                <Badge.Ribbon
                  text="Hippies"
                  color={`${
                    data[16] >= data[9] && data[16] > data[17] ? `green` : `red`
                  }`}
                >
                  <Card
                    title={`${
                      data[16] >= data[9] && data[16] > data[17]
                        ? `${data[23]} WON THE BATTLE WITH ${data[16]} VOTES`
                        : `${data[23]} LOST THE BATTLE WITH ${data[16]} VOTES`
                    }`}
                    size="small"
                  >
                    voting has ended
                  </Card>
                </Badge.Ribbon>
              ) : (
                <div className="flex flex-col items-center mt-3 text-xl space-y-4">
                  <div className="flex gap-3 z-[100] items-center">
                    vote on
                    <a href={data[6]} target="_blank" rel="meme war Twitter">
                      <FaXTwitter />
                    </a>
                  </div>
                  <p>or </p>
                  <div className="flex gap-3 z-[100] items-center">
                    on meme war
                    <Checkbox
                      checked={voted && voteIndex === 1}
                      onChange={() => handleVote(1)}
                    >
                      Vote
                    </Checkbox>
                  </div>
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
              <div className=" space-y-6">
                <p className="text-secondary100 text-2xl font-bold">
                  {" "}
                  {data[23]}
                </p>
                <img src={data[5]} alt="meme" className="h-[300px] w-[300px]" />
                {/* description */}
                <p className="text-gray-400">{data[21]}</p>
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
                      <Tag className="text-primary100">{data[1]}</Tag>
                    </div>
                  </div>

                  <div className=" flex-1 gap-y-3">
                    <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                      Reward
                    </p>
                    <div className="flex-1 gap-x-5">
                      <Tag color="green.100">
                        {formatEther(data[11]).toLocaleString()}TBnB
                      </Tag>
                    </div>
                  </div>
                </div>
                {/* Social */}
                {ended ? (
                  <Badge.Ribbon
                    text="Hippies"
                    color={`${
                      data[17] >= data[9] && data[17] > data[16]
                        ? `green`
                        : `red`
                    }`}
                  >
                    <Card
                      title={`${
                        data[17] >= data[9] && data[17] > data[16]
                          ? `${data[24]} WON THE BATTLE WITH ${data[17]} VOTES`
                          : `${data[24]} LOST THE BATTLE WITH ${data[17]} VOTES`
                      }`}
                      size="small"
                    >
                      voting has ended
                    </Card>
                  </Badge.Ribbon>
                ) : (
                  <div className="flex flex-col items-center mt-3 text-xl space-y-4">
                    <div className="flex gap-3 z-[100] items-center">
                      vote on
                      <a href={data[6]} target="_blank" rel="meme war Twitter">
                        <FaXTwitter />
                      </a>
                    </div>
                    <p>or </p>
                    <div className="flex gap-3 z-[100] items-center">
                      on meme war
                      <Checkbox
                        checked={voted && voteIndex === 2}
                        onChange={() => handleVote(2)}
                      >
                        Vote
                      </Checkbox>
                    </div>
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
            </div>
          </div>
        </div>
      )}
    </SidebarDemo>
  );
}

export default MemeWarDetails;

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
