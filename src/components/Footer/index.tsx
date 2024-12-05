"use client";
import React from "react";
import { FaXTwitter, FaGithub, FaMedium } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <div className="section flex flex-col md:flex-row justify-evenly items-center mt-8 pb-5 mb-5 gap-5">
      <div className="flex">
        <p className="text-2xl font-medium z-[1000000]">
          Powered by&nbsp;
          <a
            href="#"
            target="_blank"
            rel="Ethena"
            className="text-red-800 font-bold"
          >
            Ethena
          </a>
        </p>
      </div>
      <div className="flex">
        <p className="cursor-pointer">Terms &nbsp;</p>
        <p className="text-primary50 cursor-pointer">and &nbsp;</p>
        <p className="cursor-pointer">Conditions</p>
      </div>
      <div className="flex gap-7 z-[100000]">
        <a href="#" target="_blank" rel="Katana Twitter">
          <FaXTwitter />
        </a>
        <a href="#" target="_blank" rel="Katana Discord">
          <FaDiscord />
        </a>
        <a href="#" target="_blank" rel="Katana Github">
          <FaGithub />
        </a>
        <a href="#" target="_blank" rel="Katana Medium">
          <FaMedium />
        </a>
      </div>
    </div>
  );
}

export default Footer;
