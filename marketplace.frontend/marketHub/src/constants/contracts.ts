import { client } from "@/lib/client";
import { Chain, getContract } from "thirdweb";

export const contractAddress = "0x68B253D7D1E78d96328A1165991Af5508D46BD18";

export const contract = (chain: Chain) =>
  getContract({
    client: client,
    address: contractAddress,
    chain: chain,
  });
