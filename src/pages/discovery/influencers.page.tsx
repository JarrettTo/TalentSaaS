import { Range } from 'react-range';
import { Button, Checkbox } from "@mantine/core";

import { IconComponent } from "@shared/ui/icon";
import { DiscoveryRow } from "@widgets/discovery";
import { IDiscoveryInfluencer } from "@widgets/discovery";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDiscoveriesStore } from '@entities/discovery';


const cellClasses = "flex items-center px-3 py-6 w-4/12";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const influencer: IDiscoveryInfluencer = {
  id: 123, // some numeric ID
  avatar: 'https://example.com/avatar.jpg', // optional, URL to the avatar image
  name: 'John Doe', // the name of the influencer
  bio: 'This is a short bio about the influencer.', // optional, a short biography
  platform: 'Instagram', // the platform they are influential on
  engagement: 5.4, // a number representing engagement
  average_views: 10000, // average number of views
  followers: 500000, // number of followers
  location: ["USA", "UK", "Australia"],
  categories:['Education', 'Finance']
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

const FollowersRangeSelector:  React.FC<RangeSliderProps> = ({max, min, step, values, setValues}) => {
  return (
    <>

    <div className='mt-2 flex flex-col bg-white mr-6' style={{width: '16%', padding: '15px', borderRadius:'10px',  position: 'absolute',zIndex: 1000, boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',}}>
      <label className='mb-5'>Followers: </label>
     
      <RangeSlider max={max} min={min} step={step} values={values} setValues={setValues}/>

    </div>
    
    </>
  );
};

const AvgViewsRangeSelector:  React.FC<RangeSliderProps> = ({max, min, step, values, setValues}) => {
  return (
    <>

    <div className='mt-2 flex flex-col bg-white mr-6' style={{width: '16%', padding: '15px', borderRadius:'10px',  position: 'absolute',zIndex: 1000, boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',}}>
      <label className='mb-5'>Average Views: </label>
     
      <RangeSlider max={max} min={min} step={step} values={values} setValues={setValues}/>

    </div>
    
    </>
  );
};

const EngRateRangeSelector:  React.FC<RangeSliderProps> = ({max, min, step, values, setValues}) => {
  return (
    <>

    <div className='mt-2 flex flex-col bg-white mr-6' style={{width: '16%', padding: '15px', borderRadius:'10px',  position: 'absolute',zIndex: 1000, boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',}}>
      <label className='mb-5'>Engagement Rate: </label>
     
      <RangeSlider max={max} min={min} step={step} values={values} setValues={setValues}/>

    </div>
    
    </>
  );
};
type LocationMenuProps = {
  countries: string[];
  selectedCountries: string[];
  handleCountryChange: (country: string) => void;
};
type CategoryMenuProps = {
  categories: string[];
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
};
type AgeMenuProps = {
  ages: string[];
  selectedAges: string[];
  handleAgeChange: (age: string) => void;
};
const LocationMenu: React.FC<LocationMenuProps> = ({ countries, selectedCountries, handleCountryChange }) => {
 

  return (

        <div
          className='bg-white mt-2'
          style={{
            position: 'absolute',
            zIndex: 1000,
            width: '26%',
        
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',
            // Add any additional styling you need for the dropdown
          }}
        >
          {countries.map((country) => (
            <div key={country} style={{ marginBottom: '10px' }}>
              <Checkbox
                label={country}
                checked={selectedCountries.includes(country)}
                onChange={() => handleCountryChange(country)}
              />
            </div>
          ))}
        </div>
      
   
  );
};
const AgeMenu: React.FC<AgeMenuProps> = ({ ages, selectedAges, handleAgeChange }) => {
 

  return (

        <div
          className='bg-white mt-2'
          style={{
            position: 'absolute',
            zIndex: 1000,
            width: '26%',
        
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',
            // Add any additional styling you need for the dropdown
          }}
        >
          {ages.map((age : string) => (
            <div key={age} style={{ marginBottom: '10px' }}>
              <Checkbox
                label={age}
                checked={selectedAges.includes(age)}
                onChange={() => handleAgeChange(age)}
              />
            </div>
          ))}
        </div>
      
   
  );
};
const CategoryMenu: React.FC<CategoryMenuProps> = ({ categories, selectedCategories, handleCategoryChange }) => {
 

  return (

        <div
          className='bg-white mt-2'
          style={{
            position: 'absolute',
            zIndex: 1000,
            width: '26%',
        
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0.1, 0.1, 0.1, 0.2)',
            // Add any additional styling you need for the dropdown
          }}
        >
          {categories.map((category) => (
            <div key={category} style={{ marginBottom: '10px' }}>
              <Checkbox
                label={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            </div>
          ))}
        </div>
      
   
  );
};


export const DiscoveryInfluncersPage = () => {
  const [influencers, setInfluencers] = useState<IDiscoveryInfluencer[] | null>([influencer]);

  const [showDropdownFollowers, setShowDropdownFollowers] = useState(false);
  const [showDropdownLocation, setShowDropdownLocation] = useState(false);
  const [showDropdownAge, setShowDropdownAge] = useState(false);
  const [showDropdownCategory, setShowDropdownCategory] = useState(false);
  const [avgViews, setAvgViews] = useState([10000,10000000])
  const [engagementRate, setEngagementRate] = useState([0,100])
  const [followers, setFollowers] = useState([10000,5000000])
  const [showDropdownAvgViews, setShowDropdownAvgViews] = useState(false);
  const [showDropdownEngagement, setShowDropdownEngagement] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const [range, setRange] = useState([0, 100]); // Initial range
  const countries = ['USA', 'UK', 'Europe', 'New Zealand', 'Australia'];
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const categories = ['Education', 'Finance', 'Lifestyle', 'Sports', 'Athleisure'];
  const ages = ['18-24', '25-34', '35-44', '45-54', '55+'];
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState<IDiscoveryInfluencer[]>([]);
  const savedInfluencers = useDiscoveriesStore((store) => store.savedInfluencers);
  const setSavedInfluencers = useDiscoveriesStore((store) => store.setSavedInfluencer);
  const removeSavedInfluencer = useDiscoveriesStore((store) => store.removeSavedInfluencer);
  const handleUpdateSavedInfluencers = (newInfluencer: IDiscoveryInfluencer) => {

    setSavedInfluencers(newInfluencer);
  };
  const handleRemoveSavedInfluencers = (influencerID: number) => {

    removeSavedInfluencer(influencerID)
  };
  const checkIfSavedDirectly = (influencerID: number) => {
    if (Array.isArray(savedInfluencers)) {
      return savedInfluencers.some(influencer => influencer.id === influencerID);
    } else {
      
      return !!savedInfluencers[influencerID];
    }
  };
  const handleButtonClick = (Button : string) => {
    if(Button == "followers"){
      setShowDropdownFollowers(!showDropdownFollowers)
      setShowDropdownCategory(false)
      setShowDropdownLocation(false)
      setShowDropdownAvgViews(false)
      setShowDropdownEngagement(false)
      setShowDropdownAge(false)
    }
    if(Button == "location"){
      setShowDropdownFollowers(false)
      setShowDropdownCategory(false)
      setShowDropdownLocation(!showDropdownLocation)
      setShowDropdownAvgViews(false)
      setShowDropdownEngagement(false)
      setShowDropdownAge(false)
    }
    if(Button == "category"){
      setShowDropdownFollowers(false)
      setShowDropdownCategory(!showDropdownCategory)
      setShowDropdownLocation(false)
      setShowDropdownAvgViews(false)
      setShowDropdownEngagement(false)
      setShowDropdownAge(false)

    }
    if(Button == "avg_views"){
      setShowDropdownFollowers(false)
      setShowDropdownCategory(false)
      setShowDropdownLocation(false)
      setShowDropdownAvgViews(!showDropdownAvgViews)
      setShowDropdownEngagement(false)
      setShowDropdownAge(false)
    }
    if(Button == "eng_rate"){
      setShowDropdownFollowers(false)
      setShowDropdownCategory(false)
      setShowDropdownLocation(false)
      setShowDropdownAvgViews(false)
      setShowDropdownEngagement(!showDropdownEngagement)
      setShowDropdownAge(false)
    }
    if(Button == "age"){
      setShowDropdownFollowers(false)
      setShowDropdownCategory(false)
      setShowDropdownLocation(false)
      setShowDropdownAvgViews(false)
      setShowDropdownEngagement(false)
      setShowDropdownAge(!showDropdownAge)
    }
  };

  
  const handleCountryChange = (country: string) => {
    setSelectedCountries((currentCountries) =>
      currentCountries.includes(country)
        ? currentCountries.filter((c) => c !== country)
        : [...currentCountries, country]
    );
    console.log(selectedCountries)
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((c) => c !== category)
        : [...currentCategories, category]
    );
    console.log(selectedCategories)
  };
  const handleAgeChange = (age: string) => {
    setSelectedAges((currentAges) =>
      currentAges.includes(age)
        ? currentAges.filter((c) => c !== age)
        : [...currentAges, age]
    );
    console.log(selectedAges)
  };
  useEffect(() => {
    const applyFilters = () => {
      const filtered = influencers?.filter(influencer => {
        const matchesCountry = selectedCountries.length === 0 || influencer.location.some(country => selectedCountries.includes(country));
        const matchesCategory = selectedCategories.length === 0 || influencer.categories.some(category => selectedCategories.includes(category));
        const matchesEngagement = influencer.engagement >= engagementRate[0] && influencer.engagement <= engagementRate[1];
        const matchesAvgViews = influencer.average_views >= avgViews[0] && influencer.average_views <= avgViews[1];
        const matchesFollowers = influencer.followers >= followers[0] && influencer.followers <= followers[1];
        return matchesCountry && matchesCategory && matchesEngagement && matchesAvgViews && matchesFollowers;
      });
      console.log(filtered)
      setFilteredInfluencers(filtered || []);
    };
  
    applyFilters();
  }, [influencers, selectedCountries, selectedCategories, engagementRate, avgViews, followers]); // Re-apply filters when these dependencies change
  return (
    <div>
      <div className='flex flex-row'>
        <div className="flex flex-col mr-12">
          <p className='mb-2'>Filter by creator</p>
          <div>
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px',  borderTopLeftRadius: '10px',  borderBottomLeftRadius: '10px'}} onClick={() => handleButtonClick('followers')}>Followers</Button>
            
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px' , borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} onClick={() => handleButtonClick('category')}>Category</Button>

            {showDropdownFollowers && (

              <FollowersRangeSelector max={8000000} min={0} step={100} values={followers} setValues={setFollowers}/>
            )}
           
            {showDropdownCategory && (

              <CategoryMenu categories={categories} selectedCategories={selectedCategories} handleCategoryChange={handleCategoryChange}/>
            )}
                      
          </div>
        </div>
        <div className="flex flex-col mr-12">
          <p className='mb-2'>Filter by audience</p>
          <div>
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px',  borderTopLeftRadius: '10px',  borderBottomLeftRadius: '10px'}} onClick={() => handleButtonClick('location')}>Location</Button>
    
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px' , borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} onClick={() => handleButtonClick('age')}>Age</Button>

            
            {showDropdownLocation && (

              <LocationMenu countries={countries} selectedCountries={selectedCountries} handleCountryChange={handleCountryChange}/>
            )}
            {showDropdownAge && (

              <AgeMenu ages={ages} selectedAges={selectedAges} handleAgeChange={handleAgeChange}/>
            )}
                      
          </div>
        </div>
        <div className="flex flex-col">
          <p className='mb-2'>Filter by performance</p>
          <div>
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px',  borderTopLeftRadius: '10px',  borderBottomLeftRadius: '10px'}} onClick={() => handleButtonClick('avg_views')}>Average Views</Button>
            <Button size="sm"
                color="dark" sx={{ borderRadius: '0px' , borderTopRightRadius: '10px', borderBottomRightRadius: '10px'}} onClick={() => handleButtonClick('eng_rate')}>Engagement Rate</Button>

            {showDropdownAvgViews && (

              <AvgViewsRangeSelector max={10000000} min={0} step={100} values={avgViews} setValues={setAvgViews}/>
            )}
            {showDropdownEngagement && (

              <EngRateRangeSelector max={100} min={0} step={1} values={engagementRate} setValues={setEngagementRate}/>
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
        </div>
        <div className="bg-white rounded-b-2xl">
          {filteredInfluencers?.map((influencer, index) => (
            <DiscoveryRow
              name={influencer.name}
              avatar={influencer.avatar}
              platform={influencer.platform}
              id={influencer.id}
              bio={influencer.bio}
              engagement={influencer.engagement}
              average_views={influencer.average_views}
              followers={influencer.followers}
              location={influencer.location}
              categories={influencer.categories}
              saved={checkIfSavedDirectly(influencer.id)}
              setSavedInfluencers={handleUpdateSavedInfluencers}
              removeSavedInfluencer={handleRemoveSavedInfluencers}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};
