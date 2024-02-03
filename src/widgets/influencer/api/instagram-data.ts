import authApi from "@features/auth/api/auth.api";

export const getInfluencerInstagramStatistics = async (
  influencerID: number,
  dates: string
) => {
  try {
    const response = await authApi.get(`/instagram/${influencerID}${dates}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    //toast.error(error.message);
  }
};

export const getPostInstagramStatistics = async (
  influencerID: number,
  postId: string
) => {
  try {
    const response = await authApi.get(`/instagram/${influencerID}/${postId}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    // toast.error(error.message);
  }
};
