"use client";
import React from "react";
// import Details_ from "@/components/Explore/Details";
import Head from "@/components/Head";
import dynamic from "next/dynamic";
import JoinWar from "@/components/JoinWar"
import { useRouter } from "next/router";

// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params!; // Get the 'id' from the URL

//   return {
//     props: { id },
//   };
// };



function Details() {
    const router = useRouter();
    const { id } = router.query;

  return (
    <div>
      <Head title="Join War" />
      {/* <JoinWar id={id} /> */}
            <JoinWar id={id as string} />

    </div>
  );
}

export default Details;


