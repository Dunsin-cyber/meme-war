"use client";
import React from "react";
import Head from "@/components/Head";
import CreatedWar from "@/components/Profile/CreatedWar";
import { useRouter } from "next/router";

function Details() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head title="created war detail" />
      {/* <JoinWar id={id} /> */}
      <CreatedWar id={id as string} />
    </div>
  );
}

export default Details;
