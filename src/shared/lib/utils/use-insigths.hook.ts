import { roundNumber } from "@shared/lib/utils";
import { ITotalStatistic } from "@widgets/influencer";

interface ITotalData {
  totalFollowers: number;
  totalViews: number;
  totalEngagement: number;
  instagramFollowers: number;
  youtubeFollowers: number;
  tiktokFollowers: number;
  instagramViews: number;
  youtubeViews: number;
  tiktokViews: number;
  instagramEngagement: number;
  youtubeEngagement: number;
  tiktokEngagement: number;
}

export const useInsights = () => {
  const getTotalInsightsObject = (data: ITotalData) => {
    const formattedObject: ITotalStatistic = {
      totalFollowers: data.totalFollowers,
      totalViews: data.totalViews,
      averageAllViewsPerPlatformCount: roundNumber(data.totalViews / 3),
      averageAllEngagementPerPlatformCount: roundNumber(data.totalEngagement / 3),
      totalFollowersInSocials: {
        instagramFollowers: roundNumber(Number(data.instagramFollowers)),
        youtubeFollowers: roundNumber(Number(data.youtubeFollowers)),
        tikTokFollowers: roundNumber(Number(data.tiktokFollowers)),
      },
      totalViewsInSocials: {
        instagramViews: roundNumber(Number(data.instagramViews)),
        youtubeViews: roundNumber(Number(data.youtubeViews)),
        tikTokViews: roundNumber(Number(data.tiktokViews)),
      },
      totalEngagementInSocials: {
        instagramEngagement: roundNumber(Number(data.instagramEngagement)),
        youtubeEngagement: roundNumber(Number(data.youtubeEngagement)),
        tikTokEngagement: roundNumber(Number(data.tiktokEngagement)),
      },
    };
    return formattedObject;
  };

  return { getTotalInsightsObject };
};
