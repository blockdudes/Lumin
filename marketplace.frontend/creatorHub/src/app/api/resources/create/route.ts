import JSZip from "jszip";
import { UserResourceData } from "@/models/userDataModel";
import { connection } from "@/database/connection";
import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new pinataSDK(
  process.env.NEXT_PUBLIC_PINATA_KEY,
  process.env.NEXT_PUBLIC_PINATA_SECRET
);

export const POST = async (req: Request) => {
  try {
    await connection();
    const data = await req.formData();

    const hash = data.get("hash") as string;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const thumbnailFile = data.get("thumbnail") as File;
    const price = data.get("price") as string;
    const category = data.get("category") as string;
    const allowListingAccess = data.get("allowListingAccess") as string;

    console.log("hash", hash);
    console.log("title", title);
    console.log("description", description);
    console.log("price", price);
    console.log("category", category);

    const resource = await UserResourceData.findOne({ hash: hash });
    if (resource) {
      if (
        resource.title === title &&
        resource.category === category &&
        resource.price === price &&
        resource.description === description
      ) {
        return Response.json(
          {
            message: "Resource already exists",
            data: {
              thumbnail_url: resource.thumbnail,
            },
          },
          { status: 200 }
        );
      } else {
        return Response.json({ error: "Duplicate Hash" }, { status: 400 });
      }
    }

    console.log("resource: ", resource);

    console.log("data", Array.from(data.entries()));

    if (!thumbnailFile) {
      return Response.json(
        { error: "Thumbnail file is missing" },
        { status: 400 }
      );
    }

    const arrayBufferImg = await thumbnailFile.arrayBuffer();
    const bufferImg = Buffer.from(arrayBufferImg);

    const readableStream = new Readable();
    readableStream.push(bufferImg);
    readableStream.push(null);

    const options = {
      pinataMetadata: {
        name: thumbnailFile.name || "thumbnail",
      },
    };

    const result = await pinata.pinFileToIPFS(readableStream, options);
    const thumbnailUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;

    // const zip = new JSZip();
    // const chaptersFolder = zip.folder("chapters");
    // if (!chaptersFolder) {
    //   return Response.json({ error: 'Failed to create chapters folder in zip' }, { status: 500 });
    // }
    // const chapterData: { [key: string]: any } = {};
    // const chapterFiles: { [key: string]: File } = {};

    // pinata

    let chaptersPinata: { [key: string]: { file?: string; type?: string } } =
      {};

    for (let [key, value] of Array.from(data.entries())) {
      const chapterPinataData = {}; // PINATA
      let newFile: File | null = null;

      if (key.startsWith("chapter-")) {
        const chapterIndex = key.split("-")[1];
        // chapterData[chapterIndex] = JSON.parse(value as string);

        if (!chaptersPinata[`chapter-${chapterIndex}`]) {
          chaptersPinata[`chapter-${chapterIndex}`] = {};
        }

        // PINATA
        // const chapterJsonDataResult = await pinata.pinJSONToIPFS(JSON.parse(value as string));
        // console.log("chapterJsonDataResult", `https://gateway.pinata.cloud/ipfs/${chapterJsonDataResult.IpfsHash}`);
        // console.log("chapterIndex", chaptersPinata[`chapter-${chapterIndex}`]['content']);
        chaptersPinata[`chapter-${chapterIndex}`] = JSON.parse(value as string);
      } else if (key.startsWith("files-")) {
        console.log("FILE: ", value);
        const fileIndex = key.split("-")[1];
        // chapterFiles[fileIndex] = value as File;

        if (!chaptersPinata[`chapter-${fileIndex}`]) {
          chaptersPinata[`chapter-${fileIndex}`] = {};
        }

        if ((value as File).type === "text/html") {
          console.log("HTML FILE: ");
          const htmlContent = await (value as File).text();
          newFile = new File([htmlContent], "content.txt", {
            type: "text/plain",
          });

          console.log("NEW FILE: ", newFile);
        }

        // PINATA
        // const filePinataDataResult = await pinata.pinFileToIPFS(value as File);
        // chaptersPinata[`chapter${fileIndex}`] = { file: `https://gateway.pinata.cloud/ipfs/${filePinataDataResult.IpfsHash}` };

        if (newFile) {
          value = newFile;
        }

        const arrayBufferImg = await (value as File).arrayBuffer();
        const bufferImg = Buffer.from(arrayBufferImg);

        const readableStream = new Readable();
        readableStream.push(bufferImg);
        readableStream.push(null);

        const options = {
          pinataMetadata: {
            name: (value as File).name || "file",
          },
        };

        const fileResult = await pinata.pinFileToIPFS(readableStream, options);
        chaptersPinata[
          `chapter-${fileIndex}`
        ].file = `https://gateway.pinata.cloud/ipfs/${fileResult.IpfsHash}`;
        chaptersPinata[`chapter-${fileIndex}`].type = (value as File).type;
      }
    }
    // for (const [index, data] of Object.entries(chapterData)) {
    //   const chapterFolder = chaptersFolder.folder(`chapter-${index}`);
    //   if (!chapterFolder) {
    //     return Response.json({ error: `Failed to create folder for chapter-${index}` }, { status: 500 });
    //   }
    //   chapterFolder.file('chapter-data.json', JSON.stringify(data, null, 2));
    //   const file = chapterFiles[index];
    //   // const type = FileTypes[index];
    //   // console.log("file http: ", file);
    //   if (file) {
    //     chapterFolder.file("type", file.type);
    //     const arrayBuffer = await file.arrayBuffer();
    //     chapterFolder.file(file.name, arrayBuffer);
    //   }
    // }
    // const zipBlob = await zip.generateAsync({ type: "blob" });
    // const arrayBuffer = await zipBlob.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    // console.log(buffer);

    console.log("chaptersPinata", chaptersPinata);

    const newResource = await UserResourceData.create({
      hash,
      title,
      description,
      price,
      category,
      allowListingAccess,
      thumbnail: thumbnailUrl,
      resource: chaptersPinata,
    });
    console.log("newResource: ", newResource);

    // await newResource.save();

    console.log("thumbnailUrl", thumbnailUrl);

    return Response.json(
      {
        message: "Resource created successfully",
        data: {
          thumbnail_url: thumbnailUrl,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return Response.error();
  }
};
