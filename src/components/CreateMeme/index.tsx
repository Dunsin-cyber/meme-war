import React, { useState } from "react";
import { useClient } from "@/context";
import {
  useAccount,
  useWriteContract,
  useConnect,
  useReadContract,
} from "wagmi";
import { config } from "../../utils/wagmi";
import { injected } from "wagmi/connectors";
import contractAbi from "@/hooks/abi.json";
import { contractAddress } from "@/hooks";
import { toast } from "react-hot-toast";
import { parseEther, formatEther } from "viem";
// import { ulid } from "ulid";
import { IoCloseSharp } from "react-icons/io5";
import { Steps } from "antd";
import { useMemeClient } from "@/context/createMemeContext";
import CreateMeme from "./CreateMeme";
import CreateToken from "./CreateToken";
import SelectType from "./SelectType";
import erc20Abi from "@/hooks/erc-20.json";
import { bscTestnet } from "wagmi/chains";
import { useAppSelector } from "@/redux/hook";

export default function TokenModal() {
  const { isCreateModalOpen, setIsCreateModalOpen } = useClient();
  const [loading, setLoading] = React.useState(false);
  const { address, chainId } = useAccount();
  const { data, error, writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();
  const { steps, setSteps, memeData, setMemeData } = useMemeClient();
    const userDetails = useAppSelector((state) => state.profile);
  


  const handleCreateMeme = async () => {
    try {
      const data = await writeContractAsync({
        chainId: bscTestnet.id,
        address: contractAddress, // change to receipient address
        functionName: "createMemeWar",
        abi: contractAbi,
        args: [
          memeData.memeUrl,
          memeData.pointTarget,
          memeData.milestone,
        ],
        chain: undefined,
        account: address,
      });
      setLoading(true);
      toast.success("meme created");
        if (memeData.memeType === "meme") return setIsCreateModalOpen(false);
    } catch (err) {
      toast.error(err.message);
      console.log("[ERROR CREATING MEME]", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMemeToken = async () => {
    try {
         const post = {
           title: memeData.memeName + "(FROM MEME WAR)",
           option: memeData.tokenSymbol,
           option2: "Vote Against Me",
         };
       const url = await handlePostOnX(post);
         console.log("MEMEDATA",url)
        const data = await writeContractAsync({
          chainId: bscTestnet.id,
          address: contractAddress, // change to receipient address
          functionName: "createMemeTokenWar",
          abi: contractAbi,
          args: [
            memeData.tokenName,
            memeData.tokenSymbol,
            parseEther(memeData.saleTarget.toString()),
            memeData.memeUrl,
            memeData.description,
            url,
          ],
          chain: undefined,
          account: address,
        });
      setLoading(true);
      toast.success("meme token created");
      setIsCreateModalOpen(false);
    } catch (err) {
      toast.error(err.message);
      console.log("[ERROR CREATING MEME TOKEN]", err);
    } finally {
      setLoading(false);
    }
  };

    const handlePostOnX = async (param: any) => {
      try {
        const username = localStorage.getItem("xname")
        const createPost = await fetch("/api/post-tweet", {
          method: "POST",
          body: JSON.stringify(param),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await createPost.json();
        if (data.error) {
          toast.error(data.error)
        }
        toast.success("meme created on twitter")
        console.log(data)
        const url = `https://x.com/${username}/status/${data?.data?.id}`;
        // setMemeData({...memeData, meme1Twitter: url })
        return url
      } catch (err) {
        toast.error(err.message);
        console.log("[ERROR POSTING MEME ON X]", err);
      }
    };

  const handleSubmit = async () => {
  
    setLoading(true);
    try {
      if (!address) {
        await connectAsync({
          connector: injected(),
        });
      }
      if (steps === 1) {
        //create meme
        await handleCreateMeme();
      } else if (steps === 2) {
        // create meme token
        await handleCreateMemeToken();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  const description = "steps to create a meme";

  const handleNext = async() => {
    if (steps === 0) {
      if (memeData.memeType.length > 1) {
        setSteps(steps + 1);
        return;
      }
      return;
    } else if (steps === 1) {

        if (memeData.memeUrl.length > 1 && memeData.memeName.length > 1 && memeData.pointTarget > 0) {
        await handleSubmit();
          return setSteps(steps + 1);
        }
        else {
          //if no content in meme page,
          toast.error("make sure all fields are filled");
        }
   
    } else if (steps === 2) {
        if (
          memeData.tokenName.length > 1 &&
          memeData.tokenSymbol.length > 1 &&
          memeData.description.length > 1 &&
          memeData.saleTarget > 0
        ) {
          handleSubmit();
        }
        else {
        //if no content in meme token page or all fields have not been filled yet,
          toast.error("make sure all fields are filled");
        }
    }
  };

  return (
    <div className="relative">
      {/* Modal */}
      {isCreateModalOpen && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-primary50 rounded-2xl w-[70%] shadow-lg p-6">
            {/* header */}
            <div className="flex justify-evenly mb-4">
              <h2 className="text-xl font-bold">Create Meme</h2>
              <Steps
                // className="text-white"
                current={steps}
                items={
                  memeData.memeType === "meme"
                    ? [
                        {
                          title: "Select Meme Type",
                          description,
                        },
                        {
                          title: "Create Meme",
                          description,
                        },
                      ]
                    : [
                        {
                          title: "Select Meme Type",
                          description,
                        },
                        {
                          title: "Create Meme",
                          description,
                        },
                        {
                          title: "Create Token",
                          description,
                        },
                      ]
                }
              />
              <div
                className="text-2xl ml-4"
                onClick={() => setIsCreateModalOpen(false)}
              >
                <IoCloseSharp />
              </div>
            </div>

            {/* slect type  */}

            <div>{Screens({ steps })}</div>

            {/* next button */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  if (steps != 0) {
                    setSteps(steps - 1);
                  }
                }}
                // onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
              >
                Back
              </button>
              <button
                disabled={loading}
                type="submit"
                onClick={handleNext}
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                {loading ? "loading..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Screens({ steps }: { steps: number }) {
  switch (steps) {
    case 0:
      return <SelectType />;
    case 1:
      return <CreateMeme />;
    case 2:
      return <CreateToken />;
    case 3:
      return (
        <p className="flex justify-center font-bold  text-2xl ">
          coming soon ❤🏗
        </p>
      );
    default:
      return <p>Unknown status</p>;
  }
}
