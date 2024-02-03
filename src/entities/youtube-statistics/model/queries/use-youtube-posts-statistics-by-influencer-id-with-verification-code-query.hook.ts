import { getYoutubePostsStatisticsByInfluencerIdWithVerificationCode } from "@entities/youtube-statistics/api";
import { IGetYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto } from "@entities/youtube-statistics/api/dto";
import { IYoutubePostsStatistics } from "@entities/youtube-statistics/lib/interfaces";
import { QueryKeys } from "@shared/lib/enums";
import { useQuery } from "@tanstack/react-query";

export function useYoutubePostsStatisticsByInfluencerIdWithVerificationCodeQuery(
  getYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto: IGetYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto
) {
  const { influencerId, verificationCode, from, to } =
    getYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto;
  return useQuery<IYoutubePostsStatistics | null, any>({
    queryKey: [
      QueryKeys.YoutubePostsStatistics,
      `youtube-posts-statistics-${influencerId}`,
      `youtube-posts-statistics-code-${verificationCode}`,
      `youtube-posts-statistics-range-${from}-${to}`,
    ],
    queryFn: () =>
      getYoutubePostsStatisticsByInfluencerIdWithVerificationCode({
        influencerId,
        verificationCode,
        from,
        to,
      }),
  });
}
