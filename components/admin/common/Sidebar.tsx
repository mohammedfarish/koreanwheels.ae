"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, Menu, UserIcon, UsersRound, X } from "lucide-react";

const STORAGE_KEY = "admin-sidebar-collapsed";

import { company } from "@/utils/companyData";
import ThemeSwitch from "@/components/common/ThemeSwitch";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { AdminSessionGuard } from "./AdminSessionGuard";

export type SidebarNavItem = {
  label: string;
  icon: React.ReactNode;
} & (
  | { href: string }
  | {
      subItems: {
        label: string;
        href: string;
      }[];
    }
);

export type SidebarNavItems = SidebarNavItem[];

const isPathActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(href + "/");

const Sidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Restore collapsed state from localStorage (after mount to avoid hydration mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setCollapsed(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const setCollapsedPersisted = (value: boolean) => {
    setCollapsed(value);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const locations: SidebarNavItems = [
    { label: "Users", icon: <UserIcon className="size-5" />, href: "/admin/users" },
    { label: "Customers", icon: <UsersRound className="size-5" />, href: "/admin/customers" },
  ];

  // Keep expanded in sync with active path; open group that contains active sub-item
  useEffect(() => {
    locations.forEach((item, index) => {
      if ("subItems" in item && item.subItems.some((sub) => isPathActive(pathname, sub.href))) {
        setExpanded((prev) => ({ ...prev, [index]: true }));
      }
    });
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await adminActionsDirectory("logout");
      if (res.success) window.location.href = "/";
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile header - only on mobile (max 820px) so menu button doesn't overlap content */}
      <header className="mobile:flex pc:hidden fixed top-0 left-0 right-0 z-40 h-14 items-center justify-between gap-3 border-b border-sidebar-line bg-sidebar px-4 shadow-sm">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sidebar-nav-foreground hover:bg-sidebar-nav-hover focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <Link href="/" className="flex shrink-0 items-center ml-auto focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sidebar-nav-focus rounded-lg">
          <Image src="/api/img/logo" alt={company.tradeName} width={120} height={32} className="h-8 w-auto object-contain dark:hidden" unoptimized />
          <Image
            src="/api/img/logo-light"
            alt={company.tradeName}
            width={120}
            height={32}
            className="hidden h-8 w-auto object-contain dark:block"
            unoptimized
          />
        </Link>
      </header>

      {/* Backdrop on mobile when sidebar is open */}
      <button
        type="button"
        onClick={() => setMobileOpen(false)}
        aria-label="Close menu"
        className={`mobile:fixed mobile:inset-0 mobile:z-40 mobile:bg-black/50 mobile:transition-opacity pc:hidden ${
          mobileOpen ? "mobile:pointer-events-auto mobile:opacity-100" : "mobile:pointer-events-none mobile:opacity-0"
        }`}
        tabIndex={mobileOpen ? 0 : -1}
      />

      <aside
        className={`flex h-full min-h-screen shrink-0 flex-col border-r border-sidebar-line bg-sidebar transition-[width,transform] duration-300 ease-out mobile:fixed mobile:inset-y-0 mobile:left-0 mobile:z-50 mobile:w-64 mobile:shadow-xl pc:translate-x-0 ${
          collapsed ? "pc:w-20" : "pc:w-64"
        } ${mobileOpen ? "mobile:translate-x-0" : "mobile:-translate-x-full"}`}
      >
        <AdminSessionGuard />

        <div className="flex flex-col gap-1 px-3 py-4">
          <div className={`flex items-center gap-2 py-2 pc:justify-center ${collapsed ? "pc:px-0" : "justify-between px-3"}`}>
            <Link
              href="/admin"
              className={`flex items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sidebar-nav-active ${
                collapsed ? "pc:flex pc:justify-center pc:min-w-0 pc:overflow-hidden" : "min-w-0 flex-1 gap-x-3"
              }`}
            >
              <Image
                src="/api/img/logo"
                alt={company.tradeName}
                width={120}
                height={32}
                className={`object-contain dark:hidden ${collapsed ? "pc:h-8 pc:max-w-full" : "h-8 w-auto"}`}
                unoptimized
              />
              <Image
                src="/api/img/logo-light"
                alt={company.tradeName}
                width={120}
                height={32}
                className={`hidden object-contain dark:block ${collapsed ? "pc:block pc:h-8 pc:max-w-full" : "h-8 w-auto"}`}
                unoptimized
              />
            </Link>
            <span className={`flex items-center gap-2 ${collapsed ? "pc:hidden" : ""}`}>
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => setCollapsedPersisted(true)}
                  className="pc:flex mobile:hidden size-8 shrink-0 items-center justify-center rounded-lg text-sidebar-nav-foreground hover:bg-sidebar-nav-hover focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="size-5" />
                </button>
              )}
              <ThemeSwitch variant="icon" context="sidebar" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mobile:flex pc:hidden size-8 items-center justify-center rounded-lg text-sidebar-nav-foreground hover:bg-sidebar-nav-hover focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </span>
          </div>
          <span className={`px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-nav-foreground/70 ${collapsed ? "pc:hidden" : ""}`}>
            {company.tradeName}
          </span>

          <nav className="mt-4 flex flex-col gap-0.5">
            {locations.map((item, index) => (
              <div key={index}>
                {"href" in item ? (
                  <Link
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center rounded-lg py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sidebar-nav-focus ${
                      collapsed ? "pc:justify-center pc:px-2" : "gap-x-3.5 px-2.5"
                    } ${
                      isPathActive(pathname, item.href)
                        ? "bg-sidebar-nav-active text-sidebar-nav-foreground"
                        : "text-sidebar-nav-foreground hover:bg-sidebar-nav-hover"
                    }`}
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-4">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                ) : (
                  <>
                    {collapsed ? (
                      <Link
                        href={item.subItems[0]?.href ?? "#"}
                        title={item.label}
                        className={`flex items-center rounded-lg py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sidebar-nav-focus pc:justify-center pc:px-2 ${
                          item.subItems.some((sub) => isPathActive(pathname, sub.href))
                            ? "bg-sidebar-nav-active text-sidebar-nav-foreground"
                            : "text-sidebar-nav-foreground hover:bg-sidebar-nav-hover"
                        }`}
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-4">{item.icon}</span>
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`flex w-full items-center justify-between gap-x-3.5 rounded-lg py-2 px-2.5 text-left text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sidebar-nav-focus ${
                            item.subItems.some((sub) => isPathActive(pathname, sub.href))
                              ? "bg-sidebar-nav-active text-sidebar-nav-foreground"
                              : "text-sidebar-nav-foreground hover:bg-sidebar-nav-hover"
                          }`}
                          aria-expanded={expanded[index] ?? false}
                          onClick={() => setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))}
                        >
                          <span className="flex items-center gap-x-3.5">
                            <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-4">{item.icon}</span>
                            {item.label}
                          </span>
                          <svg
                            className={`size-4 shrink-0 transition-transform ${expanded[index] ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ${expanded[index] ? "block" : "hidden"}`}>
                          <div className="mt-0.5 flex flex-col border-l border-sidebar-nav-list-divider pl-2">
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={`rounded-lg py-1.5 px-2.5 text-sm transition-colors hover:bg-sidebar-nav-hover ${
                                  isPathActive(pathname, sub.href)
                                    ? "bg-sidebar-nav-active font-medium text-sidebar-nav-foreground"
                                    : "text-sidebar-nav-foreground/80"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div
          className={`mt-auto space-y-3 border-t border-sidebar-divider py-4 ${collapsed ? "pc:flex pc:flex-col pc:items-center pc:gap-2 pc:px-2" : "px-3"}`}
        >
          {collapsed && (
            <button
              type="button"
              onClick={() => setCollapsedPersisted(false)}
              className="pc:flex mobile:hidden size-9 shrink-0 items-center justify-center rounded-lg text-sidebar-nav-foreground hover:bg-sidebar-nav-hover focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="size-5" />
            </button>
          )}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            title={collapsed ? "Log out" : undefined}
            className={`flex items-center rounded-lg py-2 text-sm font-medium text-sidebar-nav-foreground transition-colors hover:bg-sidebar-nav-hover focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sidebar-nav-focus disabled:opacity-50 ${
              collapsed ? "pc:justify-center pc:px-2 pc:w-full" : "w-full gap-x-3.5 px-2.5"
            }`}
          >
            <LogOut className="size-5 shrink-0" />
            {!collapsed && <span>{loggingOut ? "Signing out…" : "Log out"}</span>}
          </button>
          {!collapsed && (
            <p className="text-xs text-sidebar-nav-foreground/60">
              {company.tradeName} · {company.address.addressLine1}
            </p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
