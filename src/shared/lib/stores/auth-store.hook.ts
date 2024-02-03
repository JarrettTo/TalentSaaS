import { IUser } from "@shared/constants";
import { create } from "zustand";

type Store = {
  User: IUser | null;
  requestLoading: boolean;
  setUser: (user: IUser | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  authUser?: IUser | null;
};

const useAuthStore = create<Store>((set) => ({
  User: null,
  requestLoading: false,
  setUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
}));

export default useAuthStore;
