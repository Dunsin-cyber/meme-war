"use client";
import React, { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const CreateMemeContext = React.createContext<{
}>({

});

export const useCreateMemeContext = () => {


  return {

  };
};

export const CreateMemeContextProvider = ({ children }) => {
  const auth = useCreateMemeContext();
  return <CreateMemeContext.Provider value={auth}>{children}</CreateMemeContext.Provider>;
};

export const useMemeClient = () => useContext(CreateMemeContext);
