import authApi from "@features/auth/api/auth.api";
import useInfluencersStore from "@shared/lib/stores/influencers-store.hook";
import useStatisticStore from "@shared/lib/stores/statistic-store.hook";
import { useInsights } from "@shared/lib/utils";
import { getStatistic } from "@widgets/roster";
import {
  TotalInsightsBottom,
  TotalInsightsEngagement,
  TotalInsightsFollowers,
  TotalInsightsHead,
  TotalInsightsViews,
} from "@widgets/total-insights";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const TotalInsightsPage = () => {
  const { setZustandStatistic } = useStatisticStore();
  const { setZustandInfluencers } = useInfluencersStore();
  const { getTotalInsightsObject } = useInsights();

  const requestAllInfluencers = async () => {
    try {
      const response = await authApi.get("/influencer/all-active");
      setZustandInfluencers(response.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const requestStatistic = async () => {
    try {
      const response = await getStatistic();
      if (response.data) {
        const formattedObject = getTotalInsightsObject(response.data);
        setZustandStatistic(formattedObject);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    requestAllInfluencers();
    requestStatistic();
  }, []);

  return (
    <div>
      <TotalInsightsHead />
      <div className="mt-8">
        <TotalInsightsFollowers />
        <TotalInsightsViews />
        <TotalInsightsEngagement />
        <TotalInsightsBottom />
      </div>
    </div>
  );
};
