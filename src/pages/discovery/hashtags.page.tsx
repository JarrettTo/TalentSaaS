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
type RangeSliderProps = {
  max: number;
  min: number;
  step:number;
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
};
const RangeSlider:  React.FC<RangeSliderProps> = ({max, min, step, values, setValues}) => {
  

  return (
    <div>
      <div className='mb-2'>
        <Range
          step={step}
          min={min}
          max={max}
          values={values}
          
          onChange={(values) => setValues(values)}
          renderTrack={({ props, children }) => (
            <div {...props} style={{ ...props.style, height: '6px', background: '#ccc', width: '100%' }}>
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '100%',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA',
                border: '1px solid #AAA'
              }}
            >
              
            </div>
          )}
        />
      </div>
      <div className='flex flex-row justify-between'>
        <div>{values[0].toLocaleString()}</div>
        <div>{values[1].toLocaleString()}</div> 
      </div>
    </div>
  );
};

const UsesRangeSelector:  React.FC<RangeSliderProps> = ({max, min, step, values, setValues}) => {
  return (
    <>

    <div className='mt-2 flex flex-col bg-white mr-6' style={{width: '16%', padding: '15px', borderRadius:'10px',  position: 'absolute',zIndex: 1000, boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',}}>
      <label className='mb-5'>Uses: </label>
     
      <RangeSlider max={max} min={min} step={step} values={values} setValues={setValues}/>

    </div>
    
    </>
  );
};


const GrowthRateRangeSelector:  React.FC<RangeSliderProps> = ({max, min, step, values, setValues}) => {
  return (
    <>

    <div className='mt-2 flex flex-col bg-white mr-6' style={{width: '16%', padding: '15px', borderRadius:'10px',  position: 'absolute',zIndex: 1000, boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',}}>
      <label className='mb-5'>Growth Rate: </label>
     
      <RangeSlider max={max} min={min} step={step} values={values} setValues={setValues}/>

    </div>
    
    </>
  );
};



export const DiscoveryHashtagsPage = () => {
  const [hashtags, setHashtags] = useState<IDiscoveryHashtag[] | null>([hashtag]);

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
          <p className='mb-2'>Filter by Hashtag</p>
          <div>
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px',  borderTopLeftRadius: '10px',  borderBottomLeftRadius: '10px'}} onClick={() => handleButtonClick('uses')}>Uses</Button>
            
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px' , borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} onClick={() => handleButtonClick('growth_rate')}>Growth Rate</Button>

            {showDropdownUses && (

              <UsesRangeSelector max={10000000} min={0} step={100} values={uses} setValues={setUses}/>
            )}
            {showDropdownGrowth && (

              <GrowthRateRangeSelector max={100} min={0} step={1} values={growthRate} setValues={setGrowthRate}/>
            )}
                          
                      
          </div>
        </div>
        
      </div>
      <div className="mt-7 text-[1rem] leading-none">
        <div className="sticky top-0 z-[3] flex items-center bg-slate-100 px-4 rounded-t-2xl">
          
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
