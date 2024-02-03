
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
  setSavedInfluencers: React.Dispatch<React.SetStateAction<number[] | null>>;
  
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
  setSavedSounds: React.Dispatch<React.SetStateAction<number[] | null>>;
  
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
  setSavedHashtags: React.Dispatch<React.SetStateAction<number[] | null>>;
  
}