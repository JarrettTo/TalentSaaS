import { PlacementTypesEnum } from "@entities/placement/lib/enums";

export interface IGetPlacementLogByInfluencerIdDto {
  influencerId: number;
  type: PlacementTypesEnum;
}
