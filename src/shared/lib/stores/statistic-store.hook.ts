import { ITotalStatistic } from "@widgets/influencer";
import { create } from "zustand";
import { kFormatter } from "../utils";

type StatisticStore = {
  zustandStatistic: ITotalStatistic;
  setZustandStatistic: (zustandPlacements: ITotalStatistic) => void;
};

const useStatisticStore = create<StatisticStore>((set) => ({
  zustandStatistic: {
    totalFollowers: 0,
    totalViews: 0,
    averageAllViewsPerPlatformCount: 0,
    averageAllEngagementPerPlatformCount: 0,
    totalFollowersInSocials: {
      instagramFollowers: 0,
      youtubeFollowers: 0,
      tikTokFollowers: 0,
    },
    totalViewsInSocials: {
      instagramViews: 0,
      youtubeViews: 0,
      tikTokViews: 0,
    },
    totalEngagementInSocials: {
      instagramEngagement: 0,
      youtubeEngagement: 0,
      tikTokEngagement: 0,
    },
  },
  setZustandStatistic: (values) => {
    const updatedValues: ITotalStatistic = {
      ...values,
      totalFollowers: kFormatter(values.totalFollowers as number),
      totalViews: kFormatter(values.totalViews as number),
      averageAllViewsPerPlatformCount: kFormatter(
        values.averageAllViewsPerPlatformCount as number
      ),
    };
    set(() => ({
      zustandStatistic: updatedValues,
    }));
  },
}));

export default useStatisticStore;
