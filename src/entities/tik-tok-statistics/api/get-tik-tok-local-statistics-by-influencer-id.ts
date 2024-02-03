import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { ITikTokLocalStatistics } from "../lib/interfaces";

export async function getTikTokLocalStatisticsByInfluencerId(influencerId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<ITikTokLocalStatistics>,
      AxiosResponse<IBaseResponseDto<ITikTokLocalStatistics>, void>,
      void
    >(`/tiktok/${influencerId}/local-statistic`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
