"use client";
import { tenderlyEduChain, eduChain } from "@/constants/chains";
import { client } from "@/lib/client";
import { useAppSelector } from "@/lib/hooks";
import { useRouter, useParams } from "next/navigation";
import React from "react";
import { ConnectButton, useSwitchActiveWalletChain } from "thirdweb/react";

const ConnectWalletButton = () => {
  const allowedChains = [tenderlyEduChain, eduChain];
  const router = useRouter();
  const marketplaceId = useAppSelector(
    (state) => state.marketplace.marketplace
  )?.id;
  const switchChain = useSwitchActiveWalletChain();

  return (
    <ConnectButton
      client={client}
      theme={"light"}
      chains={allowedChains}
      onConnect={(wallet) => {
        const activeChain = wallet.getChain();
        if (!(activeChain && allowedChains.includes(activeChain))) {
          switchChain(tenderlyEduChain);
        }
      }}
      onDisconnect={() => {
        router.push(`/${marketplaceId}`);
      }}
    />
  );
};

export default ConnectWalletButton;
