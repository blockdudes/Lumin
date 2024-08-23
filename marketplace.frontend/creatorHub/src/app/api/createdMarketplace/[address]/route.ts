import { apolloClient } from '@/lib/client';
import { gql } from "@apollo/client";

export const GET = async (request: any, { params }: { params: { address: string } }) => {
    try {
        const identifier = params.address;

        try {
            const data = await apolloClient.query({
                query: gql`
               query GetPurchasesForMarketplace {
                    purchases {
                        id
                        resource {
                        id
                        }
                        marketplace {
                        id
                        }
                    }
                    users(where: {id : "0x20c9192b145ca6d6274704b244614f356361db59"}) {
                        id
                        marketplaces {
                        id
                        marketplaceName
                        description
                        image_url
                        feePercent
                        categories
                        createdAt
                        }
                    }
                    }
            `
            })

            const marketplacesWithPurchase = data.data.users[0].marketplaces.map((marketplace: any) => {
                const matchingPurchases = data.data.purchases.filter((purchase: any) => purchase.marketplace.id === marketplace.id);
                return {
                    ...marketplace,
                    purchases: matchingPurchases
                };
            });


        } catch (error) {
            return new Response(JSON.stringify({ error: `unable to fetch from subgraph: ${error}` }), { status: 500 });

        }

    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
