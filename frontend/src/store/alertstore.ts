import { create } from "zustand";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertState {
  isOpen: boolean;
  message: string;
  type: AlertType;
  showAlert: (msg: string, type?: AlertType) => void;
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
