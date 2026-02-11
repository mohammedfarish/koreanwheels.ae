"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import adminActionsDirectory from "@/utils/functions/admin/adminActionsDirectory";
import { useGlobalState } from "@/utils/globalState";

/**
 * On every admin route change, calls get-user-data. If the user data is
 * undefined (session invalid), reloads the page so the server layout can
 * redirect to login.
 */
export const AdminSessionGuard = () => {
  const pathname = usePathname();
  const setUserData = useGlobalState((s) => s.setUserData);

  useEffect(() => {
    const check = async () => {
      const res = await adminActionsDirectory("get-user-data");
      if (!res.success || res.data === undefined) {
        window.location.reload();
        return;
      }
      setUserData(res.data);
    };
    check();
  }, [pathname, setUserData]);

  return null;
};
