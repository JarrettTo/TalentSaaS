import { Button, Checkbox, Loader, Tooltip } from "@mantine/core";
import { useSort } from "@shared/lib/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { QuoteCalculationRow } from "./quote-calculation-row.component";
import {
  DeliverablesDictionaryEntries,
  IQuotePlacement,
  extendPlacement,
  useQuotePlacementsStore,
} from "@entities/quote";
import {
  updatePlacement,
  usePlacementsLastLogsQuery,
  usePlacementsQuery,
} from "@entities/placement";

export const QuoteCalculationTab = () => {
  const {
    data: placements,
    isLoading: isPlacementsLoading,
    isError: isPlacementsError,
  } = usePlacementsQuery();
  const { data: placementsLastLogs } = usePlacementsLastLogsQuery();
  const quotePlacements = useQuotePlacementsStore((store) => store.quotePlacements);
  const setQuotePlacements = useQuotePlacementsStore((store) => store.setQuotePlacements);
  const { sortByNumber } = useSort();

  const [isEditModeEnabled, setEditModeEnabled] = useState<boolean>(false);
  const [sortReverse, setSortReverse] = useState<boolean>(true);

  useEffect(() => {
    if (!placements || placements.length === 0) {
      return;
    }
    const extendedPlacements = placements.map((placement) => extendPlacement(placement));
    setQuotePlacements(extendedPlacements);
  }, [placements]);

  const handleSavePlacements = async () => {
    if (quotePlacements.length === 0) {
      return;
    }
    const quotePlacementsToUpdate = quotePlacements.filter(
      (quotePlacement) => quotePlacement.shouldUpdate
    );
    if (quotePlacementsToUpdate.length === 0) {
      return;
    }
    try {
      const updatePlacementsPromises = quotePlacementsToUpdate.map((quotePlacement) =>
        updatePlacement({
          type: quotePlacement.type,
          influencerId: quotePlacement.influencer.id,
          talantFee: Number(quotePlacement.talantFee || 0),
          totalImpressionsByCurrentMonth: Number(
            quotePlacement.totalImpressionsByCurrentMonth || 0
          ),
          AUorNZAuditory: Number(quotePlacement.AUorNZAuditory || 0),
          westAuditory: Number(quotePlacement.westAuditory || 0),
          sum: Number(quotePlacement.sum || 0),
          priceInUSD: Number(quotePlacement.priceInUSD || 0),
          priceInAUD: Number(quotePlacement.priceInAUD || 0),
          boosting: Number(quotePlacement.boosting || 0),
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

  const handleClearDeliverables = () => {
    const updatedQuotePlacements = quotePlacements.map((quotePlacement) => ({
      ...quotePlacement,
      deliverables: 0,
      isCrossPost: false,
    }));
    setQuotePlacements(updatedQuotePlacements);
  };

  const filterPlacementsByName = () => {
    setSortReverse(!sortReverse);
    const filteredRatesPlacements = [...quotePlacements].sort((a, b) => {
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
    setQuotePlacements(filteredRatesPlacements);
  };

  const filterPlacementsByTalentFee = () => {
    setSortReverse(!sortReverse);
    const filteredQuotePlacements = sortByNumber(
      quotePlacements,
      !sortReverse,
      "talantFee"
    );
    setQuotePlacements(filteredQuotePlacements);
  };

  const handleTalentFeeUpdate = (quotePlacementId: number, talentFee: number) => {
    const updatedQuotePlacements: IQuotePlacement[] = quotePlacements.map(
      (quotePlacement) => {
        if (quotePlacement.id === quotePlacementId) {
          return { ...quotePlacement, talantFee: String(talentFee), shouldUpdate: true };
        }
        return quotePlacement;
      }
    );
    setQuotePlacements(updatedQuotePlacements);
  };

  const handleDeliverablesUpdate = (quotePlacementId: number, deliverables: number) => {
    const updatedQuotePlacements: IQuotePlacement[] = quotePlacements.map(
      (quotePlacement) => {
        if (quotePlacement.id === quotePlacementId) {
          return {
            ...quotePlacement,
            deliverables,
            paidMedia: deliverables,
            crossPost: 0,
            instaStorySet: 0,
            linkInBio: 0,
            amplificationDigital: 0,
            amplificationDigitalMonths: 0,
            amplificationDigitalMonthsRange: 0,
            amplificationTraditional: 0,
            amplificationTraditionalMonth: 0,
            amplificationTraditionalMonthRange: 0,
            exclusivity: 0,
            exclusivityMonths: 0,
            exclusivityMonthsRange: 0,
            shootDay: 0,
            UGCCreative: 0,
          };
        }
        return quotePlacement;
      }
    );
    setQuotePlacements(updatedQuotePlacements);
  };

  const handleCrossPostCheck = (
    quotePlacementId: number,
    isCrossPostChecked: boolean
  ) => {
    const updatedQuotePlacements: IQuotePlacement[] = quotePlacements.map(
      (quotePlacement) => {
        if (quotePlacement.id === quotePlacementId) {
          return { ...quotePlacement, isCrossPost: isCrossPostChecked };
        }
        return quotePlacement;
      }
    );
    setQuotePlacements(updatedQuotePlacements);
  };

  if (isPlacementsLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader color="orange" />
      </div>
    );
  }

  if (isPlacementsError || !placements) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p>
          Looks like some problem with influencers occurs
          <br />
          Please, try again later
        </p>
      </div>
    );
  }

  if (placements.length === 0) {
    return (
      <div className="flex items-center justify-center text-xl min-h-[30rem]">
        <p>There is no active influencers yet</p>
      </div>
    );
  }

  return (
    <div className="text-md">
      <div className="flex justify-between items-center text-lg">
        <Button color="dark" radius="lg" size="md" onClick={handleSavePlacements}>
          Save changes
        </Button>
        <div className="flex">
          <Button
            color="dark"
            radius="lg"
            size="md"
            className="mr-6"
            onClick={handleClearDeliverables}
          >
            Clear Deliverables
          </Button>
          <label className="flex items-center cursor-pointer">
            <span className="mr-4">Manual edit mode</span>
            <Checkbox
              checked={isEditModeEnabled}
              color="dark"
              size="md"
              onChange={(event) => setEditModeEnabled(event.currentTarget.checked)}
            />
          </label>
        </div>
      </div>
      <div className="mt-10 overflow-x-auto">
        <div className="w-max sticky top-0 z-[3] flex items-center bg-slate-100 px-3 rounded-t-2xl">
          <div
            className="w-44 px-3 py-6 flex items-center cursor-pointer"
            onClick={filterPlacementsByName}
          >
            <span>Talent</span>
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
          <div className="w-44 px-3 py-6 pl-10">Placement</div>
          <div className="w-44 px-3 py-6">
            <p className="pl-5">Talent Fee</p>
          </div>
          <div className="w-44 px-3 py-6">Super</div>
          <div
            className="w-44 px-3 py-6 flex items-center cursor-pointer"
            onClick={filterPlacementsByTalentFee}
          >
            <span className="leading-3">Agency Fee</span>
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
          <div className="w-28 px-3 py-6">ASF</div>
          <div className="w-44 px-3 py-3">Deliverables (e.g 1)</div>
          <div className="w-36 px-3 py-6 flex gap-2 items-center cursor-pointer">
            <span>Cross post</span>
            <Tooltip
              label={
                <ul>
                  {DeliverablesDictionaryEntries.map(([_, deliverableInfo]) => (
                    <>
                      {deliverableInfo.description && (
                        <li className="list-none">
                          {deliverableInfo.title} - {deliverableInfo.description}
                        </li>
                      )}
                    </>
                  ))}
                </ul>
              }
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875 9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375 8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525 14.625 8.875C14.625 9.83834 14.1056 10.6796 13.3353 11.1354C13.1385 11.2518 12.9761 11.3789 12.8703 11.5036C12.7675 11.6246 12.75 11.7036 12.75 11.75V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V11.75C11.25 11.2441 11.4715 10.8336 11.7266 10.533C11.9786 10.236 12.2929 10.0092 12.5715 9.84439C12.9044 9.64739 13.125 9.28655 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                    fill="#1C274C"
                  ></path>{" "}
                </g>
              </svg>
            </Tooltip>
          </div>
        </div>

        <div className="w-max bg-white rounded-b-2xl">
          {quotePlacements.map((quotePlacement) => (
            <QuoteCalculationRow
              key={quotePlacement.id}
              quotePlacement={quotePlacement}
              placementsLastLogs={placementsLastLogs?.filter((placementLastLog) => {
                return (
                  placementLastLog.type === quotePlacement.type &&
                  placementLastLog.influencer.id === quotePlacement.influencer.id
                );
              })}
              disabled={!isEditModeEnabled}
              onTalentFeeUpdate={handleTalentFeeUpdate}
              onDeliverablesUpdate={handleDeliverablesUpdate}
              onCrossPostCheck={handleCrossPostCheck}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
