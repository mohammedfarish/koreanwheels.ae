import isdev from "./functions/isdev";

export const mongoDBCred = process.env.MONGO_DB_CRED;

export const developmentSiteLockPasscode = process.env.DEVELOPMENT_SITE_LOCK_PASSCODE || "development";

export const domains = {
  customer: !isdev ? ["www.koreanwheels.ae", "koreanwheels.ae"] : ["localhost:3000"],
  admin: !isdev ? ["admin.koreanwheels.ae"] : ["127.0.0.1:3000"],
};
