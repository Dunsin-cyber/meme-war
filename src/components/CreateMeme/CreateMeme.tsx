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
    <div className="flex justify-center mx-auto my-6 space-y-5 flex-col">
      {" "}
      <div className="flex flex-col space-y-3 w-full">
        <p>Meme Name</p>
        <Input
          // ref={inputRef}
          type="text"
          size="large"
          style={{ width: "70%" }}
          // value={inputValue}
          // onChange={handleInputChange}
          // onBlur={handleInputConfirm}
          // onPressEnter={handleInputConfirm}
        />
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <p>url</p>
        <Input
          // ref={inputRef}
          type="text"
          size="large"
          style={{ width: "70%" }}
          // value={inputValue}
          // onChange={handleInputChange}
          // onBlur={handleInputConfirm}
          // onPressEnter={handleInputConfirm}
        />
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <p>milestone</p>
        <Input
          // ref={inputRef}
          type="text"
          size="large"
          style={{ width: "70%" }}
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