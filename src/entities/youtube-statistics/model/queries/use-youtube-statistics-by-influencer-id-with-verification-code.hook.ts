import { getYoutubeStatisticsByInfluencerIdWithVerificationCode } from "@entities/youtube-statistics/api";
import { IGetYoutubeStatisticsByInfluencerIdWithVerificationCode } from "@entities/youtube-statistics/api/dto";
import { IYoutubeLocalStatistics } from "@entities/youtube-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useYoutubeStatisticsByInfluencerIdWithVerificationCodeQuery(
  queryParams: IGetYoutubeStatisticsByInfluencerIdWithVerificationCode
) {
  const { influencerId, verificationCode, from, to } = queryParams;
  return useQuery<IYoutubeLocalStatistics | null, any>({
    queryKey: [
      QueryKeys.YoutubeLocalStatistics,
      `youtube-statistics-${influencerId}`,
      `youtube-statistics-code-${verificationCode}`,
      `youtube-statistics-range-${from}-${to}`,
    ],
    queryFn: () =>
      getYoutubeStatisticsByInfluencerIdWithVerificationCode({
        influencerId,
        verificationCode,
        from,
        to,
      }),
  });
}
