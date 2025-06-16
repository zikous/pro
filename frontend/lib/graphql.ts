// Re-export from the new structure
// This file exists for backward compatibility with existing imports
export * from "./graphql/index";

// Legacy types that will be replaced by generated types
export interface User {
  id: string;
  email: string;
  dateJoined?: string;
  isActive?: boolean;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
  payload: {
    exp: number;
    origIat: number;
    [key: string]: unknown;
  };
  refreshExpiresIn?: number;
}

export interface LoginResult {
  success: boolean;
  message?: string;
}

export interface RegisterResult {
  success: boolean;
  message: string;
  user?: User;
}
