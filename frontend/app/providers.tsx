"use client";

// Provider wrapper component for client-side state management
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@/lib/auth";
import apolloClient from "@/lib/apolloClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
}
