import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IPlacement } from "../lib/interfaces";

export async function getPlacementByInfluencerId(influencerId: number) {
  try {
    const { data } = await baseClient.get<
      IBaseResponseDto<IPlacement[]>,
      AxiosResponse<IBaseResponseDto<IPlacement[]>, void>,
      void
    >(`/influencer/placements/${influencerId}`);
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
