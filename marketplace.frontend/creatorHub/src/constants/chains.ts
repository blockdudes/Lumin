import { defineChain } from "thirdweb";

export const tenderlyEduChain = defineChain({
  id: 5555,
  name: "Tenderly Edu",
  nativeCurrency: {
    name: "Tenderly Edu",
    symbol: "ETH",
    decimals: 18,
  },
  rpc: "https://virtual.mainnet.rpc.tenderly.co/710c35dd-84e9-400a-9f54-7317aeedcdc6",
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