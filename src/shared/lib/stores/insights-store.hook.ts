import { create } from "zustand";
import { getCurrentDate, get30DaysAgo } from "../utils";

export enum StatisticsTypesEnum {
  Average = "Average",
  Median = "Median",
}

interface IDates {
  from: string;
  to: string;
}

type InsightsStore = {
  statisticsType: StatisticsTypesEnum;
  setStatisticsType: (statisticsType: StatisticsTypesEnum) => void;
  dates: IDates;
  setFetchingDates: (dates: IDates) => void;
  singlePostID: string;
  setSinglePostID: (singlePostID: string) => void;
};

const defaultDates = {
  from: get30DaysAgo(),
  to: getCurrentDate(),
};

const useInsightsStore = create<InsightsStore>((set) => ({
  statisticsType: StatisticsTypesEnum.Average,
  setStatisticsType: (statisticsType) => set(() => ({ statisticsType })),
  dates: defaultDates,
  setFetchingDates: (dates) => set(() => ({ dates: dates })),
  singlePostID: "",
  setSinglePostID: (singlePostID) => set(() => ({ singlePostID: singlePostID })),
}));

export default useInsightsStore;
