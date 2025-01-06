"use client";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { CardContainer, CardItem } from "./3d-card";
// import { CampaignT } from "../redux/types";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
// import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { useClient } from "@/context";
import { formatEther, parseEther } from "viem";
import { useRouter } from "next/router";
import { useGetMemeWars, contractAddress } from "@/hooks/index";
import {
  useAccount,
  useWriteContract,
  useConnect,
  useReadContract,
} from "wagmi";
import { toast } from "react-hot-toast";
import erc20Abi from "@/hooks/erc-20.json";
import { config } from "@/utils/wagmi";
import { injected } from "wagmi/connectors";
import { bscTestnet } from "viem/chains";

export default function HoverEffect({ className }: { className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { assignId } = useClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { address, chainId } = useAccount();
  const { writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();

  const { data, isLoading, error } = useGetMemeWars();
  // console.log(data);
  const items = data
    ?.filter((item) => item.creator === address)
    .map((d: any, index: number) => ({
      ...d,
      id: index + 1, // Increment the id starting from 1
    }));

  const handleApprove = async (tokenAddress: `0x${string}`) => {
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
        address: tokenAddress /* content?.tokenAddress */,
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

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  py-5",
        className
      )}
    >
      {items?.map((item, idx) => (
        <Link
         href={`/profile/created-war/${item?.id}`}
              onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          key={Number(item?.id)}
          className="relative group  block p-2 h-full w-full"
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#2C014D] dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {/* <CardTitle className="text-secondary100">
              {item.title} 🆚 ---
            </CardTitle> */}
            <CardDescription>
              {item.description.slice(0, 100)}...
            </CardDescription>
            <CardContainer className="inter-var">
              <ImageSection src={item.creator === address ? item.meme1URI : item.meme2URI} />
            </CardContainer>
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
                  <Tag color="yellow.500">{item?.creator}</Tag>
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
                  <Tag className="text-primary100">
                    {item.creator.slice(0, 100)}...
                  </Tag>
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
            {item.isTokenWar && (
              <div className="flex justify-end">
                <button
                  className="btn py-2 px-6"
                  onClick={() => router.push(`/profile/created-war/${item?.id}`)}
                  // onClick={() => handleApprove(item.creator === address ?  item.creatorToken: item.challengerToken)}
                >
                  Approve Meme war
                </button>
              </div>
            )}
          </Card>
        </Link>
        //  </div>
      ))}
    </div>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-[#2C014D] dark:border-[#2C014D]/[0.2] group-hover:border-[#2C014D] relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const ImageSection = ({
  className,
  src,
}: {
  className?: string;
  src: string;
}) => {
  return (
    <CardItem translateZ="100" className="w-full mt-1">
      <Image
        src={src}
        height="40"
        width="1000"
        className="h-[40px] w-full object-cover rounded-xl group-hover/card:shadow-xl"
        alt="thumbnail"
      />
    </CardItem>
  );
};
