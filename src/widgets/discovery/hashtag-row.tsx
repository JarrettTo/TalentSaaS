
import clsx from "clsx";

import {  IDiscoveryHashtag, IDiscoveryHashtagRowProps } from "./types";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

const cellClasses = "px-3 py-4 w-4/12 text-ellipsis overflow-hidden";

export interface IRosterCheckedRows {
  id: number;
  checked: boolean;
}



export const HashtagRow: React.FC<IDiscoveryHashtagRowProps> = (props) => {
  const {id, hashtag, uses, useGrowthRate, saved,setSavedHashtags, removeSavedHashtag} = props;
  const [buttonLabel, setButtonLabel] = useState<string>("Add")
  const addHashtag = (hashtag: IDiscoveryHashtag) => {
    if(buttonLabel=="Add"){
      setSavedHashtags(hashtag);
      setButtonLabel("Remove")
    }
    else{
      removeSavedHashtag(id)
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
          <div className={clsx(cellClasses)}>{hashtag}</div>
          
          <div className={clsx(cellClasses, "flex items-center")}>
            {uses}
          </div>
          <div className={clsx(cellClasses, "flex items-center")}>
            {useGrowthRate}
          </div>
          
          <div className={clsx(cellClasses, "flex items-center")}>
          <Button
              color="dark"
              className="w-15 h-15 p-2 flex justify-center items-center"
              onClick={()=> addHashtag({
                id: id,
                hashtag: hashtag,
                uses: uses,
                useGrowthRate: useGrowthRate
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
