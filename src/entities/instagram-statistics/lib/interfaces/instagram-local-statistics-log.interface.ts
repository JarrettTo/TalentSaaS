import { IInstagramLocalStatistics } from "./instagram-local-statistics.interface";

export interface IInstagramLocalStatisticsLog extends IInstagramLocalStatistics {
  createdAt: string;
  manager: {
    email: string;
  };
}
