"use client";
import React, { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const CreateMemeContext = React.createContext<{
    steps: number;
    setSteps: any;
    data:any;
    setData:any
}>({

    steps: 0,
    setSteps:undefined,
    data:undefined,
    setData:undefined
});

export const useCreateMemeContext = () => {
    const [steps, setSteps] = useState(0);
    const [data, setData] = useState({
      memeType:""
    })

    console.log("data",data)


  return {
    steps, setSteps, data, setData
  };
};

export const CreateMemeContextProvider = ({ children }) => {
  const auth = useCreateMemeContext();
  return <CreateMemeContext.Provider value={auth}>{children}</CreateMemeContext.Provider>;
};

export const useMemeClient = () => useContext(CreateMemeContext);
