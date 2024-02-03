import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IYoutubeLocalStatisticsLog } from "../lib/interfaces";

export async function getYoutubeLocalStatisticsLogsByInfluencerId(influencerId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IYoutubeLocalStatisticsLog[]>,
      AxiosResponse<IBaseResponseDto<IYoutubeLocalStatisticsLog[]>, void>,
      void
    >(`/youtube/${influencerId}/local-log-statistic`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
