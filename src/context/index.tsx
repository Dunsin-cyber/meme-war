"use client";
import React, { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { CreateMemeContextProvider } from "./createMemeContext";

interface DrawerParam {
  title: string;
  body: string;
}

const UserContext = React.createContext<{
  isModalOpen: any;
  setIsModalOpen: any;
  assignId: any;
  activeId: any;
  isCreateModalOpen: any;
  setIsCreateModalOpen: any;
  activePic: any;
  setOpenWithdrawModal:any;
  openWithdrawModal: any;
  userDetails: any;
  setUserDetails:any
}>({
  isModalOpen: undefined,
  setIsModalOpen: undefined,
  assignId: undefined,
  activeId: undefined,
  isCreateModalOpen: undefined,
  setIsCreateModalOpen: undefined,
  activePic: undefined,
  setOpenWithdrawModal:undefined,
  openWithdrawModal: undefined,
  userDetails: undefined,
  setUserDetails: undefined
});

export const useUserContext = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activePic, setActivePic] = useState("");
  const [activeId, setActiveId] = useState<number>(0);
  const [openWithdrawModal,setOpenWithdrawModal] = useState(false);
  const { address } = useAccount();
  const router = useRouter();
    const [userDetails, setUserDetails] = React.useState({
      username: "",
      name: "",
      id: "",
    });

  const assignId = (id: number, pic: string) => {
    setActiveId(id);
    setActivePic(pic);
    setIsModalOpen(true);
  };

  // React.useEffect(() => {
  //   if (address == null) {
  //     router.push("/");
  //   }
  // }, [address]);

  return {
    isModalOpen,
    setIsModalOpen,
    assignId,
    activeId,
    isCreateModalOpen,
    setIsCreateModalOpen,
    activePic,
    setOpenWithdrawModal,
    openWithdrawModal,
    userDetails,
    setUserDetails
  };
};

export const UserContextProvider = ({ children }) => {
  const auth = useUserContext();
  return (
    <UserContext.Provider value={auth}>
      <CreateMemeContextProvider>
      {children}
      </CreateMemeContextProvider>
    </UserContext.Provider>
  );
};

export const useClient = () => useContext(UserContext);
