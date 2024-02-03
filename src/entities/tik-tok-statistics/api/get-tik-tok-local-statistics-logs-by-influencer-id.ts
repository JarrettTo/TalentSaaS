import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { ITikTokLocalStatisticsLog } from "../lib/interfaces";

export async function getTikTokLocalStatisticsLogsByInfluencerId(influencerId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<ITikTokLocalStatisticsLog[]>,
      AxiosResponse<IBaseResponseDto<ITikTokLocalStatisticsLog[]>, void>,
      void
    >(`/tiktok/${influencerId}/log-statistic`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
