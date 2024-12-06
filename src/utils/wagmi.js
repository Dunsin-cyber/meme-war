import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { opBNBTestnet, bscTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Suii",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    opBNBTestnet,
    bscTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [opBNBTestnet, bscTestnet]
      : []),
  ],
  ssr: true,
});
