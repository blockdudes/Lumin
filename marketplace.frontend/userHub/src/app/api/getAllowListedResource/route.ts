import { apolloClient } from "@/lib/client";
import { gql } from "@apollo/client";

export const GET = async (request: any) => {
  try {
    const listedResources = await apolloClient.query({
      query: gql`
        query MyQuery {
          resources(where: { allowListingAccess: true }) {
            id
            creator {
              id
            }
            title
            description
            category
            image_url
            price
            resourceHash
            transactionDate
          }
        }
      `,
    });

    if (listedResources.data.resources.length === 0) {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    return new Response(
      JSON.stringify({ data: listedResources.data.resources }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ error: `internal server error: ${error}` }),
      { status: 500 }
    );
  }
};
