"use client";
import React, { useState, useEffect } from "react";
import { useClient } from "@/context";
import { projects } from "./index";
import {
  useAccount,
  useWriteContract,
  BaseError,
  useConnect,
  useReadContract,
} from "wagmi";
import { config } from "../../utils/wagmi";
import { injected } from "wagmi/connectors";
import contractAbi from "@/hooks/abi.json";
import { contractAddress } from "@/hooks";
import { toast } from "react-hot-toast";
import { formatEther, parseEther } from "viem";
import { useGetMemeWars } from "@/hooks/index";
import erc20Abi from "@/hooks/erc-20.json";
import { useRouter } from "next/router";

const Modal = () => {
  const { isModalOpen, setIsModalOpen, activeId, activePic } = useClient();
  const [sliceCount, setSliceCount] = useState(1);
  const [slices, setSlices] = useState([]);
  const [pricePerSlice, setPricePerSlice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(100); // Example price
  const [imageSlices, setImageSlices] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const pathname = router.pathname;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSliceCount(1);
    setSlices([]);
    setPricePerSlice(0);
    setImageSlices([]);
  };
  //this fetched "campaigns" and by the index, we can get the exact campaign,
  //so it will just be a getallcampaigns, then filter all camaigns to match this id
  const { data } = useGetMemeWars();
  const content = data?.find((p) => Number(p.contentId) === activeId);

  console.log("Content", content);

  useEffect(() => {
    if (isModalOpen) {
      loadImageSlices(activePic, sliceCount);
    }
  }, [isModalOpen, sliceCount]);

  const loadImageSlices = (activePic, count) => {
    const img = new Image();
    img.src = `/dummyPic/${activePic}`;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const sliceWidth = img.width / count;
      const slicesArray = [];

      for (let i = 0; i < count; i++) {
        canvas.width = sliceWidth;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          i * sliceWidth,
          0,
          sliceWidth,
          img.height,
          0,
          0,
          sliceWidth,
          img.height
        );

        slicesArray.push(canvas.toDataURL());
      }

      setImageSlices(slicesArray);
      setImageLoaded(true);
    };
  };

  const handleSlice = () => {
    const calculatedSlices = Array.from({ length: sliceCount }, (_, i) => ({
      id: i + 1,
      price: (Number(formatEther(content?.totalSupply)) / sliceCount).toFixed(
        2
      ),
    }));
    setSlices(calculatedSlices);
    setPricePerSlice(
      Number(
        (Number(formatEther(content?.totalSupply)) / sliceCount).toFixed(2)
      )
    );
  };

  //interacting with smart contract

  const { address, chainId } = useAccount();
  const {
    data: data_,
    error,
    writeContractAsync,
  } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!address) {
        await connectAsync({
          chainId: chainId,
          connector: injected(),
        });
      }
      console.log(pricePerSlice);
      const data = await writeContractAsync({
        // chainId: chainId,
        address: contractAddress, // change to receipient address
        functionName: "transferTokens",
        abi: contractAbi,
        args: [activeId, address, parseEther(pricePerSlice.toString())],
        chain: undefined,
        account: address,
      });

      toast.success("Purchased Successfully");
      setLoading(false);
      closeModal(); // Close modal on submit
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      if (!address) {
        await connectAsync({
          chainId: chainId,
          connector: injected(),
        });
      }

      const approve = await writeContractAsync({
        // chainId: chainId,
        chain: undefined,
        account: address,
        address: content?.tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [contractAddress, parseEther(formatEther(content?.totalSupply))],
      });
      toast.success("Approved!");
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-[#2C120D] to-[#6E3B3B] text-white rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-600">
              <h2 className="text-2xl font-bold">{content?.title}</h2>
              <button
                className="text-gray-300 hover:text-white transition"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            {pathname.includes("explore") ? (
              <div className="p-4 overflow-y-auto max-h-[75vh]">
                {/* Modal Content */}
                <div className="mb-6">
                  <p className="mb-4">{content?.description}</p>
                  <img
                    src={`/dummyPic/${activePic}`}
                    alt={content?.title}
                    className="rounded-md shadow-md w-full"
                  />
                  <a
                    href={`https://testnet.explorer.ethena.fi/address/${content?.tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] underline hover:text-white"
                  >
                    Visit {content?.title} contract
                  </a>
                </div>

                {/* Slicing Options */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm">
                    Number of Slices:
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full p-2 rounded-md text-white"
                    value={sliceCount}
                    onChange={(e) =>
                      setSliceCount(parseInt(e.target.value) || 1)
                    }
                  />
                  <button
                    onClick={handleSlice}
                    className="bg-[#FFD700] text-black py-2 px-4 mt-4 rounded-full hover:scale-105 transition"
                  >
                    Slice It
                  </button>
                </div>

                {/* Sliced Pieces */}
                {imageLoaded && slices.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold mb-2">Sliced Pieces:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {slices.map((slice, index) => (
                        <div
                          key={slice.id}
                          className="bg-[#F0E68C] text-black p-4 rounded-md text-center"
                        >
                          <img
                            src={imageSlices[index]}
                            alt={`Slice ${slice.id}`}
                            className="mb-2"
                          />
                          <p>Slice {slice.id}</p>
                          <p>Price: ${Number(slice.price).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4">
                      Price per slice:{" "}
                      <strong>${pricePerSlice.toLocaleString()}</strong>
                    </p>
                  </div>
                )}
                <div className="flex justify-center py-5">
                  <button
                    disabled={loading}
                    className="btn"
                    onClick={handleSubmit}
                  >
                    {loading ? "buying..." : "Buy a Piece"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 overflow-y-auto max-h-[75vh]">
                {/* Modal Content */}
                <div className="mb-6">
                  <p className="mb-4">{content?.description}</p>
                  <img
                    src={`/dummyPic/${activePic}`}
                    alt={content?.title}
                    className="rounded-md shadow-md w-full"
                  />
                  <a
                    href={`https://testnet.explorer.ethena.fi/address/${content?.tokenAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] underline hover:text-white"
                  >
                    Visit {content?.title} contract
                  </a>
                </div>
                <div className="flex justify-center">
                  <button className="btn px-4" onClick={handleApprove}>
                    {loading ? "loading..." : "Approve Katana to Spend Tokens"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
