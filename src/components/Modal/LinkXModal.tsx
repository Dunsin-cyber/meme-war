import React from "react";
import { Alert, Button, Modal } from "antd";
import { useClient } from "@/context/index";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { FaXTwitter } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

function LinkXModal() {
  const { openXModal, setOpenXModal } = useClient();
  const [loading, setLoading] = React.useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const router = useRouter();
  const pathname = router.pathname;
  const [xLoading, setXLoading] = React.useState(false);

  const showLoading = () => {
    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const userDetails = useAppSelector((state) => state.profile);

  const handleToggle = () => {
    setOpenXModal(true);
  };

  //TODO: check for X cookie here, check if it exist and still valid
  React.useEffect(() => {
    const xname = localStorage.getItem("xname");
    if (
      !xname &&
      pathname.length > 1 &&
      pathname &&
      !pathname.includes("profile") &&
      !pathname.includes("resolve")
    ) {
      handleToggle();
    }
  }, [pathname]);

  const handleGetAuthLink = async () => {
    try {
      setXLoading(true);
      if (userDetails) {
        handleLogout();
        return;
      }
      const data = await fetch("/api/twitter-auth-link");
      const url = await data.json();
      if (url.error) {
        toast.error(url.error);
        return;
      }
      window.open(url.name);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setXLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setXLoading(true);
      const data = await fetch("/api/twitter-logout");
      const data_ = await data.json();
      if (data_.error) {
        toast.error(data_.error);
        return;
      }
      console.log(data_);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setXLoading(false);
      // setOpenPINModal(false);
    }
  };

  React.useEffect(() => {
    showLoading();
  }, []);
  return (
    <>
      <Modal
        title={<p>Link X Account</p>}
        loading={loading}
        open={openXModal}
        onCancel={() => setOpenXModal(false)}
        footer={
          //   <Button type="primary" onClick={showLoading}>
          //     Cancel
          //   </Button>
          <div className="my-5">
            <Alert
              message={`You can always link and unlink your X account under profile page`}
              type="info"
              showIcon
              closable
            />
          </div>
        }
      >
        <div
          className="btn flex justify-center items-center my-7 px-6 bg-blue-700"
          onClick={handleGetAuthLink}
        >
          {xLoading ? (
            <p>
              {userDetails?.username?.length > 1
                ? "unlinking..."
                : "connecting..."}
            </p>
          ) : (
            <div className="cursor-pointer flex space-x-2 justify-center items-center">
              {userDetails?.username?.length > 1 ? (
                <div className="cursor-pointer flex space-x-2 justify-center items-center">
                  <p>Unlink </p> <FaXTwitter />
                </div>
              ) : (
                <div className="cursor-pointer flex space-x-2 justify-center items-center">
                  <p>Link </p> <FaXTwitter />
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default LinkXModal;
