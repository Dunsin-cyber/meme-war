import React, { useState } from "react";
import { useClient } from "@/context";
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
import { parseEther } from "viem";
import { createListCollection, HStack } from "@chakra-ui/react";
import { ulid } from "ulid";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "@/components/ui/progress";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

import { PlusOutlined } from "@ant-design/icons";
import type { StepsProps, SelectProps } from "antd";
import { Popover, Steps , Select } from "antd";

const options: SelectProps["options"] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}


export default function TokenModal() {
  const { isCreateModalOpen, setIsCreateModalOpen } = useClient();
  const [loading, setLoading] = React.useState(false);
  const { address, chainId } = useAccount();
  const { data, error, writeContractAsync } = useWriteContract({
    config,
  });
  const { connectAsync } = useConnect();

  const [formData, setFormData] = useState({
    tokenName: "",
    description: "",
    metadataUrl: "",
    tokenSymbol: "",
    totalSupply: "",
    title: "",
    //new
    createBattle: 0,
    memeId: 0,
    wager: 0,
    _duration: 0,
    _token1: "",
    _token1Name: "",
    milestoneBased: false,
    _milestoneTarget: 0,
    type: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!address) {
        await connectAsync({
          connector: injected(),
        });
      }

      const data = await writeContractAsync({
        // chainId: chainId,
        address: contractAddress, // change to receipient address
        functionName: "createBattle",
        abi: contractAbi,
        args: [
          formData.metadataUrl,
          formData.tokenName,
          formData.tokenSymbol,
          parseEther(`${formData.totalSupply}`),
          formData.description,
          formData.title,
        ],
        chain: undefined,
        account: address,
      });

      toast(
        "Created Successfully, your creation will appear after the transcation is confirmed"
      );
      setLoading(false);
      setIsCreateModalOpen(false);
      //  const dd=  `https://testnet.explorer.ethena.fi/address/${data}`}

      // console.log(data);
    } catch (err) {
      console.log(err);
      toast("Something Went Wrong");
      setLoading(false);
    }
  };

  const description = "You can hover on the dot.";

  return (
    <div className="relative">
      {/* Modal */}
      {isCreateModalOpen && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-primary50 rounded-2xl w-[70%] shadow-lg p-6">
            {/* header */}
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Create Meme</h2>
              <Steps
                // className="text-white"
                current={1}
                items={[
                  {
                    title: "Finished",
                    description,
                  },
                  {
                    title: "In Progress",
                    description,
                  },
                  {
                    title: "Waiting",
                    description,
                  },
                  {
                    title: "Waiting",
                    description,
                  },
                ]}
              />
            </div>

            {/* slect type  */}
            <div className="flex justify-center items-center flex-col space-y-4 my-4">
              <h2 className="text-2xl font-semibold ">Select Meme Type</h2>
              <Select
                size={"middle"}
                defaultValue="a1"
                onChange={handleInputChange}
                style={{ width: "60%" }}
                options={options}
              />
            </div>

            {/* next button */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const memeTypes = createListCollection({
  items: [
    { label: "meme", value: "meme" },
    { label: "meme coin", value: "coin" },
    { label: "NFT", value: "nft" },
  ],
});


{
  /* <form onSubmit={handleSubmit} className="space-y-4">
    



    <div>
      <label htmlFor="tokenName" className="block text-sm font-medium">
        Token Name
      </label>
      <input
        type="text"
        id="_token1Name"
        name="_token1Name"
        value={formData._token1Name}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
        placeholder="Enter token name"
      />
    </div>

  
    <div>
      <label htmlFor="description" className="block text-sm font-medium">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
        placeholder="Enter token description"
      />
    </div>

  
    <div>
      <label htmlFor="tokenName" className="block text-sm font-medium">
        Token Name
      </label>
      <input
        type="text"
        id="tokenName"
        name="tokenName"
        value={formData.tokenName}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
        placeholder="Enter token name"
      />
    </div>

  
    <div>
      <label htmlFor="tokenSymbol" className="block text-sm font-medium">
        Token Symbol
      </label>
      <input
        type="text"
        id="tokenSymbol"
        name="tokenSymbol"
        value={formData.tokenSymbol}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
        placeholder="Enter token symbol"
      />
    </div>

   
    <div>
      <label htmlFor="totalSupply" className="block text-sm font-medium">
        Total Supply
      </label>
      <input
        type="number"
        id="totalSupply"
        name="totalSupply"
        value={formData.totalSupply}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
        placeholder="Enter total supply"
        min="1"
      />
    </div>

    <div>
      <label htmlFor="totalSupply" className="block text-sm font-medium">
        Deadline
      </label>
      <input
        type="date"
        id="deadline"
        name="deadline"
        value={formData.totalSupply}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
        placeholder="Enter total supply"
        min="1"
      />
    </div>

   
    <div className="flex justify-end space-x-2">
      <button
        type="button"
        disabled={loading}
        onClick={() => setIsCreateModalOpen(false)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-black"
      >
        Cancel
      </button>
      <button
        disabled={loading}
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        {loading ? "loading..." : "Submit"}
      </button>
    </div>
  </form>
   */
}
