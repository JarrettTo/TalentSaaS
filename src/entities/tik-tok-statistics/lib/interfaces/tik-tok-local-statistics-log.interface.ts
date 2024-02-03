import { ITikTokLocalStatistics } from "./tik-tok-local-statistics.interface";

export interface ITikTokLocalStatisticsLog extends ITikTokLocalStatistics {
  createdAt: string;
  manager: {
    email: string;
  };
}
