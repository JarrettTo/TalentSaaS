import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { ITikTokPostsStatistics } from "../lib/interfaces";
import { IGetTikTokPostsStatisticsByInfluencerIdDto } from "./dto";

export async function getTikTokPostsStatisticsByInfluencerId(
  getTikTokPostsStatisticsByInfluencerIdDto: IGetTikTokPostsStatisticsByInfluencerIdDto
) {
  const { influencerId, ...requestBodyDto } = getTikTokPostsStatisticsByInfluencerIdDto;
  try {
    const { data } = await baseClient.post<
      IBaseResponseDto<ITikTokPostsStatistics>,
      AxiosResponse<IBaseResponseDto<ITikTokPostsStatistics>, typeof requestBodyDto>,
      typeof requestBodyDto
    >(`/tiktok/${influencerId}/video-list`, requestBodyDto);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
