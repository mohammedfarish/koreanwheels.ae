import logSchema, { LogInDBType } from "@/utils/database/schemas/logSchema";
import { getIP, getSiteType } from "../domain";

export const recordLog = async ({ action, towards, user }: { action: string; towards: string; user?: string }) => {
  await logSchema.create({
    ip: await getIP(),
    siteType: await getSiteType(),
    action,
    towards,
    user,
  } as Partial<LogInDBType>);

  return true;
};
