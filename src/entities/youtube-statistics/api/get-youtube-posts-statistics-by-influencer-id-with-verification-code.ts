import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IYoutubePostsStatistics } from "../lib/interfaces";
import { IGetYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto } from "./dto";

export async function getYoutubePostsStatisticsByInfluencerIdWithVerificationCode(
  getYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto: IGetYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto
) {
  const { influencerId, verificationCode, ...requestBodyDto } =
    getYoutubePostsStatisticsByInfluencerIdWithVerificationCodeDto;
  try {
    const { data } = await baseClient.post<
      IBaseResponseDto<IYoutubePostsStatistics>,
      AxiosResponse<IBaseResponseDto<IYoutubePostsStatistics>, typeof requestBodyDto>,
      typeof requestBodyDto
    >(
      `/youtube/${influencerId}/unauthorized/video-list/${verificationCode}`,
      requestBodyDto
    );
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
