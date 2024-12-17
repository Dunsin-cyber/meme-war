import React from "react";
import { SidebarDemo } from "@/components/Sidebar";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
import { formatEther } from "viem";
import { FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {Form} from "./Form"

function index() {
  return (
    <SidebarDemo>
      <div className="bg-bgGradient mx-auto px-8 py-5 relative">
        <h1 className="font-semibold">Join Battle NFT war ⚔️</h1>
        <div className="flex  py-6 flex-col md:flex-row">
          {/* Exixsting War */}
          <div className=" max-w-full md:max-w-[50%] space-y-6">
            <p className="text-secondary100 text-2xl font-bold">
              {" "}
              Subzero Coin
            </p>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla,
              officia deserunt? Consequuntur odio veritatis esse eius ex
              repudiandae facere debitis nam harum dolore quidem quas, cumque
              nemo pariatur maxime enim?
            </p>
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
                  supply
                </p>
                <div className="flex-1 gap-x-5">
                  <Tag color="yellow.500">
                    {/* {Number(formatEther(item?.totalSupply)).toLocaleString()} */}
                    3000,000,000
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
                  <Tag className="text-primary100">POxgddjno...</Tag>
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
              <div className="flex gap-7 z-[100000]">
                <a href="#" target="_blank" rel="Suii Twitter">
                  <FaXTwitter />
                </a>
                <a href="#" target="_blank" rel="Suii Discord">
                  <FaDiscord />
                </a>
                <a href="#" target="_blank" rel="Suii Medium">
                  <FaMedium />
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

          <div className="max-w-full md:w-[50%] space-y-6">
            <Form />
          </div>
        </div>
      </div>
    </SidebarDemo>
  );
}

export default index;

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
