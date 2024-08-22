import { connection } from "@/database/connection";
import { UserResourceData } from "@/models/userDataModel";
import JSZip from "jszip";

export const GET = async (req: Request, { params }: { params: { hash: string } }) => {
    try {
        await connection();
        console.log("params", params.hash);
        const resource = await UserResourceData.findOne({ hash: params.hash });
        console.log("resource", resource);
        if (!resource) {
            return Response.json({ error: "Resource not found" }, { status: 404 });
        }

        const formData = await bufferToFormData(resource.resource);
        const responseData = await formDataToResponseData(formData);

        const data = {
            title: resource.title,
            description: resource.description,
            thumbnail: resource.thumbnail,
            chapters: responseData
        }

        return Response.json({
            message: "Resource Decoded successfully",
            data: data
        });
    } catch (error) {
        return Response.error();
    }
}

async function bufferToFormData(buffer: Buffer): Promise<FormData> {
    const zip = new JSZip();
    await zip.loadAsync(buffer);
    const formData = new FormData();
    for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
        if (!zipEntry.dir) {
            const content = await zipEntry.async('blob');
            const pathParts = relativePath.split('/');
            if (pathParts[2] === 'chapter-data.json') {
                const jsonContent = await content.text();
                formData.append(`chapter-${pathParts[1].split('-')[1]}`, jsonContent);
            } else if (pathParts.length === 3) {
                const chapterIndex = pathParts[1].split('-')[1];
                const fileName = pathParts[2];
                const contentt = new File([content], fileName);
                formData.append(`files-${chapterIndex}`, new File([content], fileName));
            }
        }
    }
    return formData;
}

// async function formDataToResponseData(formData: FormData): Promise<any[]> {
//     const tempData: { [key: string]: any } = {};

//     for (const [key, value] of Array.from(formData.entries())) {
//         const [type, index] = key.split('-');
//         if (!tempData[index]) tempData[index] = {};

//         if (type === 'chapter') {
//             tempData[index][`chapter-${index}`] = JSON.parse(value as string);
//         } else if (type === 'files') {
//             const file = value as File;
//             const arrayBuffer = await file.arrayBuffer();
//             const base64 = Buffer.from(arrayBuffer).toString('base64');
//             tempData[index][`file-${index}`] = {
//                 name: file.name,
//                 size: file.size,
//                 type: file.type,
//                 lastModified: file.lastModified,
//                 content: `data:${file.type};base64,${base64}`
//             };
//         }
//     }

//     return Object.values(tempData);
// }

async function formDataToResponseData(formData: FormData): Promise<any[]> {
    const tempData: { [key: string]: any } = {};

    for (const [key, value] of Array.from(formData.entries())) {
        const [type, index] = key.split('-');
        if (!tempData[index]) tempData[index] = { chapterData: {}, fileData: {} };

        if (type === 'chapter') {
            tempData[index] = JSON.parse(value as string);
        } else if (type === 'files') {
            const file = value as File;
            const arrayBuffer = await file.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            tempData[index].file = {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                content: `data:${file.type};base64,${base64}`
            };
        }
    }

    return Object.values(tempData);
}