import mongoose, { Model } from "mongoose";

export type CustomerInDBType = {
  _id: string;

  name: string;
  email: string;
  phone: string;

  userId?: string;

  createdAt: Date;
  updatedAt: Date;
};

// @ts-ignore
const schema = new mongoose.Schema<CustomerInDBType>(
  {
    name: String,
    email: String,
    phone: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const customerSchema: Model<CustomerInDBType> = mongoose.models.customers || mongoose.model("customers", schema);

export default customerSchema;
