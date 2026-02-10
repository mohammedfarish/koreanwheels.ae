import { create } from "zustand";
import { getSiteType } from "./functions/domain";

export interface GlobalState {
  userData?: {
    id: string;
    name: string;
    role: number;
    siteType: Awaited<ReturnType<typeof getSiteType>>;
  };
  setUserData: (userData: GlobalState["userData"]) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  userData: undefined,
  setUserData: (userData: GlobalState["userData"]) => set({ userData }),
}));
