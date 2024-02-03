import { IInfluencer } from "@widgets/influencer";
import { PlacementTypesEnum } from "../enums";

export interface IPlacement {
  id: number;
  type: PlacementTypesEnum;
  influencer: IInfluencer;
  talantFee: string;
  totalImpressionsByCurrentMonth: string;
  AUorNZAuditory: string;
  westAuditory: string;
  sum: string;
  priceInUSD: string;
  priceInAUD: string;
  boosting: string;
  isItems: boolean;
  lastLog?: {
    createdAt: string;
    manager: {
      email: string;
    };
  };
}
