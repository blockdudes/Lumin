import { createThirdwebClient } from "thirdweb";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql, NormalizedCacheObject, HttpLink, ApolloLink
} from "@apollo/client";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error("No client ID provided");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_APOLLO_CLIENT_URL}`,
  fetch: function (uri, options) {
    return fetch(uri, {
      ...options ?? {},
      headers: {
        ...options?.headers ?? {},
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_APOLLO_TOKEN_ID}`
      },
      next: {
        revalidate: 0
      }
    })
  }
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
});
