"use client";
 
import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";
import {
  WalletDisconnectButton,
  WalletMultiButton,
  TipLinkWalletAutoConnectV2
} from '@tiplink/wallet-adapter-react-ui';
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
 
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export default function AppWalletProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        // new UnsafeBurnerWalletAdapter(,),
        new TipLinkWalletAdapter({ 
          title: "Name of Dapp", 
          clientId: "694bf97c-d2ac-4dfc-a786-a001812658df",
          theme: "dark"  // pick between "dark"/"light"/"system"
        }),

      ],
      [network],
    );
   
    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    );
  }