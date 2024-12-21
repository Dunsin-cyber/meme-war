import React from 'react'
import {
  ConfigProvider,
  DatePicker,
  DatePickerProps,
  Input,
  InputRef,
  Select,
  Tag,
  theme,
} from "antd";

function CreateMeme() {
  return (
    <div className="flex justify-center items-center mx-auto my-6 space-y-5 flex-col w-full">
      {" "}
      <h2 className="text-2xl font-semibold ">Create Meme</h2>
      <div className="flex flex-col   space-y-3 w-[70%]">
        <p>Meme Name</p>
        <Input
          // ref={inputRef}
          type="text"
          size="large"   
          // value={inputValue}
          // onChange={handleInputChange}
          // onBlur={handleInputConfirm}
          // onPressEnter={handleInputConfirm}
        />
      </div>
      <div className="flex flex-col space-y-3 w-[70%]">
        <p>url</p>
        <Input
          // ref={inputRef}
          type="text"
          size="large"
          // value={inputValue}
          // onChange={handleInputChange}
          // onBlur={handleInputConfirm}
          // onPressEnter={handleInputConfirm}
        />
      </div>
      <div className="flex flex-col  space-y-3 w-[70%]">
        <p>milestone</p>
        <Input
          // ref={inputRef}
          type="text"
          size="large"
          // value={inputValue}
          // onChange={handleInputChange}
          // onBlur={handleInputConfirm}
          // onPressEnter={handleInputConfirm}
        />
      </div>
    </div>
  );
}

export default CreateMeme