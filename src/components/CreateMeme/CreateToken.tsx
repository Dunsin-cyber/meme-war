import React from "react";
import { DatePicker, Input, Switch, TimePicker } from "antd";
import { useMemeClient } from "@/context/createMemeContext";
import dayjs from "dayjs";

function CreateToken() {
  const { memeData, setMemeData } = useMemeClient();

  const handleInputChange = (e: any) => {
    setMemeData({ ...memeData, [e.target.name]: e.target.value });
  };

  const handleMilestoneChange = (checked: boolean) => {
    setMemeData({ ...memeData, milestoneBased: checked });
  };

  return (
    <div className="flex justify-center items-center mx-auto my-6 space-y-5 flex-col w-full">
      {" "}
      <h2 className="text-2xl font-semibold ">Create Token</h2>
      <div className="flex justify-between space-x-2 items-center w-[70%]">
        <div className="flex flex-col space-y-3 w-full">
          <p>Token Name</p>
          <Input
            type="text"
            size="large"
            name="tokenName"
            value={memeData.tokenName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <p>Token Symbol</p>
          <Input
            type="text"
            size="large"
            name="tokenSymbol"
            value={memeData.tokenSymbol}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-[70%]">
        <p>Token Description</p>
        <Input
          type="text"
          size="large"
          name="description"
          value={memeData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col space-y-3 w-[70%]">
        <p>Sale Target</p>
        <Input
          type="number"
          size="large"
          name="saleTarget"
          value={memeData.saleTarget}
          onChange={handleInputChange}
        />
      </div>
      {/* <div className="flex flex-col  space-y-3 w-[70%]">
        <p>Milestone Based</p>
        <Switch
          className="w-[5%]"
          value={memeData.milestoneBased}
          onChange={handleMilestoneChange}
        />
      </div> */}
      <div className="flex justify-between space-x-2 items-center w-[70%]">
        <div className="flex flex-col  space-y-3 w-[70%]">
          <p>Duration</p>
          <DatePicker
            name="date"
            size="large"
            onChange={(date, dateString: string) => {
              setMemeData({
                ...memeData,
                date: dateString,
              });
            }}
          />
        </div>
        <div className="flex flex-col space-y-3 ">
          <p>Time</p>
          <TimePicker
            size="large"
            name="time"
            onChange={(time, timeString) => {
              setMemeData({
                ...memeData,
                time: timeString,
              });
            }}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateToken;
