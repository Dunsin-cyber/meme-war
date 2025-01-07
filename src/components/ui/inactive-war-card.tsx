"use client";
import { cn } from "../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Image as Image_ } from "@chakra-ui/react";
import { useState } from "react";
import { CardContainer, CardItem } from "./3d-card";
// import { CampaignT } from "../redux/types";
import Link from "next/link";
import { Tag } from "@/components/ui/tag";
// import { ProgressBar, ProgressRoot } from "@/components/ui/progress";
import { useClient } from "@/context";
import { formatEther } from "viem";
import { useRouter } from "next/router";
import { useGetMemeWars } from "@/hooks/index";
import { Image } from "antd";

export default function HoverEffect({ className }: { className?: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { assignId } = useClient();
  const router = useRouter();

  const { data, isLoading, error } = useGetMemeWars();

  const items = data?.map((d: any, index: number) => ({
    ...d,
    id: index + 1, // Increment the id starting from 1
  }));

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4  py-5",
        className
      )}
    >
      {items?.map((item, idx) => (
        <Link
          key={Number(item?.id)}
          href={
            item.meme2URI
              ? item.isTokenWar
                ? `/explore/${item?.id}`
                : `/explore/meme-war/${item?.id}`
              : `explore/join-war/${item?.id}`
          }
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
            {/* <CardTitle className="text-secondary100">
              {item.title} 🆚 ---
            </CardTitle> */}
            <CardDescription>
              {item.description.slice(0, 100)}...
            </CardDescription>
            <CardContainer className="inter-var">
              {/* <ImageSection src={item.meme1URI} /> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Image.PreviewGroup
                  preview={{
                    onChange: (current, prev) =>
                      console.log(
                        `current index: ${current}, prev index: ${prev}`
                      ),
                  }}
                >
                  <Image width={200} src={item.meme1URI} />
                  {item.meme2URI.length > 10 && (
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "50px",
                        fontWeight: "bold",
                        color: "red",
                        zIndex: 10,
                      }}
                    >
                      VS
                    </div>
                  )}
                  {item.meme2URI.length > 10 ? (
                    <Image width={200} src={item.meme2URI} />
                  ) : (
                    <div className="flex justify-end">
                      <button
                        className="btn mt-2 px-3 mr-3 font-normal text-sm"
                        onClick={() =>
                          router.push(`/explore/join-war/${item.id}`)
                        }
                      >
                        Join War
                      </button>
                    </div>
                  )}
                </Image.PreviewGroup>
              </div>
            </CardContainer>
            <div className="flex flex-row justify-between gap-y-3">
              {item.isTokenWar ? (
                <div className=" flex-1 gap-y-3">
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Sale Target
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag color="red.400">
                      {Number(formatEther(item.saleTarget)).toLocaleString()}
                    </Tag>
                  </div>
                </div>
              ) : (
                <div className=" flex-1 gap-y-3">
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Vote Target
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag color="yellow.500">
                      {Number(item.pointTarget).toLocaleString()}
                    </Tag>
                  </div>
                </div>
              )}
              {!item.isTokenWar && (
                <div className=" flex flex-col gap-y-3">
                  <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                    Reward
                  </p>
                  <div className="flex-1 gap-x-5">
                    <Tag color="yellow.500">
                      {(formatEther(item?.prize)).toLocaleString()}TBnB
                    </Tag>
                  </div>
                </div>
              )}
            </div>
            {/* creator info */}
            <div className="flex flex-row justify-between gap-y-3">
              <div className=" flex flex-col gap-y-3">
                <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                  Created By
                </p>
                <div className="flex-1 gap-x-5">
                  <Tag className="text-primary100">
                    {item.creator.slice(0, 10)}...
                  </Tag>
                </div>
              </div>

              <div className=" flex flex-col gap-y-3">
                <p className="text-zinc-400 tracking-wide leading-relaxed text-sm">
                  War Type
                </p>
                <div className="flex-1 gap-x-5">
                  {item.isTokenWar ? (
                    <Tag color="green.700">Token</Tag>
                  ) : (
                    <Tag color="green.700">Meme</Tag>
                  )}
                </div>
              </div>
            </div>
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
      <Image_
        src={src}
        height="40"
        width="1000"
        className="h-[40px] w-full object-cover rounded-xl group-hover/card:shadow-xl"
        alt="thumbnail"
      />
    </CardItem>
  );
};
