import type { Metadata } from "next";

import "./globals.css";
import isdev from "@/utils/functions/isdev";
import SiteLock from "@/components/SiteLock";
import { verifyAuth } from "@/utils/functions/site-lock-auth";

export const metadata: Metadata = {
  title: "Website Boilerplate",
  description: "This website is a boilerplate for a website",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!isdev) {
    const isAuthenticated = await verifyAuth();
    if (!isAuthenticated) {
      return (
        <html lang="en">
          <body className="min-h-screen w-screen overflow-x-hidden antialiased">
            <SiteLock />
          </body>
        </html>
      );
    }
  }

  return (
    <html lang="en">
      <body className="min-h-screen w-screen overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
