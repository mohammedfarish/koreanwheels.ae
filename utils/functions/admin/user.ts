import { z } from "zod";
import bcrypt from "bcryptjs";

import { getSiteType } from "../domain";
import userSchema from "@/utils/database/schemas/userSchema";
import { GlobalState } from "@/utils/globalState";
import { verifyAdminAuth } from "./auth";
import { recordLog } from "./logs";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.number(),
  siteType: z.enum(["admin", "customer"] as Awaited<ReturnType<typeof getSiteType>>[]),
});

export const createUser = async (user: z.infer<typeof createUserSchema>) => {
  const { email, password, name, role, siteType } = createUserSchema.parse(user);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userSchema.create({
    email,
    name,
    active: true,
    password: hashedPassword,
    role,
    siteType,
  });

  await recordLog({
    action: "create-user",
    towards: newUser._id.toString(),
    user: await getUserData(),
  });

  return newUser._id;
};

export const getUser = async (id: string): Promise<GlobalState["userData"] | undefined> => {
  const user = await userSchema.findById(id);
  if (!user) return undefined;
  if (!user.active) return undefined;

  return {
    id: user._id.toString(),
    name: user.name,
    role: user.role,
    siteType: user.siteType,
  };
};

export const getUserData = async (): Promise<GlobalState["userData"]> => {
  const auth = await verifyAdminAuth();
  if (!auth) return undefined;

  const user = await getUser(auth.id);
  if (!user) return undefined;

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    siteType: user.siteType,
  };
};
