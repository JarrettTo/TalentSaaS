import { IArrayStatisticsItem } from "@shared/lib/types";

export interface ITikTokLocalStatistics {
  ages: IArrayStatisticsItem[] | null;
  genders: {
    male: number;
    female: number;
    another: number;
  } | null;
  countries: IArrayStatisticsItem[] | null;
  devices: {
    MOBILE: string;
    DESKTOP: string;
    TV: string;
  } | null;
  followersCount: number;
  likesCount: number;
  videosCount: number;
  viewsAverage: number;
}
