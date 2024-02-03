import { PlacementTypesEnum } from "@entities/placement";
export interface IStrategy {
  id: number;
  influencer: number;
  createdAt: Date;
  manager: string;
  tasks: string;
  PR: string;
  life: string;
  high_level:string;
  brand_strategy:string;
  content_tiktok: string;
  content_ig: string;
  content_yt: string;
  content_collabs: string;
  tour: string;
  hosting: string;
  podcast: string;
  film: string;
  projects: string;
  
}
export interface IInfluencer {
  id: number;
  firstname: string;
  lastname: string;
  group: {
    id: number;
    name: string;
  };
  email: string;
  phone: string;
  mediaKitLink: string;
  tiktokProfile: string;
  instagramProfile: string;
  youtubeProfile?: string;
  streetAddress: string;
  contractStartDate: string;
  contractEndDate: string;
  state: string;
  avatar?: string;
  TFN: string;
  bankAccountName: string;
  bankBSB: string;
  bankAccountNumber: string;
  ABN: string;
  isHelp: boolean;
  superFundName?: string;
  superFundBillerCode?: string;
  superFundReferenceNumber?: string;
  birthday: string;
  age: number;
  giftIdeas: string;
  havePartner: string;
  alcohol: string;
  leftOrRightHand: string | number;
  shoeSize: string;
  dreamHolidayDestination: string;
  dreamBrandCollaboration: string;
  dreamCar: string;
  milkOfChoice: string;
  yourPhone: string;
  yourPhoneProvider: string;
  investmentService?: string;
  supermarket?: string;
  chemistOfChoice?: string;
  bottleshopOfChoice?: string;
  internetProvider?: string;
  charityOfChoice?: string;
  streaming: string;
  musicStreamingOfChoice: string;
  notes?: string;
  checked?: boolean;
  isYoutubeConnected: boolean;
  isInstagramConnected: boolean;
  isTikTokConnected: boolean;
  isArchived: boolean;
}

export enum influencerHand {
  Left = 0,
  Right = 1,
}

export enum BooleanLetter {
  true = "Y",
  false = "N",
}

export interface IOldPlacement {
  id: number;
  influencerID: number;
  type: PlacementTypesEnum;
  influencer: IInfluencer;
  talantFee: number;
  agencyFee: number;
  deliverables: number;
}

export interface ICampaignItem {
  influencerID: number;
  name: string;
  platform?: string;
  totalFee: number;
}

export interface ITotalStatistic {
  totalFollowers: number | string;
  totalViews: number | string;
  averageAllViewsPerPlatformCount: number | string;
  averageAllEngagementPerPlatformCount: number;
  totalFollowersInSocials: {
    instagramFollowers: number;
    youtubeFollowers: number;
    tikTokFollowers: number;
  };
  totalViewsInSocials: {
    instagramViews: number;
    youtubeViews: number;
    tikTokViews: number;
  };
  totalEngagementInSocials: {
    instagramEngagement: number;
    youtubeEngagement: number;
    tikTokEngagement: number;
  };
}

export interface IAgeArray {
  "age18-24"?: number;
  "age25-34"?: number;
  "age35-44"?: number;
  "age45-54"?: number;
  "age55-64"?: number;
  "age65-"?: number;
}
