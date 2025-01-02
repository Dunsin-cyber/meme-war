"use client";
import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import { pinata } from "@/utils/config";
import { useMemeClient } from "@/context/createMemeContext";
import toast from "react-hot-toast";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadMeme: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState(false);
  const { memeData, setMemeData } = useMemeClient();

  const uploadFile = async (file_: File) => {
    if (!file_) {
      toast.error("No file selected");
      return;
    }

    try {
      setUploading(true);
      console.log("GOT TO UPLOAD FILE TRY BLOCK");
      const keyRequest = await fetch("/api/ipfs");
      const keyData = await keyRequest.json();
      console.log(keyData);
      const upload = await pinata.upload.file(file_).key(keyData.key.JWT);
      const ipfsUrl = await pinata.gateways.convert(upload.IpfsHash);
      setImageUrl(ipfsUrl);
      setMemeData({ ...memeData, memeUrl: ipfsUrl });
      console.log(ipfsUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      toast.error("Trouble uploading file");
    }
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      // return;
    }
    if (info.file.status === "done") {
      console.log("GOT TOinfo.file.status === done");

      const fileData = new FormData();
      const newFile = new File([info.file.originFileObj], info.file.name, {
        type: info.file.type,
      });
      fileData.append("file", newFile);
      setFile(newFile);
      uploadFile(newFile);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default UploadMeme;

// Get this url from response in real world.
// getBase64(info.file.originFileObj as FileType, (url) => {
//   setLoading(false);
//   setImageUrl(url);
//   console.log("url",url)
// });
