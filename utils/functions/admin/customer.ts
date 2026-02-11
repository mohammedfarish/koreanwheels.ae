import customerSchema from "@/utils/database/schemas/customerSchema";
import { z } from "zod";
import { getUser, getUserData } from "./user";
import { recordLog } from "./logs";

const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  userId: z.string().optional(),
});

export const createCustomer = async (customer: z.infer<typeof createCustomerSchema>) => {
  const { name, email, phone, userId } = createCustomerSchema.parse(customer);

  const existingCustomerByEmail = await customerSchema.findOne({ email });
  if (existingCustomerByEmail) throw new Error("Customer already exists");

  if (userId) {
    const existingCustomerByUserId = await customerSchema.findOne({ userId });
    if (existingCustomerByUserId) throw new Error("Customer already exists");
  }

  const newCustomer = await customerSchema.create({ name, email, phone, userId });
  return newCustomer._id;
};

export const listCustomers = async () => {
  const customers = await customerSchema.find();
  const list = await Promise.all(
    customers.map(async (customer) => {
      let user: Awaited<ReturnType<typeof getUser>> = undefined;
      if (customer.userId) {
        user = await getUser(customer.userId);
      }
      return {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        user,
        createdAt: customer.createdAt,
      };
    })
  );
  return list;
};
