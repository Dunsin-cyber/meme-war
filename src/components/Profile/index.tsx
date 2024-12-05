"use client";
import React, { useEffect } from "react";
// import { SidebarDemo } from "../Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Input } from "@chakra-ui/react";
import Modal from "@/components/Explore/Modal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useClient } from "@/context";
// import CreateToken from "./CreateToken";
import { useGetContents, contractAddress } from "@/hooks/index";
import contractAbi from "@/hooks/abi.json";
import { useAccount } from "wagmi";
import { SidebarDemo } from "@/components/Sidebar";

const Explore = () => {
  React.useEffect(() => {}, []);
  const [contents, setContents] = React.useState(null);
  const { setIsCreateModalOpen } = useClient();
  const { address } = useAccount();
  const { data, isLoading, error } = useGetContents();
  console.log("Content", data);
  console.log("error", error);

  const pics = ["album-1.jpg", "album-2.jpg", "album-3.jpg", "album-4.jpg"];

  const getRandomImage = () => {
    return pics[Math.floor(Math.random() * pics.length)];
  };

  const filteredContent = data
    ?.filter((d: any) => d.artist === address) // Filter by artist
    .map((d: any) => ({
      ...d, // Spread existing properties
      src: getRandomImage(), // Add random image source
    }));

  return (
    <SidebarDemo>
      <div className="bg-bgGradient mx-auto px-8 relative">
        <div className="flex pt-3 justify-between items-center  mx-auto ">
          <h2 className="font-extrabold">My Creations</h2>
          <Input maxW={"40%"} placeholder="search" />
          <button
            className="btn px-9"
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
          >
            create content
          </button>
          <ConnectButton />
        </div>
        {data && !isLoading && <HoverEffect items={filteredContent} />}

        <Modal />
      </div>
    </SidebarDemo>
  );
};

export default Explore;
