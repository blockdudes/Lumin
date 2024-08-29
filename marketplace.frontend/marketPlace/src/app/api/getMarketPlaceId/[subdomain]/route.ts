import { connection } from "@/database/connection";
import { SubdomainIdData } from "@/models/subdomainId";

export const GET = async (req: Request, { params }: { params: { subdomain: string } }) => {
    try {
        console.log("params", params);
        await connection();
        const subdomain = params.subdomain;
        console.log(subdomain);
        const subdomainData = await SubdomainIdData.findOne({ subdomain: subdomain });
        return Response.json({ id: subdomainData?.id }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }

};

