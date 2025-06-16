// Apollo Client setup for GraphQL API communication
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  fromPromise,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { RetryLink } from "@apollo/client/link/retry";
import Cookies from "js-cookie";

// GraphQL endpoint
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Refresh an expired token
const refreshToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await fetch("http://localhost:8000/graphql/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation RefreshToken($refreshToken: String!) {
            refreshToken(refreshToken: $refreshToken) {
              token
              refreshToken
              payload
              refreshExpiresIn
            }
          }
        `,
        variables: { refreshToken },
      }),
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    const { data } = result;

    if (data?.refreshToken) {
      const { token, refreshToken: newRefreshToken } = data.refreshToken;

      // Store the new tokens
      Cookies.set("token", token, { sameSite: "strict" });
      Cookies.set("refreshToken", newRefreshToken, { sameSite: "strict" });

      return token;
    }
  } catch {
    // Silently fail
  }

  return null;
};

// Handle GraphQL errors and token refresh
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      // Handle authentication errors
      if (err.extensions?.code === "UNAUTHENTICATED") {
        return fromPromise(refreshToken())
          .filter((token) => !!token)
          .flatMap((token) => {
            // Retry with new token
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: token ? `JWT ${token}` : "",
              },
            });
            return forward(operation);
          });
      }
    }
  }
});

// Retry failed network requests
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error) => !error.result && error.name === "ServerError",
  },
});

// Add auth token to requests
const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, retryLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
  connectToDevTools: process.env.NODE_ENV === "development",
});

export default client;
