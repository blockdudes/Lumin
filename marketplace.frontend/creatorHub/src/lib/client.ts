import { createThirdwebClient } from "thirdweb";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
});
