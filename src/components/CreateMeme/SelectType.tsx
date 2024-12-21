import { Select } from "antd";
import React from "react";
import { useMemeClient } from "@/context/createMemeContext";

function SelectType() {
  const { data, setData } = useMemeClient();
  return (
    <div>
      <div className="flex justify-center items-center flex-col space-y-4 my-4">
        <h2 className="text-2xl font-semibold ">Select Meme Type</h2>
        <Select
          size={"large"}
          // defaultValue="meme"
          onChange={(value) => {
            console.log(value);
            setData({ ...data, memeType: value });
          }}
          style={{ width: "60%" }}
          options={memeTypes}
        />
      </div>
    </div>
  );
}

export default SelectType;

const memeTypes = [
  { label: "meme", value: "meme" },
  { label: "meme coin", value: "coin" },
  { label: "NFT", value: "nft" },
];
