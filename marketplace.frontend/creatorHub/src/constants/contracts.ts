import { client } from "@/lib/client";
import { Chain, getContract } from "thirdweb";

export const contractAddress = "0x48adf8Da7dF6Ab6f353BA90Ec58Cf148aebAAC14";

export const contract = (chain: Chain) =>
  getContract({
    client: client,
    address: contractAddress,
    chain: chain,
  });
