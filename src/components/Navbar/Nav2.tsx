"use client";
import React from "react";
import Logo from "../Logo";
import { useRouter } from "next/navigation";

function Nav2() {
  const router = useRouter();

  return (
    <div className="flex justify-between pt-6">
      <div className="flex">
        <p className="text-2xl  font-extrabold">
          <Logo />
        </p>
      </div>
      <div className="hidden md:flex gap-12 items-center justify-center z-[20]">
        <button
          onClick={() => {
            router.push("/connect-wallet");
          }}
          className="btn"
        >
          Home
        </button>
        <a href="#" target="_blank" rel="GlintFund Medium">
          <p className="cursor-pointer">Learn</p>
        </a>
        <a href="#" target="_blank" rel="GlintFund Discord">
          <p className="cursor-pointer">Community</p>
        </a>
        <a href="#" target="_blank" rel="GlintFund Twitter">
          <p className="cursor-pointer">Support</p>
        </a>
      </div>
    </div>
  );
}

export default Nav2;
