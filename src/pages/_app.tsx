import "@/styles/globals.css"; // Import global CSS
import WalletProvider from "@/utils/index"; // Wrap with context
import { Provider } from "@/components/ui/provider";
import { UserContextProvider } from "@/context";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "@/utils/wagmi";
import Head from "next/head";
import React from "react";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

import { ConfigProvider, theme } from "antd";

import localFont from "next/font/local";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  return (
    <Provider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimaryActive: "#fc923b",
            colorPrimary: "#fc923b",
            colorPrimaryHover: "#fc923b",
            colorText: "#fff",
          },
        }}
      >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <WalletProvider>
              <Toaster />
              <UserContextProvider>
                <div
                  className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
                >
                  <Component {...pageProps} />
                  <ProgressBar
                    height="4px"
                    color="#2497D0"
                    options={{ showSpinner: false }}
                    shallowRouting
                  />
                </div>
              </UserContextProvider>
            </WalletProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
