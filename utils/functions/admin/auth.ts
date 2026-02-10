import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
import { sleep } from "../misc";
import { getUser } from "./user";
import z from "zod";
import userSchema from "@/utils/database/schemas/userSchema";
import bcrypt from "bcryptjs";

const tokenData = async (id: string) => {
  const user = await getUser(id);
  if (!user) throw new Error("User not found");
  return user;
};

const tokenName = "admin-token";
const authSecret = "secret";
const generateAdminAuthCookie = async (id: string) => {
  const payload = await tokenData(id);
  const token = jwt.sign(payload, authSecret, { expiresIn: "1h" });
  (await cookies()).set(tokenName, token, {
    expires: moment().add(1, "hours").toDate(),
  });
};

export const verifyAdminAuth = async () => {
  const token = (await cookies()).get(tokenName);
  if (!token) return false;
  const verify = jwt.verify(token.value, authSecret) as Awaited<ReturnType<typeof tokenData>> | undefined;
  if (!verify) return false;
  return verify;
};

const loginRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const login = async (data: z.infer<typeof loginRequest>) => {
  const { email, password } = loginRequest.parse(data);

  const user = await userSchema.findOne({ email });
  if (!user) throw new Error("User not found");
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Invalid password");

  await sleep(1000 * 2);
  await generateAdminAuthCookie(user._id.toString());

  return {
    success: true,
    message: "Login successful",
  };
};

export const logout = async () => {
  (await cookies()).delete(tokenName);
  return {
    success: true,
    message: "Logout successful",
  };
};
