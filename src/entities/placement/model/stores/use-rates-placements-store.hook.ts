import { IRatesPlacement } from "@entities/placement/lib/interfaces";
import { create } from "zustand";

interface IRatesPlacementsStore {
  ratesPlacements: IRatesPlacement[];
  setRatesPlacements: (ratesPlacements: IRatesPlacement[]) => void;
}

export const useRatesPlacementsStore = create<IRatesPlacementsStore>()((set) => ({
  ratesPlacements: [],
  setRatesPlacements: (ratesPlacements) => set(() => ({ ratesPlacements })),
}));
