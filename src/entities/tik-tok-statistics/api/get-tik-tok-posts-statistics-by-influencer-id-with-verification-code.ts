import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { ITikTokPostsStatistics } from "../lib/interfaces";
import { IGetTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto } from "./dto";

export async function getTikTokPostsStatisticsByInfluencerIdWithVerificationCode(
  getTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto: IGetTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto
) {
  const { influencerId, verificationCode, ...requestBodyDto } =
    getTikTokPostsStatisticsByInfluencerIdWithVerificationCodeDto;
  try {
    const { data } = await baseClient.post<
      IBaseResponseDto<ITikTokPostsStatistics>,
      AxiosResponse<IBaseResponseDto<ITikTokPostsStatistics>, typeof requestBodyDto>,
      typeof requestBodyDto
    >(
      `/tiktok/${influencerId}/unauthorized/video-list/${verificationCode}`,
      requestBodyDto
    );
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
