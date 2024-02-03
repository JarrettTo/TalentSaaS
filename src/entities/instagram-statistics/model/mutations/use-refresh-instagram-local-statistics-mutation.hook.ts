import { refreshInstagramLocalStatistics } from "@entities/instagram-statistics/api";
import { queryClient } from "@shared/api";
import { QueryKeys } from "@shared/lib/enums";
import { useMutation } from "@tanstack/react-query";

export function useRefreshInstagramLocalStatisticsMutation() {
  return useMutation<void, any, number>({
    mutationFn: refreshInstagramLocalStatistics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.InstagramLocalStatistics] });
    },
  });
}
