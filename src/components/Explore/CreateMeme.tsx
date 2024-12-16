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
import { createListCollection } from "@chakra-ui/react";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

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
        functionName: "uploadContent",
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

  return (
    <div className="relative">
      {/* Modal */}
      {isCreateModalOpen && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-background rounded-lg w-96 shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Create Token</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* title */}
              <div>
                <label
                  htmlFor="tokenName"
                  className="block text-sm font-medium"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                  placeholder="Enter title"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
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

              {/* Metadata URL */}
              <div>
                <label
                  htmlFor="metadataUrl"
                  className="block text-sm font-medium"
                >
                  Meme Type
                </label>
                <SelectRoot collection={undefined}>
                  {/* </SelectTrigger> */}
                  <SelectTrigger>
                    <SelectValueText />
                  </SelectTrigger>
                  <SelectContent>
                    {frameworks.items.map((movie) => (
                      <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </div>

              {/* Token Name */}
              <div>
                <label
                  htmlFor="tokenName"
                  className="block text-sm font-medium"
                >
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

              {/* Token Symbol */}
              <div>
                <label
                  htmlFor="tokenSymbol"
                  className="block text-sm font-medium"
                >
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

              {/* Total Supply */}
              <div>
                <label
                  htmlFor="totalSupply"
                  className="block text-sm font-medium"
                >
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

              {/* Deadline */}
              <div>
                <label
                  htmlFor="totalSupply"
                  className="block text-sm font-medium"
                >
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

              {/* Submit Button */}
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
          </div>
        </div>
      )}
    </div>
  );
}

const frameworks = createListCollection({
  items: [
    { label: "meme", value: "meme" },
    { label: "meme coin", value: "coin" },
    { label: "NFT", value: "nft" },
  ],
});
