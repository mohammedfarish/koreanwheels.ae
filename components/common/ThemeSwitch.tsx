"use client";

import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { setTheme } from "@/utils/theme";

type ThemeSwitchProps = {
  variant?: "sidebar" | "inline" | "icon";
  /** When variant="icon": "sidebar" for sidebar colors, "inline" for card/page colors */
  context?: "sidebar" | "inline";
};

const iconClass = "size-3.5 shrink-0";

export const ThemeSwitch = ({ variant = "inline", context }: ThemeSwitchProps) => {
  const isSidebar = variant === "sidebar";
  const isIcon = variant === "icon";
  const iconInSidebar = isIcon && context === "sidebar";

  return (
    <div
      className={
        isSidebar
          ? "flex flex-col gap-0.5"
          : isIcon
          ? "inline-flex items-center gap-0.5"
          : "inline-flex gap-0.5 rounded-md border border-gray-200 bg-gray-50/50 p-0.5 dark:border-neutral-700 dark:bg-neutral-800/50"
      }
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme("auto")}
        className={
          isSidebar
            ? "flex items-center justify-center gap-x-2 rounded-md py-1.5 px-2 text-xs font-medium text-sidebar-nav-foreground opacity-70 transition-colors hover:bg-sidebar-nav-hover hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus hs-auto-mode-active:bg-sidebar-nav-active hs-auto-mode-active:text-sidebar-nav-foreground hs-auto-mode-active:opacity-100"
            : isIcon
            ? iconInSidebar
              ? "inline-flex size-6 items-center justify-center rounded text-sidebar-nav-foreground/70 transition-colors hover:bg-sidebar-nav-hover hover:text-sidebar-nav-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus focus:ring-offset-1 hs-auto-mode-active:bg-sidebar-nav-active hs-auto-mode-active:text-sidebar-nav-foreground"
              : "inline-flex size-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:ring-offset-neutral-900 hs-auto-mode-active:bg-gray-200 hs-auto-mode-active:text-gray-900 hs-auto-mode-active:dark:bg-neutral-600 hs-auto-mode-active:dark:text-neutral-100"
            : "inline-flex size-7 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:ring-offset-neutral-900 hs-auto-mode-active:bg-gray-200 hs-auto-mode-active:text-gray-900 hs-auto-mode-active:dark:bg-neutral-600 hs-auto-mode-active:dark:text-neutral-100"
        }
        aria-label="Use system theme"
        title="System"
      >
        <Monitor className={iconClass} />
        {isSidebar && <span className="text-xs">System</span>}
      </button>
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={
          isSidebar
            ? "flex items-center justify-center gap-x-2 rounded-md py-1.5 px-2 text-xs font-medium text-sidebar-nav-foreground opacity-70 transition-colors hover:bg-sidebar-nav-hover hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus dark:hidden hs-light-mode-active:bg-sidebar-nav-active hs-light-mode-active:text-sidebar-nav-foreground hs-light-mode-active:opacity-100 hs-auto-light-mode-active:bg-sidebar-nav-active hs-auto-light-mode-active:text-sidebar-nav-foreground hs-auto-light-mode-active:opacity-100"
            : isIcon
            ? iconInSidebar
              ? "inline-flex size-6 items-center justify-center rounded text-sidebar-nav-foreground/70 transition-colors hover:bg-sidebar-nav-hover hover:text-sidebar-nav-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus focus:ring-offset-1 hs-light-mode-active:bg-sidebar-nav-active hs-light-mode-active:text-sidebar-nav-foreground hs-auto-light-mode-active:bg-sidebar-nav-active hs-auto-light-mode-active:text-sidebar-nav-foreground"
              : "inline-flex size-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:ring-offset-neutral-900 hs-light-mode-active:bg-gray-200 hs-light-mode-active:text-gray-900 hs-auto-light-mode-active:bg-gray-200 hs-auto-light-mode-active:text-gray-900"
            : "inline-flex size-7 items-center justify-center rounded text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:hidden hs-light-mode-active:bg-gray-200 hs-light-mode-active:text-gray-900 hs-auto-light-mode-active:bg-gray-200 hs-auto-light-mode-active:text-gray-900"
        }
        aria-label="Light mode"
        title="Light"
      >
        <Sun className={iconClass} />
        {isSidebar && <span className="text-xs">Light</span>}
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={
          isSidebar
            ? "hidden items-center justify-center gap-x-2 rounded-md py-1.5 px-2 text-xs font-medium text-sidebar-nav-foreground opacity-70 transition-colors hover:bg-sidebar-nav-hover hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus dark:flex hs-dark-mode-active:bg-sidebar-nav-active hs-dark-mode-active:text-sidebar-nav-foreground hs-dark-mode-active:opacity-100 hs-auto-dark-mode-active:bg-sidebar-nav-active hs-auto-dark-mode-active:text-sidebar-nav-foreground hs-auto-dark-mode-active:opacity-100"
            : isIcon
            ? iconInSidebar
              ? "inline-flex size-6 items-center justify-center rounded text-sidebar-nav-foreground/70 transition-colors hover:bg-sidebar-nav-hover hover:text-sidebar-nav-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-nav-focus focus:ring-offset-1 hs-dark-mode-active:bg-sidebar-nav-active hs-dark-mode-active:text-sidebar-nav-foreground hs-auto-dark-mode-active:bg-sidebar-nav-active hs-auto-dark-mode-active:text-sidebar-nav-foreground"
              : "inline-flex size-6 items-center justify-center rounded text-gray-500 transition-colors hover:bg-neutral-700 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:ring-offset-neutral-900 hs-dark-mode-active:bg-neutral-600 hs-dark-mode-active:text-neutral-100 hs-auto-dark-mode-active:bg-neutral-600 hs-auto-dark-mode-active:text-neutral-100"
            : "hidden size-7 items-center justify-center rounded text-gray-500 transition-colors hover:bg-neutral-700 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:inline-flex dark:text-neutral-400 dark:focus:ring-offset-neutral-900 hs-dark-mode-active:bg-neutral-600 hs-dark-mode-active:text-neutral-100 hs-auto-dark-mode-active:bg-neutral-600 hs-auto-dark-mode-active:text-neutral-100"
        }
        aria-label="Dark mode"
        title="Dark"
      >
        <Moon className={iconClass} />
        {isSidebar && <span className="text-xs">Dark</span>}
      </button>
    </div>
  );
};

export default ThemeSwitch;
