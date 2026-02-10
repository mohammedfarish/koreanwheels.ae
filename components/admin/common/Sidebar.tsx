"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, UserIcon } from "lucide-react";

import { company } from "@/utils/companyData";
import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";

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

const Sidebar = () => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await adminActionsDirectory("logout");
      if (res.success) {
        window.location.href = "/";
      }
    } finally {
      setLoggingOut(false);
    }
  };

  const locations: SidebarNavItems = [
    {
      label: "Users",
      icon: <UserIcon className="h-5 w-5" />,
      href: "/admin/users",
    },
  ];

  const toggle = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <aside className="flex h-full min-h-screen w-56 flex-col border-r border-[#262626] bg-black">
      <div className="flex flex-col gap-1 px-3 py-4">
        <Link href="/" className="flex items-center gap-3 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/20 rounded-md">
          <Image src="/api/img/logo-light" alt={company.tradeName} width={120} height={32} className="h-8 w-auto object-contain" unoptimized />
        </Link>

        <span className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#737373]">{company.tradeName}</span>
        <nav className="mt-4 flex flex-col gap-0.5">
          {locations.map((item, index) => (
            <div key={index}>
              {"href" in item ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:bg-[#171717] hover:text-white"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#737373] [&>svg]:h-4 [&>svg]:w-4">{item.icon}</span>
                  {item.label}
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-[#a3a3a3] transition-colors hover:bg-[#171717] hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-[#737373] [&>svg]:h-4 [&>svg]:w-4">{item.icon}</span>
                      {item.label}
                    </span>
                    <svg
                      className={`h-4 w-4 shrink-0 text-[#737373] transition-transform ${expanded[index] ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expanded[index] && (
                    <div className="ml-5 mt-0.5 flex flex-col border-l border-[#262626] pl-2">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="rounded-md px-2 py-1.5 text-sm text-[#737373] transition-colors hover:bg-[#171717] hover:text-white"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-[#262626] px-3 py-4 space-y-3">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-[#a3a3a3] transition-colors hover:bg-[#171717] hover:text-white disabled:opacity-50"
        >
          <LogOut className="h-5 w-5 shrink-0 text-[#737373]" />
          {loggingOut ? "Signing out…" : "Log out"}
        </button>
        <p className="text-xs text-[#525252]">
          {company.tradeName} · {company.address.addressLine1}
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
