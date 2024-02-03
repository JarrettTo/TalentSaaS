import { IOldPlacement } from "@widgets/influencer";
import { create } from "zustand";

type RatesStore = {
  zustandPlacements: IOldPlacement[] | null;
  setZustandPlacements: (zustandPlacements: IOldPlacement[] | null) => void;
};

const usePlacementsStore = create<RatesStore>((set) => ({
  zustandPlacements: null,
  setZustandPlacements: (values) => set((state) => ({ zustandPlacements: values })),
}));

export default usePlacementsStore;
