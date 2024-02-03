import { IInfluencer } from "../types";
import { useEffect, useState } from "react";
import { getPostInstagramStatistics } from "../api";
import { Loader } from "@mantine/core";
import useInsightsStore from "@shared/lib/stores/insights-store.hook";

type InfluencerInsightsGridProps = {
  influencer: IInfluencer;
};

const cellClasses =
  "flex flex-col justify-between flex-1	 bg-white p-4 rounded-xl shadow-2xl";

type IInstagramData = {
  engagement?: number;
  impressions?: number;
  likes: number;
  comments: number;
  shares?: number;
  plays?: number;
};

export const InfluencerInstagramSingleGrid = (
  props: InfluencerInsightsGridProps
) => {
  const { influencer } = props;
  const store = useInsightsStore();

  const [instagramData, setInstagramData] = useState<IInstagramData | null>(
    null
  );
  const [fetchingError, setFetchingError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInstagram = async (singlePostID: string) => {
    setInstagramData(null);
    setLoading(true);

    try {
      const response = await getPostInstagramStatistics(
        influencer.id,
        singlePostID
      );

      if (response) {
        console.log(response);
        setInstagramData(response);
      }
    } catch (error) {
      setFetchingError("Try another post ID");
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (store.dates && store.singlePostID) {
      fetchInstagram(store.singlePostID);
    }
  }, [store.dates, store.singlePostID]);

  return instagramData ? (
    <div className="w-9/12 pl-8 flex flex-col justify-between">
      <div className="flex space-x-3 h-1/2">
        {instagramData.impressions && (
          <div className={cellClasses}>
            <div className="text-xl">Impressions</div>
            <div className="text-7xl mt-3">{instagramData.impressions}</div>
          </div>
        )}
        {instagramData.engagement && (
          <div className={cellClasses}>
            <div className="text-xl">Engagement</div>
            <div className="text-7xl mt-3">{instagramData.engagement}%</div>
          </div>
        )}
        {instagramData.plays && (
          <div className={cellClasses}>
            <div className="text-xl">Plays</div>
            <div className="text-7xl mt-3">{instagramData.plays}</div>
          </div>
        )}
        {instagramData.shares && (
          <div className={cellClasses}>
            <div className="text-xl">Shares</div>
            <div className="text-7xl mt-3">{instagramData.shares}</div>
          </div>
        )}
      </div>
      <div className="flex space-x-3 mt-3 h-1/2">
        <div className={cellClasses}>
          <div className="text-xl">Likes</div>
          <div className="text-7xl mt-3">{instagramData.likes}</div>
        </div>
        <div className={cellClasses}>
          <div className="text-xl">Comments</div>
          <div className="text-7xl mt-3">{instagramData.comments}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center w-9/12 pl-8 text-xl text-center">
      {loading ? (
        <Loader color="orange" />
      ) : fetchingError ? (
        fetchingError
      ) : (
        "Enter post ID in field first"
      )}
    </div>
  );
};
