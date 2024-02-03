import {
  IInfluencer,
  InfluencerInstagramSingleGrid,
} from "@widgets/influencer";
import { useOutletContext } from "react-router-dom";

type InfluencerInstagramSingleInsightsType = [influencer: IInfluencer];

export const InfluencerInstagramSingleInsights = () => {
  const [influencer] =
    useOutletContext<InfluencerInstagramSingleInsightsType>();

  return (
    influencer && <InfluencerInstagramSingleGrid influencer={influencer} />
  );
};
