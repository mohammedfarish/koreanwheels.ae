import { getSiteType } from "@/utils/functions/domain";
import mongoose, { Model } from "mongoose";

export type LogInDBType = {
  _id: string;

  action: string;
  ip: string;
  user: string;
  towards: string;
  siteType: Awaited<ReturnType<typeof getSiteType>>;

  createdAt: Date;
  updatedAt: Date;
};

// @ts-ignore
const schema = new mongoose.Schema<LogInDBType>(
  {
    action: String,
    ip: String,
    user: String,
    towards: String,
  },
  {
    timestamps: true,
  }
);

const logSchema: Model<LogInDBType> = mongoose.models.logs || mongoose.model("logs", schema);

export default logSchema;
