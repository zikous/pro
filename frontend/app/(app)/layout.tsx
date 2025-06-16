"use client";

import { AuthGuard } from "@/components/auth-guard";
import { Navbar } from "@/components/navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container px-4 py-6">{children}</main>
      </div>
    </AuthGuard>
  );
}
