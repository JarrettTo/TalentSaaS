import {
  IInfluencer,
  InfluencerInsightsGridYoutube,
} from "@widgets/influencer";
import { useOutletContext } from "react-router-dom";

type InfluencerYoutubePage = [influencer: IInfluencer, shareToken: string];

export const InfluencerYoutubePage = () => {
  const [influencer, shareToken] = useOutletContext<InfluencerYoutubePage>();

  return (
    <InfluencerInsightsGridYoutube
      influencer={influencer}
      shareToken={shareToken}
    />
  );
};
