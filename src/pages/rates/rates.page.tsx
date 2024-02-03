import { Button, Checkbox, Loader, clsx } from "@mantine/core";
import { useEffect, useState, useRef, useCallback } from "react";
import { useSort } from "@shared/lib/utils";
import { toast } from "react-toastify";
import {
  usePlacementsLastLogsQuery,
  usePlacementsQuery,
  useRatesPlacementsStore,
  useUpdatePlacementMutation,
} from "@entities/placement";
import { RatesRow } from "./ui";

import { IRatesPlacement } from "@entities/placement/lib/interfaces";
import { RatesFrozenRows } from "./ui/rates-frozen-rows.component";
import { RatesFrozenRowsKeys } from "./ui/rates-frozen-rows-keys.component";

export const RatesPage = () => {
  const {
    data: placements,
    isLoading: isPlacementsLoading,
    isError: isPlacementsError,
  } = usePlacementsQuery();
  const { data: placementsLastLogs } = usePlacementsLastLogsQuery();
  const { mutateAsync: updatePlacement } = useUpdatePlacementMutation();
  const ratesPlacements = useRatesPlacementsStore((store) => store.ratesPlacements);
  const setRatesPlacements = useRatesPlacementsStore((store) => store.setRatesPlacements);
  const { sortByNumber } = useSort();

  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
  const [sortReverse, setSortReverse] = useState<boolean>(true);
  const [sortSuperReverse, setSuperSortReverse] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const handleScrollContent = () => {
      const thumbEle = thumbRef.current;
      const contentEle = contentRef.current;
      if (!thumbEle || !contentEle) {
          return;
      }
      thumbEle.style.left = `${(contentEle.scrollLeft * 100) / contentEle.scrollWidth}%`;
  };

  const handleClickTrack = (e) => {
      const trackEle = trackRef.current;
      const contentEle = contentRef.current;
      if (!trackEle || !contentEle) {
          return;
      }
      const bound = trackEle.getBoundingClientRect();
      const percentage = (e.clientX - bound.left) / bound.width;
      contentEle.scrollLeft = percentage * (contentEle.scrollWidth - contentEle.clientWidth);
  };
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
      const ele = thumbRef.current;
      const contentEle = contentRef.current;
      if (!ele || !contentEle) {
          return;
      }
      const touch = e.touches[0];
      const startPos = {
          left: contentEle.scrollLeft,
          x: touch?.clientX,
          y: touch?.clientY,
      };

      const handleTouchMove = (e) => {
          const touch = e.touches[0];
          const dx = touch?.clientX!! - startPos?.x!!;
          const dy = touch?.clientY!! - startPos?.y!!;
          const scrollRatio = contentEle?.clientWidth!! / contentEle?.scrollWidth!!;
          contentEle.scrollLeft = startPos.left!! + dx / scrollRatio;
          updateCursor(ele);
      };

      const handleTouchEnd = () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
          resetCursor(ele);
      };

      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
  }, []);
  const handleMouseDown = (e) => {
    const ele = thumbRef.current;
    const contentEle = contentRef.current;

    const startPos = {
        left: contentEle?.scrollLeft,
        x: e.clientX,
        y: e.clientY,
    };
    const handleMouseMove = (e) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const scrollRatio = contentEle?.clientWidth!! / contentEle?.scrollWidth!!;
      if(contentEle){
        contentEle.scrollLeft = startPos.left!! + dx / scrollRatio;
      }
      updateCursor(ele);
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      resetCursor(ele);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const updateCursor = (ele) => {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
};

  const resetCursor = (ele) => {
      ele.style.cursor = 'grab';
      ele.style.userSelect = '';
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
  };
  useEffect(() => {
    if (!placements || placements.length === 0) {
      return;
    }
    const extendedPlacements: IRatesPlacement[] = placements.map((placement) => ({
      ...placement,
      shouldUpdate: false,
    }));
    setRatesPlacements(extendedPlacements);
    const thumbEle = thumbRef.current;
    const contentEle = contentRef.current;

    if (contentEle && thumbEle) {
      const scrollRatio = contentEle.clientWidth / contentEle.scrollWidth;
      console.log("scroll" + scrollRatio)
      thumbEle.style.width = `${scrollRatio * 100}%`;
    }
  }, [placements]);
  
  const handleSavePlacements = async () => {
    if (ratesPlacements.length === 0) {
      return;
    }
    const ratesPlacementsToUpdate = ratesPlacements.filter(
      (ratesPlacement) => ratesPlacement.shouldUpdate
    );
    if (ratesPlacementsToUpdate.length === 0) {
      return;
    }
    try {
      const updatePlacementsPromises = ratesPlacementsToUpdate.map((ratesPlacement) =>
        updatePlacement({
          type: ratesPlacement.type,
          influencerId: ratesPlacement.influencer.id,
          talantFee: Number(ratesPlacement.talantFee || 0),
          totalImpressionsByCurrentMonth: Number(
            ratesPlacement.totalImpressionsByCurrentMonth
          ),
          AUorNZAuditory: Number(ratesPlacement.AUorNZAuditory),
          westAuditory: Number(ratesPlacement.westAuditory),
          sum: Number(ratesPlacement.sum),
          priceInUSD: Number(ratesPlacement.priceInUSD),
          priceInAUD: Number(ratesPlacement.priceInAUD),
          boosting: Number(ratesPlacement.boosting || 0),
          isItems: false,
        })
      );
      await Promise.all(updatePlacementsPromises);
      toast.success("Data was successfully updated");
    } catch (error) {
      console.error("update placements error:", error);
      toast.error(
        "Looks like some error occurred. Please, check rates data and try again later if needed."
      );
    }
  };

  const filterPlacementsByField = (field: keyof IRatesPlacement) => {
    setSortReverse(!sortReverse);
    const filteredRatesPlacements = sortByNumber(ratesPlacements, !sortReverse, field);
    setRatesPlacements(filteredRatesPlacements);
  };
  const filterPlacementsBy2Fields = () => {
    setSortReverse(!sortReverse);
    const filteredRatesPlacements = sortBySumOfTwoFields(ratesPlacements, !sortReverse);
    setRatesPlacements(filteredRatesPlacements);
  };
    
  const sortBySumOfTwoFields = (array: IRatesPlacement[], ascending: boolean) => {
    // Create a copy of the array to avoid mutating the original array
    return [...array].sort((a, b) => {
      const sumA = Number(a["AUorNZAuditory"]) + Number(a["westAuditory"])/2;
      const sumB = Number(b["AUorNZAuditory"]) + Number(b["westAuditory"])/2;
  
      return ascending ? sumA - sumB : sumB - sumA;
    });
  };
  const filterPlacementsByName = () => {
    setSortReverse(!sortReverse);
    const filteredRatesPlacements = [...ratesPlacements].sort((a, b) => {
      const aFirstName = a.influencer.firstname.toLowerCase();
      const bFirstName = b.influencer.firstname.toLowerCase();
      let comparisonResult = 0;
      if (aFirstName < bFirstName) {
        comparisonResult = -1;
      } else if (aFirstName > bFirstName) {
        comparisonResult = 1;
      }
      return sortReverse ? comparisonResult * -1 : comparisonResult;
    });
    setRatesPlacements(filteredRatesPlacements);
  };

  const handleTalentFeeUpdate = (ratesPlacementId: number, talentFee: number) => {
    const updatedRatesPlacements: IRatesPlacement[] = ratesPlacements.map(
      (ratesPlacement) => {
        if (ratesPlacement.id === ratesPlacementId) {
          return { ...ratesPlacement, talantFee: String(talentFee), shouldUpdate: true };
        }
        return ratesPlacement;
      }
    );
    setRatesPlacements(updatedRatesPlacements);
  };

  const handleBoostingUpdate = (ratesPlacementId: number, boosting: number) => {
    const updatedRatesPlacements: IRatesPlacement[] = ratesPlacements.map(
      (ratesPlacement) => {
        if (ratesPlacement.id === ratesPlacementId) {
          return { ...ratesPlacement, boosting: String(boosting), shouldUpdate: true };
        }
        return ratesPlacement;
      }
    );
    setRatesPlacements(updatedRatesPlacements);
  };

  if (isPlacementsLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (isPlacementsError || !ratesPlacements) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p>
          Looks like some problem with ratesPlacements occurs
          <br />
          Please, try again later
        </p>
      </div>
    );
  }

  if (ratesPlacements.length === 0) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p>There is no active ratesPlacements yet</p>
      </div>
    );
  }

  return (
    
    <div className="text-md">
      
      <div className="flex justify-between items-center text-lg">
        <Button color="dark" radius="lg" size="md" onClick={handleSavePlacements}>
          Save changes
        </Button>
        <label className="flex items-center cursor-pointer">
          <span className="mr-4">Manual edit mode</span>
          <Checkbox
            checked={isEditModeEnabled}
            color="dark"
            size="md"
            onChange={(event) => setIsEditModeEnabled(event.currentTarget.checked)}
          />
        </label>
      </div>
      <div className="custom-scrollbar-container" style={{width:"100%", height: '0.75rem', position: 'relative', marginTop:'20px', backgroundColor: 'rgb(249 250 251)',borderTopLeftRadius: '20px', borderTopRightRadius: '20px' } } >
          <div className="custom-scrollbar-track" style={{height: '100%',position: 'absolute',top: 0,width: '38vw'}} ref={trackRef} onClick={handleClickTrack}/>
          <div className="custom-scrollbar-thumb" style={{ position: 'relative',width: '38vw', height:'100%', backgroundColor: 'rgb(156 163 175)', borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}} ref={thumbRef} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}/>
          
      </div>
      <div className="">
        
        <div className="grid grid-cols-[auto_1fr] bg-white rounded-b-2xl overflow-x-hidden overflow-y-auto"  style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          

          <div className="flex flex-col">
            <div className="w-max top-0 z-[3] flex items-center bg-slate-100 px-3 " style={{minHeight:90}}>
              <div
                className="w-44 px-3 py-6 flex items-center cursor-pointer"
                onClick={filterPlacementsByName}
              >
                <p className="leading-3">Talent</p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div className="w-44 px-3 py-6 pl-10">
                <p>Placement</p>
              </div>
            </div>
            {ratesPlacements.map((ratesPlacement) => (
              
              <RatesFrozenRowsKeys
                key={ratesPlacement.id}
                ratesPlacement={ratesPlacement}
                placementsLastLogs={placementsLastLogs?.filter((placementLastLog) => {
                  return (
                    placementLastLog.type === ratesPlacement.type &&
                    placementLastLog.influencer.id === ratesPlacement.influencer.id
                  );
                })}
                disabled={!isEditModeEnabled}
                onTalentFeeUpdate={handleTalentFeeUpdate}
                onBoostingUpdate={handleBoostingUpdate}
              />
              
            ))}
          </div>
          
          <div className="flex flex-col overflow-x-auto" ref={contentRef} onScroll={handleScrollContent}>
            
          <div className="w-max sticky top-0 z-[6] flex items-center bg-slate-100 px-0" style={{minHeight:90}} >
              
              <div className="w-44 sticky px-0 py-6">
                <p className="pl-5">Talent Fee</p>
              </div>
              
              <div className="w-44 px-0 py-6 flex items-center cursor-pointer"
              onClick={() => filterPlacementsByField("talantFee")}>
                <p>Super</p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
                
              </div>
              <div
                className="w-44 px-0 py-6 flex items-center cursor-pointer"
                onClick={() => filterPlacementsByField("talantFee")}
              >
                <p className="leading-3">Agency Fee</p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div
                className="w-44 px-0 py-6 flex items-center cursor-pointer"
                onClick={() => filterPlacementsByField("totalImpressionsByCurrentMonth")}
              >
                <p>
                  Videos/Posts
                  <br />
                  (30 days)
                </p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div className="w-44 px-0 py-6 flex items-center cursor-pointer"
              onClick={() => filterPlacementsByField("AUorNZAuditory")}>
                <p style={{fontSize:14}}>
                  AU/NZ
                  <br />
                  audience combined
                </p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div className="w-48 px-0 py-6 flex items-center cursor-pointer"
              onClick={() => filterPlacementsByField("westAuditory")}>
                <p style={{fontSize:14}}>
                  US/UK/Canada/Europe
                  <br />
                  audience combined
                </p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div className="w-44 px-0 py-6 flex items-center cursor-pointer"
              onClick={() => filterPlacementsBy2Fields( )}>
                <p>% Sum</p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div className="w-44 px-0 py-6 flex items-center cursor-pointer" onClick={() => filterPlacementsByField("priceInUSD")}>
                <p>Price in USD</p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div className="w-44 px-3 py-6 flex items-center cursor-pointer" onClick={() => filterPlacementsByField("priceInAUD")}>
                <p>Price in AUD</p>
                <svg
                  className={clsx("ml-2 transition-all", sortReverse && "rotate-180")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99999 10.04L5.87499 14.165L4.69666 12.9867L9.99999 7.68335L15.3033 12.9867L14.125 14.165L9.99999 10.04Z"
                    fill="#141414"
                  />
                </svg>
              </div>
              <div className="w-44 px-0 py-6">
                <p className="pl-5">Boosting</p>
              </div>
            </div>
            <div className="min-w-max h-max" >
              
            
            {ratesPlacements.map((ratesPlacement) => (
              <>
            
              
              <RatesFrozenRows
                key={ratesPlacement.id}
                ratesPlacement={ratesPlacement}
                placementsLastLogs={placementsLastLogs?.filter((placementLastLog) => {
                  return (
                    placementLastLog.type === ratesPlacement.type &&
                    placementLastLog.influencer.id === ratesPlacement.influencer.id
                  );
                })}
                disabled={!isEditModeEnabled}
                onTalentFeeUpdate={handleTalentFeeUpdate}
                onBoostingUpdate={handleBoostingUpdate}
              />
    
              </>
            ))}
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  );
};
