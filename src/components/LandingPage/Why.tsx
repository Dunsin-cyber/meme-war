"use client";
import React from "react";
// import Image from '../assets/img/why-img.png'
import Lottie from "lottie-react";
import ICON from "@/components/GIF/arrow.json";

const Why = () => {
  const options = {
    animationData: ICON,
    loop: true,
  };

  // const { View } = useLottie(options);
  return (
    <section className="section">
      <div className="container mx-auto">
        <div
          className="flex flex-col items-center gap-x-8
      lg:flex-row mb-10 py-14"
        >
          {/* image */}
          <div className="order-2 lg:order-1 w-full">
            {/* // data-aos='fade-right'
        // data-aos-offset='400' */}
            <div
              className="flex-1 w-[90%]"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <Lottie animationData={ICON} loop={true} />
            </div>
            {/* <img src={"/img/why-img.png"} className="" /> */}
          </div>
          {/* text */}
          <div className="w-full">
            <h2 className="section-title">Why You Should Join Meme War</h2>
            <p className="section-subtitle">
              Dive into the ultimate meme showdown! Compete in high-stakes
              battles, engage with the community, and win rewards powered by
              blockchain and AI. Showcase your creativity, claim victory, and
              dominate the Meme War arena with ease and fairness.
            </p>
            {/* <a
              href="https://medium.com/@glintfund"
              target="_blank"
              rel="GlintFund Medium"
            > */}
            <button className="btn px-6">Learn more</button>
            {/* </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;
