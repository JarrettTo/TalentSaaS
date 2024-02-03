import { IInfluencer } from "@widgets/influencer";
import { PlacementTypesEnum } from "../enums";

export const checkIfPlatformConnected = (
  placementType: PlacementTypesEnum,
  influencer: IInfluencer
) => {
  switch (placementType) {
    case PlacementTypesEnum.YouTube: {
      return influencer.isYoutubeConnected;
    }
    case PlacementTypesEnum.Instagram: {
      return influencer.isInstagramConnected;
    }
    case PlacementTypesEnum.TikTok: {
      return influencer.isTikTokConnected;
    }
    default: {
      return false;
    }
  }
};
