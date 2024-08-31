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
      fetchPolicy: "network-only"
    });

    if (purchased_resources.data.purchases.length === 0) {
      return new Response(JSON.stringify({ data: [] }), { status: 200 });
    }

    return new Response(
      JSON.stringify({
        data: purchased_resources.data.purchases,
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
