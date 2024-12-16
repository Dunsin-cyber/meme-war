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
import { formatEther } from "viem";

export const HoverEffect = ({
  items,
  className,
}: {
  items: any;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { assignId } = useClient();

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  py-10",
        className
      )}
    >
      {items?.map((item, idx) => (
        // <div
        //   key={Number(item?.contentId)}
        //   onClick={() => {
        //     assignId(Number(item?.contentId), item?.src);
        //   }}
        // >
        <Link
          key={Number(item?.contentId)}
          href={`/explore/${item?.contentId}`}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
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
            <CardTitle className="text-secondary100">
              {item.title} 🆚{" "}
              <span className="text-secondary200">{item.title}</span>
            </CardTitle>
            <CardDescription>
              {item.description.slice(0, 100)}...
            </CardDescription>
            <CardContainer className="inter-var">
              <ImageSection src={`/dummyPic/${item?.src}`} />
            </CardContainer>
            <div className="flex flex-row justify-between gap-y-3">
              <div className=" flex-1 gap-y-3">
                <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                  Deadline
                </p>
                <div className="flex-1 gap-x-5">
                  <Tag color="red.400">21 days left</Tag>
                </div>
              </div>

              <div className=" flex-1 gap-y-3">
                <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                  supply
                </p>
                <div className="flex-1 gap-x-5">
                  <Tag color="yellow.500">
                    {Number(formatEther(item?.totalSupply)).toLocaleString()}
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
                  <Tag color="green.700">$45.5k</Tag>
                </div>
              </div>
            </div>
          </Card>
        </Link>
        // </div>
      ))}
    </div>
  );
};

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
