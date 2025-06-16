"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useMutation, useLazyQuery } from "@apollo/client";
import Cookies from "js-cookie";
import {
  ME_QUERY,
  LOGIN_MUTATION,
  REGISTER_MUTATION,
} from "./graphql/operations";
import {
  UserType,
  MeQuery,
  TokenAuthMutation,
  RegisterMutation,
} from "./graphql/generated/graphql";
import { getCookieOptions } from "./utils";

type AuthResult = {
  success: boolean;
  message?: string;
};

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [loginMutation] = useMutation<TokenAuthMutation>(LOGIN_MUTATION);
  const [registerMutation] = useMutation<RegisterMutation>(REGISTER_MUTATION);
  const [getMe, { loading: meLoading }] = useLazyQuery<MeQuery>(ME_QUERY, {
    onCompleted: (data) => {
      if (data?.me) {
        setUser(data.me);
      }
    },
    onError: () => {
      // If query fails, clear user data
      setUser(null);
    },
  });

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      const refreshToken = Cookies.get("refreshToken");

      if (token) {
        try {
          await getMe();
        } catch (error) {
          console.error("Error checking auth:", error);
          // If no refresh token available, log the user out
          if (!refreshToken) {
            setUser(null);
            Cookies.remove("token");
          }
        }
      } else {
        // No token, so user is not authenticated
        setUser(null);
      }

      setLoading(false);
    };

    checkAuth();

    // Set up interval to periodically check auth status (every 5 minutes)
    const intervalId = setInterval(checkAuth, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [getMe]);

  // Login with email and password
  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.tokenAuth) {
        const { token, refreshToken } = data.tokenAuth;

        Cookies.set("token", token, getCookieOptions(7));
        Cookies.set("refreshToken", refreshToken, getCookieOptions(30));

        await getMe();

        return { success: true };
      }

      return {
        success: false,
        message: "Login failed. Check your credentials.",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login error";
      return { success: false, message: errorMessage };
    }
  };

  // Register a new user
  const register = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    try {
      const { data } = await registerMutation({
        variables: { email, password },
      });

      if (data?.register?.success) {
        return {
          success: true,
          message: data.register.message || "Registration successful",
        };
      }

      return {
        success: false,
        message: data?.register?.message || "Registration failed",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Registration error";
      return { success: false, message: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    // Clear cookies and state
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: loading || meLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
