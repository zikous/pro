"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// A client component that protects routes
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if token exists first to avoid unnecessary flashes
    const hasToken = !!Cookies.get("token");

    // If we have a token but are not authenticated, we might be refreshing
    // So we wait a bit longer before redirecting
    if (!hasToken) {
      router.push("/login");
    } else if (!isAuthenticated && !loading) {
      // Only redirect if both not authenticated and not loading
      router.push("/login");
    }

    // Set initializing to false after checking
    if (isInitializing) {
      setIsInitializing(false);
    }
  }, [isAuthenticated, loading, router, isInitializing]);

  // Show loading state
  if (loading || isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-700 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
