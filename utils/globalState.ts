import { create } from "zustand";
import { getSiteType } from "./functions/domain";
import type { ReactNode } from "react";

export interface ModalState {
  open: boolean;
  title?: string;
  description?: string;
  content: ReactNode;
}

export interface GlobalState {
  userData?: {
    id: string;
    name: string;
    role: number;
    active: boolean;
    siteType: Awaited<ReturnType<typeof getSiteType>>;
  };
  setUserData: (userData: GlobalState["userData"]) => void;

  modal: ModalState;
  openModal: (payload: Omit<ModalState, "open">) => void;
  closeModal: () => void;
}

const initialModalState: ModalState = {
  open: false,
  content: null,
};

export const useGlobalState = create<GlobalState>((set) => ({
  userData: undefined,
  setUserData: (userData: GlobalState["userData"]) => set({ userData }),

  modal: initialModalState,
  openModal: (payload) =>
    set({
      modal: {
        open: true,
        title: payload.title,
        description: payload.description,
        content: payload.content,
      },
    }),
  closeModal: () =>
    set({
      modal: { ...initialModalState },
    }),
}));
