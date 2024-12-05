import React, { useEffect, useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import contractAbi from "@/hooks/abi.json";
import type { Address } from "viem";
import { config } from "@/utils/wagmi";

export const contractAddress = "0x86C41594e9aDeCcf8c85ba9EEe0138C7c9E70dBc";

type ReturnType = {
  isLoading: boolean;
  data: any;
  error: any;
  refetch?: any;
};

export const useGetContents = () => {
  // Fetch data for each item
  const { data, error } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "getAllTheContents",
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

export const useGetACampaign = (id: any) => {
  console.log("--calling--");

  const shouldFetch = React.useMemo(() => !!id, [id]); // Only allow fetching if id exists

  const { data, error } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: "campaigns",
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
