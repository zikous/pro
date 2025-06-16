"use client";

// Example component showing how to use the generated GraphQL types
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@/lib/graphql/operations";
import { MeQuery } from "@/lib/graphql/generated/graphql";
import { useRedirectIfUnauthenticated } from "@/lib/redirect";

export default function ExampleComponent() {
  // Protect this component - redirect if not authenticated
  const { loading: authLoading } = useRedirectIfUnauthenticated();

  // Use the generated types with Apollo hooks
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

  if (authLoading || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {data?.me && (
        <div>
          <p>ID: {data.me.id}</p>
          <p>Email: {data.me.email}</p>
          <p>Joined: {data.me.dateJoined}</p>
          <p>Active: {data.me.isActive ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}
