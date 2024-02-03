import { IInfluencer } from "@widgets/influencer";
import { ShareInfluencerSidebar } from "@widgets/share";
import { ShareInsightsHead } from "@widgets/share/head.component";
import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ShareInfluecerRoot = () => {
  const { influencerIDAndToken } = useParams();
  const [influencer, setInfluenser] = useState<IInfluencer | null>(null);
  const [shareToken, setShareToken] = useState<string | null>(null);

  const requestInfluencerData = async () => {
    if (influencerIDAndToken != undefined) {
      const influencerID = influencerIDAndToken.split("&token=")[0];
      const code = influencerIDAndToken.split("&token=")[1];
      code && setShareToken(code);

      try {
        const response = await axios.get(
          `${BASE_URL}/influencer/${influencerID}/unauthorized/${code}`
        );

        setInfluenser(response.data.data);
      } catch (error: any) {
        toast.error(error.response.data.errorMessage);
      }
    }
  };

  useEffect(() => {
    requestInfluencerData();
  }, [influencerIDAndToken]);

  return (
    influencer && (
      <div className="container py-10 min-h-screen">
        <ShareInsightsHead influencer={influencer} shareToken={shareToken} />
        <div className="mt-8 flex">
          <ShareInfluencerSidebar influencer={influencer} />
          <Outlet context={[influencer, shareToken]} />
        </div>
      </div>
    )
  );
};
