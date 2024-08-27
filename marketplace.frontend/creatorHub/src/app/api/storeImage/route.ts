import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new pinataSDK(
  process.env.NEXT_PUBLIC_PINATA_KEY,
  process.env.NEXT_PUBLIC_PINATA_SECRET
);

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const imageFile = data.get("image") as File;

    if (!imageFile) {
      return Response.json({ error: "image file is missing" }, { status: 400 });
    }

    const arrayBufferImg = await imageFile.arrayBuffer();
    const bufferImg = Buffer.from(arrayBufferImg);

    const readableStream = new Readable();
    readableStream.push(bufferImg);
    readableStream.push(null);

    const options = {
      pinataMetadata: {
        name: imageFile.name || "image",
      },
    };

    const result = await pinata.pinFileToIPFS(readableStream, options);
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;

    return Response.json({ data: imageUrl }, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
