import React from "react";
import Head from "next/head";

function index({ title }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Meme War - {title}</title>
      </Head>
    </div>
  );
}

export default index;
