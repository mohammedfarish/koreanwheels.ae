import { redirect } from "next/navigation";

import { verifyAdminAuth } from "@/utils/functions/admin/auth";
import CustomerPage from "@/components/admin/customer/CustomerPage";

const page = async () => {
  const isLoggedIn = await verifyAdminAuth("admin", 90);
  if (!isLoggedIn) {
    return redirect("/");
  }

  return <CustomerPage />;
};

export default page;
