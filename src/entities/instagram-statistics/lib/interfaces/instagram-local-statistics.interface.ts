import { IArrayStatisticsItem } from "@shared/lib/types";

export interface IInstagramLocalStatistics {
  countries: IArrayStatisticsItem[];
  genders: IArrayStatisticsItem[];
  ages: IArrayStatisticsItem[];
  genderAges: IArrayStatisticsItem[];
  impressions: number;
  engagement: number;
  followersCount: number;
}
