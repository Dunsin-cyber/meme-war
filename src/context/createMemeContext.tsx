"use client";
import React, { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const CreateMemeContext = React.createContext<{
    steps: number;
    setSteps: any;
}>({

    steps: 0,
    setSteps:undefined
});

export const useCreateMemeContext = () => {
    const [steps, setSteps] = useState(0);


  return {
    steps, setSteps
  };
};

export const CreateMemeContextProvider = ({ children }) => {
  const auth = useCreateMemeContext();
  return <CreateMemeContext.Provider value={auth}>{children}</CreateMemeContext.Provider>;
};

export const useMemeClient = () => useContext(CreateMemeContext);
