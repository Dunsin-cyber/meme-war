"use client";
import React from "react";
// import Details_ from "@/components/Explore/Details";
import Head from "@/components/Head";
import dynamic from "next/dynamic";
import MemeWarDetails from "@/components/Explore/MemeWarDetails";
import { useRouter } from "next/router";


function Details() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head title="meme war detail" />
      {/* <JoinWar id={id} /> */}
      <MemeWarDetails id={id as string} />
    </div>
  );
}

export default Details;
