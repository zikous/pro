"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// A client component that protects routes
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
