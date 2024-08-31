import { apolloClient } from "@/lib/client";
import { gql } from "@apollo/client";

export const GET = async (
  request: any,
  { params }: { params: { address: string } }
) => {
  try {
    const identifier = params.address;
    console.log(identifier);
    try {
      const owner_marketplaces = await apolloClient.query({
        query: gql`
          query GetMarketplace($identifier: String!) {
            users(where: { id: $identifier }) {
              id
              marketplaces {
                id
                description
                marketplaceName
                image_url
                feePercent
                categories
                createdAt
                isOwnedResourcesMarketplace
              }
            }
          }
        `,
        variables: {
          identifier: identifier,
        },
        fetchPolicy: "network-only"
      });

      console.log("owner_marketplaces", owner_marketplaces);

      const marketplaces = owner_marketplaces.data.users[0].marketplaces;

      const marketplacesWithPurchases = await Promise.all(
        marketplaces.map(async (marketplace: any) => {
          const purchases = await apolloClient.query({
            query: gql`
              query GetMarketplacePurchases($identifier: String!) {
                purchases(where: { marketplace_: { id: $identifier } }) {
                  id
                  buyer {
                    id
                  }
                  price
                  feePaid
                  userEarned
                  transactionDate
                  resource {
                    id
                    creator {
                      id
                    }
                    title
                    description
                    category
                    image_url
                    resourceHash
                    transactionDate
                  }
                }
              }
            `,
            variables: {
              identifier: marketplace.id,
            },
            fetchPolicy: "network-only"
          });

          return {
            ...marketplace,
            purchases: purchases.data.purchases,
          };
        })
      );

      return new Response(JSON.stringify({ data: marketplacesWithPurchases }), {
        status: 200,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          data: [],
        }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ error: `internal server error: ${error}` }),
      { status: 500 }
    );
  }
};
