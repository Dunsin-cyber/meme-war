"use client";
import React from "react";
// import Details_ from "@/components/Explore/Details";
import Head from "@/components/Head";
import dynamic from "next/dynamic";
import JoinWar from "@/components/JoinWar"


function Details() {
  return (
    <div>
      <Head title="Join War" />
      <JoinWar />
    </div>
  );
}

export default Details;
