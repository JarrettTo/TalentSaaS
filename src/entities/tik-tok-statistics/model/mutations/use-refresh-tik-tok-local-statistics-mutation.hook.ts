import { refreshTikTokLocalStatistics } from "@entities/tik-tok-statistics/api";
import { queryClient } from "@shared/api";
import { QueryKeys } from "@shared/lib/enums";
import { useMutation } from "@tanstack/react-query";

export function useRefreshTikTokLocalStatisticsMutation() {
  return useMutation<void, any, number>({
    mutationFn: refreshTikTokLocalStatistics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TikTokLocalStatistics] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.TikTokLocalStatisticsLogs] });
    },
  });
}
