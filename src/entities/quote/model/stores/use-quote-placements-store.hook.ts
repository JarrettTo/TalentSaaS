import { IQuotePlacement } from "@entities/quote/lib/interfaces";
import { create } from "zustand";

interface IQuotePlacementsStore {
  quotePlacements: IQuotePlacement[];
  setQuotePlacements: (quotePlacements: IQuotePlacement[]) => void;
}

export const useQuotePlacementsStore = create<IQuotePlacementsStore>()((set) => ({
  quotePlacements: [],
  setQuotePlacements: (quotePlacements) => set(() => ({ quotePlacements })),
}));
