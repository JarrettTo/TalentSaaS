export interface IYoutubeLocalStatistics {
  ages: {
    name: string;
    count: number;
  }[];
  genders: {
    male: number;
    female: number;
    another: number;
  } | null;
  countries: {
    name: string;
    count: string;
  }[];
  subscribersCount: number;
  views: number;
  viewsPerVideos: number;
  videoCount: number;
  rate: {
    averageViewDuration: string;
    averageViewPercentage: string;
  } | null;
  engagementRate: string;
  devices: {
    MOBILE: string;
    DESKTOP: string;
    TV: string;
  } | null;
}
