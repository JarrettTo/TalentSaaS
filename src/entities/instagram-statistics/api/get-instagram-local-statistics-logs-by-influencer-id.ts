import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IInstagramLocalStatisticsLog } from "../lib/interfaces";

export async function getInstagramLocalStatisticsLogsByInfluencerId(
  influencerId: number
) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IInstagramLocalStatisticsLog[]>,
      AxiosResponse<IBaseResponseDto<IInstagramLocalStatisticsLog[]>, void>,
      void
    >(`/instagram/${influencerId}/local-log-statistic`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
