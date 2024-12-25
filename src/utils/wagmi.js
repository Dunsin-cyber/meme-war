import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { opBNBTestnet, bscTestnet } from "wagmi/chains";

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
  appName: "meme war",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    // opBNBTestnet,
    bscTestnet,
    // bleTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [ bscTestnet]
      : []),
  ],
  ssr: true,
});

/* 
- dahboard shows lists of public agents
- manage agents shows list of my agents and allows me to create a new one
- creating/editing an agent, i put in my smart contract 
 - suii fetches functions in my smart contract
 - suii allows you to assign prompt to those functions 
 - you can now integrate suii with your dApp uwing our widget
*/
