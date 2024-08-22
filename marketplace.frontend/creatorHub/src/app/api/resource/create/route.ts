import JSZip from "jszip";
import { UserResourceData } from "@/models/userDataModel";
import { connection } from "@/database/connection";
import pinataSDK from "@pinata/sdk";
import { Readable } from 'stream';


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

        if (!thumbnailFile) {
            return Response.json({ error: "Thumbnail file is missing" }, { status: 400 });
        }

        const arrayBufferImg = await thumbnailFile.arrayBuffer();
        const bufferImg = Buffer.from(arrayBufferImg);

        const readableStream = new Readable();
        readableStream.push(bufferImg);
        readableStream.push(null);

        const options = {
            pinataMetadata: {
                name: thumbnailFile.name || "thumbnail"
            }
        };

        const result = await pinata.pinFileToIPFS(readableStream, options);
        const thumbnailUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;

        const zip = new JSZip();
        const chaptersFolder = zip.folder("chapters");
        if (!chaptersFolder) {
            return Response.json({ error: 'Failed to create chapters folder in zip' }, { status: 500 });
        }
        const chapterData: { [key: string]: any } = {};
        const chapterFiles: { [key: string]: File } = {};
        for (const [key, value] of Array.from(data.entries())) {
            if (key.startsWith("chapter-")) {
                const chapterIndex = key.split('-')[1];
                chapterData[chapterIndex] = JSON.parse(value as string);
            } else if (key.startsWith("files-")) {
                const fileIndex = key.split('-')[1];
                chapterFiles[fileIndex] = value as File;
            }
        }
        for (const [index, data] of Object.entries(chapterData)) {
            const chapterFolder = chaptersFolder.folder(`chapter-${index}`);
            if (!chapterFolder) {
                return Response.json({ error: `Failed to create folder for chapter-${index}` }, { status: 500 });
            }
            chapterFolder.file('chapter-data.json', JSON.stringify(data, null, 2));
            const file = chapterFiles[index];
            if (file) {
                const arrayBuffer = await file.arrayBuffer();
                chapterFolder.file(file.name, arrayBuffer);
            }
        }
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const arrayBuffer = await zipBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(buffer);


        const resource = await UserResourceData.findOne({ hash: hash });
        if (resource) {
            return Response.json({ error: "Resource already exists" }, { status: 400 });
        }

        const newResource = new UserResourceData({
            hash,
            title,
            description,
            thumbnail: thumbnailUrl,
            resource: "0x"
        });

        await newResource.save();
        return Response.json({ message: "Resource created successfully" });
    } catch (error) {
        console.log("error", error);
        return Response.error();
    }
}