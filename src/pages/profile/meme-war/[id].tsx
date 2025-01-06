"use client";
import React from "react";
import Head from "@/components/Head";
import MemeWar from "@/components/Profile/MemeWar";
import { useRouter } from "next/router";

function Details() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head title="meme war detail" />
      {/* <JoinWar id={id} /> */}
      <MemeWar id={id as string} />
    </div>
  );
}

export default Details;
