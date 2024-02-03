import { IInfluencer, InfluencerInsightsGridTikTok } from "@widgets/influencer";
import { useOutletContext } from "react-router-dom";

type InfluencerTikTokType = [influencer: IInfluencer, shareToken: string | null];

export const InfluencerTikTokPage = () => {
  const [influencer, shareToken] = useOutletContext<InfluencerTikTokType>();

  return <InfluencerInsightsGridTikTok influencer={influencer} shareToken={shareToken} />;
};
