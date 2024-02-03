import { IYoutubeLocalStatistics } from "./youtube-local-statistics.interface";

export interface IYoutubeLocalStatisticsLog extends IYoutubeLocalStatistics {
  createdAt: string;
  manager: {
    email: string;
  };
}
