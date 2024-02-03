import { baseClient } from "@shared/api";
import { AxiosResponse } from "axios";

export interface IUpdatePlacementDto {
  influencerId: number;
  talantFee: number;
  totalImpressionsByCurrentMonth: number;
  AUorNZAuditory: number;
  westAuditory: number;
  sum: number;
  priceInUSD: number;
  priceInAUD: number;
  boosting: number;
  isItems: boolean;
  type: number;
}

export async function updatePlacement(updatePlacementDto: IUpdatePlacementDto) {
  const { influencerId, ...requestBodyDto } = updatePlacementDto;
  try {
    await baseClient.patch<
      void,
      AxiosResponse<void, typeof requestBodyDto>,
      typeof requestBodyDto
    >(`/influencer/placements/${influencerId}`, requestBodyDto);
  } catch (error: any) {
    console.error("get placements error:", error);
    throw error;
  }
}
