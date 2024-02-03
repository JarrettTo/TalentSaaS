import { ITikTokPostsStatisticsItem } from "./tik-tok-posts-statistics-item.interface";

export interface ITikTokPostsStatistics {
  totalCount: number;
  username: string;
  videos: ITikTokPostsStatisticsItem[];
}
