import { PlacementTypesEnum } from "@entities/placement";
export interface IDiscoveryInfluencer {
  id: number;
  avatar?: string;
  name: string;
  bio?: string;
  platform: string;
  engagement: number;
  average_views: number;
  followers: number;
  location: string[];
  categories: string[];
  
}

export interface IDiscoveryRowProps {
  id: number;
  avatar?: string;
  name: string;
  bio?: string;
  platform: string;
  engagement: number;
  average_views: number;
  followers: number;
  location: string[];
  categories: string[];
  saved: boolean;
  setSavedInfluencers: (newInfluencer: IDiscoveryInfluencer) => void
  removeSavedInfluencer: (influencerID: number) => void
  
}

export interface IDiscoverySound {
  id: number;
  name: string;
  artist: string;
  duration: number;
  uses: number;
  useGrowthRate: number;
  
}

export interface IDiscoverySoundRowProps {
  id: number;
  name: string;
  artist: string;
  duration: number;
  uses: number;
  useGrowthRate: number;
  saved: boolean;
  setSavedSounds: (newSound: IDiscoverySound) => void
  removeSavedSound: (soundID: number) => void
  
}

export interface IDiscoveryHashtag {
  id: number;
  hashtag: string;
  uses: number;
  useGrowthRate: number;
}

export interface IDiscoveryHashtagRowProps {
  id: number;
  hashtag: string;
  uses: number;
  useGrowthRate: number;
  saved: boolean;
  setSavedHashtags: (newHashtag: IDiscoveryHashtag) => void
  removeSavedHashtag: (hashtagID: number) => void
  
}