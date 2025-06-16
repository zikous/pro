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
import { REFRESH_TOKEN_MUTATION } from "./graphql/operations";
import { getCookieOptions } from "./utils";

const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql/",
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Track if we're currently refreshing to avoid multiple simultaneous refreshes
let isRefreshing = false;
// Queue of operations waiting for token refresh
let pendingRequests: ((token: string | null) => void)[] = [];

const processQueue = (token: string | null) => {
  pendingRequests.forEach((callback) => callback(token));
  pendingRequests = [];
};

const refreshToken = async (): Promise<string | null> => {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    Cookies.remove("token");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  if (isRefreshing) {
    return new Promise<string | null>((resolve) => {
      pendingRequests.push((token: string | null) => resolve(token));
    });
  }

  isRefreshing = true;

  try {
    const response = await fetch("http://localhost:8000/graphql/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: REFRESH_TOKEN_MUTATION.loc?.source.body,
        variables: { refreshToken },
      }),
    });

    if (!response.ok) {
      isRefreshing = false;
      processQueue(null);
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return null;
    }

    const result = await response.json();
    const { data } = result;

    if (data?.refreshToken) {
      const { token, refreshToken: newRefreshToken } = data.refreshToken;

      Cookies.set("token", token, getCookieOptions(7));
      Cookies.set("refreshToken", newRefreshToken, getCookieOptions(30));

      isRefreshing = false;
      processQueue(token);
      return token;
    }
  } catch (error) {
    console.error("Token refresh error:", error);
  }

  isRefreshing = false;
  processQueue(null);

  Cookies.remove("token");
  Cookies.remove("refreshToken");
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }

  return null;
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError) {
      // @ts-expect-error Property statusCode exists on networkError
      if (networkError.statusCode === 401 || networkError.statusCode === 403) {
        return fromPromise(refreshToken())
          .filter((token) => !!token)
          .flatMap((token) => {
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

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // Handle authentication errors
        if (
          err.extensions?.code === "UNAUTHENTICATED" ||
          err.message.includes("authentication") ||
          err.message.includes("token") ||
          err.message.includes("expired")
        ) {
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
  }
);

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

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

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
