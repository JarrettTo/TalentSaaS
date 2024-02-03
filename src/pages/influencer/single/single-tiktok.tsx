import { IInfluencer, InfluencerTikTokSingleGrid } from "@widgets/influencer";
import { useOutletContext } from "react-router-dom";

type InfluencerTikTokSingleInsightsType = [influencer: IInfluencer];

export const InfluencerTikTokSingleInsights = () => {
  const [influencer] = useOutletContext<InfluencerTikTokSingleInsightsType>();

  return influencer && <InfluencerTikTokSingleGrid influencer={influencer} />;
};
