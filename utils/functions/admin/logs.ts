import logSchema from "@/utils/database/schemas/logSchema";
import { getIP, getSiteType } from "../domain";
import { GlobalState } from "@/utils/globalState";

export const recordLog = async ({ action, towards, user }: { action: string; towards: string; user?: GlobalState["userData"] }) => {
  await logSchema.create({
    ip: await getIP(),
    siteType: await getSiteType(),
    action,
    towards,
    user,
  });

  return true;
};
