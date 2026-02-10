import type { Metadata } from "next";

import "./globals.css";
import isdev from "@/utils/functions/isdev";
import SiteLock from "@/components/SiteLock";
import { verifyAuth } from "@/utils/functions/site-lock-auth";
import { getSiteType } from "@/utils/functions/domain";
import { verifyAdminAuth } from "@/utils/functions/admin/auth";
import Sidebar from "@/components/admin/common/Sidebar";
import { twMerge } from "tailwind-merge";

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

  const siteType = await getSiteType();
  if (siteType === "admin") {
    const isLoggedIn = await verifyAdminAuth();

    return (
      <html lang="en">
        <body className="min-h-screen w-screen overflow-x-hidden antialiased flex">
          {isLoggedIn && <Sidebar />}
          <div className={twMerge("w-full min-h-screen", isLoggedIn && "p-5")}>{children}</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="min-h-screen w-screen overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
