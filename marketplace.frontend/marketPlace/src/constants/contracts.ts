import { client } from "@/lib/client";
import { Chain, getContract } from "thirdweb";

export const contractAddress = "0xcFBb8EDAC3560E3dfe68D5e6eB00329C48caeeaa";

export const contract = (chain: Chain) =>
  getContract({
    client: client,
    address: contractAddress,
    chain: chain,
  });
