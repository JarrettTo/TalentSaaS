import { getInstagramLocalStatisticsByInfluencerId } from "@entities/instagram-statistics/api";
import { IInstagramLocalStatistics } from "@entities/instagram-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useInstagramLocalStatisticsByInfluencerIdQuery(influencerId?: number) {
  return useQuery<IInstagramLocalStatistics | null, any>({
    queryKey: [QueryKeys.InstagramLocalStatistics, `quote-${influencerId}`],
    queryFn: () =>
      typeof influencerId === "number"
        ? getInstagramLocalStatisticsByInfluencerId(influencerId)
        : null,
    enabled: typeof influencerId === "number",
  });
}
