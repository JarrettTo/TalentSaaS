import { getYoutubeLocalStatisticsLogsByInfluencerId } from "@entities/youtube-statistics/api";
import { IYoutubeLocalStatisticsLog } from "@entities/youtube-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeLocalStatisticsLogsByInfluencerIdQuery(influencerId?: number) {
  return useQuery<IYoutubeLocalStatisticsLog[] | null, any>({
    queryKey: [
      QueryKeys.YoutubeLocalStatisticsLogs,
      `youtube-local-statistics-logs-${influencerId}`,
    ],
    queryFn: () =>
      typeof influencerId === "number"
        ? getYoutubeLocalStatisticsLogsByInfluencerId(influencerId)
        : null,
    enabled: typeof influencerId === "number",
  });
}
