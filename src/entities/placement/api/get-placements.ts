import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IPlacement } from "../lib/interfaces";

export async function getPlacements() {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IPlacement[]>,
      AxiosResponse<IBaseResponseDto<IPlacement[]>, void>,
      void
    >("/influencer/placements");
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
