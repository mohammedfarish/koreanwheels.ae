"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { initThemeObserver } from "@/utils/theme";

// Optional third-party libraries (jquery, lodash, noUiSlider, datatables, dropzone, vanilla-calendar-pro)
// can be added per https://preline.co/docs/frameworks-nextjs.html if using Datepicker, DataTables, etc.

async function loadPreline() {
  return import("preline/dist/index.js");
}

export default function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    initThemeObserver();
  }, []);

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline();
      if (typeof window !== "undefined" && window.HSStaticMethods?.autoInit) {
        window.HSStaticMethods.autoInit();
      }
    };
    initPreline();
  }, []);

  useEffect(() => {
    if (path && typeof window !== "undefined" && window.HSStaticMethods?.autoInit) {
      const t = setTimeout(() => window.HSStaticMethods.autoInit(), 100);
      return () => clearTimeout(t);
    }
  }, [path]);

  return null;
}
