import { Range } from 'react-range';
import { Button } from "@mantine/core";
import { IconComponent } from "@shared/ui/icon";
import { IDiscoveryHashtag } from "@widgets/discovery";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { HashtagRow } from '@widgets/discovery/hashtag-row';
import { useDiscoveriesStore } from '@entities/discovery';

const cellClasses = "flex items-center px-3 py-6 w-4/12";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const hashtag: IDiscoveryHashtag = {
  id: 123, 
  hashtag:"#fyp",
  uses: 25000,
  useGrowthRate: 0.50,
  
};




export const DiscoverySavedPage = () => {
  const [hashtags, setHashtags] = useState<IDiscoveryHashtag[] | null>([hashtag]);
  const [savedCategory, setSavedCategory] = useState("influencers");
  const [showDropdownUses, setShowDropdownUses] = useState(false);
  const [growthRate, setGrowthRate] = useState([0,100])
  const [uses, setUses] = useState([10000,4000000])
  const [showDropdownGrowth, setShowDropdownGrowth] = useState(false);
  const [filteredHashtags, setFilteredHashtags] = useState<IDiscoveryHashtag[]>([]);
  const savedHashtags = useDiscoveriesStore((store) => store.savedHashtags);
  const setSavedHashtags = useDiscoveriesStore((store) => store.setSavedHashtags);
  const removeSavedHashtag = useDiscoveriesStore((store) => store.removeSavedHashtag);
  const checkIfSavedDirectly = (hashtagID: number) => {
    if (Array.isArray(savedHashtags)) {
      return savedHashtags.some(hashtag => hashtag.id === hashtagID);
    } else {
      
      return !!savedHashtags[hashtagID];
    }
  };
  const handleUpdateSavedHashtags = (newHashtag: IDiscoveryHashtag) => {

    setSavedHashtags(newHashtag);
  };
  const handleRemoveSavedHashtag = (hashtagID: number) => {

    removeSavedHashtag(hashtagID);
  };
  const handleButtonClick = (Button : string) => {
    if(Button == "uses"){
      setShowDropdownUses(!showDropdownUses)
      setShowDropdownGrowth(false)
    }
    
    if(Button == "growth_rate"){
      setShowDropdownUses(false)
      setShowDropdownGrowth(!showDropdownGrowth)

    }

  };

  
 
  useEffect(() => {
    const applyFilters = () => {
      const filtered = hashtags?.filter(hashtag => {
        
        const matchesGrowth = hashtag.useGrowthRate >= growthRate[0] && hashtag.useGrowthRate <= growthRate[1];
        
        const matchesUses = hashtag.uses >= uses[0] && hashtag.uses <= uses[1];
        return matchesGrowth && matchesUses;
      });
      console.log(filtered)
      setFilteredHashtags(filtered || []);
    };
  
    applyFilters();
  }, [hashtags, growthRate, uses]); // Re-apply filters when these dependencies change
  return (
    <div>
      <div className='flex flex-row'>
        <div className="flex flex-col mr-12">
          <p className='mb-2'>Category</p>
          
        </div>
        
      </div>
      <div className="mt-7 text-[1rem] leading-none">
        <div className="sticky top-0 z-[3] flex items-center bg-slate-100 px-4 rounded-t-2xl">
          {savedCategory=="influencers" && (
            <div className="flex flex-row w-[calc(100%_-_2rem)] justify-between">
              <div
                className={clsx(cellClasses, "cursor-pointer")}
                
              >
                <span>Name</span>
                <span
                  className={clsx( "transition-all")}
                >
                  <IconComponent name="filterArrow" />
                </span>
              </div>
              <div className={clsx(cellClasses)}>Platform</div>
              <div className={clsx(cellClasses)}>Bio</div>
              <div className={clsx(cellClasses)}>Engagement</div>
              <div className={clsx(cellClasses)}>Average Views</div>
              <div className={clsx(cellClasses)}>Followers</div>
              <div className={clsx(cellClasses)}></div>
            </div>
          )}
          {savedCategory=="sounds" && (
            <div className="flex flex-row w-[calc(100%_-_2rem)] justify-between">
              <div
                className={clsx(cellClasses, "cursor-pointer")}
                
              >
                <span>Name</span>
                <span
                  className={clsx( "transition-all")}
                >
                  <IconComponent name="filterArrow" />
                </span>
              </div>
      
              <div className={clsx(cellClasses)}>Artist</div>
              <div className={clsx(cellClasses)}>Duration</div>
              <div className={clsx(cellClasses)}>Uses</div>
              <div className={clsx(cellClasses)}>Uses Growth Rate</div>
              <div className={clsx(cellClasses)}></div>
            </div>
          )}
          {savedCategory=="hashtags" && (
            <div className="flex flex-row w-[calc(100%_-_2rem)] justify-between">
            <div
              className={clsx(cellClasses, "cursor-pointer")}
              
            >
              <span>Hashtag</span>
              <span
                className={clsx( "transition-all")}
              >
                <IconComponent name="filterArrow" />
              </span>
            </div>
    
            <div className={clsx(cellClasses)}>Uses</div>
            <div className={clsx(cellClasses)}>Uses Growth Rate</div>
            <div className={clsx(cellClasses)}></div>
          </div>
          )}
          
        </div>
        <div className="bg-white rounded-b-2xl">
          {filteredHashtags?.map((hashtag, index) => (
            <HashtagRow
              hashtag={hashtag.hashtag}
            
              id={hashtag.id}
              saved={checkIfSavedDirectly(hashtag.id)}
              uses={hashtag.uses}
              useGrowthRate={hashtag.useGrowthRate}
              setSavedHashtags={handleUpdateSavedHashtags}
              removeSavedHashtag={handleRemoveSavedHashtag}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};
