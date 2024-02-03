import { TotalInsightRosterRow } from "@features/total-insights";
import { Loader } from "@mantine/core";
import useInfluencersStore from "@shared/lib/stores/influencers-store.hook";
import { memo } from "react";

export const TotalInsightsBottom = memo(() => {
  const { zustandInfluencers: influencers } = useInfluencersStore();

  return (
    <div className="flex space-x-6 mt-6">
      <div className="w-7/12 bg-white p-4 rounded-xl shadow-2xl">
        <div className="text-2xl">
          Browse by Roster{" "}
          <span className="text-gray-500 text-sm">{"(sorted by followers)"}</span>
        </div>

        <div className="w-full h-full">
          {influencers ? (
            influencers.map((influencer) => (
              <TotalInsightRosterRow key={influencer.id} influencer={influencer} />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Loader color="orange" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
