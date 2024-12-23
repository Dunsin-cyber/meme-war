"use client";
import React, { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const CreateMemeContext = React.createContext<{
    steps: number;
    setSteps: any;
    memeData:any;
    setMemeData:any
}>({

    steps: 0,
    setSteps:undefined,
    memeData:undefined,
    setMemeData:undefined
});

export const useCreateMemeContext = () => {
    const [steps, setSteps] = useState(0);
    const [memeData, setMemeData] = useState({
      memeType:"",
      memeName:"",
      memeUrl: "",
      milestone:"",
      tokenName: "",
      tokenSymbol: "",
      milestoneBased: false,
      deadline: "",
      memeId: ""

    })

    console.log("memeData",memeData)


  return {
    steps, setSteps, memeData, setMemeData
  };
};

export const CreateMemeContextProvider = ({ children }) => {
  const auth = useCreateMemeContext();
  return <CreateMemeContext.Provider value={auth}>{children}</CreateMemeContext.Provider>;
};

export const useMemeClient = () => useContext(CreateMemeContext);
