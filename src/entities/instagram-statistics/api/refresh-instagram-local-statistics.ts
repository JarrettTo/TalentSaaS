import { baseClient } from "@shared/api";
import { AxiosResponse } from "axios";

export async function refreshInstagramLocalStatistics(influencerId: number) {
  try {
    await baseClient.post<void, AxiosResponse<void, void>, void>(
      `/instagram/${influencerId}/local-statistic`
    );
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
