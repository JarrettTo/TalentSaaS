import authApi from "@features/auth/api/auth.api";
import { IInfluencer } from "@widgets/influencer";
import { useState } from "react";

interface ITikTokData {
  followersCount: number;
  likesCount: number;
  videosCount: number;
  commentsCountAverage: number;
  likesCountAverage: number;
  sharesCountAverage: number;
  totalVideos: number;
  viewsCountAverage: number;
}

export const useTikTokInsights = () => {
  const [tikTokData, setTikTokData] = useState<ITikTokData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserTikTok = async (influencer: IInfluencer, shareToken?: string) => {
    setLoading(true);
    try {
      if (shareToken) {
        console.log(shareToken);
      } else {
        const influencerResponse = await authApi.post(
          `tiktok/${influencer.id}/base-statistic`
        );
        const topVideoResponse = await authApi.post(
          `tiktok/${influencer.id}/top-videos/10`
        );

        setTikTokData({
          followersCount: influencerResponse.data.followersCount,
          likesCount: influencerResponse.data.likesCount,
          videosCount: influencerResponse.data.videosCount,
          commentsCountAverage: topVideoResponse.data.commentsCountAverage,
          likesCountAverage: topVideoResponse.data.likesCountAverage,
          sharesCountAverage: topVideoResponse.data.sharesCountAverage,
          totalVideos: topVideoResponse.data.totalVideos,
          viewsCountAverage: topVideoResponse.data.viewsCountAverage,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTikTokPostInsights = async (influencerID: number, postId: string) => {
    try {
      const response = await authApi.post(`/tiktok/${influencerID}/videos/${postId}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  return { tikTokData, loading, fetchUserTikTok, getTikTokPostInsights };
};
