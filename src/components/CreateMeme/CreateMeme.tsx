import React from "react";
import { Input, Upload } from "antd";
import { useMemeClient } from "@/context/createMemeContext";
import UploadMeme from "./UploadMeme";
import toast from "react-hot-toast";

const { TextArea } = Input;

function CreateMeme() {
  const { memeData, setMemeData } = useMemeClient();

  const handleInputChange = (e: any) => {
    setMemeData({ ...memeData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center mx-auto my-6 space-y-5 flex-col w-full">
      {" "}
      <h2 className="text-2xl font-semibold ">Create Meme</h2>
      <div className="flex justify-between space-x-2 items-center w-[70%]">
        <div className="flex flex-col   space-y-3 w-full">
          <p>Meme Name</p>
          <Input
            // ref={inputRef}
            name="memeName"
            type="text"
            size="large"
            value={memeData.memeName}
            onChange={handleInputChange}
            // onBlur={handleInputConfirm}
            // onPressEnter={handleInputConfirm}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <p>Point Target</p>
          <Input
            type="text"
            size="large"
            name="pointTarget"
            value={memeData.pointTarget}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-[70%]">
        <p>meme</p>
        <UploadMeme />
      </div>
      <div className="flex flex-col  space-y-3 w-[70%]">
        <p>milestone</p>
        <TextArea
          // ref={inputRef}
          name="milestone"
          autoSize={{ minRows: 4, maxRows: 8 }}
          value={memeData.milestone}
          onChange={handleInputChange}
          // onBlur={handleInputConfirm}
          // onPressEnter={handleInputConfirm}
        />
      </div>
    </div>
  );
}

export default CreateMeme;
