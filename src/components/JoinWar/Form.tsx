"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/components/lib/utils";
import UploadPic from "@/components/CreateMeme/UploadMeme";
import { useAccount, useWriteContract, useConnect } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { config } from "../../utils/wagmi";
import { injected } from "wagmi/connectors";
import contractAbi from "@/hooks/abi.json";
import { contractAddress } from "@/hooks";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useMemeClient } from "@/context/createMemeContext";
import { useForm } from "react-hook-form";

export function Form({ id }: { id: number }) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const { address, chainId } = useAccount();
  const { data, error, writeContractAsync } = useWriteContract({
    config,
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { memeData, setMemeData } = useMemeClient();
  const { connectAsync } = useConnect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateMeme = async (data: any) => {
    if (memeData.memeUrl.length < 10) {
      toast.error("upload a meme pic");
      return;
    }
    if (!address) {
      await connectAsync({
        connector: injected(),
      });
    }

    try {
      const post = {
        title: data.name + "(FROM MEME WAR)",
        option: data.symbol,
        option2: "VOTE AGAINST ME",
      };
      const url = await handlePostOnX(post);

      setLoading(true);
      await writeContractAsync({
        chainId: bscTestnet.id,
        address: contractAddress,
        functionName: "acceptMemeWar",
        abi: contractAbi,
        args: [id, data.name, data.symbol, memeData.memeUrl, url],
        chain: undefined,
        account: address,
      });
      setLoading(false);
      toast.success("joined successfully");
      router.push("/explore");
    } catch (err) {
      toast.error(err.message);
      console.log("[ERROR JOINING MEME]", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostOnX = async (param: any) => {
    try {
      const username = localStorage.getItem("xname");

      const createPost = await fetch("/api/post-tweet", {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await createPost.json();
      if (data.error) {
        toast.error(data.error);
        toast.error("Please link your X account before creating a meme");
        throw new Error();
      }
      toast.success("meme created on twitter");
      console.log(data);
      const url = `https://x/com/${username}/status/${data?.data?.id}`;
      // setMemeData({...memeData, meme2Twitter: url })
      return url;
    } catch (err) {
      toast.error(err.message);
      console.log("[ERROR POSTING MEME ON X]", err);
    }
  };
  return (
    <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Join 🆚
      </h2>
      {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p> */}

      <form className="my-8 " onSubmit={handleSubmit(handleCreateMeme)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Name</Label>
            <Input
              className={`my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-[#fc923b]  bg-[#141414] border-solid border rounded-[6px] flex  ${
                errors.name ? "border-9 border-red-700" : "border-[#595959]"
              }`}
              id="firstname"
              placeholder="floki meme"
              type="text"
              {...register("name", { required: true })}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="lastname">Symbol</Label>
          <Input
            className={`my-4 items-center pr-8 pl-2 h-[2rem] border-[#595959] hover:border-[#fc923b]  bg-[#141414] border-solid border rounded-[6px] flex  ${
              errors.symbol ? "border-9 border-red-700" : "border-[#595959]"
            }`}
            id="lastname"
            placeholder="AXN"
            type="text"
            {...register("symbol", { required: true })}
          />
        </LabelInputContainer>

        <LabelInputContainer className="my-4">
          <UploadPic />
        </LabelInputContainer>

        {/* <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Total Supply</Label>
          <Input id="email" placeholder="0" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">X Handle</Label>
          <Input id="password" placeholder="https://x.xom.mmm" type="text" />
        </LabelInputContainer> */}
        {/* <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">unknown</Label>
          <Input
            id="twitterpassword"
            placeholder="••••••••"
            type="twitterpassword"
          />
        </LabelInputContainer> */}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            "loading..."
          ) : (
            <div>
              Join
              <BottomGradient />
            </div>
          )}
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        {/* 
        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
