import authApi from "@features/auth/api/auth.api";
import { toast } from "react-toastify";

export interface IStatisticDates {
  from: string;
  to: string;
}

export const getInfluencerYoutubeStatistics = async (
  influencerID: number,
  dates?: IStatisticDates
) => {
  try {
    let response;

    if (dates && dates.from !== "" && dates.to !== "") {
      response = await authApi.post(`/youtube/${influencerID}/statistic`, {
        from: dates.from,
        to: dates.to,
      });
    } else {
      response = await authApi.post(`/youtube/${influencerID}/statistic`);
    }

    //@ts-ignore
    if (response.statusCode === 201) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error.response.data.errorMessage);
    throw new Error();
  }
};

export const getPostYoutubeStatistics = async (
  influencerID: number,
  videoId: string,
  dates?: IStatisticDates
) => {
  interface IDataToSend {
    from?: string;
    to?: string;
    videoId: string;
  }

  const dataToSend: IDataToSend = {
    videoId: videoId,
  };

  if (dates && dates.from !== "" && dates.to !== "") {
    dataToSend.from = dates.from;
    dataToSend.to = dates.to;
  }

  try {
    const response = await authApi.post(
      `/youtube/${influencerID}/statistic/one`,
      dataToSend
    );

    //@ts-ignore
    if (response.statusCode === 201) {
      return response.data;
    }
  } catch (error: any) {
    toast.error(error.response.data.errorMessage);
    throw new Error();
  }
};
