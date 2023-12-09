"use client";
import { NextUIProvider } from "@nextui-org/react";
import React from "react";
import { ThemeProvider } from "./providers/nexttheme";
import "@rainbow-me/rainbowkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";

import { LightNodeProvider, ContentPairProvider } from "@waku/react";
import { Protocols } from "@waku/interfaces";
// Set the Light Node options
const NODE_OPTIONS = { defaultBootstrap: true };

import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  Locale,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygon,

    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [polygon] : []),
  ],
  [publicProvider()]
);

const projectId = process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID || "none";

const { wallets } = getDefaultWallets({
  appName: "Prize Loans - PoolTogether x SuperFluid",
  projectId,
  chains,
});
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);
const demoAppInfo = {
  appName: "Prize Loans - PoolTogether x SuperFluid",
};
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function Provider({ children }: { children: React.ReactNode }) {
  const CONTENT_TOPIC = "/toy-chat/2/huilong/proto";
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        <NextUIProvider>
          <LightNodeProvider
            options={{ defaultBootstrap: true }}
            protocols={[Protocols.Store, Protocols.Filter, Protocols.LightPush]}
          >
            <ContentPairProvider contentTopic={CONTENT_TOPIC}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {mounted && children}
              </ThemeProvider>
            </ContentPairProvider>
          </LightNodeProvider>
        </NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
