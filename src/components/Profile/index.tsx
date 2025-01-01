"use client";
import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useClient } from "@/context";
import { useAccount } from "wagmi";
import { SidebarDemo } from "@/components/Sidebar";
import { Tag } from "@/components/ui/tag";
import { PieChart } from "react-minimal-pie-chart";
import WithdrawModal from "./WithdrawModal";
import MyCreatedWar from "@/components/ui/my-created-war"
import { toast } from "react-hot-toast";
import { FaXTwitter } from "react-icons/fa6";
// import { Button, InputNumber } from "antd";
import {addProfile} from "@/redux/slice/ProfileSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Profile = () => {
  const [contents, setContents] = React.useState(null);
  const { setOpenWithdrawModal } = useClient();
  const { address } = useAccount();
  const [xLoading, setXLoading] = React.useState(false);
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector((state) => state.profile);

  const handleGetAuthLink = async () => {
    try {
      setXLoading(true);
      if (userDetails?.username?.length > 1) {
        handleLogout();
        return;
      }
      const data = await fetch("/api/twitter-auth-link");
      const url = await data.json();
      if (url.error) {
        toast.error(url.error);
        return;
      }
      window.open(url.name);
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
        toast.error(data_.error);
        return;
      }
      localStorage.setItem("xname",data_.data.data.username)
      const payload = {
        username: data_.data.data.username,
        name: data_.data.data.name,
        id: data_.data.data.id,
      };
      dispatch(addProfile(payload));
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
    if(!userDetails) {
      handleGetUser();
    }
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
                <Tag color="#E38627">FLOKI - 0.002</Tag>
                <Tag color="#C13C37">CATBAG - 0.002</Tag>
                {/* <Tag color="#6A2135">KAPA - 0.002</Tag>
                <Tag color="blue">LMAP - 0.004</Tag> */}
              </div>
              {/* pie chart */}
              <PieChart
                className="w-[120px] h-[120px]"
                data={[
                  { title: "FLOKI", value: 50, color: "#E38627" },
                  { title: "CATBAG", value: 50, color: "#C13C37" },
                  // { title: "KAPA", value: 20, color: "#6A2135" },
                  // { title: "LMAP", value: 40, color: "blue" },
                ]}
              />
            </div>
            {/* twitter details */}
            {userDetails?.username?.length > 1 && (
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
                    {userDetails?.username?.length > 1
                      ? "unlinking..."
                      : "connecting..."}
                  </p>
                ) : (
                  <div className="cursor-pointer flex space-x-2 justify-center items-center">
                    {userDetails?.username?.length > 1 ? (
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
        <MyCreatedWar />
      </div>
      <WithdrawModal />
    </SidebarDemo>
  );
};

export default Profile;
