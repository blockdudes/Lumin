import JSZip from "jszip";
import { UserResourceData } from "@/models/userDataModel";
import { connection } from "@/database/connection";
import pinataSDK from "@pinata/sdk";


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
        const thumbnail = data.get("thumbnail") as File;

        const cid = await pinata.pinFileToIPFS(thumbnail);
        const thumbnailUrl = `https://gateway.pinata.cloud/ipfs/${cid}`;

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
            thumbnailUrl,
            resource: buffer
        });

        await newResource.save();

        // const formData = await bufferToFormData(buffer);

        return Response.json({ message: "Resource created successfully" });
    } catch (error) {
        return Response.error();
    }
}


async function bufferToFormData(buffer: Buffer): Promise<FormData> {
    const zip = new JSZip();
    await zip.loadAsync(buffer);

    const formData = new FormData();

    // console.log("zip", Object.entries(zip.files));

    for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
        console.log("1");
        if (!zipEntry.dir) {
            const content = await zipEntry.async('blob');
            // console.log("content", content);
            const pathParts = relativePath.split('/');
            console.log("pathParts", pathParts);

            if (pathParts[2] === 'chapter-data.json') {
                // console.log("chapter-data.json");
                const jsonContent = await content.text();
                console.log(`chapter-${pathParts[1].split('-')[1]}`, jsonContent);
                formData.append(`chapter-${pathParts[1].split('-')[1]}`, jsonContent);
            } else if (pathParts.length === 3) {
                // This is a file entry
                const chapterIndex = pathParts[1].split('-')[1];
                const fileName = pathParts[2];
                formData.append(`files-${chapterIndex}`, new File([content], fileName));
            }
        }
    }

    // console.log("GET", formData.get("chapter-1"));

    return formData;
}