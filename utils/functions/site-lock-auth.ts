import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import { cookies } from "next/headers";
import { developmentSiteLockPasscode } from "../config";

const devAuth = "dev-auth";
const devAuthSecret = process.env.GIT_COMMIT_SHA || process.env.NEXT_BUILD_ID || "development-app";
const generateAutCookie = async () => {
  const token = jwt.sign({ token: "dev-token" }, devAuthSecret, { expiresIn: "24h" });
  (await cookies()).set(devAuth, token, {
    expires: moment().add(24, "hours").toDate(),
  });

  return token;
};

export const authenticate = async (passcode: string) => {
  if (passcode !== developmentSiteLockPasscode) {
    throw new Error("Invalid passcode");
  }
  await generateAutCookie();
  return true;
};

export const verifyAuth = async () => {
  const token = (await cookies()).get(devAuth);
  if (!token) return false;
  const verify = jwt.verify(token.value, devAuthSecret);

  const verified = !!verify;
  if (token && !verified) {
    (await cookies()).delete(devAuth);
  }

  return verified;
};
