import React from "react";
import { useClient } from "@/context/index";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Input, createListCollection } from "@chakra-ui/react";


function WithdrawModal() {
  const { setOpenWithdrawModal, openWithdrawModal } = useClient();

  return (
    <div className="relative">
      {openWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-[#110b09] to-[#080202] text-white rounded-lg shadow-lg w-[90%] max-w-lg max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex justify-center my-5">
              <h2 className="font-semibold text-secondary50">
                Choose Token to Withdraw
              </h2>
            </div>
            {/* select token to withdraw */}

              <div className="flex">
              Token 
              <SelectRoot collection={undefined}>
                <SelectLabel />
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

            {/* buttons */}
            <div className="flex space-x-3 justify-end">
              <button
                className="btn px-6 bg-gray-500 text-black"
                onClick={() => setOpenWithdrawModal(false)}
              >
                Close
              </button>
              <button
                className="btn px-6 "
                onClick={() => setOpenWithdrawModal(false)}
              >
                withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WithdrawModal;

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
