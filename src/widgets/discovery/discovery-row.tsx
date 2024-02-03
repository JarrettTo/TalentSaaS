
import { IMAGES_URL } from "@shared/constants/variables";

import clsx from "clsx";
import { Link } from "react-router-dom";

import { IDiscoveryInfluencer, IDiscoveryRowProps } from "./types";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

const cellClasses = "px-3 py-4 w-4/12 text-ellipsis overflow-hidden";

export interface IRosterCheckedRows {
  id: number;
  checked: boolean;
}



export const DiscoveryRow: React.FC<IDiscoveryRowProps> = (props) => {
  const {id, avatar,  name,platform, bio, engagement, average_views,followers, location, categories, saved, setSavedInfluencers, removeSavedInfluencer} = props;
  const [buttonLabel, setButtonLabel] = useState<string>("Add")
  const addInfluencer = (influencer: IDiscoveryInfluencer) => {
    if(buttonLabel=="Add"){
      setSavedInfluencers(influencer);
      setButtonLabel("Remove")
    }
    else{
      removeSavedInfluencer(id)
      setButtonLabel("Add")
    }
    

  };
  useEffect(()=>{
    if(saved){
      setButtonLabel("Remove")
    }
  }, [])
  return (
    <div>
     
      <div className="flex items-center px-4 overflow-hidden w-full">
        
        <div className="flex items-center w-[calc(100%_-_2rem)]">
          <div className={clsx(cellClasses, "flex items-center")}>
            <div className="relative w-3/12 h-0 pt-[25%] min-w-[25%] bg-slate-300 rounded-full mr-4 overflow-hidden">
              {avatar != null && (
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={`${IMAGES_URL}/avatars/${avatar}`}
                  alt=""
                />
              )}
            </div>
            <Link
              to={`/app/influencer/insights/${id}/youtube`}
              className="text-black h-fit truncate no-underline w-9/12 hover:text-orange"
            >{`${name}`}</Link>
          </div>
          <div className={clsx(cellClasses)}>{platform}</div>
          <div className={clsx(cellClasses, "flex items-center")}>
            {bio}
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            {engagement}<span>%</span>
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            {average_views}
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            {followers}
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
          <Button
              color="dark"
              className="w-15 h-15 p-2 flex justify-center items-center"
              onClick={() => addInfluencer({
                id: id,
                avatar: avatar,
                name: name,
                platform: platform,
                bio: bio,
                engagement: engagement,
                average_views: average_views,
                followers: followers,
                location:location,
                categories: categories
              })}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
