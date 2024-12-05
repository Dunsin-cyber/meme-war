import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

// Define the custom chain directly
export const bleTestnet = {
  id: 52085143, // Chain ID
  name: "Ble Testnet",
  network: "ble-testent",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },

  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.ethena.fi"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ble Testnet Explorer",
      url: "https://testnet.explorer.ethena.fi",
    },
  },
  testnet: true, // Indicates it's a testnet
};

export const config = getDefaultConfig({
  appName: "Katana",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    bleTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [bleTestnet] : []),
  ],
  ssr: true,
});
