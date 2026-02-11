import dbConnect from "@/utils/database/dbConnect";
import { login, logout, verifyAdminAuth } from "./auth";
import { createCustomer, listCustomers } from "./customer";
import { createUser, getUserData, listUsers, setUserActive } from "./user";

export const revalidate = async () => 0;

export type AuthConfig = { minRole: number };

export type ActionEntryWithAuth<T> = T & { auth?: AuthConfig };

const actions = [
  //  Auth
  {
    name: "login",
    handler: login,
  },
  {
    name: "logout",
    handler: logout,
  },
  {
    name: "get-user-data",
    handler: getUserData,
  },

  // Users
  {
    name: "create-user",
    handler: createUser,
    auth: {
      minRole: 10,
    },
  },
  {
    name: "list-users",
    handler: listUsers,
    auth: {
      minRole: 90,
    },
  },
  {
    name: "set-user-active",
    handler: setUserActive,
    auth: {
      minRole: 90,
    },
  },

  // Customers
  {
    name: "create-customer",
    handler: createCustomer,
    auth: {
      minRole: 10,
    },
  },
  {
    name: "list-customers",
    handler: listCustomers,
    auth: {
      minRole: 10,
    },
  },
] as const;

type ActionEntry = ActionEntryWithAuth<(typeof actions)[number]>;

export type DirectoryTypes = (typeof actions)[number]["name"];

export type FunctionMap = {
  [F in DirectoryTypes]: {
    args: Parameters<Extract<(typeof actions)[number], { name: F }>["handler"]>;
    returnType: Awaited<ReturnType<Extract<(typeof actions)[number], { name: F }>["handler"]>>;
  };
};

export type ActionResponse<ReturnType> = { success: false; error: string } | { success: true; data: ReturnType };

const actionFunction = async <ActionName extends DirectoryTypes>(
  action: ActionName,
  ...args: FunctionMap[ActionName]["args"]
): Promise<ActionResponse<FunctionMap[ActionName]["returnType"]>> => {
  const handler = actions.find((f) => f.name === action) as ActionEntry | undefined;

  if (!handler) {
    throw new Error(`Function ${action} not found`);
  }

  try {
    await dbConnect();

    const isLoggedIn = await verifyAdminAuth("admin");
    if (isLoggedIn) {
      if (handler.auth) {
        if (isLoggedIn.role < handler.auth.minRole) {
          throw new Error("You are not authorized to perform this action");
        }
      }
    }

    const response = (await handler.handler(
      // @ts-ignore
      ...args
    )) as FunctionMap[ActionName]["returnType"];

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message as string,
    };
  }
};

export default actionFunction;
