import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IYoutubeLocalStatistics } from "../lib/interfaces";

export async function getYoutubeLocalStatisticsByInfluencerId(influencerId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IYoutubeLocalStatistics>,
      AxiosResponse<IBaseResponseDto<IYoutubeLocalStatistics>, void>,
      void
    >(`/youtube/${influencerId}/local-statistic`);
    console.log(data.data)
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
