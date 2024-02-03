import { getTikTokStatisticsByInfluencerIdWithVerificationCode } from "@entities/tik-tok-statistics/api";
import { IGetTikTokStatisticsByInfluencerIdWithVerificationCode } from "@entities/tik-tok-statistics/api/dto";
import { ITikTokLocalStatistics } from "@entities/tik-tok-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useTikTokStatisticsByInfluencerIdWithVerificationCodeQuery(
  queryParams: IGetTikTokStatisticsByInfluencerIdWithVerificationCode
) {
  const { influencerId, verificationCode, from, to } = queryParams;
  return useQuery<ITikTokLocalStatistics | null, any>({
    queryKey: [
      QueryKeys.TikTokLocalStatistics,
      `tik-tok-statistics-${influencerId}`,
      `tik-tok-statistics-code-${verificationCode}`,
      `tik-tok-statistics-range-${from}-${to}`,
    ],
    queryFn: () =>
      getTikTokStatisticsByInfluencerIdWithVerificationCode({
        influencerId,
        verificationCode,
        from,
        to,
      }),
  });
}
