import { getTikTokPostsStatisticsByInfluencerId } from "@entities/tik-tok-statistics/api";
import { IGetTikTokPostsStatisticsByInfluencerIdDto } from "@entities/tik-tok-statistics/api/dto";
import { ITikTokPostsStatistics } from "@entities/tik-tok-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useTikTokPostsStatisticsByInfluencerIdQuery(
  getTikTokPostsStatisticsByInfluencerIdDto: IGetTikTokPostsStatisticsByInfluencerIdDto
) {
  const { influencerId, from, to } = getTikTokPostsStatisticsByInfluencerIdDto;
  return useQuery<ITikTokPostsStatistics | null, any>({
    queryKey: [
      QueryKeys.TikTokPostsStatistics,
      `tik-tok-posts-statistics-${influencerId}`,
      `tik-tok-posts-statistics-range-${from}-${to}`,
    ],
    queryFn: () =>
      typeof influencerId === "number"
        ? getTikTokPostsStatisticsByInfluencerId({ influencerId, from, to })
        : null,
    enabled: typeof influencerId === "number",
  });
}
