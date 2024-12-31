import React, { useEffect, useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import contractAbi from "@/hooks/abi.json";
import erc20Abi from "@/hooks/erc-20.json"
import type { Address } from "viem";
import { config } from "@/utils/wagmi";
import { formatEther } from "viem";

export const contractAddress = "0x6eebBa28dBb953E5E0976f368777dDbcb69B0E14";

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

export const useBuyToken = () => {

}

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
