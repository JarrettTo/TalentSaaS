import useStatisticStore from "@shared/lib/stores/statistic-store.hook";
import { kFormatter } from "@shared/lib/utils";
import { DoughnutDiagram } from "@shared/ui";
import { memo } from "react";

export const TotalInsightsEngagement = memo(() => {
  const {
    zustandStatistic: {
      averageAllEngagementPerPlatformCount,
      totalEngagementInSocials: {
        instagramEngagement,
        youtubeEngagement,
        tikTokEngagement,
      },
    },
  } = useStatisticStore();

  return (
    <div className="flex space-x-6 mt-6">
      <div className="w-5/12">
        <div className="flex flex-col justify-between h-full bg-white p-4 rounded-xl shadow-2xl">
          <div className="text-xl mb-4">Average engagement among all socials</div>
          <div className="text-8xl">
            {kFormatter(averageAllEngagementPerPlatformCount)}%
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white p-4 rounded-xl w-7/12 shadow-2xl">
        <div className="text-xl mb-4">Average engagement by social</div>
        <div className="flex ml-2 mb-2">
          <div className="w-56 h-56">
            <DoughnutDiagram
              data={{
                labels: ["YouTube", "Instagram", "TikTok"],
                datasets: [
                  {
                    label: " ",
                    data: [youtubeEngagement, instagramEngagement, tikTokEngagement],
                    backgroundColor: ["#7690ed", "#f77333", "#c4d1ff"],
                  },
                ],
              }}
            />
          </div>
          <div className="space-y-3 mx-auto">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-blue mr-4"></span>
              <span>Youtube ({youtubeEngagement}%)</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-orange mr-4"></span>
              <span>Instagram ({instagramEngagement}%)</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-purple mr-4"></span>
              <span>TikTok ({tikTokEngagement ?? 0}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
