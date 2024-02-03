import { getInstagramStatisticsByInfluencerIdWithVerificationCode } from "@entities/instagram-statistics/api";
import { IGetInstagramStatisticsByInfluencerIdWithVerificationCode } from "@entities/instagram-statistics/api/dto";
import { IInstagramLocalStatistics } from "@entities/instagram-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useInstagramStatisticsByInfluencerIdWithVerificationCodeQuery(
  queryParams: IGetInstagramStatisticsByInfluencerIdWithVerificationCode
) {
  const { influencerId, verificationCode } = queryParams;
  return useQuery<IInstagramLocalStatistics | null, any>({
    queryKey: [
      QueryKeys.InstagramLocalStatistics,
      `instagram-statistics-${influencerId}`,
      `instagram-statistics-code-${verificationCode}`,
    ],
    queryFn: () =>
      getInstagramStatisticsByInfluencerIdWithVerificationCode({
        influencerId,
        verificationCode,
      }),
  });
}
