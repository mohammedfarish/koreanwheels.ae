import { AdminLogin } from "@/components/admin/homepage/AdminLogin";
import Dashboard from "@/components/admin/homepage/Dashboard";
import Homepage from "@/components/homepage/Homepage";
import { verifyAdminAuth } from "@/utils/functions/admin/auth";
import { getSiteType } from "@/utils/functions/domain";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const siteType = await getSiteType();

  if (siteType === "admin") {
    const verified = await verifyAdminAuth("admin");

    if (verified) {
      return {
        title: "Dashboard",
      };
    }

    return {
      title: "Korean Wheels Admin",
      description: "Korean Wheels Admin",
    };
  }

  return {
    title: "Korean Wheels",
    description: "Korean Wheels",
  };
};

export default async function Page() {
  const siteType = await getSiteType();
  if (siteType === "admin") {
    const verified = await verifyAdminAuth("admin");
    if (!verified) {
      return <AdminLogin />;
    }

    return <Dashboard />;
  }

  return <Homepage />;
}

export const revalidate = 0;
export const dynamic = "force-dynamic";
