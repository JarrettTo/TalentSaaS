import { getInstagramLocalStatisticsLogsByInfluencerId } from "@entities/instagram-statistics/api";
import { IInstagramLocalStatisticsLog } from "@entities/instagram-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useInstagramLocalStatisticsLogsByInfluencerIdQuery(
  influencerId?: number
) {
  return useQuery<IInstagramLocalStatisticsLog[] | null, any>({
    queryKey: [
      QueryKeys.InstagramLocalStatisticsLogs,
      `instagram-local-statistics-logs-${influencerId}`,
    ],
    queryFn: () =>
      typeof influencerId === "number"
        ? getInstagramLocalStatisticsLogsByInfluencerId(influencerId)
        : null,
    enabled: typeof influencerId === "number",
  });
}
