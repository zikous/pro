import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cookie options helper
export function getCookieOptions(days: number): Cookies.CookieAttributes {
  const isProd = process.env.NODE_ENV === "production";
  return {
    path: "/",
    sameSite: "strict",
    expires: days,
    secure:
      isProd ||
      (typeof window !== "undefined" && window.location.protocol === "https:"),
  };
}
