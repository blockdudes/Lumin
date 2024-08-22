import { client } from "@/lib/client";
import { Chain, getContract } from "thirdweb";

export const contractAddress = "0x882c2CD68ECCC33f1148a83871E803B54ebDAF2f";

export const contract = (chain: Chain) =>
  getContract({
    client: client,
    address: contractAddress,
    chain: chain,
  });
