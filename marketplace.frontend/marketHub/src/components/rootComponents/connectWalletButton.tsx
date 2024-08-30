"use client";
import { eduChain } from "../../constants/chains";
import { client } from "@/lib/client";
import { useRouter } from "next/navigation";
import React from "react";
import { ConnectButton, useSwitchActiveWalletChain } from "thirdweb/react";

const ConnectWalletButton = () => {
  const allowedChains = [eduChain, eduChain];
  const router = useRouter();
  const switchChain = useSwitchActiveWalletChain();

  return (
    <ConnectButton
      client={client}
      theme={"light"}
      chains={allowedChains}
      onConnect={(wallet) => {
        const activeChain = wallet.getChain();
        if (!(activeChain && allowedChains.includes(activeChain))) {
          switchChain(eduChain);
        }
      }}
      onDisconnect={() => {
        router.push("/");
      }}
    />
  );
};

export default ConnectWalletButton;
