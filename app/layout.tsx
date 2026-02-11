import type { Metadata } from "next";

import "./globals.css";
import isdev from "@/utils/functions/isdev";
import SiteLock from "@/components/SiteLock";
import { verifyAuth } from "@/utils/functions/site-lock-auth";
import { getSiteType } from "@/utils/functions/domain";
import { verifyAdminAuth } from "@/utils/functions/admin/auth";
import Sidebar from "@/components/admin/common/Sidebar";
import Modal from "@/components/common/Modal";
import PrelineScriptWrapper from "@/app/components/PrelineScriptWrapper";
import ThemeInitScript from "@/app/components/ThemeInitScript";
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
        <html lang="en" suppressHydrationWarning>
          <body className="min-h-screen w-screen overflow-x-hidden antialiased bg-gray-50 text-gray-900 transition-colors duration-300 ease-in-out dark:bg-neutral-900 dark:text-neutral-100">
            <ThemeInitScript />
            <SiteLock />
            <PrelineScriptWrapper />
          </body>
        </html>
      );
    }
  }

  const siteType = await getSiteType();
  if (siteType === "admin") {
    const isLoggedIn = await verifyAdminAuth("admin");

    return (
      <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
        <body className="min-h-screen w-full max-w-full overflow-x-hidden antialiased flex bg-gray-50 text-gray-900 transition-colors duration-300 ease-in-out dark:bg-neutral-900 dark:text-neutral-100">
          <ThemeInitScript />
          {isLoggedIn && <Sidebar />}
          <div
            className={twMerge(
              "flex-1 min-w-0 min-h-screen overflow-x-hidden",
              isLoggedIn && "flex flex-col p-5 mobile:mt-14 mobile:px-5 mobile:pb-5 mobile:min-h-dvh mobile:box-border"
            )}
          >
            {isLoggedIn ? <div className="mx-auto w-full max-w-4xl min-w-0">{children}</div> : children}
          </div>
          <Modal />
          <PrelineScriptWrapper />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen w-screen overflow-x-hidden antialiased bg-gray-50 text-gray-900 transition-colors duration-300 ease-in-out dark:bg-neutral-900 dark:text-neutral-100">
        <ThemeInitScript />
        {children}
        <Modal />
        <PrelineScriptWrapper />
      </body>
    </html>
  );
}
