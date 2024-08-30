import { connection } from "@/database/connection";
import { SubdomainIdData } from "@/models/subdomainId";

export const POST = async (req: Request) => {
    try {
        const data = await req.json();

        const subdomain = data.subdomain.toLowerCase().replace(/ /g, '-');
        const marketplaceId = data.marketplaceId;
        await connection();
        const response = await SubdomainIdData.create({subdomain: subdomain, id: marketplaceId});      
        return Response.json({ data: response }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Something went wrong" }, { status: 500 });
    }
  };
  
