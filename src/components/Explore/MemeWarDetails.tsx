import React from "react";
import { SidebarDemo } from "@/components/Sidebar";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { formatEther } from "viem";
import { FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {useGetAMemeDetail} from "@/hooks"

function MemeWarDetails({ id }: { id: string }) {
  const { data, isLoading } = useGetAMemeDetail(+id);
  console.log("DETAIL", data);

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
              <div className=" space-y-6">
                {/*  <p className="text-secondary100 text-2xl font-bold">
              {" "}
              Subzero Coin
            </p> */}
                <img src={data[5]} alt="meme" className="h-[300px] w-[300px]" />
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
                      <Tag className="text-primary100">{data[1]}</Tag>
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
                <div className="flex justify-center mt-3">
                  <div className="flex gap-7 z-[100] items-center">
                  vote here ▶
                  <a href={data[7]} target="_blank" rel="Suii Twitter">
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
