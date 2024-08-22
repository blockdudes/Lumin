import { defineChain } from "thirdweb";

export const tenderlyEduChain = defineChain({
  id: 1,
  name: "Tenderly Edu",
  nativeCurrency: {
    name: "Tenderly Edu",
    symbol: "ETH",
    decimals: 18,
  },
  rpc: "https://virtual.mainnet.rpc.tenderly.co/fb47656a-9c0a-4215-8df3-f520a29b2548",
});

export const eduChain = defineChain({
  id: 656476,
  name: "Open Campus Codex",
  nativeCurrency: {
    name: "Open Campus Codex",
    symbol: "EDU",
    decimals: 18,
  },
  rpc: "https://open-campus-codex-sepolia.drpc.org	",
});