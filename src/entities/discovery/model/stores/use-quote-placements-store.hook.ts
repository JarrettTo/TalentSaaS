import { IDiscoveryInfluencer, IDiscoverySound, IDiscoveryHashtag } from "@shared/lib/types";
import { create } from "zustand";

interface ISavedDiscoveriesStore {
  savedInfluencers: IDiscoveryInfluencer[];
  savedSounds: IDiscoverySound[];
  savedHashtags: IDiscoveryHashtag[];
  setSavedInfluencer: (influencer: IDiscoveryInfluencer) => void;
  setSavedSounds: (savedSounds: IDiscoverySound) => void;
  setSavedHashtags: (savedHashtags: IDiscoveryHashtag) => void;
  removeSavedInfluencer: (influencerID : number) => void;
  removeSavedSound: (soundID : number) => void;
  removeSavedHashtag: (hashtagID : number) => void;
}

export const useDiscoveriesStore = create<ISavedDiscoveriesStore>()((set) => ({
  savedInfluencers: [],
  savedSounds:[],
  savedHashtags:[],
  setSavedInfluencer: (influencer) => set((state) => {
    if (state.savedInfluencers[influencer.id]) {
      // Influencer already exists, no need to update
      return state;
    } else {
      // Update with the new influencer
      return {
        savedInfluencers: {
          ...state.savedInfluencers,
          [influencer.id]: influencer
        }
      };
    }
  }),

  setSavedHashtags: (hashtag) => set((state) => {
    if (state.savedHashtags[hashtag.id]) {
      
      return state;
    } else {
     
      return {
        savedHashtags: {
          ...state.savedHashtags,
          [hashtag.id]: hashtag
        }
      };
    }
  }),
  setSavedSounds: (sound) => set((state) => {
    if (state.savedSounds[sound.id]) {
      return state;
    } else {
      return {
        savedSounds: {
          ...state.savedSounds,
          [sound.id]: sound
        }
      };
    }
  }),

  removeSavedInfluencer: (influencerID) => set((state) => {
    if (state.savedInfluencers[influencerID]) {

      const updatedInfluencers = { ...state.savedInfluencers };

      delete updatedInfluencers[influencerID];
    
      return { savedInfluencers: updatedInfluencers };
    } else {
    
      return state;
    }
  }),
  removeSavedSound: (soundID) => set((state) => {
    if (state.savedSounds[soundID]) {

      const updatedSounds = { ...state.savedSounds };

      delete updatedSounds[soundID];
    
      return { savedSounds: updatedSounds };
    } else {
    
      return state;
    }
  }),
  removeSavedHashtag: (hashtagID) => set((state) => {
    if (state.savedHashtags[hashtagID]) {

      const updatedHashtags = { ...state.savedHashtags };

      delete updatedHashtags[hashtagID];
    
      return { savedHashtags: updatedHashtags };
    } else {
    
      return state;
    }
  }),
}));
