import { IInfluencer } from "@widgets/influencer";
import { create } from "zustand";

type InfluencersStore = {
  zustandInfluencers: IInfluencer[] | null;
  setZustandInfluencers: (zustandPlacements: IInfluencer[]) => void;
};

const useInfluencersStore = create<InfluencersStore>((set) => ({
  zustandInfluencers: null,
  setZustandInfluencers: (values) => {
    set(() => ({
      zustandInfluencers: values,
    }));
  },
}));

export default useInfluencersStore;
