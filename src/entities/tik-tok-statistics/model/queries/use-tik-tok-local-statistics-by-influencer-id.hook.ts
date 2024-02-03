import { getTikTokLocalStatisticsByInfluencerId } from "@entities/tik-tok-statistics/api";
import { ITikTokLocalStatistics } from "@entities/tik-tok-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useTikTokLocalStatisticsByInfluencerIdQuery(influencerId?: number) {
  return useQuery<ITikTokLocalStatistics | null, any>({
    queryKey: [QueryKeys.TikTokLocalStatistics, `quote-${influencerId}`],
    queryFn: () =>
      typeof influencerId === "number"
        ? getTikTokLocalStatisticsByInfluencerId(influencerId)
        : null,
    enabled: typeof influencerId === "number",
  });
}
