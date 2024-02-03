import { IYoutubePostsStatisticsItem } from "./youtube-posts-statistics-item.interface";

export interface IYoutubePostsStatistics {
  totalCount: number;
  videos: IYoutubePostsStatisticsItem[];
}
