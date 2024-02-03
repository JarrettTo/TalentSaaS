import { IInfluencer, InfluencerYoutubeSingleGrid } from "@widgets/influencer";
import { useOutletContext } from "react-router-dom";

type InfluencerYoutubeSingleInsightsType = [influencer: IInfluencer];

export const InfluencerYoutubeSingleInsights = () => {
  const [influencer] = useOutletContext<InfluencerYoutubeSingleInsightsType>();

  return influencer && <InfluencerYoutubeSingleGrid influencer={influencer} />;
};
