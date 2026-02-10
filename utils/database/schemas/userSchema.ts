import { getSiteType } from "@/utils/functions/domain";
import mongoose, { Model } from "mongoose";
export type UserInDBType = {
  _id: string;

  name: string;
  email: string;
  password: string;
  siteType: Awaited<ReturnType<typeof getSiteType>>;
  role: number;
  active: boolean;

  createdAt: Date;
  updatedAt: Date;
};

// @ts-ignore
const schema = new mongoose.Schema<UserInDBType>(
  {
    email: String,
    password: String,
    name: String,
    siteType: String,
    role: Number,
    active: Boolean,
  },
  {
    timestamps: true,
  }
);

const userSchema: Model<UserInDBType> = mongoose.models.users || mongoose.model("users", schema);

export default userSchema;
