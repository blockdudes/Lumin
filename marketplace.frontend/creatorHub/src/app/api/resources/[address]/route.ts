import { apolloClient } from "@/lib/client";
import { gql } from "@apollo/client";

export const GET = async (
  request: any,
  { params }: { params: { address: string } }
) => {
  try {
    const identifier = params.address;
    console.log("identifier", identifier);

    try {
      console.log("inside");
      const data = await apolloClient.query({
        query: gql`
               query resourceData {
                    users(where: {id: "${identifier}"}) {
                        id
                        ownedResources{
                        id
                        image_url
                        price
                        resourceHash
                        title
                        description
                        category
                        allowListingAccess
                        transactionDate
                        }
                    }
                    purchases(where: {owner: "${identifier}"}) {
                        transactionDate
                        buyer {
                        id
                        }
                        owner {
                        id
                        }
                        resource {
                        id
                        }
                        price
                        feePaid
                    }
                    }
            `,
      });
      console.log(data);
      const new_resources = data.data.users[0].ownedResources.map(
        (resource: any) => {
          const purchase = data.data.purchases.find(
            (purchase: any) => purchase.resource.id === resource.id
          );
          if (purchase) {
            const resource_earning =
              purchase.feePaid != null
                ? purchase.price - purchase.feePaid
                : purchase.price;

            return {
              ...resource,
              resource_earning,
            };
          } else {
            return {
              ...resource,
              resource_earning: 0,
            };
          }
        }
      );

      console.log(new_resources);
      return new Response(JSON.stringify({ data: new_resources }), {
        status: 200,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: `unable to fetch from subgraph: ${error}` }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
