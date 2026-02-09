import mongoose from "mongoose";
import { mongoDBCred } from "../config";

let isConnected: any;

export default async function dbConnect() {
  if (!mongoDBCred) throw new Error("MongoDB credentials not found");

  if (isConnected) {
    return mongoose;
  }

  await mongoose.set("strictQuery", true).connect(mongoDBCred);

  isConnected = mongoose.connections[0].readyState;

  return mongoose;
}
