import { client } from "@/lib/client";
import { Chain, getContract } from "thirdweb";

export const contractAddress = "0x343F0c794d0fba5678665Fc8523bc06e096DED18";

export const contract = (chain: Chain) =>
  getContract({
    client: client,
    address: contractAddress,
    chain: chain,
  });
