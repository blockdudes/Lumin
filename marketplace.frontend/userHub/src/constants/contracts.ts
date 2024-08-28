import { client } from "@/lib/client";
import { Chain, getContract } from "thirdweb";

export const contractAddress = "0xa6ed33df93bddbdf811fc1a41c615324c808be0b";

export const contract = (chain: Chain) =>
  getContract({
    client: client,
    address: contractAddress,
    chain: chain,
  });
