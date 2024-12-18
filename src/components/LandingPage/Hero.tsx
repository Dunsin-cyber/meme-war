"use client";
import React from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import Navbar from "../Navbar/Nav2";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import Lottie from "lottie-react";
import ICON from "@/components/GIF/home-icon.json";

function Hero() {
  const router = useRouter();
  const words_ = ["Compete", "Stake", "Claim"];

  const options = {
    animationData: ICON,
    loop: true,
  };

  //"Unleash Your Meme Power: Battle, Engage, and Win Big in the Ultimate Meme War Arena!"
  // const { View } = useLottie(options);
  return (
    <section className="">
      <BackgroundBeams />
      <div className="container mx-auto">
        <Navbar />
        <div className="flex flex-col items-center lg:flex-row mt-[30px]">
          <div className="flex-1 z-40">
            {/* badge text */}

            {/* title */}
            <h1
              className="text-[32px] lg:text-[48px] font-bold leading-tight mb-6"
              data-aos="fade-down"
              data-aos-delay="500"
            >
              Unleash Your Meme Power:
              <span className="text-[#A52A2A]"> Battle </span>
              Engage, and Win Big in the Ultimate
              <span className="text-[#A52A2A]"> Meme War Arena!</span>
            </h1>
            <div
              className="max-w-[440px] text-[16px] lg:text-[24px] leading-relaxed mb-8"
              data-aos="fade-down"
              data-aos-delay="600"
            >
              Where Memes Collide:
              <FlipWords className="text-[#A52A2A]" words={words_} />
              Your Victory!
            </div>
            <button
              className="btn gap-x-6 pl-6 text-sm lg:h-16 lg:text-base z-50"
              data-aos="fade-down"
              data-aos-delay="700"
              onClick={() => {
                router.push("/explore");
              }}
            >
              Get Started
              <IoIosArrowDroprightCircle className="text-2xl lg:text-3xl" />
            </button>
          </div>
          {/* Hero image */}
          <div
            className="flex-1 w-[90%]"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Lottie animationData={ICON} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
