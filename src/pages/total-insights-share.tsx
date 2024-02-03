import useStatisticStore from "@shared/lib/stores/statistic-store.hook";
import { useInsights } from "@shared/lib/utils";
import { getStatistic } from "@widgets/roster";
import {
  TotalInsightsFollowers,
  TotalInsightsViews,
  TotalInsightsEngagement,
} from "@widgets/total-insights";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const TotalInsightsShare = () => {
  const { shareToken } = useParams();
  const { setZustandStatistic } = useStatisticStore();
  const { getTotalInsightsObject } = useInsights();

  const requestStatistic = async () => {
    try {
      const response = await getStatistic(shareToken);
      if (response.data) {
        const formattedObject = getTotalInsightsObject(response.data.data);

        setZustandStatistic(formattedObject);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (shareToken) {
      shareToken && requestStatistic();
    }
  }, [shareToken]);

  return (
    <div className="container py-10 min-h-screen">
      <div className="flex text-3xl text-black justify-between items-center">
        Total insights for last 90 days
      </div>
      <div className="mt-8">
        <TotalInsightsFollowers />
        <TotalInsightsViews />
        <TotalInsightsEngagement />
      </div>
    </div>
  );
};
