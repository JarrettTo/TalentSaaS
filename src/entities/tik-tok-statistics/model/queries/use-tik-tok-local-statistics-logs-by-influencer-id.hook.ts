import { getTikTokLocalStatisticsLogsByInfluencerId } from "@entities/tik-tok-statistics/api";
import { ITikTokLocalStatisticsLog } from "@entities/tik-tok-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useTikTokLocalStatisticsLogsByInfluencerIdQuery(influencerId?: number) {
  return useQuery<ITikTokLocalStatisticsLog[] | null, any>({
    queryKey: [
      QueryKeys.TikTokLocalStatisticsLogs,
      `tik-tok-local-statistics-logs-${influencerId}`,
    ],
    queryFn: () =>
      typeof influencerId === "number"
        ? getTikTokLocalStatisticsLogsByInfluencerId(influencerId)
        : null,
    enabled: typeof influencerId === "number",
  });
}
