"use client";
import React, { useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Input } from "@chakra-ui/react";
import Modal from "@/components/Explore/Modal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useClient } from "@/context";
import { contractAddress } from "@/hooks/index";
import contractAbi from "@/hooks/abi.json";
import { useAccount } from "wagmi";
import { SidebarDemo } from "@/components/Sidebar";
import { Tag } from "@/components/ui/tag";
import { PieChart } from "react-minimal-pie-chart";
import WithdrawModal from "./WithdrawModal";
import CreatedWar from "@/components/ui/inactive-war-card";
import { toast } from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";
// import { Button, InputNumber } from "antd";

const Profile = () => {
  const [contents, setContents] = React.useState(null);
  const { setOpenWithdrawModal } = useClient();
  const { address } = useAccount();
  const [xLoading, setXLoading] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    username: "",
    name: "",
    id: "",
  });

  const handleGetAuthLink = async () => {
    try {
      setXLoading(true);
      if (userDetails.username.length > 1) {
        handleLogout();
        return;
      }
      const data = await fetch("/api/twitter-auth-link");
      const url = await data.json();
      if (url.error) {
        toast.error(url.error);
        return;
      }
      window.open(url.name, "_blank");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setXLoading(false);
    }
  };

  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleGetUser = async () => {
    try {
      setXLoading(true);
      const data = await fetch("/api/user-details");
      const data_ = await data.json();
      console.log(data_)
      if (data_.error) {
          if (data_.error.code === 429) {
            const resetTime = data_.error.rateLimit.reset; // Reset time in seconds
            const waitTime = (resetTime - Date.now() / 1000) * 1000; // Calculate wait time
            console.log(`Rate limit exceeded. Retrying after ${waitTime} ms`);
            toast.error(`Rate limit exceeded. Retrying after ${waitTime} ms`);
            await delay(waitTime);
            return handleGetUser(); // Retry the request
          }
        toast.error(data_.error);
        return;
      }
      setUserDetails({
        username: data_.data.username,
        name: data_.data.name,
        id: data_.data.id,
      });
      console.log("user details from profile", data_);
    } catch (err) {

      console.log(err);
      toast.error(err.message);
    } finally {
      setXLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setXLoading(true);
      const data = await fetch("/api/twitter-logout");
      const data_ = await data.json();
      if (data_.error) {
        toast.error(data_.error);
        return;
      }
      console.log(data_);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setXLoading(false);
      // setOpenPINModal(false);
    }
  };

  React.useEffect(() => {
    console.log("called get user")
    handleGetUser();
  }, []);



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
            {/* twitter details */}
            {userDetails?.username && (
              <div className="space-x-2 space-y-2">
                <div className="cursor-pointer flex space-x-2 justify-center items-center">
                  <FaXTwitter /> <p>@ {userDetails?.username}</p>
                </div>
                <div className="cursor-pointer flex space-x-2 justify-center items-center">
                  <p>Id: {userDetails?.id}</p> <p>{userDetails?.name} </p>
                </div>
              </div>
            )}
            <div className="space-x-3 flex ">
              {/* X button */}
              <div className="btn px-6 bg-blue-700" onClick={handleGetAuthLink}>
                {xLoading ? (
                  <p>
                    {userDetails.username.length > 1
                      ? "unlinking..."
                      : "connecting..."}
                  </p>
                ) : (
                  <div className="cursor-pointer flex space-x-2 justify-center items-center">
                    {userDetails.username.length > 1 ? (
                      <div className="cursor-pointer flex space-x-2 justify-center items-center">
                        <p>Unlink </p> <FaXTwitter />
                      </div>
                    ) : (
                      <div className="cursor-pointer flex space-x-2 justify-center items-center">
                        <p>Link </p> <FaXTwitter />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* withdraw button */}
              <button
                className="btn px-6"
                onClick={() => setOpenWithdrawModal(true)}
              >
                Withdraw
              </button>
            </div>
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
