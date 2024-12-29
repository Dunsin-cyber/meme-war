import React from "react";
import { useRouter } from "next/router";

function Resolve() {
  const router = useRouter();
  const { oauth_token } = router.query;

  const handleMe = async () => {
    try {
      const bread = await fetch("/api/twitter-login");
      const data = await bread.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    handleMe();
  }, [oauth_token]);

  return <div className="flex justify-center items-center">resolving...</div>;
}

export default Resolve;
