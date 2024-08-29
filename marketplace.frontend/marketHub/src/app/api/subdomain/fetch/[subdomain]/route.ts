import { connection } from "@/database/connection";
import { SubdomainIdData } from "@/models/subdomainId";

export const GET = async (req: Request, {params}: {params: {subdomain: string}}) => {
    try {
        const subdomain = params.subdomain;
        await connection();
        const subdomainData = await SubdomainIdData.findOne({subdomain: subdomain});
        

        return Response.json({ data: subdomainData }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }

  };
  
