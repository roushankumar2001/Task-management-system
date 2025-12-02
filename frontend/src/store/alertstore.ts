import { create } from "zustand";
import { ReactNode } from "react";
type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
  isOpen: boolean;
  message: ReactNode;
  type: AlertType;
  showAlert: (msg: ReactNode, type?: AlertType) => void;
  closeAlert: () => void;
}

export const useAlertstore = create<AlertState>((set) => ({
  isOpen: false,
  message: "",
  type: "info",

  showAlert: (message, type = "info") =>
    set({ isOpen: true, message, type }),

  closeAlert: () =>
    set({ isOpen: false, message: "" }),
}));
