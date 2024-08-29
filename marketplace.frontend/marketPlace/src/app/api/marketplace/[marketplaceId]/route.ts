import { apolloClient } from "@/lib/client";
import { ApolloError, gql } from "@apollo/client";

export const GET = async (
  request: any,
  { params }: { params: { marketplaceId: string } }
) => {
  try {
    const identifier = params.marketplaceId.toString();

    const get_marketplaces = await apolloClient.query({
      query: gql`
        query GetMarketplace($identifier: String!) {
          marketplaces(where: { id: $identifier }) {
            id
            description
            marketplaceName
            image_url
            feePercent
            categories
            createdAt
            isOwnedResourcesMarketplace
            theme
          }
        }
      `,
      variables: {
        identifier: identifier,
      },
    });

    const marketplaces = get_marketplaces.data.marketplaces[0] || [];


    console.log('marketplaces',marketplaces)

    return new Response(JSON.stringify({ data: marketplaces }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
