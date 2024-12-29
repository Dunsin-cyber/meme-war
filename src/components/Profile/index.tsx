"use client";
import React, { useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Input } from "@chakra-ui/react";
import Modal from "@/components/Explore/Modal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useClient } from "@/context";
import {  contractAddress } from "@/hooks/index";
import contractAbi from "@/hooks/abi.json";
import { useAccount } from "wagmi";
import { SidebarDemo } from "@/components/Sidebar";
import { Tag } from "@/components/ui/tag";
import { PieChart } from "react-minimal-pie-chart";
import WithdrawModal from "./WithdrawModal";
import CreatedWar from "@/components/ui/inactive-war-card"
import { toast } from "react-hot-toast";

const Profile = () => {
  React.useEffect(() => {}, []);
  const [contents, setContents] = React.useState(null);
  const { setOpenWithdrawModal } = useClient();
  const { address } = useAccount();

  const handleGetAuthLink = async() => {
    try {
     const data = await fetch("/api/twitter-auth-link");
      const url = await data.json();
      window.open(url.name, "_blank");
    }
    catch(err) {
      toast.error(err.error)
    }
  }



  return (
    <SidebarDemo>
      <div className="mx-auto px-8 relative py-8 space-y-6">
        {/* header */}
        <div className="flex justify-between">
          <p className="text-white text-md font-semibold">
            Welcome,{" "}
            <span className="text-primary200 font-medium ">
              {address?.slice(1, 20)}... 👋😊
            </span>
          </p>
          <ConnectButton />
        </div>

        {/* allocation */}
        <div>
          <p className="text-gray-600 font-semibold">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
          </p>
          {/* allocation */}
          <div className="flex justify-between">
            <div className="flex space-x-6 items-center">
              <div className="flex flex-col space-y-4 mt-3 max-w-[120px]">
                <Tag color="#E38627">BONKIMI - 0.002</Tag>
                <Tag color="#C13C37">SOLANA - 0.002</Tag>
                <Tag color="#6A2135">KAPA - 0.002</Tag>
                <Tag color="blue">LMAP - 0.004</Tag>
              </div>
              {/* pie chart */}
              <PieChart
                className="w-[120px] h-[120px]"
                data={[
                  { title: "BONKIMI", value: 20, color: "#E38627" },
                  { title: "SOLANA", value: 20, color: "#C13C37" },
                  { title: "KAPA", value: 20, color: "#6A2135" },
                  { title: "LMAP", value: 40, color: "blue" },
                ]}
              />
            </div>
            <button className="btn px-6" onClick={handleGetAuthLink}>
              Connect X
            </button>

            <button
              className="btn px-6"
              onClick={() => setOpenWithdrawModal(true)}
            >
              Withdraw
            </button>
          </div>
        </div>
        <p className="font-semibold text-3xl text-secondary50">
          Explore More ⚔️
        </p>
        <CreatedWar />
      </div>
      <WithdrawModal />
    </SidebarDemo>
  );
};

export default Profile;
