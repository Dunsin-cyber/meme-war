"use client";
import React from "react";
// import Details_ from "@/components/Explore/Details";
import Head from "@/components/Head";
import dynamic from "next/dynamic";

const Details_ = dynamic(() => import("../../components/Explore/Details"), {
  ssr: false,
});

function Details() {
  return (
    <div>
      <Head title="Details" />
      <Details_ />
    </div>
  );
}

export default Details;
