import { getYoutubeLocalStatisticsByInfluencerId } from "@entities/youtube-statistics/api";
import { IYoutubeLocalStatistics } from "@entities/youtube-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeLocalStatisticsByInfluencerIdQuery(influencerId?: number) {
  return useQuery<IYoutubeLocalStatistics | null, any>({
    queryKey: [
      QueryKeys.YoutubeLocalStatistics,
      `youtube-local-statistics-${influencerId}`,
    ],
    queryFn: () =>
      typeof influencerId === "number"
        ? getYoutubeLocalStatisticsByInfluencerId(influencerId)
        : null,
    enabled: typeof influencerId === "number",
  });
}
