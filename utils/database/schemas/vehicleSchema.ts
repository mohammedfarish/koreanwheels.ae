import mongoose, { Model } from "mongoose";

export type VehicleInDBType = {
  _id: string;

  status: "available" | "sold" | "pending" | "reserved";

  listing: "listed" | "unlisted" | "archived";

  vin: string;

  pricing: {
    cost?: number;
    highestSellingPrice: number;
    lowestSellingPrice: number;
  };

  mileage: number;
  year: number;
  make: string;
  model: string;
  trim: string;
  color: string;
  transmission: string;

  createdAt: Date;
  updatedAt: Date;
};
