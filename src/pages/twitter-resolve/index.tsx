import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

function Resolve() {
  const router = useRouter();
  const { state, code } = router.query;

  const handleMe = async () => {
    if (state || code) {
      try {
        const bread = await fetch(
          `/api/twitter-login?state=${state}&code=${code}`
        );
        const data = await bread.json();
        // console.log(data);
        // if (data.error) {
        //   toast.error(data.error);
        //           }
        router.push("/profile");
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    handleMe();
  }, [state, code]);

  return <div className="flex justify-center items-center">resolving...</div>;
}

export default Resolve;
