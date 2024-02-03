import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IYoutubePostsStatistics } from "../lib/interfaces";
import { IGetYoutubePostsStatisticsByInfluencerIdDto } from "./dto";

export async function getYoutubePostsStatisticsByInfluencerId(
  getYoutubePostsStatisticsByInfluencerIdDto: IGetYoutubePostsStatisticsByInfluencerIdDto
) {
  const { influencerId, ...requestBodyDto } = getYoutubePostsStatisticsByInfluencerIdDto;
  try {
    const { data } = await baseClient.post<
      IBaseResponseDto<IYoutubePostsStatistics>,
      AxiosResponse<IBaseResponseDto<IYoutubePostsStatistics>, typeof requestBodyDto>,
      typeof requestBodyDto
    >(`/youtube/${influencerId}/video-list`, requestBodyDto);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
