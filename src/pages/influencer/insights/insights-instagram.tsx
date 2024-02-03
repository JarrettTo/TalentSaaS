import {
  IInfluencer,
  InfluencerInsightsGridInstagram,
} from "@widgets/influencer";
import { useOutletContext } from "react-router-dom";

type InfluencerInstagramType = [
  influencer: IInfluencer,
  shareToken: string | null
];

export const InfluencerInstagramPage = () => {
  const [influencer, shareToken] = useOutletContext<InfluencerInstagramType>();

  return (
    <InfluencerInsightsGridInstagram
      influencer={influencer}
      shareToken={shareToken}
    />
  );
};
