
import clsx from "clsx";

import {  IDiscoverySoundRowProps } from "./types";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { IDiscoverySound } from "@shared/lib/types";

const cellClasses = "px-3 py-4 w-4/12 text-ellipsis overflow-hidden";

export interface IRosterCheckedRows {
  id: number;
  checked: boolean;
}



export const SoundRow: React.FC<IDiscoverySoundRowProps> = (props) => {
  const {id, name, artist, duration, uses, useGrowthRate,saved, setSavedSounds, removeSavedSound} = props;
  const [buttonLabel, setButtonLabel] = useState<string>("Add")
  const addSound = (sound: IDiscoverySound) => {
    if(buttonLabel=="Add"){
      setSavedSounds(sound);
      setButtonLabel("Remove");
    }else{
      removeSavedSound(id);
      setButtonLabel("Add");
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
          <div className={clsx(cellClasses)}>{name}</div>
          <div className={clsx(cellClasses)}>{artist}</div>
          <div className={clsx(cellClasses, "flex items-center")}>
            {duration}
          </div>
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
              onClick={()=> addSound({
                id: id,
                artist: artist,
                name: name,
                duration: duration,
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
