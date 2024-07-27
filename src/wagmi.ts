"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { Transport, Chain } from "viem";
import { createConfig, http } from "wagmi";


const coreChain: Chain = {
  id: 1115,
  name: 'Core Blockchain',
  nativeCurrency: {
    name: 'TCORE',
    symbol: 'TCORE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test.btcs.network'],
    },
  },
  blockExplorers: {
    default: { name: 'Core Explorer', url: 'https://scan.test.btcs.network' },
  },
  testnet: true,
};

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!walletConnectProjectId) {
  throw new Error(
    "WalletConnect project ID is not defined. Please check your environment variables.",
  );
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        // walletConnectWallet,
        ledgerWallet,
        rabbyWallet,
        coinbaseWallet,
        argentWallet,
        safeWallet,
      ],
    },
  ],
  { appName: "TokenTreat", projectId: walletConnectProjectId },
);

// Fix missing icons

const transports: Record<number, Transport> = {
  [coreChain.id]: http(),
};

export const wagmiConfig = createConfig({
  chains: [coreChain],
  connectors,
  transports,
  ssr: true,
});
