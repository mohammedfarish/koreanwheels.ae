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

  const existingUser = await userSchema.findOne({ email, siteType });
  if (existingUser) {
    throw new Error("User already exists");
  }

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
    towards: newUser._id,
    user: (await getUserData())?.id,
  });

  return newUser._id;
};

export const listUsers = async () => {
  const users = await userSchema.find({ siteType: "admin" });
  return users.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    role: user.role,
    active: user.active,
    siteType: user.siteType,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};

export const setUserActive = async (id: string, active: boolean) => {
  const user = await userSchema.findById(id);
  if (!user) throw new Error("User not found");
  user.active = active;
  await user.save();
  await recordLog({
    action: "set-user-active",
    towards: user._id,
    user: (await getUserData())?.id,
  });
  return true;
};

export const getUser = async (id: string): Promise<GlobalState["userData"] | undefined> => {
  const user = await userSchema.findById(id);
  if (!user) return undefined;
  if (!user.active) return undefined;

  return {
    id: user._id.toString(),
    name: user.name,
    role: user.role,
    active: user.active,
    siteType: user.siteType,
  };
};

export const getUserData = async (): Promise<GlobalState["userData"]> => {
  const auth = await verifyAdminAuth("admin");
  if (!auth) return undefined;

  const user = await getUser(auth.id);
  if (!user) return undefined;

  return {
    id: user.id,
    active: user.active,
    name: user.name,
    role: user.role,
    siteType: user.siteType,
  };
};
