"use client";

// Hooks for authentication-based redirects
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth";

// Return type for redirect hooks
interface RedirectResult {
  isAuthenticated: boolean;
  loading: boolean;
}

// Redirect away from pages that should only be seen by unauthenticated users
export function useRedirectIfAuthenticated(
  redirectTo: string = "/"
): RedirectResult {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo, router]);

  return { isAuthenticated, loading };
}

// Redirect away from pages that require authentication
export function useRedirectIfUnauthenticated(
  redirectTo: string = "/login"
): RedirectResult {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, redirectTo, router]);

  return { isAuthenticated, loading };
}
