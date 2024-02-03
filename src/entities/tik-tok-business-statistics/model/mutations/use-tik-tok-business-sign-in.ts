import {
  ITikTokBusinessSignInDto,
  tikTokBusinessSignIn,
} from "@entities/tik-tok-business-statistics/api";
import { queryClient } from "@shared/api";
import { QueryKeys } from "@shared/lib/enums";
import { useMutation } from "@tanstack/react-query";

export function useTikTokBusinessSignInMutation() {
  return useMutation<void, any, ITikTokBusinessSignInDto>({
    mutationFn: tikTokBusinessSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TikTokLocalStatistics],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TikTokLocalStatisticsLogs],
      });
    },
  });
}
