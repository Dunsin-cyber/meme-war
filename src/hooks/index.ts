import React, { useEffect, useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import contractAbi from "@/hooks/abi.json";
import erc20Abi from "@/hooks/erc-20.json"
import bep20Abi from "@/hooks/bep-20.json"
import type { Address } from "viem";
import { config } from "@/utils/wagmi";
import { formatEther } from "viem";
import { useAppDispatch } from "@/redux/hook";
import { addToken1, addToken2 } from "@/redux/slice/TokenSlice";

export const contractAddress = "0xa414e73BA933bEEd29D765D69aDF3737a8504A6B";

type ReturnType = {
  isLoading: boolean;
  data: any;
  error: any;
  refetch?: any;
};

export const useGetTokenBalance = (tokenAddress:`0x${string}`) => {
   const { data, error } = useReadContract({
     abi: erc20Abi,
     address: tokenAddress,
     functionName: "balanceOf",
     args: [tokenAddress]
   });

   return {
     isLoading: !data && !error,
     data: data as any,
     error,
   };
}


export const useGetTokenDetails = (
  tokenIndex: number,
  tokenAddress: `0x${string}`
) => {
  const dispatch = useAppDispatch();

  const { data: name } = useReadContract({
    address: tokenAddress,
    abi: bep20Abi.abi,
    functionName: "name",
  });

  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: bep20Abi.abi,
    functionName: "symbol",
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: bep20Abi.abi,
    functionName: "decimals",
  });

  // UseEffect to dispatch only when the data changes
  useEffect(() => {
    if (typeof name === "string" && typeof symbol === "string") {
      const param = {
        address: tokenAddress,
        name,
        symbol,
      };

      if (tokenIndex === 1) {
        dispatch(addToken1(param));
      } else if (tokenIndex === 2) {
        dispatch(addToken2(param));
      }
    }
  }, [name, symbol, tokenIndex, tokenAddress, dispatch]);

  console.log(`Name: ${name}, Symbol: ${symbol}, Decimals: ${decimals}`);

  return {
    name,
    symbol,
    decimals,
  };
};


export const useGetMemeWars = () => {
  // Fetch data for each item
  const { data, error } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllMemeWars",
  });

  return {
    isLoading: !data && !error,
    data: data as any,
    error,
  };
};

export const useGetMemeTokenWars = () => {
  // Fetch data for each item
  const { data, error } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllMemeTOkenWars",
  });

  return {
    isLoading: !data && !error,
    data: data as any,
    error,
  };
};

export const useGetContentCount = () => {
  const { data, error } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "contentCounter",
    args: [],
    // query: { enabled }, // Prevent fetching if id is invalid
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export const useGetAMemeDetail = (id: any) => {

  const shouldFetch = React.useMemo(() => !!id, [id]); // Only allow fetching if id exists

  const { data, error } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "memeWars",
    args: [id],
    query: { enabled: shouldFetch }, // Prevent fetching if id is invalid
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};


export const useGetAllCampaigns = (): ReturnType => {
  const { data, error, refetch } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllCampaigns",
  });

  return {
    isLoading: !data && !error,
    data,
    error,
    refetch,
  };
};

export const useGetUserProfile = (address: Address | undefined): ReturnType => {
  const { error, data } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getUserProfile",
    args: [address],
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};

export const useGetAllUsers = (): ReturnType => {
  const { data, error } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllUsers",
  });

  return {
    isLoading: !data && !error,
    data,
    error,
  };
};
