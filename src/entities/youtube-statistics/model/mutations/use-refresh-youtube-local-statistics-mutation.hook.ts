import { refreshYoutubeLocalStatistics } from "@entities/youtube-statistics/api";
import { queryClient } from "@shared/api";
import { QueryKeys } from "@shared/lib/enums";
import { useMutation } from "@tanstack/react-query";

export function useRefreshYoutubeLocalStatisticsMutation() {
  return useMutation<void, any, number>({
    mutationFn: refreshYoutubeLocalStatistics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.YoutubeLocalStatistics] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.YoutubeLocalStatisticsLogs] });
    },
  });
}
