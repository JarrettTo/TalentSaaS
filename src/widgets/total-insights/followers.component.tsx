import useStatisticStore from "@shared/lib/stores/statistic-store.hook";
import { DoughnutDiagram } from "@shared/ui";
import { ITotalStatistic } from "@widgets/influencer";
import { memo } from "react";

interface TotalInsightsFollowers {
  statistic: ITotalStatistic | null;
}

export const TotalInsightsFollowers = memo(() => {
  const {
    zustandStatistic: {
      totalFollowers,
      totalFollowersInSocials: { youtubeFollowers, instagramFollowers, tikTokFollowers },
    },
  } = useStatisticStore();

  return (
    <div className="flex space-x-6">
      <div className="w-5/12 flex flex-col justify-between">
        <div className="flex flex-col h-full justify-between bg-white p-4 rounded-xl shadow-2xl">
          <div className="text-xl mb-4">Total followers among all socials</div>
          <div className="text-9xl">{totalFollowers}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white p-4 rounded-xl w-7/12 shadow-2xl">
        <div className="text-xl mb-4">Average Followers by social</div>
        <div className="flex ml-2 mb-2">
          <div className="w-56 h-56">
            <DoughnutDiagram
              data={{
                labels: ["YouTube", "Instagram", "TikTok"],
                datasets: [
                  {
                    label: " ",
                    data: [youtubeFollowers, instagramFollowers, tikTokFollowers],
                    backgroundColor: ["#7690ed", "#f77333", "#c4d1ff"],
                  },
                ],
              }}
            />
          </div>
          <div className="space-y-3 mx-auto">
            <div className="flex items-center">
              <span className="w-4 h-4 bg-blue mr-4"></span>
              <span>Youtube ({youtubeFollowers})</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-orange mr-4"></span>
              <span>Instagram ({instagramFollowers})</span>
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 bg-purple mr-4"></span>
              <span>TikTok ({tikTokFollowers ?? 0})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
