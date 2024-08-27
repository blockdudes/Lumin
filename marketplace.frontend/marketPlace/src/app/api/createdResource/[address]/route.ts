import { apolloClient } from "@/lib/client";
import { gql } from "@apollo/client";

export const GET = async (
  request: any,
  { params }: { params: { address: string } }
) => {
  try {
    const identifier = params.address;

    const user_data = await apolloClient.query({
      query: gql`
        query UserResources($identifier: String!) {
          purchases(where: { resource_: { creator: $identifier } }) {
            id
            price
            feePaid
            userEarned
            transactionDate
            resource {
              id
              description
              title
              category
              image_url
              price
              resourceHash
              transactionDate
            }
            buyer {
              id
            }
          }
        }
      `,
      variables: {
        identifier: identifier,
      },
    });

    const totalRevenue = user_data.data.purchases.reduce(
      (acc: number, purchase: { userEarned: number }) =>
        acc + purchase.userEarned,
      0
    );

    const soldResources = user_data.data.purchases.map((purchase: any) => ({
      resourceId: purchase.resource.id,
      title: purchase.resource.title,
      description: purchase.resource.description,
      category: purchase.resource.category,
      image_url: purchase.resource.image_url,
      price: purchase.price,
      resourceHash: purchase.resource.resourceHash,
      transactionDate: purchase.transactionDate,
      buyer: purchase.buyer.id,
    }));

    if (soldResources.length === 0 || totalRevenue === 0) {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    return new Response(JSON.stringify({ totalRevenue, soldResources }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ error: `internal server error: ${error}` }),
      { status: 500 }
    );
  }
};
