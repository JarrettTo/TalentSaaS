import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IPlacementLastLog } from "../lib/interfaces";

export async function getPlacementsLastLogs() {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IPlacementLastLog[]>,
      AxiosResponse<IBaseResponseDto<IPlacementLastLog[]>, void>,
      void
    >("/influencer/placements-last-logs");
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
