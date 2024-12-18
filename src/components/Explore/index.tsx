"use client";
import React, { useEffect } from "react";
// import { SidebarDemo } from "../Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Input } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useClient } from "@/context";
import CreateToken from "./CreateMeme";
import { useGetContents, contractAddress } from "@/hooks/index";
import contractAbi from "@/hooks/abi.json";
import { SidebarDemo } from "@/components/Sidebar";
import CreatedWar from "@/components/ui/inactive-war-card";

const Explore = () => {
  React.useEffect(() => {}, []);
  const [contents, setContents] = React.useState(null);
  const { setIsCreateModalOpen } = useClient();

  const { data, isLoading, error } = useGetContents();
  console.log("Content", data);
  console.log("error", error);

  const pics = ["album-1.jpg", "album-2.jpg", "album-3.jpg", "album-4.jpg"];

  const getRandomImage = () => {
    return pics[Math.floor(Math.random() * pics.length)];
  };

  const filteredContent = data?.map((d: any) => ({
    ...d, // Spread existing properties of each campaign
    src: getRandomImage(),
  }));

  return (
    <SidebarDemo>
      <div className="bg-bgGradient mx-auto px-8 relative">
        <div className="flex pt-3 justify-between items-center  mx-auto ">
          <h2 className="font-extrabold"> Meme War</h2>
          <Input maxW={"40%"} placeholder="search" />
          <button
            className="btn px-9"
            onClick={() => {
              setIsCreateModalOpen(true);
            }}
          >
            create war
          </button>
          <ConnectButton />
        </div>
        {data && (
          <div className="mt-4">
            <h2 className="text-3xl font-bold">Ongoing War</h2>
            {data && !isLoading && <HoverEffect items={filteredContent} />}

            <h2 className="text-3xl font-bold">Join War</h2>
            {data && !isLoading && <CreatedWar items={filteredContent} />}
          </div>
        )}
        <CreateToken />
      </div>
    </SidebarDemo>
  );
};


export default Explore;

export const projects = [
  {
    id: 1,
    title: "Kanye West - Graduation",
    description:
      "An iconic album by Kanye West, featuring hit tracks like 'Stronger' and 'Good Life.' Share ownership of tokens tied to this album and enable joint purchases.",
    link: "https://kanyewest.com",
    src: "album-1.jpg",
    progress: 20,
  },
  {
    id: 2,
    title: "Beyoncé - Lemonade",
    description:
      "A groundbreaking visual album by Beyoncé that blends music with storytelling. Own tokens tied to this masterpiece and split the cost with others.",
    link: "https://beyonce.com",
    src: "album-2.jpg",
    progress: 30,
  },
  {
    id: 3,
    title: "Drake - Scorpion",
    description:
      "Drake's fifth studio album featuring chart-topping hits like 'God's Plan.' Tokenize your ownership and collaborate on joint purchases.",
    link: "https://drake.com",
    src: "album-3.jpg",
    progress: 0,
  },
  {
    id: 4,
    title: "Taylor Swift - 1989",
    description:
      "A Grammy-winning album by Taylor Swift that marked her transition to pop. Own a share in this album's tokens and join buy opportunities.",
    link: "https://taylorswift.com",
    src: "album-4.jpg",
    progress: 78,
  },
  {
    id: 5,
    title: "Adele - 25",
    description:
      "A soulful album by Adele, featuring the worldwide hit 'Hello.' Token ownership lets you split the cost and invest in this musical gem.",
    link: "https://adele.com",
    src: "album-1.jpg",
    progress: 49,
  },
  {
    id: 6,
    title: "The Weeknd - After Hours",
    description:
      "The Weeknd's album featuring chart-toppers like 'Blinding Lights.' Share tokens in this album and enable fractional ownership.",
    link: "https://theweeknd.com",
    src: "album-2.jpg",
    progress: 90,
  },
];
