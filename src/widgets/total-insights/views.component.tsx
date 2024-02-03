import useStatisticStore from "@shared/lib/stores/statistic-store.hook";
import { DoughnutDiagram } from "@shared/ui";
import { memo } from "react";

export const TotalInsightsViews = memo(() => {
  const {
    zustandStatistic: {
      totalViews,
      averageAllViewsPerPlatformCount,
      totalViewsInSocials: { instagramViews, youtubeViews, tikTokViews },
    },
  } = useStatisticStore();

  return (
    <div className="flex space-x-6 mt-6">
      <div className="flex flex-col justify-between bg-white p-4 rounded-xl w-7/12 shadow-2xl">
        <div className="text-xl">Average views by social</div>
        <div className="flex ml-2 mb-2">
          <div className="w-56 h-56">
            <DoughnutDiagram
              data={{
                labels: ["YouTube", "Instagram", "TikTok"],
                datasets: [
                  {
                    label: " ",
                    data: [youtubeViews, instagramViews, tikTokViews],
                    backgroundColor: ["#7690ed", "#f77333", "#c4d1ff"],
                  },
                ],
              }}
            />
          </div>
          <div className="space-y-3 mx-auto">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-blue mr-4"></span>
              <span>Youtube ({youtubeViews})</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-orange mr-4"></span>
              <span>Instagram ({instagramViews})</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-purple mr-4"></span>
              <span>TikTok ({tikTokViews ?? 0})</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/12 flex flex-col justify-between">
        <div className="flex flex-col justify-between bg-white p-4 rounded-xl shadow-2xl">
          <div className="text-xl mb-4">Total views among all socials</div>
          <div className="text-7xl">{totalViews}</div>
        </div>
        <div className="flex flex-col justify-between mt-5 bg-white p-4 rounded-xl shadow-2xl">
          <div className="text-xl mb-4">Average views among all socials</div>
          <div className="text-7xl">{averageAllViewsPerPlatformCount}</div>
        </div>
      </div>
    </div>
  );
});
