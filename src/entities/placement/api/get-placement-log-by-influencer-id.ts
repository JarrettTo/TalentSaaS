import { IBaseResponseDto, baseClient } from "@shared/api";
import { AxiosResponse } from "axios";
import { IPlacementLog } from "../lib/interfaces";
import { IGetPlacementLogByInfluencerIdDto } from "./dto";

export async function getPlacementLogByInfluencerId(
  getPlacementLogByInfluencerIdDto: IGetPlacementLogByInfluencerIdDto
) {
  try {
    const { influencerId, ...queryParamsDto } = getPlacementLogByInfluencerIdDto;
    const { data } = await baseClient.get<
      IBaseResponseDto<IPlacementLog>,
      AxiosResponse<IBaseResponseDto<IPlacementLog>, void>,
      void
    >(`/influencer/placements-log/${influencerId}`, { params: queryParamsDto });
    return data.data;
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
