import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IInstagramLocalStatistics } from "../lib/interfaces";

export async function getInstagramLocalStatisticsByInfluencerId(influencerId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IInstagramLocalStatistics>,
      AxiosResponse<IBaseResponseDto<IInstagramLocalStatistics>, void>,
      void
    >(`/instagram/${influencerId}/local-statistic`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
