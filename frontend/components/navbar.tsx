"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "./ui/button";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          My App
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Signed in as:</span>
            <span className="font-medium">{user?.email}</span>
          </div>

          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
