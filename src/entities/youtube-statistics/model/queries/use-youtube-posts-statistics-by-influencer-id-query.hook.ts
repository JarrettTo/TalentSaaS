import { getYoutubePostsStatisticsByInfluencerId } from "@entities/youtube-statistics/api";
import { IGetYoutubePostsStatisticsByInfluencerIdDto } from "@entities/youtube-statistics/api/dto";
import { IYoutubePostsStatistics } from "@entities/youtube-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useYoutubePostsStatisticsByInfluencerIdQuery(
  getYoutubePostsStatisticsByInfluencerIdDto: IGetYoutubePostsStatisticsByInfluencerIdDto
) {
  const { influencerId, from, to } = getYoutubePostsStatisticsByInfluencerIdDto;
  return useQuery<IYoutubePostsStatistics | null, any>({
    queryKey: [
      QueryKeys.YoutubePostsStatistics,
      `youtube-posts-statistics-${influencerId}`,
      `youtube-posts-statistics-range-${from}-${to}`,
    ],
    queryFn: () =>
      typeof influencerId === "number"
        ? getYoutubePostsStatisticsByInfluencerId({ influencerId, from, to })
        : null,
    enabled: typeof influencerId === "number",
  });
}
