import { connection } from "@/database/connection";
import { UserResourceData } from "@/models/userDataModel";

export const GET = async (
  req: Request,
  { params }: { params: { hash: string } }
) => {
  try {
    await connection();
    const resource = await UserResourceData.findOne({ hash: params.hash });
    if (!resource) {
      return Response.json({ error: "Resource not found" }, { status: 404 });
    }

    // const formData = await bufferToFormData(resource.resource);
    // const responseData = await formDataToResponseData(formData);

    // const data = {
    //     title: resource.title,
    //     description: resource.description,
    //     thumbnail: resource.thumbnail,
    //     chapters: responseData
    // }
    console.log("resource", resource);

    return Response.json({
      message: "Resource Decoded successfully",
      data: resource,
    });
  } catch (error) {
    return Response.error();
  }
};

async function formDataToResponseData(formData: FormData): Promise<any[]> {
  const tempData: { [key: string]: any } = {};

  for (const [key, value] of Array.from(formData.entries())) {
    const [type, index] = key.split("-");
    if (!tempData[index]) tempData[index] = { chapterData: {}, fileData: {} };

    if (type === "chapter") {
      tempData[index] = JSON.parse(value as string);
    } else if (type === "files") {
      const file = value as File;
      // console.log("FILE: ", file)
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      tempData[index].file = {
        name: file.name,
        size: file.size,
        lastModified: file.lastModified,
        content: `data:${file.type};base64,${base64}`,
      };
    } else if (type === "type") {
      tempData[index].type = value;
    }
  }

  return Object.values(tempData);
}
