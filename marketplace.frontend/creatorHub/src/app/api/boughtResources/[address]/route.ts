import { apolloClient } from "@/lib/client";
import { gql } from "@apollo/client";

export const GET = async (
  request: any,
  { params }: { params: { address: string } }
) => {
  try {
    const identifier = params.address;

    const purchased_resources = await apolloClient.query({
      query: gql`
        query MypurchasedCourse($identifier: String!) {
          purchases(where: { buyer: $identifier }) {
            id
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
            price
            transactionDate
          }
        }
      `,
      variables: {
        identifier: identifier,
      },
    });

    const totalSpent = purchased_resources.data.purchases.reduce(
      (acc: number, purchase: { price: number }) =>
        acc + Number(purchase.price),
      0
    );

    if (purchased_resources.data.purchases.length === 0 || totalSpent === 0) {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    return new Response(
      JSON.stringify({
        purchased_resources: purchased_resources.data.purchases,
        totalSpent: totalSpent,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response(
      JSON.stringify({ error: `internal server error: ${error}` }),
      { status: 500 }
    );
  }
};
