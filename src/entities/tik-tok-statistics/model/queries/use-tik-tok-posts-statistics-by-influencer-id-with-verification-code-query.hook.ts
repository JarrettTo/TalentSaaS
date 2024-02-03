import { getTikTokPostsStatisticsByInfluencerIdWithVerificationCode } from "@entities/tik-tok-statistics/api";
import { IGetTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto } from "@entities/tik-tok-statistics/api/dto";
import { ITikTokPostsStatistics } from "@entities/tik-tok-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useTikTokPostsStatisticsByInfluencerIdWithVerificationCodeQuery(
  getTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto: IGetTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto
) {
  const { influencerId, verificationCode, from, to } =
    getTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto;
  return useQuery<ITikTokPostsStatistics | null, any>({
    queryKey: [
      QueryKeys.TikTokPostsStatistics,
      `tik-tok-posts-statistics-${influencerId}`,
      `tik-tok-posts-statistics-code-${verificationCode}`,
      `tik-tok-posts-statistics-range-${from}-${to}`,
    ],
    queryFn: () =>
      getTikTokPostsStatisticsByInfluencerIdWithVerificationCode({
        influencerId,
        verificationCode,
        from,
        to,
      }),
  });
}
