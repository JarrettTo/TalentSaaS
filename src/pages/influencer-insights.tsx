import { IInfluencer, InfluencerInsightsSidebar } from "@widgets/influencer";
import { InfluencerInsightsHead } from "@widgets/influencer/insigths/head.component";
import { getOneInfluencer } from "@widgets/roster";
import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const InfluencerInsightsPage = () => {
  const { influencerId } = useParams();
  const [influencer, setInfluenser] = useState<IInfluencer | null>(null);

  const requestInfluencerData = async () => {
    if (influencerId != undefined) {
      const response = await getOneInfluencer(influencerId);
      // console.log(response.data);
      if (response.error === "") {
        setInfluenser(response.data);
      } else {
        toast.error(response.message);
      }
    }
  };

  useEffect(() => {
    requestInfluencerData();
  }, [influencerId]);

  return (
    influencer && (
      <div>
        <InfluencerInsightsHead influencer={influencer} />
        <div className="mt-8 flex">
          <InfluencerInsightsSidebar influencer={influencer} />
          <Outlet context={[influencer]} />
        </div>
      </div>
    )
  );
};
